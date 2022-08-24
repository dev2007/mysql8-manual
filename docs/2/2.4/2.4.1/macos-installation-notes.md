# 2.4.1 在 macOS 上安装 MySQL 的通用说明

你应记住以下问题和注意事项：

- **其他 MySQL 安装**：通过包管理器，如 Homebrew，安装过程中不能识别 MySQL 的安装。安装和升级过程适用于我们提供的 MySQL 包。如果存在其他安装，请考虑在执行此安装程序之前停止安装，以避免端口冲突。

    **Homebrew**：例如，如果你使用 Homebrew 将 MySQL 服务器安装到其默认位置，则 MySQL 安装程序将安装到其他位置，并且不会从 Homebrew 升级版本。在这种情况下，你将得到多个默认情况下尝试使用相同端口的 MySQL 安装。在运行此安装程序之前，请停止其他 MySQL 服务器实例，例如执行 *brew services stop mysql* 以停止 Homebrew 的 MySQL 服务。

- **Launchd**：安装了一个 Launchd 守护进程，用于更改 MySQL 配置选项。如果需要，请考虑对其进行编辑。有关更多信息，参阅下面的文档。此外，macOS 10.10 删除了启动项支持，支持启动守护进程。macOS **系统首选项**下的可选 MySQL 首选项面板使用 launchd 守护进程。

- **用户**：你可能需要（或希望）创建一个特定的 `mysql` 用户来拥有 MySQL 目录和数据。你可以通过**目录实用程序**实现这一点，`mysql` 用户应该已经存在。为了在单用户模式下使用，`_mysql` 的条目（注意下划线前缀）应该已经存在于系统 `/etc/passwd` 文件中。

- **数据**：由于 MySQL 包安装程序将 MySQL 内容安装到特定于版本和平台的目录中，因此你可以使用它在不同版本之间升级和迁移数据库。你需要将数据目录从旧版本复制到新版本，或者指定另一个 `datadir` 值来设置数据目录的位置。默认情况下，MySQL 目录安装在 `/usr/local/` 下。

- **别名**：你可能希望将别名添加到shell的资源文件中，以便于从命令行访问常用程序，如 [mysql](/4/4.5/4.5.1/mysql) 和 [mysqladmin](/4/4.5/4.5.2/mysqladmin)。**bash** 的语法为：

```bash
alias mysql=/usr/local/mysql/bin/mysql
alias mysqladmin=/usr/local/mysql/bin/mysqladmin
```

对 **tcsh**，则使用：

```bash
alias mysql /usr/local/mysql/bin/mysql
alias mysqladmin /usr/local/mysql/bin/mysqladmin
```

更好的方式是，将 `/usr/local/mysql/bin` 添加到 `PATH` 环境变量中。你可以通过修改 shell 合适的启动文件来实现这一点。更多信息，参阅[章节 4.2.1，“调用 MySQL 程序”](/4/4.2./4.2.1/invoking-programs)。

- **移除**：在复制了以前安装的 MySQL 数据库文件并成功启动新服务器之后，你应该考虑删除旧的安装文件以节省磁盘空间。此外，你还应该删除位于 `/Library/receives/mysql-VERSION.pkg` 中的包收据目录的旧版本。


> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/macos-installation-notes.html)
