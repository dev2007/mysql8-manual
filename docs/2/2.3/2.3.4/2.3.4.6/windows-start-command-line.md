# 2.3.4.6 从 Windows 命令行启动 MySQL

可以从命令行手动启动 MySQL 服务器。这可以在任何版本的 Windows 上完成。

要从命令行启动 [mysqld](/4/4.3/4.3.1/mysqld.html) 服务器，你应该启动控制台窗口（或“DOS 窗口”）并输入以下命令：

```bash
C:\> "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld"
```

[mysqld](/4/4.3/4.3.1/mysqld.html) 的路径可能因系统上 MySQL 的安装位置而异。

你可以通过执行以下命令来停止 MySQL 服务器：

```bash
C:\> "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqladmin" -u root shutdown
```

::: tip 注意
如果 MySQL `root` 用户帐户有密码，则需要使用 `-p` 选项调用 [mysqladmin](/4/4.5/4.5.2/mysqladmin.html)，并在提示时提供密码。
:::

此命令调用 MySQL 管理实用程序 [mysqladmin](/4/4.5/4.5.2/mysqladmin.html) 以连接到服务器并告诉它关闭。该命令以 MySQL `root` 用户身份连接，这是 MySQL 授权系统中的默认管理帐户。

::: tip 注意
MySQL 授权系统中的用户完全独立于 Microsoft Windows 下的任何操作系统用户。
:::

如果 [mysqld](/4/4.3/4.3.1/mysqld.html) 没有启动，请检查错误日志，查看服务器是否在那里写入了任何消息来指示问题的原因。默认情况下，错误日志位于 `C:\Program Files\MySQL\MySQL Server 8.0\data` 目录中。它是后缀为 `.err` 的文件，或者可以通过传入 [--log-error](/5/5.1/5.1.7/server-options.html) 选项来指定。或者，你可以尝试使用 [--console](/5/5.1/5.1.7/server-options.html) 选项启动服务器；在这种情况下，服务器可以在屏幕上显示一些有用的信息以帮助解决问题。

最后一个选项是使用 [--standalone](/5/5.1/5.1.7/server-options.html)和 [--debug](/5/5.1/5.1.7/server-options.html) 选项启动 [mysqld](/4/4.3/4.3.1/mysqld.html)。在本例中，[mysqld](/4/4.3/4.3.1/mysqld.html) 写入一个日志文件 `C:\mysqld.trace`，包含 [mysqld](/4/4.3/4.3.1/mysqld.html) 未启动的原因。参阅[章节 5.9.4，“DBUG 包”](/5/5.9/5.9.4/dbug-package.html)。

使用 [mysqld --verbose --help](/4/4.3/4.3.1/mysqld.html) 显示 [mysqld](/4/4.3/4.3.1/mysqld.html) 支持的所有选项。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/windows-start-command-line.html)
