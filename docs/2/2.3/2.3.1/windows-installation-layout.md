# 2.3.1 Microsoft Windows上的 MySQL 安装布局

对于 Windows 上的 MySQL 8.0，默认安装目录是 `C:\Program Files\MySQL\MySQL Server 8.0`，用于使用 MySQL 安装程序执行的安装。如果使用 ZIP 存档方法安装 MySQL，你可能更喜欢在 `C:\MySQL` 中安装。但是，子目录的布局保持不变。

如下表所示的结构，所有文件都位于该父目录中。

**表 2.6 Microsoft Windows 的默认 MySQL 安装布局**

|目录|目录内容|备注|
|--|--|--|
|`bin`|mysqld 服务端、客户端和实用工具程序||
|`%PROGRAMDATA%\MySQL\MySQL Server 8.0\`|日志文件 、数据库|Windows 系统变量 `%PROGRAMDATA%`，默认为 `C:\ProgramData`。|
|`docs`|发布文档|同 MySQL 安装程序一起发布, 使用 `Modify` 操作选择可选文件夹。|
|`include`|包含（头）文件||
|`lib`|库||
|`share`|杂项支持文件，包括错误消息、字符集文件、示例配置文件、用于数据库安装的 SQL||

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/windows-installation-layout.html)
