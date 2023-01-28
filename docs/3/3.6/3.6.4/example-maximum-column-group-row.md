# 3.6.4 包含某列最大值的行

*任务：针对每种商品，找到价格最贵的经销商。*

这个问题可以用如下子查询解决：

```bash
SELECT article, dealer, price
FROM   shop s1
WHERE  price=(SELECT MAX(s2.price)
              FROM shop s2
              WHERE s1.article = s2.article)
ORDER BY article;

+---------+--------+-------+
| article | dealer | price |
+---------+--------+-------+
|    0001 | B      |  3.99 |
|    0002 | A      | 10.99 |
|    0003 | C      |  1.69 |
|    0004 | D      | 19.95 |
+---------+--------+-------+
```

前面的示例使用了相关子查询，这可能效率低下（参阅[章节 13.2.15.7，“相关子查询”](/13/13.2/13.2.15/13.2.15.7/correlated-subqueries.html)）。解决该问题的其他方法是在 `FROM` 子句中使用不相关的子查询、`LEFT JOIN` 或带有窗口函数的公共表表达式。

不相关的子查询：

```bash
SELECT s1.article, dealer, s1.price
FROM shop s1
JOIN (
  SELECT article, MAX(price) AS price
  FROM shop
  GROUP BY article) AS s2
  ON s1.article = s2.article AND s1.price = s2.price
ORDER BY article;
```

`LEFT JOIN`：

```bash
SELECT s1.article, s1.dealer, s1.price
FROM shop s1
LEFT JOIN shop s2 ON s1.article = s2.article AND s1.price < s2.price
WHERE s2.article IS NULL
ORDER BY s1.article;
```

`LEFT JOIN` 的工作原理是，当 `s1.price` 处于其最大值时，没有更大值的 `s2.price`，因此相应的 `s2.article` 值为 `NULL`。参阅[章节 13.2.13.2，“JOIN 子句”](/13/13.2/13.2.13/13.2.13.2/join.html)。

具有窗口函数的公共表表达式：

```bash
WITH s1 AS (
   SELECT article, dealer, price,
          RANK() OVER (PARTITION BY article
                           ORDER BY price DESC
                      ) AS `Rank`
     FROM shop
)
SELECT article, dealer, price
  FROM s1
  WHERE `Rank` = 1
ORDER BY article;
```

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/example-maximum-column-group-row.html)
