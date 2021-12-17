# 2.2 使用通用二进制文件在 Unix/Linux 上安装 MySQL

Oracle 提供了一组 MySQL 的二进制发行版。其中包括针对许多平台的压缩 **tar** 文件（扩展名为 `.tar.xz` 的文件）形式的通用二进制发行版，以及针对选定平台的特定于平台的包格式的二进制发行版。

本章节介绍在 Unix/Linux 平台上从压缩的 **tar** 文件二进制发行版安装 MySQL。有关侧重于 MySQL 安全功能的 Linux 通用二进制发行版安装说明，请参阅[安全部署指南](https://dev.mysql.com/doc/mysql-secure-deployment-guide/8.0/en/)。有关其他特定于平台的二进制软件包格式，请参阅本手册中其他特定于平台的章节。例如，对于 Windows 发行版，参阅[章节 2.3，“在 Microsoft Windows 上安装 MySQL”](/2/2.3/windows-installation)。如何以不同的分发格式获取MySQL，参阅[章节 2.1.3，“如何获取 MySQL”](/2/2.1/2.1.3/getting-mysql)。

MySQL 压缩 **tar** 文件二进制发行版的名称为 `mysql-VERSION-OS.tar.xz`，其中 **VERSION** 是一个数字（例如，`8.0.27`），**OS** 表示发行版所针对的操作系统类型（例如，`pc-linux-i686` 或 `winx64`）。

Linux 通用二进制发行版还提供了 MySQL 压缩 **tar** 文件的“最小安装”版本，其名称为 `mysql-VERSION-OS-GLIBCVER-ARCH-minimal.tar.xz`。最小安装发行版不包括调试二进制文件，并且去掉了调试符号，使其比常规二进制发行版小得多。如果你选择安装最小安装发行版，请记住根据以下说明中的文件名格式差异进行调整。

!> **警告**

---

- 如果以前使用操作系统本机软件包管理系统，如 Yum 或 APT，安装过 MySQL，则使用本机二进制文件安装时可能会遇到问题。确保你以前的 MySQL 安装已完全删除（使用你的包管理系统），并且任何其他文件（如数据文件的旧版本）也已删除。你还应该检查配置文件，如 `/etc/my.cnf` 或 `/etc/mysql` 目录，并将其删除。

有关使用官方 MySQL 软件包替换第三方软件包的信息，参阅相关的 [APT 指南](https://dev.mysql.com/doc/mysql-apt-repo-quick-guide/en/) 或 [Yum 指南](https://dev.mysql.com/doc/refman/5.7/en/replace-third-party-yum.html)。

MySQL 依赖于 libaio 库。如果未在本地安装此库，则数据目录初始化和后续服务器启动步骤将失败。如有必要，请使用适当的软件包管理器进行安装。例如，在基于 Yum 的系统上：

```bash
$> yum search libaio  # search for info
$> yum install libaio # install library
```

或者，在基于 Yum 的系统上：

```bash
$> apt-cache search libaio # search for info
$> apt-get install libaio1 # install library
```

- **Oracle Linux 8/Red Hat 8（EL8）**：默认情况下，这些平台不安装文件 `/lib64/libtinfo.so.5`，这是 MySQL 客户端 `bin/MySQL` 对于包 `mysql-VERSION-el7-x86_64.tar.gz` 和 `mysql-VERSION-linux-glibc2.12-x86_64.tar.xz` 所必需的。要解决此问题，请安装 `ncurses-compat-libs` 包：

```bash
$> yum install ncurses-compat-libs
```

---

要安装压缩的 **tar** 文件二进制发行版，请在你选择的安装位置（通常为 `/usr/local/mysql`）将其解压缩。这将创建下表所示的目录。

**表2.3 通用 Unix/Linux二进制软件包的 MySQL 安装布局**

|目录|目录内容|
|--|--|
|bin|[**mysqld**](/4/4.3/4.3.1/mysqld) 服务器、客户端和实用工具程序|
|docs|信息格式的MySQL手册|
|man|Unix 手册页|
|include|引用文件（头文件）|
|lib|库|
|share|数据库安装的错误消息、字典和 SQL|
|support-files|杂项支持文件|

[**mysqld**](/4/4.3/4.3.1/mysqld) 二进制文件的调试版本以 [**mysqld-debug**](/4/4.3/4.3.1/mysqld) 提供。要从源发行版编译自己的 MySQL 调试版本，请使用适当的配置选项启用调试支持。参阅[章节 2.9，“从源代码安装 MySQL”](/2/2.9/source-installation)。

要安装和使用 MySQL 二进制发行版，命令序列如下所示：

```bash
$> groupadd mysql
$> useradd -r -g mysql -s /bin/false mysql
$> cd /usr/local
$> tar xvf /path/to/mysql-VERSION-OS.tar.xz
$> ln -s full-path-to-mysql-VERSION-OS mysql
$> cd mysql
$> mkdir mysql-files
$> chown mysql:mysql mysql-files
$> chmod 750 mysql-files
$> bin/mysqld --initialize --user=mysql
$> bin/mysql_ssl_rsa_setup
$> bin/mysqld_safe --user=mysql &
# Next command is optional
$> cp support-files/mysql.server /etc/init.d/mysql.server
```

?> **注意**  此过程假定你具有系统的 `root`（administrator）访问权限。或者，可以使用 **sudo**（Linux）或 **pfexec**（Solaris）命令为每个命令添加前缀。

`mysql-files` 目录提供了一个方便的位置，可以用作 `secure_file_priv` 系统变量的值，该变量将导入和导出操作限制到特定目录。参阅[章节 5.1.8，“服务器系统变量”](/5/5.1/5.1.8/server-system-variables)。

下面是关于安装二进制发行版的上述说明的更详细版本。

## 创建 mysql 用户和组

如果你的系统还没有用于运行 [**mysqld**](/4/4.3/4.3.1/mysqld) 的用户和组，你可能需要创建它们。以下命令添加 mysql 组和 mysql 用户。你可能希望调用该用户并对其他内容进行分组，而不是 `mysql`。如果是，请在以下说明中替换相应的名称。**useradd** 和 **groupadd** 的语法在不同版本的 Unix/Linux 上可能略有不同，或者它们可能有不同的名称，例如 **adduser** 和 **addgroup**。

```bash
$> groupadd mysql
$> useradd -r -g mysql -s /bin/false mysql
```

?> **注意** 由于仅出于所有权目的而非登录目的才需要该用户，因此 **useradd** 命令使用 `-r` 和 `-s/bin/false` 选项来创建对服务器主机没有登录权限的用户。如果 **useradd** 不支持这些选项，请忽略这些选项。

## 获取并打开分发包

选择要解压缩分发版的目录，并将位置更改为该目录。这里的示例在 `/usr/local` 下解压发行版。因此，这些说明假定你有权在 `/usr/local` 中创建文件和目录。如果该目录受保护，则必须以 `root` 用户身份执行安装。

```bash
$> cd /usr/local
```

按照[章节 2.1.3，“如何获取MySQL”](/2/2.1/2.1.3/getting-mysql) 中的说明获取分发文件。对于给定的发行版，所有平台的二进制发行版都是从相同的 MySQL 源发行版构建的。

解压缩发行版，它将创建安装目录。如果 `.tar` 支持 `z` 选项，它可以解压缩和解压分发版：

```bash
$> tar xvf /path/to/mysql-VERSION-OS.tar.xz
```

 **tar** 命令创建名为 `mysql-VERSION-OS` 的目录。

 要从压缩的 **tar** 文件二进制发行版安装MySQL，您的系统必须具有 GNU `XZ Utils` 来解压缩发行版，以及适合的 **tar** 来解压缩发行版。

 ?> **注意** 在 MySQL Server 8.0.12 中，压缩算法从 Gzip 更改为 XZ；通用二进制文件的文件扩展名从 .tar.gz 变更为 .tar.xz。

 GNU tar 是已知可用。一些操作系统提供的标准 **tar** 无法解压缩 MySQL 发行版中的长文件名。您应该下载并安装 GNU **tar**，或者如果可用，使用预安装的 GNU tar 版本。通常，这可以作为 **gnutar**、**gtar** 或者从 GNU 中或从 自由软件目录（如/usr/sfw/bin或/usr/local/bin）中获得的 **tar**。GNU **tar** 可从以下网址获得：http://www.gnu.org/software/tar/ 。

 如果您的 **tar** 不支持 `xz` 格式，则使用 **xz** 命令解包发行版，使用 **tar** 解包发行版。用以下替代命令替换前面的 **tar** 命令以解压缩和提取分发：

 ```bash
 $> xz -dc /path/to/mysql-VERSION-OS.tar.xz | tar x
 ```

 然后，创建指向 **tar** 创建的安装目录的符号链接：

```bash
$> ln -s full-path-to-mysql-VERSION-OS mysql
```

`ln` 命令生成指向安装目录的符号链接。这使您能够更容易地将其称为 `/usr/local/mysql`。为了避免在使用 MySQL 时必须始终键入客户端程序的路径名，可以将 `/usr/local/MySQL/bin` 目录添加到 `PATH` 变量中：

```bash
$> export PATH=$PATH:/usr/local/mysql/bin
```

## 执行安装后设置

安装过程的其余部分包括设置分发所有权和访问权限、初始化数据目录、启动 MySQL 服务器以及设置配置文件。有关说明，参阅[章节2.10，“安装后设置和测试”](/2/2.10/postinstallation)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/binary-installation.html)
