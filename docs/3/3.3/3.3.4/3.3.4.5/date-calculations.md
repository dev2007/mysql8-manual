# 3.3.4.5 日期计算

MySQL 提供了几个函数，你可以使用这些函数来计算日期，例如，计算年龄或提取部分日期。

要确定每个宠物的年龄，请使用 [TIMESTAMPDIFF()](/12/12.7/date-and-time-functions.html) 函数。它的参数是表示结果的单位，以及计算差异的两个日期。要确定每个宠物的年龄，请使用 [TIMESTAMPDIFF()](/12/12.7/date-and-time-functions.html) 函数。它的参数是表示结果的单位，以及计算差异的两个日期。以下查询显示每个宠物的出生日期、当前日期和年龄（以年为单位）。`alias (age)` 用于使最终输出列标签更有意义。

```bash
mysql> SELECT name, birth, CURDATE(),
       TIMESTAMPDIFF(YEAR,birth,CURDATE()) AS age
       FROM pet;
+----------+------------+------------+------+
| name     | birth      | CURDATE()  | age  |
+----------+------------+------------+------+
| Fluffy   | 1993-02-04 | 2003-08-19 |   10 |
| Claws    | 1994-03-17 | 2003-08-19 |    9 |
| Buffy    | 1989-05-13 | 2003-08-19 |   14 |
| Fang     | 1990-08-27 | 2003-08-19 |   12 |
| Bowser   | 1989-08-31 | 2003-08-19 |   13 |
| Chirpy   | 1998-09-11 | 2003-08-19 |    4 |
| Whistler | 1997-12-09 | 2003-08-19 |    5 |
| Slim     | 1996-04-29 | 2003-08-19 |    7 |
| Puffball | 1999-03-30 | 2003-08-19 |    4 |
+----------+------------+------------+------+
```

查询可以工作，但如果按某种顺序显示行，则可以更容易地扫描结果。可以通过添加 `ORDER by name` 子句来按名称对输出进行排序：

```bash
mysql> SELECT name, birth, CURDATE(),
       TIMESTAMPDIFF(YEAR,birth,CURDATE()) AS age
       FROM pet ORDER BY name;
+----------+------------+------------+------+
| name     | birth      | CURDATE()  | age  |
+----------+------------+------------+------+
| Bowser   | 1989-08-31 | 2003-08-19 |   13 |
| Buffy    | 1989-05-13 | 2003-08-19 |   14 |
| Chirpy   | 1998-09-11 | 2003-08-19 |    4 |
| Claws    | 1994-03-17 | 2003-08-19 |    9 |
| Fang     | 1990-08-27 | 2003-08-19 |   12 |
| Fluffy   | 1993-02-04 | 2003-08-19 |   10 |
| Puffball | 1999-03-30 | 2003-08-19 |    4 |
| Slim     | 1996-04-29 | 2003-08-19 |    7 |
| Whistler | 1997-12-09 | 2003-08-19 |    5 |
+----------+------------+------------+------+
```

要按年龄而不是名称对输出进行排序，只需使用不同的 `ORDER BY` 子句：

```bash
mysql> SELECT name, birth, CURDATE(),
       TIMESTAMPDIFF(YEAR,birth,CURDATE()) AS age
       FROM pet ORDER BY age;
+----------+------------+------------+------+
| name     | birth      | CURDATE()  | age  |
+----------+------------+------------+------+
| Chirpy   | 1998-09-11 | 2003-08-19 |    4 |
| Puffball | 1999-03-30 | 2003-08-19 |    4 |
| Whistler | 1997-12-09 | 2003-08-19 |    5 |
| Slim     | 1996-04-29 | 2003-08-19 |    7 |
| Claws    | 1994-03-17 | 2003-08-19 |    9 |
| Fluffy   | 1993-02-04 | 2003-08-19 |   10 |
| Fang     | 1990-08-27 | 2003-08-19 |   12 |
| Bowser   | 1989-08-31 | 2003-08-19 |   13 |
| Buffy    | 1989-05-13 | 2003-08-19 |   14 |
+----------+------------+------------+------+
```

类似的查询可用于确定已死亡动物的死亡年龄。你可以通过检查 `death` 值是否为 `NULL` 来确定这些是哪些动物。然后，对于那些具有非 `NULL` 值的人，计算 `death` 值和 `birth` 值之间的差值：

```bash
mysql> SELECT name, birth, death,
       TIMESTAMPDIFF(YEAR,birth,death) AS age
       FROM pet WHERE death IS NOT NULL ORDER BY age;
+--------+------------+------------+------+
| name   | birth      | death      | age  |
+--------+------------+------------+------+
| Bowser | 1989-08-31 | 1995-07-29 |    5 |
+--------+------------+------------+------+
```

查询使用 `death IS NOT NULL` 而不是 `death <> NULL`，因为 `NULL` 是一个特殊值，无法使用常用的比较运算符进行比较。这将在稍后讨论。参见[章节 3.3.4.6，“使用 NULL 值”](/3/3.3/3.3.4/3.3.4.6/working-with-null.html)。

如果你想知道下个月哪些动物会过生日呢？对于这种类型的计算，年份和日期是不相关的；你只需提取 `birth` 列的月份部分。MySQL 提供了几个提取日期部分的函数，例如 [YEAR()](/12/12.7/date-and-time-functions.html)、[MONTH()](/12/12.7/date-and-time-functions.html) 和 [DAYOFMONTH()](/12/12.7/date-and-time-functions.html)。[MONTH()](/12/12.7/date-and-time-functions.html) 是此处的适当函数。要查看它的工作原理，请运行一个显示 `birth` 和 [MONTH(birth)](/12/12.7/date-and-time-functions.html) 值的简单查询：

```bash
mysql> SELECT name, birth, MONTH(birth) FROM pet;
+----------+------------+--------------+
| name     | birth      | MONTH(birth) |
+----------+------------+--------------+
| Fluffy   | 1993-02-04 |            2 |
| Claws    | 1994-03-17 |            3 |
| Buffy    | 1989-05-13 |            5 |
| Fang     | 1990-08-27 |            8 |
| Bowser   | 1989-08-31 |            8 |
| Chirpy   | 1998-09-11 |            9 |
| Whistler | 1997-12-09 |           12 |
| Slim     | 1996-04-29 |            4 |
| Puffball | 1999-03-30 |            3 |
+----------+------------+--------------+
```

在接下来的一个月里找到生日的动物也很简单。假设当前月份是四月。然后月份值为 `4`，你可以查找五月（`5` 月）出生的动物，如下所示：

```bash
mysql> SELECT name, birth FROM pet WHERE MONTH(birth) = 5;
+-------+------------+
| name  | birth      |
+-------+------------+
| Buffy | 1989-05-13 |
+-------+------------+
```

如果当前月份是十二月，则会有一个小问题。你不能只在月号（`12`）上加一个，寻找出生在 `13` 月的动物，因为没有这样的月份。相反，你要寻找一月（`1` 月）出生的动物。

你可以编写查询，使其无论当前月份如何都能正常工作，这样你就不必使用特定月份的数字。[DATE_ADD()](/12/12.7/date-and-time-functions.html) 允许你向给定日期添加时间间隔。如果向 [CURDATE()](/12/12.7/date-and-time-functions.html) 的值添加一个月，然后使用 [MONTH()](/12/12.7/date-and-time-functions.html) 提取月份部分，结果将生成要查找生日的月份：

```bash
mysql> SELECT name, birth FROM pet
       WHERE MONTH(birth) = MONTH(DATE_ADD(CURDATE(),INTERVAL 1 MONTH));
```

完成相同任务的另一种方法是在使用模函数（`MOD`）将月份值包装为 `0`（如果当前值为 `12`）后，添加1以获得当前月份之后的下一个月份：

```bash
mysql> SELECT name, birth FROM pet
       WHERE MONTH(birth) = MOD(MONTH(CURDATE()), 12) + 1;
```

[MONTH()](/12/12.7/date-and-time-functions.html) 返回一个介于 `1` 和 `12` 之间的数字。[MOD(something,12)](/12/12.6/12.6.2/mathematical-functions.html) 返回一个介于 `0` 和 `11` 之间的数字。因此，添加必须在 [MOD()](/12/12.6/12.6.2/mathematical-functions.html) 之后，否则我们将从11月（11）到1月（1）。

如果计算使用的日期无效，则计算将失败并产生警告：

```bash
mysql> SELECT '2018-10-31' + INTERVAL 1 DAY;
+-------------------------------+
| '2018-10-31' + INTERVAL 1 DAY |
+-------------------------------+
| 2018-11-01                    |
+-------------------------------+
mysql> SELECT '2018-10-32' + INTERVAL 1 DAY;
+-------------------------------+
| '2018-10-32' + INTERVAL 1 DAY |
+-------------------------------+
| NULL                          |
+-------------------------------+
mysql> SHOW WARNINGS;
+---------+------+----------------------------------------+
| Level   | Code | Message                                |
+---------+------+----------------------------------------+
| Warning | 1292 | Incorrect datetime value: '2018-10-32' |
+---------+------+----------------------------------------+
```

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/date-calculations.html)
