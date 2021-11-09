# 1.7.2.1 SELECT INTO TABLE 区别

MySQL Server 不支持 `SELECT ... INTO TABLE` Sybase SQL 扩展。相反，MySQL Server 支持 [`INSERT INTO ... SELECT`](/13/13.2/13.2.6/13.2.6.1/insert-select) 标准 SQL 语法，这基本上是一样的。参阅[章节 13.2.6.1，“INSERT INTO ... SELECT 语句”](/13/13.2/13.2.6/13.2.6.1/insert-select)。示例：

```bash
INSERT INTO tbl_temp2 (fld_id)
    SELECT tbl_temp1.fld_order_id
    FROM tbl_temp1 WHERE tbl_temp1.fld_order_id > 100;
```

或者，你可以使用 `SELECT ... INTO OUTFILE`](/13/13.2/13.2.10/13.2.10.1/select-into) 或 [`CREATE TABLE ... SELECT`](/13/13.1/13.1.20/create-table)。

你可以通过 [`SELECT ... INTO`](/13/13.2/13.2.10/13.2.10.1/select-into) 来使用用户定义变量。同样的语法也可以在使用游标和局部变量的存储例程中使用。参阅[章节 13.2.10.1，“SELECT ... INTO 语句”](/13/13.2/13.2.10/13.2.10.1/select-into)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/ansi-diff-select-into-table.html)
