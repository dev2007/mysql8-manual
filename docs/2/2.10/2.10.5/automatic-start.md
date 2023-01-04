# 2.10.5 自动启动和停止 MySQL

本节讨论启动和停止 MySQL 服务器的方法。

通常，你可以通过以下方式之一启动 [mysqld](/4/4.3/4.3.1/mysqld.html) 服务器：

- 直接调用 [mysqld](/4/4.3/4.3.1/mysqld.html)。这适用于任何平台。
- 在 Windows 上，你可以设置在 Windows 启动时自动运行的 MySQL 服务。参阅[章节 2.3.4.8，“将 MySQL 作为 Windows 服务启动”](/2/2.3/2.3.4/2.3.4.8/windows-start-service.html)。
- 在 Unix 和类 Unix 系统上，你可以调用 [mysqld_safe](/4/4.3/4.3.2/mysqld-safe.html)，它试图确定 [mysqld](/4/4.3/4.3.1/mysqld.html) 的正确选项，然后使用这些选项运行它。参阅[章节 4.3.2节，“mysqld_safe——MySQL 服务器启动脚本”](/4/4.3/4.3.2/mysqld-safe.html)。
- 在支持 systemd 的 Linux 系统上，可以使用它来控制服务器。参阅[章节 2.5.9，“使用 systemd 管理 MySQL 服务器”](/2/2.5/2.5.9/using-systemd.html)。
- 在使用 System V 方式运行目录（即 `/etc/init.d` 和运行级特定目录）的系统上，调用 [mysql.server](/4/4.3/4.3.3/mysql-server.html)。该脚本主要用于系统启动和关闭。它通常以 mysql 的名称安装。[mysql.server](/4/4.3/4.3.3/mysql-server.html) 脚本通过调用 [mysqld_safe](/4/4.3/4.3.2/mysqld-safe.html) 启动服务器。参阅[章节 4.3.3，“mysql.server——MySQL 服务器启动脚本”](/4/4.3/4.3.3/mysql-server.html)。
- 在 macOS 上，安装 launchd 守护程序，以在系统启动时启用 MySQL 自动启动。守护进程通过调用 [mysqld_safe](/4/4.3/4.3.2/mysqld-safe.html) 启动服务器。有关详细信息，参阅[章节 2.4.3，“安装和使用 MySQL 启动守护程序”](/2/2.4/2.4.3/macos-installation-launchd.html)。MySQL 首选项面板还通过系统首选项提供启动和停止 MySQL 的控制。参阅[章节 2.4.4，“安装和使用 MySQL 首选项面板”](/2/2.4/2.4.4/macos-installation-prefpane.html)。
- 在 Solaris 上，使用服务管理框架（SMF）系统启动和控制 MySQL 启动。

systemd、[mysqld_safe](/4/4.3/4.3.2/mysqld-safe.html) 和 [mysql.server](/4/4.3/4.3.3/mysql-server.html) 脚本、Solaris SMF 和 macOS 启动项（或 MySQL 首选项面板）可用于手动或在系统启动时自动启动服务器。systemd、[mysql.server](/4/4.3/4.3.3/mysql-server.html) 和启动项也可用于停止服务器。

下表显示了从选项文件中读取的服务器和启动脚本的选项组。

**表 2.15 MySQL 启动脚本和支持的服务器选项组**


|脚本|选项组|
|--|--|
|[mysqld](/4/4.3/4.3.1/mysqld.html)|`[mysqld]`,`[server]`,`[mysqld-major_version]`|
|[mysqld_safe](/4/4.3/4.3.2/mysqld-safe.html)|`[mysqld]`,`[server]`,`[mysqld_safe]`|
|[mysql.server](/4/4.3/4.3.3/mysql-server.html)|`[mysqld]`,`[mysql.server]`,`[server]`|

`[mysqld-major_version]` 表示名称为 `[mysqld-5.7]` 和 `[mysqld-8.0]` 的组由版本为 5.7.x、8.0.x 等的服务器读取。此功能可用于指定只能由给定发布系列中的服务器读取的选项。

为了向后兼容，[mysql.server](/4/4.3/4.3.3/mysql-server.html) 还读取 `[mysql_server]` 组，[mysqld_safe](/4/4.3/4.3.2/mysqld-safe.html) 还读取 `[safe_mysqld]` 组。为了保持最新状态，您应该更新选项文件以使用 `[mysql.server]` 和 `[mysqld_safe]` 组。

有关 MySQL 配置文件及其结构和内容的更多信息，参阅[章节 4.2.2.2，“使用选项文件”](/4/4.2/4.2.2/4.2.2.2/option-files.html)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/automatic-start.html)
