# 2.7 在 Solaris 上安装 MySQL

- [2.7.1 使用 Solaris PKG 在 Solaris 上安装 MySQL](/2/2.7/2.7.1/solaris-installation-pkg.html)

::: tip 注意
MySQL 8.0 支持 Solaris 11.4 及更高版本
:::

Solaris 上的 MySQL 有多种不同的格式。

- 有关使用本机 Solaris PKG 格式安装的信息，参阅[章节 2.7.1，“使用 Solaris PKG 在 Solaris上 安装 MySQL”](/2/2.7/2.7.1/solaris-installation-pkg.html)。

- 要使用标准 `tar` 二进制安装，请使用[章节 2.2，“使用通用二进制文件在 Unix/Linux 上安装 MySQL”](/2/2.2/binary-installation.html)中提供的说明。请查看本节末尾的注释和提示，了解安装前后可能需要的 Solaris 特别说明。

::: tip 注意
MySQL 5.7 依赖于 Oracle Developer Studio 运行库；但这不适用于 MySQL 8.0。
:::

为了获得 tarball 或 PKG 格式的 Solaris 二进制 MySQL 发行版，[https://dev.mysql.com/downloads/mysql/8.0.html](https://dev.mysql.com/downloads/mysql/8.0.html)。

在 Solaris 上安装和使用 MySQL 时需要注意的其他注意事项：

- 如果要将 MySQL 与 MySQL 用户和组一起使用，请使用 **groupadd** 和 **useradd** 命令：

```bash
groupadd mysql
useradd -g mysql -s /bin/false mysql
```

- 如果在 Solaris 上使用二进制 tarball 发行版安装 MySQL，因为 Solaris tar 无法处理长文件名，请使用 GNU **tar**（**gtar**）解压缩发行版。如果你的系统上没有 GNU **tar**，请使用以下命令进行安装：

```bash
pkg install archiver/gnu-tar
```

- 你应该使用 `forcedirectio` 选项挂载任何要在其上存储 `InnoDB` 文件的文件系统。（默认情况下，在没有此选项的情况下进行装载。）如果不这样做，在该平台上使用 `InnoDB` 存储引擎时会导致性能显著下降。

- 如果你希望 MySQL 自动启动，可以复制支持 `support-files/mysql.server` 到 `/etc/init.d` 并创建一个名为 `/etc/rc3.d/S99mysql.server` 的符号链接。

- 如果有太多进程试图快速连接到 [mysqld](/4/4.3/4.3.1/mysqld)，你应该会在 MySQL 日志中看到以下错误：

```bash
Error in accept: Protocol error
```

你可以尝试使用 [--back_log=50](/5/5.1/5.1.8/server-system-variables.html) 选项启动服务器，作为解决方法。

- 要在 Solaris 上配置核心文件的生成，应使用 **coreadm** 命令。由于在 `setuid()` 应用程序上生成核心的安全含义，默认情况下，Solaris 不支持 `setuid()` 程序上的核心文件。但是，你可以使用 **coreadm** 修改此行为。如果为当前用户启用 `setuid()` 核心文件，它们将使用模式 600 生成，并由超级用户拥有。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/solaris-installation.html)
