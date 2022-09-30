# 2.3.4.2 创建选项文件

如果在运行服务器时需要指定启动选项，可以在命令行中指示它们，也可以将它们放在选项文件中。对于每次服务器启动时使用的选项，您可能会发现使用选项文件指定MySQL配置最为方便。在以下情况下尤其如此：

- 安装或数据目录位置不同于默认位置（`C:\ProgramFiles\MySQL\MySQL Server 8.0` 和 `C:\Program Files\MySQL\MySQL Server 8.0\data`）。

- 你需要调整服务器设置，例如内存、缓存或InnoDB配置信息。

当 MySQL 服务器在 Windows 上启动时，它会在多个位置查找选项文件，例如 Windows 目录、`C:\`、MySQL 安装目录（有关位置的完整列表，参阅[章节 4.2.2.2，“使用选项文件”](/4/4.2/4.2.2/4.2.2.2/option-files)）。Windows 目录通常命名为 `C:\Windows`。你可以使用以下命令从 `WINDIR` 环境变量的值确定其确切位置：

```bash
C:\> echo %WINDIR%
```

MySQL 首先在 `my.ini` 文件中的每个位置查找选项，然后在 `my.cnf` 文件。但是，为了避免混淆，最好只使用一个文件。如果你的电脑使用 `C:` 不是引导驱动器的引导加载程序，你唯一的选择是使用 `my.ini` 文件。无论使用哪个选项文件，它都必须是纯文本文件。

::: tip 注意
当使用 MySQL 安装程序安装 MySQL 服务器时，它会在默认位置创建 `my.ini`，并且执行 MySQL 安装程序的用户被授予此新 `my.ini` 文件完全权限。换句话说，请确保 MySQL 服务器用户具有读取 `my.ini` 文件的权限。
:::

你还可以使用 MySQL 发行版中包含的示例选项文件；参阅[章节 5.1.2，“服务器配置默认值”](/5/5.1/5.1.2/server-configuration-defaults)。

可以使用任何文本编辑器（如记事本）创建和修改选项文件。例如，如果MySQL安装在E:\MySQL中，数据目录在E:\mydata\data中，则可以创建一个包含 [mysqld] 部分的选项文件，以指定 `basedir` 和 `datadir` 选项的值：

```bash
[mysqld]
# set basedir to your installation path
basedir=E:/mysql
# set datadir to the location of your data directory
datadir=E:/mydata/data
```

选项文件值中使用反斜杠的规则参阅[章节 4.2.2.2，“使用选项文件”](/4/4.2/4.2.2/4.2.2.2/option-files)。

ZIP 存档不包括 `data` 目录。要通过创建数据目录并填充 MySQL 系统数据库中的表来初始化 MySQL 安装，请使用 [`--initialize`](/5/5.1/5.1.7/server-options) 或 [`--initial unsecure`](/5/5.1/5.1.7/server-options) 初始化 MySQL。有关更多信息，请参阅[章节 2.10.1，“初始化数据目录”](/2/2.10/2.10.1/data-directory-initialization)。

如果要在其他位置使用数据目录，则应将数据目录的全部内容复制到新位置。例如，如果您想使用 `E:\mydata` 作为数据目录，则必须执行两项操作：

1. 将整个数据目录及其所有内容从默认位置（例如C:\Program Files\MySQL\MySQL Server 8.0\data）移动到E:\mydata。

2. 每次启动服务器时，使用 `--datadir` 选项指定新的数据目录位置。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/windows-create-option-file.html)