# 3.7 在 Apache 中使用 MySQL

有一些程序可以让您从 MySQL 数据库验证用户，也可以让您将日志文件写入 MySQL 表。

通过将以下内容放入 Apache 配置文件，可以更改 Apache 日志记录格式，使其易于 MySQL 读取：

```bash
LogFormat \
        "\"%h\",%{%Y%m%d%H%M%S}t,%>s,\"%b\",\"%{Content-Type}o\",  \
        \"%U\",\"%{Referer}i\",\"%{User-Agent}i\""
```

要将该格式的日志文件加载到 MySQL 中，可以使用如下语句：

```bash
LOAD DATA INFILE '/local/access_log' INTO TABLE tbl_name
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' ESCAPED BY '\\'
```

命名表应创建为具有与 `LogFormat` 行写入日志文件的列相对应的列。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/apache.html)
