# 3.6 常见查询示例

- [3.6.1 列的最大值](/3/3.6/3.6.1/example-maximum-column.html)
- [3.6.2 包含某列最大值的行](/3/3.6/3.6.2/example-maximum-row.html)
- [3.6.3 每列的最大值](/3/3.6/3.6.3/example-maximum-column-group.html)
- [3.6.4 包含某列最大值的行](/3/3.6/3.6.4/example-maximum-column-group-row.html)
- [3.6.5 使用用户定义的变量](/3/3.6/3.6.5/example-user-variables.html)
- [3.6.6 使用外键](/3/3.6/3.6.6/example-foreign-keys.html)
- [3.6.7 搜索两个键](/3/3.6/3.6.7/searching-on-two-keys.html)
- [3.6.8 计算每日访问量](/3/3.6/3.6.8/calculating-days.html)
- [3.6.9 使用 AUTO_INCREMENT](/3/3.6/3.6.9/example-auto-increment.html)

以下是如何解决 MySQL 常见问题的示例。

一些示例使用表 `shop` 为某些贸易商（dealer，经销商）保存每件商品（article，商品编号）的价格。假设每个交易者每件商品都有一个固定价格，那么（`article`、`dealer`）就是记录的主键。

启动命令行工具 [mysql]](/4/4.5/4.5.1/mysql.html) 并选择数据库：

```bash
$> mysql your-database-name
```

要创建和填充示例表，请使用以下语句：

```bash
CREATE TABLE shop (
    article INT UNSIGNED  DEFAULT '0000' NOT NULL,
    dealer  CHAR(20)      DEFAULT ''     NOT NULL,
    price   DECIMAL(16,2) DEFAULT '0.00' NOT NULL,
    PRIMARY KEY(article, dealer));
INSERT INTO shop VALUES
    (1,'A',3.45),(1,'B',3.99),(2,'A',10.99),(3,'B',1.45),
    (3,'C',1.69),(3,'D',1.25),(4,'D',19.95);
```

执行语句后，表应包含以下内容：

```bash
SELECT * FROM shop ORDER BY article;

+---------+--------+-------+
| article | dealer | price |
+---------+--------+-------+
|       1 | A      |  3.45 |
|       1 | B      |  3.99 |
|       2 | A      | 10.99 |
|       3 | B      |  1.45 |
|       3 | C      |  1.69 |
|       3 | D      |  1.25 |
|       4 | D      | 19.95 |
+---------+--------+-------+
```

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/examples.html)
