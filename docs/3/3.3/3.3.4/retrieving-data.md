# 3.3.4 从表中检索信息

- [3.3.4.1 选择所有数据](/3/3.3/3.3.4/3.3.4.1/selecting-all.html)
- [3.3.4.2 选择特定行](/3/3.3/3.3.4/3.3.4.2/selecting-rows.html)
- [3.3.4.3 选择特定列](/3/3.3/3.3.4/3.3.4.3/selecting-columns.html)
- [3.3.4.4 排序行](/3/3.3/3.3.4/3.3.4.4/sorting-rows.html)
- [3.3.4.5 日期计算](/3/3.3/3.3.4/3.3.4.5/date-calculations.html)
- [3.3.4.6 使用 NULL 值](/3/3.3/3.3.4/3.3.4.6/working-with-null.html)
- [3.3.4.7 模式匹配](/3/3.3/3.3.4/3.3.4.7/pattern-matching.html)
- [3.3.4.8 计数行](/3/3.3/3.3.4/3.3.4.8/counting-rows.html)
- [3.3.4.9 使用多个表](/3/3.3/3.3.4/3.3.4.9/multiple-tables.html)

SELECT 语句用于从表中提取信息。声明的一般形式为：

```bash
SELECT what_to_select
FROM which_table
WHERE conditions_to_satisfy;
```

*what_to_select* 表示你想看到的内容。这可以是一个列列表，或 `*` 表示“所有列”。*which_table* 表示要从中检索数据的表。`WHERE` 子句是可选的。如果存在，则 *conditions_to_sompatity* 指定行必须满足的一个或多个条件才能进行检索。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/retrieving-data.html)
