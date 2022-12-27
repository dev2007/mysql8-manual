# 2.9 从源代码安装 MySQL

**目录**

- [2.9.1 源码安装方法](/2/2.9/2.9.1/source-installation-methods.html)
- [2.9.2 源安装前提条件](/2/2.9/2.9.2/source-installation-prerequisites.html)
- [2.9.3 源安装的 MySQL 布局](/2/2.9/2.9.3/source-installation-layout.html)
- [2.9.4 使用标准源分发安装 MySQL](/2/2.9/2.9.4/installing-source-distribution.html)
- [2.9.5 使用开发源树安装 MySQL](/2/2.9/2.9.5/installing-development-tree.html)
- [2.9.6 配置 SSL 库支持](/2/2.9/2.9.6/source-ssl-library-configuration.html)
- [2.9.7 MySQL 源配置选项](/2/2.9/2.9.7/source-configuration-options.html)
- [2.9.8 MySQL 编译问题的处理](/2/2.9/2.9.8/compilation-problems.html)
- [2.9.9 MySQL 配置和第三方工具](/2/2.9/2.9.9/source-configuration-third-party.html)
- [2.9.10 生成 MySQL Doxygen 文档内容](/2/2.9/2.9.10/source-installation-doxygen.html)

通过从源代码构建 MySQL，你可以自定义构建参数、编译器优化和安装位置。有关已知运行 MySQL 的系统列表，参阅 [https://www.mysql.com/support/supportedplatforms/database.html](https://www.mysql.com/support/supportedplatforms/database.html)。

在从源代码开始安装之前，请检查 Oracle 是否为你的平台生成预编译的二进制发行版，以及它是否适合你。我们花了很大的努力来确保我们的二进制文件是用最佳的选项构建的，以实现最佳性能。有关安装二进制发行版的说明，参阅[章节 2.2，“使用通用二进制文件在 Unix/Linux 上安装 MySQL”](/2/2.2/binary-installation.html)。

如果你有兴趣使用与 Oracle 用于在你的平台上生成二进制发行版的构建选项相同或相似的构建选项从源发行版构建 MySQL，请获取一个二进制发行版，将其解压，然后查看 `docs/INFO_BIN` 文件，其中包含有关如何配置和编译 MySQL 发行版的信息。

::: warning 警告
使用非标准选项构建 MySQL 可能会导致功能、性能或安全性降低。
:::

MySQL 源代码包含使用 Doxygen 编写的内部文档。生成的 Doxygen 内容可在 [https://dev.mysql.com/doc/index-other.html](https://dev.mysql.com/doc/index-other.html)。也可以使用[章节 2.9.10，“生成 MySQL Doxygen 文档内容”](/2/2.9/2.9.10/source-installation-doxygen.html)中的说明从 MySQL 源分发在本地生成此内容。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/source-installation.html)
