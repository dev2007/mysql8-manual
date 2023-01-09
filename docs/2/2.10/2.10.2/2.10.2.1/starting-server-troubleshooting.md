# 2.10.2.1 启动 MySQL 服务器的疑难解答

本节为启动服务器时出现的问题提供疑难解答建议。有关 Windows 系统的其他建议，参阅[章节 2.3.5，“Microsoft Windows MySQL 服务器安装疑难解答”](/2/2.3/2.3.5/windows-troubleshooting.html)。

如果你在启动服务器时遇到问题，请尝试以下操作：

- 检查[错误日志](/glossary.html)以了解服务器未启动的原因。日志文件位于[数据目录](/glossary.html)中（Windows 上通常为 `C:\Program files\MySQL\MySQL Server 8.0\data`，Unix/Linux 二进制分发为 `/usr/local/mysql/data`，Unix/Linux 源分发为 `usr/local/var`）。在数据目录中查找名称为 `host_name.err` 和 `host_name.log` 的文件，其中 *host_name* 是服务器主机的名称。然后检查这些文件的最后几行。使用 `tail` 显示它们：

    ```bash
    $> tail host_name.err
    $> tail host_name.log
    ```

- 指定所使用的存储引擎所需的任何特殊选项。你可以创建 `my.cnf` 文件并为计划使用的引擎指定启动选项。如果你要使用支持事务表（`InnoDB`、[NDB](/23/mysql-cluster.html)）的存储引擎，请确保在启动服务器之前按照你希望的方式配置它们。如果你使用的是 `InnoDB` 表，参阅[章节 15.8，“InnoDB 配置”](/15/15.8/innodb-configuration.html)中的指南，以及[章节 15.14，“InnoDB 启动选项和系统变量”](/15/15.14/innodb-parameters.html)中的选项语法。

    尽管存储引擎对你忽略的选项使用默认值，但 Oracle 建议你查看可用选项，并为默认值不适合你安装的任何选项指定显式值。

- 确保服务器知道在哪里可以找到数据目录。[mysqld](/4/4.3/4.3.1/mysqld.html) 服务器使用此目录作为其当前目录。这是它希望查找数据库和写入日志文件的位置。服务器还将 pid（进程 ID）文件写入数据目录。

    编译服务器时，默认数据目录位置是硬编码的。要确定默认路径设置，请使用 [--verbose](/5/5.1/5.1.7/server-options.html) 和 [--help](/5/5.1/5.1.7/server-options.html) 选项调用 [mysqld](/4/4.3/4.3.1/mysqld.html)。如果数据目录位于系统的其他位置，请在命令行或选项文件中使用 [--datadir](/5/5.1/5.1.8/server-system-variables.html) 选项指定该位置到 [mysqld](/4/4.3/4.3.1/mysqld.html) 或 [mysqld_safe](/4/4.3/4.3.2/mysqld-safe.html)。否则，服务器将无法正常工作。作为 [--datadir](/5/5.1/5.1.8/server-system-variables.html) 选项的替代，你可以使用 [--basedir](/5/5.1/5.1.8/server-system-variables.html) 指定 [mysqld](/4/4.3/4.3.1/mysqld.html) 安装 MySQL 的基本目录的位置，[mysqld](/4/4.3/4.3.1/mysqld.html) 在那里查找 `data` 目录。

    要检查指定路径选项的效果，请使用这些选项调用 [mysqld](/4/4.3/4.3.1/mysqld.html)，后跟 [--verbose](/5/5.1/5.1.7/server-options.html) 和 [--help](/5/5.1/5.1.7/server-options.html) 选项。例如，如果你将位置更改为安装 [mysqld](/4/4.3/4.3.1/mysqld.html) 的目录，然后运行以下命令，将显示使用 `/usr/local` 基本目录启动服务器的效果：

    ```bash
    $> ./mysqld --basedir=/usr/local --verbose --help
    ```

    你也可以指定其他选项，例如 [--datadir](/5/5.1/5.1.8/server-system-variables.html)，但 [--verbose](/5/5.1/5.1.7/server-options.html) 和 [--help](/5/5.1/5.1.7/server-options.html) 必须是最后一个选项。

    一旦确定了所需的路径设置，就可以在没有 [--verbose](/5/5.1/5.1.7/server-options.html) 和 [--help](/5/5.1/5.1.7/server-options.html) 的情况下启动服务器。

    如果 [mysqld](/4/4.3/4.3.1/mysqld.html) 当前正在运行，你可以通过执行以下命令来了解它使用的路径设置：

    ```bash
    $> mysqladmin variables
    ```

    或者，

    ```bash
    $> mysqladmin -h host_name variables
    ```

    *host_name* 是 MySQL 服务器主机的名称。

- 确保服务器可以访问数据目录。数据目录及其内容的所有权和权限必须允许服务器读取和修改它们。

    如果在启动 [mysqld](/4/4.3/4.3.1/mysqld.html) 时得到 `Errcode 13`（这意味着权限被拒绝），这意味着数据目录或其内容的权限不允许服务器访问。在这种情况下，你可以更改相关文件和目录的权限，以便服务器有权使用它们。你也可以以 `root` 启动服务器，但这会引发安全问题，应该避免。

    将位置更改为数据目录，并检查数据目录及其内容的所有权，以确保服务器具有访问权限。例如，如果数据目录是 `/usr/local/mysql/var`，请使用以下命令：

    ```bash
    $> ls -la /usr/local/mysql/var
    ```

    如果数据目录或其文件或子目录不属于用于运行服务器的登录帐户，请将其所有权更改为该帐户。如果帐户名为 `mysql`，请使用以下命令：

    ```bash
    $> chown -R mysql /usr/local/mysql/var
    $> chgrp -R mysql /usr/local/mysql/var
    ```

    即使拥有正确的所有权，如果你的系统上运行其他安全软件来管理应用程序对文件系统各个部分的访问，MySQL 也可能无法启动。在这种情况下，请重新配置该软件，使 [mysqld](/4/4.3/4.3.1/mysqld.html) 能够在正常操作期间访问它使用的目录。

- 验证服务器要使用的网络接口是否可用。

    如果出现以下任一错误，则表示其他程序（可能是另一个 [mysqld](/4/4.3/4.3.1/mysqld.html) 服务器）正在使用 [mysqld](/4/4.3/4.3.1/mysqld.html) 试图使用的 TCP/IP 端口或 Unix 套接字文件：

    ```bash
    Can't start server: Bind on TCP/IP port: Address already in use
    Can't start server: Bind on unix socket...
    ```

    使用 **ps** 确定是否有另一台 [mysqld](/4/4.3/4.3.1/mysqld.html) 服务器正在运行。如果是，请在再次启动 [mysqld](/4/4.3/4.3.1/mysqld.html) 之前关闭服务器。（如果另一台服务器正在运行，并且你确实希望运行多台服务器，你可以在[章节 5.8，“在一台机器上运行多个 MySQL 实例”](/5/5.8/multiple-servers.html)中找到有关如何执行此操作的信息。）

    如果没有其他服务器正在运行，请执行命令 `telnet` *your_host_name tcp_ip_port_number*。（默认MySQL端口号为 3306。）然后按回车键几次。如果你没有收到类似的错误消息：`telnet: Unable to connect to remote host: Connection refused（telnet 无法连接到远程主机：连接被拒绝）`，则其他程序正在使用 [mysqld](/4/4.3/4.3.1/mysqld.html) 尝试使用的 TCP/IP 端口。跟踪这是什么程序并禁用它，或者告诉 [mysqld](/4/4.3/4.3.1/mysqld.html) 使用 [--port](/5/5.1/5.1.7/server-options.html) 选项监听不同的端口。在这种情况下，使用 TCP/IP 连接到服务器时，为客户端程序指定相同的非默认端口号。

    该端口可能无法访问的另一个原因是你运行的防火墙阻止了与该端口的连接。如果是，请修改防火墙设置以允许访问该端口。

    如果服务器启动但无法连接到它，请确保 `/etc/hosts` 中有一个如下所示的条目：

    ```bash
    127.0.0.1       localhost
    ```

- 如果无法启动 [mysqld](/4/4.3/4.3.1/mysqld.html)，请尝试使用 [--debug](/5/5.1/5.1.7/server-options.html) 选项创建跟踪文件以查找问题。参阅[章节 5.9.4，“DBUG 包”](/5/5.9/5.9.4/dbug-package.html)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/starting-server-troubleshooting.html)
