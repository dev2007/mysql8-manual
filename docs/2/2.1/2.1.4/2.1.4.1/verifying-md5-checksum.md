# 2.1.4.1 验证 MD5 校验和

下载 MySQL 包后，应确保其 MD5 校验和与 MySQL 下载页面上提供的校验和匹配。每个包都有一个单独的校验和，你可以根据下载的包进行验证。每个 MySQL 产品的下载页面上都列出了正确的 MD5 校验和；你应该将其与下载的文件（产品）的 MD5 校验和进行比较。

每个操作系统和安装程序都提供了自己版本的工具来检查 MD5 校验和。通常，该命令名为 **md5sum**，也可能名为 **md5**，而某些操作系统根本不提供该命令。在 Linux上，它是 **GNU Text Utilities** 包的一部分，可用于多种平台。你还可以从下载源代码 [http://www.gnu.org/software/textutils/](http://www.gnu.org/software/textutils/)。 如果已安装 OpenSSL，则可以改用命令 **OpenSSL md5 *package_name***。**md5** Windows 实现的命令行实用程序存在于 [http://www.fourmilab.ch/md5/](http://www.fourmilab.ch/md5/)。 **winMd5Sum** 是一个图形化的MD5检查工具，可以从 [http://www.nullriver.com/index/products/winmd5sum](http://www.nullriver.com/index/products/winmd5sum) 获取。 我们的 Microsoft Windows 示例采用名称 **md5.exe**。

Linux 和 Microsoft Windows 示例:

```bash
$> md5sum mysql-standard-8.0.27-linux-i686.tar.gz
aaab65abbec64d5e907dcd41b8699945  mysql-standard-8.0.27-linux-i686.tar.gz
```

```bash
$> md5.exe mysql-installer-community-8.0.27.msi
aaab65abbec64d5e907dcd41b8699945  mysql-installer-community-8.0.27.msi
```

你应该验证生成的校验和（十六进制数字的字符串）是否与相应软件包正下方下载页面上显示的校验和匹配。

:::tip 注意
确保验证存档文件（例如 `.zip`、`.tar.gz` 或 `.msi` 文件）的校验和，而不是包含在存档中的文件的校验和。换句话说，在提取文件内容之前先验证文件。
:::

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/verifying-md5-checksum.html)
