# 2.3.7 Windows 平台限制

以下限制适用于在 Windows 平台上使用 MySQL：

- 进程内存

在 Windows 32 位平台上，默认情况下不可能在单个进程（包括 MySQL）中使用超过 2GB 的内存。这是因为 Windows 32 位上的物理地址限制是 4GB，而 Windows 中的默认设置是在内核（2GB）和用户/应用程序（2GB）间划分虚拟内存。

某些版本的 Windows 具有引导时间设置，可通过减少内核应用程序来启用更大的应用程序。或者，要使用 2GB 以上的内存，请使用 64 位版本的 Windows。

- 文件系统别名

在使用 `MyISAM` 表时，不能在 Windows 中使用别名链接到另一个卷上的数据文件，然后再链接回 MySQL [`datadir`](/5/5.1/5.1.8/server-system-variables) 位置。

此功能通常用于将数据和索引文件移动到 RAID 或其他快速解决方案。

- 端口限制

Windows 系统有大约 4000 个端口可用于客户端连接，在端口上的连接关闭后，需要两到四分钟才能重用该端口。在客户端高速连接到服务器和从服务器断开连接的情况下，所有可用端口都可能在关闭的端口再次可用之前用完。如果发生这种情况，MySQL服务器似乎没有响应，即使它正在运行。端口也可以由机器上运行的其他应用程序使用，在这种情况下，MySQL可用的端口数量较少。

有关此问题的更多信息，参阅 https://support.microsoft.com/kb/196271。

- `DATA DIRECTORY` 和 `INDEX DIRECTORY`

[`CREATE TABLE`](/13/13.1/13.1.20/create-table) 语句的 `DATA DIRECTORY` 子句仅在 Windows 版本的 `InnoDB` 表上受支持，如[章节 15.6.1.2，“外部创建表”](/15/15.6/15.6.1/15.6.1.2/innodb-create-table-external)所述。对于 `MyISAM` 和其他存储引擎，在 Windows 和任何其他平台上，通过非函数 `realpath()` 调用，`CREATE TABLE` 的 `DATA DIRECTORY` 和 `INDEX DIRECTORY` 子句将被忽略。

- [`DROP DATABASE`](/13/13.1/13.1.24/drop-database)

不能删除另一个会话正在使用的数据库。

- 大小写不敏感的名称

Windows 上的文件名不区分大小写，因此 MySQL 数据库和表名在 Windows 上也不区分大小读。唯一的限制是在给定语句中必须使用相同的大小写指定数据库和表名。参阅[章节9.2.3，“标识符大小写敏感”](/9/9.2/9.2.3/identifier-case-sensitivity)。

- 目录和文件名字

在 Windows 上，MySQL 服务器仅支持与当前 ANSI 代码页兼容的目录和文件名。例如，以下日语目录名在西方语言环境中无效（代码页 1252）：

```bash
datadir="C:/私たちのプロジェクトのデータ"
```

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/windows-restrictions.html)
