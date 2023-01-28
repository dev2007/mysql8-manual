# 3.6.9 使用 AUTO_INCREMENT

`AUTO_INCREMENT` 属性可用于为新行生成唯一标识：

```bash
CREATE TABLE animals (
     id MEDIUMINT NOT NULL AUTO_INCREMENT,
     name CHAR(30) NOT NULL,
     PRIMARY KEY (id)
);

INSERT INTO animals (name) VALUES
    ('dog'),('cat'),('penguin'),
    ('lax'),('whale'),('ostrich');

SELECT * FROM animals;
```

以上返回：

```bash
+----+---------+
| id | name    |
+----+---------+
|  1 | dog     |
|  2 | cat     |
|  3 | penguin |
|  4 | lax     |
|  5 | whale   |
|  6 | ostrich |
+----+---------+
```

没有为 `AUTO_INCREMENT` 列指定值，因此 MySQL 自动分配序列号。除非启用 [NO_AUTO_VALUE_ON_ZERO](/5/5.1/5.1.11/sql-mode.html) SQL 模式，否则也可以将 `0` 显式分配给列以生成序列号。例如：

```bash
INSERT INTO animals (id,name) VALUES(0,'groundhog');
```

如果列声明为 `NOT NULL`，也可以将 `NULL` 分配给列以生成序列号。例如：

```bash
INSERT INTO animals (id,name) VALUES(NULL,'squirrel');
```

当您将任何其他值插入 `AUTO_INCREMENT` 列时，该列将被设置为该值，序列将被重置，以便下一个自动生成的值从最大的列值开始依次出现。例如：

```bash
INSERT INTO animals (id,name) VALUES(100,'rabbit');
INSERT INTO animals (id,name) VALUES(NULL,'mouse');
SELECT * FROM animals;
+-----+-----------+
| id  | name      |
+-----+-----------+
|   1 | dog       |
|   2 | cat       |
|   3 | penguin   |
|   4 | lax       |
|   5 | whale     |
|   6 | ostrich   |
|   7 | groundhog |
|   8 | squirrel  |
| 100 | rabbit    |
| 101 | mouse     |
+-----+-----------+
```

更新现有的 `AUTO_INCREMENT` 列值也会重置 `AUTO_INCREENT` 序列。

您可以使用 [LAST_INSERT_ID()](/12/12.16/information-functions.html) SQL 函数或 [mysql_insert_id()](https://dev.mysql.com/doc/c-api/8.0/en/mysql-insert-id.html) C API 函数检索最近自动生成的 `AUTO_INCREMENT` 值。这些函数是特定于连接的，因此它们的返回值不受另一个执行插入的连接的影响。

为 `AUTO_INCREMENT` 列使用最小的整数数据类型，该数据类型足够大，可以容纳所需的最大序列值。当列达到数据类型的上限时，下一次生成序列号的尝试将失败。如果可能，请使用 `UNSIGNED` 属性以允许更大的范围。例如，如果使用 [TINYINT](/11/11.1/11.1.2/integer-types.html)，则允许的最大序列号为 `127`。对于 [TINYINT UNSIGNED](/11/11.1/11.1.2/integer-types.html)，最大值为 `255`。有关所有整数类型的范围，参阅[章节 11.1.2，“整数类型（精确值）——Integer、INT、SMALLINT、TINYINT、MEDIUMINT、BIGINT”](/11/11.1/11.1.2/integer-types.html)。

:::tip
对于多行插入，[LAST_INSERT_ID()](/12/12.16/information-functions.html) 和 [mysql_insert_id()](https://dev.mysql.com/doc/c-api/8.0/en/mysql-insert-id.html) 实际上从插入的*第一行*返回 `AUTO_INCREMENT` 键。这允许在复制设置中的其他服务器上正确复制多行插入。
:::

要从非 `1` 的 `AUTO_INCREMENT` 值开始，请使用 [CREATE TABLE](/13/13.1/13.1.20/create-table.html) 或 [ALTER TABLE](/13/13.1/13.1.19/alter-table.html) 设置该值，如下所示：

```bash
mysql> ALTER TABLE tbl AUTO_INCREMENT = 100;
```

## InnoDB 备注

有关特定于 `InnoDB` 的 `AUTO_INCREMENT` 用法的信息，参阅[章节 15.6.1.6，“InnoDB 中的 AUTO_INCREMENT 处理”](/15/15.6/15.6/15.6.1/15.6.1.6/innodb-auto-increment-handling.html)。

## MyISAM 备注

- 对于 MyISAM 表，可以在多列索引的辅助列上指定 `AUTO_INCREMENT`。在这种情况下，`AUTO_INCREMENT` 列的生成值计算为 [MAX(auto_increment_column) + 1 WHERE prefix=given-prefix](/12/12.20/12.20.1/aggregate-functions.html)。当您想将数据放入有序组时，这很有用。

```bash
CREATE TABLE animals (
    grp ENUM('fish','mammal','bird') NOT NULL,
    id MEDIUMINT NOT NULL AUTO_INCREMENT,
    name CHAR(30) NOT NULL,
    PRIMARY KEY (grp,id)
) ENGINE=MyISAM;

INSERT INTO animals (grp,name) VALUES
    ('mammal','dog'),('mammal','cat'),
    ('bird','penguin'),('fish','lax'),('mammal','whale'),
    ('bird','ostrich');

SELECT * FROM animals ORDER BY grp,id;
```

以上返回：

```bash
+--------+----+---------+
| grp    | id | name    |
+--------+----+---------+
| fish   |  1 | lax     |
| mammal |  1 | dog     |
| mammal |  2 | cat     |
| mammal |  3 | whale   |
| bird   |  1 | penguin |
| bird   |  2 | ostrich |
+--------+----+---------+
```

在这种情况下（当 `AUTO_INCREMENT` 列是多列索引的一部分时），如果删除任何组中 `AUTO_INCREENT` 值最大的行，则会重用 `AUTO_INCREMENT` 值。即使对于 `MyISAM` 表也会发生这种情况，对于这些表，`AUTO_INCREMENT` 值通常不会被重用。

- 如果 `AUTO_INCREMENT` 列是多个索引的一部分，MySQL 将使用以 `AUTO_INCREMENT` 列开头的索引（如果有）生成序列值。例如，如果 `animals` 表包含索引 `PRIMARY KEY (grp, id)` 和 `INDEX (id)`，MySQL 将忽略 `PRIMARY KEY` 来生成序列值。因此，该表将包含单个序列，而不是每个 `grp` 值的序列。

## 延伸阅读

有关 `AUTO_INCREMENT` 的更多信息，请访问：

- 如何将 `AUTO_INCREMENT` 属性分配给列：[章节 13.1.20，“CREATE TABLE 语句”](/13/13.1/13.1.20/create-table)和[章节 13.1.9，“ALTER TABLE 语句”](/13/13.1/13.1.9/alter-table.html)。
- `AUTO_INCREMENT` 的行为取决于 [NO_AUTO_VALUE_ON_ZERO](/5/5.1/5.1.11/sql-mode.html) SQL模式：[章节 5.1.11，“服务器 SQL 模式”](/5/5.1/5.1.11/sql-mode.html)。
- 如何使用 [LAST_INSERT_ID()](/12/12.16/information-functions.html) 函数查找包含最新 `AUTO_INCREMENT` 值的行：[章节 12.16，“信息函数”](/12/12.16/information-functions.html)。
- 设置要使用的 `AUTO_INCREMENT` 值：[章节 5.1.8，“服务器系统变量”](/5/5.1/5.1.8/server-system-variables.html)。
- [章节 15.6.1.6，“InnoDB 中的 AUTO_INCREMENT 处理”](/15/15.6/15.6.1/15.6.1.6/innodb-auto-increment-handling.html)
- `AUTO_INCREMENT` 和复制：[章节 17.5.1节，“复制和 AUTO_INCREENT”](/17/17.5/17.5.1/replication-features-auto-increment.html)。
- 与可用于复制的 `AUTO_INCREMENT`（[auto_increment_increment](/17/17.1/17.1.6/17.1.6.2/replication-options-source.html) 和 [auto_increment_offset](/17/17.1/17.1.6/17.1.6.2/replication-options-source.html)）相关的服务器系统变量：[章节 5.1.8，“服务器系统变量”](/5/5.1/5.1.8/server-system-variables.html)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/example-auto-increment.html)
