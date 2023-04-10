# 章节 7 备份和恢复

**目录**

- [7.1备份和恢复的数据类型](https://dev.mysql.com/doc/refman/8.0/en/backup-types.html)

- [7.2 多种数据库备份方法](https://dev.mysql.com/doc/refman/8.0/en/backup-methods.html)

- [7.3 备份示例以及恢复策略](https://dev.mysql.com/doc/refman/8.0/en/backup-strategy-example.html)

  

- [7.4 mysqldump 命令用以备份](https://dev.mysql.com/doc/refman/8.0/en/using-mysqldump.html)

  

- [7.5 Point-in-Time (Incremental) Recovery](https://dev.mysql.com/doc/refman/8.0/en/point-in-time-recovery.html)

  

- [7.6 MyISAM Table Maintenance and Crash Recovery](https://dev.mysql.com/doc/refman/8.0/en/myisam-table-maintenance.html)

  



It is important to back up your databases so that you can recover your data and be up and running again in case problems occur, such as system crashes, hardware failures, or users deleting data by mistake. Backups are also essential as a safeguard before upgrading a MySQL installation, and they can be used to transfer a MySQL installation to another system or to set up replica servers.

MySQL offers a variety of backup strategies from which you can choose the methods that best suit the requirements for your installation. This chapter discusses several backup and recovery topics with which you should be familiar:

- Types of backups: Logical versus physical, full versus incremental, and so forth.
- Methods for creating backups.
- Recovery methods, including point-in-time recovery.
- Backup scheduling, compression, and encryption.
- Table maintenance, to enable recovery of corrupt tables.

## Additional Resources

Resources related to backup or to maintaining data availability include the following:

- Customers of MySQL Enterprise Edition can use the MySQL Enterprise Backup product for backups. For an overview of the MySQL Enterprise Backup product, see [Section 30.2, “MySQL Enterprise Backup Overview”](https://dev.mysql.com/doc/refman/8.0/en/mysql-enterprise-backup.html).
- A forum dedicated to backup issues is available at https://forums.mysql.com/list.php?28.
- Details for [**mysqldump**](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html) can be found in [Chapter 4, *MySQL Programs*](https://dev.mysql.com/doc/refman/8.0/en/programs.html).
- The syntax of the SQL statements described here is given in [Chapter 13, *SQL Statements*](https://dev.mysql.com/doc/refman/8.0/en/sql-statements.html).
- For additional information about `InnoDB` backup procedures, see [Section 15.18.1, “InnoDB Backup”](https://dev.mysql.com/doc/refman/8.0/en/innodb-backup.html).
- Replication enables you to maintain identical data on multiple servers. This has several benefits, such as enabling client query load to be distributed over servers, availability of data even if a given server is taken offline or fails, and the ability to make backups with no impact on the source by using a replica. See [Chapter 17, *Replication*](https://dev.mysql.com/doc/refman/8.0/en/replication.html).
- MySQL InnoDB Cluster is a collection of products that work together to provide a high availability solution. A group of MySQL servers can be configured to create a cluster using MySQL Shell. The cluster of servers has a single source, called the primary, which acts as the read-write source. Multiple secondary servers are replicas of the source. A minimum of three servers are required to create a high availability cluster. A client application is connected to the primary via MySQL Router. If the primary fails, a secondary is automatically promoted to the role of primary, and MySQL Router routes requests to the new primary.
- NDB Cluster provides a high-availability, high-redundancy version of MySQL adapted for the distributed computing environment. See [Chapter 23, *MySQL NDB Cluster 8.0*](https://dev.mysql.com/doc/refman/8.0/en/mysql-cluster.html), which provides information about MySQL NDB Cluster 8.0.