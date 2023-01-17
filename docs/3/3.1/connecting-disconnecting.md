# 3.1 连接和断开服务器

要连接到服务器，通常需要在调用 [mysql](/4/4.5/4.5.1/mysql.html) 时提供 MySQL 用户名，以及很大可能还要提供密码。如果服务器运行的计算机不是你登录的计算机，则还必须指定主机名。请与管理员联系，了解应该使用哪些连接参数进行连接（即，要使用的主机、用户名和密码）。一旦知道了正确的参数，就应该能够这样连接：

```bash
$> mysql -h host -u user -p
Enter password: ********
```

*host* 和 *user* 表示运行 MySQL 服务器的主机名和 MySQL 帐户的用户名。为设置替换适当的值。`********` 代表你的密码；当 [mysql](/4/4.5/4.5.1/mysql.html) 显示 `Enter password：` 提示符时输入它。

如果这有效，你应该看到一些介绍性信息，然后是 `mysql>` 提示：

```bash
$> mysql -h host -u user -p
Enter password: ********
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 25338 to server version: 8.0.31-standard

Type 'help;' or '\h' for help. Type '\c' to clear the buffer.

mysql>
```

`mysql>` 提示告诉你 [mysql](/4/4.5/4.5.1/mysql.html) 已准备好输入 SQL 语句。

如果你在运行 MySQL 的同一台计算机上登录，则可以省略主机，只需使用以下命令：

```bash
$> mysql -u user -p
```

如果尝试登录时收到错误消息，例如 `ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/tmp/mysql.sock' (2)` 连接到本地 MySQL 服务器，则表示 MySQL 服务器守护程序（Unix）或服务（Windows）未运行。请咨询管理员或参阅[第2章，“安装和升级 MySQL”](/2/installing.html)中适用于你的操作系统的部分。

有关尝试登录时经常遇到的其他问题的帮助，请参阅[章节 B.3.2，“使用 MySQL 程序时的常见错误”](/b/b.3/b.3.2/common-errors.html)。

一些 MySQL 安装允许用户作为匿名（未命名）用户连接到本地主机上运行的服务器。如果你的机器上是这种情况，你应该能够通过调用 [mysql](/4/4.5/4.5.1/mysql.html) 连接到该服务器，而无需任何选项：

```bash
$> mysql
```

成功连接后，可以随时通过在 `mysql>` 提示符下键入 `QUIT`（或 `\q`）来断开连接：

```bash
mysql> QUIT
Bye
```

在Unix上，你也可以按 `Control + D` 断开连接。

后续章节中的大多数示例假设你已连接到服务器。它们通过 `mysql>` 提示符指示这一点。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/connecting-disconnecting.html)
