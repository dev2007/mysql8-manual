# 2.9.2 源安装前提条件

从源代码安装MySQL需要几个开发工具。无论你使用标准源代码发行版还是开发源代码树，都需要其中一些工具。其他工具要求取决于你使用的安装方法。
要从源代码安装MySQL，无论安装方法如何，都必须满足以下系统要求：

- **CMake**，它被用作所有平台上的构建框架。CMake可以从下载 [http://www.cmake.org](http://www.cmake.org)。

- 一个好的 **make** 程序。尽管有些平台自带  **make** 实现，但强烈建议你使用GNU make 3.75或更高版本。它可能已经作为gmake在你的系统上可用。GNU **make** 可从 [http://www.gnu.org/software/make/](http://www.gnu.org/software/make/)。

- 从MySQL 8.0.27 开始，MySQL 8.0 源代码允许使用 C++17 特性。为了在所有支持的平台上实现良好的 C++17 支持，以下最低编译器版本适用。

  - Linux: GCC 7.1 或 Clang 5
  - macOS: XCode 10
  - Solaris: GCC 10
  - Windows: Visual Studio 2019 Update 4

- MySQL C API 需要 C++ 或 C99 编译器来编译。
- 需要 SSL 库来支持加密连接、随机数生成的熵以及其他与加密相关的操作。默认情况下，构建使用安装在主机系统上的 OpenSSL 库。要显式指定库，请在调用 CMake 时使用 [WITH_SSL](/2/2.9/2.9.7/source-configuration-options.html) 选项。有关更多信息，参阅[章节 2.9.6，“配置 SSL 库支持”](/2/2.9/2.9.6/source-ssl-library-configuration.html)。
- 构建 MySQL 需要 Boost C++ 库（但不能使用它）。MySQL 编译需要特定的 Boost 版本。通常，这是当前的 Boost 版本，但如果特定的 MySQL 源发行版需要不同的版本，则配置过程会停止，并显示一条消息，指明所需的 Boost 版。要获取 Boost 及其安装说明，请访问官方网站。安装 Boost 后，通过在调用 **CMake** 时定义 [WITH_Boost](/2/2.9/2.9.7/source-configuration-options.html) 选项，告诉构建系统 Boost 文件的位置。例如：

```bash
cmake . -DWITH_BOOST=/usr/local/boost_version_number
```

按需调整路径以匹配你的安装。

- [ncurses](https://www.gnu.org/software/ncurses/ncurses.html) 库。

- 足够的可用内存。如果在编译大型源文件时遇到“internal compiler error（内部编译器错误）”等问题，可能是内存太少。如果在虚拟机上编译，请尝试增加内存分配。

- 如果你打算运行测试脚本，则需要 Perl。大多数类 Unix 系统包括 Perl。在 Windows 上，可以使用 ActiveState Perl 等版本。

要从标准源发行版安装 MySQL，需要以下工具之一来解压缩发行版文件：

- 对于 `.tar.gz` 压缩的 **tar** 文件：GNU `gunzip` 解压缩发布包，适用的 **tar** 解压缩。如果你的 **tar** 程序支持 `z` 选项，它可以解压缩和展开文件。

已知 GNU **tar** 可用。某些操作系统提供的标准 **tar** 无法解压缩 MySQL 发行版中的长文件名。你应该下载并安装 GNU **tar**，或者如果可以，使用预先安装的 GNU tar 版本。通常，它可以作为 **gnutar**、**gtar** 或 **tar** 在 GNU 或自由软件目录中提供，例如 `/usr/sfw/bin` 或 `/usr/local/bin`。GNU  **tar** 可从 [http://www.gnu.org/software/tar/](http://www.gnu.org/software/tar/)。

- 对于 `.zip` Zip 文件：**WinZip** 或其他可以读取 `.zip` 文件的工具。
- 对于 `.rpm` RPM 包：用于构建发行版的 **rpmbuild** 程序将其解压缩。

要从开发源树安装MySQL，需要以下附加工具：

- Gi t版本控制系统需要获得开发源码。[GitHub Help](https://help.github.com/) 提供了在不同平台上下载和安装 Git 的说明。MySQL 于2014年9月正式加入 GitHub。有关 MySQL 迁移到 GitHub 的更多信息，参阅 MySQL 发布工程博客上的公告：[GitHub 上的 MySQL](http://mysqlrelease.com/2014/09/mysql-on-github/)。

- **bison 2.1** 或更高版本，可从 [http://www.gnu.org/software/bison/](http://www.gnu.org/software/bison/)（不再支持版本 1。）尽可能使用最新版本的 bison；如果遇到问题，请升级到更高版本，而不是恢复到早期版本。

**bison** 可以从 [http://www.gnu.org/software/bison/](http://www.gnu.org/software/bison/) 获得。Windows 版 `.bison` 可以从 [http://gnuwin32.sourceforge.net/packages/bison.htm](http://gnuwin32.sourceforge.net/packages/bison.htm)。 下载标有“Complete package, excluding source（完整包，不包括源）”的包。在 Windows 上，**bison** 的默认位置是 `C:\Program Files\GnuWin32` 目录。由于目录名中的空格，一些实用程序可能无法找到 **bison**。此外，如果路径中有空格，VisualStudio 可能会挂起。你可以通过安装到不包含空格的目录（例如 `C:\GnuWin32`）来解决这些问题。

- 在 Solaris Express 上，除了 **bison** 之外，还必须安装 **m4**。**m4** 可从 [http://www.gnu.org/software/m4/](http://www.gnu.org/software/m4/) 获得。

:::tip 注意
如果必须安装任何程序，请修改 PATH 环境变量以包含程序所在的任何目录。参阅[章节 4.2.9，“设置环境变量”](/4/4.2./4.2.9/setting-environment-variables.html)。
:::

如果你遇到问题并需要提交错误报告，请使用[章节 1.6，“如何报告错误或问题”](/1/1.6/bug-reports.html)中的说明。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/source-installation-prerequisites.html)
