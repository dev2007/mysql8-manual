# 3.6.3 每列的最大值

*任务：找到每种商品的最高价格。*

```bash
SELECT article, MAX(price) AS price
FROM   shop
GROUP BY article
ORDER BY article;

+---------+-------+
| article | price |
+---------+-------+
|    0001 |  3.99 |
|    0002 | 10.99 |
|    0003 |  1.69 |
|    0004 | 19.95 |
+---------+-------+
```

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/example-maximum-column-group.html)
