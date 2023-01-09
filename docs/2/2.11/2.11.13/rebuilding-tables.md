# 2.11.13 重建或修复表或索引

本节介绍如何重建或修复表或索引，这可能是以下情况所必需的：

- 更改 MySQL 处理数据类型或字符集的方式。例如，排序规则中的错误可能已更正，因此需要重新生成表以更新使用排序规则的字符列的索引。
- [CHECK TABLE](/13/13.7/13.7.3/13.7.3.2/check-table.html)、[mysqlcheck](/4/4.5/4.5.3/mysqlcheck.html) 或 [mysql_upgrade](/4/4.4/4.4.5/mysql-upgrade.html) 报告的所需表修复或升级。

重建表的方法包括：

[[toc]]

## 转储和重新加载方法

如果你正在重建表，因为在二进制（就地）升级或降级后，不同版本的 MySQL 无法处理它们，则必须使用转储和重新加载方法。在使用 MySQL 的原始版本升级或降级*之前*转储表。然后在升级或降级*之后*重新加载表。

如果仅为了重建索引而使用转储和重新加载方法来重建表，则可以在升级或降级之前或之后执行转储。之后仍必须重新加载。

如果你需要重建 `InnoDB` 表，因为 [CHECK TABLE](/13/13.7/13.7.3/13.7.3.2/check-table.html) 操作指示需要升级表，请使用 [mysqldump](/4/4.5/4.5.4/mysqldump.html) 创建转储文件，使用 [mysql](/4/4.5/4.5.1/mysql.html) 重新加载该文件。如果 [CHECK TABLE](/13/13.7/13.7.3/13.7.3.2/check-table.html) 操作指示存在损坏或导致 `InnoDB` 失败，参阅[章节 15.21.3，“强制 InnoDB 恢复”](/15/15.21/15.21.3/forcing-innodb-recovery.html)，了解有关使用InnoDB_force_Recovery选项重新启动InnoDB的信息。要了解 [CHECK TABLE](/13/13.7/13.7.3/13.7.3.2/check-table.html) 可能遇到的问题类型，参阅[章节 13.7.3.2，“CHECK TABLE 语句”](/13/13.7/13.7.3/13.7.3.2/check-table.html)中的 `InnoDB` 注释。

要通过转储和重新加载来重建表，请使用 [mysqldump](/4/4.5/4.5.4/mysqldump.html) 创建转储文件，使用 [mysql](/4/4.5/4.5.1/mysql.html) 重新加载文件：

```bash
mysqldump db_name t1 > dump.sql
mysql db_name < dump.sql
```

要在单个数据库中重建所有表，请指定数据库名称，但不指定以下任何表名称：

```bash
mysqldump db_name > dump.sql
mysql db_name < dump.sql
```

要重建所有数据库中的所有表，请使用 [--all-databases](/4/4.5/4.5.4/mysqldump.html) 选项：

```bash
mysqldump --all-databases > dump.sql
mysql < dump.sql
```

## ALTER TABLE 方法

要使用 [ALTER TABLE](/13/13.1/13.1.9/alter-table.html) 重建表，请使用 “null” 更改；也就是说，[ALTER TABLE](/13/13.1/13.1.9/alter-table.html) 语句“更改”表以使用它已经拥有的存储引擎。例如，如果 `t1` 是 `InnoDB` 表，请使用以下语句：

```bash
ALTER TABLE t1 ENGINE = InnoDB;
```

如果不确定要在 [ALTER TABLE](/13/13.1/13.1.9/alter-table.html) 语句中指定哪个存储引擎，请使用 [SHOW CREATE TABLE](/13/13.7/13.7.7/13.7.7.10/show-create-table.html) 显示表定义。

## REPAIR TABLE 方法

[REPAIR TABLE](/13/13.7/13.7.3/13.7.3.5/repair-table.html) 方法仅适用于 `MyISAM`、`ARCHIVE` 和 `CSV` 表。

如果表检查操作指示存在损坏或需要升级，则可以使用 [REPAIR TABLE](/13/13.7/13.7.3/13.7.3.5/repair-table.html)。例如，要修复 `MyISAM` 表，请使用以下语句：

```bash
REPAIR TABLE t1;
```

[mysqlcheck --repair](/4/4.5/4.5.3/mysqlcheck.html) 提供对 [REPAIR TABLE](/13/13.7/13.7.3/13.7.3.5/repair-table.html) 语句的命令行访问。这可能是一种更方便的修复表的方法，因为你可以使用 [--databases]((/4/4.5/4.5.3/mysqlcheck.html) 或 [--all-databases]((/4/4.5/4.5.3/mysqlcheck.html) 选项分别修复特定数据库或所有数据库中的所有表：

```bash
mysqlcheck --repair --databases db_name ...
mysqlcheck --repair --all-databases
```

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/rebuilding-tables.html)
