# 2.11.10 在 Windows 上升级 MySQL

在 Windows 上升级 MySQL 有两种方法：

- [使用 MySQL 安装程序](/2/2.11/2.11.10/windows-upgrading.html#使用-MySQL-安装程序升级-MySQL)
- [使用 Windows ZIP 存档分发](/2/2.11/2.11.10/windows-upgrading.html#使用-Windows-ZIP-分发升级-MySQL)

你选择的方法取决于现有安装的执行方式。在继续之前，请查看[章节 2.11，“升级 MySQL”](/2/2.11/upgrading.html)，以了解有关升级 MySQL 的其他信息，这些信息并非特定于 Windows。

:::tip 注意
无论你选择哪种方法，在执行升级之前，请始终备份当前的 MySQL 安装。参阅[章节 7.2，“数据库备份方法”](/7/7.2/backup-methods.html)。
:::

不支持非 GA 版本之间的升级（或从非 GA 版本升级到 GA 版本）。在非 GA版 本中发生了重大的开发更改，你可能会遇到兼容性问题或启动服务器的问题。

:::tip 注意
MySQL 安装程序不支持社区版和商业版之间的升级。如果你需要这种类型的升级，请使用 [ZIP 存档](/2/2.11/2.11.10/windows-upgrading.html#使用-Windows-ZIP-分发升级-MySQL)方法进行升级。
:::

## 使用 MySQL 安装程序升级 MySQL

当使用 MySQL 安装程序执行当前服务器安装并且升级在当前版本系列内时，使用 MySQL 安装器执行升级是最好的方法。MySQL 安装程序不支持不同版本之间的升级，例如从 5.7 升级到 8.0，也不提供提示你升级的升级指示器。有关在发行系列之间升级的说明，参阅[使用Windows ZIP 分发升级 MySQL](/2/2.11/2.11.10/windows-upgrading.html#使用-Windows-ZIP-分发升级-MySQL)。

要使用 MySQL 安装程序执行升级，请执行以下操作：

1. 启动 MySQL 安装程序。
2. 从面板中，单击**Catalog（目录）**以下载对目录的最新更改。只有当面板在服务器版本号旁边显示箭头时，才能升级已安装的服务器。
3. 单击**Upgrade（升级）**。所有具有更新版本的产品现在都显示在列表中。

:::tip 提示
MySQL 安装程序取消选择同一版本系列中里程碑版本（预发布）的服务器升级选项。此外，它还会显示一条警告，表示不支持升级，识别继续升级的风险，并提供手动执行升级的步骤摘要。你可以重新选择服务器升级并自行承担风险。
:::

4. 取消选择除 MySQL 服务器产品之外的所有产品，除非此时你打算升级其他产品，然后单击 `Next（下一步）`。
5. 单击`Execute（执行）**`开始下载。下载完成后，单击 `Next（下一步）`开始升级操作。
    升级到 MySQL 8.0.16 或更高版本可能会显示跳过系统表升级检查和处理的选项。有关此选项的详细信息，参阅[重要的服务器升级条件](/2/2.3/2.3.3/2.3.3.4//mysql-installer-catalog-dashboard.html)。
6. 配置服务器。

## 使用 Windows ZIP 分发升级 MySQL

要使用Windows ZIP存档分发版执行升级，请执行以下操作：

1. 从 [https://dev.mysql.com/downloads/](https://dev.mysql.com/downloads/) 下载最新的 Windows ZIP 存档。
2. 如果服务器正在运行，请停止它。如果服务器作为服务安装，请在命令提示符下使用以下命令停止服务：

    ```bash
    C:\> SC STOP mysqld_service_name
    ```

    或者，使用 **NET STOP** *mysqld_service_name*。

    如果你没有将 MySQL 服务器作为服务运行，请使用 [mysqladmin](/4/4.5/4.5.2/mysqladmin.html) 来停止它。例如，在从 MySQL 5.7 升级到 8.0 之前，请使用 MySQL 5.7 中的 [mysqladmin](/4/4.5/4.5.2/mysqladmin.html)，如下所示：

    ```bash
    C:\> "C:\Program Files\MySQL\MySQL Server 5.7\bin\mysqladmin" -u root shutdown
    ```

    :::tip 注意
    如果 MySQL `root` 用户帐户有密码，请使用 `-p` 选项调用 [mysqladmin](/4/4.5/4.5.2/mysqladmin.html)，并在提示时输入密码。
    :::
3. 提取 ZIP 存档。你可以覆盖现有的 MySQL 安装（通常位于 `C:\mysql`），也可以将其安装到其他目录中，例如 `C:\mysql8`。建议覆盖现有安装。
4. 重新启动服务器。例如，如果将 MySQL 作为服务运行，请使用 **SC START** *mysqld_service_name* 或 **NET START** *mysqld_services_name* 命令，否则直接调用 [mysqld](/4/4.3/4.3.1/mysqld.html)。
5. 在 MySQL 8.0.16 之前，请以管理员身份运行 [mysql_upgrade](/4/4.4/4.4.5/mysql-upgrade.html) 来检查你的表，必要时尝试修复它们，如果它们发生了更改，请更新你的授权表，以便你可以利用任何新功能。参阅[章节 4.4.5，“mysql_upgrade——检查和升级 MySQL 表”](/4/4.4/4.4.5/mysql-upgrade.html)。从 MySQL 8.0.16 开始，这一步骤是不需要的，因为服务器执行之前由 [mysql_upgrade](/4/4.4/4.4.5/mysql-upgrade.html) 处理的所有任务。
6. 如果遇到错误，参阅[章节 2.3.5，“Microsoft Windows MySQL 服务器安装疑难解答”](/2/2.3/2.3.5/windows-troubleshooting)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/windows-upgrading.html)
