# 2.10.3 测试服务器

初始化数据目录并启动服务器后，执行一些简单的测试以确保其正常工作。本节假设你的当前位置是 MySQL 安装目录，并且它有一个 `bin` 子目录，其中包含此处使用的 MySQL 程序。如果不是这样，请相应地调整命令路径名。

或者，将 `bin` 目录添加到 `PATH` 环境变量设置中。这使你的 shell（命令解释器）能够正确查找 MySQL 程序，这样你就可以只键入程序的名称而不是路径名来运行程序。参阅[章节 4.2.9，“设置环境变量”](/4/4.2/4.2.9/setting-environment-variables.html)。

使用 [mysqladmin](/4/4.5/4.5.2/mysqladmin.html) 验证服务器是否正在运行。以下命令提供了简单的测试，以检查服务器是否启动并响应连接：

```bash
$> bin/mysqladmin version
$> bin/mysqladmin variables
```

如果无法连接到服务器，请指定 `-u root` 选项以作为 `root` 连接。如果已经为 `root` 帐户分配了密码，则还需要在命令行中指定 `-p` 并在提示时输入密码。例如：

```bash
$> bin/mysqladmin -u root -p version
Enter password: (enter root password here)
```

根据你的平台和 MySQL 版本，[mysqladmin version](/4/4.5/4.5.2/mysqladmin.html) 的输出略有不同，但应该与以下所示类似：

```bash
$> bin/mysqladmin version
mysqladmin  Ver 14.12 Distrib 8.0.31, for pc-linux-gnu on i686
...

Server version          8.0.31
Protocol version        10
Connection              Localhost via UNIX socket
UNIX socket             /var/lib/mysql/mysql.sock
Uptime:                 14 days 5 hours 5 min 21 sec

Threads: 1  Questions: 366  Slow queries: 0
Opens: 0  Flush tables: 1  Open tables: 19
Queries per second avg: 0.000
```

要查看你可以使用 [mysqladmin](/4/4.5/4.5.2/mysqladmin.html) 做什么，请使用 [--help](/4/4.5/4.5.2/mysqladmin.html) 选项调用它。

验证你是否可以关闭服务器（如果 `root` 帐户已经有密码，则包括 `-p` 选项）：

```bash
$> bin/mysqladmin -u root shutdown
```

验证是否可以再次启动服务器。通过使用 [mysqld_safe](/4/4.3/4.3.2/mysqld-safe.html) 或直接调用 [mysqld](/4/4.3/4.3.1/mysqld.html) 来执行此操作。例如：

```bash
$> bin/mysqld_safe --user=mysql &
```

如果 [mysqld_safe](/4/4.3/4.3.2/mysqld-safe.html) 失败，参阅[章节 2.10.2.1，“启动 MySQL 服务器的疑难解答”](/2/2.10/2.10.2/2.10.2.1/starting-server-troubleshooting.html)。

运行一些简单的测试以验证是否可以从服务器检索信息。输出应与此处所示类似。

使用 [mysqlshow](/4/4.5/4.5.7/mysqlshow.html) 查看存在哪些数据库：

```bash
$> bin/mysqlshow
+--------------------+
|     Databases      |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
```

安装的数据库列表可能有所不同，但始终至少包括 `mysql` 和 `information_schema`。

如果指定数据库名称，[mysqlshow](/4/4.5/4.5.7/mysqlshow.html) 将显示数据库中的表列表：

```bash
$> bin/mysqlshow mysql
Database: mysql
+---------------------------+
|          Tables           |
+---------------------------+
| columns_priv              |
| component                 |
| db                        |
| default_roles             |
| engine_cost               |
| func                      |
| general_log               |
| global_grants             |
| gtid_executed             |
| help_category             |
| help_keyword              |
| help_relation             |
| help_topic                |
| innodb_index_stats        |
| innodb_table_stats        |
| ndb_binlog_index          |
| password_history          |
| plugin                    |
| procs_priv                |
| proxies_priv              |
| role_edges                |
| server_cost               |
| servers                   |
| slave_master_info         |
| slave_relay_log_info      |
| slave_worker_info         |
| slow_log                  |
| tables_priv               |
| time_zone                 |
| time_zone_leap_second     |
| time_zone_name            |
| time_zone_transition      |
| time_zone_transition_type |
| user                      |
+---------------------------+
```

使用 [mysql](/4/4.5/4.5.1/mysql.html) 程序从 `mysql` 模式中的表中选择信息：

```bash
$> bin/mysql -e "SELECT User, Host, plugin FROM mysql.user" mysql
+------+-----------+-----------------------+
| User | Host      | plugin                |
+------+-----------+-----------------------+
| root | localhost | caching_sha2_password |
+------+-----------+-----------------------+
```

此时，你的服务器正在运行，你可以访问它。如果你尚未为初始帐户分配密码，请按照[章节 2.10.4，“保护初始 MySQL帐户 ”](/2/2.10/2.10.4/default-privileges.html)中的说明来加强安全性。

有关 [mysql](/4/4.5/4.5.1/mysql.html)、[mysqladmin](/4/4.5/4.5.2/mysqladmin.html) 和 [mysqlshow](/4/4.5/4.5.7/mysqlshow.html) 的更多信息，参阅[章节 4.5.1，“mysql——MySQL 命令行客户端”](/4/4.5/4.5.1/mysql.html)、[章节 4.5.2，“mysqladmin——MySQL 服务器管理程序”](/4/4.5/4.5.2/mysqladmin.html)和[章节 4.5.7，“mysqlshow——显示数据库、表和列信息”](/4/4.5/4.5.7/mysqlshow.html)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/testing-server.html)
