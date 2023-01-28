# 2.5.7 从本地软件仓库在 Linux 上安装 MySQL

许多 Linux 发行版在其本地软件存储库中包含 MySQL 服务器、客户端工具和开发组件的版本，并且可以与平台的标准包管理系统一起安装。本章节提供了使用这些包管理系统安装 MySQL 的基本说明。

:::danger 重要
本机软件包通常是当前可用版本之后的几个版本。你你常也无法安装开发里程碑版本（DMR），因为这些版本通常在本机存储库中不可用。在继续之前，我们建议你查看[章节 2.5，“在 Linux 上安装 MySQL”](/2/2.5/linux-installation)中描述的其他安装选项。
:::

具体发布说明如下：

- Red Hat Linux、Fedora、CentOS

:::tip 注意
对于许多 Linux 发行版，你可以使用 MySQL Yum 存储库而不是平台的本地软件存储库来安装 MySQL。详情参阅[章节 2.5.1，“使用 MySQL Yum 仓库在 Linux 上安装 MySQL”](/2/2.5/2.5.1/linux-installation-yum-repo.html)。
:::

对于 Red Hat 和类似的发行版，MySQL 发行版分为多个单独的包，`mysql` 用于客户端工具，`mysql-server` 用于服务器和相关工具，`mysql-libs` 用于库。如果要提供来自不同语言和环境（如 Perl、Python 和其他）的连接，则需要这些库。

要安装的话，请使用 **yum** 命令指定要安装的包。例如：

```bash
#> yum install mysql mysql-server mysql-libs mysql-server
Loaded plugins: presto, refresh-packagekit
Setting up Install Process
Resolving Dependencies
--> Running transaction check
---> Package mysql.x86_64 0:5.1.48-2.fc13 set to be updated
---> Package mysql-libs.x86_64 0:5.1.48-2.fc13 set to be updated
---> Package mysql-server.x86_64 0:5.1.48-2.fc13 set to be updated
--> Processing Dependency: perl-DBD-MySQL for package: mysql-server-5.1.48-2.fc13.x86_64
--> Running transaction check
---> Package perl-DBD-MySQL.x86_64 0:4.017-1.fc13 set to be updated
--> Finished Dependency Resolution

Dependencies Resolved

================================================================================
 Package               Arch          Version               Repository      Size
================================================================================
Installing:
 mysql                 x86_64        5.1.48-2.fc13         updates        889 k
 mysql-libs            x86_64        5.1.48-2.fc13         updates        1.2 M
 mysql-server          x86_64        5.1.48-2.fc13         updates        8.1 M
Installing for dependencies:
 perl-DBD-MySQL        x86_64        4.017-1.fc13          updates        136 k

Transaction Summary
================================================================================
Install       4 Package(s)
Upgrade       0 Package(s)

Total download size: 10 M
Installed size: 30 M
Is this ok [y/N]: y
Downloading Packages:
Setting up and reading Presto delta metadata
Processing delta metadata
Package(s) data still to download: 10 M
(1/4): mysql-5.1.48-2.fc13.x86_64.rpm                    | 889 kB     00:04
(2/4): mysql-libs-5.1.48-2.fc13.x86_64.rpm               | 1.2 MB     00:06
(3/4): mysql-server-5.1.48-2.fc13.x86_64.rpm             | 8.1 MB     00:40
(4/4): perl-DBD-MySQL-4.017-1.fc13.x86_64.rpm            | 136 kB     00:00
--------------------------------------------------------------------------------
Total                                           201 kB/s |  10 MB     00:52
Running rpm_check_debug
Running Transaction Test
Transaction Test Succeeded
Running Transaction
  Installing     : mysql-libs-5.1.48-2.fc13.x86_64                          1/4
  Installing     : mysql-5.1.48-2.fc13.x86_64                               2/4
  Installing     : perl-DBD-MySQL-4.017-1.fc13.x86_64                       3/4
  Installing     : mysql-server-5.1.48-2.fc13.x86_64                        4/4

Installed:
  mysql.x86_64 0:5.1.48-2.fc13            mysql-libs.x86_64 0:5.1.48-2.fc13
  mysql-server.x86_64 0:5.1.48-2.fc13

Dependency Installed:
  perl-DBD-MySQL.x86_64 0:4.017-1.fc13

Complete!
```

现在应该安装 MySQL 和 MySQL 服务器。示例配置文件安装到 `/etc/my.cnf` 中。要启动MySQL服务器，请使用 **systemctl**：

```bash
$> systemctl start mysqld
```

如果数据库表尚不存在，则会自动为你建这些表。但是，你应该运行 [mysql_secure_installation](/4/4.4/4.4.2/mysql-secure-installation.html) 来设置服务器上的 root 密码。

- Debian、Ubuntu、Kubuntu

:::tip 注意
对于支持的 Debian 和 Ubuntu 版本，可以使用 MySQL APT 仓库而不是平台的本地软件存储库来安装 MySQL。详情参阅[章节 2.5.2，“使用 MySQL APT 仓库在 Linux 上安装 MySQL”](/2/2.5/2.5.1/linux-installation-yum-repo.html)。
:::

在 Debian 和相关发行版上，MySQL 的软件仓库中有两个包，分别用于客户端和服务器组件，即 `mysql-client` 和 `mysql-server`。你应该指定一个显式版本，例如 `mysql-client-5.1`，以确保安装所需的 MySQL 版本。

要下载和安装，包括任何依赖项，请使用 **apt-get** 命令，指定要安装的包。

:::tip 注意
在安装之前，请确保更新 `apt-get` 索引文件，以确保下载的是最新的可用版本。
:::

:::tip 注意
**apt-get** 命令安装许多包，包括 MySQL 服务器，以便提供典型的工具和应用程序环境。这意味着除了主 MySQL 软件包之外，还需要安装大量软件包。
:::

在安装过程中，将创建初始数据库，并提示你输入 MySQL root 密码（并确认）。在 `/etc/mysql/my.cnf` 中创建配置文件。初始化脚本创建在 `/etc/init.d/mysql` 中。

服务器应该已经启动。你可以使用以下方法手动启动和停止服务器：

```bash
#> service mysql [start|stop]
```

该服务将自动添加到 2、3 和 4 运行级别，停止脚本位于 single、shutdown 和 restart 启动级别。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/linux-installation-native.html)
