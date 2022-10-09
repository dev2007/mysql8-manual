# 1.7.2.4 '--' 作为备注的开头

标准 SQL 使用 C 语法 /*这是注释*/ 表示注释，MySQL Server 也支持这种语法。MySQL 还支持对该语法的扩展，使特定于 MySQL 的 SQL 能够嵌入注释中，如[章节 9.7，“注释”](/9/9.7/comments.html)所述。

标准 SQL 使用“--”作为开始注释的标识。MySQL Server 使用 `#` 作为开始注释字符。MySQL Server 还支持 `--comment` 样式的变体。也就是说，`--` 开始注释标识后面必须跟一个空格（或一个控制字符，如换行符）。该空格用于防止自动生成的 SQL 查询出现问题，该查询使用以下构造，其中我们自动插入 `payment` 的值：

```bash
UPDATE account SET credit=credit-payment
```

考虑 `payment` 为负值，如 `-1` 时，会发生什么：

```bash
UPDATE account SET credit=credit--1
```

`credit--1` 在 SQL 中是有效的表达式，但是 `--` 被解释为注释的开始，表达式的一部分被丢弃。结果是一个与预期含义完全不同的语句：

```bash
UPDATE account SET credit=credit
```

该语句完全不产生值的变更。这说明允许注释以 `--` 开头可能会产生严重的后果。

使用我们的实现，要求紧跟 `--` 有一个空格，以便在 MySQL Server 中将其识别为开始注释标识。因此，`credit--1` 可以安全使用。

另一个安全特性是 [mysql](/4/4.5/4.5.1/mysql.html) 命令行客户端忽略以 `--` 开头的行。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/ansi-diff-comments.html)
