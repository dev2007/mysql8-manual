# 2.9.8 MySQL 编译问题的处理

解决许多问题需要重新配置。如果要重新配置，请注意以下事项：

- 如果 **CMake** 在先前运行之后运行，则它可能会使用在先前调用期间收集的信息。此信息存储在 `CMakeCache.txt` 中。当 **CMake** 启动时，它会查找该文件并读取其内容（如果存在），前提是该信息仍然正确。重新配置时，该假设无效。
- 每次运行 **CMake** 时，都必须再次运行 **make** 以重新编译。但是，你可能希望首先从以前的版本中删除旧的对象文件，因为它们是使用不同的配置选项编译的。

要防止使用旧的对象文件或配置信息，请在重新运行 **CMake** 之前运行以下命令：

在 Unix：

```bash
$> make clean
$> rm CMakeCache.txt
```

在 Windows：

```bash
$> devenv MySQL.sln /clean
$> del CMakeCache.txt
```

如果你在源树之外构建，请在重新运行 **CMake** 之前删除并重新创建构建目录。有关在源树外部构建的说明，参阅[如何使用 CMake 构建 MySQL 服务器](https://dev.mysql.com/doc/internals/en/cmake.html)。

在某些系统上，由于系统包含文件的差异，可能会出现警告。以下列表描述了在编译 MySQL 时最常见的其他问题：

- 要定义要使用的 C 和 C++ 编译器，可以定义 `CC` 和 `CXX` 环境变量。例如：

    ```bash
    $> CC=gcc
    $> CXX=g++
    $> export CC CXX
    ```

    为了指定你自己的 C 和 C++ 编译器标志，使用 [CMAKE_C_FLAGS](/2/2.9/2.9.7/source-configuration-options.html#编译器标志) 和 [CMAKE_CXX_FLAGS](/2/2.9/2.9.7/source-configuration-options.html#编译器标志) CMake 选项。参阅[编译器标志](/2/2.9/2.9.7/source-configuration-options.html#编译器标志)。

    要查看可能需要指定哪些标志，携带 [--cflags](/4/4.7/4.7.1/mysql-config.html) 和 [--cxxflags](/4/4.7/4.7.1/mysql-config.html) 选项调用 [mysql_config](/4/4.7/4.7.1/mysql-config.html)。

- 要查看在编译阶段执行了哪些命令，请在使用 **CMake** 配置 MySQL 之后，运行 **make VERBOSE=1** 而不是 **make**。

- 如果编译失败，请检查是否启用了 [MYSQL_MAINTAINER_MODE](/2/2.9/2.9.7/source-configuration-options.html#特性选项) 选项。此模式会导致编译器警告变为错误，因此禁用它可能会使编译继续进行。

- 如果编译失败并出现以下任何错误，则必须将 **make** 版本升级为 GNU **make**：

    ```bash
    make: Fatal error in reader: Makefile, line 18:
    Badly formed macro assignment
    ```

    或：

    ```bash
    make: file `Makefile' line 18: Must be a separator (:
    ```

    或：

    ```bash
    pthread.h: No such file or directory
    ```

    众所周知，Solaris 和 FreeBSD 的 **make** 程序很麻烦。

    已知 GNU **make** 3.75 可以工作。

- `sql_yacc.cc` 文件是从 `sql_yac.yy` 生成的。通常，构建过程不需要创建 `sql_yacc`，因为 MySQL 附带一个预生成的副本。但是，如果确实需要重新创建它，则可能会遇到以下错误：

    ```bash
    "sql_yacc.yy", line xxx fatal: default action causes potential...
    ```

    这表明你的 **yacc** 版本有缺陷。你可能需要安装一个最新版本的 **bison**（**yacc** 的 GNU 版本）并使用它。

    早于 1.75 版本的 **bison** 可能会报告此错误：

    ```bash
    sql_yacc.yy:#####: fatal error: maximum table size (32767) exceeded
    ```

    实际未超过最大表大小；该错误是由旧版本 **bison** 中的错误引起的。

有关获取或更新工具的信息，参阅[章节 2.9，“从源代码安装 MySQL”](/2/2.9/source-installation.html)中的系统要求。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/compilation-problems.html)
