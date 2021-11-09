# 1.7.2.2 UPDATE 区别

如果从要在表达式中更新的表中访问列，[`UPDATE`](/13/13.2/13.2.13/update) 将使用该列的当前值。下面语句中的第二个赋值将 `col2` 设置为当前（已更新的）`col1` 值，而不是原始 `col1` 值。结果是 `col1` 和 `col2` 具有相同的值。此行为不同于标准 SQL。

```bash
UPDATE t1 SET col1 = col1 + 1, col2 = col1;
```

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/ansi-diff-update.html)
