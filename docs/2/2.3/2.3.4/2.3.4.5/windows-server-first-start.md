# 2.3.4.5 首次启动服务器

本节概述了如何启动 MySQL 服务器。以下部分提供了从命令行或作为 Windows 服务启动 MySQL 服务器的更具体信息。

这里的信息主要适用于使用免安装版本安装 MySQL 的情况，或者你希望手动配置和测试 MySQL，而不是使用 MySQL 安装程序。

这些部分中的示例假设MySQL安装在默认位置 `C:\Program Files\MySQL\MySQL Server 8.0` 下。如果你在其他位置安装了 MySQL，请调整示例中显示的路径名。

客户有两种选择。它们可以使用 TCP/IP，如果服务器支持命名管道连接，则可以使用命名管道。

如果服务器在启用 [shared_memory](/5/5.1/5.1.8/server-system-variables) 系统变量的情况下启动，Windows 版 MySQL 也支持共享内存连接。客户端可以使用 [ --protocol=MEMORY ](/4.2/4.2.3/connection-options) 选项通过共享内存进行连接。

有关要运行的服务器二进制文件的信息，参阅[章节 2.3.4.3，“选择 MySQL 服务器类型”](/2/2.3/2.3.4/2.3.4.3/windows-select-server)。

测试最好在控制台窗口（或“DOS 窗口”）的命令提示符下完成。通过这种方式，你可以让服务器在窗口中显示状态消息，以便查看。如果配置出现问题，这些消息将使你更容易识别和修复任何问题。

?> **注意** 启动 MySQL 前必须先初始化数据库。有关初始化过程的更多信息，参阅[章节 2.10.1，“初始化数据目录”](/2/2.10/2.10.1/data-directory-initialization)。

为了启动服务器，输入以下命令：

```bash
C:\> "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld" --console
```

在开始时，你应该会看到与以下类似的消息（路径名和大小可能不同）。`ready for connections`（连接就绪）消息表示服务器已准备好为客户端连接提供服务。

```bash
[Server] C:\mysql\bin\mysqld.exe (mysqld 8.0.30) starting as process 21236
[InnoDB] InnoDB initialization has started.
[InnoDB] InnoDB initialization has ended.
[Server] CA certificate ca.pem is self signed.
[Server] Channel mysql_main configured to support TLS. 
Encrypted connections are now supported for this channel.
[Server] X Plugin ready for connections. Bind-address: '::' port: 33060
[Server] C:\mysql\bin\mysqld.exe: ready for connections. 
Version: '8.0.30'  socket: ''  port: 3306  MySQL Community Server - GPL.
```

你现在可以打开一个新的控制台窗口，在其中运行客户端程序。

如果省略 [--console](/5/5.1/5.1.7/server-options)选项，服务器将诊断输出写入数据目录中的错误日志（默认情况下为 `C:\Program Files\MySQL\MySQL server 8.0\data`）。错误日志是扩展名为 `.err` 的文件，可以使用 [--log-error](/5/5.1/5.1.7/server-options) 选项进行设置。

?> **注意** MySQL 授权表中的初始根帐户没有密码。启动服务器后，你应该按[章节 2.10.4，“保护初始 MySQL 帐户”](/2/2.10/2.10.4/default-privileges)中的说明为其设置密码。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/windows-server-first-start.html)
