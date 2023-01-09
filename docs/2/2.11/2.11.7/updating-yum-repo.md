# 2.11.7 使用 MySQL Yum 仓库升级 MySQL

对于支持的基于 Yum 的平台（参阅[章节 2.5.1，“使用 MySQL Yum 仓库在 Linux 上安装 MySQL”](/2/2.5/2.5.1/linux-installation-yum-repo)，以获取列表），你可以使用 MySQL Yum  仓库对 MySQL 执行就地升级（即，替换旧版本，然后使用旧数据文件运行新版本）。

:::tip 注意
-在对 MySQL 执行任何更新之前，请仔细遵循[章节 2.11，“升级 MySQL”](/2/2.11/upgrading.html)中的说明。在这里讨论的其他说明中，在更新之前备份数据库尤为重要。
- 以下说明假设你已使用 MySQL Yum 仓库或从 [MySQL Developer Zone 的 MySQL 下载页面](https://dev.mysql.com/downloads/)直接下载的 RPM 包安装了 MySQL；如果不是这样，请按照[使用 MySQL Yum 仓库替换 MySQL 的第三方分发](https://dev.mysql.com/doc/refman/5.7/en/replace-third-party-yum.html)中的说明进行操作。
:::

## 1. 选择目标系列

默认情况下，MySQL Yum 仓库会将 MySQL 更新到你在安装期间选择的发行系列中的最新版本（有关详细信息，参阅[选择发行系列](/2/2.5/2.5.1/linux-installation-yum-repo.html#_2-选择一个发布系列)），这意味着，例如，5.7.x 安装不会自动更新到 8.0.x 版本。若要更新到另一个发行系列，必须首先禁用所选系列的子库（默认情况下或你自己），并为目标系列启用子库。为此，参阅[选择发行系列](/2/2.5/2.5.1/linux-installation-yum-repo.html#_2-选择一个发布系列)中给出的一般说明。要从 MySQL 5.7 升级到 8.0，请执行与[选择发行系列](/2/2.5/2.5.1/linux-installation-yum-repo.html#_2-选择一个发布系列)中所示步骤相反的步骤，禁用 MySQL 5.7 系列的子库，并启用 MySQL 8.0 系列的子存储。

一般来说，要从一个发布系列升级到另一个，请转到下一个系列，而不是跳过一个系列。例如，如果你当前正在运行 MySQL 5.6 并希望升级到 8.0，请在升级到 8.0 之前先升级到 MySQL 5.7。

## 2. 升级 MySQL

对于未启用 dnf 的平台，通过以下命令升级 MySQL 及其组件：

```bash
sudo yum update mysql-server
```

对于启用 dnf 的平台：

```bash
sudo dnf upgrade mysql-server
```

或者，你可以通过告诉 Yum 更新系统上的所有内容来更新 MySQL，这可能需要花费更多的时间。对于未启用 dnf 的平台：

```bash
sudo yum update
```

对于启用 dnf 的平台：

```bash
sudo dnf upgrade
```

## 3. 重启 MySQL

MySQ L服务器总是在 Yum 更新后重新启动。在 MySQL 8.0.16 之前，在服务器重新启动后运行 [mysql_upgrade](/4/4.4/4.4.5/mysql-upgrade.html)，以检查并可能解决旧数据和升级软件之间的任何不兼容问题。[mysql_upgrade](/4/4.4/4.4.5/mysql-upgrade.html) 还执行其他功能；有关详细信息，参阅[章节 4.4.5，“mysql_upgrade——检查和升级 MySQL 表”](/4/4.4/4.4.5/mysql-upgrade.html)。从 MySQL 8.0.16 开始，这一步骤是不需要的，因为服务器执行之前由 [mysql_upgrade](/4/4.4/4.4.5/mysql-upgrade.html) 处理的所有任务。

也可以仅更新特定组件。使用以下命令列出 MySQL 组件的所有已安装包（对于启用 dnf 的系统，请将命令中的 **yum** 替换为 **dnf**）：

```bash
sudo yum list installed | grep "^mysql"
```

识别所选组件的包名后，使用以下命令更新包，将包名替换为包名。对于未启用 dnf 的平台：

```bash
sudo yum update package-name
```

对于启用 dnf 的平台：

```bash
sudo dnf upgrade package-name
```

## 升级共享客户端库

在使用 Yum 仓库更新 MySQL 之后，使用旧版本的共享客户端库编译的应用程序应该可以继续工作。

*如果你重新编译应用程序并将其与更新的库动态链接*：对于共享库的新版本，在新库和旧库之间的符号版本控制存在差异或添加，这是典型的（例如，在较新的标准 8.0 共享客户端库和 Linux 发行版软件仓库本地提供的共享库的一些较旧的早期或变体版本之间，或从一些其他来源），使用更新的较新共享库编译的任何应用程序都需要在部署应用程序的系统上使用这些更新的库。正如预期的那样，如果这些库没有到位，那么需要共享库的应用程序就会失败。因此，请确保在这些系统上部署 MySQL 共享库的包。要做到这一点，请将 MySQL Yum 仓库添加到系统中（参阅[添加 MySQL Yum 仓库](/2/2.5/2.5.1/linux-installation-yum-repo.html#_1-添加-mysql-yum-仓库)），并使用[使用 Yum 安装其他 MySQL 产品和组件](/2/2.5/2.5.1/linux-installation-yum-repo.html#使用-yum-安装其他-mysql-产品和组件)中给出的说明安装最新的共享库。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/updating-yum-repo.html)
