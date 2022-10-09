# 1.1 关于本手册

这是 MySQL 数据库系统 8.0 版到 8.0.25 版的参考手册。MySQL 8.0 小版本之间的差异在本文中通过的发布版本号（8.0.x）提及。许可信息，参阅[法律条款](/mysql.html#法律条款)。

由于 MySQL 8.0 与以前版本在功能和其他方面存在许多差异，因此本手册不适用于较旧版本的 MySQL 软件。如果你使用的是MySQL软件的早期版本，请参阅相应的手册。例如，[MySQL 5.7 参考手册](https://dev.mysql.com/doc/refman/5.7/en/)涵盖了 MySQL 5.7 系列软件版本。

由于本手册只是作为参考，所以不提供有关 SQL 或关系数据库概念的通用指南。它也不会教你如何使用操作系统或命令行解释器。

MySQL数据库软件持续开发，参考手册也频繁更新。该手册的最新版本可在 [https://dev.mysql.com/doc/](https://dev.mysql.com/doc/) 在线搜索。也提供其他格式，包括可下载的 HTML 和 PDF 版本。

MySQL 本身的源代码包含使用 Doxygen 编写的内部文档。生成的 Doxygen 内容在 [https://dev.mysql.com/doc/index-other.html](https://dev.mysql.com/doc/index-other.html) 。也可以在本地参考指南[章节 2.9.10 “生成 MySQL Doxygen 文档内容”](/2/2.9/2.9.10/source-installation-doxygen)使用 MySQL 源发行版生成。

如果你对使用 MySQL 有疑问，可以加入 [MySQL Community Slack](https://mysqlcommunity.slack.com/)，或者在我们的论坛上提问，还可以[在 MySQL 论坛上查看 MySQL 社区支持](https://dev.mysql.com/doc/refman/8.0/en/information-sources.html#forums)。如果你对手册本身的添加或更正有任何建议，请发送至 http://www.mysql.com/company/contact/ 。

## 排版和语法约定

本手册使用某些排版约定：

- 此风格文本，用于 SQL 语句、数据库、表和列名、程序清单和源代码以及环境变量。示例：“要重新加载 grant 表，请使用 FLUSH PRIVILEGES 语句。

- 此风格文本，表示你在示例中的输入。

- **此风格文本**，表示指示可执行程序和脚本的名称，例如 [mysql](/4/4.5/4.5.1/mysql.html)（mysql命令行客户端程序）和 [mysqld](/4/4.3/4.3.1/mysqld.html)（mysql server 可执行文件）。

- *此风格文本*，用于变量输入，你应该将其替换自己选择的值。

- *此风格文本*，用于强调。

- ***此风格文本***，用在表格标题中，用来表达特别强烈的强调。

- 此风格文本，用于指示影响程序执行方式的程序选项，或提供程序以某种方式运行所需的信息的程序选项。示例：“--host 选项（缩写 -h）告诉 [mysql](/4/4.5/4.5.1/mysql.html) 客户机程序它应该连接到的 mysql server 的主机名或 IP 地址”。

- 文件名和目录名是这样写的：“global my.cnf文件位于/etc目录中。”

- 字符序列是这样写的：“要指定通配符，请使用“%”字符。”

当显示要在特定程序中执行的命令时，命令前面显示的提示符指示要使用哪个命令。例如，`shell>`表示从登录 shell 执行的命令，`root shell>` 类似，但应作为 root 执行，`mysql>` 表示从 [mysql](/4/4.5/4.5.1/mysql.html) 客户端程序执行的语句：

```bash
shell> type a shell command here
root-shell> type a shell command as root here
mysql> type a mysql statement here
```

在某些领域，不同的系统可能会相互区别，以表明命令应该在两个不同的环境中执行。例如，在使用复制时，命令的前缀可能是 `source` 和 `replica`：

```bash
source> type a mysql command on the replication source here
replica> type a mysql command on the replica here
```

“shell” 是你的命令解释器。在 Unix 上，这通常是一个程序，如 **sh**、**csh** 或 **bash**。在 Windows 上，等同的程序是 **command.com** 或 **cmd.exe**，通常在控制台窗口中运行。

输入示例中所示的命令或语句时，不要键入示例中所示的提示。

数据库、表和列名通常必须替换为语句。为了表明这种替换是必要的，本手册使用 **db_name**、**tbl_name** 和 **col_name**。例如，你可能会看到如下语句：

```bash
mysql> SELECT col_name FROM db_name.tbl_name;
```

这意味着，如果要输入类似的语句，则需要提供自己的数据库、表和列名，可能如下所示：

```bash
mysql> SELECT author_name FROM biblio_db.author_list;
```

SQL 关键字不区分大小写，可以用任何大小写。本手册使用大写字母。

在语法描述中，方括号（“`[`” 和 “`]`”）表示可选的单词或子句。例如，在下面的语句中，`IF EXISTS` 是可选的：

```bash
DROP TABLE [IF EXISTS] tbl_name
```

当一个语法元素由多个备选项组成时，备选项之间用竖线（“`|`”）隔开。当可以从一组选项中选择一个成员时，备选方案列在方括号（“`[`” 和 “`]`”）中：

```bash
TRIM([[BOTH | LEADING | TRAILING] [remstr] FROM] str)
```

当必须从一组选项中选择一个成员时，替代项将在大括号（“`{`” 和 “`}`”）中列出：

```bash
{DESCRIBE | DESC} tbl_name [col_name | wild]
```

省略号（…）表示省略了语句的一部分，通常是为了提供更复杂语法的简短版本。例如，`SELECT ... INTO-OUTFILE` 是 `SELECT`语句形式的简写，它在语句的其他部分后面有一个 `INTO OUTFILE` 子句。

省略号也可以表示语句前面的语法元素可能重复。在下面的示例中，可以给出多个 `reset_option` 值，每个值在第一个值后面加逗号：

```bash
RESET reset_option [,reset_option] ...
```

用于设置 shell 变量的命令使用 Bourne shell 语法显示。例如，在 Bourne shell 语法中，设置 CC 环境变量并运行 `configure` 命令的顺序如下所示：

```bash
shell> CC=gcc ./configure
```

如果你使用的是 `csh` 或 `tcsh`，则必须以不同的方式发出命令：

```bash
shell> setenv CC gcc
shell> ./configure
```

## 手册作者

参考手册源文件是以 DocBook XML 格式编写。HTML 版本和其他格式是自动生成，主要使用 DocBook XSL 样式表。有关 DocBook 的信息，请参阅 [http://docbook.org/](http://docbook.org/)

本手册最初由 David Axmark 和 Michael “Monty” Widenius 编写。它由 MySQL 文档团队维护，该团队由 Chris Cole、Paul DuBois、Margaret Fisher、Edward Gilmore、Stefan Hinz、David Moss、Philip Olson、Daniel Price、Daniel So 和 Jon Stephens 组成。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/manual-info.html)
