# 2.4.3 安装和使用 MySQL 启动守护程序

macOS 使用启动守护进程来自动启动、停止和管理进程和应用程序，如 MySQL。

默认情况下，macOS 上的安装包（DMG）安装名为 `/Library/LaunchDaemons/com.oracle.oss.mysql.mysqld.plist` 的 launchd文件，包含如下内容的 plist 定义：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple Computer//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>             <string>com.oracle.oss.mysql.mysqld</string>
    <key>ProcessType</key>       <string>Interactive</string>
    <key>Disabled</key>          <false/>
    <key>RunAtLoad</key>         <true/>
    <key>KeepAlive</key>         <true/>
    <key>SessionCreate</key>     <true/>
    <key>LaunchOnlyOnce</key>    <false/>
    <key>UserName</key>          <string>_mysql</string>
    <key>GroupName</key>         <string>_mysql</string>
    <key>ExitTimeOut</key>       <integer>600</integer>
    <key>Program</key>           <string>/usr/local/mysql/bin/mysqld</string>
    <key>ProgramArguments</key>
        <array>
            <string>/usr/local/mysql/bin/mysqld</string>
            <string>--user=_mysql</string>
            <string>--basedir=/usr/local/mysql</string>
            <string>--datadir=/usr/local/mysql/data</string>
            <string>--plugin-dir=/usr/local/mysql/lib/plugin</string>
            <string>--log-error=/usr/local/mysql/data/mysqld.local.err</string>
            <string>--pid-file=/usr/local/mysql/data/mysqld.local.pid</string>
            <string>--keyring-file-data=/usr/local/mysql/keyring/keyring</string>
            <string>--early-plugin-load=keyring_file=keyring_file.so</string>
        </array>
    <key>WorkingDirectory</key>  <string>/usr/local/mysql</string>
</dict>
</plist>
```

::: tip 注意
一些用户报告说，添加 plist DOCTYPE 声明会导致 launchd 操作失败，尽管它通过了 lint 检查。我们怀疑这是复制粘贴错误。包含上述代码段的文件的 md5 校验和为 `d925f05f6d1b6ee5ce5451b596d6baed`。
:::

要启用launchd服务，你可以：

- 打开 macOS 系统首选项，选择 MySQL 首选项面板，然后执行`启动 MySQL 服务器`。

**图 2.18 MySQL 首选项面板：位置**

![MySQL Preference Pane: Location](../../_media/mac-installer-preference-pane-location.png)

**Instances** 页面包含启动或停止 MySQL 的选项，并初始化数据库以重新创建 `data/` 目录。`卸载` 能卸载 MySQL 服务器，可选地卸载 MySQL 首选项面板和启动信息。

**图 2.19 MySQL 首选项面板：实例**

![MySQL Preference Pane: Instances](../../_media/mac-installer-preference-pane-instances.png)

- 或者，手工加载 launchd 文件：

```bash
$> cd /Library/LaunchDaemons
$> sudo launchctl load -F com.oracle.oss.mysql.mysqld.plist
```

- 要将 MySQL 配置为在启动时自动启动，你可以：

```bash
$> sudo launchctl load -w com.oracle.oss.mysql.mysqld.plist
```

::: tip 注意
升级 MySQL 服务器时，launchd 安装过程会删除 MySQL 服务器 5.7.7 及以下版本中安装的旧启动项。升级还将替换现有的名为 `com.oracle.oss.mysql.mysqld.plist` 的 launchd 文件。
:::

更多 launchd 相关信息：

- plist 条目覆盖 `my.cnf` 条目，因为它们作为命令行参数传入。有关传入程序选项的更多信息，参阅[章节 4.2.2，“指定程序选项”](/4/4.2/4.2.2/program-options)。

- **ProgramArguments** 部分定义了传递到程序中的命令行选项，在本例中是 `mysqld` 二进制文件。

- 默认的 plist 定义是在考虑不太复杂的用例的情况下编写的。对于更复杂的设置，你可能需要删除一些参数，而是依赖 MySQL 配置文件，例如 `my.cnf`。

- 如果编辑 plist 文件，则在重新安装或升级 MySQL 时取消选中安装程序选项。否则，已编辑的 plist 文件将被覆盖，所有编辑都将丢失。

因为默认的 plist 定义定义了几个程序参数，所以你可以删除这些参数中的大部分，而依赖于你的 `my.cnf` MySQL 配置文件来定义它们。例如：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple Computer//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>             <string>com.oracle.oss.mysql.mysqld</string>
    <key>ProcessType</key>       <string>Interactive</string>
    <key>Disabled</key>          <false/>
    <key>RunAtLoad</key>         <true/>
    <key>KeepAlive</key>         <true/>
    <key>SessionCreate</key>     <true/>
    <key>LaunchOnlyOnce</key>    <false/>
    <key>UserName</key>          <string>_mysql</string>
    <key>GroupName</key>         <string>_mysql</string>
    <key>ExitTimeOut</key>       <integer>600</integer>
    <key>Program</key>           <string>/usr/local/mysql/bin/mysqld</string>
    <key>ProgramArguments</key>
        <array>
            <string>/usr/local/mysql/bin/mysqld</string>
            <string>--user=_mysql</string>
            <string>--basedir=/usr/local/mysql</string>
            <string>--datadir=/usr/local/mysql/data</string>
            <string>--plugin-dir=/usr/local/mysql/lib/plugin</string>
            <string>--log-error=/usr/local/mysql/data/mysqld.local.err</string>
            <string>--pid-file=/usr/local/mysql/data/mysqld.local.pid</string>
            <string>--keyring-file-data=/usr/local/mysql/keyring/keyring</string>
            <string>--early-plugin-load=keyring_file=keyring_file.so</string>
        </array>
    <key>WorkingDirectory</key>  <string>/usr/local/mysql</string>
</dict>
</plist>
```

在本例中，[basedir](/5/5.1/5.1.8/server-system-variables)、[datadir](/5/5.1/5.1.8/server-system-variables)、[plugin_dir](/5/5.1/5.1.8/server-system-variables)、[log_error](/5/5.1/5.1.8/server-system-variables)、[pid_file](/5/5.1/5.1.8/server-system-variables)、[keyring_file_data](/6/6.4/6.4.4/6.4.4.18/keyring-system-variables) 和 [--early-plugin-load](/5/5.1/5.1.7/server-options) 选项已从默认的 plist **ProgramArguments** 定义中删除，你可能已经在 `my.cnf` 中定义了。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/macos-installation-launchd.html)
