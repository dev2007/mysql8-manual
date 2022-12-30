# 2.9.6 配置 SSL 库支持

需要 SSL 库来支持加密连接、生成随机数的熵以及其他加密相关操作。

如果你从源分发编译 MySQL，**CMake** 会将分发配置为默认使用已安装的 OpenSSL 库。

要使用 OpenSSL 进行编译，请使用以下流程：

1. 确保系统上安装了 OpenSSL 1.0.1 或更高版本。如果安装的 OpenSSL 版本低于 1.0.1，**CMake** 会在 MySQL 配置时产生错误。如果需要获得 OpenSSL，请访问 [http://www.openssl.org](http://www.openssl.org)。

2. [WITH_SSL](/2/2.9/2.9.7/source-configuration-options.html#特性选项) **CMake** 选项确定用于编译 MySQL 的 SSL 库（参阅[章节 2.9.7，“MySQL 源配置选项”](/2/2.9/2.9.7/source-configuration-options.html#特性选项)）。默认值为 [-DWITH_SSL=system](/2/2.9/2.9.7/source-configuration-options.html#)，它使用 OpenSSL。要使其显式使用，请在 **CMake** 命令行上指定该选项。例如：

```bash
cmake . -DWITH_SSL=system
```

该命令将分发配置为使用已安装的 OpenSSL 库。或者，要显式指定 OpenSSL 安装的路径名，请使用以下语法。如果你安装了多个版本的 OpenSSL，这将非常有用，以防止 CMake 选择错误的版本：

```bash
cmake . -DWITH_SSL=path_name
```

从 v8.0.30 起，通过在 EL7 上使用 `WITH_SSL=openssl11` 或在 EL8 上使用 `WITH_2SSL=openssl3`，支持其他 OpenSSL 系统包。认证插件（如 LDAP 和 Kerberos）被禁用，因为它们不支持这些 OpenSSL 的替代版本。

3. 编译并安装分发。

要检查 [mysqld](/4/4.3/4.3.1/mysqld.html) 服务器是否支持加密连接，请检查 [have_ssl](/5/5.1/5.1.8/server-system-variables.html) 系统变量的值：

```bash
mysql> SHOW VARIABLES LIKE 'have_ssl';
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| have_ssl      | YES   |
+---------------+-------+
```

如果值为 `YES`，则服务器支持加密连接。如果该值为 `DISABLED`，则服务器能够支持加密连接，但未使用合适的 `--ssl-xxx` 选项启动以启用加密连接；参阅[章节 6.3.1，“配置 MySQL 以使用加密连接”](/6/6.3/6.3.1/using-encrypted-connections)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/source-ssl-library-configuration.html)
