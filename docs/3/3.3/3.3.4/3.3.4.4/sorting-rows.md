# 3.3.4.4 排序行

在前面的示例中，你可能已经注意到，结果行的显示顺序并不特殊。当以某种有意义的方式对行进行排序时，通常更容易检查查询输出。要对结果进行排序，请使用 `ORDER BY` 子句。

以下是按日期排序的动物生日：

```bash
mysql> SELECT name, birth FROM pet ORDER BY birth;
+----------+------------+
| name     | birth      |
+----------+------------+
| Buffy    | 1989-05-13 |
| Bowser   | 1989-08-31 |
| Fang     | 1990-08-27 |
| Fluffy   | 1993-02-04 |
| Claws    | 1994-03-17 |
| Slim     | 1996-04-29 |
| Whistler | 1997-12-09 |
| Chirpy   | 1998-09-11 |
| Puffball | 1999-03-30 |
+----------+------------+
```

在字符类型列上，与所有其他比较操作一样，排序通常以不区分大小写的方式执行。这意味着除了大小写之外，对于相同的列，顺序是未定义的。可以使用 [BINARY](/12/12.11/cast-functions.html) 强制对列进行区分大小写的排序，例如：`ORDER by BINARY col_name`。

默认排序顺序为升序，首先是最小值。要按相反（降序）排序，请将 `DESC` 关键字添加到排序依据的列的名称中：

```bash
mysql> SELECT name, birth FROM pet ORDER BY birth DESC;
+----------+------------+
| name     | birth      |
+----------+------------+
| Puffball | 1999-03-30 |
| Chirpy   | 1998-09-11 |
| Whistler | 1997-12-09 |
| Slim     | 1996-04-29 |
| Claws    | 1994-03-17 |
| Fluffy   | 1993-02-04 |
| Fang     | 1990-08-27 |
| Bowser   | 1989-08-31 |
| Buffy    | 1989-05-13 |
+----------+------------+
```

你可以对多个列进行排序，也可以对不同方向的不同列进行排序。例如，要按动物类型升序排序，然后按动物类型中的出生日期降序排序（先是最年轻的动物），请使用以下查询：

```bash
mysql> SELECT name, species, birth FROM pet
       ORDER BY species, birth DESC;
+----------+---------+------------+
| name     | species | birth      |
+----------+---------+------------+
| Chirpy   | bird    | 1998-09-11 |
| Whistler | bird    | 1997-12-09 |
| Claws    | cat     | 1994-03-17 |
| Fluffy   | cat     | 1993-02-04 |
| Fang     | dog     | 1990-08-27 |
| Bowser   | dog     | 1989-08-31 |
| Buffy    | dog     | 1989-05-13 |
| Puffball | hamster | 1999-03-30 |
| Slim     | snake   | 1996-04-29 |
+----------+---------+------------+
```

`DESC` 关键字仅适用于紧挨在其前面的列名（`birth`）；它不影响 `species` 列排序顺序。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/sorting-rows.html)
