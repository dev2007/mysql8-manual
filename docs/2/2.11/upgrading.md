# 2.11 升级 MySQL

- [2.11.1 在你开始前](/2/2.11/2.11.1/upgrade-before-you-begin.html)
- [2.11.2 升级路径](/2/2.11/2.11.2/upgrade-paths.html)
- [2.11.3 MySQL 升级过程升级的内容](/2/2.11/2.11.3/upgrading-what-is-upgraded.html)
- [2.11.4 MySQL 8.0 中的更改](/2/2.11/2.11.4/upgrading-from-previous-series.html)
- [2.11.5 准备升级安装](/2/2.11/2.11.5/upgrade-prerequisites.html)
- [2.11.6 在 Unix/Linux 上升级 MySQL 二进制或基于包的安装](/2/2.11/2.11.6/upgrade-binary-package.html)
- [2.11.7 使用 MySQL Yum 仓库升级 MySQL](/2/2.11/2.11.7/updating-yum-repo.html)
- [2.11.8 使用 MySQL APT 仓库升级 MySQL](/2/2.11/2.11.8/updating-apt-repo.html)
- [2.11.9 使用 MySQL SLES 仓库升级 MySQL](/2/2.11/2.11.9/updating-sles-repo.html)
- [2.11.10 在 Windows 上升级 MySQL](/2/2.11/2.11.10/windows-upgrading.html)
- [2.11.11 升级 Docker 安装的 MySQL](/2/2.11/2.11.11/upgrade-docker-mysql.html)
- [2.11.12 升级故障排除](/2/2.11/2.11.12/upgrade-troubleshooting.html)
- [2.11.13 重建或修复表或索引](/2/2.11/2.11.13/rebuilding-tables.html)
- [2.11.14 将 MySQL 数据库复制到另一台计算机](/2/2.11/2.11.14/copying-databases.html)

本节介绍升级 MySQL 安装的步骤。

升级是一个常见的过程，因为你可以在同一 MySQL 版本系列中修复 bug，或者在主要 MySQL 版本之间获取重要功能。首先在一些测试系统上执行此过程，以确保一切顺利进行，然后在生产系统上执行。

:::tip 注意
在下面的讨论中，必须使用具有管理权限的 MySQL 帐户运行的 MySQL 命令，包括命令行上的 `-u root` 用以指定 MySQL  `root` 用户。需要 `root` 密码的命令还包括 `-p` 选项。因为 `-p` 后面没有选项值，所以这些命令会提示输入密码。出现提示时键入密码，然后按回车键。

SQL 语句可以使用 [mysql](/4/4.5/4.5.1/mysql.html) 命令行客户端执行（以 `root` 连接以确保你拥有必要的权限）。
:::

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/upgrading.html)
