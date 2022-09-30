# 2.4 在 macOS 上安装 MySQL

- [2.4.1 在 macOS 上安装 MySQL 的通用说明](/2/2.4/2.4.1/macos-installation-notes)
- [2.4.2 使用本机软件包在 macOS 上安装 MySQL](/2/2.4/2.4.2/macos-installation-pkg)
- [2.4.3 安装和使用 MySQL 启动守护程序](/2/2.4/2.4.3/macos-installation-launchd)
- [2.4.4 安装和使用 MySQL 首选项面板](/2/2.4/2.4.4/macos-installation-prefpane)

有关 MySQL 服务器支持的 macOS 版本列表，参阅 https://www.mysql.com/support/supportedplatforms/database.html。

macOS 的 MySQL 有多种不同的形式：

- 本机软件包安装程序，它使用本机 macOS 安装程序（DMG）指导你完成 MySQL 的安装。有关更多信息，参阅[章节 2.4.2，“使用本机软件包在 macOS 上安装 MySQL”](/2/2.4/2.4.2/macos-installation-pkg)。你可以在 macOS 上使用软件包安装程序。用于执行安装的用户必须具有管理员权限。

- 压缩的 TAR 压缩包，它使用使用 Unix **tar** 和 **gzip** 命令打包的文件。要使用此方法，你需要打开一个终端窗口。使用此方法不需要管理员权限；你可以使用此方法在任何地方安装 MySQL 服务器。有关使用此方法的更多信息，你可以使用[章节 2.2，“使用通用二进制文件在 Unix/Linux 上安装 MySQL”](/2/2.2/binary-installation)中有关使用 tarball 的通用说明。

除了核心安装，软件包安装程序还包括[章节 2.4.3，“安装和使用 MySQL 启动守护程序”](/2/2.4/2.4.3/macos-installation-launchd)和[章节 2.2.4，“安装和使用 MySQL 首选项面板”](/2/2.4/2.4.4/macos-installation-prefpane)，以简化安装管理。

有关在 macOS 上使用 MySQL 的更多信息，参阅[章节 2.4.1，“在 macOS 中安装 MySQL 的通用说明”](/2/2.4/2.4.1/macos-installation-notes)。



> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/macos-installation.html)
