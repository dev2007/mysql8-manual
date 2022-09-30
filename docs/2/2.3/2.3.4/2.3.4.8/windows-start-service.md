# 2.3.4.8 将 MySQL 作为 Windows 服务启动

在 Windows 上，推荐的运行 MySQL 的方法是将其作为 Windows 服务安装，以便在 Windows 启动和停止时，MySQL 自动启动和停止。作为服务安装的 MySQL 服务器也可以使用 .NET 命令或图形服务实用程序从命令行进行控制。通常，要将 MySQL 安装为 Windows 服务，你应该使用具有管理员权限的帐户登录。

**服务（Services）**实用程序（Windows **服务控制管理器**）可以在 Windows 控制面板中找到。为了避免冲突，建议在从命令行执行服务器安装或删除操作时关闭**服务（Services）**实用程序。

## 安装服务

在将 MySQL 安装为 Windows 服务之前，如果当前服务器正在运行，应首先使用以下命令停止当前服务器：

```bash
C:\> "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqladmin"
          -u root shutdown
```

::: tip 注意
如果 MySQL `root` 用户帐户有密码，则需要使用 `-p` 选项调用 [mysqladmin](/4/4.5/4.5.2/mysqladmin)，并在提示时提供密码。
:::

此命令调用 MySQL 管理实用程序 [mysqladmin](/4/4.5/4.5.2/mysqladmin) 以连接到服务器并告诉它关闭。该命令以 MySQL `root` 用户身份连接，这是 MySQL 授权系统中的默认管理帐户。

::: tip 注意
MySQL授权系统中的用户完全独立于Windows下的任何操作系统用户。
:::

使用以下命令将服务器安装为服务：

```bash
C:\> "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld" --install
```

服务安装命令不会启动服务器。本节后面将给出相关说明。

为了便于调用 MySQL 程序，你可以将 MySQL `bin` 目录的路径名添加到 Windows 系统 `PATH` 环境变量中：

- 在 Windows 桌面，右击“我的电脑”图标，选择“**属性**”

- 接着，从出现的“**系统属性**”菜单中选择“**高级**”页签，点击“`环境变量`”按钮。

- 在“**系统变量**”下，选择“**路径**”，然后点击“`编辑`”按钮。“**编辑系统变量**”的对话框将会展示。

- 将光标放在标有“**变量值**”的空格中显示的文本末尾。（使用 **End** 键确保光标位于该空间中文本的最末尾。）然后输入MySQL `bin` 目录的完整路径名（例如，`C:\Program Files\MySQL\MySQL Server 8.0\bin`），并且应该有一个分号将该路径与该字段中存在的任何值分隔开。通过单击“`OK`（确定）”关闭此对话框，并依次关闭每个对话框，直到所有打开的对话框都已关闭。现在，你应该能够通过在 DOS 提示符下从系统上的任何目录键入任何 MySQL 可执行程序的名称来调用该程序，而无需提供路径。这包括服务器、[mysql](/4/4.5/4.5.1/mysql) 客户端和所有 MySQL 命令行实用程序，如 [mysqladmin](/4/4.5/4.5.2/mysqladmin) 和 [mysqldump](/4/4.5/4.5.4/mysqldump)。

如果在同一台计算机上运行多个 MySQL 服务器，则不应将MySQL `bin` 目录添加到 Windows `PATH`。

::: warning 警告
手动编辑系统路径时，必须非常小心；意外删除或修改现有路径值的任何部分可能会导致系统出现故障，甚至无法使用。
:::

安装服务时可以使用以下附加参数：

- 你可以在 `--install` 选项之后立即指定服务名称。默认的服务名称是 `MySQL`。

- 如果提供了服务名称，则后面可以跟一个选项。按照惯例，这应该是 [--defaults-file=*file_name*](/4/4.2/4.2.2/4.2.2.3/option-file-options)，以指定选项文件的名称，服务器启动时应从中读取选项。

    可以使用 [--defaults-file](/4/4.2/4.2.2/4.2.2.3/option-file-options) 以外的单个选项，但不鼓励使用 [--defaults-file](/4/4.2/4.2.2/4.2.2.3/option-file-options) 这样可以更灵活，因为它允许你通过将服务器的多个启动选项放置在命名选项文件中来指定它们。

- 你还可以在服务名称后面指定 `--local-service` 选项。这会导致服务器使用具有有限系统权限的 `LocalService` Windows 帐户运行。如果在服务名称后面同时给出 [--defaults-file](/4/4.2/4.2.2/4.2.2.3/option-file-options) 和 `--local-service`，则它们可以是任意顺序。

对于作为 Windows 服务安装的 MySQL 服务器，以下规则确定服务器使用的服务名称和选项文件：

- 如果服务安装命令在 `--install` 选项之后没有指定服务名称或默认服务名称（MySQL），则服务器将使用 MySQL 的服务名称，并从标准选项文件中的[mysqld]组中读取选项。

- 如果服务安装命令在 `--install` 选项之后指定了 `MySQL` 以外的服务名称，则服务器将使用该服务名称。它从[mysqld]组和标准选项文件中与服务同名的组中读取选项。这使你能够使用[mysqld]组来选择所有MySQL服务都应该使用的选项，以及使用该服务名称安装的服务器使用的具有服务名称的选项组。

- 如果服务安装命令在服务名称后指定 [--defaults-file](/4/4.2/4.2.2/4.2.2.3/option-file-options) 选项，则服务器读取选项的方式与上一项中所述的相同，只是它仅从命名文件中读取选项，并忽略标准选项文件。

作为更复杂的例子，考虑以下命令：

```bash
C:\> "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld"
          --install MySQL --defaults-file=C:\my-opts.cnf
```

这里，默认服务名称（MySQL）在--install选项之后给出。如果没有给出 [--defaults-file](/4/4.2/4.2.2/4.2.2.3/option-file-options) 选项，该命令将导致服务器从标准选项文件中读取[mysqld]组。但是，由于存在 [--defaults-file](/4/4.2/4.2.2/4.2.2.3/option-file-options) 选项，服务器从[mysqld]选项组中读取选项，并且仅从命名文件中读取选项。

::: tip 注意
在 Windows 上，如果服务器以 [--defaults-file](/4/4.2/4.2.2/4.2.2.3/option-file-options) 和 [`--install`](/5/5.1/5.1.7/server-options) 选项启动，则 [`--install`](/5/5.1/5.1.7/server-options) 必须在前。否则，`mysqld.exe` 尝试启动 MySQL 服务器。
:::

在启动 MySQL 服务之前，你还可以在 Windows 服务实用程序中指定选项作为启动参数。

最后，在尝试启动 MySQL 服务之前，请确保要运行该服务的操作系统用户的用户变量 `%TEMP%` 和 `%TMP%`（以及 `%TMPDIR%`，如果已设置的话）指向该用户具有写入权限的文件夹。运行 MySQL 服务的默认用户是 `LocalSystem`，其 `%TEMP%` 和 `%TMP%` 的默认值是 `C:\Windows\TEMP`，`LocalSystem` 默认情况下有写入权限。但是，如果对默认设置有任何更改（例如，对运行服务的用户或所提到的用户变量的更改，或者 [--tmpdir](/5/5.1/5.1.7/server-options) 选项已用于将临时目录放在其他地方），MySQL 服务可能无法运行，因为未向适当的用户授予对临时目录的写访问权限。

## 启动服务

将 MySQL 服务器实例作为服务安装后，每当 Windows 启动时，Windows 都会自动启动该服务。还可以从**服务**实用程序立即启动该服务，或者使用 **sc start** *mysqld_service_name* 或 **NET START** *mysqld_service_name* 命令启动该服务。**SC** 和 **NET** 命令不区分大小写。

作为服务运行时，[mysqld](/4/4.3/4.3.1/mysqld) 无法访问控制台窗口，因此在那里看不到任何消息。如果 [mysqld](/4/4.3/4.3.1/mysqld) 没有启动，请检查错误日志，以查看服务器是否在那里写入了任何消息来指示问题的原因。错误日志位于 MySQL 数据目录中（例如，`C:\Program Files\MySQL\MySQL Server 8.0\data`）。它是后缀为 `.err` 的文件。

当 MySQL 服务器已作为服务安装，并且该服务正在运行时，Windows 会在 Windows 关闭时自动停止该服务。还可以使用**服务**实用程序、**sc stop** *mysqld_service_name* 命令、**NET STOP** *mysqld-service_name* 命令或 [mysqladmin -shutdown](/4/4.5/4.5.2/mysqladmin) 命令手动停止服务器。

如果不希望在引导过程中自动启动服务，你还可以选择将服务器安装为手动服务。为此，请使用 `--install -manual` 选项而不是 `--instal` 选项：

```bash
C:\> "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld" --install-manual
```

## 删除服务

要删除作为服务安装的服务器，请首先通过执行 **SC STOP** *mysqld_service_name* 或 **NET STOP** *mysqld_service_name* 来停止正在运行的服务器。然后使用 **SC DELETE** *mysqld_service_name* 将其删除：

```bash
C:\> SC DELETE mysql
```

或者，使用 [mysqld](/4/4.3/4.3.1/mysqld) [--remove](/5/5.1/5.1.7/server-options) 选项删除服务。

```bash
C:\> "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld" --remove
```

如果 [mysqld](/4/4.3/4.3.1/mysqld) 不是作为服务运行，则可以从命令行启动它。有关说明，参阅[章节 2.3.4.6，“从 Windows 命令行启动 MySQL”](/2/2.3/2.3.4/2.3.4.6/windows-start-command-line)。

如果在安装过程中遇到困难，参阅[章节 2.3.5，“Microsoft Windows MySQL 服务器安装故障排除”](/2/2.3/2.3.5/windows-troubleshooting)。

有关停止或删除 Windows 服务的详细信息，参阅[章节 5.8.2.2，“将多个 MySQL 实例作为 Windows 服务启动”](/5/5.8/5.8.2/5.8.2.2/multiple-windows-services)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/windows-start-service.html)
