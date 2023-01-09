# 2.11.1 在你开始前

升级前请查看本节中的信息。执行任何建议的操作。

- 了解升级过程中可能发生的情况。参阅[章节 2.11.3，“MySQL 升级过程升级的内容”](/2/2.11/2.11.3/upgrading-what-is-upgraded.html)。
- 通过创建备份来保护数据。备份应该包括 `mysql` 系统数据库，其中包含 MySQL 数据字典表和系统表。参阅[章节 7.2，“数据库备份方法”](/7/7.2/backup-methods.html)。

:::danger 重要
不支持从 MySQL 8.0 降级到 MySQL 5.7，或从 MySQL 8.0 版本降级到先前的 MySQL 8.0 版本。唯一受支持的替代方法是恢复升级前所做的备份。因此，在开始升级过程之前，必须备份数据。
:::

- 查看[章节 2.11.2，“升级路径”](/2/2.11/2.11.2/upgrade-paths.html)，以确保你的预期升级路径得到支持。
- 查看[章节 2.11.4，“MySQL 8.0 中的更改”](/2/2.11/2.11.4/upgrading-from-previous-series.html)，了解升级前应注意的更改。某些更改可能需要采取行动。
- 查看[章节 1.3，“MySQL 8.0 的新增功能”](/1/1.3/mysql-nutshell.html)，了解已弃用和已删除的功能。如果你使用其中任何一项功能，升级可能需要对这些功能进行更改。

- 查看[章节 1.4，“MySQL 8.0 中已添加、已弃用或已删除的服务器和状态变量和选项”](/1/1.4/added-deprecated-removed.html)。如果使用已弃用或删除的变量，升级可能需要更改配置。
- 查看[发行说明](https://dev.mysql.com/doc/relnotes/mysql/8.0/en/)以了解有关修复、更改和新功能的信息。
- 如果使用复制，请查看[章节 17.5.3，“升级复制拓扑”](/17/17.5/17.5.3/replication-upgrade.html)。
- 升级过程因平台和初始安装的执行方式而异。使用适用于当前 MySQL 安装的过程：
    - 有关非 Windows 平台上基于二进制和包的安装，参阅[章节 2.11.6，“在 Unix/Linux 上升级 MySQL 二进制或基于包的安装”](/2/2.11/2.11.6/upgrade-binary-package.html)。
    
    :::tip 注意
    对于受支持的 Linux 发行版，升级基于包的安装的首选方法是使用 MySQL 软件仓库（MySQL Yum 仓库、MySQL APT 仓库和 MySQL SLES 仓库）。
    :::

    - 有关使用 MySQL Yum 仓库在企业版 Linux 平台或 Fedora 上的安装，参阅[章节 2.11.7，“使用MySQL Yun 仓库升级 MySQL”](/2/2.11/2.11.7/updating-yum-repo.html)。
    - 有关使用 MySQL APT 仓库在 Ubuntu 上的安装，参阅[章节 2.11.8，“使用 MySQL APT 仓库升级 MySQL”](/2/2.11/2.11.8/updating-apt-repo.html)。
    - 有关使用 MySQL SLES 仓库在 SLES 上的安装，参阅[章节 2.11.9，“使用 MySQL SLS 仓库升级 MySQL”](/2/2.11/2.11.9/updating-sles-repo.html)。
    - 有关使用 Docker 执行的安装，参阅[章节 2.11.11，“升级 MySQL 的 Docker 安装”](/2/2.11/2.11.11/upgrade-docker-mysql.html)。
    - 有关 Windows 上的安装，参阅[章节 2.11.10，“在 Windows 上升级 MySQL”](/2/2.11/2.11.10/windows-upgrading.html)。

- 如果你的 MySQL 安装包含大量数据，在就地升级后转换这些数据可能需要很长时间，那么创建一个测试实例来评估所需的转换以及执行这些转换所需的工作可能会很有用。要创建测试实例，请复制 MySQL 实例，其中包含 `mysql` 数据库和其他不包含数据的数据库。在测试实例上运行升级过程，以评估执行实际数据转换所涉及的工作。
- 当你安装或升级到新版本的 MySQL 时，建议重建并重新安装 MySQL 语言接口。这适用于 MySQL 接口，如 PHP `mysql` 扩展和 Perl `DBD:：mysql` 模块。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/upgrade-before-you-begin.html)
