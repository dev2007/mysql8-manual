# 1.6.3 MySQL 如何处理约束

- [1.6.3.1 PRIMARY KEY 和 UNIQUE 索引约束](/1/1.6/1.6.3/1.6.3.1/constraint-primary-key.html)
- [1.6.3.2 FOREIGN KEY 约束](/1/1.6/1.6.3/1.6.3.2/constraint-foreign-key.html)
- [1.6.3.3 对无效数据的强制约束](/1/1.6/1.6.3/1.6.3.3/constraint-invalid-data.html)
- [1.6.3.4 ENUM 和 SET 约束](/1/1.6/1.6.3/1.6.3.4/constraint-enum.html)

MySQL 使你能够处理允许回滚的事务表和不允许回滚的非事务表。因此，MySQL 中的约束处理与其他 DBMS 中的约束处理略有不同。我们必须处理在非事务表中插入或更新了大量行的情况，在发生错误时无法回滚这些行的更改。

基本原理是，MySQL Server 在解析要执行的语句时，尝试为它能够检测到的任何内容生成错误，并尝试从执行该语句时发生的任何错误中恢复。我们在大多数情况下都这样做，但还不是所有情况下都这样。

当发生错误时，MySQL 的选项是在中间停止语句，或者从问题中恢复并继续。默认情况下，服务器遵循后一种方法。例如，这意味着服务器可能会强制将无效值转换为最接近的有效值。

有几个 SQL 模式选项可用于更好地控制错误数据值的处理，以及在出现错误时是继续执行语句还是中止语句。使用这些选项，你可以将 MySQL Server 配置为以更传统的方式运行，就像其他拒绝不正确输入的 DBMS 一样。SQL 模式可以在服务器启动时全局设置，以影响所有客户端。单个客户机可以在运行时设置 SQL 模式，这使每个客户机能够选择最适合其需求的行为。参阅[章节 5.1.11，“服务器 SQL 模式”](/5/5.1/5.1.11/sql-mode.html)。

以下各节介绍 MySQL Server 如何处理不同类型的约束。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/constraints.html)
