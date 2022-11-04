# 2.4.2 使用本机软件包在 macOS 上安装 MySQL

该包位于磁盘镜像（.dmg）文件中，你首先需要通过双击 Finder 中的图标来挂载该文件。然后，它应该挂载镜像并显示其内容。

::: tip 注意
在继续安装之前，请确保使用 MySQL 管理器应用程序（在 macOS 服务器上）、首选项面板或命令行上的 [mysqladmin shutdown](/4/4.5/4.5.2/mysqladmin.html) 来停止所有正在运行的 MySQL 服务器实例。
:::

要使用软件包安装程序安装 MySQL：

1. 下载包含 MySQL 包安装程序的磁盘映像（.dmg）文件（此处提供社区版本）。双击文件以装入磁盘镜像并查看其内容。

    双击磁盘上的 MySQL 安装程序包。它是根据你下载的 MySQL 版本命名的。例如，对于 MySQL 服务器 8.0.30，它可能被命名为 `mysql-8.0.30-macos-10.13-x86_64.pkg`。

2. 初始向导介绍屏幕引用要安装的 MySQL 服务器版本。单击`继续`开始安装。

    MySQL 社区版显示了相关 GNU 通用公共许可证的副本。单击`继续`，然后`同意`继续。

3. 在“**安装类型**”页面中，你可以单击`安装`以使用所有默认值执行安装向导，或者单击`自定义`以更改要安装的组件（MySQL 服务器、MySQL 测试、首选项面板、Launchd 支持——默认情况下启用除 MySQL 测试之外的所有组件）。

::: tip 注意
虽然`更改安装位置`选项可见，但无法更改安装位置。
:::

**图 2.13 MySQL 包安装程序向导：安装类型**

![MySQL Package Installer Wizard: Installation Type](../../_media/mac-installer-installation-type-standard.png)

**图2.14 MySQL 包安装程序向导：自定义**

![MySQL Package Installer Wizard: Customize](../../_media/mac-installer-installation-type-customize.png)

4. 单击`安装`以安装 MySQL 服务器。如果升级当前的 MySQL 服务器安装，安装过程在此结束，否则，请按照向导的其他配置步骤进行新的MySQL Server安装。

5. 成功安装新的 MySQL 服务器后，通过选择密码的默认加密类型、定义 root 密码以及在启动时启用（或禁用）MySQL 服务器来完成配置步骤。

6. 默认的 MySQL 8.0 密码机制是 `caching_sha2_password`（强），此步骤允许你将其更改为 `mysql_native_password`（旧版）。

**图 2.15 MySQL 包安装程序向导：选择密码加密类型**

![MySQL Package Installer Wizard: Choose a Password Encryption Type](../../_media/mac-installer-configuration-password-type.png)

选择传统密码机制会更改生成的 launchd 文件，以在 `ProgramArguments` 下设置 [--default_authentication_plugin=mysql_native_password](/5/5.1/5.1.8/server-system-variables.html)。选择强密码加密不会设置 `--default_authentication_plugin`，因为使用了默认的 MySQL 服务器值就是 `caching_sha2_password`。

7. 为 root 用户定义密码，并切换配置步骤完成后是否启动 MySQL 服务器。

**图 2.16 MySQL 包安装程序向导：定义根密码**

![MySQL Package Installer Wizard: Define Root Password](../../_media/mac-installer-configuration-password-define.png)

8. `总结`是最后一步，它引用了成功和完整的 MySQL 服务器安装。`关闭`向导。

**图 2.17 MySQL 包安装向导：总结**

![MySQL Package Installer Wizard: Summary](../../_media/mac-installer-summary.png)

MySQL 服务器现已安装。如果你选择不启动 MySQL，则从命令行使用 launchctl 或使用 MySQL 首选项面板单击“开始”启动MySQL。有关更多信息，参阅[章节 2.4.3，“安装和使用 MySQL 启动守护程序”](/2/2.4/2.4.3/macos-installation-launchd.html)和[章节 2.2.4，“安装并使用 MySQL 首选项面板”](/2/2.4/2.4.4/macos-installation-prefpane.html)。使用 MySQL 首选项面板或 launchd 将 MySQL 配置为在启动时自动启动。

使用软件包安装程序进行安装时，文件将安装到 `/usr/local` 中与安装版本和平台名称匹配的目录中。例如，安装程序文件 `mysql-8.0.30-macos10.15-x86_64.dmg` 将 MySQL 安装到 `/usr/local/mysql-8.1.30-macos10.15/x86_ 64/` 中，并带有指向 `/usr/local/mysql` 的符号链接。下表显示了此 MySQL 安装目录的结构。

::: tip 注意
macOS 安装过程不会创建或安装示例 MySQL 配置文件 `my.cnf`。
:::

 **表 2.7 macOS 上的 MySQL 安装结构**

|目录|目录内容|
|bin|[mysqld](/4/4.3/4.3.1/mysqld.html) 服务器、客户端和实用程序|
|data|日志文件、数据库，`/usr/local/mysql/data/mysqld.local.err` 是默认的错误日志|
|docs|帮助文档，如发行说明和构建信息|
|include|引用文件（头文件）|
|lib|库|
|man|Unix 手册页|
|mysql-test|MySQL 测试套件（“MySQL Test”在使用安装程序包（DMG）的安装过程中默认禁用）|
|share|杂项支持文件，包括错误消息和 dictionary.txt 和重写器 SQL|
|support-files|支持脚本，如 `mysqld_multi.server`、 `mysql.server` 和 `mysql-log-rotate`。|
|/tmp/mysql.sock|MySQL Unix 套接字的位置|

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/macos-installation-pkg.html)
