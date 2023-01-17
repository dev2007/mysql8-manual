# 3.3.4.9 使用多个表

`pet` 表会记录你养了哪些宠物。如果你想记录他们的其他信息，比如他们生活中的事件，比如去看兽医，或者出生时，你需要另一张桌子。这张桌子应该是什么样子的？它需要包含以下信息：

- 宠物的名字，这样你就可以知道每个事件都属于哪种动物。
- 一个日期，以便你知道事件发生的时间。
- 描述事件的字段。
- 事件类型字段，如果你希望能够对事件进行分类。

考虑到这些因素，事件表的 [CREATE TABLE](/13/13.1/13.1.20/create-table.html) 语句可能如下所示：

```bash
mysql> CREATE TABLE event (name VARCHAR(20), date DATE,
       type VARCHAR(15), remark VARCHAR(255));
```

与 `pet` 表一样，通过创建包含以下信息的制表符分隔文本文件，最容易加载初始记录。

|name|date|type|remark|
|--|--|--|--|
|Fluffy|1995-05-15|litter|4 kittens, 3 female, 1 male|
|Buffy|1993-06-23|litter|5 puppies, 2 female, 3 male|
|Buffy|1994-06-19|litter|3 puppies, 3 female|
|Chirpy|1999-03-21|vet|needed beak straightened|
|Slim|1997-08-03|vet|broken rib|
|Bowser|1991-10-12|kennel||
|Fang|1991-10-12|kennel||
|Fang|1998-08-28|birthday|Gave him a new chew toy|
|Claws|1998-03-17|birthday|Gave him a new flea collar|
|Whistler|1998-12-09|birthday|First birthday|

按如下方式加载记录：

```bash
mysql> LOAD DATA LOCAL INFILE 'event.txt' INTO TABLE event;
```

根据你从 `pet` 表上运行的查询中了解到的信息，你应该能够对事件表中的记录执行检索；原则是一样的。但什么时候 `event` 表本身不足以回答你可能提出的问题？

假设你想知道每只宠物产仔的年龄。我们之前看过如何根据两个日期计算年龄。母亲的产仔日期在 `event` 表中，但要计算她在该日期的年龄，你需要她的出生日期，该日期存储在 `pet` 表中。这意味着查询需要两个表：

```bash
mysql> SELECT pet.name,
       TIMESTAMPDIFF(YEAR,birth,date) AS age,
       remark
       FROM pet INNER JOIN event
         ON pet.name = event.name
       WHERE event.type = 'litter';
+--------+------+-----------------------------+
| name   | age  | remark                      |
+--------+------+-----------------------------+
| Fluffy |    2 | 4 kittens, 3 female, 1 male |
| Buffy  |    4 | 5 puppies, 2 female, 3 male |
| Buffy  |    5 | 3 puppies, 3 female         |
+--------+------+-----------------------------+
```

关于此查询，需要注意以下几点：

- `FROM` 子句连接两个表，因为查询需要从这两个表中提取信息。
- 组合（联接）多个表中的信息时，需要指定一个表中记录与另一个表的记录的匹配方式。这很容易，因为它们都有一个 `name` 列。查询使用 `ON` 子句根据 `name` 值匹配两个表中的记录。

    查询使用 `INNER JOIN` 组合表。当且仅当两个表都满足 `ON` 子句中指定的条件时，`INNER JOIN` 允许任一表中的行出现在结果中。在本例中，`ON` 子句指定 `pet` 表中的 `name` 列必须与事件表中的名称列匹配。如果某个名称出现在一个表中，而另一个表没有出现，则该行不会出现在结果中，因为 `ON` 子句中的条件失败。

- 因为 `name` 列出现在两个表中，所以在引用该列时，必须明确所指的表。这是通过在列名前加上表名来完成的。

执行联接不需要有两个不同的表。有时，如果你想将表中的记录与同一表中的其他记录进行比较，将表连接到表本身是很有用的。例如，要在你的宠物中找到繁殖配对，你可以将 `pet` 表与自己一起生成同类物种的候选雄性和雌性：

```bash
mysql> SELECT p1.name, p1.sex, p2.name, p2.sex, p1.species
       FROM pet AS p1 INNER JOIN pet AS p2
         ON p1.species = p2.species
         AND p1.sex = 'f' AND p1.death IS NULL
         AND p2.sex = 'm' AND p2.death IS NULL;
+--------+------+-------+------+---------+
| name   | sex  | name  | sex  | species |
+--------+------+-------+------+---------+
| Fluffy | f    | Claws | m    | cat     |
| Buffy  | f    | Fang  | m    | dog     |
+--------+------+-------+------+---------+
```

在这个查询中，我们为表名指定别名以引用列，并保持每个列引用与表的哪个实例相关联。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/multiple-tables.html)
