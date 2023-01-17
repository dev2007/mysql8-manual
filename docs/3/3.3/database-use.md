# 3.3 创建和使用数据库

- [3.3.1 创建和选择数据库](/3/3.3/3.3.1/creating-database.html)
- [3.3.2 创建表](/3/3.3/3.3.2/creating-tables.html)
- [3.3.3 将数据加载到表中](/3/3.3/3.3.3/loading-tables.html)
- [3.3.4 从表中检索信息](/3/3.3/3.3.4/retrieving-data.html)

一旦知道如何输入 SQL 语句，就可以访问数据库了。

假设你家里有几只宠物（你的小动物园），你想跟踪关于它们的各种信息。你可以通过创建表来保存数据，并用所需的信息加载它们。然后，你可以通过从表格中检索数据来回答关于你的动物的各种问题。本节介绍如何执行以下操作：

- 创建数据库
- 创建表格
- 将数据加载到表中
- 以各种方式从表中检索数据
- 使用多个表

小动物园数据库很简单（故意），但不难想象现实世界中可能会使用类似类型的数据库。例如，农民可以使用这样的数据库来跟踪牲畜，或者兽医可以使用它来跟踪患者记录。可以从 MySQL 网站获得包含以下部分中使用的一些查询和示例数据的小动物园分布。它有压缩的 **tar** 文件和 Zip 格式 [https://dev.mysql.com/doc/](https://dev.mysql.com/doc/)。

使用 [SHOW](/13/13.7/13.7.7/show.html) 语句查找服务器上当前存在的数据库：

```bash
mysql> SHOW DATABASES;
+----------+
| Database |
+----------+
| mysql    |
| test     |
| tmp      |
+----------+
```

`mysql` 数据库描述用户访问权限。`test` 数据库通常可用作用户尝试的工作区。

该语句显示的数据库列表在你的计算机上可能不同；如果你没有 [SHOW DATABASES](/13/13.7/13.7.7/13.7.7.14/show-databases.html) 权限，则 [SHOW DATABASES](/13/13.7/13.7.7/13.7.7.14/show-databases.html) 不会显示你无权访问的数据库。参见[章节 13.7.7.14，“SHOW DATABASE 语句”](/13/13.7/13.7.7/13.7.7.14/show-databases.html)。

如果 `test` 数据库存在，请尝试访问它：

```bash
mysql> USE test
Database changed
```

[USE](/13/13.8/13.8.4/use.html) 与 `QUIT` 一样，不需要分号。（如果你喜欢，可以用分号终止这样的语句；这不会造成任何伤害。）[USE](/13/13.8/13.8.4/use.html) 语句在另一方面也很特殊：它必须在单行中给出。

你可以在下面的示例中使用 `test` 数据库（如果你有权访问它），但你在该数据库中创建的任何内容都可以由其他有权访问该数据库的人删除。因此，你可能应该向MySQL管理员请求使用你自己的数据库的权限。假设你想调用你的 `menagerie`。管理员需要执行如下语句：

```bash
mysql> GRANT ALL ON menagerie.* TO 'your_mysql_name'@'your_client_host';
```

其中 `your_mysql_name` 是分配给你的 MySQL 用户名，`your_client_host` 是连接到服务器的主机。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/database-use.html)
