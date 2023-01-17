# 3.3.4.8 计数行

数据库通常用于回答“某一类型的数据出现在表中的频率是多少？”例如，你可能想知道你有多少只宠物，或者每个主人有多少只，或者你可能想对你的动物进行各种普查操作。

计算你拥有的动物总数和“`pet` 表上有多少行？”是一样的问题，因为每个宠物都有一条记录。[COUNT(*)](/12/12.20/12.20.1/aggregate-functions.html) 计算行数，因此计算动物数量的查询如下所示：

```bash
mysql> SELECT COUNT(*) FROM pet;
+----------+
| COUNT(*) |
+----------+
|        9 |
+----------+
```

早些时候，你检索了拥有宠物的人的名字。如果你想知道每个主人有多少宠物，可以使用 [COUNT()](/12/12.20/12.20.1/aggregate-functions.html)：

```bash
mysql> SELECT owner, COUNT(*) FROM pet GROUP BY owner;
+--------+----------+
| owner  | COUNT(*) |
+--------+----------+
| Benny  |        2 |
| Diane  |        2 |
| Gwen   |        3 |
| Harold |        2 |
+--------+----------+
```

前面的查询使用 `GROUP BY` 对每个 `owner` 的所有记录进行分组。[COUNT()](/12/12.20/12.20.1/aggregate-functions.html) 与  `GROUP BY` 一起使用对于在各种分组下表征数据非常有用。以下示例显示了执行动物统计操作的不同方法。

每种动物的数量：

```bash
mysql> SELECT species, COUNT(*) FROM pet GROUP BY species;
+---------+----------+
| species | COUNT(*) |
+---------+----------+
| bird    |        2 |
| cat     |        2 |
| dog     |        3 |
| hamster |        1 |
| snake   |        1 |
+---------+----------+
```

每个性别的动物数量：

```bash
mysql> SELECT sex, COUNT(*) FROM pet GROUP BY sex;
+------+----------+
| sex  | COUNT(*) |
+------+----------+
| NULL |        1 |
| f    |        4 |
| m    |        4 |
+------+----------+
```

（在此输出中，`NULL` 表示性别未知。）

每个物种和性别组合的动物数量：

```bash
mysql> SELECT species, sex, COUNT(*) FROM pet GROUP BY species, sex;
+---------+------+----------+
| species | sex  | COUNT(*) |
+---------+------+----------+
| bird    | NULL |        1 |
| bird    | f    |        1 |
| cat     | f    |        1 |
| cat     | m    |        1 |
| dog     | f    |        1 |
| dog     | m    |        2 |
| hamster | f    |        1 |
| snake   | m    |        1 |
+---------+------+----------+
```

使用 [COUNT()](/12/12.20/12.20.1/aggregate-functions.html) 时，不需要检索整个表。例如，上一个查询（仅对狗和猫执行）如下所示：

```bash
mysql> SELECT species, sex, COUNT(*) FROM pet
       WHERE species = 'dog' OR species = 'cat'
       GROUP BY species, sex;
+---------+------+----------+
| species | sex  | COUNT(*) |
+---------+------+----------+
| cat     | f    |        1 |
| cat     | m    |        1 |
| dog     | f    |        1 |
| dog     | m    |        2 |
+---------+------+----------+
```

或者，如果你只想知道已知性别的动物的每种性别的动物数量：

```bash
mysql> SELECT species, sex, COUNT(*) FROM pet
       WHERE sex IS NOT NULL
       GROUP BY species, sex;
+---------+------+----------+
| species | sex  | COUNT(*) |
+---------+------+----------+
| bird    | f    |        1 |
| cat     | f    |        1 |
| cat     | m    |        1 |
| dog     | f    |        1 |
| dog     | m    |        2 |
| hamster | f    |        1 |
| snake   | m    |        1 |
+---------+------+----------+
```

如果除了 [COUNT()](/12/12.20/12.20.1/aggregate-functions.html) 值之外还为要选择的列命名，则应该存在一个 `GROUP BY` 子句来命名这些列。否则，将发生以下情况：

- 如果启用了 [ONLY_FULL_GROUP_BY](/5/5.1/5.1.11/sql-mode.html) SQL 模式，则会发生错误：

```bash
mysql> SET sql_mode = 'ONLY_FULL_GROUP_BY';
Query OK, 0 rows affected (0.00 sec)

mysql> SELECT owner, COUNT(*) FROM pet;
ERROR 1140 (42000): In aggregated query without GROUP BY, expression
#1 of SELECT list contains nonaggregated column 'menagerie.pet.owner';
this is incompatible with sql_mode=only_full_group_by
```

- 如果未启用 [ONLY_FULL_GROUP_BY](/5/5.1/5.1.11/sql-mode.html) ，则通过将所有行视为单个组来处理查询，但为每个命名列选择的值是不确定的。服务器可以自由选择任意行中的值：

```bash
mysql> SET sql_mode = '';
Query OK, 0 rows affected (0.00 sec)

mysql> SELECT owner, COUNT(*) FROM pet;
+--------+----------+
| owner  | COUNT(*) |
+--------+----------+
| Harold |        8 |
+--------+----------+
1 row in set (0.00 sec)
```

另请参阅[章节 12.20.3，“MySQL 对 GROUP BY 的处理”](/12/12.20/12.20.3/group-by-handling.html)。有关 [COUNT(expr)]() 行为和相关优化的信息，参阅[章节 12.20.1，“聚合函数描述”](/12/12.20/12.20.1/aggregate-functions.html)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/counting-rows.html)
