# 2.5.4 使用 Oracle 的 RPM 包在 Linux 上安装 MySQL

在基于 RPM 的 Linux 发行版上安装 MySQL 的推荐方法是使用 Oracle 提供的 RPM 软件包。对于 MySQL 的社区版，有两个来源可以获得它们：

- 从 MySQL 软件仓库：
  - MySQL Yum 仓库（有关详细信息，参阅[章节 2.5.1，“使用 MySQL Yum 仓库在 Linux 上安装 MySQL”](/2/2.5/2.5.1/linux-installation-yum-repo.html)
）。
  - MySQL SLES 仓库（有关详细信息，参阅[章节 2.5.3，“使用 MySQL SLE 仓库在 Linux 上安装 MySQL”](/2/2.5/2.5.3/linux-installation-sles-repo.html)）。

- 从 [MySQL 开发区](https://dev.mysql.com/)的[下载 MySQL 社区服务器](https://dev.mysql.com/downloads/mysql/)页面。

::: tip 注意
MySQL 的 RPM 发行版也由其他供应商提供。请注意，它们在功能、功能和约定（包括通信设置）方面可能与 Oracle 构建的不同，本手册中的安装说明不一定适用于它们。应参考供应商的说明。
:::

## MySQL RPM 包

**表 2.9 MySQL 社区版的 RPM 包**

|包名字|说明|
|--|--|
|`mysql-community-client`|MySQL 客户端应用程序和工具|
|`mysql-community-common`|服务器和客户端库的通用文件|
|`mysql-community-devel`|为 MySQL 数据库客户端应用程序开发头文件和库|
|`mysql-community-embedded-compat`|MySQL 服务器作为嵌入式库，与使用该库版本 18 的应用程序兼容|
|`mysql-community-libs`|MySQL 数据库客户端应用程序的共享库|
|`mysql-community-libs-compat`|以前 MySQL 安装的共享兼容性库|
|`mysql-community-server`|数据库服务器和相关工具|
|`mysql-community-server-debug`|调试服务器和插件二进制文件|
|`mysql-community-test`|MySQL 服务器的测试套件|
|`mysql-community`|源代码 RPM 看起来类似于 mysql-community-8.0.30-1.el7.src》rpm，取决于所选操作系统|
|更多 *debuginfo* RPM|有几个 `debuginfo` 包：mysql-community-client-debuginfo、mysql-community-libs-debuginfo mysql-community-server-debug-debuginfo mysql-community-server-debuginfo 和 mysql-community-test-debuginfo|

**表 2.10 MySQL 企业版的 RPM 包**

|包名字|说明|
|--|--|
|`mysql-commercial-backup`|MySQL 企业版备份（8.0.11 添加）|
|`mysql-commercial-client`|MySQL 客户端应用程序和工具|
|`mysql-commercial-common`|服务器和客户端库的通用文件|
|`mysql-commercial-devel`|为 MySQL 数据库客户端应用程序开发头文件和库|
|`mysql-commercial-embedded-compat`|MySQL 服务器作为嵌入式库，与使用该库版本 18 的应用程序兼容|
|`mysql-commercial-libs`|MySQL 数据库客户端应用程序的共享库|
|`mysql-commercial-libs-compat`|以前 MySQL 安装的共享兼容性库|
|`mysql-commercial-server`|数据库服务器和相关工具|
|`mysql-commercial-test`|MySQL 服务器的测试套件|
|更多 *debuginfo* RPM|有几个 `debuginfo` 包：mysql-community-client-debuginfo、mysql-community-libs-debuginfo mysql-community-server-debug-debuginfo mysql-community-server-debuginfo 和 mysql-community-test-debuginfo|

RPM 的全名具有以下语法：

```bash
packagename-version-distribution-arch.rpm
```

**表 2.11 MySQL Linux RPM 包分发标识符**

|发布值|期望使用|
|--|--|
|el*{version}* 其中 *{version}* 是主企业版 Linux 版本, 比如 el8|EL6、EL7、EL8 和基于 EL9 平台(比如，Oracle Linux、Red Hat 企业版 Linux 和 CentOS 相应版本)|
|fc*{version}* 其中 *{version}* 是主 Fedora 版本,比如 fc34|Fedora 34 和 35|
|`sles12`|SUSE Linux 企业服务器 12|

要查看 RPM 包（例如，`mysql-community-server`）中的所有文件，请使用以下命令：

```bash
$> rpm -qpl mysql-community-server-version-distribution-arch.rpm
```

*本节其余部分的讨论仅适用于使用直接从 Oracle 下载的 RPM 包而不是通过 MySQL 仓库进行安装的过程。*

某些包之间存在依赖关系。如果你计划安装许多软件包，你可能希望下载 RPM 打包的 **tar** 文件，它包含上面列出的所有 RPM 软件包，因此你不需要单独下载它们。

在大多数情况下，你需要安装 `mysql-community-server`、`mysql-community-client`、`mysql-community-libs`、`mysql-community-common` 和 `mysql-community-libs-compat`，以获得功能性的标准 MySQL 安装。要执行这种标准的基本安装，请转到包含所有这些软件包的文件夹（最好是没有其他具有类似名称的RPM软件包），并执行以下命令：

```bash
$> sudo yum install mysql-community-{server,client,common,libs}-*
```

对于 SLES，用 **zypper** 替换 **yum**；对于 Fedora，用 **dnf** 替代。

虽然最好使用诸如 **yum** 之类的高级软件包管理工具来安装软件包，但喜欢直接使用 **rpm** 命令的用户可以使用 **rpm -Uvh** 命令替换 **yum install** 命令；然而，由于安装过程可能遇到的潜在依赖性问题，使用 **rpm -Uvh** 会使安装过程更容易失败。

要只安装客户端程序，你可以在要安装的软件包列表中跳过 `mysql-community-server`；执行以下命令：

```bash
$> sudo yum install mysql-community-{client,common,libs}-*
```

对于 SLES，用 **zypper** 替换 **yum**；对于 Fedora，用 **dnf** 替代。

使用 RPM 包的 MySQL 标准安装会在系统目录下创建文件和资源，如下表所示。

**表 2.12 MySQL 开发者区 Linux RPM 包的 MySQL 安装结构**

|文件或资源|位置|
|--|--|
|客户端程序和脚本|`/usr/bin`|
|[mysqld](/4/4.3/4.3.1/mysqld.html) 服务器|`/usr/sbin`|
|配置文件|`/etc/my.cnf`|
|数据目录|`/var/lib/mysql`|
|错误日志文件|对 RHEL、Oracle Linux、CentOS 或 Fedora 平台: `/var/log/mysqld.log` <br> 对 SLES: `/var/log/mysql/mysqld.log`|
|[secure_file_priv](/5/5.1/5.1.8/server-system-variables.html) 的值|`/var/lib/mysql-files`|
|System V 初始化脚本|对 RHEL、Oracle Linux、CentOS 或 Fedora 平台: `/etc/init.d/mysqld` <br> 对 SLES: `/etc/init.d/mysql`|
|Systemd 服务|对 RHEL、Oracle Linux、CentOS 或 Fedora 平台: `mysqld` <br> 对 SLES: `mysql`|
|Pid 文件|`/var/run/mysql/mysqld.pid`|
|Socket|`/var/lib/mysql/mysql.sock`|
|Keyring 目录|`/var/lib/mysql-keyring`|
|Unix 手册页|`/usr/share/man`|
|引用（头）文件|`/usr/include/mysql`|
|库|`/usr/lib/mysql`|
|其他支持文件（例如，错误消息和字符集文件）|`/usr/share/mysql`|

安装还将在系统上创建名为 `mysql` 的用户和名为 `mysql` 的组。

::: tip 注意
使用旧软件包安装以前版本的 MySQL 可能会创建一个名为 `/usr/my.cnf` 的配置文件。强烈建议你检查文件的内容，并将所需的设置迁移到文件 `/etc/my.cnf` 文件中，然后删除 `/usr/my.cnf`。
:::

MySQL 不会在安装过程结束时自动启动。对于 Red Hat 企业版 Linux、Oracle Linux、CentOS 和 Fedora 系统，请使用以下命令启动 MySQL：

```bash
$> systemctl start mysqld
```

对于 SLES 系统，命令相同，但服务名称不同：

```bash
$> systemctl start mysql
```

如果操作系统启用了 systemd，则应使用标准 **systemctl**（或参数相反的 **service**）命令（如 **stop**、**start**、**status** 和 [**restart**](/13/13.7/13.7.8/13.7.8.8/restart.html)）来管理 MySQL 服务器服务。默认情况下，`mysqld` 服务处于启用状态，并在系统重新启动时启动。有关更多信息，参阅[章节 2.5.9，“使用 systemd 管理 MySQL 服务器”](/2/2.5/2.5.9/using-systemd.html)。

在使用 RPM 和 DEB 包进行升级安装期间，如果在升级时 MySQL 服务器正在运行，则 MySQL 服务器将停止，升级将发生，并且 MySQL 服务器会重新启动。一个例外：如果版本在升级过程中也发生了变化（例如从社区到商业，反之亦然），则不会重新启动 MySQL 服务器。

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
默认情况下安装了 [validate_password](/6/6.4/6.4.3/validate-password.html)。[validate_password](/6/6.4/6.4.3/validate-password.html) 实现的默认密码策略要求密码至少包含一个大写字母、一个小写字母、一位数字和一个特殊字符，并且总密码长度至少为 8 个字符。
:::

如果安装过程中出现问题，你可能会在错误日志文件 `/var/log/mysqld.log` 中找到调试信息。

对于某些 Linux 发行版，可能需要增加 [**mysqld**](/4/4.3/4.3.1/mysqld.html) 可用文件描述符的数量限制。参阅[章节 B.3.2.16，“未找到文件和类似错误”](/b/b.3/b.3.2/b.3.2.16/not-enough-file-handles.html)。

**从多个 MySQL 版本安装客户端库**。可以安装多个客户端库版本，例如，如果你希望与链接到以前库的旧应用程序保持兼容性。要安装旧的客户端库，请在 **rpm** 中使用 `--oldpackage` 选项。例如，在具有 `libmysqlclient.21` 的 EL6 系统上基于 MySQL 8.0 安装 `mysql-community-libs-5.5.21`，使用如下命令：

```bash
$> rpm --oldpackage -ivh mysql-community-libs-5.5.50-2.el6.x86_64.rpm
```

**调试包**。使用[调试包](/5/5.9/5.9.4/dbug-package.html)编译的 MySQL 服务器的一个特殊变体已包含在服务器 RPM 包中。它执行调试和内存分配检查，并在服务器运行时生成跟踪文件。要使用该调试版本，请使用 `/usr/sbin/mysqld-debug` 启动 MySQL，而不是将其作为服务或 `/usr/sbin/mysqld` 启动。有关可以使用的调试选项，参阅[章节 5.9.4，“DBUG 包”](/5/5.9/5.9.4/dbug-package.html)。

::: tip 注意
在 MySQL 8.0.4 中，调试构建的默认插件目录从 `/usr/lib64/mysql/plugin` 更改为 `/usr/lib64/mysql/plugin/debug`。之前，需要将 [plugin_dir](/5/5.1/5.1.8/server-system-variables.html) 更改为 `/usr/lib64/mysql/plugin/debug` 以进行调试构建。
:::

**从源 SRPM 重建 RPM**。MySQL 的源代码 SRPM 包可供下载。它们可以按原样使用标准 **rpmbuild** 工具链重建 MySQL RPM。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/linux-installation-rpm.html)
