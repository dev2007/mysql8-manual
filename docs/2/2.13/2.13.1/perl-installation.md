# 2.13.1 在 Unix 上安装 Perl

MySQL Perl 支持要求你已安装 MySQL 客户端编程支持（库和头文件）。大多数安装方法都会安装必要的文件。如果你在 Linux 上从 RPM 文件安装 MySQL，请确保同时安装开发人员 RPM。客户端程序在客户端 RPM 中，但客户端编程支持在开发人员 RPM 中。

Perl 支持所需的文件可以从 CPAN（综合 Perl 存档网络）获取，网址为 [http://search.cpan.org](http://search.cpan.org).

在 Unix 上安装 Perl 模块的最简单方法是使用 CPAN 模块。例如：

```bash
$> perl -MCPAN -e shell
cpan> install DBI
cpan> install DBD::mysql
```

`DBD::mysql` 安装运行许多测试。这些测试尝试使用默认用户名和密码连接到本地 MySQL 服务器。（默认用户名是 Unix 上的登录名，Windows 上的 ODBC。默认密码是“无密码”。）如果无法使用这些值连接到服务器（例如，如果你的帐户有密码），则测试失败。你可以使用强制安装 `DBD::mysql` 来忽略失败的测试。

DBI 需要 `Data::Dumper` 模块。可安装；如果没有，你应该在安装 DBI 之前安装它。

还可以下载压缩 **tar** 归档文件形式的模块发行版，并手动构建模块。例如，要解压缩并构建 DBI 分发，请使用以下流程：

1. 将分发解压缩到当前目录：

```bash
$> gunzip < DBI-VERSION.tar.gz | tar xvf -
```

此命令创建一个名为 `DBI-VERSION` 的目录。

2. 将位置更改为解压缩分发的顶级目录：

```bash
$> cd DBI-VERSION
```

3. 构建发行版并编译所有内容：

```bash
$> perl Makefile.PL
$> make
$> make test
$> make install
```

**make test** 命令很重要，因为它验证模块是否正常工作。注意，当你在 `DBD::mysql` 安装过程中运行该命令以执行接口代码时，MySQL 服务器必须正在运行，否则测试失败。

每当你安装新版本的 MySQL 时，重建并重新安装 `DBD::mysql` 发行版是一个好主意。这可确保正确安装最新版本的MySQL客户端库。

如果你没有在系统目录中安装 Perl 模块的访问权限，或者你想安装本地 Perl 模块，以下参考可能很有用：[http://learn.perl.org/faq/perlfaq8.html#How-do-I-keep-my-own-module-library-directory-](http://learn.perl.org/faq/perlfaq8.html#How-do-I-keep-my-own-module-library-directory-)

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/perl-installation.html)
