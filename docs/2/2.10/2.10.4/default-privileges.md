# 2.10.4 保护初始 MySQL 帐户

MySQL 安装过程包括初始化数据目录，包括 MySQL 系统模式中定义 MySQL 帐户的授权表。有关详细信息，参阅[章节 2.10.1，“初始化数据目录”](/2/2.10/2.10.1/data-directory-initialization.html)。

本节介绍如何为MySQL安装过程中创建的初始根帐户分配密码（如果尚未这样做）。

:::tip 注意
执行本节所述过程的替代方法：

- 在 Windows 上，你可以在安装 MySQL 安装程序的过程中执行该过程（参阅[章节 2.3.3，“Windows 版 MySQL 安装程序”](/2/2.3/2.3.3/mysql-installer.html)）。
- 在所有平台上，MySQL 分发都包含 [mysql_secure_installation](/4/4.4/4.4.2/mysql-secure-installation.html)，这是一个命令行实用程序，可以自动完成 MySQL 安装的大部分安全过程。
- 在所有平台上，MySQL Workbench 都是可用的，并提供了管理用户帐户的功能（参阅[章节 31，“MySQL Workbench”](/31/workbench.html)）。
:::

在以下情况下，密码可能已分配给初始帐户：

- 在 Windows 上，使用 MySQL 安装程序执行的安装提供了分配密码的选项。
- 使用 macOS 安装程序进行安装会生成初始随机密码，安装程序会在对话框中向用户显示该密码。
- 使用 RPM 软件包的安装会生成一个初始随机密码，该密码将写入服务器错误日志。
- 使用 Debian 软件包的安装提供了分配密码的选项。
- 对于使用 [mysqld --initialize](/4/4.3/4.3.1/mysqld.html) 手动执行的数据目录初始化，[mysqld](/4/4.3/4.3.1/mysqld.html) 生成一个初始随机密码，将其标记为过期，并将其写入服务器错误日志。参阅[章节 2.10.1，“初始化数据目录”](/2/2.10/2.10.1/data-directory-initialization.html)。

`mysql.user` 授权表定义了初始 MySQL 用户帐户及其访问权限。MySQL的安装只会创建一个 `'root'@'localhost'` 超级用户帐户，该帐户具有所有权限，可以执行任何操作。如果 `root` 密码为空，则 MySQL 安装将不受保护：任何人都能以 `root` *无需密码*连接到 MySQL 服务器，并被授予所有权限。

`'root'@'localhost'` 帐户在 `mysql.proxies_priv` 表中也有一行，该行允许授予 `''@''` 的 [PROXY](/6/6.2/6.2.2/privileges-provided.html) 权限，即所有用户和所有主机的代理权限。这使 `root` 用户能够设置代理用户，并将设置代理用户的权限委托给其他帐户。参阅[章节 6.2.19，“代理用户”](/6/6.2/6.2.19/proxy-users.html)。

要为初始 MySQL `root` 帐户分配密码，请使用以下过程。将示例中的 *root 密码*替换为要使用的密码。

如果服务器未运行，请启动服务器。有关说明，参阅[章节 2.10.2，“启动服务器”](/2/2.10/2.10.2/starting-server.html)。

初始 `root` 帐户可能有密码，也可能没有密码。选择以下任一适用流程：

- 如果 `root` 帐户的初始随机密码已过期，请使用该密码以 `root` 连接到服务器，然后选择新密码。如果数据目录是使用 [mysqld --initialize](/4/4.3/4.3.1/mysqld.html) 初始化的，可以手动初始化，也可以使用安装程序初始化，安装程序不允许你在安装操作期间指定密码。由于密码存在，你必须使用它连接到服务器。但是，由于密码已过期，在你选择新密码之前，你不能将该帐户用于除选择新密码之外的任何目的。

    a. 如果你不知道初始随机密码，请查看服务器错误日志。
    
    b. 使用密码以 `root` 连接到服务器：

    ```bash
    $> mysql -u root -p
    Enter password: (enter the random root password here)
    ```

    c. 选择新密码以替换随机密码：

    ```bash
    mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'root-password';
    ```

- 如果 `root` 帐户存在但没有密码，请以不使用密码的 `root` 连接到服务器，然后分配密码。如果你使用 [mysqld --initialize-insecure](/4/4.3/4.3.1/mysqld.html) 初始化数据目录，则会出现这种情况。

    a. 不使用密码以 `root` 连接到服务器：

    ```bash
    $> mysql -u root --skip-password
    ```

    b.分配密码：

    ```bash
    mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'root-password';
    ```

为 `root` 帐户分配密码后，无论何时使用该帐户连接到服务器，都必须提供该密码。例如，要使用 [mysql](/4/4.5/4.5.1/mysql.html) 客户端连接到服务器，请使用以下命令：

```bash
$> mysql -u root -p
Enter password: (enter root password here)
```

要使用 [mysqladmin](/4/4.5/4.5.2/mysqladmin.html) 关闭服务器，请使用以下命令：

```bash
$> mysqladmin -u root -p shutdown
Enter password: (enter root password here)
```

:::tip 注意
有关设置密码的更多信息，参阅[章节 6.2.14，“分配帐户密码”](/6/6.2/6.2.14/assigning-passwords.html)。如果在设置后忘记了 `root` 密码，参阅[章节 B.3.3.2，“如何重置根密码”](/b/b.3/b.3.3/b.3.3.2/resetting-permissions.html)。

要设置其他帐户，参阅[章节 6.2.8，“添加帐户、分配权限和删除帐户”](/6/6.2/6.2.8/creating-accounts.html)。
:::

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/default-privileges.html)
