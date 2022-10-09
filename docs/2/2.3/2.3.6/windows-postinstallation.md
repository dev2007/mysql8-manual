# 2.3.6 Windows 安装后程序

现有的 GUI 工具可执行本节中描述的大多数任务，包括：

- MySQL 安装程序：用于安装和升级 MySQL 产品。

- MySQL 工作台：管理 MySQL 服务器并编辑 SQL 语句。

如有必要，初始化数据目录并创建 MySQL 授权表。MySQL 安装程序执行的 Windows 安装操作会自动初始化数据目录。对于从 ZIP 压缩包进行安装，按照[章节 2.10.1，“初始化数据目录”](/2/2.10/2.10.1/data-directory-initialization.html)中的说明初始化数据目录。

关于密码，如果你使用 MySQL 安装程序安装 MySQL，你可能已经为初始根帐户分配了密码。（参阅[章节 2.3.3，“MySQL Windows安装程序”](/2/2.3/2.3.3/mysql-installer.html)），否则，请使用[章节 2.10.4，“保护初始 MySQL 帐户”](/2/2.10/2.10.4/default-privileges.html)中给出的密码分配过程。

在分配密码之前，你可能需要尝试运行一些客户端程序，以确保您可以连接到服务器，并且服务器运行正常。确保服务器正在运行（参阅[章节 2.3.4.5，“首次启动服务器”](/2/2.3/2.3.4/2.3.4.5/windows-server-first-start.html)）。你还可以设置在 Windows 启动时自动运行的 MySQL 服务（参阅[章节 2.3.4.8，“将 MySQL 作为 Windows 服务启动”](/2/2.3/2.3.4/2.3.4.8/windows-start-service.html)）。

这些说明假设你的当前位置是 MySQL 安装目录，并且它有一个包含此处使用的 MySQL 程序的 bin 子目录。如果不正确，请相应调整命令路径名称。

如果使用 MySQL 安装程序安装 MySQL（参阅[章节 2.3.3，“Windows MySQL 安装程序”](/2/2.3/2.3.3/mysql-installer.html)），默认安装目录为 `C:\Program Files\MySQL\MySQL Server 8.0`：

```bash
C:\> cd "C:\Program Files\MySQL\MySQL Server 8.0"
```

从 ZIP 压缩包进行安装的常见安装位置是 `C:\mysql`：

```bash
C:\> cd C:\mysql
```

或者，将 bin 目录添加到 `PATH` 环境变量设置中。这使你的命令解释器能够正确地查找 MySQL 程序，因此你可以通过只键入程序名而不是路径名来运行程序。参阅[章节 2.3.4.7，“自定义 MySQL 工具的路径”](/2/2.3/2.3.4/2.3.4.7/mysql-installation-windows-path.html)。

在服务器运行时，发出以下命令以验证您是否可以从服务器检索信息。输出应与此处所示类似。

使用 [mysqlshow](/4/4.5/4.5.7/mysqlshow.html) 查看存在哪些数据库：

```bash
C:\> bin\mysqlshow
+--------------------+
|     Databases      |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
```

已安装数据库的列表可能有所不同，但始终至少包括 `mysql` 和 `information_schema`。

如果不存在正确的 MySQL 帐户，则前面的命令（以及用于 MySQL 等其他 MySQL 程序的命令）可能无法工作。例如，程序可能因错误而失败，或者你可能无法查看所有数据库。如果使用 MySQL 安装程序安装 MySQL，将使用你提供的密码自动创建根用户。在这种情况下，你应该使用 `-u root` 和 `-p` 选项。（如果已经保护了初始 MySQL 帐户，则必须使用这些选项。）使用 `-p`，客户端程序将提示输入 `root` 密码。例如：

```bash
C:\> bin\mysqlshow -u root -p
Enter password: (enter root password here)
+--------------------+
|     Databases      |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
```

如果指定数据库名称，[mysqlshow](/4/4.5/4.5.7/mysqlshow.html) 将显示数据库中的表列表：

```bash
C:\> bin\mysqlshow mysql
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

使用 [mysql](/4/4.5/4.5.1/mysql.html) 程序从 mysql 数据库中的表中选择信息：

```bash
C:\> bin\mysql -e "SELECT User, Host, plugin FROM mysql.user" mysql
+------+-----------+-----------------------+
| User | Host      | plugin                |
+------+-----------+-----------------------+
| root | localhost | caching_sha2_password |
+------+-----------+-----------------------+
```

有关 [mysql](/4/4.5/4.5.1/mysql.html) 和 [mysqlshow](/4/4.5/4.5.7/mysqlshow.html) 的更多信息，参阅[章节 4.5.1，“mysql——MySQL 命令行客户端”](/4/4.5/4.5.1/mysql.html)和[章节 4.4.7，“mysqlshow——显示数据库、表和列信息”](/4/4.5/4.5.7/mysqlshow.html)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/windows-postinstallation.html)
