# 2.3.2 选择安装包

对于MySQL 8.0，在Windows上安装MySQL时有多种安装包格式可供选择。本节中描述的软件包格式为：

- [MySQL 安装程序](/2/2.3/2.3.2/windows-choosing-package?id=MySQL-安装程序)
- [MySQL 免安装的 ZIP 压缩包](/2/2.3/2.3.2/windows-choosing-package?id=MySQL-免安装的-ZIP-压缩包)
- [MySQL Docker 镜像](/2/2.3/2.3.2/windows-choosing-package?id=MySQL-Docker-镜像)

程序数据库（PDB）文件（文件扩展名为 `PDB`）提供了在出现问题时调试 MySQL 安装的信息。这些文件包含在 MySQL 的 ZIP 压缩包发行版中（但不在 MSI 发行版）。

## MySQL 安装程序

这个包的文件名类似于 `mysql-installer-community-8.0.28.0.msi` 或 `mysql-installer-commercial-8.0.28.0.msi`，并利用 MSI 自动安装 MySQL Server 和其他产品。MySQL 安装程序下载更新并将其应用于自身以及每个已安装的产品。它还配置已安装的 MySQL Server（包括沙盒 InnoDB 集群测试设置）和 MySQL Router。大多数用户建议使用 MySQL 安装程序。

MySQL 安装程序可以安装和管理（添加、修改、升级和删除）许多其他 MySQL 产品，包括：

- 应用程序——MySQL Workbench、Visual Studio 版 MySQL、MySQL Shell 和 MySQL Router（参阅 https://dev.mysql.com/doc/mysql-compat-matrix/en/)
- 连接器——MySQL Connector/C++、MySQL Connector/NET、Connector/ODBC、MySQL Connector/Python、MySQL Connector/J、MySQL Connector/Node.js
- 文档——MySQL 手册（PDF 格式）、示例和例子

MySQL 安装程序在所有支持 MySQL 的 Windows 版本上运行（参阅 https://www.mysql.com/support/supportedplatforms/database.html)。

?> **注意** 因为 MySQL 安装程序不是 Microsoft Windows 的本机组件，并且依赖于 .NET，它不适用于像 Windows Server 的服务器核心版本这样的最小安装选项。

有关如何使用 MySQL 安装程序安装 MySQL 的说明，参阅[章节 2.3.3，“Windows MySQL 安装程序”](/2/2.3/2.3.3/mysql-installer)。

## MySQL 免安装的 ZIP 压缩包

这些包包含完整的 MySQL Server 安装包中的文件（除了 GUI）。此格式不包括自动安装程序，必须手动安装和配置。

免安装的 ZIP 压缩包分为两个单独的压缩文件。主包名为 `mysql-VERSION-winx64.zip`。其中包含在系统上使用 MySQL 所需的组件。可选的 MySQL 测试套件、MySQL 基准测试套件和调试二进制文件/信息组件（包括 PDB 文件）位于名为`mySQL-VERSION-winx64-debug-test.zip` 的单独压缩文件中。

如果选择安装免安装 ZIP 压缩包，参阅[章节 2.3.4，“使用免安装 ZIP 压缩包在 Microsoft Windows上安装 MySQL”](/2/2.3/2.3.4/windows-install-archive)。

## MySQL Docker 镜像

有关在 Windows 平台上使用 Oracle 提供的 MySQL Docker 镜像的信息，参阅[章节 2.5.6.3，“使用 Docker 在 Windows 和其他非 Linux 平台上部署 MySQL”](/2/2.5/2.5.6/2.5.6.3/deploy-mysql-nonlinux-docker)。

!> **警告** Oracle 提供的 MySQL Docker 映像是专门为 Linux 平台构建的。其他平台不受支持，在其上运行 Oracle MySQL Docker 镜像的用户将自行承担风险。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/windows-choosing-package.html)
