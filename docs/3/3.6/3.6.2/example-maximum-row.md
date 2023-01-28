# 3.6.2 包含某列最大值的行

*任务：查找最贵商品的数量、经销商和价格。*

这可以通过子查询轻松完成：

```bash
SELECT article, dealer, price
FROM   shop
WHERE  price=(SELECT MAX(price) FROM shop);

+---------+--------+-------+
| article | dealer | price |
+---------+--------+-------+
|    0004 | D      | 19.95 |
+---------+--------+-------+
```

另一种解决方案是使用 `LEFT JOIN`，如下所示：

```bash
SELECT s1.article, s1.dealer, s1.price
FROM shop s1
LEFT JOIN shop s2 ON s1.price < s2.price
WHERE s2.article IS NULL;
```

您还可以通过按价格降序排序所有行，并使用 MySQL 特定的 `LIMIT` 子句仅获取第一行，如下所示：

```bash
SELECT article, dealer, price
FROM shop
ORDER BY price DESC
LIMIT 1;
```

:::tip
如果有几件最贵的物品，每件价格为 19.95，`LIMIT` 解决方案将只显示其中一件。
:::

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/example-maximum-row.html)
