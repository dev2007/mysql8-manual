# 2.10 安装后设置和测试

- [2.10.1 初始化数据目录](/2/2.10/2.10.1/data-directory-initialization.html)
- [2.10.2 启动服务器](/2/2.10/2.10.2/starting-server.html)
- [2.10.3 测试服务器](/2/2.10/2.10.3/testing-server.html)
- [2.10.4 保护初始 MySQL 帐户](/2/2.10/2.10.4/default-privileges.html)
- [2.10.5 自动启动和停止 MySQL](/2/2.10/2.10.5/automatic-start.html)

本节讨论安装 MySQL 后应执行的任务：

- 如果需要，初始化数据目录并创建 MySQL 授权表。对于某些 MySQL 安装方法，数据目录初始化可能会自动完成：

    - MySQL 安装程序执行的 Windows 安装操作。
    - 使用 Oracle 的服务器 RPM 或 Debian 发行版在 Linux 上安装。
    - 在许多平台上使用本地打包系统进行安装，包括 Debian Linux、Ubuntu Linux、Gentoo Linux 等。
    - 使用 DMG 发行版在 macOS 上安装。

    对于其他平台和安装类型，必须手动初始化数据目录。其中包括在 Unix 和类 Unix 系统上从通用二进制和源发行版安装，以及在 Windows 上从 ZIP 压缩包安装。有关说明，参阅[章节 2.10.1，“初始化数据目录”](/2/2.10/2.10.1/data-directory-initialization.html)。

- 启动服务器并确保可以访问。有关说明，参阅[章节 2.10.2，“启动服务器”](/2/2.10/2.10.2/starting-server.html)和[章节 2.10.3，“测试服务器”](/2/2.10/2.10.3/testing-server.html)。

- 如果在数据目录初始化期间尚未完成，则在授权表中为初始根帐户分配密码。密码可防止未经授权访问 MySQL 服务器。有关说明，参阅[章节 2.10.4，“保护初始 MySQL 帐户”](/2/2.10/2.10.4/default-privileges.html)。

- 可选，安排服务器在系统启动和停止时自动启动和停止。有关说明，参阅[章节 2.10.5，“自动启动和停止 MySQL”](/2/2.10/2.10.5/automatic-start.html)。

- 可选，填充时区表以启用命名时区的识别。有关说明，参阅[章节 5.1.15，“MySQL 服务器时区支持”](/5/5.1/5.1.15/time-zone-support.html)。

当你准备创建其他用户帐户时，可以在[章节 6.2，“访问控制和帐户管理”](/6/6.2/access-control.html)中找到有关 MySQL 访问控制系统和帐户管理的信息。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/postinstallation.html)
