# 2.10.2 启动服务器

- [2.10.2.1 启动 MySQL 服务器的疑难解答](/2/2.10/2.10.2/2.10.2.1/starting-server-troubleshooting.html)

本节介绍如何在 Unix 和类 Unix 系统上启动服务器。（对于 Windows，参阅[章节 2.3.4.5，“首次启动服务器”](/2/2.3/2.3.4/2.3.4.5/windows-server-first-start.html)。）有关可用于测试服务器是否可访问和正常工作的一些建议命令，参阅[章节 2.10.3，“测试服务器”](/2/2.10/2.10.3/testing-server.html)。

如果你的安装包含 [mysqld_safe](/4/4.3/4.3.2/mysqld-safe.html)，请像这样启动 MySQL 服务器：

```bash
$> bin/mysqld_safe --user=mysql &
```

:::tip 注意
对于使用 RPM 包安装 MySQL 的 Linux 系统，服务器启动和关闭使用 systemd 而不是 [mysqld_safe](/4/4.3/4.3.2/mysqld-safe.html) 进行管理，并且未安装 [mysqld_safe](/4/4.3/4.3.2/mysqld-safe.html)。参阅[章节 2.5.9，“使用 systemd 管理 MySQL 服务器”](/2/2.5/2.5.9/using-systemd.html)。
:::

如果你的安装包含 systemd 支持，请这样启动服务器：

```bash
$> systemctl start mysqld
```

如果服务名称与 `mysqld` 不同，请替换相应的服务名称（例如，SLES 系统上的 `mysql`）。

使用非特权（非 `root`）登录帐户运行MySQL服务器非常重要。要确保这一点，请以 `root` 运行 [mysqld_safe](/4/4.3/4.3.2/mysqld-safe.html)，并包含 [--user](/4/4.3/4.3.2/mysqld-safe.html) 选项，如图所示。否则，你应该在以 `mysql` 登录时执行程序，在这种情况下，可以从命令中省略 [--user](/4/4.3/4.3.2/mysqld-safe.html) 选项。

有关以非特权用户身份运行 MySQL 的更多说明，参阅[章节 6.1.5，“如何以普通用户身份运行 MySQL”](/6/6.1/6.1.5/changing-mysql-user.html)。

如果命令立即失败并打印 `mysqld ended`，请在错误日志中查找信息（默认情况下是数据目录中的 `host_name.err` 文件）。

如果服务器无法访问它启动的数据目录或读取 `mysql` 模式中的授权表，它将向错误日志写入一条消息。如果在继续执行此步骤之前忽略了通过初始化数据目录来创建授权表，或者如果在没有 `--user` 选项的情况下运行了初始化数据目录的命令，则可能会出现此类问题。删除数据目录并使用 `--user` 选项运行命令。

如果你在启动服务器时遇到其他问题，参阅[章节 2.10.2.1，“启动 MySQL 服务器的疑难解答”](/2/2.10/2.10.2/2.10.2.1/starting-server-troubleshooting.html)。有关 [mysqld_safe](/4/4.3/4.3.2/mysqld-safe.html) 的更多信息，参阅[章节 4.3.2，“mysqld_safe——MySQL 服务器启动脚本”](/4/4.3/4.3.2/mysqld-safe.html)。有关 systemd 支持的更多信息，参阅[章节 2.5.9，“使用 systemd 管理 MySQL 服务器”](/2/2.5/2.5.9/using-systemd.html)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/starting-server.html)
