# 2.3.3 Windows 版 MySQL 安装程序

[2.3.3.1 MySQL 安装程序初始设置](/2/2.3/2.3.3/2.3.3.1/mysql-installer-setup)

[2.3.3.2 使用 MySQL 安装程序设置其他服务器路径](/2/2.3/2.3.3/2.3.3.2/mysql-installer-change-path-proc)

[2.3.3.3 MySQL 安装程序的安装工作流](/2/2.3/2.3.3/2.3.3.3/mysql-installer-workflow)

[2.3.3.4 MySQL 安装程序产品目录和面板](/2/2.3/2.3.3/2.3.3.4/mysql-installer-catalog-dashboard)

[2.3.3.5 MySQL 安装程序控制台参考](/2/2.3/2.3.3/2.3.3.5/MySQLInstallerConsole)

MySQL 安装程序是一个独立的应用程序，旨在减轻安装和配置在 Microsoft Windows 上运行的 MySQL 产品的复杂性。它支持以下 MySQL 产品：

- MySQL 服务器
  MySQL 安装程序可以同时在同一台主机上安装和管理多个单独的 MySQL Server 实例。例如，MySQL 安装程序可以在同一台主机上安装、配置和升级 MySQL 5.6、MySQL 5.7 和 MySQL 8.0 的单独实例。MySQL 安装程序不允许在主版本号和次版本号之间进行服务器升级，但允许在一个发行系列（例如 8.0.21 到 8.0.22）内进行升级。

  ?> **注意** MySQL 安装程序无法在同一台主机上同时安装 MySQL Server 的*社区版*和*商业版*。如果你需要同一主机上的两个版本，请考虑使用 [ZIP 压缩包](/2/2.3/2.3.2/windows-choosing-package?id=MySQL-免安装的-ZIP-压缩包)分发来安装其中一个版本。

- MySQL 应用
  MySQL Workbench、MySQL Shell、MySQL Router, 和 Visual Studio 版 MySQL。

- MySQL Connector
  MySQL Connector/NET、MySQL Connector/Python、MySQL Connector/ODBC、MySQL Connector/J 和 MySQL Connector/C++。 为了安装 MySQL Connector/Node.js，参阅 https://dev.mysql.com/downloads/connector/nodejs/ 。

- 文档和示例
  PDF 格式的 MySQL 参考手册（按版本）和 MySQL 数据库示例（按版本）。

## 安装要求

MySQL 安装程序需要 Microsoft .NET Framework 4.5.2 或更高版本。如果主机上未安装此版本，可以访问 [Microsoft 网站](https://www.microsoft.com/en-us/download/details.aspx?id=42643)下载。

需要互联网连接才能下载包含最新 MySQL 产品元数据的清单，这些产品不是完整捆绑包的一部分。MySQL 安装程序在你第一次启动应用程序时尝试下载清单，然后以可配置的间隔定期下载（参阅 [MySQL 安装程序选项](/2/2.3/2.3.3/2.3.3.4/mysql-installer-catalog-dashboard)）。或者，你可以通过单击 [MySQL 安装程序面板](/2/2.3/2.3.3/2.3.3.4/mysql-installer-catalog-dashboard?id=MySQL-安装程序面板)中的 `Catalog` 手动检索更新的清单。

?> **注意** 如果第一次或后续清单下载失败，则会记录一个错误，并且你在会话期间可能无法访问 MySQL 产品。MySQL 安装程序会在每次启动时尝试下载清单，直到更新初始清单结构。有关查找产品的帮助，参阅[查找要安装的产品](/2/2.3/2.3.3/2.3.3.4/mysql-installer-catalog-dashboard?id=查找要安装的产品)。

## MySQL 安装程序社区版

从 https://dev.mysql.com/downloads/installer/ 下载软件，用于安装适用于 Windows 的所有 MySQL 产品的社区版本。选择以下 MySQL 安装程序包之一：

- *网络*：仅包含 MySQL 安装程序和配置文件。网络软件包选项只下载你选择安装的 MySQL 产品，但每次下载都需要一个互联网连接。此文件的大小约为 2MB。文件名的格式为 `mysql-installer-community-web-VERSION.N.msi`，其中 **VERSION** 是 MySQL 服务器的版本号，如 8.0,而 `N` 是包号，从 0 开始。

- *完整或当前捆绑包*：捆绑所有适用于 Windows 的 MySQL 产品（包括 MySQL 服务器）。文件大小超过 300MB，名称为 `mysql-installer-community-VERSION.N.msi`，其中 `VERSION` 是 MySQL 服务器的版本号，如 8.0，而 `N` 是包号，从 0 开始。

## MySQL 安装程序商业版

从 https://edelivery.oracle.com/ 下载软件安装适用于 Windows 的 MySQL 产品的商业版（标准版或企业版）。如果你登录到My Oracle Support（MOS）帐户，则商业版包括社区版中可用的所有当前和以前的 GA 版本，但不包括开发里程碑版本。未登录时，只会看到已下载的捆绑产品列表。

商业版本还包括以下产品：

- 工作台 SE/EE
- MySQL 企业备份
- MySQL 企业防火墙

商业版与你的MOS帐户集成。有关知识库内容和修补程序，参阅[我的 Oracle 支持](https://support.oracle.com/)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/mysql-installer.html)
