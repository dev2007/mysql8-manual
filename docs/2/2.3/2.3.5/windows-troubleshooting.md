# 2.3.5 Microsoft Windows MySQL 服务器安装故障排除

首次安装和运行 MySQL 时，你可能会遇到某些错误，导致 MySQL 服务器无法启动。本节帮助你诊断和纠正其中一些错误。

解决服务器问题时的第一个资源是[错误日志](/mysql_glossary/mysql_glossary.html)。MySQL 服务器使用错误日志记录与阻止服务器启动的错误相关的信息。错误日志位于 `my.ini` 文件指定的数据目录中。默认的数据目录位置是 `C:\Program Files\MySQL\MySQL Server 8.0\data`，或者在 Windows 7 和 Windows Server 2008 上是 `C:\ProgramData\MySQL`。默认情况下，`C:\ProgramData` 目录是隐藏的。你需要更改文件夹选项以查看目录和内容。有关错误日志和理解内容的更多信息，参阅[章节 5.4.2，“错误日志”](/5/5.4/5.4.2/error-log.html)。

有关可能错误的信息，也可参阅 MySQL 服务启动时显示的控制台消息。将 [mysqld](/4/4.3/4.3.1/mysqld.html)安装为服务后，使用命令行中的 **SC START** *mysqld_service_name* 或 **NET START** *mysqld_service_name* 命令查看有关将 MySQL 服务器作为服务启动的任意错误消息。参阅[章节 2.3.4.8，“将 MySQL 作为 Windows 服务启动”](/2/2.3/2.3.4/2.3.4.8/windows-start-service.html)。

以下示例显示了安装 MySQL 并首次启动服务器时可能遇到的其他常见错误消息：

- 如果 MySQL 服务器找不到 MySQL 权限数据库或其他关键文件，它将显示以下消息：

```bash
System error 1067 has occurred.
Fatal error: Can't open and lock privilege tables:
Table 'mysql.user' doesn't exist
```

当 MySQL 基础目录或数据目录安装在与默认位置不同的位置（分别为 `C:\Program Files\MySQL\MySQL Server 8.0` 和 `C:\Program Files\MySQL\MySQL Server 8.0\data`）时，通常会出现这些消息。

当 MySQL 升级并安装到新位置时，可能会出现这种情况，但配置文件不会更新以反映新位置。此外，新旧配置文件可能会冲突。升级 MySQL 时，请确保删除或重命名任何旧的配置文件。

如果你已将 MySQL 安装到 `C:\Program Files\MySQL\MySQL Server 8.0` 以外的目录，请确保 MySQL 服务器通过使用配置（`my.ini`）文件明确这一点。把 `my.ini` 文件放在 Windows 目录中，通常是 `C:\Windows`。要根据 `WINDIR` 环境变量的值确定其确切位置，请在命令提示符下发出以下命令：

```bash
C:\> echo %WINDIR%
```

你可以使用任何文本编辑器（如记事本）创建或修改选项文件。例如，如 果MySQL 安装在 `E:\MySQL` 中，数据目录为 `D:\MySQLdata`，则可以创建选项文件并设置 `[mysqld]` 部分来指定 `basedir` 和 `datadir` 选项的值：

```bash
[mysqld]
# set basedir to your installation path
basedir=E:/mysql
# set datadir to the location of your data directory
datadir=D:/MySQLdata
```

在选项文件中使用（正）斜杠而不是反斜杠指定 Microsoft Windows 路径名。如果确实使用反斜杠，请将其加倍：

```bash
[mysqld]
# set basedir to your installation path
basedir=C:\\Program Files\\MySQL\\MySQL Server 8.0
# set datadir to the location of your data directory
datadir=D:\\MySQLdata
```

选项文件值中使用反斜杠的规则见[章节 4.2.2.2，“使用选项文件”](/4/4.2/4.2.2/4.2.2.2/option-files.html)。

如果更改 MySQL 配置文件中的 `datadir` 值，则必须在重新启动 MySQL 服务器之前移动现有 MySQL 数据目录的内容。

参阅[章节 2.3.4.2，“创建选项文件”](/2/2.3/2.3.4/2.3.4.2/windows-create-option-file.html)。

- 如果你在不首先停止和删除现有 MySQL 服务的情况下重新安装或升级 MySQL，并使用 MySQL 安装程序安装 MySQL，你可能会看到此错误：

```bash
Error: Cannot create Windows service for MySql. Error: 0
```

当配置向导尝试安装服务并找到具有相同名称的现有服务时，会发生这种情况。

这个问题的一个解决方案是在使用配置向导时选择 `mysql` 以外的服务名称。这样可以正确安装新服务，但保留过时的服务。虽然这是无害的，但最好删除不再使用的旧服务。

要永久删除旧的 `mysql` 服务，请以具有管理权限的用户身份在命令行上执行以下命令：

```bash
C:\> SC DELETE mysql
[SC] DeleteService SUCCESS
```

如果 SC 实用程序不适用于你的 Windows 版本，请从 [http://www.microsoft.com/windows2000/techinfo/reskit/tools/existing/delsrv-o.asp](http://www.microsoft.com/windows2000/techinfo/reskit/tools/existing/delsrv-o.asp) 下载 `delsrv` 套件并使用 `delsrv mysql` 语法。

> [原谅链接](https://dev.mysql.com/doc/refman/8.0/en/windows-troubleshooting.html)
