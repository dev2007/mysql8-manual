# 3.6.5 使用用户定义的变量

你可以使用 MySQL 用户变量来记住结果，而不必将它们存储在客户端的临时变量中。（参阅[章节 9.4，“用户定义变量”](/9/9.4/user-variables.html)。）

例如，要查找价格最高和最低的商品，可以执行以下操作：

```bash
mysql> SELECT @min_price:=MIN(price),@max_price:=MAX(price) FROM shop;
mysql> SELECT * FROM shop WHERE price=@min_price OR price=@max_price;
+---------+--------+-------+
| article | dealer | price |
+---------+--------+-------+
|    0003 | D      |  1.25 |
|    0004 | D      | 19.95 |
+---------+--------+-------+
```

:::tip
也可以在用户变量中存储数据库对象（如表或列）的名称，然后在 SQL 语句中使用该变量；然而，这需要使用预编译语句。更多信息，参阅[章节 13.5，“预编译语句”](/13/13.5/sql-prepared-statements.html)。
:::

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/example-user-variables.html)
