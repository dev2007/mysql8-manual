# 2.11.14 将 MySQL 数据库复制到另一台计算机

在需要在不同体系结构之间传输数据库的情况下，可以使用 [mysqldump](/4/4.5/4.5.4/mysqldump.html) 创建包含 SQL 语句的文件。然后，你可以将文件传输到另一台机器，并将其作为输入输入到 [mysql](/4/4.5/4.5.1/mysql.html) 客户端。

使用 [mysqldump --help](/4/4.5/4.5.4/mysqldump.html)查看可用的选项。

:::tip 注意
如果在创建转储的服务器上使用了 GTID（[gtid_mode=ON](/17/17.1/17.1.6/17.1.6.5/replication-options-gtids.html)），则默认情况下，[mysqldump](/4/4.5/4.5.4/mysqldump.html) 将在转储中包含 [gtid_executed](/17/17.1/17.1.6/17.1.6.5/replication-options-gtids.html) 集的内容，以将其传输到新机器。根据所涉及的 MySQL 服务器版本，此操作的结果可能会有所不同。检查 **mysqldump** 的 `--set-gtid-purged` 选项的描述，以了解你正在使用的版本发生了什么，以及如果默认行为的结果不适合你的情况要如何更改行为。
:::

在两台计算机之间移动数据库的最简单（虽然不是最快）方法是在数据库所在的计算机上运行以下命令：

```bash
mysqladmin -h 'other_hostname' create db_name
mysqldump db_name | mysql -h 'other_hostname' db_name
```

如果要通过比较慢的网络从远程计算机复制数据库，可以使用以下命令：

```bash
mysqladmin create db_name
mysqldump -h 'other_hostname' --compress db_name | mysql db_name
```

你还可以将转储存储在文件中，将文件传输到目标计算机，然后将文件加载到那里的数据库中。例如，可以将数据库转储到源计算机上的压缩文件，如下所示：

```bash
mysqldump --quick db_name | gzip > db_name.gz
```

将包含数据库内容的文件传输到目标计算机，并在那里运行以下命令：

```bash
mysqladmin create db_name
gunzip < db_name.gz | mysql db_name
```

你还可以使用 [mysqldump](/4/4.5/4.5.4/mysqldump.html) 和 [mysqlimport](/4/4.5/4.5.5/mysqlimport.html) 来传输数据库。对于大型表，这比简单地使用 mysqldump 要快得多。在以下命令中，*DUMPDIR* 表示用于存储 mysqldump 输出的目录的完整路径名。

首先，为输出文件创建目录并转储数据库：

```bash
mkdir DUMPDIR
mysqldump --tab=DUMPDIR
   db_name
```

然后将 *DUMPDIR* 目录中的文件传输到目标计算机上的某个相应目录，并将文件加载到 MySQL 中：

```bash
mysqladmin create db_name           # create database
cat DUMPDIR/*.sql | mysql db_name   # create tables in database
mysqlimport db_name
   DUMPDIR/*.txt   # load data into tables
```

不要忘记复制 `mysql` 数据库，因为这是存储授权表的地方。你可能必须在新机器上以 MySQL `root` 用户运行命令，直到 MySQL 数据库就位。
在新机器上导入 `mysql` 数据库后，执行 [mysqladmin flush-privileges](/4/4.5/4.5.2/mysqladmin.html)，以便服务器重新加载授权表信息。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/copying-databases.html)
