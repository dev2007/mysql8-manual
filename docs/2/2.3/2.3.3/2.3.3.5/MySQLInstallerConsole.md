# 2.3.3.5 MySQL 安装程序控制台参考

[MySQLInstallerConsole.exe](https://dev.mysql.com/doc/refman/8.0/en/MySQLInstallerConsole.html) 提供类似于 MySQL 安装程序的命令行功能。它在最初执行 MySQL 安装程序时安装，然后在 `MySQL Installer for Windows` 目录中可用。默认情况下，它位于 `C:\Program Files（x86）\MySQL\MySQL Installer for Windows` 中，控制台必须以管理权限执行。

要使用，请选择**开始**、**附件**，以管理权限调用**命令提示符**，然后右键单击命令提示符并选择**以管理员身份运行**。在命令行中，可以选择将目录更改为 [MySQLInstallerConsole.exe](https://dev.mysql.com/doc/refman/8.0/en/MySQLInstallerConsole.html) 所在的目录：

```bash
C:\> cd Program Files (x86)\MySQL\MySQL Installer for Windows
C:\Program Files (x86)\MySQL\MySQL Installer for Windows> MySQLInstallerConsole.exe help
=================== Start Initialization ===================
MySQL Installer is running in Community mode

Attempting to update manifest.
Initializing product requirements
Loading product catalog
Checking for product catalog snippets
Checking for product packages in the bundle
Categorizing product catalog
Finding all installed packages.
Your product catalog was last updated at 11/1/2016 4:10:38 PM
=================== End Initialization ===================

The following commands are available:

Configure - Configures one or more of your installed programs.
Help      - Provides list of available commands.
Install   - Install and configure one or more available MySQL programs.
List      - Provides an interactive way to list all products available.
Modify    - Modifies the features of installed products.
Remove    - Removes one or more products from your system.
Status    - Shows the status of all installed products.
Update    - Update the current product catalog.
Upgrade   - Upgrades one or more of your installed programs.
```

## MySQL 产品名称

许多 [MySQLInstallerConsole](https://dev.mysql.com/doc/refman/8.0/en/MySQLInstallerConsole.html) 命令接受一个或多个表示目录中 MySQL 产品的关键字。下表显示了用于命令的当前有效关键字集。

表2.6 MySQLInstallerConsole 的 MySQL 产品关键字

|关键字|MySQL 产品|
|--|--|
|server|MySQL Server|
|workbench|MySQL Workbench|
|shell|MySQL Shell|
|visual|MySQL for Visual Studio|
|router|MySQL Router|
|backup|MySQL Enterprise Backup|
|net|MySQL Connector/NET|
|odbc|MySQL Connector/ODBC|
|c++|MySQL Connector/C++|
|python|MySQL Connector/Python|
|j|MySQL Connector/J|
|documentation|MySQL Server Documentation|
|samples|MySQL Samples (sakila and world databases)|

## MySQLInstallerConsole 命令选项

[MySQLInstallerConsole](https://dev.mysql.com/doc/refman/8.0/en/MySQLInstallerConsole.html) 支持以下命令选项：

::: tip 注意
包含冒号（:）的配置块值必须用引号括起来。例如，`installdir=“C:\MySQL\MySQL Server 8.0”`。
:::

- configure [***product1***]:[***setting***]=[***value***]; [***product2***]:[***setting***]=[***value***]; [...]

  在系统上配置一个或多个 MySQL 产品。多个 setting=value 可以为每个产品配置值对。

  开关选项包括：

  `-showsettings`

    通过在 `-showsetting` 后输入产品名称，显示所选产品的可用选项。

  `-silent`

    禁用确认提示。
  
  ```bash
  C:\> MySQLInstallerConsole configure -showsettings server
  C:\> MySQLInstallerConsole configure server:port=3307
  ```

- help [***command***]

  显示包含用法示例的帮助消息，然后退出。传入其他命令以接收特定于该命令的帮助。

  ```bash
  C:\> MySQLInstallerConsole help
  C:\> MySQLInstallerConsole help install
  ```

- install [***product***]:[***features***]:[***config block***]:[***config block***]:[***config block***]; [...]

  在系统上安装一个或多个 MySQL 产品。如果有预发布产品，则当 `-type` 开关的值为 `Developer`、`Client` 或 `Full` 时，将同时安装 GA 和预发布产品。使用 `-only_ga_products` 开关，仅当使用这些设置类型时，才将产品集限制为 GA 产品。

  开关及语法选项包括：

  `-only_ga_products`

    将产品集限制为仅包括GA产品。

  `-type=[***SetupType***]`

    安装一组预定义的软件。设置类型可以是以下类型之一：
      - `Developer`：安装完整的开发环境。
      - `Server`：安装单独的 MySQL 服务器。
      - `Client`：安装客户端程序和库。
      - `Full`：安装全部东西。
      - `Custom`：安装用户选择的产品。此为默认选项。

      ::: tip 注意
      只有在未安装其他 MySQL 产品时，非自定义安装类型才有效。
      :::

  `-showsettings`

    通过在 `-showsettings` 之后输入产品名称，显示所选产品的可用选项。

  `-silent`

    禁用确认提示。

  `[***product***]`

    每个产品都可以由一个产品关键字指定，该关键字可以有分号分隔的版本限定符，也可以没有分号分隔的版本限定符。仅传入产品关键字即可选择产品的最新版本。如果该版本的产品有多个体系结构可用，则该命令将返回清单列表中的第一个体系结构以进行交互确认。或者，您可以使用 `-silent` 开关在产品关键字之后传入确切的版本和体系结构（`x86` 或 `x64`）。

  `[***features***]`

    默认情况下，将安装与 MySQL 产品相关的所有功能。特性块是以分号分隔的要素列表或选择所有要素的星号（*）。要删除特性，请使用 `modify` 命令。

  `[***config block***]`

    可以指定一个或多个配置块。每个配置块都是以分号分隔的键值对列表。块可以包括 `config` 或 `user` 类型键；如果未定义，则 `config` 是默认类型。

    包含冒号（:）的配置块值必须用引号括起来。例如，`installdir=“C:\MySQL\MySQL Server 8.0”`。每个产品只能定义一个配置类型块。应为在产品安装期间创建的每个用户定义一个用户块。

    ::: tip 注意
    重新配置产品时不支持 `user` 类型密钥。
    :::

  ```bash
  C:\> MySQLInstallerConsole install server;5.6.25:*:port=3307;serverid=2:type=user;username=foo;password=bar;role=DBManager
  C:\> MySQLInstallerConsole install server;5.6.25;x64 -silent
  ```

  传入其他配置块的示例，用 ^ 分隔以适合：

  ```bash
  C:\> MySQLInstallerConsole install server;5.6.25;x64:*:type=config;openfirewall=true; ^
          generallog=true;binlog=true;serverid=3306;enable_tcpip=true;port=3306;rootpasswd=pass; ^
          installdir="C:\MySQL\MySQL Server 5.6":type=user;datadir="C:\MySQL\data";username=foo;password=bar;role=DBManager
  ```

- `list`

  列出一个交互式控制台，可以在其中搜索所有可用的 MySQL 产品。执行 `MySQLInstallerConsole list` 以启动控制台并输入要搜索的子字符串。

  ```bash
  C:\> MySQLInstallerConsole list
  ```

- `modify [***product1:-removelist|+addlist***] [***product2:-removelist|+addlist***] [...]`

  修改或显示以前安装的 MySQL 产品的功能。要显示产品的功能，请将产品关键字附加到命令中，例如：

  ```bash
  C:\> MySQLInstallerConsole modify server
  ```

  此命令的语法选项：

  `-slient`

    禁用确认提示。

  ```bash
  C:\> MySQLInstallerConsole modify server:+documentation
  C:\> MySQLInstallerConsole modify server:-debug
  ```

- `remove [***product1***] [***product2***] [...]`

  从系统中删除一个或多个产品。开关和语法选项包括：

  `*`

    传入 * 以删除所有 MySQL 产品。

  `-continue`

    即使发生错误，也要继续操作。

  `-slient`

    禁用确认提示。

  ```bash
  C:\> MySQLInstallerConsole remove *
  C:\> MySQLInstallerConsole remove server
  ```

- `status`

  快速概述系统上安装的 MySQL 产品。信息包括产品名称和版本、体系结构、安装日期和安装位置。

  ```bash
  C:\> MySQLInstallerConsole status
  ```

- `update`

  将最新的 MySQL 产品目录下载到您的系统中。成功后，将在下次执行 `MySQLInstaller` 或 [MySQLInstallerConsole.exe](https://dev.mysql.com/doc/refman/8.0/en/MySQLInstallerConsole.html) 应用目录。

  ```bash
  C:\> MySQLInstallerConsole update
  ```

- `upgrade [***product1:version***] [***product2:version***] [...]`

  升级系统上的一个或多个产品。语法选项包括：

  `*`

    传入 * 将所有产品升级到最新版本，或传入特定产品。

  `!`

    传入 ! 作为将 MySQL 产品升级到其最新版本的版本号。

  `-slient`

    禁用确认提示。

  ```bash
  C:\> MySQLInstallerConsole upgrade *
  C:\> MySQLInstallerConsole upgrade workbench:8.0.21
  C:\> MySQLInstallerConsole upgrade workbench:!
  C:\> MySQLInstallerConsole upgrade workbench:8.0.21 visual:1.2.9
  ```

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/MySQLInstallerConsole.html)
