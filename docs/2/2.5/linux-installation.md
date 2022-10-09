# 2.5 在 Linux 上安装 MySQL

- [2.5.1 使用 MySQL Yum 仓库在 Linux 上安装 MySQL](/2/2.5/2.5.1/linux-installation-yum-repo.html)
- [2.5.2 使用 MySQL APT 仓库在 Linux 上安装 MySQL](/2/2.5/2.5.2/linux-installation-apt-repo.html)
- [2.5.3 使用 MySQL SLES 仓库在 Linux 上安装 MySQL](/2/2.5/2.5.3/linux-installation-sles-repo.html)
- [2.5.4 使用 Oracle 的 RPM 包在 Linux 上安装 MySQL](/2/2.5/2.5.4/linux-installation-rpm.html)
- [2.5.5 使用 Oracle 的 Debian 软件包在 Linux上 安装 MySQL](/2/2.5/2.5.5/linux-installation-debian.html)
- [2.5.6 使用 Docker 在 Linux 上部署 MySQL](/2/2.5/2.5.6/linux-installation-docker.html)
- [2.5.7 从本地软件仓库在 Linux 上安装 MySQL](/2/2.5/2.5.7/linux-installation-native.html)
- [2.5.8 使用 Juju 在 Linux 上安装 MySQL](/2/2.5/2.5.8/linux-installation-juju.html)
- [2.5.9 使用 systemd 管理 MySQL 服务器](/2/2.5/2.5.9/using-systemd.html)

Linux 支持安装 MySQL 的多种不同解决方案。我们建议你使用 Oracle 的一个发行版，其中有几种安装方法：

**表 2.8 Linux 安装方法和信息**

|类型|安装方法|附加信息|
|--|--|--|
|Apt|启用 [MySQL Apt 仓库](https://dev.mysql.com/downloads/repo/apt/)|[文档](/2/2.5/2.5.2/linux-installation-apt-repo.html)|
|Yum|启用 [MySQL Yum 仓库](https://dev.mysql.com/downloads/repo/yum/)|[文档](/2/2.5/2.5.1/linux-installation-yum-repo.html)|
|Zypper|启用 [MySQL SLES 仓库](https://dev.mysql.com/downloads/repo/suse/)|[文档](/2/2.5/2.5.3/linux-installation-sles-repo.html)|
|RPM|[下载](https://dev.mysql.com/downloads/mysql/)指定的包|[文档](/2/2.5/2.5.4/linux-installation-rpm.html)|
|DEB|[下载](https://dev.mysql.com/downloads/mysql/)指定的包|[文档](/2/2.5/2.5.5/linux-installation-debian.html)|
|普通|[下载](https://dev.mysql.com/downloads/mysql/)指定的包|[文档](/2/2.2/binary-installation.html)|
|源码|从[源码](https://dev.mysql.com/downloads/mysql/)编译|[文档](/2/2.9/source-installation.html)|
|Docker|使用 [Oracle Container Registry](https://container-registry.oracle.com/)。你也可以使用支持 MySQL 社区版和 MySQL 企业版的[我的 Oracle 支持](https://support.oracle.com/) 的 Docker Hub。|[文档](/2/2.5/2.5.6/linux-installation-docker.html)|
|Oracle Unbreakable Linux Network|使用 ULN 通道|[文档](/2/2.6/uln-installation.html)|

作为替代方案，你可以使用系统上的软件包管理器从 Linux 发行版的本地软件库中自动下载和安装 MySQL 软件包。这些本机软件包通常比当前可用版本晚几个版本。你通常也无法安装开发里程碑版本（DMR），因为这些版本通常在本机仓库中不可用。有关使用本机软件包安装程序的更多信息，参阅[章节 2.5.7，“从本机软件库在 Linux 上安装 MySQL”](/2/2.5/2.5.7/linux-installation-native.html)。

::: tip 注意
对于许多 Linux 安装，你希望将 MySQL 设置为在机器启动时自动启动。许多本机软件包安装为你执行此操作，但对于源代码、二进制和RPM解决方案，你可能需要单独设置。所需的脚本 [mysql.server](/4/4.3/4.3.3/mysql-server.html)，可以在 MySQL 安装目录下的支持文件目录或 MySQL 源代码树中找到。你可以将其安装为 `/etc/init.d/mysql`，用于自动启动和关闭 MySQL。参阅[章节 4.3.3，“mysql.server——MySQL 服务器启动脚本”](/4/4.3/4.3.3/mysql-server.html)。
:::

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/linux-installation.html)
