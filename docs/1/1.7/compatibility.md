# 1.7 MySQL 标准遵从性

- [1.7.1 MySQL 对标准 SQL 的扩展](/1/1.7/1.7.1/extensions-to-ansi.html)
- [1.7.2 MySQL 与标准 SQL 的区别](/1/1.7/1.7.2/differences-from-ansi.html)
- [1.7.3 MySQL 如何处理约束](/1/1.7/1.7.3/constraints.html)

本章节介绍 MySQL 与 ANSI/ISO SQL 标准的关系。MySQL 服务器对 SQL 标准有许多扩展，在这里你可以了解它们是什么以及如何使用它们。你还可以找到有关 MySQL 服务器缺少的功能以及如何解决某些差异的信息。

SQL 标准自 1986 年以来一直在发展，已有多个版本。在本手册中，“SQL-92”指 1992 年发布的标准。“SQL:1999”、“SQL:2003”、“SQL:2008”和“SQL:2011”是指相应年份发布的标准版本，最后一个版本是最新版本。我们使用短语“SQL标准”或“标准SQL”来表示SQL标准在任何时候的当前版本。

我们使用该产品的主要目标之一是继续努力遵守SQL标准，但不牺牲速度和可靠性。如果这大大提高了 MySQL 服务器在大部分用户群中的可用性，我们就不怕添加 SQL 扩展或对非 SQL 特性的支持。[`HANDLER`](/13/13.2/13.2.4/handler.html) 接口就是这个策略的一个例子。参见[章节13.2.4，“HANDLER 语句”](/13/13.2/13.2.4/handler.html)。

我们继续支持事务性和非事务性数据库，以满足关键任务的全天候使用和大量 Web 或日志使用。

MySQL Server 最初设计用于小型计算机系统上的中型数据库（1千万——1亿行，或每个表大约 100MB）。今天，MySQL Server 处理 TB 级的数据库。

我们的目标不是实时支持，尽管 MySQL 复制功能提供了重要的功能。

MySQL 支持 ODBC 级别 0 到 3.51。

MySQL 支持使用 [`NDBCLUSTER`](/23/mysql-cluster.html) 存储引擎支持高可用性数据库群集。参阅[章节 23，MySQL NDB Cluster 8.0](/23/mysql-cluster.html)。

我们实现了支持大多数 W3CXPath 标准的 XML 功能。参阅[章节 12.12，“XML 函数”](/12/12.12/xml-functions.html)。

MySQL支持 RFC 7159 定义的、基于 ECMAScript 标准（ECMA-262）的本地 JSON 数据类型。参阅[章节 11.5，“JSON 数据类型”](/11/11.5/json.html)。MySQL 还实现了 SQL:2016 标准预发布草案中指定的 SQL/JSON 函数的子集；有关更多信息，参阅[章节 12.18，“JSON 函数”](/12/12.18/json-functions.html)。

## 选择 SQL 模式

MySQL Server 可以在不同的 SQL 模式下运行，并且可以根据 [`sql_mode`](/5/5.1/5.1.8/server-system-variables.html) 系统变量的值为不同的客户端应用不同的模式。DBA 可以将全局 SQL 模式设置为与站点服务器操作要求相匹配，并且每个应用程序都可以将其会话 SQL 模式按自己的要求设置。

模式会影响 MySQL 支持的 SQL 语法及其执行的数据验证检查。这使得在不同的环境中使用 MySQL 以及与其他数据库服务器一起使用 MySQL 变得更加容易。

有关设置 SQL 模式的更多信息，参阅[章节 5.1.11，“服务器 SQL 模式”](/5/5.1/5.1.11/sql-mode.html)。

## 以 ANSI 模式运行 MySQL

要在 ANSI 模式下运行 MySQL Server，请使用 [`--ansi`](/5/5.1/5.1.7/server-options.html) 选项启动 [**mysqld**](/4/4.3/4.3.1/mysqld.html)。在 ANSI 模式下运行服务器与使用以下选项启动服务器相同：

```bash
--transaction-isolation=SERIALIZABLE --sql-mode=ANSI
```

要在运行时达到相同的效果，请执行以下两条语句：

```bash
SET GLOBAL TRANSACTION ISOLATION LEVEL SERIALIZABLE;
SET GLOBAL sql_mode = 'ANSI';
```

你可以看到，将 [`sql_mode`](/5/5.1/5.1.8/server-system-variables.html) 系统变量设置为 '`ANSI`' 将启用与 ANSI 模式相关的所有 SQL 模式选项，如下所示：

```bash
mysql> SET GLOBAL sql_mode='ANSI';
mysql> SELECT @@GLOBAL.sql_mode;
        -> 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ANSI'
```

在 ANSI 模式下使用 [`--ansi`](/5/5.1/5.1.7/server-options.html) 运行服务器与将 SQL 模式设置为 '`ANSI`' 不同，因为 [`--ansi`](/5/5.1/5.1.7/server-options.html) 选项还设置事务隔离级别。

参阅[章节 5.1.7，“服务器命令选项”](/5/5.1/5.1.7/server-options.html)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/compatibility.html)
