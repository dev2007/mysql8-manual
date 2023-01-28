# 3.6.8 计算每日访问量

以下示例显示了如何使用位组函数计算用户每月访问网页的天数。

```bash
CREATE TABLE t1 (year YEAR, month INT UNSIGNED,
             day INT UNSIGNED);
INSERT INTO t1 VALUES(2000,1,1),(2000,1,20),(2000,1,30),(2000,2,2),
            (2000,2,23),(2000,2,23);
```

示例表包含表示用户访问页面的年-月-日值。要确定每个月这些访问发生的天数，请使用以下查询：

```bash
SELECT year,month,BIT_COUNT(BIT_OR(1<<day)) AS days FROM t1
       GROUP BY year,month;
```

以上返回：

```bash
+------+-------+------+
| year | month | days |
+------+-------+------+
| 2000 |     1 |    3 |
| 2000 |     2 |    2 |
+------+-------+------+
```

该查询计算每个年/月组合在表中出现的不同天数，并自动删除重复条目。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/calculating-days.html)
