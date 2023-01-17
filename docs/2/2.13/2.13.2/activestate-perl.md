# 2.13.2 在 Windows 上安装 ActiveState Perl

在Windows上，你应该执行以下操作以使用ActiveState Perl安装MySQL DBD模块：

1. 从获取 ActiveState Perl [http://www.activestate.com/Products/ActivePerl/](http://www.activestate.com/Products/ActivePerl/) 并安装它。
2. 打开控制台窗口。
3. 如有必要，请设置 `HTTP_proxy` 变量。例如，你可以尝试如下设置：

```bash
C:\> set HTTP_proxy=my.proxy.com:3128
```

4. 启动 PPM 程序：

```bash
C:\> C:\perl\bin\ppm.pl
```

5. 如果你以前没有这样做，请安装 `DBI`：

```bash
ppm> install DBD-mysql
```

6. 如果成功，请运行以下命令：

```bash
ppm> install DBD-mysql
```

此过程应适用于 ActiveState Perl 5.6 或更高版本。

如果无法运行该过程，则应安装ODBC驱动程序，并通过ODBC连接到MySQL服务器：

```bash
use DBI;
$dbh= DBI->connect("DBI:ODBC:$dsn",$user,$password) ||
  die "Got error $DBI::errstr when connecting to $dsn\n";
```

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/activestate-perl.html)
