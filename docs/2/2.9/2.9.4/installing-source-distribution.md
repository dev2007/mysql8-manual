# 2.9.4 使用标准源分发安装 MySQL

要从标准源分发安装MySQL，请执行以下操作：

1. 验证你的系统是否满足[章节 2.9.2，“源安装前提条件”](/2/2.9/2.9.2/source-installation-prerequisites.html)中列出的工具要求。
2. 使用[章节 2.1.3，“如何获取 MySQL”](/2/2.1/2.1.3/getting-mysql.html)中的说明获取分发文件。
3. 使用本节中的说明配置、构建和安装分发。
4. 按照[章节 2.10，“安装后设置和测试”](/2/2.10/postinstallation.html)中的说明执行安装后程序。

MySQL 在所有平台上都使用 CMake 作为构建框架。此处给出的说明应使你能够制作一个工作的安装。有关使用 CMake 构建 MySQL 的更多信息，参阅[如何使用 CMake 构建 MySQL 服务器](https://dev.mysql.com/doc/internals/en/cmake.html)。

如果从源 RPM 开始，请使用以下命令创建可以安装的二进制 RPM。如果没有 **rpmbuild**，请改用 **rpm**。

```bash
$> rpmbuild --rebuild --clean MySQL-VERSION.src.rpm
```

结果是安装一个或多个二进制RPM包，如[章节 2.5.4，“使用 Oracle 的 RPM 包在 Linux 上安装 MySQL”](/2/2.5/2.5.4/linux-installation-rpm.html)所示。

从压缩 **tar** 文件或 Zip 存档源发行版安装的顺序与从通用二进制发行版安装过程类似（参阅[章节 2.2，“使用通用二进制在 Unix/Linux 上安装 MySQL”](/2/2.2/binary-installation.html)），不同之处在于它在所有平台上都使用，并包括配置和编译发行版的步骤。例如，对于 Unix 上的压缩 **tar** 文件源发行版，基本安装命令序列如下所示：

```bash
# Preconfiguration setup
$> groupadd mysql
$> useradd -r -g mysql -s /bin/false mysql
# Beginning of source-build specific instructions
$> tar zxvf mysql-VERSION.tar.gz
$> cd mysql-VERSION
$> mkdir bld
$> cd bld
$> cmake ..
$> make
$> make install
# End of source-build specific instructions
# Postinstallation setup
$> cd /usr/local/mysql
$> mkdir mysql-files
$> chown mysql:mysql mysql-files
$> chmod 750 mysql-files
$> bin/mysqld --initialize --user=mysql
$> bin/mysql_ssl_rsa_setup
$> bin/mysqld_safe --user=mysql &
# Next command is optional
$> cp support-files/mysql.server /etc/init.d/mysql.server
```

源构建特定指令的更详细版本如下所示。

:::tip 注意
此处显示的过程不会为 MySQL 帐户设置任何密码。遵循程序后，继续[章节 2.10，“安装后设置和测试”](/2/2.10/postinstallation.html)，进行安装后设置与测试。
:::

[[toc]]

## 执行预配置设置

在 Unix 上，设置用于运行和执行 MySQL 服务器的 `mysql` 用户和组，并拥有数据库目录。详细信息，参阅[创建 mysql 用户和组](/2/2.2/binary-installation.html#创建-mysql-用户和组)。除非另有说明，然后以 `mysql` 用户执行以下步骤。

## 获取并解压分发包

选择要解压缩分发的目录，并将其位置更改为该目录。

使用[章节 2.1.3，“如何获取 MySQL”](/2/2.1/2.1.3/getting-mysql.html)中的说明获取分发文件。

将分发解压到当前目录：

- 要解压压缩的 **tar** 文件，**tar** 可以解压分发（如果它支持 `z` 选项）：

    ```bash
    $> tar zxvf mysql-VERSION.tar.gz
    ```

    如果你的 **tar** 不支持 `z` 选项，请使用 **gunzip** 解压发行版，**tar** 再解压：

    ```bash
    $> gunzip < mysql-VERSION.tar.gz | tar xvf -
    ```

    或者，**CMake** 可以解压分发：

    ```bash
    $> cmake -E tar zxvf mysql-VERSION.tar.gz
    ```

- 要解压 Zip 压缩，请使用 **WinZip** 或其他可以读取 `.zip` 文件的工具。

## 配置分发

将位置更改为解压分发的顶级目录：

```bash
$> cd mysql-VERSION
```

在源树外部构建以保持树的清洁。如果顶级源目录在当前工作目录下命名为 `mysql-src`，则可以在同一级别构建名为 `bld` 的目录。创建目录并切换到那里：

```bash
$> mkdir bld
$> cd bld
```

配置生成目录。最小配置命令不包含覆盖配置默认值的选项：

```bash
$> cmake ../mysql-src
```

生成目录不必位于源树之外。例如，你可以在顶级源代码树下的名为 `bld` 的目录中构建。为此，从 `mysql-src` 作为当前工作目录开始，创建目录 `bld`，然后切换到：

```bash
$> mkdir bld
$> cd bld
```

配置生成目录。最小配置命令不包含覆盖配置默认值的选项：

```bash
$> cmake ..
```

如果您在同一级别有多个源树（例如，构建多个版本的 MySQL），则第二种策略可能是有利的。第一种策略将所有构建目录放在同一级别，这需要为每个目录选择一个唯一的名称。使用第二种策略，可以为每个源树中的构建目录使用相同的名称。以下说明采用了第二种策略。

在 Windows 上，指定开发环境。例如，以下命令分别为 32 位或 64 位版本配置 MySQL：

```bash
$> cmake .. -G "Visual Studio 12 2013"
$> cmake .. -G "Visual Studio 12 2013 Win64"
```

在 macOS 上，要使用 Xcode IDE：

```bash
$> cmake .. -G Xcode
```

运行 **cmake** 时，可能需要向命令行添加选项。以下是一些示例：

- [-DBUILD_CONFIG=mysql_release](/2/2.9/2.9.7/source-configuration-options.html#常规选项)：使用 Oracle 用于为 MySQL 官方版本生成二进制发行版的相同构建选项配置源代码。
- [-DCMAKE_INSTALL_PREFIX=dir_name](/2/2.9/2.9.7/source-configuration-options.html#安装布局选项)：配置分发以安装在特定位置。
- [-DCPACK_MONOLITHIC_INSTALL=1](/2/2.9/2.9.7/source-configuration-options.html#安装布局选项)：导致make包生成单个安装文件而不是多个文件。
- [-DWITH_DEBUG=1](/2/2.9/2.9.7/source-configuration-options.html#特性选项): 使用调试支持构建分发。

更多选项列表，参阅[章节 2.9.7，“MySQL 源配置选项”](/2/2.9/2.9.7/source-configuration-options.html)

要列出配置选项，请使用以下命令之一：

```bash
$> cmake .. -L   # overview
$> cmake .. -LH  # overview with help text
$> cmake .. -LAH # all params with help text
$> ccmake ..     # interactive display
```

如果 **CMake** 失败，你可能需要通过使用不同的选项再次运行它来重新配置。如果要重新配置，请注意以下事项：

- 如果 **CMake** 在先前运行之后运行，则它可能会使用在先前调用期间收集的信息。此信息存储在 `CMakeCache.txt` 中。当 **CMake** 启动时，它会查找该文件并读取其内容（如果存在），前提是该信息仍然正确。重新配置时，该假设无效。
- 每次运行 **CMake** 时，都必须再次运行 **make** 以重新编译。但是，你可能希望首先从以前的版本中删除旧的对象文件，因为它们是使用不同的配置选项编译的。

要防止使用旧的对象文件或配置信息，请在重新运行 **CMake** 之前，在 Unix 上的构建目录中运行以下命令：

```bash
$> make clean
$> rm CMakeCache.txt
```

或者，在 Windows 上：

```bash
$> devenv MySQL.sln /clean
$> del CMakeCache.txt
```

在询问 [MySQL Community Slack](https://mysqlcommunity.slack.com/) 之前，请检查 `CMakeFiles` 目录中的文件以获取有关失败的有用信息。要提交错误报告，请使用[章节 1.5，“如何报告错误或问题”](/1/1.5/bug-reports.html)中的说明。

## 构建分发

在 Unix：

```bash
$> make
$> make VERBOSE=1
```

第二个命令设置 `VERBOSE` 以显示每个编译源的命令。

在使用 GNU **make** 并且已安装为 **gmake** 的系统上使用 **gmake**。

在 Windows：

```bash
$> devenv MySQL.sln /build RelWithDebInfo
```

如果你已经进入编译阶段，但发行版尚未构建，参阅[章节 2.9.8，“处理 MySQL 编译问题”](/2/2.9/2.9.8/compilation-problems.html)以获取帮助。如果这不能解决问题，请使用[章节 1.5，“如何报告错误或问题”](/1/1.5/bug-reports.html)中给出的说明将其输入我们的错误数据库。如果您安装了所需工具的最新版本，并且它们在处理我们的配置文件时崩溃，请同时报告。但是，如果你收到`命令未找到（command not found）`错误或所需工具的类似问题，请不要报告。相反，请确保安装了所有所需工具，并且正确设置了 PATH 变量，以便shell可以找到它们。

## 安装分发

在 Unix：

```bash
$> make install
```

这将在配置的安装目录下安装文件（默认为 `/usr/local/mysql`）。你可能需要以 `root` 用户身份运行该命令。

要在特定目录中安装，请在命令行中添加 `DESTDIR` 参数：

```bash
$> make install DESTDIR="/opt/mysql"
```

或者，生成安装包文件，你可以将其安装到你喜欢的位置：

```bash
$> make package
```

此操作生成一个或多个 `.tar.gz` 文件，这些文件可以像通用二进制分发包一样安装。参阅[章节 2.2，“使用通用二进制文件在 Unix/Linux 上安装 MySQL”](/2/2.2/binary-installation.html)。如果在 [-DCPACK_MONOLITHIC_INSTALL=1](/2/2.9/2.9.7/source-configuration-options.html#安装布局选项) 的情况下运行 **CMake**，则该操作将生成一个文件。否则，它会生成多个文件。

在 Windows 上，生成数据目录，然后创建 `.zip` 压缩安装包：

```bash
$> devenv MySQL.sln /build RelWithDebInfo /project initial_database
$> devenv MySQL.sln /build RelWithDebInfo /project package
```

你可以在需要的地方安装生成的 `.zip` 存档。参阅[章节 2.3.4节，“使用非安装压缩包在 Microsoft Windows 上安装 MySQL”](/2/2.3/2.3.4/windows-install-archive.html)。

## 执行安装后设置

安装过程的其余部分包括设置配置文件、创建核心数据库和启动 MySQL 服务器。有关说明，参阅[章节 2.10，“安装后设置和测试”](/2/2.10/postinstallation.html)。

:::tip 注意
MySQL 授权表中列出的帐户最初没有密码。启动服务器后，应按照[章节 2.10，“安装后设置和测试”](/2/2.10/postinstallation.html)中的说明为其设置密码。
:::

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/installing-source-distribution.html)
