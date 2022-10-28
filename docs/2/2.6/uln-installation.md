# 2.6 使用不可破坏的 Linux 网络（ULN）安装 MySQL

Linux 支持多种不同的安装MySQL的解决方案，如[章节 2.5，“在 Linux 上安装 MySQL ”](/2/2.5/linux-installation.html)所述。本节介绍的方法之一是从 Oracle 的 不可破坏的 Linux 网络（Unbreakable Linux Network，ULN）安装。您可以在下面找到有关 Oracle Linux 和 ULN 的信息 [http://linux.oracle.com/](http://linux.oracle.com/)。

要使用 ULN，您需要包含 ULN 登录并向 ULN 注册用于安装的机器。ULN 常见问题解答中对此进行了详细描述。该页面还介绍了如何安装和更新软件包。

社区和商业包都受支持，每个包都提供三个 MySQL 通道：

- `Server`：MySQL 服务器
- `Connectors`：MySQL Connector/C++、MySQL Connector/J、MySQL Connector/ODBC 和 MySQL Connector/Python。
- `Tools`：MySQL 路由器、MySQL Shell 和 MySQL Workbench

所有 ULN 用户都可以使用社区频道。

访问 oracle.linux.com 上的商业 MySQL ULN 包，需要您提供 CSI 和 MySQL（企业版或标准版）的有效商业许可证。截至本文撰写之时，有效购买量为 60944、60945、64911 和 64912。适当的 CSI 使商业 MySQL 订阅渠道在 ULN GUI 界面中可用。

一旦使用 ULN 安装了 MySQL，您可以在[章节 2.5.7，“从本地软件存储库在 Linux 上安装 MySQL”](/2/2.5/2.5.7/linux-installation-native.html)中找到有关启动和停止服务器的信息，尤其是在[章节 2.5.4，“使用 Oracle 的 RPM 包在 Linux 上运行 MySQL”](/2/2.5/2.5.4/linux-installation-rpm.html)下。

如果您将包源代码更改为使用 ULN，而不更改正在使用的 MySQL 版本，请备份数据，删除现有二进制文件，并将其替换为 ULN 中的二进制文件。如果涉及到构建的更改，我们建议备份为转储（[mysqldump](/4/4.5/4.5.4/mysqldump) 或 [mysqlpump](/4/4.5/4.5.6/mysqlpump) 或 [MySQL Shell 的备份实用程序](/11/11.5/mysql-shell-utilities-dump-instance-schema)），以防在新二进制文件就位后需要重建数据。如果向 ULN 的转换跨越了版本边界，请在继续之前参考本节：[章节 2.11，“升级 MySQL”](/2/2.11/upgrading.html)。

::: tip 注意
MySQL 8.0.17 开始支持 Oracle Linux 8，MySQL 8.0.24 版本中添加了社区工具和连接器频道。
:::

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/uln-installation.html)
