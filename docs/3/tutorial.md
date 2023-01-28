# 第3章 教程

**目录**

- [3.1 连接和断开服务器](/3/3.1/connecting-disconnecting.html)
- [3.2 输入查询](/3/3.2/entering-queries.html)
- [3.3 创建和使用数据库](/3/3.3/database-use.html)
- [3.4 获取有关数据库和表的信息](/3/3.4/getting-information.html)
- [3.5 在批处理模式下使用 mysql](/3/3.5/batch-mode.html)
- [3.6 常见查询示例](/3/3.6/examples.html)
- [3.7 在 Apache 中使用 MySQL](/3/3.7/apache.html)

本章通过展示如何使用 [mysql](/4/4.5/4.5.1/mysql.html) 客户端程序创建和使用简单的数据库来提供 MySQL 的教程介绍。[mysql](/4/4.5/4.5.1/mysql.html)（有时称为“终端监视器”或“监视器”）是一个交互式程序，它使你能够连接到 MySQL 服务器，运行查询并查看结果。[mysql](/4/4.5/4.5.1/mysql.html) 也可以在批处理模式下使用：预先将查询放在一个文件中，然后告诉 [mysql](/4/4.5/4.5.1/mysql.html) 执行该文件的内容。这里介绍了使用mysql的两种方法。

要查看 [mysql](/4/4.5/4.5.1/mysql.html) 提供的选项列表，带 [--help](/4/4.5/4.5.1/4.5.1.1/mysql-command-options.html) 选项调用它：

```bash
$> mysql --help
```

本章假设你的机器上安装了 [mysql](/4/4.5/4.5.1/mysql.html)，并且你可以连接到 MySQL 服务器。如果不是这样，请与你的 MySQL 管理员联系。（如果*你*是管理员，则需要查阅本手册的相关部分，如[第5章，“MySQL 服务器管理”](/5/server-administration.html)。）

本章介绍设置和使用数据库的整个过程。如果你只对访问现有数据库感兴趣，那么可以跳过描述如何创建数据库及其包含的表的部分。

因为本章本质上是教程，所以必须省略许多细节。有关此处所涵盖主题的更多信息，请参阅手册的相关章节。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/source-installation.html)
