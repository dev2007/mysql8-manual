# 2.9.9 MySQL 配置和第三方工具

需要从 MySQL 源确定 MySQL 版本的第三方工具可以读取顶级源目录中的 `VERSION`  文件。该文件分别列出了版本的各个部分。例如，如果版本是 MySQL 8.0.4-rc，则文件如下所示：

```bash
MYSQL_VERSION_MAJOR=8
MYSQL_VERSION_MINOR=0
MYSQL_VERSION_PATCH=4
MYSQL_VERSION_EXTRA=-rc
```

如果源不适用于 General Availability（GA）版本，则 `MYSQL_VERSION_EXTRA` 值为非空。在刚刚显示的示例中，该值对应于“Release Candidate（发布候选）”。

要从版本组件构造五位数，请使用以下公式：

```bash
MYSQL_VERSION_MAJOR*10000 + MYSQL_VERSION_MINOR*100 + MYSQL_VERSION_PATCH
```

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/source-configuration-third-party.html)
