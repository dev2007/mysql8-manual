# 2.3.4 使用非安装压缩包在 Microsoft Windows 上安装 MySQL

[2.3.4.1 解压安装压缩包](/2/2.3/2.3.4/2.3.4.1/windows-extract-archive)
[2.3.4.2 创建选项文件](/2/2.3/2.3.4/2.3.4.2/windows-create-option-file)
[2.3.4.3 选择 MySQL 服务器类型](/2/2.3/2.3.4/2.3.4.3/windows-select-server)
[2.3.4.4 初始化数据目录](/2/2.3/2.3.4/2.3.4.4/windows-initialize-data-directory)
[2.3.4.5 首次启动服务器](/2/2.3/2.3.4/2.3.4.5/windows-server-first-start)
[2.3.4.6 从 Windows 命令行启动 MySQL](/2/2.3/2.3.4/2.3.4.6/windows-start-command-line)
[2.3.4.7 自定义 MySQL 工具的路径](/2/2.3/2.3.4/2.3.4.7/mysql-installation-windows-path)
[2.3.4.8 将 MySQL 作为 Windows 服务启动](/2/2.3/2.3.4/2.3.4.8/windows-start-service)
[2.3.4.9 测试 MySQL 安装](/2/2.3/2.3.4/2.3.4.9/windows-testing)

从`非安装（noinstall）`包安装的用户可以使用本节中的说明手动安装 MySQL。从 ZIP 压缩包安装 MySQL 的过程如下：

1. 将主压缩包解压缩到所需的安装目录
  `可选`：如果计划执行 MySQL 基准测试和测试套件，还可以提取调试测试压缩包
2. 创建选项文件
3. 选择 MySQL 服务器类型
4. 初始化 MySQL
5. 启动 MySQL 服务器
6. 保护默认用户帐户

这一过程将在以下章节中描述。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/windows-install-archive.html)
