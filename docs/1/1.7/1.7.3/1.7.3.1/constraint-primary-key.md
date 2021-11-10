# 1.7.3.1 PRIMARY KEY 和 UNIQUE 索引约束

通常，数据更改语句（如 [`INSERT`](/13/13.2/13.2.6/insert) 或 [`UPDATE`](/13/13.2/13.2.13/update)）会发生错误，这些语句会违反主键、唯一键或外键约束。如果你使用的是事务存储引擎，如 `InnoDB`，MySQL 会自动回滚该语句。如果您使用的是非事务存储引擎，MySQL 将停止处理发生错误的行上的语句，并保留所有未处理的剩余行。

MySQL 对 [`INSERT`](/13/13.2/13.2.6/insert)、[`UPDATE`](/13/13.2/13.2.13/update) 等支持 `IGNORE` 关键字。如果使用它，MySQL 将忽略主键或唯一键冲突，并继续处理下一行。请参阅章节以了解你正在使用的语句（[章节 13.2.6，“INSERT 语句”](/13/13.2/13.2.6/insert)；[章节 13.2.13，“UPDATE 语句”](/13/13.2/13.2.13/update)；等等）

你可以通过 [`mysql_info()`](/5/5.4/5.4.37/mysql-info) C API 函数获取实际插入或更新的行数信息。你还可以使用 [`SHOW WARNINGS`](/13/13.7/13.7.7/13.7.7.42/show-warnings) 语句。参阅 [`mysql_info()`](/5/5.4/5.4.37/mysql-info) 及[章节 13.7.7.42，“SHOW WARNINGS 语句”](/13/13.7/13.7.7/13.7.7.42/show-warnings)。

`InnoDB` 和 `NDB` 表支持外键。参阅[章节 1.7.3.2，“FOREIGN KEY 约束”](/1/1.7/1.7.3/1.7.3.2/constraint-foreign-key)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/constraint-primary-key.html)
