# 第2章 MySQL的安装和升级

**目录**

- [2.1 通用安装指南](/2/2.1/general-installation-issues)
- [2.2 使用通用二进制文件在 Unix/Linux 上安装 MySQL](/2/2.2/binary-installation)
- [2.3 在 Microsoft Windows 上安装 MySQL](/2/2.3/windows-installation)
- [2.4 在 macOS 上安装 MySQL](/2/2.4/macos-installation)
- [2.5 在 Linux 上安装 MySQL](/2/2.5/linux-installation)
- [2.6 使用不可破坏的 Linux 网络（ULN）安装 MySQL](/2/2.6/uln-installation)
- [2.7 在 Solaris 上安装 MySQL](/2/2.7/solaris-installation)
- [2.8 在 FreeBSD 上安装 MySQL](/2/2.8/freebsd-installation)
- [2.9 从源代码安装 MySQL](/2/2.9/source-installation)
- [2.10 安装后设置和测试](/2/2.10/postinstallation)
- [2.11 升级 MySQL](/2/2.11/upgrading)
- [2.12 降级 MySQL](/2/2.12/downgrading)
- [2.13 Perl 安装说明](/2/2.13/perl-support)
 

本章介绍如何获取和安装 MySQL。以下是流程摘要，后面的章节提供了详细信息。如果你计划将 MySQL 的现有版本升级为更新版本，而不是第一次安装 MySQL，参阅[章节 2.11，“升级 MySQL”](/2/2.11/upgrading)，了解升级过程的信息和升级前应考虑的问题。

如果你对从另一个数据库系统迁移到 MySQL 感兴趣，参阅[章节 A.8，“MySQL 8.0 常见问题解答：迁移”](/appendix/a/a.8/faqs-migration)，其中包含有关迁移问题的一些常见问题的答案。

MySQL 的安装通常遵循以下步骤：

1. **确定你的平台是否运行并支持 MySQL。**

  请注意，并非所有平台都同样适合运行 MySQL，而且并非所有已知运行 MySQL 的平台都得到 Oracle Corporation 的正式支持。有关官方支持的平台的信息，参阅 MySQL网站 https://www.mysql.com/support/supportedplatforms/database.html。

2. **选择要安装的发行版。**

  MySQL 有几个版本，大多数版本都有几种发行格式。你可以从包含二进制（预编译）程序或源代码的预打包发行版中进行选择。如有疑问，请使用二进制分布。Oracle 还为那些希望查看最新开发和测试新代码的人提供了对 MySQL 源代码的访问。要确定应该使用哪个版本和类型的发行版，参阅[章节 2.1.2，“安装哪个 MySQL 版本和发行版”](/2/2.1/2.1.2/which-version)。

3. **下载要安装的发行版。**

  有关说明，参阅[章节 2.1.3，“如何获取 MySQL”](/2/2.1/2.1.3/getting-mysql)。要验证分发的完整性，请使用[章节 2.1.4，“使用 MD5 校验和或 GnuPG 验证包完整性”](/2/2.1/2.1.4/verifying-package-integrity)中的说明。

4. **安装发行版。**

  要从二进制发行版安装 MySQL，请使用[章节 2.2，“使用通用二进制文件在 Unix/Linux 上安装 MySQL”](/2/2.2/binary-installation)中的说明。或者，使用《安全部署指南》，该指南提供了部署 MySQL Enterprise Edition Server 的通用二进制发行版的过程，该发行版具有管理 MySQL 安装安全性的功能。

  要从源发行版或当前开发源代码树安装 MySQL，请使用[章节 2.9，“从源代码安装 MySQL”中的说明](/2/2.9/source-installation)。

5. **执行任何必要的安装后设置。**

  安装 MySQL 后，参阅[章节 2.10，“安装后设置和测试”](/2/2.10/postinstallation)，了解有关确保 MySQL Server 正常工作的信息。也可参阅[章节 2.10.4，“保护初始 MySQL 帐户”](/2/2.10/2.10.4/default-privileges)中提供的信息。

  本节介绍如何保护初始 MySQL `root` 用户帐户的安全，该帐户在分配密码之前*没有密码*。本节适用于使用二进制或源发行版安装 MySQL。

6. 如果要运行 MySQL 基准脚本，必须提供对 MySQL 的 Perl 支持。参阅[章节 2.13，“Perl 安装说明”](/2/2.13/perl-support)。

有关在不同平台和环境上安装 MySQL 的说明可按平台提供：

- **Unix、Linux、FreeBSD**

  有关使用通用二进制文件（例如 `.tar.gz`包）在大多数 Linux 和 Unix 平台上安装 MySQL 的说明，参阅[章节 2.2，“使用通用二进制文件在 Unix/Linux 上安装 MySQL”](/2/2.2/binary-installation)。

  有关完全从源代码发行版或源代码存储库构建 MySQL 的信息，参阅[章节 2.9，“从源代码安装 MySQL”](/2/2.9/source-installation)。

  有关安装、配置和从源代码生成的特定平台帮助，请参阅相应的平台部分：

  - Linux，包括有关特定于发行版的方法的说明，参阅[章节 2.5，“在 Linux 上安装 MySQL”](/2/2.5/linux-installation)。

  - IBM AIX，参阅[章节 2.7，“在 Solaris 上安装 MySQL”](/2/2.7/solaris-installation)。

  - FreeBSD，参阅[章节 2.8，“在 FreeBSD 上安装 MySQL”](/2/2.8/freebsd-installation)。

- **Microsoft Windows**

  有关使用 MySQL 安装程序或压缩二进制文件在 Microsoft Windows 上安装 MySQL 的说明，参阅[章节 2.3，“在 Microsoft Windows 上安装 MySQL”](/2/2.3/windows-installation)。

  有关使用 Microsoft Visual Studio 从源代码构建 MySQL 的详细信息和说明，参阅[章节 2.9，“从源代码安装 MySQL”](/2/2.9/source-installation)。

- **macOS**

  有关 macOS 上的安装，包括使用二进制软件包和本机 PKG 格式，参阅[章节 2.4，“在 macOS 上安装 MySQL”](/2/2.4/macos-installation)。

  有关使用 macOS 启动守护程序自动启动和停止 MySQL 的信息，参阅[章节 2.4.3，“安装和使用 MySQL 启动守护程序”](/2/2.4/2.4.3/macos-installation-launchd)。

  有关 MySQL 偏好设置面板的信息，参阅[章节 2.4.4，“安装和使用 MySQL 偏好设置面板”](/2/2.4/2.4.4/macos-installation-prefpane)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/installing.html)
