# 1.6.3.3 对无效数据的强制约束

默认情况下，MySQL 8.0 拒绝无效或不正确的数据值，并中止出现这些值的语句。通过禁用严格 SQL 模式（参阅[章节5.1.11，“服务器 SQL 模式”](/5/5.1/5.1.11/sql-mode.html)），可以改变此行为以更宽容无效值，例如服务器强制将其转换为用于数据输入的有效值，但不推荐。

MySQL 的旧版本默认采用宽容行为；对于这种行为的描述，参阅[无效数据的约束](https://dev.mysql.com/doc/refman/5.7/en/constraint-invalid-data.html)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/constraint-invalid-data.html)
