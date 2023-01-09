# 2.11.12 升级故障排除

- MySQL 5.7 实例中表的 `.frm` 文件和 `InnoDB` 数据字典之间的模式不匹配可能导致 MySQL 8.0 升级失败。此类不匹配可能是由于 `.frm` 文件损坏。要解决此问题，请在再次尝试升级之前转储并恢复受影响的表。
- 如果出现问题，例如新的 [mysqld](/4/4.3/4.3.1/mysqld.html) 服务器无法启动，请验证你没有以前安装的旧 `my.cnf` 文件。你可以使用 [--print-defaults](/4/4.2/4.2.2.3/option-file-options.html) 选项（例如，[mysqld --print-defaults](/4/4.3/4.3.1/mysqld.html)）进行检查。如果此命令显示的不是程序名，则你有一个影响服务器或客户端操作的激活的 `my.cnf` 文件。
- 如果在升级后，你遇到编译客户端程序的问题，例如命令不同步或意外的核心转储，那么你可能在编译程序时使用了旧的头文件或库文件。在本例中，检查 `mysql.h` 文件和 `libmysqlclient.a` 库的日期，以验证它们是否来自新的mysql发行版。如果没有，请使用新的头和库重新编译程序。如果库的主要版本号已更改（例如，从 `libmysqlclient.so.20` 更改为 `libmysqlclient.so.21` ），则针对共享客户端库编译的程序也可能需要重新编译。
- 如果你创建了一个具有给定名称的可加载函数，并将 MySQL 升级到实现同名新内置函数的版本，则可加载函数将无法访问。要更正此问题，请使用 [DROP FUNCTION](/13/13.1/13.1.26/drop-function.html) 删除可加载函数，然后使用 [CREATE FUNCTION](/13/13.1/13.1.14/create-function.html) 使用不同的非冲突名称重新创建可加载函数。如果新版本的 MySQL 实现了与现有存储函数同名的内置函数，则情况也是如此。有关描述服务器如何解释对不同类型函数的引用的规则，参阅[章节 9.2.5，“函数名称解析和解析”](/9/9.2/9.2.5/function-resolution.html)。
- 如果由于[章节 2.11.5，“为升级做好安装准备”](/2/2.11/2.11.5/upgrade-prerequisites.html)中概述的任何问题导致升级到 MySQL 8.0 失败，服务器会将所有更改还原到数据目录。在这种情况下，删除所有重做日志文件，并在现有数据目录上重新启动 MySQL 5.7 服务器以解决错误。默认情况下，重做日志文件（`ib_logfile*`）位于 MySQL 数据目录中。修复错误后，在再次尝试升级之前，执行缓慢关闭（通过设置 [innodb_fast_shutdown=0](/15/15.14/innodb-parameters.html)）。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/upgrade-troubleshooting.html)
