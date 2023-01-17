# 3.3.4.3 选择特定列

如果不想看到表中的整行，只需命名感兴趣的列，用逗号分隔即可。例如，如果你想知道动物的出生时间，请选择 `name` 和 `birth` 列：

```bash
mysql> SELECT name, birth FROM pet;
+----------+------------+
| name     | birth      |
+----------+------------+
| Fluffy   | 1993-02-04 |
| Claws    | 1994-03-17 |
| Buffy    | 1989-05-13 |
| Fang     | 1990-08-27 |
| Bowser   | 1989-08-31 |
| Chirpy   | 1998-09-11 |
| Whistler | 1997-12-09 |
| Slim     | 1996-04-29 |
| Puffball | 1999-03-30 |
+----------+------------+
```

要查找谁拥有宠物，请使用以下查询：

```bash
mysql> SELECT owner FROM pet;
+--------+
| owner  |
+--------+
| Harold |
| Gwen   |
| Harold |
| Benny  |
| Diane  |
| Gwen   |
| Gwen   |
| Benny  |
| Diane  |
+--------+
```

请注意，查询只是从每个记录中检索所有者列，其中一些记录出现多次。要最小化输出，请通过添加关键字 `DISTINCT` 检索每个唯一的输出记录一次：

```bash
mysql> SELECT DISTINCT owner FROM pet;
+--------+
| owner  |
+--------+
| Benny  |
| Diane  |
| Gwen   |
| Harold |
+--------+
```

可以使用 `WHERE` 子句组合行选择和列选择。例如，要仅获取狗和猫的出生日期，请使用以下查询：

```bash
mysql> SELECT name, species, birth FROM pet
       WHERE species = 'dog' OR species = 'cat';
+--------+---------+------------+
| name   | species | birth      |
+--------+---------+------------+
| Fluffy | cat     | 1993-02-04 |
| Claws  | cat     | 1994-03-17 |
| Buffy  | dog     | 1989-05-13 |
| Fang   | dog     | 1990-08-27 |
| Bowser | dog     | 1989-08-31 |
+--------+---------+------------+
```



> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/selecting-columns.html)
