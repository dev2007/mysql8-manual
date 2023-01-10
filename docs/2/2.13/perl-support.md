# 2.13 Perl 安装说明

- [2.13.1 在 Unix 上安装 Perl](/2/2.13/2.13.1/perl-installation.html)
- [2.13.2 在 Windows 上安装 ActiveState Perl](/2/2.13/2.13.2/activestate-perl.html)
- [2.13.3 使用 Perl DBI/DBD 接口的问题](/2/2.13/2.13.3/perl-support-problems.html)

Perl `DBI` 模块为数据库访问提供了通用接口。你可以编写一个 `DBI` 脚本，无需更改即可与许多不同的数据库引擎一起使用。要使用 `DBI`，必须为要访问的每种类型的数据库服务器安装 `DBI` 模块以及数据库驱动程序（DBD）模块。对于MySQL，这个驱动程序是 `DBD::mysql` 模块。

:::tip 注意
MySQL 分发不包含 Perl 支持。你可以从获取必要的模块 [http://search.cpan.org](http://search.cpan.org) 用于 Unix，或使用 Windows 上的 ActiveState **ppm** 程序。以下部分描述了如何做到这一点。
:::

`DBI/DBD` 接口需要 Perl 5.6.0，5.6.1 或更高版本为首选。如果你有旧版本的 Perl，DBI 将*无法工作*。你应该使用 `DBD::mysql` 4.009 或更高版本。虽然早期版本可用，但它们不支持 MySQL 8.0 的全部功能。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/perl-support.html)
