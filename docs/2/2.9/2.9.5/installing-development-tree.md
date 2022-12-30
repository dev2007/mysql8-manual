# 2.9.5 使用开发源树安装 MySQL

本节介绍如何从托管在 [GitHub](https://github.com/) 上的最新开发源代码安装 MySQL。要从这个存储库托管服务获取 MySQL 服务器源代码，可以设置一个本地 MySQL Git 仓库。

在 [GitHub](https://github.com/) 上，[MySQL](https://github.com/mysql) 页面上有 MySQL 服务器和其他 MySQL 项目。MySQL 服务器项目是一个包含多个 MySQL 系列分支的单一仓库。

MySQL 于2014年9月正式加入 GitHub。有关 MySQL 迁移到 GitHub 的更多信息，参阅 MySQL 发布工程博客上的公告：[MySQL on GitHub](http://mysqlrelease.com/2014/09/mysql-on-github/)

[[toc]]

## 从开发源安装的前置条件

要从开发源树安装 MySQL，你的系统必须满足[章节 2.9.2，“源安装前提条件”](/2/2.9/2.9.2/source-installation-prerequisites.html)中列出的工具要求。

## 设置 MySQL Git 仓库

要在计算机上设置 MySQL Git 仓库，请执行以下操作：

1. 将 MySQL Git 仓库克隆到你的计算机。以下命令将 MySQL Git 仓库克隆到名为 `mysql-server` 的目录中。初始下载可能需要一些时间才能完成，具体取决于你的连接速度。

```bash
~$ git clone https://github.com/mysql/mysql-server.git
Cloning into 'mysql-server'...
remote: Counting objects: 1198513, done.
remote: Total 1198513 (delta 0), reused 0 (delta 0), pack-reused 1198513
Receiving objects: 100% (1198513/1198513), 1.01 GiB | 7.44 MiB/s, done.
Resolving deltas: 100% (993200/993200), done.
Checking connectivity... done.
Checking out files: 100% (25510/25510), done.
```

2. 克隆操作完成后，本地 MySQL Git 仓库的内容如下所示：

```bash
~$ cd mysql-server
~/mysql-server$ ls
client             extra                mysys              storage
cmake              include              packaging          strings
CMakeLists.txt     INSTALL              plugin             support-files
components         libbinlogevents      README             testclients
config.h.cmake     libbinlogstandalone  router             unittest
configure.cmake    libmysql             run_doxygen.cmake  utilities
Docs               libservices          scripts            VERSION
Doxyfile-ignored   LICENSE              share              vio
Doxyfile.in        man                  sql                win
doxygen_resources  mysql-test           sql-common
```

3. 使用 **git branch -r** 命令查看 MySQL 仓库的远程跟踪分支。

```bash
~/mysql-server$ git branch -r
  origin/5.5
  origin/5.6
  origin/5.7
  origin/8.0
  origin/HEAD -> origin/8.0
  origin/cluster-7.2
  origin/cluster-7.3
  origin/cluster-7.4
  origin/cluster-7.5
  origin/cluster-7.6
```

4. 要查看在本地仓库中检出的分支，执行 **git branch** 命令。当你克隆 MySQL Git 仓库时，最新的 MySQL GA 分支将自动检出。星号标识活动分支。

```bash
~/mysql-server$ git branch
* 8.0
```

5. 要检出早期的 MySQL 分支，请运行 **git checkout** 命令，指定分支名称。例如，要查看 MySQL 5.7 分支：

```bash
~/mysql-server$ git checkout 5.7
Checking out files: 100% (9600/9600), done.
Branch 5.7 set up to track remote branch 5.7 from origin.
Switched to a new branch '5.7'
```

6. 要获取初始设置 MySQL Git 仓库后所做的更改，请切换到要更新的分支并执行 **git pull**命令：

```bash
~/mysql-server$ git checkout 8.0
~/mysql-server$ git pull
```

要检查提交历史记录，请使用 `git log` 选项：

```bash
~/mysql-server$ git log
```

你还可以在 GitHub [MySQL](https://github.com/mysql) 站点上浏览提交历史和源代码。

如果你看到有问题的更改或代码，请访问 [MySQL Community Slack](https://mysqlcommunity.slack.com/)。有关贡献修补程序的信息，参阅[向 MySQL Server 贡献](http://mysqlserverteam.com/contributing-to-mysql-server/)。

7. 克隆了 MySQL Git 仓库并检出了要构建的分支后，可以从源代码构建 MySQL 服务器。[章节 2.9.4，“使用标准源分发安装 MySQL”](/2/2.9/2.9.4/installing-source-distribution)中提供了说明，但你跳过了获取和解压缩分发的部分。

在生产计算机上安装来自分发源树的生成时要小心。安装命令可能会覆盖你的实时版本安装。如果你已经安装了 MySQL 并且不想覆盖它，请使用不同于生产服务器使用的 [CMake_INSTALL_PPREFIX](/2/2.9/2.9.7/source-configuration-options.html#安装布局选项)、[MySQL_TCP_PORT](/2/2.9/2.9.7/source-configuration-options.html#特性选项) 和 [MySQL_UNIX_ADDR](/2/2.9/2.9.7/source-configuration-options.html#特性选项) 选项的值运行 **CMake**。有关防止多个服务器相互干扰的其他信息，参阅[章节 5.8，“在一台机器上运行多个 MySQL 实例”](/5/5.8/multiple-servers.html)。

全力使用你的新安装。例如，尝试使新功能崩溃。首先运行 **make test**。参阅 [MySQL 测试套件](https://dev.mysql.com/doc/extending-mysql/8.0/en/mysql-test-suite.html)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/installing-development-tree.html)
