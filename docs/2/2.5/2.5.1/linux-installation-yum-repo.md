# 2.5.1 使用 MySQL Yum 存储库在 Linux 上安装 MySQL

用于Oracle Linux、Red Hat 企业版 Linux、CentOS 和 Fedora 的 MySQL Yum 仓库提供了用于安装 MySQL 服务器、客户端、MySQL 工作台、MySQL 实用程序、MySQL 路由器、MySQL Shell、Connector/ODBC、Connector/Python 等的 RPM 包（并非所有包都适用于所有发行版；有关详细信息，参阅[使用 Yum 安装其他 MySQL 产品和组件](/2/2.5/2.5.1/linux-installation-yum-repo.html#使用-Yum-安装其他-MySQL-产品和组件)）。

## 在你开始前

作为一种流行的开源软件，MySQL 以其原始或重新打包的形式广泛安装在来自不同来源的许多系统上，包括不同的软件下载站点、软件存储库等。以下说明假设 MySQL 尚未使用第三方分布式 RPM 包安装在您的系统上；如果不是这样，请按照[章节 2.11.7，“使用 MySQL Yum 他库升级 MySQL”](/2/2.11/2.11.7/updating-yum-repo.html)或者[使用 MySQL Yum 仓库替换 MySQL 的第三方发行版](/2/2.5/2.5.2/replace-third-party-yum.html)中给出的说明进行操作。

## 新安装 MySQL 的步骤

按照以下步骤使用 MySQL Yum 仓库安装 MySQL 的最新 GA 版本：

### 1. **添加 MySQL Yum 仓库**

首先，将 MySQL Yum 仓库添加到系统的存储库列表中。这是一个一次性操作，可以通过安装 MySQL 提供的 RPM 来执行。请遵循以下步骤：

a. 转到 MySQL 开发人员区域中下载 MySQL Yum 仓库页面([https://dev.mysql.com/downloads/repo/yum/](https://dev.mysql.com/downloads/repo/yum/))。

b. 为你的平台选择并下载发布包。

c. 使用以下命令安装下载的发行包，将平台和版本特定的包名替换为下载的 RPM 包名：

```bash
$> sudo yum install platform-and-version-specific-package-name.rpm
```

对于基于 EL6 的系统，命令格式如下：

```bash
$> sudo yum install mysql80-community-release-el6-{version-number}.noarch.rpm
```

对于基于 EL7 的系统：

```bash
$> sudo yum install mysql80-community-release-el7-{version-number}.noarch.rpm
```

对于基于 EL8 的系统：

```bash
$> sudo yum install mysql80-community-release-el8-{version-number}.noarch.rpm
```

对于基于 EL9 的系统：

```bash
$> sudo yum install mysql80-community-release-el9-{version-number}.noarch.rpm
```

对于 Fedora 35：

```bash
$> sudo dnf install mysql80-community-release-fc35-{version-number}.noarch.rpm
```

对于 Fedora 34：

```bash
$> sudo dnf install mysql80-community-release-fc34-{version-number}.noarch.rpm
```

安装命令将 MySQL Yum 仓库添加到系统的存储库列表中，并下载GnuPG密钥以检查软件包的完整性。有关GnuPG密钥检查的详细信息，请参见第2.1.4.2节“使用GnuPG进行签名检查”。

你可以通过以下命令检查 MySQL Yum 仓库是否已成功添加（对于启用dnf的系统，请将命令中的 **yum** 替换为 **dnf**）：

```bash
$> yum repolist enabled | grep "mysql.*-community.*"
```

::: tip 注意
在你的系统上启用 MySQL Yum 仓库后，通过Y **yum update** 命令进行的任何系统范围的更新（或对启用dnf的系统进行 **dnf upgrade**）都会升级你系统上的 MySQL 包，并替换任何本地第三方包，前提是 Yum 在 MySQL Yum 仓库中找到了替换包；参阅[章节 2.11.7，“使用 MySQL Yum 仓库升级 MySQL”](/2/2.11/2.11.7/updating-yum-repo.html)，有关这对系统可能产生的一些影响的讨论，参阅[升级共享客户端库](/2/2.11/2.11.7/updating-yum-repo.html#升级共享客户端库)。
:::

### 2. **选择一个发布系列**

在使用 MySQL Yum 仓库时，默认情况下会选择最新的 GA 系列（当前为 MySQL 8.0）进行安装。如果这是你想要的，你以跳到下一步，[安装 MySQL](/2/2.5/2.5.1/linux-installation-yum-repo.html#_4-安装-MySQL)。
在MySQL Yum 仓库中，MySQL 社区服务器的不同版本系列托管在不同的子仓库中。默认情况下，最新 GA 系列（当前为 MySQL 8.0）的子仓库处于启用状态，而所有其他系列（例如，MySQL 8.0 系列）的子仓库处于禁用状态。使用此命令可查看 MySQL Yum 仓库中的所有子仓库，并查看其中哪些子仓库已启用或禁用（对于启用 dnf 的系统，请将命令中的 **Yum** 替换为 **dnf**）：

```bash
$> yum repolist all | grep mysql
```

要安装最新 GA 系列的最新版本，无需配置。要安装除最新 GA 系列之外的特定系列的最新版本，请在运行安装命令之前禁用最新 GA 序列的子仓库，并启用特定系列的子仓库。如果你的平台支持 **yum-config-manager**，你可以通过发出以下命令来实现这一点：禁用 5.7 系列的子仓库，并启用 8.0 系列的子库：

```bash
$> sudo yum-config-manager --disable mysql57-community
$> sudo yum-config-manager --enable mysql80-community
```

对于启用 dnf 的平台：

```bash
$> sudo dnf config-manager --disable mysql57-community
$> sudo dnf config-manager --enable mysql80-community
```

除了使用 **yum-config-manager** 或 **dnf config-manager** 命令外，你还可以通过手动编辑 `/etc/yum.repos.d/mysql-community.repo` 文件来选择发行系列。这是文件中版本系列子仓库的典型条目：

```bash
[mysql57-community]
name=MySQL 5.7 Community Server
baseurl=http://repo.mysql.com/yum/mysql-5.7-community/el/6/$basearch/
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql-2022
       file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql
```

找到要配置的子存储库的条目，然后编辑“已启用”选项。指定 `enabled=0` 以禁用子仓库，或指定 `enabled=1` 以启用子仓库。例如，要安装 MySQL 8.0，请确保为MySQL 5.7的上述子存储库条目 `enabled=0`，并为 8.0 系列的条目 `enabled=1`：

```bash
# Enable to use MySQL 8.0
[mysql80-community]
name=MySQL 8.0 Community Server
baseurl=http://repo.mysql.com/yum/mysql-8.0-community/el/6/$basearch/
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql-2022
       file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql
```

在任何时候都只能为一个发行版系列启用子仓库。当启用多个版本系列的子仓库时，Yum 将使用最新系列。

通过运行以下命令并检查其输出，验证是否启用和禁用了正确的子仓库（对于启用 dnf 的系统，将命令中的 **yum** 替换为 **dnf**）：

```bash
$> yum repolist enabled | grep mysql
```

### 3. 禁用默认 MySQL 模块

（仅限 EL8 系统）基于 EL8 的系统，如 RHEL8 和 Oracle Linux 8，包括默认启用的 MySQL 模块。除非禁用此模块，否则它会屏蔽 MySQL 仓库提供的包。要禁用包含的模块并使 MySQL 仓库包可见，请使用以下命令（对于启用 dnf 的系统，将命令中的 **yum** 替换为 **dnf**）：

```bash
$> sudo yum module disable mysql
```

### 4. 安装 MySQL

通过以下命令安装MySQL（对于启用dnf的系统，将命令中的 **yum** 替换为 **dnf**）：

```bash
$> sudo yum install mysql-community-server
```

这将安装 MySQL 服务器的包（MySQL 社区服务器），以及运行服务器所需组件的包，包括客户端的包（MySQL 社区客户端）、客户端和服务器的常见错误消息和字符集（`mysql-community-common`）以及共享客户端库（`mysql-community-libs`）。

## 5. 启动 MySQL 服务器

通过以下命令启动 MySQL：

```bash
$> systemctl start mysqld
```

你也可以通过以下命令检查 MySQL 服务器状态：

```bash
$> systemctl status mysqld
```

如果操作系统启用了 systemd，则应使用标准 **systemctl**（或参数相反的 **service**）命令（如 **stop**、**start**、**status** 和 [**restart**](/13/13.7/13.7.8/13.7.8.8/restart.html)）来管理 MySQL 服务器服务。默认情况下，`mysqld` 服务处于启用状态，并在系统重新启动时启动。有关更多信息，参阅[章节 2.5.9，“使用 systemd 管理 MySQL 服务器”](/2/2.5/2.5.9/using-systemd.html)。

在服务器初始启动时，如果服务器的数据目录为空，则会发生以下情况：

- 服务器被初始化。

- SSL 证书和密钥文件在数据目录中生成。

- 已安装并启用 [validate_password](/6/6.4/6.4.3/validate-password.html)。

- 将创建超级用户帐户 'root'@'localhost。超级用户的密码已设置并存储在错误日志文件中。要显示它，请使用以下命令：

```bash
$> sudo grep 'temporary password' /var/log/mysqld.log
```

通过使用生成的临时密码登录，尽快更改 root 密码，并为超级用户帐户设置自定义密码：

```bash
$> mysql -uroot -p
```

```bash
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass4!';
```

::: tip 注意
默认情况下安装了 [validate_password](/6/6.4/6.4.3/validate-password)。[validate_password](/6/6.4/6.4.3/validate-password.html) 实现的默认密码策略要求密码至少包含一个大写字母、一个小写字母、一位数字和一个特殊字符，并且总密码长度至少为 8 个字符。
:::

有关安装后程序的更多信息，参阅[章节 2.10，“安装后设置和测试”](/2/2.10/postinstallation.html)。

::: tip 注意
*基于 EL7 的平台的兼容性信息*：来自这些平台的本机软件仓库的以下 RPM 包与来自安装 MySQL 服务器的 MySQL Yum 仓库的包不兼容。一旦使用 MySQL Yum 仓库安装了 MySQL，就无法安装这些软件包（反之亦然）。</br>- akonadi mysql
:::

## 使用 Yum 安装其他 MySQL 产品和组件

你可以使用 Yum 来安装和管理 MySQL 的各个组件。其中一些组件位于 MySQL Yum 仓库的子仓库中：例如，MySQL 连接器可以在 MySQL 连接器社区子仓库和 MySQL 工具社区中的 MySQL 工作台中找到。你可以使用以下命令列出 MySQL Yum 仓库中可用于你平台的所有 MySQL 组件的包（对于启用 dnf 的系统，将命令中的 **yum** 替换为 **dnf**）：

```bash
$> sudo yum --disablerepo=\* --enablerepo='mysql*-community*' list available
```

使用以下命令安装你选择的任何软件包，将软件包名称替换为软件包名称（对于启用 dnf 的系统，将命令中的 **yum** 替换为 **dnf*）：

```bash
$> sudo yum install package-name
```

例如，要在 Fedora 上安装 MySQL Workbench：

```bash
$> sudo dnf install mysql-workbench-community
```

要安装共享客户端库（对于启用 dnf 的系统，将命令中的 **yum** 替换为 **dnf**）：

```bash
$> sudo yum install mysql-community-libs
```

## 平台特定说明

支持 ARM

Oracle Linux 7 支持 ARM 64位（aarch64），并且需要 Oracle Linux 7 软件集合库（ol7_Software_Collections）。例如，要安装服务器：

```bash
$> yum-config-manager --enable ol7_software_collections
$> yum install mysql-community-server
```

::: tip 注意
从 MySQL 8.0.12 开始，Oracle Linux 7 支持 ARM 64位（aarch64）。
:::

::: warning 已知限制
8.0.12 版本要求你在执行 `yum install` 步骤后，通过执行 `ln -s /opt/oracle/oracle-armtoolset-1/root/usr/lib64/usr/lib64/gcc7` 来调整 `libstdc++7` 路径。
:::

## 通过 Yum 升级 MySQL

除了安装，你还可以使用 MySQL Yum 仓库对 MySQL 产品和组件执行更新。有关详细信息，参阅[章节 2.11.7，“使用 MySQL Yum 仓库升级 MySQL”](/2/2.11/2.11.7/updating-yum-repo.html)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/linux-installation-yum-repo.html)
