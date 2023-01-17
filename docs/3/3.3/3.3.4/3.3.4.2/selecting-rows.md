# 3.3.4.2 选择特定行

如前一节所示，很容易检索整个表。只需从 [SELECT](/13/13.2/13.2.13/select.html) 语句中省略 `WHERE` 子句。但通常情况下，你不希望看到整个表，特别是当它变大时。相反，你通常更感兴趣的是回答一个特定的问题，在这种情况下，你需要对你想要的信息进行一些限制。让我们看看他们回答的关于宠物的问题的一些选择查询。

你只能从表中选择特定的行。例如，如果要验证对 Bowser 的出生日期所做的更改，请选择 Bowser 的记录，如下所示：

```bash
mysql> SELECT * FROM pet WHERE name = 'Bowser';
+--------+-------+---------+------+------------+------------+
| name   | owner | species | sex  | birth      | death      |
+--------+-------+---------+------+------------+------------+
| Bowser | Diane | dog     | m    | 1989-08-31 | 1995-07-29 |
+--------+-------+---------+------+------------+------------+
```

产出证实，这一年被正确记录为1989年，而不是1979年。

字符串比较通常不区分大小写，因此可以将名称指定为 'bowser'、'BOWSER' 等。查询结果相同。

你可以在任何列上指定条件，而不仅仅是 `name`。例如，如果你想知道哪些动物是在 1998 年期间或之后出生的，请测试 `birth` 列：

```bash
mysql> SELECT * FROM pet WHERE birth >= '1998-1-1';
+----------+-------+---------+------+------------+-------+
| name     | owner | species | sex  | birth      | death |
+----------+-------+---------+------+------------+-------+
| Chirpy   | Gwen  | bird    | f    | 1998-09-11 | NULL  |
| Puffball | Diane | hamster | f    | 1999-03-30 | NULL  |
+----------+-------+---------+------+------------+-------+
```

例如，你可以组合条件来定位母狗：

```bash
mysql> SELECT * FROM pet WHERE species = 'dog' AND sex = 'f';
+-------+--------+---------+------+------------+-------+
| name  | owner  | species | sex  | birth      | death |
+-------+--------+---------+------+------------+-------+
| Buffy | Harold | dog     | f    | 1989-05-13 | NULL  |
+-------+--------+---------+------+------------+-------+
```

前面的查询使用 [AND](/12/12.4/12.4.3/logical-operators.html) 逻辑运算符。还有一个 [OR](/12/12.4/12.4.3/logical-operators.html) 运算符：

```bash
mysql> SELECT * FROM pet WHERE species = 'snake' OR species = 'bird';
+----------+-------+---------+------+------------+-------+
| name     | owner | species | sex  | birth      | death |
+----------+-------+---------+------+------------+-------+
| Chirpy   | Gwen  | bird    | f    | 1998-09-11 | NULL  |
| Whistler | Gwen  | bird    | NULL | 1997-12-09 | NULL  |
| Slim     | Benny | snake   | m    | 1996-04-29 | NULL  |
+----------+-------+---------+------+------------+-------+
```

[AND](/12/12.4/12.4.3/logical-operators.html) 和 [OR](/12/12.4/12.4.3/logical-operators.html) 可以混合，尽管 [AND](/12/12.4/12.4.3/logical-operators.html) 的优先级高于 [OR](/12/12.4/12.4.3/logical-operators.html)。如果同时使用这两个运算符，最好使用括号来明确指示应如何分组条件：

```bash
mysql> SELECT * FROM pet WHERE (species = 'cat' AND sex = 'm')
       OR (species = 'dog' AND sex = 'f');
+-------+--------+---------+------+------------+-------+
| name  | owner  | species | sex  | birth      | death |
+-------+--------+---------+------+------------+-------+
| Claws | Gwen   | cat     | m    | 1994-03-17 | NULL  |
| Buffy | Harold | dog     | f    | 1989-05-13 | NULL  |
+-------+--------+---------+------+------------+-------+
```

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/selecting-rows.html)
