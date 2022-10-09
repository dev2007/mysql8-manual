# 1.7.2 MySQL 与标准 SQL 的区别

- [1.7.2.1 SELECT INTO TABLE 区别](/1/1.7/1.7.2/1.7.2.1/ansi-diff-select-into-table.html)
- [1.7.2.2 UPDATE 区别](/1/1.7/1.7.2/1.7.2.2/ansi-diff-update.html)
- [1.7.2.3 FOREIGN KEY 约束的区别](/1/1.7/1.7.2/1.7.2.3/ansi-diff-foreign-keys.html)
- [1.7.2.4 '--' 作为备注的开头](/1/1.7/1.7.2/1.7.2.4/ansi-diff-comments.html)

我们试图使 MySQL Server 遵循 ANSI SQL 标准和 ODBC SQL 标准，但 MySQL Server 在某些情况下执行的操作不同：

- MySQL 和标准 SQL 特权系统之间存在一些差异。例如，在 MySQL 中，删除表时不会自动撤销表的权限。必须显式发出 [`REVOKE`](/13/13.7/13.7.1/13.7.1.8/revoke.html) 语句才能撤消表的权限。更多信息，参阅[章节 13.7.1.8，“REVOKE 语句”](/13/13.7/13.7.1/13.7.1.8/revoke.html)。

- [`CAST()`](/12/12.11/cast-functions.html) 函数不支持转换为 [`REAL`](/11/11.1/11.1.4/floating-point-types.html) 或 [`BIGINT`](/11/11.1/11.1.2/integer-types.html)。参阅[章节 12.11，“转换函数和运算符”](/12/12.11/cast-functions.html)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/differences-from-ansi.html)
