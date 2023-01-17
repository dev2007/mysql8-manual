# 3.3.4.6 使用 NULL 值

在你习惯之前，`NULL` 值可能会令人惊讶。从概念上讲，`NULL` 意味着“缺少未知值”，它的处理方式与其他值有所不同。

要测试 `NULL`，请使用 [IS NULL](/12/12.4/12.4.2/comparison-operators.html) 和 [IS NOT NULL](/12/12.4/12.4.2/comparison-operators.html) 运算符，如下所示：

```bash
mysql> SELECT 1 IS NULL, 1 IS NOT NULL;
+-----------+---------------+
| 1 IS NULL | 1 IS NOT NULL |
+-----------+---------------+
|         0 |             1 |
+-----------+---------------+
```

不能使用算术比较运算符（如 [=](/12/12.4/12.4.2/comparison-operators.html)、[<](/12/12.4/12.4.2/comparison-operators.html) 或 [<>](/12/12.4/12.4.2/comparison-operators.html)）来测试 `NULL`。要亲自演示，请尝试以下查询：

```bash
mysql> SELECT 1 = NULL, 1 <> NULL, 1 < NULL, 1 > NULL;
+----------+-----------+----------+----------+
| 1 = NULL | 1 <> NULL | 1 < NULL | 1 > NULL |
+----------+-----------+----------+----------+
|     NULL |      NULL |     NULL |     NULL |
+----------+-----------+----------+----------+
```

由于与 `NULL` 进行算术比较的结果也是 `NULL`，因此无法从此类比较中获得任何有意义的结果。

在 MySQL 中，`0` 或 `NULL` 表示 false，其他任何值都表示 true。布尔运算的默认真值为 `1`。

这种对 `NULL` 的特殊处理就是为什么在上一节中，有必要使用 `death IS NOT NULL` 而不是 `death <> NULL` 来确定哪些动物不再活着。

在 `GROUP BY` 中，两个 NULL 值被视为相等。

执行 `ORDER BY` 时，如果执行 `ORDER BY ... ASC`，则首先显示 `NULL`值和如果你执行 `ORDER BY ... DESC` 则 `NULL` 是最后显示。

使用 `NULL` 时的一个常见错误是，假设不可能在定义为 `NOT NULL` 的列中插入零或空字符串，但事实并非如此。这些实际上是值，而 `NULL` 表示“没有值”。你可以通过使用 `IS [NOT] NULL` 很容易地测试，如下所示：

```bash
mysql> SELECT 0 IS NULL, 0 IS NOT NULL, '' IS NULL, '' IS NOT NULL;
+-----------+---------------+------------+----------------+
| 0 IS NULL | 0 IS NOT NULL | '' IS NULL | '' IS NOT NULL |
+-----------+---------------+------------+----------------+
|         0 |             1 |          0 |              1 |
+-----------+---------------+------------+----------------+
```

因此，将零或空字符串插入 `NOT NULL` 列是完全可能的，因为这些列实际上是 `NOT NULL`。参阅[章节 B.3.4.3，“NULL 值的问题”](/b/b.3/b.3.4/b.3.4.3/problems-with-null.html)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/working-with-null.html)
