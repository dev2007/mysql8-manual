# 2.7.1 使用 Solaris PKG 在 Solaris 上安装 MySQL

你可以使用本机 Solaris PKG 格式的二进制包而不是二进制 tarball 发行版在 Solaris 上安装 MySQL。

:::tip 注意
MySQL 5.7 依赖于 Oracle Developer Studio 运行库；但这不适用于 MySQL 8.0。
:::

要使用此软件包，请下载相应的 `mysql-VERSION-solaris11-PLATFORM.pkg.gz` 文件，然后解压缩。例如：

```bash
$> gunzip mysql-8.0.31-solaris11-x86_64.pkg.gz
```

要安装新软件包，请使用 **pkgadd** 并按照屏幕提示进行操作。你必须具有 root 权限才能执行此操作：

```bash
$> pkgadd -d mysql-8.0.31-solaris11-x86_64.pkg

The following packages are available:
  1  mysql     MySQL Community Server (GPL)
               (i86pc) 8.0.31

Select package(s) you wish to process (or 'all' to process
all packages). (default: all) [?,??,q]:
```

PKG安装程序安装所需的所有文件和工具，如果不存在，则初始化数据库。要完成安装，你应该按照安装结束时的说明设置 MySQL 的 root 密码。或者，你可以运行安装附带的 [mysql_secure_installation](/4/4.4/4.4.2/mysql-secure-installation.html) 脚本。

默认情况下，PKG 包将 MySQL 安装在根路径 `/opt/mysql` 下。当使用 **pkgadd** 时，你只能更改安装根路径，该路径可用于在不同的 Solaris 区域中安装 MySQL。如果需要在特定目录中安装，请使用二进制 **tar** 文件分发。

`pkg` 安装程序将适用于 MySQL 的启动脚本复制到 `/etc/init.d/mysql` 中。要使 MySQL 能够自动启动和关闭，你应该在该文件和初始化脚本目录之间创建一个链接。例如，为了确保 MySQL 的安全启动和关闭，可以使用以下命令添加正确的链接：

```bash
$> ln /etc/init.d/mysql /etc/rc3.d/S91mysql
$> ln /etc/init.d/mysql /etc/rc0.d/K02mysql
```

要删除 MySQL，安装的包名为 `mysql`。你可以将此命令与 **pkgrm** 命令结合使用以删除安装。

要在使用 Solaris 软件包文件格式时进行升级，必须在安装更新的软件包之前删除现有安装。删除包不会删除现有数据库信息，只会删除服务器、二进制文件和支持文件。因此，典型的升级顺序是：

```bash
$> mysqladmin shutdown
$> pkgrm mysql
$> pkgadd -d mysql-8.0.31-solaris11-x86_64.pkg
$> mysqld_safe &
$> mysql_upgrade   # prior to MySQL 8.0.16 only
```

在执行任何升级之前，你应该检查[章节 2.11，“升级 MySQL”](/2/2.11/upgrading.html)中的注释。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/solaris-installation-pkg.html)
