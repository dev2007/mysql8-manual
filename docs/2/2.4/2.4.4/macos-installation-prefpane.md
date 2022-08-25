# 2.4.4 安装和使用 MySQL 首选项面板

MySQL 安装包包含一个 MySQL 首选项面板，允许你在启动 MySQL 安装期间启动、停止和控制自动启动。

默认情况下安装此首选项窗格，并在系统的*系统首选项*窗口下列出。

**图 2.20 MySQL 首选项面板：位置**

![MySQL Preference Pane: Locationj](../../_media/mac-installer-preference-pane-location.png)

MySQL 首选项面板与安装 MySQL 服务器的相同 DMG 文件一起安装。通常，它与 MySQL 服务器一起安装，但也可以自行安装。

要安装 MySQL 首选项面板：

1. 按照[章节 2.4.2，“使用本机软件包在 macOS 上安装 MySQL”](/2/2.4/2.4.2/macos-installation-pkg)中的说明，完成安装 MySQL 服务器的过程。

2. 单击**安装类型**步骤中的`自定义`。“首选项面板”选项在此处列出，并在默认情况下启用；确保未取消选择。可以选择或取消选择其他选项，如 MySQL 服务器。

**图 2.21 MySQL 包安装程序向导：自定义**

![MySQL Package Installer Wizard: Customize](../../_media/mac-installer-installation-type-customize.png)

3. 完成安装过程。

?> **注意** MySQL 首选项面板仅启动和停止从已安装在默认位置的 MySQL 包安装中安装的 MySQL 安装。

安装 MySQL 首选项面板后，你可以使用此首选项面板控制 MySQL 服务器实例。

**Instances** 页面包含启动和停止 MySQL 的选项，并`初始化数据库`以重新创建 `data/` 目录。`卸载`会卸载 MySQL 服务器以及可选的 pain 和 launchd 信息。

**Instances** 页面包含启动或停止 MySQL 的选项，并`初始化数据库`以重新创建 `data/` 目录。`卸载`会卸载 MySQL 服务器，可选地卸载 MySQL 首选项面板和启动信息。

**图 2.22 MySQL首选项窗格：Instances**

![MySQL Preference Pane: Instances](../../_media/mac-installer-preference-pane-instances.png)

配置页面显示 MySQL 服务器选项，包括 MySQL 配置文件的路径。

**图 2.23 MySQL首选项窗格：配置**

![MySQL Preference Pane: Configuration](../../_media/mac-installer-preference-pane-configuration.png)

MySQL 首选项面板显示 MySQL 服务器的当前状态，如果服务器未运行，则显示 **stopped**（红色），如果服务器已启动，则显示 **running**（绿色）。首选项面板还显示 MySQL 服务器是否已设置为自动启动的当前设置。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/macos-installation-prefpane.html)
