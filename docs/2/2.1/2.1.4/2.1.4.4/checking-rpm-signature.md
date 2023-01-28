# 2.1.4.4 使用 RPM 进行签名检查

对于 RPM 包，没有单独的签名。RPM 包具有内置的 GPG 签名和 MD5 校验和。你可以通过运行以下命令来验证包：

```bash
$> rpm --checksig package_name.rpm
```

示例：

```bash
$> rpm --checksig MySQL-server-8.0.27-0.linux_glibc2.5.i386.rpm
MySQL-server-8.0.27-0.linux_glibc2.5.i386.rpm: md5 gpg OK
```

:::tip 注意
如果你使用的是 RPM 4.1，并且它警告 `(GPG) NOT OK (MISSING KEYS: GPG#5072e1f5`，那么即使你已经将 MySQL 公共构建密钥导入到自己的 GPG 密钥环中，你也需要首先将密钥导入 RPM 密钥环中。RPM 4.1 不再使用你的个人 GPG 钥匙环（或GPG本身）。相反，RPM 维护一个单独的密钥环，因为它是一个系统范围的应用程序，用户的 GPG 公钥环是一个用户特定的文件。要将 MySQL 公钥导入 RPM 密钥环，首先获取密钥，然后使用 `rpm --import` 导入密钥。例如：
:::

```bash
$> gpg --export -a 5072e1f5 > 5072e1f5.asc
$> rpm --import 5072e1f5.asc
```

此外，**rpm** 还支持直接从 URL 加载密钥，你可以使用此手册页面：

```bash
$> rpm --import https://dev.mysql.com/doc/refman/8.0/en/checking-gpg-signature.html
```

如果需要获取 MySQL 公钥，参阅[章节 2.1.4.2，“使用 GnuPG 进行签名检查”](/2/2.1/2.1.4/2.1.4.2/checking-gpg-signature.html)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/checking-rpm-signature.html)
