# 2.3.4.9 测试 MySQL 安装

你可以通过执行以下任何命令来测试 MySQL 服务器是否正常工作：

```bash
C:\> "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqlshow"
C:\> "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqlshow" -u root mysql
C:\> "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqladmin" version status proc
C:\> "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql" test
```

如果 [mysqld](/4/4.3/4.3.1/mysqld.html) 对来自客户端程序的 TCP/IP 连接响应较慢，则你的 DNS 可能存在问题。在这种情况下，启动 [mysqld](/4/4.3/4.3.1/mysqld.html) 时启用 [skip_name_resolve](/5/5.1/5.1.8/server-system-variables.html) 系统变量，并在 MySQL 授权表的 `Host` 列中仅使用 `localhost` 和 IP 地址。（请确保存在指定 IP 地址的帐户，否则你可能无法连接。）

你可以通过指定 [--pipe](/4/4.2/4.2.3/connection-options.html) 或 [--protocol=PIPE](/4/4.2/4.2.3/connection-options.html) 选项，或指定 .（句点）作为主机名，强制 MySQL 客户端使用命名管道连接，而不是 TCP/IP。如果不想使用默认管道名称，请使用 [--socket](/4/4.2/4.2.3/connection-options.html) 选项指定管道名称。

如果你为 `root` 帐户设置了密码，删除了匿名帐户，或创建了新的用户帐户，那么要连接到 MySQL 服务器，你必须在前面显示的命令中使用适当的 `-u` 和 `-p` 选项。参阅[章节 4.2.4，“使用命令选项连接到 MySQL 服务器”](/4/4.2/4.2.4/connecting.html)。

有关 [mysqlshow](/4/4.5/4.5.7/mysqlshow.html)的更多信息，参阅[章节 4.5.7，“mysqlshow-显示数据库、表和列信息”](/4/4.5/4.5.7/mysqlshow.html)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/windows-testing.html)
