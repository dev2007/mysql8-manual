# 1.7.3.2 FOREIGN KEY 约束

外键允许跨表交叉引用相关数据，[外键约束](/glossary)有助于保持数据的一致性。

MySQL 支持 [`CREATE TABLE`](/13/13.1/13.1.20/create-table) 和 [`ALTER TABLE`](/13/13.1/13.1.9/alter-table) 语句中的 `ON UPDATE` 和 `ON DELETE` 外键引用。可用的引用操作有 `RESTRICT`、`CASCADE`、`SET NULL` 和 `NO ACTION`（默认值）。

MySQL Server 也支持 `SET DEFAULT`，但 [`InnoDB`](/15/innodb-storage-engine) 目前将其视为无效而拒绝。因为 MySQL 不支持延迟约束检查，所以没有操作被视为限制。对于 MySQL 支持的外键的确切语法，参阅[章节 13.1.20.5，“FOREIGN KEY 约束”](/13/13.1/13.1.20/13.1.20.5/create-table-foreign-keys)。

允许使用 `MATCH FULL`、`MATCH PARTIAL` 和 `MATCH SIMPLE`，但应避免使用它们，因为它们会导致 MySQL Server 忽略同一语句中使用的任何 `ON DELETE` 或 `ON UPDATE` 子句。`MATCH` 选项在 MySQL 中没有任何其他效果，实际上，MySQL 全时强制执行 `MATCH SIMPLE` 语义。

MySQL 要求外键列被索引；如果在给定列上创建具有外键约束但没有索引的表，则会创建索引。

你可以从 `INFORMATION_SCHEMA.KEY_COLUMN_USAGE` 表中获取有关外键的信息。针对该表的查询示例如下所示：

```bash
mysql> SELECT TABLE_SCHEMA, TABLE_NAME, COLUMN_NAME, CONSTRAINT_NAME
     > FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
     > WHERE REFERENCED_TABLE_SCHEMA IS NOT NULL;
+--------------+---------------+-------------+-----------------+
| TABLE_SCHEMA | TABLE_NAME    | COLUMN_NAME | CONSTRAINT_NAME |
+--------------+---------------+-------------+-----------------+
| fk1          | myuser        | myuser_id   | f               |
| fk1          | product_order | customer_id | f2              |
| fk1          | product_order | product_id  | f1              |
+--------------+---------------+-------------+-----------------+
3 rows in set (0.01 sec)
```

`InnoDB` 表上的外键信息也可以在 `Information_SCHEMA` 数据库的 [`INNODB_FOREIGN`](/26/26.4/26.4.12/information-schema-innodb-foreign-table) 和 [`INNODB_FOREIGN_COLS`](/26/26.4/26.4.13/information-schema-innodb-foreign-cols-table) 表中找到。

`InnoDB` 和 `NDB` 表支持外键。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/constraint-foreign-key.html)
