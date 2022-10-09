# 2.3.4.3 选择 MySQL 服务器类型

下表显示了 MySQL 8.0 中 Windows 的可用服务器。

|二进制|描述|
|--|--|
|[mysqld](/4/4.3/4.3.1/mysqld.html)|具有命名管道支持的优化二进制文件|
|[mysqld-debug](/4/4.3/4.3.1/mysqld.html)|与 [mysqld](/4/4.3/4.3.1/mysqld.html) 类似，但通过完全调试和自动内存分配检查编译|

上述所有二进制文件均针对现代英特尔处理器进行了优化，但应适用于任何英特尔i386类或更高级别的处理器。

分布中的每个服务器都支持同一组存储引擎。[SHOW ENGINES](/13/13.7/13.7.7/13.7.7.16/show-engines.html)语句显示给定服务器支持的引擎。

所有 Windows MySQL 8.0 服务器都支持数据库目录的符号链接。

MySQL 在所有 Windows 平台上都支持 TCP/IP。Windows 上的 MySQL 服务器也支持命名管道，如果你启动服务器时启用了 [named_pipe](/5/5.1/5.1.8/server-system-variables.html) 系统变量。有必要显式启用此变量，因为一些用户在使用命名管道时遇到了关闭 MySQL 服务器的问题。默认情况下，无论平台如何，都使用 TCP/IP，因为在许多 Windows 配置中，命名管道比 TCP/IP 慢。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/windows-select-server.html)
