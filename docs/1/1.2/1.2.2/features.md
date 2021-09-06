# 1.2.2 MySQL 主要特性

本节介绍 MySQL 数据库软件的一些重要特性。在大多数方面，这个路线图适用于 MySQL 的所有版本。在特定系列 MySQL 中引入的的特性信息，请参阅相应手册的“简而言之”部分：

- MySQL 8.0: [章节 1.3,“MySQL 8.0 新增功能”](/1/1.3/mysql-nutshell)

- MySQL 5.7: [MySQL 5.7 新增特性](https://dev.mysql.com/doc/refman/5.7/en/mysql-nutshell.html)

- MySQL 5.6: [MySQL 5.6 新增特性](https://dev.mysql.com/doc/refman/5.6/en/mysql-nutshell.html)

## 内部结构和可移植性

- 用 C 和 C++ 编写。
- 经过广泛的不同编译器测试。
- 在许多不同的平台上工作。参阅 https://www.mysql.com/support/supportedplatforms/database.html
- 为了便于移植，使用 CMake 进行配置。
- 用 Purify（一种商用内存泄漏检测器）以及 GPL 工具 Valgrind 进行测试(http://developer.kde.org/~sewardj/ )
- 采用具有独立模块的多层服务器设计。
- 设计成使用内核线程的完全多线程的，如果有多个 CPU 可用的话，可以很容易地使用它们。
- 提供事务性和非事务性存储引擎。
- 使用非常快速的B树磁盘表（MyISAM）和索引压缩。
- 设计上使得添加其他存储引擎相对容易。如果你想为内部数据库提供 SQL 接口，这将非常有用。
- 使用非常快速的基于线程的内存分配系统。
- 使用优化的嵌套循环联接执行非常快速的联接。
- 实现内存中的哈希表，用作临时表。
- 使用高度优化的类库实现 SQL 函数，该类库应尽可能快。通常在查询初始化之后根本没有内存分配。
- 将服务器作为单独的程序提供，以便在客户端/服务器网络环境中使用，并作为可以嵌入（链接）到独立应用程序中的库提供。此类应用程序可以在独立环境中使用，也可以在无网环境中使用。

## 数据类型

- 许多数据类型：有符号/无符号整数 1、2、3、4 和 8 字节长、[FLOAT](/11/11.1/11.1.4/floating-point-types)、[DOUBLE]((/1/1.11/1.11.4/floating-point-types))、[CHAR](/11/11.3/11.3.2/char)、[VARCHAR]((/11/11.3/11.3.2/char))、[BINARY](/11/11.3/11.3.3/binary-varbinary)、[VARBINARY](/11/11.3/11.3.3/binary-varbinary)、[TEXT](/11/11.3/11.3.4/blob)、[BLOB](/11/11.3/11.3.4/blob)、[DATE](/11/11.2/11.2.2/datetime)、[TIME](/11/11.2/11.2.3/time)、[DATETIME](/11/11.2/11.2.2/datetime)、[TIMESTAMP](/11/11.2/11.2.2/datetime)、[YEAR](/11/11.2/11.2.4/year)、[SET](/11/11.3/11.3.6/set)、[ENUM](/11/11.3/11.3.5/enum) 和 OpenGIS 空间类型。参阅[章节 11，数据类型](/11/data-types)。

- 固定长度和可变长度字符串类型。

## 语句和函数

- 在查询的 [`SELECT`](/13/13.2/13.2.10/select) 列表和 `WHERE` 子句中提供完整的运算符和函数支持。例如：

```bash
mysql> SELECT CONCAT(first_name, ' ', last_name)
    -> FROM citizen
    -> WHERE income/dependents > 10000 AND age > 30;
```

- 完全支持SQL `GROUP BY` 和 `ORDER BY` 子句。支持组函数（[COUNT()](/12/12.20/12.20.1/aggregate-functions)、[AVG()](/12/12.20/12.20.1/aggregate-functions)、[STD()](/12/12.20/12.20.1/aggregate-functions)、[SUM()](/12/12.20/12.20.1/aggregate-functions)、[MAX()](/12/12.20/12.20.1/aggregate-functions)、[MIN()](/12/12.20/12.20.1/aggregate-functions) 和 [GROUP_CONCAT()](/12/12.20/12.20.1/aggregate-functions)）。

- 支持标准 SQL 和 ODBC 语法的 `LEFT OUTER JOIN` 和 `RIGHT OUTER JOIN`。

- 支持标准SQL所要求的表和列的别名。

- 支持 [`DELETE`](/13/13.2/13.2.2/delete)、[`INSERT`](/13/13.2/13.2.6/insert)、[`REPLACE`](/13/13.2/13.2.9/replace) 和 [`UPDATE`](/13/13.2/13.2.13/update) 以返回更改（受影响）的行数，或者在连接到服务器时通过设置标志返回匹配的行数。

- 支持特定于 MySQL 的 [`SHOW`](/13/13.7/13.7.7/show) 语句，这些语句检索有关数据库、存储引擎、表和索引的信息。根据标准 SQL 实现，支持 `INFORMATION_SCHEMA` 数据库。

- [`EXPLAIN`](/13/13.8/13.8.2/explain) 语句，用于显示优化器如何解析查询。

- 函数名与表名或列名的独立性。例如，ABS 是一个有效的列名。唯一的限制是，对于函数调用，函数名和其后的“(”之间不允许有空格。参阅[章节9.3 “关键字和保留字”](/9/9.3/keywords)。

- 可以在同一语句中引用不同数据库中的表。

## 安全性

- 一种非常灵活和安全的特权和密码系统，它允许基于主机的验证。

- 通过加密连接到服务器时所有密码流量来实现密码安全。

## 可扩展性和限制

- 支持大型数据库。我们使用 MySQL Server 和包含 5,000 万条记录的数据库。我们还知道一些用户使用 MySQL Server，拥有 200,000 个表和大约 5,000,000,000 行。

- 每个表最多支持 64 个索引。每个索引可以由 1 到 16 列或部分列组成。[InnoDB](/15/innodb-storage-engine) 表的最大索引宽度为 767 字节或 3,072 字节。参阅[章节 15.22，“InnoDB限制”](/15/15.22/innodb-limits)。[MyISAM](/16/16.2/myisam-storage-engine) 表的最大索引宽度是 1,000 字节。参阅[章节 16.2，“MyISAM存储引擎”](/16/16.2/myisam-storage-engine)。索引可以使用 [CHAR](/11/11.3/11.3.2/char)、[VARCHAR](/11/11.3/11.3.2/char)、[BLOB](/11/11.3/11.3.4/blob) 或 [TEXT](/11/11.3/11.3.4/blob) 列类型的列前缀。

## 可连接性

- 客户端可以使用几种协议连接到 MySQL Server：
  - 客户端可以在任何平台上使用 TCP/IP 套接字进行连接。
  - 在 Windows 系统上，如果服务器启动时启用了 [name_pipe](/5/5.1/5.1.8/server-system-variables) 系统变量，则客户端可以使用命名管道进行连接。如果在启用 [shared_memory](/5/5.1/5.1.8/server-system-variable) 系统变量的情况下启动，Windows 服务器还支持共享内存连接。客户端可以使用 [--protocol=memory](/4/4.2/4.2.3/connection-options) 选项通过共享内存进行连接。
  - 在 Unix 系统上，客户端可以使用 Unix 域套接字文件进行连接。
- MySQL 客户端程序可以用多种语言编写。C 中编写的客户端库可用于 C 或 C++ 编写的客户端，或支持 C 绑定的任何语言。
- C、C++、Eiffel、java、perl、php、python、Ruby 和 TCL 都有 API，这使得 MySQL 客户端可以用多种语言编写。参阅[章节 29，连接器和 API](/29/connectors-apis)。
- Connector/ODBC（MyODBC）接口为使用 ODBC（Open Database Connectivity/开放数据库连接）连接的客户机程序提供 MySQL 支持。例如，可以使用 MS-Access 连接到 MySQL 服务器。客户端可以在 Windows 或 Unix 上运行。Connector/ODBC 源可用。所有 ODBC 2.5 函数都受支持，其他许多函数也受支持。参阅 [MySQL Connector/ODBC 开发人员指南](https://dev.mysql.com/doc/connector-odbc/en/)。
- Connector/J 接口为使用 JDBC 连接的 Java 客户端程序提供 MySQL 支持。客户端可以在 Windows 或 Unix 上运行。Connector/J 源可用。参阅 [MySQL Connector/J 5.1开发人员指南](https://dev.mysql.com/doc/connector-j/5.1/en/)。
- MySQL Connector/NET 使开发人员能够轻松创建需要与 MySQL 安全、高性能数据连接的 .NET 应用程序。它实现了所需的 ADO.NET 接口，并集成到支持 ADO.NET 的工具中。开发人员可以使用自己选择的 .NET 语言构建应用程序。MySQL Connector/NET 是一个完全托管的 ADO.NET 驱动程序，用 100% 纯 C 语言编写。参阅 [MySQL Connector/NET 开发人员指南](https://dev.mysql.com/doc/connector-net/en/)。

## 本地化

- 服务器可以用多种语言向客户端提供错误消息。参阅[章节 10.12，“设置错误消息语言”](/10/10.12/error-message-language)。
- 完全支持多种不同的字符集，包括 `latin1`（cp1252）、`german`、`big5`、`ujis`、多种 Unicode 字符集等。例如，斯堪的纳维亚字符”å”, “ä” “和”ö” 允许在表名和列名中使用。
- 所有数据都保存在选定的字符集中。
- 排序和比较是根据默认字符集和排序规则进行的。可以在 MySQL 服务器启动时更改此设置（参阅[章节10.3.2，“服务器字符集和排序规则”](/10/10.3/10.3.2/charset-server)。要查看非常高级的排序示例，请查看 Czech 排序代码。MySQL 服务器支持许多不同的字符集，这些字符集可以在编译时和运行时指定。
- 服务器时区可以动态更改，各个客户端可以指定自己的时区。参阅[章节 5.1.15，“MySQL服务器时区支持”](/5/5.1/5.1.15/time-zone-support)。

## 客户端和工具

- MySQL 包括几个客户端和实用程序。其中包括 [`mysqldump`](/4/4.5/4.5.4/mysqldump) 和 [`mysqladmin`](/4/4.5/4.5.2/mysqladmin) 等命令行程序，以及 [MySQL Workbench](/31/workbench) 等图形化程序。
- MySQL Server 内置了对 SQL 语句的支持，可以检查、优化和修复表。这些语句可以从命令行通过 [`mysqlcheck`](/4/4.5/4.5.3/mysqlcheck) 客户端获得。MySQL 还包括 [`myisamchk`](4/4.6x/4.6.4/myisamchk)，这是一个非常快速的命令行实用程序，用于在 `MyISAM` 表上执行这些操作。参阅[章节4，MySQL 程序](4/programs)。
- MySQL 程序可以通过选项 `--help` 或 `-?` 获取在线帮助的选项。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/features.html)
