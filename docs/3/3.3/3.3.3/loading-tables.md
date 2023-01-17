# 3.3.3 将数据加载到表中

创建表后，需要填充它。 [LOAD DATA](/13/13.2/13.2.7/loda-data.html) 和 [INSERT](/13/13.2/13.2.6/insert.html) 语句对此很有用。

假设你的宠物记录可以描述为如下所示。（请注意，MySQL 期望的日期为 *'YYYY-MM-DD'* 格式；这可能与你习惯的不同。）


|name|owner|species|sex|birth|death|
|--|--|--|--|--|--|
|Fluffy|Harold|cat|f|1993-02-04||
|Claws|Gwen|cat|m|1994-03-17||
|Buffy|Harold|dog|f|1989-05-13||
|Fang|Benny|dog|m|1990-08-27||
|Bowser|Diane|dog|m|1979-08-31|1995-07-29|
|Chirpy|Gwen|bird|f|1998-09-11||
|Whistler|Gwen|bird|1997-12-09||
|Slim|Benny|snake|m|1996-04-29||

因为你是从一个空表开始的，所以填充它的一种简单方法是为每个动物创建一个包含一行的文本文件，然后用一条语句将文件的内容加载到表中。

你可以创建一个文本文件 `pet.txt`，每行包含一条记录，值由制表符分隔，并按照 [CREATE TABLE](/13/13.1/13.1.20/create-table.html) 语句中列的顺序给出。对于缺少的值（例如未知的性别或仍然活着的动物的死亡日期），可以使用 `NULL` 值。要在文本文件中表示这些，请使用 `\N`（反斜杠，大写N）。例如，Whistler the bird的记录如下（其中值之间的空格是一个制表符）：

```bash
Whistler        Gwen    bird    \N      1997-12-09      \N
```

要将文本文件 `pet.txt` 加载到 `pet` 表中，请使用以下语句：

```bash
mysql> LOAD DATA LOCAL INFILE '/path/pet.txt' INTO TABLE pet;
```

如果在 Windows 上创建文件时使用的编辑器使用 `\r\n` 作为行终止符，则应使用以下语句：

```bash
mysql> LOAD DATA LOCAL INFILE '/path/pet.txt' INTO TABLE pet
       LINES TERMINATED BY '\r\n';
```

（在运行 macOS 的苹果计算机上，你可能希望使用 `LINES TERMINATED BY '\r'`。）

如果需要，可以在 [LOAD DATA](/13/13.2/13.2.7/load-data.html) 语句中显式指定列值分隔符和行尾标记，但默认值是制表符和换行符。这些足以让语句正确读取文件 `pet.txt`。

如果该语句失败，则你的 MySQL 安装可能没有默认启用本地文件功能。有关如何更改此设置的信息，参阅[章节 6.1.6，“本地加载数据的安全注意事项”](/6/6.1/6.1.6/load-data-local-security.html)。

当你希望一次添加一条新记录时，[INSERT](/13/13.2/13.2.7/insert.html) 语句非常有用。在最简单的形式中，按照 [CREATE TABLE](/13/13.1/13.1.20/create-table.html) 语句中列的顺序为每个列提供值。假设 Diane 得到了一只名为 “Puffball” 的新仓鼠。你可以使用如下 [INSERT](/13/13.2/13.2.7/insert.html) 语句添加一条新记录：

```bash
mysql> INSERT INTO pet
       VALUES ('Puffball','Diane','hamster','f','1999-03-30',NULL);
```

字符串和日期值在此处指定为带引号的字符串。此外，使用 [INSERT](/13/13.2/13.2.7/insert.html)，可以直接插入 `NULL` 来表示缺少的值。你不像使用 [LOAD DATA](/13/13.2/13.2.7/load-data.html) 那样使用 `\N`。

从这个示例中，你应该能够看到，最初使用多个 [INSERT](/13/13.2/13.2.7/insert.html) 语句而不是单个 [LOAD DATA](/13/13.2/13.2.7/load-data.html) 语句加载记录时需要更多的类型。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/loading-tables.html)
