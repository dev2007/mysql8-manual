# 3.3.4.1 选择所有数据

[SELECT](/13/13.2/13.2.13/select.html) 的最简单形式是从表中检索所有内容：

```bash
mysql> SELECT * FROM pet;
+----------+--------+---------+------+------------+------------+
| name     | owner  | species | sex  | birth      | death      |
+----------+--------+---------+------+------------+------------+
| Fluffy   | Harold | cat     | f    | 1993-02-04 | NULL       |
| Claws    | Gwen   | cat     | m    | 1994-03-17 | NULL       |
| Buffy    | Harold | dog     | f    | 1989-05-13 | NULL       |
| Fang     | Benny  | dog     | m    | 1990-08-27 | NULL       |
| Bowser   | Diane  | dog     | m    | 1979-08-31 | 1995-07-29 |
| Chirpy   | Gwen   | bird    | f    | 1998-09-11 | NULL       |
| Whistler | Gwen   | bird    | NULL | 1997-12-09 | NULL       |
| Slim     | Benny  | snake   | m    | 1996-04-29 | NULL       |
| Puffball | Diane  | hamster | f    | 1999-03-30 | NULL       |
+----------+--------+---------+------+------------+------------+
```

这种形式的 [SELECT](/13/13.2/13.2.13/select.html) 使用 `*`，它是“选择所有列”的缩写。如果你想查看整个表，例如，在你刚刚加载了初始数据集之后，这很有用。例如，你可能碰巧认为 Bowser 的出生日期似乎不太正确。查阅你的原始家谱文件，你会发现正确的出生年份应该是 1989 年，而不是 1979 年。

至少有两种方法可以解决此问题：

- 编辑文件 `pet.txt` 以更正错误，然后清空表并使用 [DELETE](/13/13.2/13.2.2/delete.html) 和 [LOAD DATA](/13/13.2/13.2.7/loda-data.html) 重新加载：

```bash
mysql> DELETE FROM pet;
mysql> LOAD DATA LOCAL INFILE 'pet.txt' INTO TABLE pet;
```

然而，如果你这样做，你也必须重新进入Puffball的记录。

- 仅使用 UPDATE 语句修复错误记录：

```bash
mysql> UPDATE pet SET birth = '1989-08-31' WHERE name = 'Bowser';
```

`SELECT *` 选择所有列的原则有一个例外。如果表包含不可见的列，则 `*` 不包含这些列。有关详细信息，参阅[章节 13.1.20.10，“不可见列”](/13/13.1/13.1.20/13.1.20.10/invisible-columns.html)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/selecting-all.html)
