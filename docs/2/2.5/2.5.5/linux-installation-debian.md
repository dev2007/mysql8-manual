# 2.5.5 使用 Oracle 的 Debian 软件包在 Linux上 安装 MySQL

Oracle 提供 Debian 软件包，用于在 Debian 或类似 Debian 的 Linux 系统上安装 MySQL。软件包可通过两个不同的渠道获得：

- [MySQL APT 仓库](https://dev.mysql.com/downloads/repo/apt/)。这是在类 Debian 系统上安装 MySQL 的首选方法，因为它提供了一种简单方便的方法来安装和更新 MySQL 产品。有关详细信息，参阅[章节 2.5.2，“使用 MySQL APT 仓库在 Linux 上安装 MySQL”](/2/2.5/2.5.2/linux-installation-apt-repo.html)。

- MySQL 开发人员专区的下载区。有关详细信息，参阅[章节 2.1.3，“如何获取 MySQL”](/2/2.1/2.1.3/getting-mysql.html)。以下是关于 Debian 软件包的一些信息以及安装说明：

  - MySQL 开发者专区提供了各种 Debian 软件包，用于在当前 Debian 和 Ubuntu 平台上安装 MySQL 的不同组件。首选方法是使用 tarball 包，它包含 MySQL 基本设置所需的包。tarball 包的名称格式为 `mysql-server_MVER-DVER_CPU.deb-bundle.tar.MVER` 是 MySQL 版本，`DVER` 是 Linux 发行版。`CPU` 值表示为其构建包的处理器类型或系列，如下表所示：

  **表 2.13 MySQL、Debian 和 Ubuntu 安装包 CPU 标识符**

  |CPU **值**|期望处理器类型或系列|
  |--|--|
  |`i386`|奔腾或更高级的 32 位处理器|
  |`amd64`|64 位 X86 处理器|

  - 下载 tarball 后，使用以下命令将其解包：

    ```bash
    $> tar -xvf mysql-server_MVER-DVER_CPU.deb-bundle.tar
    ```

  - 如果你的系统上没有 `libaio` 库，你可能需要安装它：

    ```bash
    $> sudo apt-get install libaio1
    ```

  - 使用以下命令预配置 MySQL 服务器包：

    ```bash
    $> sudo dpkg-preconfigure mysql-community-server_*.deb
    ```

    我们要求你为 MySQL 安装的 root 用户提供密码。你可能会被问及有关安装的其他问题。

    :::danger 重要
    请确保记住你设置的 root 密码。想要稍后设置密码的用户可以在对话框中将**密码**字段留空，然后按`确定`；在这种情况下，将使用 [MySQL 套接字对等凭据身份验证插件](/6/6.4/6.4.1/6.4.1.10/socket-pluggable-authentication.html)对服务器的 root 访问进行身份验证，以便使用 Unix 套接字文件进行连接。你可以稍后使用 [mysql_secure_installation](/4/4.4/4.4.2/mysql-secure-installation.html)设置 root 密码。
    :::

  - 对于 MySQL 服务器的基本安装，安装数据库公共文件包、客户端包、客户端元包、服务器包和服务器元包（按顺序）；你可以使用一个命令来执行此操作：

    ```bash
    $> sudo dpkg -i mysql-{common,community-client-plugins,community-client-core,community-client,client,community-server-core,community-server,server}_*.deb
    ```

    包名称中还包含服务器核心和客户端核心的包。它们仅包含二进制文件，由标准软件包自动安装。自行安装它们不会导致 MySQL 设置正常运行。

    如果 **dpkg**（如 libmecab2）警告你存在未满足的依赖关系，你可以使用 **apt-get** 修复它们：

    ```bash
    sudo apt-get -f install
    ```

    以下是系统上安装文件的位置：

    - 所有配置文件（如 `my.cnf`）都位于 `/etc/mysql` 下

    - 所有二进制文件、库、头文件等都位于 `/usr/bin` 和 `/usr/sbin` 下

    - 数据目录位于 `/var/lib/mysql` 下

    :::tip 注意
    其他供应商也提供了 MySQL 的 Debian 发行版。请注意，它们在功能、功能和约定（包括通信设置）方面可能与 Oracle 构建的不同，本手册中的说明不一定适用于安装它们。应参考供应商的说明。
    :::

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/linux-installation-debian.html)
