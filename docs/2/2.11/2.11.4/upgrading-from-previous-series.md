# 2.11.4 MySQL 8.0 中的更改

在升级到 MySQL 8.0 之前，请查看本节中描述的更改，以确定适用于当前 MySQL 安装和应用程序的更改。执行任何建议的操作。

标记为不兼容更改的更改与早期版本的 MySQL 不兼容，升级前可能需要注意。我们的目标是避免这些更改，但有时它们对于纠正比版本之间的不兼容性更糟糕的问题是必要的。如果适用于你的安装的升级问题涉及不兼容，请按照说明中给出的说明进行操作。

[[toc]]

## 数据字典变更

MySQL Server 8.0 包含一个全局数据字典，其中包含事务表中数据库对象的信息。在以前的 MySQL 系列中，字典数据存储在元数据文件和非事务系统表中。因此，升级过程要求你通过检查特定的先决条件来验证安装的升级准备情况。有关详细信息，参阅[章节 2.11.5，“准备升级安装”](/2/2.11/2.11.5/upgrade-prerequisites.html)。启用数据字典的服务器带来一些一般的操作差异；参见[章节 14.7，“数据字典使用差异”](/14/14.7/data-dictionary-usage-differences.html)。

## caching_sha2_password 作为首选认证插件

`caching_sha2_password` 和 `sha256_password` 认证插件提供了比 `mysql_native_password` 插件更安全的密码加密，而 `caching_sha2_password` 提供了比 `sha256_paassword` 更好的性能。由于 `caching_sha2_password` 的这些优越的安全性和性能特性，它是 MySQL 8.0 的首选认证插件，也是默认认证插件而不是 `mysql_native_password`。此更改同时影响服务器和 `libmysqlclient` 客户端库：

- 对于服务器，[default_authentication_plugin](/5/5.1/5.1.8/server-system-variables.html) 系统变量的默认值从 `mysql_native_password` 更改为 `caching_sha2_password`。

    此更改仅适用于安装或升级到 MySQL 8.0 或更高版本后创建的新帐户。对于已升级安装中的帐户，其认证插件保持不变。希望切换到 `caching_sha2_password` 的现有用户可以使用 [ALTER USER](/13/13.7/13.7.1/13.7.1.1/alter-user.html) 语句进行切换：

    ```bash
    ALTER USER user
        IDENTIFIED WITH caching_sha2_password
        BY 'password';
    ```

- `libmysqlclient` 库将 `caching_sha2_password` 作为默认认证插件，而不是 `mysql_native_password`。

以下各节讨论了 `caching_sha2_password` 这一更重要角色的含义：

- [caching_sha2_password 兼容性问题和解决方案](/2/2.11/2.11.4/upgrading-from-previous-series.html#caching_sha2_password-兼容性问题和解决方案)
- [caching_sha2_password 兼容的客户端和连接器](/2/2.11/2.11.4/upgrading-from-previous-series.html#caching_sha2_password-兼容的客户端和连接器)
- [caching_sha2_password 与 root 管理帐户](/2/2.11/2.11.4/upgrading-from-previous-series.html#caching_sha2_password-与-root-管理帐户)
- [caching_sha2_password 与复制](/2/2.11/2.11.4/upgrading-from-previous-series.html#caching_sha2_password-与复制)

### caching_sha2_password 兼容性问题和解决方案

:::danger 重要
如果你的 MySQL 安装必须为 8.0 之前的客户端提供服务，并且在升级到 MySQL 8.0 或更高版本后遇到兼容性问题，解决这些问题并恢复 8.0 之前的兼容性的最简单方法是重新配置服务器以恢复到以前的默认认证插件（`mysql_native_password`）。例如，在服务器选项文件中使用以下行：

```bash
[mysqld]
default_authentication_plugin=mysql_native_password
```

该设置使 8.0 之前的客户端能够连接到 8.0 服务器，直到安装时使用的客户端和连接器升级到了解 `caching_sha2_password` 为止。但是，应该将该设置视为临时的，而不是长期或永久的解决方案，因为它会导致使用有效设置创建的新帐户放弃 `caching_sha2_password` 提供的改进的认证安全性。
:::

与 `mysql_native_password` 相比，`caching_sha2_password` 的使用提供了更安全的密码哈希（并因此改进了客户端连接认证）。然而，它还具有兼容性影响，可能会影响现有 MySQL 安装：

- 尚未更新以了解 `caching_sha2_password` 的客户端和连接器可能无法连接到以 `caching_ssha2_password` 作为默认认证插件配置的 MySQL 8.0 服务器，甚至无法使用未使用 `caching_sha 2_password` 进行认证的帐户。出现此问题是因为服务器向客户端指定了其默认认证插件的名称。如果客户端或连接器基于客户端/服务器协议实现，而该协议实现无法优雅地处理无法识别的默认认证插件，则可能会失败，并出现以下错误之一：

    ```bash
    Authentication plugin 'caching_sha2_password' is not supported
    ```

    ```bash
    Authentication plugin 'caching_sha2_password' cannot be loaded:
    dlopen(/usr/local/mysql/lib/plugin/caching_sha2_password.so, 2):
    image not found
    ```

    ```bash
    Warning: mysqli_connect(): The server requested authentication
    method unknown to the client [caching_sha2_password]
    ```

    有关编写连接器以优雅地处理来自服务器的未知默认认证插件请求的信息，参阅[认证插件连接器编写注意事项](/6/6.2/6.2.17/pluggable-authentication.html#认证插件连接器编写注意事项)。

- 使用 `caching_sha2_password` 进行认证的帐户的客户端必须使用安全连接（使用 TLS/SSL 凭据的 TCP、Unix 套接字文件或共享内存），或使用 RSA 密钥对支持密码交换的未加密连接。此安全要求不适用于 `mysql_native_passsaid`，因此切换到 `caching_sha2_password` 可能需要额外的配置（参阅[章节 6.4.1.2，“缓存 SHA-2 可插拔认证”](/6/6.4/6.4.1/6.4.1.2/caching-sha2-pluggable-authentication.html)）。然而，默认情况下，MySQL 8.0 中的客户端连接更喜欢使用 TLS/SSL，因此已经符合该偏好的客户端可能不需要额外配置。

- 尚未更新以了解 `caching_sha2_password` 的客户端和连接器无法连接到使用 `caching_sha 2_password` 进行认证的帐户，因为它们无法识别此插件是否有效。（这是客户端/服务器身份验证插件兼容性要求如何应用的一个特定实例，如[认证插件客户端/服务器兼容性](/6/6.2/6.2.17/pluggable-authentication.html#认证插件客户端/服务器兼容性)中所讨论的。）要解决此问题，请从 MySQL 8.0 或更高版本中重新链接客户端与 `libmysqlclient`，或获取可识别 `caching_sha2_password` 的更新连接器。

- 因为 `caching_sha2_password` 现在也是 `libmysqlclient` 客户端库中的默认认证插件，所以对于从 MySQL 8.0 客户端到使用 `mysql_native_password` 的帐户的连接，认证需要在客户端/服务器协议中进行额外的往返（以前的默认认证插件），除非使用 [--default-auth=mysql_native_password](/4/4.2/4.2.3/connection-options.html) 选项调用客户端程序。

用于 8.0 之前版本 MySQL 的 `libmysqlclient` 客户端库能够连接到 MySQL 8.0服务器（使用 `caching_sha2_password` 进行认证的帐户除外）。这意味着基于 `libmysqlclient` 的 8.0 之前的客户端也应该能够连接。示例：

- 标准 MySQL 客户端（如 [mysql](/4/4.5/4.5.1/mysql.html) 和 [mysqladmin](/4/4.5./4.5.2/mysqladmin.html)）基于 `libmysqlclient`。
- Perl DBI 的 DBD:：mysql 驱动程序基于 `libmysqlclient`。
- MySQL Connector/Python 有一个基于 `libmysqlclient` 的 C 扩展模块。要使用它，请在连接时使用 `use_pure=False` 选项。

当现有的 MySQL 8.0 安装升级到 MySQL 8.0.4 或更高版本时，一些基于 `libmysqlclient` 的旧客户端如果是动态链接的，可能会“自动”升级，因为它们使用升级时安装的新客户端库。例如，如果 Perl DBI 的 DBD:：mysql 驱动程序使用动态链接，则可以在升级到 MySQL 8.0.4 或更高版本后使用 `libmysqlclient`，结果如下：

- 升级之前，使用 DBD:：mysql 的 DBI 脚本可以连接到 MySQL 8.0 服务器，但使用 `caching_sha2_password` 进行认证的帐户除外。
- 升级后，相同的脚本也可以使用 `caching_sha2_password` 帐户。

然而，出现上述结果是因为 8.0.4 之前的 MySQL 8.0 安装中的 `libmysqlclient` 实例是二进制兼容的：它们都使用共享库主版本号 21。对于从 MySQL 5.7 或更早版本链接到 `libmysqlclient` 的客户端，它们链接到具有不同版本号的共享库，该版本号与二进制不兼容。在这种情况下，为了与 MySQL 8.0 服务器和 `caching_sha2_password` 帐户完全兼容，必须根据 8.0.4 或更高版本的 `libmysqlclient` 重新编译客户端。

MySQL Connector/J 5.1 到 8.0.8 能够连接到 MySQL 8.0 服务器，但使用 `caching_sha2_password` 进行认证的帐户除外。（连接到 `caching_sha2_password` 帐户需要 Connector/J 8.0.9 或更高版本。）

使用客户端/服务器协议（而不是 `libmysqlclient`）实现的客户端可能需要升级到理解新认证插件的更新版本。例如，在 PHP 中，MySQL 连接通常基于 `mysqlnd`，而 `mysqlnd` 目前不知道 `caching_sha2_password`。在 `mysqlnd` 的更新版本可用之前，让 PHP 客户端连接到 MySQL 8.0 的方法是重新配置服务器以恢复到 `mysql_native_password` 作为默认认证插件，如前所述。

如果客户端或连接器支持显式指定默认认证插件的选项，请使用该选项来命名 `caching_sha2_password` 以外的插件。示例：

- 一些 MySQL 客户端支持 [--default-auth](/4/4.2/4.2.3/connection-options.html) 选项。（[mysql](/4/4.5/4.5.1/mysql.html) 和 [mysqladmin](/4/4.5./4.5.2/mysqladmin.html) 等标准 MySQL 客户端支持此选项，但可以成功连接到 8.0 服务器，而无需此选项。但是，其他客户端可能支持类似的选项。如果是这样，值得尝试。）

- 使用 `libmysqlclient` C API 的程序可以使用 `MYSQL_DEFAULT_AUTH` 选项调用 [mysql_options()](/5/5.4/5.4.54/mysql-options.html)函数。

- 使用客户端/服务器协议的本地 Python 实现的 MySQL Connector/Python 脚本可以指定 `auth_plugin` 连接选项。（或者，使用 Connector/Python C 扩展，它可以连接到 MySQL 8.0 服务器，而不需要 `auth_plugin`。）

### caching_sha2_password 兼容的客户端和连接器

如果客户端或连接器可用，并且已更新以了解 `caching_sha2_password`，则在连接到配置了 `caching_sha 2_password` 作为默认认证插件的 MySQL 8.0 服务器时，使用它是确保兼容性的最佳方式。

这些客户端和连接器已升级为支持 `caching_sha2_password`：

- MySQL 8.0（8.0.4 或更高版本）中的 `libmysqlclient` 客户端库。标准 MySQL 客户端（如 [mysql](/4/4.5/4.5.1/mysql.html) 和 [mysqladmin](/4/4.5./4.5.2/mysqladmin.html)）基于 `libmysqlclient`，因此它们也是兼容的。
- MySQL 5.7（5.7.23 或更高版本）中的 `libmysqlclient` 客户端库。标准 MySQL 客户端（如 [mysql](/4/4.5/4.5.1/mysql.html) 和 [mysqladmin](/4/4.5./4.5.2/mysqladmin.html)）基于 `libmysqlclient`，因此它们也是兼容的。
- MySQL Connector/C++1.1.11 或更高版本或 8.0.7 或更高。
- MySQL Connector/J 8.0.9 或更高版本。
- MySQL Connector/NET 8.0.10 或更高版本（通过经典 MySQL 协议）。
- MySQL Connector/Node.js 8.0.9 或更高版本。
- PHP：X DevAPI PHP扩展（mysql_xdevapi）支持 `caching_sha2_password`。

    PHP：PDO_MySQL 和 ext/mysqli 扩展不支持 `caching_sha2_password`。此外，当与 7.1.16 之前的 PHP 版本和 7.2.4 之前的 PHP 7.2 一起使用时，即使未使用 `caching_sha2_password`，它们也无法与 `default_authentication_plugin=caching_sha2_password` 连接。

### caching_sha2_password 与 root 管理帐户

对于 MySQL 8.0 的升级，认证插件现有帐户保持不变，包括 `'root'@'localhost'` 管理帐户的插件。

对于新的 MySQL 8.0 安装，当你初始化数据目录时（使用[章节 2.10.1，“初始化数据目录”](/2/2.10/2.10.1/data-directory-initialization.html)中的说明），将创建 `'root'@'localhost'` 帐户，该帐户默认使用 `caching_sha2_password`。要在数据目录初始化后连接到服务器，因此必须使用支持 `caching_sha2_password` 的客户端或连接器。如果你可以做到这一点，但更希望 `root` 帐户在安装后使用 `mysql_native_password`，请安装 MySQL 并像往常一样初始化数据目录。然后以 `root` 连接到服务器，并按如下方式使用 [ALTER USER](/13/13.7/13.7.1/13.7.1.1/alter-user.html) 更改帐户认证插件和密码：

```bash
ALTER USER 'root'@'localhost'
  IDENTIFIED WITH mysql_native_password
  BY 'password';
```

如果你使用的客户端或连接器尚不支持 `caching_sha2_password`，则可以使用修改后的数据目录初始化过程，在创建帐户后立即将 `root` 帐户与 `mysql_native_password` 关联起来。为此，请使用以下任一技术：

- 提供 [--default-authentication-plugin=mysql_native_password](/5/5.1/5.1.8/server-system-variables.html) 选项以及 [--initialize](/5/5.1/5.1.7/server-options.html) 或 [--initialize-insecure](/5/5.1/5.1.7/server-options.html)。
- 将选项文件中的 [default_authentication_plugin](/5/5.1/5.1.8/server-system-variables.html) 设置为 `mysql_native_password`，并使用 [--defaults-file](/5/5.1/5.1.7/server-options.html) 选项以及 [--initialize](/5/5.1/5.1.7/server-options.html) 或 [--initialize-insecure](/5/5.1/5.1.7/server-options.html) 来命名该选项文件。（在这种情况下，如果你继续将该选项文件用于后续的服务器启动，则将使用 `mysql_native_password` 而不是 `caching_sha2_password` 创建新帐户，除非你从选项文件中删除 [default_authentication_plugin](/5/5.1/5.1.8/server-system-variables.html) 设置。）

### caching_sha2_password 与复制

在所有服务器都已升级到 MySQL 8.0.4 或更高版本的复制场景中，到源服务器的副本连接可以使用使用 `caching_sha2_password` 进行认证的帐户。对于此类连接，与使用使用 `caching_sha2_password` 进行认证的帐户的其他客户端相同的要求：使用安全连接或基于 RSA 的密码交换。

要连接到源/副本复制的 `caching_sha2_password` 帐户，请执行以下操作：

- 使用以下任一 [CHANGE MASTER TO](/13/13.4/13.4.2/13.4.2.1/change-master-to.html) 选项：

    ```bash
    MASTER_SSL = 1
    GET_MASTER_PUBLIC_KEY = 1
    MASTER_PUBLIC_KEY_PATH='path to RSA public key file'
    ```

- 或者，如果在服务器启动时提供了所需的密钥，则可以使用与 RSA 公钥相关的选项。

要连接到组复制的 `caching_sha2_password` 帐户，请执行以下操作：

- 对于使用 OpenSSL 构建的 MySQL，请设置以下任何系统变量：

    ```bash
    SET GLOBAL group_replication_recovery_use_ssl = ON;
    SET GLOBAL group_replication_recovery_get_public_key = 1;
    SET GLOBAL group_replication_recovery_public_key_path = 'path to RSA public key file';
    ```

- 或者，如果在服务器启动时提供了所需的密钥，则可以使用与 RSA 公钥相关的选项。

## 配置变更

- **不兼容的变更**：MySQL 存储引擎现在负责提供自己的分区处理程序，MySQL 服务器不再提供通用分区支持。[InnoDB](innodb-storage-engine.html) 和 NDB 是唯一提供 MySQL 8.0 支持的本地分区处理程序的存储引擎。使用任何其他存储引擎的分区表必须进行更改，以将其转换为 `InnoDB` 或 `NDB`，或者在升级服务器之前删除其分区，否则以后将无法使用。

有关将 `MyISAM` 表转换为 `InnoDB` 的信息，参阅[章节 15.6.1.5，“将表从 MyISAM 转换为 InnoDB”](/15/15.6/15.6.1/15.6.1.5/converting-tables-to-innodb.html)。

在 MySQL 8.0 中，如果表创建语句将导致使用不支持此支持的存储引擎创建分区表，则该语句将失败，并出现错误（`ER_CHECK_NOT_IMPLEMENTED`）。如果你使用 [mysqldump](/4/4.5/4.5.4/mysqldump.html) 将数据库从 MySQL 5.7（或更早版本）中创建的转储文件导入 MySQL 8.0 服务器，则必须确保创建分区表的任何语句都不会指定不受支持的存储引擎，方法是删除对分区的任何引用，或将存储引擎指定为 `InnoDB` 或允许默认设置为 `InnoDB`。

:::tip 注意
[章节 2.11.5，“准备升级安装”](/2/2.11/2.11.5/upgrade-prerequisites.html)中给出的过程描述了如何识别升级到 MySQL 8.0 之前必须更改的分区表。
:::

有关详细信息，参阅[章节 24.6.2，“与存储引擎相关的分区限制”](/24/24.6/24.6.2/partitioning-limitations-storage-engines.html)。

- **不兼容的变更**：未使用多个服务器错误代码并已删除（有关列表，参阅 [MySQL 8.0 中移除的特性](/1/1.3/mysql-nutshell.html#mysql-8-0-移除的特性)）。应更新专门针对其中任何一个进行测试的应用程序。

- 重要变更：默认字符集已从 `latin1` 更改为 `utf8mb4`。这些系统变量受到影响：

    - [character_set_server](/5/5.1/5.1.8/server-system-variables.html) 和 [character_set_database](/5/5.1/5.1.8/server-system-variables.html) 系统变量的默认值已从 `latin1` 更改为 `utf8mb4`。
    - [collation_server](/5/5.1/5.1.8/server-system-variables.html) 和 [collation_database](/5/5.1/5.1.8/server-system-variables.html) 系统变量的默认值已从 `latin1_swedish_ci` 更改为 `utf8mb4_0900_ai_ci`。


因此，除非指定了显式字符集和排序规则，否则新对象的默认字符集和排列规则与以前不同。这包括数据库和其中的对象，例如表、视图和存储程序。假设使用了以前的默认值，保留它们的一种方法是使用 `my.cnf` 文件中的以下行启动服务器：

```bash
[mysqld]
character_set_server=latin1
collation_server=latin1_swedish_ci
```

在复制设置中，当从 MySQL 5.7 升级到 8.0 时，建议在升级之前将默认字符集更改回 MySQL 5.7 中使用的字符集。升级完成后，默认字符集可以更改为 `utf8mb4`。

- **不兼容的变更**：从 MySQL 8.0.11 开始，禁止使用与服务器初始化时使用的设置不同的 [lower_case_table_names](/5/5.1/5.1.8/server-system-variables.html) 设置启动服务器。这种限制是必要的，因为各种数据字典表字段使用的排序规则基于服务器初始化时定义的 [lower_case_table_names](/5/5.1/5.1.8/server-system-variables.html) 设置，并且使用不同的设置重新启动服务器会导致标识符排序和比较方式不一致。

## 服务器变更

- 在 MySQL 8.0.11 中，与帐户管理相关的几个不推荐使用的功能已被删除，例如使用 [GRANT](/13/13.7/13.7.1/13.7.1.6/grant.html) 语句修改用户帐户的非特权特性、 `NO_AUTO_CREATE_USER` SQL 模式、`PASSWORD()` 函数和 `old_passwords` 系统变量。

    从 MySQL 5.7 到 8.0 复制引用这些已删除功能的语句可能会导致复制失败。使用任何已删除功能的应用程序应进行修改，以避免使用这些功能，并在可能的情况下使用其他功能，如 MySQL 8.0 中已删除的功能中所述。

    为了避免 MySQL 8.0 上的启动失败，请从 MySQL 选项文件中的 [sql_mode](/5/5.1/5.1.8/server-system-variables.html) 系统变量设置中删除 `NO_AUTO_CREATE_USER` 的任何实例。

    将存储程序定义中包含 `NO_AUTO_CREATE_USER` SQL 模式的转储文件加载到 MySQL 8.0 服务器会导致失败。从 MySQL 5.7.24 和 MySQL 8.0.13 开始，[mysqldump](/4/4.5/4.5.4/mysqldump.html) 从存储的程序定义中删除 `NO_AUTO_CREATE_USER`。必须手动修改使用早期版本的 [mysqldump](/4/4.5/4.5.4/mysqldump.html) 创建的转储文件，以删除 `NO_AUTO_CREATE_USER` 的实例。

- 在 MySQL 8.0.11 中，删除了这些不推荐的兼容 SQL 模式：`DB2`、`MAXDB`、`MSSQL`、`MYSQL323`、`MYSQL40`、`ORACLE`、`POSTGRESQL`、`NO_FIELD_OPTIONS`、`NO_KEY_OPTIONS`、`NO_TABLE_OPTIONS`。它们不能再被分配给 [sql_mode](/5/5.1/5.1.8/server-system-variables.html) 系统变量或用作 [mysqldump](/4/4.5/4.5.4/mysqldump.html) [--compatible](/4/4.5/4.5.4/mysqldump.html) 选项的允许值。

    删除 MAXDB 意味着 [CREATE TABLE](/13/13.1/13.1.20/create-table.html) 或 [ALTER TABLE](/13/13.1/13.1.9/alter-table.html) 的 `TIMESTAMP` 数据类型不再被视为 [DATETIME](/11/11.2/11.2.2/datetime.html)。

    从 MySQL 5.7 到 8.0 复制引用已删除 SQL 模式的语句可能会导致复制失败。这包括复制存储程序（存储过程和函数、触发器和事件）的 `CREATE` 语句，这些程序在当前 [sql_mode](/5/5.1/5.1.8/server-system-variables.html) 值包含任何删除的模式时执行。应修改使用任何已删除模式的应用程序，以避免使用这些模式。

- 从 MySQL 8.0.3 开始，空间数据类型允许 `SRID` 属性，以显式指示存储在列中的值的空间参考系统（SRS）。参阅[章节 11.4.1，“空间数据类型”](/11/11.4/11.4.1/spatial-type-overview.html)。

    具有显式 `SRID` 属性的空间列受 SRID 限制：该列只接受具有该 ID 的值，列上的 `SPATIAL` 索引将由优化器使用。优化器忽略没有 `SRID` 属性的空间列上的 `SPATIAL` 索引。参阅[章节 8.3.3，“空间索引优化”](/8/8.3/8.3.3/spatial-index-optimization.html)。如果希望优化器考虑不受 `SRID` 限制的空间列上的 `SPATIAL` 索引，则应修改每个此类列：

    - 验证列中的所有值是否具有相同的 SRID。要确定几何体列 *col_name* 中包含的 SRID，请使用以下查询：

        ```bash
        SELECT DISTINCT ST_SRID(col_name) FROM tbl_name;
        ```

        如果查询返回多行，则该列包含 SRID 的混合。在这种情况下，修改其内容，使所有值都具有相同的 SRID。

    - 重新定义列以具有显式 `SRID` 属性。

    - 重新创建 `SPATIAL` 索引。

- MySQL 8.0.0 中删除了几个空间函数，原因是空间函数名称空间的更改，为执行精确操作的函数实现了 `ST_` 前缀，或为基于最小边界矩形执行操作的函数提供了 `MBR` 前缀。在生成的列定义中使用删除的空间函数可能会导致升级失败。在升级之前，运行 [mysqlcheck --check-upgrade](/4/4.5/4.5.3/mysqlcheck.html) 已删除的空间函数的升级，并将找到的空间函数替换为 `ST_` 或 `MBR` 命名的替换。有关删除的空间函数的列表，参阅 [MySQL 8.0 中移除的特性](/1/1.3/mysql-nutshell.html#mysql-8-0-移除的特性)。

- 当执行到 MySQL 8.0.3 或更高版本的就地升级时，[BACKUP_ADMIN](/6/6.2/6.2.2/privileges-provided.html) 权限将自动授予具有 [RELOAD](/6/6.2/6.2.2/privileges-provided.html) 权限的用户。

- 从 MySQL 8.0.13 开始，由于基于行或混合复制模式与基于语句的复制模式在处理临时表的方式上存在差异，因此在运行时切换二进制日志记录格式有新的限制。

    - 如果会话有任何打开的临时表，则不能使用 `SET@@SESSION.binlog_format`。

    - 如果任何复制通道有任何打开的临时表，则不能使用 `SET@@global.binlog_format` 和 `SET@@persist.binlog-format`。如果复制通道具有打开的临时表，则允许 `SET@@persist_only.binlog_format`，因为与 `PERSIST` 不同，`PERSIST_ONLY` 不会修改运行时全局系统变量值。

    - 如果任何复制通道应用程序正在运行，则不能使用 `SET@@global.binlog_format` 和 `SET@@persist.binlog-format`。这是因为更改仅在复制通道的应用程序重新启动时生效，此时复制通道可能具有打开的临时表。这种行为比以前更具限制性。如果任何复制通道应用程序正在运行，则允许 `SET@@persist_only.binlog_format`。

    - 在 MySQL 8.0.27 中，为 [internal_tmp_mem_storage_engine](/5/5.1/5.1.8/server-system-variables.html) 配置会话设置需要 [SESSION_VARIABLES_ADMIN](/6/6.2/6.2.2/privileges-provided.html) 或[SYSTEM_VARIABLES_ADMIN](/6/6.2/6.2.2/privileges-provided.html) 权限。

    - 从 MySQL 8.0.27 开始，克隆插件允许在进行克隆操作时对供体 MySQL 服务器实例执行并发 DDL 操作。以前，在克隆操作期间会保留一个备份锁，以防止在供体上并发 DDL。要恢复到以前在克隆操作期间阻止施主上并发 DDL 的行为，请启用 [clone_block_ddl](/5/5.6/5.6.7/5.6.7.13/clone-plugin-options-variables.html) 变量。参阅[章节 5.6.7.4，“克隆和并发 DDL”](/5/5.6/5.6.7/5.6.7.4/clone-plugin-concurrent-ddl.html)。

- 从 MySQL 8.0.30 开始，启动时 [log_error_services](/5/5.1/5.1.8/server-system-variables.html) 值中列出的错误日志组件在 MySQL 服务器启动序列的早期被隐式加载。如果以前使用 [INSTALL COMPONENT](/13/13.7/13.7.4/13.7.4.3/install-component.html) 安装了可加载的错误日志组件，并且在启动时（例如，从选项文件）读取的 [log_error_services](/5/5.1/5.1.8/server-system-variables.html) 设置中列出了这些组件，则应更新配置以避免出现启动警告。有关详细信息，参阅[错误日志配置方法](/5/5.4/5.4.2/5.4.2.1/error-log-configuration.html#错误日志配置方法)。

## InnoDB 变更

- 基于 `InnoDB` 系统表的 [INFORMATION_SCHEMA](/26/information-schema.html) 视图被数据字典表的内部系统视图所取代。受影响的 `InnoDB` [INFORMATION_SCHEMA](/26/information-schema.html) 视图已重命名：

**表 2.16 重命名的 InnoDB 信息架构视图**

|旧名称|新名称|
|--|--|
|`INNODB_SYS_COLUMNS`|`INNODB_COLUMNS`|
|`INNODB_SYS_DATAFILES`|`INNODB_DATAFILES`|
|`INNODB_SYS_FIELDS`|`INNODB_FIELDS`|
|`INNODB_SYS_FOREIGN`|`INNODB_FOREIGN`|
|`INNODB_SYS_FOREIGN_COLS`|`INNODB_FOREIGN_COLS`|
|`INNODB_SYS_INDEXES`|`INNODB_INDEXES`|
|`INNODB_SYS_TABLES`|`NNODB_TABLES`|
|`INNODB_SYS_TABLESPACES`|`INNODB_TABLESPACES`|
|`INNODB_SYS_TABLESTATS`|`INNODB_TABLESTATS`|
|`INNODB_SYS_VIRTUAL`|`INNODB_VIRTUAL`|

升级到 MySQL 8.0.3 或更高版本后，更新引用先前 `InnoDB` [INFORMATION_SCHEMA](/26/information-schema.html) 视图名称的所有脚本。

- 与MySQL捆绑的zlib库版本从1.2.3版提升到1.2.11版。

zlib 1.2.11 中的 zlib `compressBound()` 函数返回的缓冲区大小估计值比 zlib 1.2.3 版本中的稍高。`compressBound()` 函数由 `InnoDB` 函数调用，用于确定创建压缩 `InnoDB` 表或在压缩 `InnoDB` 表格中插入和更新行时允许的最大行大小。因此，行大小非常接近早期版本中成功的最大行大小的 [CREATE TABLE ... ROW_FORMAT=COMPRESSED](/13/13.1/13.1.20/create-table.html)、[INSERT](/13/13.2/13.2.7/insert.html) 和 [UPDATE](/13/13.2/13.2.17/update.html) 操作现在可能会失败。为了避免这个问题，在升级之前，在 MySQL 8.0 测试实例上测试压缩的 `InnoDB` 表的 [CREATE TABLE](/13/13.1/13.1.20/create-table.html) 语句，其中包含大行。

- 随着 [--innodb-directories](/15/15.14/innodb-parameters.html) 特性的引入，每个表的文件位置以及使用绝对路径或在数据目录之外的位置创建的常规表空间文件应添加到 [--innodb-directories](/15/15.14/innodb-parameters.html) 参数值中。否则，`InnoDB` 无法在恢复期间找到这些文件。要查看表空间文件位置，请查询 [INFORMATION_SCHEMA.FILES](/26/26.3/26.3.15/information-schema-files-table.html) 表：

```bash
SELECT TABLESPACE_NAME, FILE_NAME FROM INFORMATION_SCHEMA.FILES \G
```

- 撤消日志不能再驻留在系统表空间中。在 MySQL 8.0 中，默认情况下，撤消日志驻留在两个撤消表空间中。有关详细信息，参阅[章节 15.6.3.4，“撤消表空间”](/15/15.6/15.6/15.6.3/15.6.3.4/innodb-undo-tablespaces.html)。

从 MySQL 5.7 升级到 MySQL 8.0 时，MySQL 5.7 实例中存在的所有撤消表空间都将被删除，并由两个新的默认撤消表空间替换。默认撤消表空间是在 [innodb_undo_directory](/15/15.14/innodb-parameters.html) 变量定义的位置创建的。如果 [innodb_undo_directory](/15/15.14/innodb-parameters.html) 变量未定义，将在数据目录中创建 undo 表空间。从 MySQL 5.7 升级到 MySQL 8.0 需要缓慢关闭，以确保 MySQL 5.7 实例中的 undo 表空间为空，从而可以安全删除它们。

当从早期的 MySQL 8.0 版本升级到 MySQL 8.0.14 或更高版本时，由于 [innodb_undo_tablespaces](/15/15.14/innodb-parameters.html) 设置大于 2 而存在于升级前实例中的 undo 表空间将被视为用户定义的 undo 表格空间，升级后可以分别使用 [ALTER UNDO TABLESPACE](/13/13.1/13.1.10/alter-tablespace.html) 和 [DROP UNDO TABLESPACE](/13/13.1/13.1.33/drop-tablespace.html) 语法停用和删除这些空间。在 MySQL 8.0 发布系列中升级可能并不总是需要缓慢关闭，这意味着现有的撤消表空间可能包含撤消日志。因此，升级过程不会删除现有的撤消表空间。

- **不兼容的变更**：从 MySQL 8.0.17 开始，[CREATE TABLESPACE ... ADD DATAFILE](/13/13.1/13.1.10/alter-tablespace.html) 子句不允许循环目录引用。例如，不允许在以下语句中使用循环目录引用（`/../`）：

```bash
CREATE TABLESPACE ts1 ADD DATAFILE ts1.ibd 'any_directory/../ts1.ibd';
```

Linux上 存在限制的例外，如果前面的目录是符号链接，则允许循环目录引用。例如，如果 *any_directory* 是符号链接，则允许使用上面示例中的数据文件路径。（数据文件路径仍然允许以 `'../'` 开头。）

为了避免升级问题，请在升级到 MySQL 8.0.17 或更高版本之前，从表空间数据文件路径中删除任何循环目录引用。要检查表空间路径，请查询 [INFORMATION_SCHEMA.INNODB_DATAFILES](/26/26.4/26.4.10/information-schema-innodb-datafiles-table.html) 表。

- 由于 MySQL 8.0.14 中引入了回归，对于分区表和 [lower_case_table_names=1](/5/5.1/5.1.8/server-system-variables.html) 的实例，在区分大小写的文件系统上从 MySQL 5.7 或 MySQL 8.0.14 之前的 MySQL 8.0 版本升级到 MySQL 8.0.16 失败。失败是由与分区表文件名相关的大小写不匹配问题引起的。引入回归的修复被恢复，允许从 MySQL 5.7 或 MySQL 8.0.14 之前的 MySQL 8.0 版本升级到 MySQL 8.0.17，以正常运行。然而，MySQL 8.0.14、8.0.15 和 8.0.16 版本中仍然存在回归。

在区分大小写的文件系统上从 MySQL 8.0.14、8.0.15 或 8.0.16 到 MySQL 8.0.17 的就地升级失败，如果存在分区表且[lower_case_table_names=1](/5/5.1/5.1.8/server-system-variables.html)，则在将二进制文件或包升级到 MySQL 8.0.18 后启动服务器时出现以下错误：

```bash
Upgrading from server version version_number with
partitioned tables and lower_case_table_names == 1 on a case sensitive file
system may cause issues, and is therefore prohibited. To upgrade anyway, restart
the new server version with the command line option 'upgrade=FORCE'. When
upgrade is completed, please execute 'RENAME TABLE part_table_name
TO new_table_name; RENAME TABLE new_table_name
TO part_table_name;' for each of the partitioned tables.
Please see the documentation for further information.
```

如果在升级到 MySQL 8.0.17 时遇到此错误，请执行以下解决方法：

a. 使用 [--upgrade=force](/5/5.1/5.1.7/server-options.html) 重新启动服务器，以强制升级操作继续。

b. 使用小写分区名称分隔符（`#p#` 或 `#sp#`）标识分区表文件名：

    ```bash
    mysql> SELECT FILE_NAME FROM INFORMATION_SCHEMA.FILES WHERE FILE_NAME LIKE '%#p#%' OR FILE_NAME LIKE '%#sp#%';
    ```

c. 对于标识的每个文件，使用临时名称重命名关联的表，然后将表重命名回其原始名称。

    ```bash
    mysql> RENAME TABLE table_name TO temporary_table_name;
    mysql> RENAME TABLE temporary_table_name TO table_name;
    ```

d. 验证是否没有分区表文件名小写分区名称分隔符（应返回空结果集）。

    ```bash
    mysql> SELECT FILE_NAME FROM INFORMATION_SCHEMA.FILES WHERE FILE_NAME LIKE '%#p#%' OR FILE_NAME LIKE '%#sp#%';
    Empty set (0.00 sec)
    ```

e. 对每个重命名的表运行 [ANALYZE TABLE](/13/13.7/13.7.3/13.7.3.1/analyze-table.html)，以更新 `mysql.innodb_index_stats` 和 `mysql.innodb_table_stats` 表中的优化器统计信息。

由于 MySQL 8.0.14、8.0.15 和 8.0.16 版本中仍然存在回归，因此在 [lower_case_table_names=1](/5/5.1/5.1.8/server-system-variables.html) 的区分大小写文件系统上不支持将分区表从 MySQL 8.0.14，8.0.15 或 8.0.16 导入 MySQL 8.0.17。尝试这样做会导致“Tablespace is missing for table（表缺少表空间）”错误。

- MySQL 在为表分区构造表空间名称和文件名时使用分隔符字符串。“`#p#`”分隔符字符串位于分区名称之前，“`#sp#`”分隔字符串位于子分区名称之前。如图所示：

```bash
      schema_name.table_name#p#partition_name#sp#subpartition_name
      table_name#p#partition_name#sp#subpartition_name.ibd
```

历史上，分隔符字符串在区分大小写的文件系统（如 Linux）上是大写的（`#P#` 和 `#SP#`），在不区分大小写文件系统（例如 Windows）上是小写的（`#p#` 和 `#sp#`）。从 MySQL 8.0.19 开始，所有文件系统上的分隔符字符串都是小写的。此更改可防止在区分大小写和不区分大小写的文件系统之间迁移数据目录时出现问题。不再使用大写分隔符字符串。

此外，基于用户指定的分区或子分区名称（可以大写或小写指定）生成的分区表空间名称和文件名现在都以小写生成（并存储在内部），而不考虑 [lower_case_table_names](/5/5.1/5.1.8/server-system-variables.html) 设置，以确保不区分大小写。例如，如果使用名称 `PART_1` 创建表分区，则表空间名称和文件名将以小写形式生成：

```bash
      schema_name.table_name#p#part_1
      table_name#p#part_1.ibd
```

在升级过程中，MySQL会根据需要进行检查和修改：

- 磁盘上和数据字典中的分区文件名，以确保小写分隔符和分区名。
- 对数据字典中的元数据进行分区，以查找以前的错误修复所引入的相关问题。
- `InnoDB` 统计数据，用于先前错误修复中引入的相关问题。

在表空间导入操作期间，将检查磁盘上的分区表空间文件名，并在必要时进行修改，以确保使用小写分隔符和分区名。

- 从 MySQL 8.0.21 开始，如果发现表空间数据文件位于未知目录中，则在启动时或从 MySQL 5.7 升级时，会在错误日志中写入警告。已知的目录是由 [datadir](/5/5.1/5.1.8/server-system-variables.html)、[innodb_data_home_dir](/15/15.14/innodb-parameters.html) 和 [innodb_directories](/15/15.14/innodb-parameters.html) 变量定义的目录。要使目录为人所知，请将其添加到  [innodb_directories](/15/15.14/innodb-parameters.html) 设置中。已知目录可确保在恢复过程中可以找到数据文件。有关详细信息，参阅[故障恢复期间的表空间发现](/15/15.18/15.18.2/innodb-recovery.html#故障恢复期间的表空间发现)。

- **重要变更**：从 MySQL 8.0.30 开始，[innodb_redo_log_capacity](/15/15.14/innodb-parameters.html) 变量控制重做日志文件占用的磁盘空间量。通过此更改，重做日志文件的默认数量及其位置也发生了更改。从 MySQL 8.0.30 开始，`InnoDB` 在数据目录的 `#innodb_redo` 目录中维护 32 个重做日志文件。此前，`InnoDB` 默认在数据目录中创建了两个重做日志文件，重做日志文件的数量和大小由 [innodb_log_files_in_group](/15/15.14/innodb-parameters.html) 和 [innodb_log_file_size](/15/15.14/innodb-parameters.html) 变量控制。这两个变量现在已被弃用。

当 [innodb_redo_log_capacity](/15/15.14/innodb-parameters.html) 设置已定义, [innodb_log_files_in_group](/15/15.14/innodb-parameters.html) 和 [innodb_log_file_size](/15/15.14/innodb-parameters.html) 设置将忽略; 否则，这些设置将用于计算 `innodb_redo_log_capacity` 设置（`innodb_log_files_in_group * innodb_log_file_size = innodb_redo_log_capacity`）。如果没有设置这些变量，重做日志容量将设置为 `innodb_redo_log_capacity` 默认值，即 104857600 字节（100MB）。

正如任何升级通常需要的那样，此更改需要在升级之前彻底关闭。

有关此功能的更多信息，参阅[章节 15.6.5，“重做日志”](/15/15.6/15.6.5/innodb-redo-log.html)。

## SQL 变更

- **不兼容的变更**：从 MySQL 8.0.13 开始，`GROUP BY` 子句的不推荐使用的 `ASC` 或 `DESC` 限定符已被删除。以前依赖 `GROUP BY` 排序的查询可能会产生不同于以前 MySQL 版本的结果。要生成给定的排序顺序，请提供 `ORDER BY` 子句。

    MySQL 8.0.12 或更低版本中使用 `ASC` 或 `DESC` 限定符作为 `GROUP BY` 子句的查询和存储程序定义应进行修改。否则，升级到 MySQL 8.0.13 或更高版本可能会失败，复制到 MySQL 8.0.13 或更高副本服务器也可能会失败。

- MySQL 8.0 中可能保留了一些在 MySQL 5.7 中未保留的关键字。参阅[章节 9.3，“关键词和保留词”](/9/9.3/keywords.html)。这可能会导致以前用作标识符的单词变得非法。要修复受影响的语句，请使用标识符引号。参阅[章节 9.2，“模式对象名称”](/9/9.2/identifiers.html)。

- 升级后，建议你测试应用程序代码中指定的优化器提示，以确保仍然需要这些提示来实现所需的优化策略。优化器增强功能有时会使某些优化器提示变得不必要。在某些情况下，不必要的优化器提示甚至可能适得其反。

- **不兼容的变更**：在 MySQL 5.7 中，为没有 `CONSTRAINT` *symbol* 子句的 `InnoDB` 表指定 `FOREIGN KEY`定义，或指定没有符号的 `CONSTRAINT` 关键字，会导致 `InnoDB` 使用生成的约束名称。这种行为在 MySQL 8.0 中发生了变化，InnoDB 使用 `FOREIGN KEY` *index_name* 值而不是生成的名称。因为约束名称必须每个架构（数据库）唯一，所以由于外键索引名称不是每个架构唯一的，因此更改导致了错误。为了避免这种错误，MySQL 8.0.16 中恢复了新的约束命名行为，InnoDB 再次使用生成的约束名称。

为了与 `InnoDB` 保持一致，基于 MySQL 8.0.16 或更高版本的 `NDB` 版本如果未指定 `CONSTRAINT` *symbol* 子句，或者指定 `CONSTRAINT` 关键字而没有 `symbol`，则使用生成的约束名称。基于 MySQL 5.7 和早期 MySQL 8.0 版本的 NDB 版本使用 `FOREIGN KEY` *index_name* 值。

上述更改可能会给依赖于先前外键约束命名行为的应用程序带来不兼容性。

- MySQL 8.0.22 中更改了 [IFNULL()](/15/15.2/flow-control-functions.html) 和 [CASE()](/15/15.2/flow-control-functions.html) 等 MySQL 流控制函数对系统变量值的处理；系统变量值现在被处理为具有相同字符和排序规则的列值，而不是常量。一些使用这些函数和系统变量的查询，如果以前成功，可能会被 `Illegal mix of collations（非法混合排序规则）`拒绝。在这种情况下，将系统变量强制转换为正确的字符集和排序规则。

- **不兼容的变更**：MySQL 8.0.28 修复了先前 MySQL 8.0 版本中的一个问题，即 [CONVERT()](/12/12.11/cast-functions.html) 函数有时允许将 [BINARY](/11/11.3/11.3.3/binary-varbinary.html) 值无效转换为非二进制字符集。应检查可能依赖于此行为的应用程序，如有必要，应在升级前进行修改。

特别是，如果 `CONVERT()` 被用作索引生成列的表达式的一部分，则在升级到 MySQL 8.0.28 后，函数行为的更改可能会导致索引损坏。你可以通过以下步骤防止发生这种情况：

a. 在执行升级之前，请更正任何无效的输入数据。

b. 删除并重新创建索引。

    你也可以改为使用ALTERTABLE表force强制重新生成表。

c. 升级 MySQL 软件。

如果无法预先验证输入数据，则在执行到 MySQL 8.0.28 的升级之前，不应重新创建索引或重建表。

## 已变更的服务器默认值

MySQL 8.0 提供了改进的默认设置，旨在实现最佳的开箱即用体验。这些变化是由技术进步（机器有更多 CPU、使用 SSD 等）、存储更多数据、MySQ L正在发展（InnoDB、Group Replication、AdminAPI）等因素推动的。下表总结了为大多数用户提供最佳 MySQL 体验而更改的默认值。

|选项/参数|旧默认值|新默认值|
|--|--|--|
|*服务器变更*|||		
|[character_set_server](/5/5.1/5.1.8/server-system-variables.html)|`latin1`|`utf8mb4`|
|[collation_server}(/5/5.1/5.1.8/server-system-variables.html)|`latin1_swedish_ci`|`utf8mb4_0900_ai_ci`|
|[explicit_defaults_for_timestamp](/5/5.1/5.1.8/server-system-variables.html)|`OFF`|`ON`|
|[optimizer_trace_max_mem_size](/5/5.1/5.1.8/server-system-variables.html)|`16KB`|`1MB`|
|[validate_password_check_user_name](/5/5.1/5.1.8/server-system-variables.html)|`OFF`|`ON`|
|[back_log](/5/5.1/5.1.8/server-system-variables.html)|-1 （自动大小） 从： back_log = 50 + (max_connections / 5)|-1 （自动大小） 变为 : back_log = max_connections|
|[max_allowed_packet](/5/5.1/5.1.8/server-system-variables.html)|`4194304` (4MB)|`67108864` (64MB)|
|[max_error_count](/5/5.1/5.1.8/server-system-variables.html)|`64`|`1024`|
|[event_scheduler](/5/5.1/5.1.8/server-system-variables.html)|`OFF`|`ON`|
|[table_open_cache](/5/5.1/5.1.8/server-system-variables.html)|`2000`|`4000`|
|[log_error_verbosity](/5/5.1/5.1.8/server-system-variables.html)|`3` （注意）|`2`（警告）
|[local_infile](/5/5.1/5.1.8/server-system-variables.html)|`ON` (5.7)|`OFF`|
|*InnoDB 变更*|||
|[innodb_undo_tablespaces](/15/15.14/innodb-parameters.html)|`0`|`2`|
|[innodb_undo_log_truncate](/15/15.14/innodb-parameters.html)|`OFF`|`ON`|
|[innodb_flush_method](/15/15.14/innodb-parameters.html)|`NULL`|`fsync`（Unix）, `unbuffered`（Windows）|
|[innodb_autoinc_lock_mode](/15/15.14/innodb-parameters.html)|`1` （连续的）|`2` （交叉的）|
|[innodb_flush_neighbors](/15/15.14/innodb-parameters.html)|`1`（启用）|`0`（禁用）|
|[innodb_max_dirty_pages_pct_lwm](/15/15.14/innodb-parameters.html)|`0`（%）|`10`（%）|
|[innodb_max_dirty_pages_pct](/15/15.14/innodb-parameters.html)|`75`（%）|`90`（%）|
|*性能模式变更*|||		
|`performance-schema-instrument='wait/lock/metadata/sql/%=ON'`|`OFF`|`ON`|
|`performance-schema-instrument='memory/%=COUNTED'`|`OFF`|`COUNTED`|
|`performance-schema-consumer-events-transactions-current=ON`|`OFF`|`ON`|
|`performance-schema-consumer-events-transactions-history=ON`|`OFF`|`ON`|
|`performance-schema-instrument='transaction%=ON'`|`OFF`|`ON`|
|*复制变更*|||	
|[log_bin](/17/17.1/17.1.6/17.1.6.4/replication-options-binary-log.html)|`OFF`|`ON`|
|[server_id](/18/18.9/group-replication-options.html)|`0`|`1`|
|[log-slave-updates](/17/17.1/17.1.6/17.1.6.4/replication-options-binary-log.html)|`OFF`|`ON`|
|[expire_logs_days](/17/17.1/17.1.6/17.1.6.4/replication-options-binary-log.html)|`0`|`30`|
|[master-info-repository](/17/17.1/17.1.6/17.1.16.3/replication-options-replica.html)|`FILE`|`TABLE`|
|[relay-log-info-repository](/17/17.1/17.1.6/17.1.16.3/replication-options-replica.html)|`FILE`|`TABLE`|
|[transaction-write-set-extraction](/17/17.1/17.1.6/17.1.6.4/replication-options-binary-log.html)|`OFF`|`XXHASH64`|
|[slave_rows_search_algorithms](/17/17.1/17.1.6/17.1.16.3/replication-options-replica.html)|`INDEX_SCAN,TABLE_SCAN`|`INDEX_SCAN,HASH_SCAN`|
|[slave_pending_jobs_size_max](/17/17.1/17.1.6/17.1.16.3/replication-options-replica.html)|`16M`|`128M`|
|[gtid_executed_compression_period](/17/17.1/17.1.6/17.1.6.5/replication-options-gtids.html)|`1000`|`0`|
|*组复制变更*|||	
|[group_replication_autorejoin_tries](/18/18.9/group-replication-options.html)|`0`|`3`|
|[group_replication_exit_state_action](/18/18.9/group-replication-options.html)|`ABORT_SERVER`|`READ_ONLY`|
|[group_replication_member_expel_timeout](/18/18.9/group-replication-options.html)|`0`|`5`|

有关已添加的选项或变量的更多信息，参阅 *MySQL 服务器版本参考*中的 [MySQL 8.0 选项和变量变更](https://dev.mysql.com/doc/mysqld-version-reference/en/optvar-changes-8-0.html)。

以下各节说明对默认值的更改以及它们可能对部署产生的任何影响。

### 服务器默认值

- [character_set_server](/5/5.1/5.1.8/server-system-variables.html) 系统变量和命令行选项 [--character-set-server](/5/5.1/5.1.8/server-system-variables.html) 的默认值从 `latin1` 更改为 `utf8mb4`。这是服务器的默认字符集。目前，UTF8MB4 是网络的主要字符编码，这一变化使绝大多数 MySQL 用户的生活更加轻松。从 5.7 升级到 8.0不会更改任何现有数据库对象的任何字符集。但是，除非将 `character_set_server` 指定回以前的默认值或显式设置字符集，否则默认情况下新的模式、表或列将使用 `utf8mb4`。我们建议你尽可能转移到 `utf8mb4`。

- [collaboration_server](/5/5.1/5.1.8/server-system-variables.html) 系统变量和命令行参数的默认值 [--collaboration-server](/5/5.1/5.1.8/server-system-variables.html) 从 `latin1_swedish_ci` 更改为 `utf8mb4_0900_ai_ci`。这是服务器的默认排序规则，即字符集中字符的顺序。排序规则和字符集之间有一个链接，因为每个字符集都有一个可能的排序规则列表。从 5.7 升级到 8.0 不会更改任何现有数据库对象的排序规则，但会对新对象生效。

- [explicit_faults_for_timestamp](/5/5.1/5.1.8/server-system-variables.html) 系统变量的默认值从 `OFF`（MySQL 遗留行为）更改为 `ON`（SQL 标准行为）。该选项最初在 5.6 中引入，在 5.6 和 5.7 为 `OFF`。

- [optimizer_trace_max_mem_size](/5/5.1/5.1.8/server-system-variables.html) 系统变量的默认值从 `16KB` 更改为 `1MB`。旧的默认值导致优化器跟踪对于任何非平凡查询都被截断。此更改确保了对大多数查询进行有用的优化器跟踪。

- [validate_password_check_user_name](/5/5.1/5.1.8/server-system-variables.html) 系统变量的默认值从 `OFF` 变为 `ON`。这意味着当 `validate_pass` 插件启用时，默认情况下它现在拒绝与当前会话用户名匹配的密码。

- [back_log](/5/5.1/5.1.8/server-system-variables.html) 系统变量的自动调整算法已更改。自动大小（-1）的值现在设置为 [max_connections](/5/5.1/5.1.8/server-system-variables.html) 的值，该值大于按 `50 + (max_connections/5)` 计算的值。在服务器无法跟上传入请求的情况下，`back_log` 会对传入的 IP 连接请求进行排队。在最坏的情况下，如果同时尝试重新连接的客户机数量达到 [max_connections](/5/5.1/5.1.8/server-system-variables.html)，例如在网络故障后，可以对它们进行缓冲并避免拒绝重试循环。

- [max_allowed_packet](/5/5.1/5.1.8/server-system-variables.html) 系统变量的默认值从 `4194304`（4M）变更为 `67108864`（64M）。这种更大的默认值的主要优点是接收到有关插入或查询大于 `max_allowed_packet` 的错误的可能性更小。它应该与你想要使用的最大的[章节 11.3.4，“BLOB 和 TEXT 类型”](/11/11.3/11.3.4/blob.html)一样大。要恢复到以前的行为，请设置 `max_allowed_packet=4194304`。

- [max_error_count](/5/5.1/5.1.8/server-system-variables.html) 系统变量的默认值从 `64` 变为 `1024`。这确保了 MySQL 处理大量的警告，例如一条涉及 1000 行的 UPDATE 语句，其中许多行给出了转换警告。许多工具通常使用批处理更新来帮助减少复制延迟。外部工具，如  pt-online-schema-change 默认为 1000，gh-ost 默认为 100。MySQL 8.0 涵盖了这两个用例的完整错误历史。没有静态分配，因此此更改只影响生成大量警告的语句的内存消耗。

- [event_scheduler](/5/5.1/5.1.8/server-system-variables.html) 系统变量的默认值从 `OFF` 变为 `ON`。换句话说，默认情况下启用事件调度程序。这是 SYS 中新功能的启用者，例如“终止空闲事务”。

- [table_open_cache](/5/5.1/5.1.8/server-system-variables.html) 系统变量的默认值从 `2000` 更改为 `4000`。这是一个微小的改变，它增加了表访问的会话并发性。

- [log_error_verbosity](/5/5.1/5.1.8/server-system-variables.html) 系统变量的默认值从 `3`（注意）变更为 `2`（警告）。默认情况下，目的是使 MySQL 8.0 错误日志不那么详细。

### InnoDB 默认值

- **不兼容的变更**。[innodb_undo_tablespaces](/15/15.14/innodb-parameters.html) 系统变量的默认值从 `0` 变更为 `2`。配置 InnoDB 使用的撤消表空间的数量。在 MySQL 8.0 中，[innodb_undo_tablespaces](/15/15.14/innodb-parameters.html) 的最小值为 `2`，并且不能再在系统表空间中创建回滚段。因此，这是一种无法恢复到 5.7 行为的情况。此更改的目的是能够自动截断 Undo 日志（请参阅下一项），回收（偶尔）长事务（如 [mysqldump](/4/4.5/4.5.4/mysqldump.html)）使用的磁盘空间。

- [innodb_undo_log_ctruncate](/15/15.14/innodb-parameters.html) 系统变量的默认值从 `OFF` 变为 `ON`。启用时，超过 [innodb_max_nundo_log_size](/15/15.14/innodb-parameters.html) 定义的阈值的 undo 表空间将标记为截断。只能截断撤消表空间。不支持截断驻留在系统表空间中的撤消日志。从 5.7 升级到 8.0 会自动将系统转换为使用 undo 表空间，在 8.0 中，使用系统表空间不是一个选项。

- [innodb_flush_method](/15/15.14/innodb-parameters.html) 系统变量的默认值在类 Unix 系统上从 `NULL` 变为 `fsync`，在 Windows 系统上从 `NULL` 变为 `unbuffered`。这更多是一种术语和选项清理，没有任何实际影响。对于 Unix，这只是一个文档更改，因为 5.7 中的默认值也是 `fsync`（默认值 `NULL` 表示 `fsync`）。类似地，在 Windows 上，[innodb_flush_method](/15/15.14/innodb-parameters.html) 默认 `NULL` 表示 5.7 中的 `async_unbuffered`，并在 8.0 中替换为默认 `unbuffered`，这与现有的默认
[innodb_use_native_aio=ON](/15/15.14/innodb-parameters.html) 具有相同的效果。

- **不兼容的变更**。 [innodb_autoinc_lock_mode](/15/15.14/innodb-parameters.html) 系统变量的默认值从 `1`（连续）更改为 `2`（交叉）。将交错锁模式更改为默认设置反映了默认复制类型从基于语句的复制更改为基于行的复制，这发生在 MySQL 5.7 中。基于语句的复制需要连续的自动增量锁定模式，以确保为给定的 SQL 语句序列以可预测和可重复的顺序分配自动增量值，而*基于行的复制*对 SQL 语句的执行顺序不敏感。因此，已知此更改与基于语句的复制不兼容，可能会破坏一些依赖于顺序自动增量的应用程序或用户生成的测试套件。通过设置 `innodb_autoinc_lock_mode=1`，可以恢复先前的默认值；

- [innodb_flush_neighbors](/15/15.14/innodb-parameters.html) 系统变量的默认值从 `1`（启用）更改为 `0`（禁用）。这样做是因为快速 IO（SSD）现在是默认的部署方式。我们预计，对于大多数用户来说，这会带来很小的性能提升。使用速度较慢的硬盘驱动器的用户可能会看到性能下降，建议通过设置 `innodb_flush_neighbors=1` 恢复到以前的默认值。
- [innodb_max_dirty_pages_pct_lwm](/15/15.14/innodb-parameters.html) 系统变量的默认值从0（%）更改为10（%）。当innodb_max_dirty_pages_pct_lwm=10时，当缓冲池中超过10%的页面包含修改过的（“虚拟”）页面时，innodb会增加刷新活动。这一变化的目的是稍微权衡峰值吞吐量，以换取更一致的性能。
- innodb_max_dirty_pages_pct系统变量的默认值从 `75`（%）更改为 `90`（%）。此更改与对 [innodb_max_dirty_pages_pct_lwm](/15/15.14/innodb-parameters.html) 的更改相结合，它们一起确保了 InnoDB 的平滑刷新行为，避免了刷新突发。要恢复到先前的行为，设置 `innodb_max_dirty_pages_pct=75` 和 `innodb_max_dirty_pages_pct_lwm=0`。

### 性能模式默认值

- 默认情况下，性能架构元数据锁定（MDL）检测处于打开状态。编译默认值 `performance-schema-instrument='wait/lock/metadata/sql/%=ON'` 从 `OFF` 变更为 `ON`。这是在 SYS 中添加面向 MDL 视图的启用码。

- 默认情况下，性能架构内存检测处于打开状态。编译默认值 `performance-schema-instrument='memory/%=COUNTED'` 从 `OFF` 变更为 `COUNTED`。这一点很重要，因为如果在服务器启动后启用了检测，则记帐是不正确的，并且你可能会因为缺少分配而获得负平衡，但却获得了空闲。

- 默认情况下，性能架构事务检测处于打开状态。编译默认值 `performance-schema-consumer-events-transactions-current=ON`、`performance-schema-consumer-events-transactions-history=ON` 和 `performance-schema-instrument='transaction%=ON'`  从 `OFF` 变更为 `ON`。

### 复制默认值

- [log_bin](/17/17.1/17.1.6/17.1.6.4/replication-options-binary-log.html) 系统变量的默认值从 `OFF` 变为 `ON`。换句话说，默认情况下启用二进制日志记录。几乎所有生产安装都启用了二进制日志，因为它用于复制和时间点恢复。因此，通过默认启用二进制日志，我们消除了一个配置步骤，稍后启用它需要重新启动 [mysqld](/4/4.3/4.3.1/mysqld.html)。默认情况下启用它还可以提供更好的测试覆盖率，更容易发现性能回归。记住还要设置 [server_id](/18/18.9/group-replication-options.html)（参见以下更改）。8.0 默认行为与你发出的行为相同 `./mysqld --log-bin --server-id=1`。如果你在 8.0 版本，想要 5.7 版本的行为，你可以执行 `./mysqld --skip-log-bin --server-id=0`。

- [server_id](/18/18.9/group-replication-options.html) 系统变量的默认值从 `0` 变更为 `1`（与 [log_bin=ON](/17/17.1/17.1.6/17.1.6.4/replication-options-binary-log.html) 的更改结合在一起）。可以使用此默认 ID 启动服务器，但实际上必须根据正在部署的复制基础结构设置 [server_id](/18/18.9/group-replication-options.html)，以避免重复的服务器 ID。

- [log-slave-updates](/17/17.1/17.1.6/17.1.6.4/replication-options-binary-log.html) 系统变量的默认值从 `OFF` 更改为 `ON`。这会导致副本将复制的事件记录到其自己的二进制日志中。此选项是组复制所必需的，它还可以确保在各种复制链设置中的正确行为，而这些设置已成为当今的标准。

- [expire_logs_days](/17/17.1/17.1.6/17.1.6.4/replication-options-binary-log.html) 系统变量的默认值从 `0` 更改为 `30`。新的默认值 `30` 会导致 [mysqld](/4/4.3/4.3.1/mysqld.html) 定期清除超过 30 天的未使用二进制日志。此更改有助于防止在二进制日志上浪费过多的磁盘空间，这些日志不再用于复制或恢复目的。旧值 `0` 禁用任何自动二进制日志清除。

- [master_info_repository](/17/17.1/17.1.6/17.1.16.3/replication-options-replica.html) 和 [relay_log_info_reository](/17/17.1/17.1.6/17.1.16.3/replication-options-replica.html) 系统变量的默认值从 `FILE` 更改为 `TABLE`。因此，在 8.0 中，复制元数据默认存储在 InnoDB 中。这提高了在默认情况下尝试实现故障安全复制的可靠性。

- transaction-write-set-[transaction-write-set-extraction](/17/17.1/17.1.6/17.1.6.4/replication-options-binary-log.html) 系统变量的默认值从 `OFF` 变更为 `XXHASH64`。此更改默认启用事务写入集。通过使用事务写集，源代码需要做更多的工作来生成写集，但结果有助于冲突检测。这是组复制的一项要求，新的默认设置使在源上启用二进制日志写集并行化以加快复制变得容易。

- [slave_rows_search_algorithms](/17/17.1/17.1.6/17.1.16.3/replication-options-replica.html) 系统变量的默认值从 `INDEX_SCAN,TABLE_SCAN` 变更为 `INDEX_SAN,HASH_SCAN`。此更改通过减少副本应用程序将更改应用到没有主键的表所需的表扫描次数来加快基于行的复制。

- [slave_pending_jobs_size_max](/17/17.1/17.1.6/17.1.16.3/replication-options-replica.html) 系统变量的默认值从 `16M` 更改为 `128M`。此更改增加了多线程副本可用的内存量。

- [gtid_executed_compression_period](/17/17.1/17.1.6/17.1.6.5/replication-options-gtids.html) 系统变量的默认值从 `1000` 更改为 `0`。此更改确保 `mysql.gtid_executed` 表的压缩仅在需要时隐式发生。

### 组复制默认值

- [group_replication_autorejoin_tries](/18/18.9/group-replication-options.html) 的默认值从 `0` 变更为 `3`，这意味着默认情况下启用了自动重新加入。此系统变量指定成员在被驱逐或在达到 [group_replication_unreacable_majority_timeout](/18/18.9/group-replication-options.html) 设置之前无法与大多数成员联系时自动重新加入组的尝试次数。

- [group_replication_exit_state_action](/18/18.9/group-replication-options.html) 的默认值从 `ABORT_SERVER` 更改为 `READ_ONLY`。这意味着当成员退出组时，例如在网络故障后，实例将变为只读，而不是关闭。

- [group_replication_member_expel_timeout](/18/18.9/group-replication-options.html) 的默认值从 `0` 变更为 `5`，这意味着怀疑与该组失去联系的成员将在5秒检测期后 5 秒被驱逐。

大多数默认值对于开发和生产环境都相当好。有一个例外，我们决定将名为 [innodb_dedicated_server](/15/15.14/innodb-parameters.html) 的新选项设置为 `OFF`，尽管我们建议在生产环境中将其设置为 `ON`。默认为 `OFF` 的原因是，它会导致开发人员笔记本电脑等共享环境变得不可用，因为它会占用*所有*可以找到的内存。

对于生产环境，我们建议将 [innodb_dedicated_server](/15/15.14/innodb-parameters.html) 设置为 `ON`。当设置为 `ON` 时，以下 InnoDB 变量（如果未明确指定）将根据可用内存 [innodb_buffer_pool_size](/15/15.14/innodb-parameters.html)、[innodb_log_file_size](/15/15.14/innodb-parameters.html) 和 [innodb_flush_method](/15/15.14/innodb-parameters.html)自动缩放。参阅[章节 15.8.12，“启用专用 MySQL 服务器的自动配置”](/15/15.8/15.8.12/innodb-dedicated-server.html)。

尽管新的默认值是大多数用例的最佳配置选择，但使用现有 5.7 配置选项也有特殊情况和遗留原因。例如，有些人更喜欢升级到 8.0，对其应用程序或操作环境的更改尽可能少。我们建议评估所有新的默认值，并尽可能多地使用。大多数新默认值都可以在 5.7  中进行测试，因此你可以在升级到 8.0 之前在 5.7 产品中验证新默认值。对于需要旧 5.7 值的少数默认值，请在操作环境中设置相应的配置变量或启动选项。

MySQL 8.0 具有性能模式 [variables_info](/27/27.12/27.12.14/27.12.14.2/performance-schema-variables-info-table.html) 表，该表显示了每个系统变量最近设置的源及其值范围。这提供了对所有配置变量及其值的SQL访问。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/upgrading-from-previous-series.html)
