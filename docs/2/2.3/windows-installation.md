# 2.3 在 Microsoft Windows 上安装 MySQL

[2.3.1 Microsoft Windows 上的 MySQL 安装布局](/2/2.3/2.3.1/windows-installation-layout)

[2.3.2 选择安装包](/2/2.3/2.3.2/windows-choosing-package)

[2.3.3 适用于 Windows 的 MySQL 安装程序](/2/2.3/2.3.3/mysql-installer)

[2.3.4 使用免安装 ZIP 存档在 Microsoft Windows 上安装 MySQL](/2/2.3/2.3.4/windows-install-archive)

[2.3.5 Microsoft Windows MySQL Server 安装故障排除](/2/2.3/2.3.5/windows-troubleshooting)

[2.3.6 Windows 安装后程序](/2/2.3/2.3.6/windows-postinstallation)

[2.3.7 Windows 平台限制](/2/2.3/2.3.7/windows-restrictions)

?> **重要** MySQL 8.0 Server 需要 Microsoft Visual C++ 2019 可重分发包在 Windows 平台上运行。在安装服务器之前，用户应确保软件包已安装在系统上。该软件包可在 [Microsoft 下载中心](http://www.microsoft.com/en-us/download/default.aspx)获得。此外，MySQL 调试二进制文件需要安装 Visual Studio 2019。

MySQL 仅适用于 Microsoft Windows 64 位操作系统。有关支持的 Windows 平台信息，请参阅 https://www.mysql.com/support/supportedplatforms/database.html 。

在 Microsoft Windows 上安装 MySQL 有不同的方法。

## MySQL 安装程序方法

最简单且推荐的方法是下载 MySQL 安装程序（适用于 Windows），让它安装并配置特定版本的 MySQL Server，如下所示：

1. 从 https://dev.mysql.com/downloads/installer/ 下载 MySQL 安装程序并执行它。

  ?> **注意** 与标准 MySQL 安装程序不同，更小的 `web-community` 版本不捆绑任何 MySQL 应用程序，只下载你选择安装的 MySQL 产品。

2. 确定初始安装 MySQL 产品时使用的安装类型。例如：

  - **开发者默认**（Developer Default）：提供一个安装类型，其中包括选定版本的 MySQL Server 和其他与 MySQL 开发相关的 MySQL 工具，如 MySQL Workbench。

  - **仅服务器**（Server Only）：为选定版本的 MySQL Server 提供设置，无需其他产品。

  - **自定义**（Custom）：允许你选择 MySQL Server 和其他 MySQL 产品的任何版本。

3. 安装服务器实例（以及产品），然后按照屏幕上的说明开始服务器配置。有关每个单独步骤的更多信息，参阅[章节 2.3.3.3.1，“使用 MySQL 安装程序配置 MySQL Server”](/2/2.3/2.3.3/2.3.3.3/mysql-installer-workflow?id=2.3.3.3.1-使用-MySQL-Installer-配置-MySQL-Server)。

  ?> **注意** 如果在系统上安装 MySQL Workbench，请考虑使用它来检查新的 MySQL Server 连接。默认情况下，程序在安装 MySQL 后自动启动。

## 附加安装信息

可以将 MySQL 作为标准应用程序或 Windows 服务运行。通过使用服务，你可以通过标准 Windows 服务管理工具监视和控制服务器的操作。有关更多信息，参阅[2.3.4.8，“将 MySQL 作为 Windows 服务启动”](/2/2.3/2.3.4/2.3.4.8/windows-start-service)。

为了适应 [RESTART](/13/13.7/13.7.8/13.7.8.8/restart) 语句，MySQL Server 在作为服务或独立运行时进行 fork，以使监视进程能够监视服务器进程。在本例中，有两个 [mysqld](/4/4.3/4.3.1/mysqld) 进程。如果不需要 [RESTART](/13/13.7/13.7.8/13.7.8.8/restart) 功能，则可以使用 [`--no monitor](/5/5.1/5.1.7/server-options) 选项启动服务器。参阅[章节 13.7.8.8，“RESTART 语句”](/13/13.7/13.7.8/13.7.8.8/restart)。

通常，你应该使用具有管理员权限的帐户在 Windows 上安装 MySQL。否则，你可能会在某些操作中遇到问题，例如编辑 `PATH` 环境变量或访问**服务控制管理器**（Service Control Manager）。安装后，不需要使用具有管理员权限的用户来执行 MySQL。

有关在 Windows 平台上使用 MySQL 的限制列表，参阅[章节 2.3.7，“Windows 平台限制”](/2/2.3/2.3.7/windows-restrictions)。

除了 MySQL Server 包之外，你可能还需要或想要其他组件在应用程序或开发环境中使用 MySQL。这些包括但不限于：

- 要使用 ODBC 连接到 MySQL Server，必须具有 Connector/ODBC 驱动程序。有关更多信息，包括安装和配置说明，请参阅[MySQL Connector/ODBC 开发人员指南](https://dev.mysql.com/doc/connector-odbc/en/)。

  ?> **注意** MySQL 安装程序为你安装和配置 Connector/ODBC。

- .NET 应用程序要使用 MySQL Server，你必须具有 Connector/NET 驱动程序。有关更多信息，包括安装和配置说明，请参阅 [MySQL Connector/NET 开发人员指南](https://dev.mysql.com/doc/connector-net/en/)。

  ?> **注意** MySQL 安装程序为你安装和配置 Connector/NET。

适用于 Windows 的 MySQL 发行版可以从 https://dev.mysql.com/downloads/ 下载。参阅[章节 2.1.3，“如何获取 MySQL”](/2/2.1/2.1.3/gettting-mysql)。

MySQL for Windows 有几种分发格式，详细信息如下。一般来说，你应该使用 MySQL 安装程序。它比旧的 MSI 包含更多的功能和 MySQL 产品，比压缩文件更易于使用，并且你不需要额外的工具来启动和运行 MySQL。MySQL 安装程序自动安装 MySQL Server 和其他 MySQL 产品，创建选项文件，启动服务器，并允许你创建默认用户帐户。有关选择软件包的更多信息，参阅[章节 2.3.2，“选择安装包”](/2/2.3/2.3.2/windows-choosing-package)。

- MySQL 安装程序发行版包括 MySQL Server 和其他 MySQL 产品，包括 MySQL Workbench 和 Visual Studio 版 MySQL。MySQL 安装程序也可用于将来升级这些产品（参阅 https://dev.mysql.com/doc/mysql-compat-matrix/en/)。

  有关使用 MySQL 安装程序安装 MySQL 的说明，参阅[章节 2.3.3，“用于 Windows 的 MySQL 安装程序”](/2/2.3/2.3.3/mysql-installer)。

- 标准二进制发行版（打包为压缩文件）包含你解包到所选位置的所有必要文件。此软件包包含完整 Windows MSI 安装程序包中的所有文件，但不包括安装程序。

  有关使用压缩文件安装 MySQL 的说明，参阅[章节 2.3.4，“使用 noinstall ZIP 存档在 Microsoft Windows上 安装 MySQL”](/2/2.3/2.3.4/windows-install-archive)

- 源代码分发格式包含用于使用 VisualStudio 编译器系统构建可执行文件的所有代码和支持文件。

  有关在 Windows 上从源代码构建 MySQL 的说明，参阅[章节 2.9，“从源代码安装 MySQL”](/2/2.9/source-installation)。

## Windows 上的 MySQL 注意事项

- ***大表支持***

  如果需要大于 4GB 的表，请在 NTFS 或更新的文件系统上安装 MySQL。创建表时，不要忘记使用 `MAX_ROWS` 和 `AVG_ROW_LENGTH`。参阅[章节 13.1.20，“CREATE TABLE 语句”](/13/13.1/13.1.20/create-table)。

- ***MySQL 与病毒检测软件***

  包含 MySQL 数据和临时表的目录上的病毒扫描软件（如 Norton/Symantec Anti-Virus）可能会导致 MySQL 性能和病毒扫描软件错误识别包含垃圾邮件的文件内容方面的问题。这是由于病毒扫描软件使用的指纹机制，以及 MySQL 快速更新不同文件的方式，这可能被认为是一种潜在的安全风险。

  安装 MySQL Server 后，建议你在用于存储 MySQL 表数据的主目录（[`datadir`](/5/5.1/5.1.8/server-system-variables)）上禁用病毒扫描。病毒扫描软件中通常内置一个系统，以便忽略特定目录。

  此外，默认情况下，MySQL 在标准 Windows 临时目录中创建临时文件。要防止临时文件也被扫描，请为 MySQL 临时文件配置单独的临时目录，并将此目录添加到病毒扫描排除列表中。为此，请将 [`tmpdir`](/5/5.1/5.1.7/server-options) 参数的配置选项添加到 `my.ini` 配置文件。有关更多信息，参阅[章节 2.3.4.2，“创建选项文件”](/2/2.3/2.3.4/2.3.4.2/windows-create-option-file)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/windows-installation.html)
