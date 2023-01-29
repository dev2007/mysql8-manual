# 3.6.7 搜索两个键

使用单个键的 [OR](/12/12.4/12.4.3/logical-operators.html) 得到了很好的优化，[AND](/12/12.4/12.4.3/logical-operators.html) 的处理也是如此。

一个棘手的情况是在两个不同的键上结合 [OR](/12/12.4/12.4.3/logical-operators.html) 进行搜索：

```bash
SELECT field1_index, field2_index FROM test_table
WHERE field1_index = '1' OR  field2_index = '1'
```

这种情况已优化。参阅[章节 8.2.1.3，“索引合并优化”](/8/8.2/8.2.1/8.2.1.3/index-merge-optimization.html)。

你还可以通过使用 [UNION](/13/13.2/13.2.18/union.html) 来有效地解决这个问题：将两个单独的 [SELECT](/13/13.2/13.2.13/select.html) 语句的输出组合在一起。参阅[章节 13.2.18，“UNION 子句”](/13/13.2/13.2.18/union.html)。

每个 [SELECT](/13/13.2/13.2.13/select.html) 只搜索一个键，可以进行优化：

```bash
SELECT field1_index, field2_index
    FROM test_table WHERE field1_index = '1'
UNION
SELECT field1_index, field2_index
    FROM test_table WHERE field2_index = '1';
```

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/searching-on-two-keys.html)
