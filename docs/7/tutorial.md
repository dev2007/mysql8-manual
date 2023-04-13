# 章节 7 备份和恢复

**目录**

- [7.1备份和恢复的数据类型](https://dev.mysql.com/doc/refman/8.0/en/backup-types.html)

- [7.2 多种数据库备份方法](https://dev.mysql.com/doc/refman/8.0/en/backup-methods.html)

- [7.3 备份示例以及恢复策略](https://dev.mysql.com/doc/refman/8.0/en/backup-strategy-example.html)

- [7.4 用 `mysqldump` 命令备份](https://dev.mysql.com/doc/refman/8.0/en/using-mysqldump.html)

- [7.5 按时间点 (增量) 备份](https://dev.mysql.com/doc/refman/8.0/en/point-in-time-recovery.html)

- [7.6 使用 `MyISAM` 引擎的表格维护和崩溃后恢复 ](https://dev.mysql.com/doc/refman/8.0/en/myisam-table-maintenance.html)

备份数据库很重要，通过备份可以恢复数据，再次（正确）启动和运行（程序），以防止出现错误，比如系统崩溃，硬件故障，用户错误的删除数据；备份（操作）也是必须的，特别是作为一种保护措施，在升级MySQL安装程序之前，迁移到MySQL数据库的配置到另外一个系统，或者是为复制的`MySQL` 服务器准备数据。

`MySQL` 提供了多种备份策略，可以选择最适合自己的，满足配置要求的策略。本章讨论了几个关于备份和恢复的主题，这些讨论包含一些或许已经熟悉的内容：
- 备份类型： 逻辑卷备份VS物理卷备份，完全备份VS增量备份，等等。
- 创建备份的多种方式。
- 恢复方式，包括按照时间点恢复。
- 备份计划，压缩，和加密。
- 数据表维护，以便恢复损坏的数据表

## 其他资源

下列内容包含了备份和维护数据可用性的资源:

- `MySQL` 企业版客户可以使用MySQL企业备份产品备份。以下为企业备份概览，参见：[章节 30.2, “MySQL企业备份概览”](https://dev.mysql.com/doc/refman/8.0/en/mysql-enterprise-backup.html).

- 一个专用于备份问题的论坛 https://forums.mysql.com/list.php?28

- `mysqldump` 命令（https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html）的细节,在这里可以找到 【第4章节 *MySQL程序*】（https://dev.mysql.com/doc/refman/8.0/en/programs.html）。666666

- 这里提供了 `MySQL` 语法说明 【第13章节】（https://dev.mysql.com/doc/refman/8.0/en/sql-statements.html）

- 关于 `MySQL` 默认表格引擎 `InnoDB` 备份功能的额外信息，参见【章节15.18.1 InnoDB 备份】（https://dev.mysql.com/doc/refman/8.0/en/innodb-backup.html）

- 复制数据库可以维护多台服务器的可识别数据。它有以下几个优点，比如分散客户端的查询加载到多台服务器，维护特定服务器的可用性即使其下线或者故障， 备份数据而不对数据源产生影响，参见【章节17，*复制服务器*】（https://dev.mysql.com/doc/refman/8.0/en/replication.html）。

- `MySQL InnoDB` 集群是一组产品集合，提供了一种高可用解决方案。使用 `MySQL Shell` 可以创建集群，配置一组 `MySQL` 服务器。这组集群服务器拥有单点数据源，称为主服务器，它能读写数据。多台从属服务器备份数据。高可用集群至少需要创建三台服务器，一台客户端，用以通过 `MySQL` 路由连接主服务器。如果主服务器故障，从属服务器将自动升级为主服务器，`MySQL` 路由将自动路由请求到新的主服务器。

- `NDB Cluster` 集群提供了在分布式计算环境下的高可用，高冗余 `MySQL` 方案，参见【章节 23, *MySQL NDB 集群 8.0*】（https://dev.mysql.com/doc/refman/8.0/en/mysql-cluster.html), which provides information about MySQL NDB Cluster 8.0.）。