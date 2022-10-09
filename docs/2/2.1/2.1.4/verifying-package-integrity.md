# 2.1.4 使用 MD5 校验和或 GnuPG 验证包完整性

- [2.1.4.1 验证 MD5 校验和](/2/2.1/2.1.4/2.1.4.1/verifying-md5-checksum.html)
- [2.1.4.2 使用 GnuPG 进行签名检查](/2/2.1/2.1.4/2.1.4.2/checking-gpg-signature.html)
- [2.1.4.3 使用 Windows 版 Gpg4win 进行签名检查](/2/2.1/2.1.4/2.1.4.3/checking-gpg-signature-windows.html)
- [2.1.4.4 使用 RPM 进行签名检查](/2/2.1/2.1.4/2.1.4.4/checking-rpm-signature.html)

下载适合你需要的MySQL包后，在尝试安装之前，请确保它完好无损且未被篡改。完整性检查有三种方法：

- MD5 校验和

- 使用 GnuPG（GNU 隐私保护）的加密签名

- 对于 RPM 包，内置的 RPM 完整性验证机制

以下各节介绍如何使用这些方法。

如果你注意到 MD5 校验和或 GPG 签名不匹配，请首先再次尝试从另一个镜像站点下载相应的包，。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/x.html)
