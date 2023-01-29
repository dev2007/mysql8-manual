# 3.4 获取有关数据库和表的信息

如果忘记了数据库或表的名称，或者忘记了给定表的结构（例如，其列的名称），该怎么办？MySQL 通过几个语句解决了这个问题，这些语句提供了有关它支持的数据库和表的信息。

你以前看过 [SHOW DATABASES](/13/13.7/13.7.7/13.7.7.14/show-databases.html)，它列出了服务器管理的数据库。要查找当前选择的数据库，请使用 [DATABASE()](/12/12.16/information-functions.html) 函数：

```bash
mysql> SELECT DATABASE();
+------------+
| DATABASE() |
+------------+
| menagerie  |
+------------+
```

如果尚未选择任何数据库，则结果为 `NULL`。

要查找默认数据库包含哪些表（例如，当你不确定表的名称时），请使用以下语句：

```bash
mysql> SHOW TABLES;
+---------------------+
| Tables_in_menagerie |
+---------------------+
| event               |
| pet                 |
+---------------------+
```

此语句生成的输出中的列的名称始终为 `Tables_in_db_name`，其中 *db_name* 是数据库的名称。更多信息参阅[章节 13.7.7.39，“SHOW TABLES 语句”](/13/13.7/13.7.7/13.7.7.39/show-tables.html)。

如果你想了解表的结构，[DESCRIBE](/13/13.8/13.8.1/describe.html) 语句很有用；它显示关于表的每个列的信息：

```bash
mysql> DESCRIBE pet;
+---------+-------------+------+-----+---------+-------+
| Field   | Type        | Null | Key | Default | Extra |
+---------+-------------+------+-----+---------+-------+
| name    | varchar(20) | YES  |     | NULL    |       |
| owner   | varchar(20) | YES  |     | NULL    |       |
| species | varchar(20) | YES  |     | NULL    |       |
| sex     | char(1)     | YES  |     | NULL    |       |
| birth   | date        | YES  |     | NULL    |       |
| death   | date        | YES  |     | NULL    |       |
+---------+-------------+------+-----+---------+-------+
```

`Field` 表示列名，`Type` 表示列的数据类型，`NULL` 表示列是否可以包含 `NULL` 值，`Key` 表示列是否被索引，`Default` 表示列的默认值。`Extra` 显示有关列的特殊信息：如果使用 `AUTO_INCREMENT` 选项创建列，则值为 `auto_increment` 而不是空。

`DESC` 是 [DESCRIBE](/13/13.8/13.8.1/describe.html) 的缩写。更多信息参阅[章节 13.8.1，“DESCRIBE 语句”](/13/13.8/13.8.1/describe.html)。

可以使用 [SHOW CREATE TABLE](/13/13.7/13.7.7/13.7.7.10/show-create-table.html) 语句获取创建现有表所需的 [CREATE TABLE](/13/13.1/13.1.20/create-table.html) 语句。参阅[章节 13.7.7.10，“SHOW CREATE TABLE 语句”](/13/13.7/13.7.7/13.7.7.10/show-create-table.html)。

如果表上有索引，`SHOW INDEX FROM tbl_name` 将生成有关它们的信息。有关此语句的更多信息，参阅[章节 13.7.7.22，“SHOW INDEX 声明”](/13/13.7/13.7.7/13.7.7.22/show-index.html)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/getting-information.html)
