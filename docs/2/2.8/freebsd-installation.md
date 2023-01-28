# 2.8 在 FreeBSD 上安装 MySQL

本节提供有关在 FreeBSD Unix 的变体上安装 MySQL 的信息。

你可以使用 Oracle 提供的二进制发行版在 FreeBSD 上安装 MySQL。有关更多信息，参阅[章节 2.2，“使用通用二进制文件在 Unix/Linux 上安装 MySQL”](/2/2.2/binary-installation.html)。

安装 MySQL 最简单（也是首选）的方法是使用列在 [http://www.freebsd.org/](http://www.freebsd.org/) 上的 [mysql-server](/4/4.3/4.3.3/mysql-server.html)和 `mysql-client` 端口。使用这些端口有以下好处：

- 一个运行中的 MySQL，可启用在你已知版本的 FreeBSD 上运行的所有优化。
- 自动配置和构建。
- 启动脚本安装在 `/usr/local/etc/rc.d` 中。
- 能够使用 `pkg_info -L` 查看安装了哪些文件。
- 如果你的计算机上不再需要 MySQL，可以使用 `pkg_delete` 删除它。

MySQL 构建过程需要 GNU make（**gmake**）才能工作。如果 GNU **make** 不可用，则必须在编译 MySQL 之前先安装它。

:::tip 注意
**ldd mysqld** 中的必备库：libthr、libcrypt、libkrb5、libm、librt、libexecinfo、libunload 和 libssl。
:::

要使用端口系统进行安装：

```bash
# cd /usr/ports/databases/mysql80-server
# make
...
# cd /usr/ports/databases/mysql80-client
# make
...
```

标准端口安装将服务器放在 `/usr/local/libexec/mysqld` 中，MySQL服务器的启动脚本放在 `/usr/local/etc/rc.d/mysql-server` 中。

关于 BSD 实施的一些附加说明：

- 要在安装后使用端口系统删除 MySQL，请执行以下操作：

```bash
# cd /usr/ports/databases/mysql80-server
# make deinstall
...
# cd /usr/ports/databases/mysql80-client
# make deinstall
...
```

- 如果你遇到 MySQL 中的当前日期问题，设置 `TZ` 变量应该会有所帮助。参阅[章节 4.9，“环境变量”](/4/4.9/environment-variables.html)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/freebsd-installation.html)
