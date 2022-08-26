# 2.5.4 使用 Oracle 的 RPM 包在 Linux 上安装 MySQL

在基于 RPM 的 Linux 发行版上安装 MySQL 的推荐方法是使用 Oracle 提供的 RPM 软件包。对于 MySQL 的社区版，有两个来源可以获得它们：

- 从 MySQL 软件仓库：
    - MySQL Yum 仓库（有关详细信息，参阅[章节 2.5.1，“使用 MySQL Yum 仓库在 Linux 上安装 MySQL”](/2/2.5/2.5.1/linux-installation-yum-repo)
）。
    - MySQL SLES 仓库（有关详细信息，参阅[章节 2.5.3，“使用 MySQL SLE 仓库在 Linux 上安装 MySQL”](/2/2.5/2.5.3/linux-installation-sles-repo)）。

- 从 [MySQL 开发区](https://dev.mysql.com/)的[下载 MySQL 社区服务器](https://dev.mysql.com/downloads/mysql/)页面。

?> **注意** MySQL 的 RPM 发行版也由其他供应商提供。请注意，它们在功能、功能和约定（包括通信设置）方面可能与 Oracle 构建的不同，本手册中的安装说明不一定适用于它们。应参考供应商的说明。

## MySQL RPM 包

**表 2.9 MySQL 社区版的 RPM 包**

|包名字|说明|
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



> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/linux-installation-rpm.html)
