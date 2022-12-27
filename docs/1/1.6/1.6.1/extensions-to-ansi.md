# 1.6.1 MySQL 对标准 SQL 的扩展

MySQL Server 支持一些在其他 SQL DBMS 中不太可能找到的扩展。请注意，如果你你用它们，你的代码很可能无法移植到其他 SQL Server。在某些情况下，你可以使用以下形式的注释编写包含 MySQL 扩展但仍可移植的代码：

```bash
/*! MySQL-specific code */
```

在这种情况下，MySQL Server 解析并执行注释中的代码，就像它解析和执行任何其他 SQL 语句一样，但是其他 SQL 服务器应该忽略扩展。例如，MySQL Server 在下面的语句中识别 `STRAIGHT_JOIN` 关键字，但其他服务器不应识别：

```bash
SELECT /*! STRAIGHT_JOIN */ col1 FROM table1,table2 WHERE ...
```

如果在之后添加版本号 `!` 字符，仅当 MySQL 版本大于或等于指定的版本号时才执行注释中的语法。以下注释中的 `KEY_BLOCK_SIZE` 子句仅由 MySQL 5.1.10 或更高版本的服务器执行：

```bash
CREATE TABLE t1(a INT, KEY (a)) /*!50110 KEY_BLOCK_SIZE=1024 */;
```

以下描述列出了按类别组织的 MySQL 扩展。

- 磁盘上数据的组织

  MySQL Server 将每个数据库映射到 MySQL 数据目录下的一个目录，并将数据库中的表映射到数据库目录中的文件名。因此，在具有区分大小写文件名的操作系统（如大多数 Unix 系统）上的 MySQL Server中，数据库和表名区分大小写。参阅[章节 9.2.3，“标识符区分大小写”](/9/9.2/9.2.3/identifier-case-sensitivity.html)。

- 通用语言语法

  - 默认情况下，字符串可以用 `"` 以及 `'` 括起来。如果启用了 [`ANSI_QUOTES`](/5/5.1/5.1.11/sql-mode.html) SQL模式，则字符串只能用 `'` 括起来，服务器将 `"` 括起来的字符串解释为标识符。

  - `\` 是字符串中的转义字符。

  - 在 SQL 语句中，可以使用 *db_name.tbl_name* 语法访问不同数据库中的表。某些 SQL Server 提供相同的功能，但称此为 `User space`。MySQL Server 不支持v如以下语句中使用的表空间：`CREATE TABLE ralph.my_table ... IN my_tablespace`。

- SQL 语句语法

  - [`ANALYZE TABLE`](/13/13.7/13.7.3/13.7.3.1/analyze-table.html), [`CHECK TABLE`](/13/13.7/13.7.3/13.7.3.2/check-table.html), [`OPTIMIZE TABLE`](/13/13.7/13.7.3/13.7.3.4/optimize-table.html) 和 [`REPAIR TABLE`](/13/13.7/13.7.3/13.7.3.5/repair-table.html) 语句。

  - [`CREATE DATABASE`](/13/13.1/13.1.12/create-database.html), [`DROP DATABASE`](/13/13.1/13.1.24/drop-database.html) 和 [`ALTER DATABASE`](/13/13.1/13.1.2/alter-database.html) 语句。参阅[章节 13.1.12，“CREATE DATABASE 语句”](/13/13.1/13.1.12/create-databas.html)，[章节 13.1.24，“DROP DATABASE 语句”](/13/13.1/13.1.24/drop-database.html) 和 [章节 13.1.2，“ALTER DATABASE 语句”](/13/13.1/13.1.2/alter-database.html)。

  - [`DO` 语句](/13/13.2/13.2.3/do.html)。

  - [`EXPLAIN SELECT`](/13/13.8/13.8.2/explain.html) 获取查询优化器如何处理表的说明。

  - [`FLUSH`](/13/13.7/13.7.8/13.7.8.3/flush.html) 和 [`RESET`](/13/13.7/13.7.8/13.7.8.6/reset.html) 语句。

  - [`SET`](/13/13.7/13.7.6/13.7.6.1/set-variable.html) 语句。参阅[章节 13.7.6.1，“变量赋值的 SET 语法”](/13/13.7/13.7.6/13.7.6.1/set-variable.html)。

  - [`SHOW`](/13/13.7/13.7.7/show.html) 语句。参阅[章节 13.7.7，“SHOW 语句”](/13/13.7/13.7.7/show.html)。通过使用 `SELECT` 查询 `INFORMATION_SCHEMA`，可以以更标准的方式获得许多特定于 MySQL 的 [`SHOW`](/13/13.7/13.7.7/show.html) 语句生成的信息。参阅 [章节 26，“INFORMATION_SCHEMA 表”](/26/information-schema.html)。

  - [`LOAD DATA`](/13/13.2/13.2.7/load-data.html) 的使用。在许多情况下，此语法与 Oracle 的 [`LOAD DATA`](/13/13.2/13.2.7/load-data.html) 兼容。参阅[章节 13.2.7，“LOAD DATA 语句”](/13/13.2/13.2.7/load-data.html)。

  - [`RENAME TABLE`](/13/13.1/13.1.36/rename-table.html) 的使用。参阅[章节 13.1.36，“RENAME TABLE 语句”](/13/13.1/13.1.36/rename-table.html)。

  - [`REPLACE`](/13/13.2/13.2/9/replace.html) 用于替代 [`DELETE`](/13/13.2/13.2.2/delete.html) 加 [`INSERT`](/13/13.2/13.2.6/insert.html)。参阅[章节 13.2.9，“REPLACE 语句”](/13/13.2/13.2/9/replace.html)。

  - 在 [`ALTER TABLE`](/13/13.1/13.1.9/alter-table.html) 语句中使用 `CHANGE col_name`、`DROP col_name`、[`DROP INDEX`](/13/13.1/13.1.27/drop-index.html)、`IGNORE` 或 `RENAME`。在 [`ALTER TABLE`](/13/13.1/13.1.9/alter-table.html) 语句中使用多个子语句 `ADD`、`ALTER`、`DROP` 或 `CHANGE`。参阅[章节 13.1.9，“ALTER TABLE 语句”](/13/13.1/13.1.9/alter-table.html)。

  - 在 [`CREATE TABLE`](/13/13.1/13.1.20/create-table.html) 语句中使用索引名、列前缀上的索引以及 `INDEX` 或 `KEY`。参阅[章节 13.1.20，“CREATE TABLE 语句”](/13/13.1/13.1.20/create-table.html)。

  - 和 [`CREATE TABLE`](/13/13.1/13.1.20/create-table.html) 一起使用 `TEMPORARY` 或 `IF NOT EXISTS`。

  - 和 [`DROP TABLE`](/13/13.1/13.1.32/drop-table.html) 和 [`DROP DATABASE`](/13/13.1/13.1.24/drop-database.html) 一起使用 `IF EXISTS`。

  - 使用单个 [`DROP TABLE`](/13/13.1/13.1.32/drop-table.html) 语句删除多个表的功能。

  - [`UPDATE`](/13/13.2/13.2.13/update.html) 和 [`DELETE`](/13/13.2/13.2.2/delete.html) 语句的 `ORDER BY` 和 `LIMIT` 子句。

  - 语法 `INSERT INTO tbl_name SET col_name = ...`。

  - [`INSERT`](/13/13.2/13.2.6/insert.html) 和 [`REPLACE`](/13/13.2/13.2.9/replace.html) 语句的 `DELAYED` 子句。

  - [`INSERT`](/13/13.2/13.2.6/insert.html)、[`REPLACE`](/13/13.2/13.2.9/replace.html)、[`DELETE`](/13/13.2/13.2.2/delete.html) 和 [`UPDATE`](/13/13.2/13.2.13/update.html) 的 `LOW_PRIORITY` 子句。

  - [`SELECT`](/13/13.2/13.2.10/select.html) 语句的可选项，如 `STRAIGHT_JOIN` 或 `SQL_SMALL_RESULT`。

  - 在 `GROUP BY` 子句中不需要命名所有选中的列。这为一些非常特定但非常正常的查询提供了更好的性能。参阅[章节 12.20，“Aggregate 函数”](/12/12.20/aggregate-functions-and-modifiers.html)。

  - 你可以在 `GROUP BY` 中指定 `DESC` 和 `ASC`，但不能在 `ORDER BY` 中使用。

  - 可在语句中使用赋值操作符 `:=` 设置变量。参阅[章节 9.4，“用户定义变量”](/9/9.4/user-variables.html)。

- 数据类型

  - [`MEDIUMINT`](/11/11.1/11.1.2/integer-types.html)、[`SET`](/13/13.7/13.7.6/13.7.6.1/set-variable.html) 和 [`ENUM`](/11/11.3/11.3.5/enum.html) 数据类型，以及可变的 [`BLOB`](/11/11.3/11.3.4/blob.html) 和 [`TEXT`](/11/11.3/11.3.4/blob.html) 数据类型。

  - `AUTO_INCREMENT`、`BINARY`、`NULL`、`UNSIGNED` 和 `ZEROFILL` 数据类型属性。

- 函数和操作符

  - 为了方便从其他 SQL 环境迁移的用户，MySQL Server 为许多函数支持别名。例如，所有字符串函数都支持标准 SQL 语法和 ODBC 语法。

  - MySQL服务器将 [`||`](/12/12.4/12.4.3/logical-operators.html) 和 [`&&`](/12/12.4/12.4.3/logical-operators.html) 运算符理解为逻辑 OR 和 AND，就像在 C 编程语言中一样。在 MySQL Server 中，[`||`](/12/12.4/12.4.3/logical-operators.html) 和 [`OR`](/12/12.4/12.4.3/logical-operators.html) 是同义词，就像 [`&&`](/12/12.4/12.4.3/logical-operators.html) 和 [`AND`](/12/12.4/12.4.3/logical-operators.html)。由于这种良好的语法，MySQL Server 不支持用于字符串连接的标准 SQL [`||`](/12/12.4/12.4.3/logical-operators.html) 运算符；改为使用 [`CONCAT()`](/12/12.8/string-functions.html)。因为 [`CONCAT()`](/12/12.8/string-functions.html) 接受任意数量的参数，所以很容易转换为 MySQL Server 使用的 [`||`](/12/12.4/12.4.3/logical-operators.html) 运算符。

  - [`COUNT(DISTINCT value_list)`](/12/12.20/12.20.1/aggregate-functions.html) 的使用，其中 *value_list* 元素可以多个。

  - 默认情况下，字符串比较不区分大小写，排序顺序由当前字符集的排序规则确定，默认情况下为 `utf8mb4`。要执行区分大小写的比较，你应该使用 `BINARY` 属性声明列，或者使用 `BINARY` 转换，这会使用底层字符代码值而不是词法顺序进行比较。

  - [`%`](/12/12.6/12.6.2/mathematical-functions.html) 运算符是 [`MOD()`](/12/12.6/12.6.2/mathematical-functions.html) 的同义词。也就是说，*N % M* 等于[`MOD(N,M)`](/12/12.6/12.6.2/mathematical-functions.html)。[`%`](/12/12.6/12.6.2/mathematical-functions.html) 为 C 程序员提供支持，并与 PostgreSQL 兼容。

  - [`=`](/12/12.4/12.4.4/assignment-operators.html)、[`<>`](/12/12.4/12.4.2/comparison-operators.html)、[`<=`](/12/12.4/12.4.2/comparison-operators.html)、[`<`](/12/12.4/12.4.2/comparison-operators.html)、[`>=`](/12/12.4/12.4.2/comparison-operators.html)、[`>`](/12/12.4/12.4.2/comparison-operators.html)、[`<<`](/12/12.4/12.4.2/comparison-operators.html)、[`>>`](/12/12.4/12.4.2/comparison-operators.html)、 [`<=>`](/12/12.4/12.4.2/comparison-operators.html)、 [`AND`](/12/12.4/12.4.3/logical-operators.html)、[`OR`](/12/12.4/12.4.3/logical-operators.html) 或 [`LIKE`](/12/12.8/12.8.1/string-comparison-functions.html) 运算符可用于 [`SELECT`](/13/13.2/13.2.10/select.html) 语句中输出列列表（`FROM` 左侧）的表达式中

    例如：

    ```bash
    mysql> SELECT col1=1 AND col2=2 FROM my_table;
    ```

  - 函数 [`LAST_INSERT_ID()`](/12/12.16/information-functions.html) 返回最近的 `AUTO_INCREMENT` 值。参阅[章节 12.16，“信息函数”](/12/12.16/information-functions.html)。

  - 对数值可使用 [`LIKE`](/12/12.8/12.8.1/string-comparison-functions.html)。

  - [`REGEXP`](/12/12.8/12.8.2/regexp.html) 和 [`NOT REGEXP`](/12/12.8/12.8.2/regexp.html) 扩展了正则表达式操作符。

  - [`CONCAT()`](/12/12.8/string-functions.html) 或 [`CHAR()`](/12/12.8/string-functions.html) 带一个或两个以上参数。（在 MySQL Server 中，这些函数可以接受数量可变的参数。

  - [`BIT_COUNT()`](/12/12.13/bit-functions.html)、[`CASE`](/12/12.5/flow-control-functions.html)、[`ELT()`](/12/12.8/string-functions.html)、[`FROM_DAYS()`](/12/12.7/date-and-time-functions.html)、[`FORMAT()`](/12/12.8/string-functions.html)、[`IF()`](/12/12.5/flow-control-functions.html)、[`MD5()`](/12/12.14/encryption-functions.html)、[`PERIOD_ADD()`](/12/12.7/date-and-time-functions.html)、[`PERIOD_DIFF()`](/12/12.7/date-and-time-functions.html)、[`TO_DAYS()`](/12/12.7/date-and-time-functions.html) 和 [`WEEKDAY()`](/12/12.7/date-and-time-functions.html) 函数。

  - 使用 [`TRIM()`](/12/12.8/string-functions.html) 修剪子字符串。标准 SQL 仅支持删除单个字符。

  - `GROUP BY` 的函数 [`STD()`](/12/12.20/aggregate-functions-and-modifiers.html)、[`BIT_OR()`](/12/12.20/aggregate-functions-and-modifiers.html)、[`BIT_AND()`](/12/12.20/aggregate-functions-and-modifiers.html)、[`BIT_XOR()`](/12/12.20/aggregate-functions-and-modifiers.html) 和 [`GROUP_CONCAT()`](/12/12.20/aggregate-functions-and-modifiers.html)。参阅[章节 12.20，“Aggregate 函数”](/12/12.20/aggregate-functions-and-modifiers.html)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/extensions-to-ansi.html)
