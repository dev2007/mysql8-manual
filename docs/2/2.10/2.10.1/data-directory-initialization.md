# 2.10.1 初始化数据目录

安装 MySQL 后，必须初始化数据目录，包括 `mysql` 系统模式中的表：

- 对于某些 MySQL 安装方法，数据目录初始化是自动的，如[章节 2.10，“安装后设置和测试”](/2/2.10/postinstallation.html)所述。
- 对于其他安装方法，必须手动初始化数据目录。其中包括在 Unix 和类 Unix 系统上从通用二进制和源发行版安装，以及在 Windows 上从 ZIP 压缩包安装。

本节介绍如何为 MySQL 安装方法手动初始化数据目录，对于这些方法，数据目录初始化不是自动的。有关能够测试服务器是否可访问和正常工作的一些建议命令，参阅[章节 2.10.3，“测试服务器”](/2/2.10/2.10.3/testing-server.html)。

:::tip 注意
在 MySQL 8.0 中，默认认证插件已从 `mysql_native_password` 更改为 `caching_sha2_password`，`'root'@'localhost'` 管理帐户默认使用 `caching_sha 2_password`。如果你希望 `root` 帐户使用以前的默认认证插件（`mysql_native_password`），参阅 [caching_sha2_password 和 root 管理帐户](/2/2.11/2.11.4/upgrading-from-previous-series.html#caching_sha2_password-和-root-管理帐户)。
:::

[[toc]]

## 数据目录初始化概述

在这里所示的示例中，服务器将在 `mysql` 登录帐户的用户 ID 下运行。如果帐户不存在，请创建该帐户（参阅[创建 mysql 用户和组](/2/2.2/binary-installation.html#创建-mysql-用户和组)），或者替换计划用于运行服务器的其他现有登录帐户的名称。

1. 将位置更改为 MySQL 安装的顶级目录，通常为 `/usr/local/mysql` （根据需要调整系统的路径名）：

```bash
cd /usr/local/mysql
```

在此目录中，你可以找到几个文件和子目录，包括包含服务器的 `bin` 子目录，以及客户端和实用程序。

2. [secure_file_priv](/5/5.1/5.1.8/server-system-variables.html) 系统变量将导入和导出操作限制到特定目录。创建一个目录，其位置可以指定为该变量的值：

```bash
mkdir mysql-files
```

将目录用户和组所有权授予 `mysql` 用户和 `mysql` 组，并适当设置目录权限：

```bash
chown mysql:mysql mysql-files
chmod 750 mysql-files
```

3. 使用服务器初始化数据目录，包括包含初始 `mysql` 授权表的 `mysql` 模式，这些表决定用户如何连接到服务器。例如：

```bash
bin/mysqld --initialize --user=mysql
```

有关命令的重要信息，特别是有关可能使用的命令选项的信息，参阅[数据目录初始化过程](/2/2.10.1/data-directory-initialization.html#数据目录初始化过程)。有关服务器如何执行初始化的详细信息，参阅[数据目录初始化期间的服务器操作](/2/2.10.1/data-directory-initialization.html#数据目录初始化期间的服务器操作)。

通常，只有在首次安装 MySQL 之后，才需要进行数据目录初始化。（对于现有安装的升级，请执行升级过程；参阅[章节 2.11，“升级 MySQL”](/2/2.11/upgrading.html)。）但是，初始化数据目录的命令不会覆盖任何现有的 `mysql` 模式表，因此在任何情况下都可以安全运行。

4. 如果要部署自动支持安全连接的服务器，请使用 [mysql_ssl_rsa_setup](/4/4.4/4.4.3/mysql-ssl-rsa-setup.html) 实用程序创建默认 SSL 和 RSA 文件：

```bash
bin/mysql_ssl_rsa_setup
```

有关更多信息，参阅[章节 4.4.3，“mysql_ssl_rsa_setup——创建 SSL/RSA 文件”](/4/4.4/4.4.3/mysql-ssl-rsa-setup.html)。

5. 如果没有任何选项文件，服务器将以其默认设置启动。（参阅[章节 5.1.2，“服务器配置默认值”](/5/5.1/5.1.2/server-configuration-defaults.html)。）要显式指定 MySQL 服务器在启动时应使用的选项，请将它们放在选项文件中，例如 `/etc/my.cnf` 或 `/etc/MySQL/my.cnf`。（参阅[章节 4.2.2.2，“使用选项文件”](/4/4.2/4.2.2/4.2.2.2/option-files.html)。）例如，可以使用选项文件设置 [secure_file_priv](/5/5.1/5.1.8/server-system-variables.html) 系统变量。

6. 要安排 MySQL 在系统启动时无需手动干预即可启动，参阅[章节 2.10.5，“自动启动和停止 MySQL”](/2/2.10/2.10.5/automatic-start.html)。

7. 数据目录初始化在 `mysql` 模式中创建时区表，但不填充它们。为此，请使用[章节 5.1.15，“MySQL 服务器时区支持”](/5/5.1/5.1.15/time-zone-support.html)中的说明。

## 数据目录初始化过程

将位置更改为 MySQL 安装的顶级目录，通常为 `/usr/local/mysql`（根据需要调整系统的路径名）：

```bash
cd /usr/local/mysql
```

要初始化数据目录，请使用 [--initialize](/5/5.1/5.1.7/server-options.html) 或 [--initialize-insecure](/5/5.1/5.1.7/server-options.html) 选项调用 [mysqld](/4/4.3/4.3.1/mysqld.html)，具体取决于你希望服务器为 'root'@'localhost' 帐户生成随机初始密码，还是创建没有密码的帐户：

- 使用 [--initialize](/5/5.1/5.1.7/server-options.html) 进行“默认安全”安装（即，包括生成随机初始根密码）。在这种情况下，密码被标记为已过期，你必须选择一个新密码。
- 使用 [--initialize-insecure](/5/5.1/5.1.7/server-options.html)，不会生成 `root` 密码。这是不安全的；假设你打算在将服务器投入生产使用之前及时为帐户分配密码。

有关分配新 'root'@'localhost' 密码的说明，参阅[初始化后 root 密码分配](/2/2.10/2.10.1/data-directory-initialization.html#初始化后-root-密码分配)。

::tip 注意
服务器将任何消息（包括任何初始密码）写入其标准错误输出。这可能会被重定向到错误日志，因此如果你没有在屏幕上看到消息，请查看那里。有关错误日志的信息，包括其位置，参阅[章节 5.4.2，“错误日志”](/5/5.4/5.4.2/error-log.html)。

在 Windows 上，使用 [--console](/5/5.1/5.1.7/server-options.html) 选项将消息定向到控制台。
:::

在 Unix 和类 Unix 系统上，数据库目录和文件由 `mysql` 登录帐户拥有非常重要，这样当你稍后运行时，服务器就可以对它们进行读写访问。要确保这一点，请从系统 `root` 帐户启动 [mysqld](/4/4.3/4.3.1/mysqld.html)，并包括 [--user](/5/5.1/5.1.7/server-options.html) 选项，如下所示：

在 Windows 上，使用以下命令之一：

```bash
bin\mysqld --initialize --console
bin\mysqld --initialize-insecure --console
```

:::tip 注意
如果缺少所需的系统库，数据目录初始化可能会失败。例如，你可能会看到如下错误：

```bash
bin/mysqld: error while loading shared libraries:
libnuma.so.1: cannot open shared object file:
No such file or directory
```

如果发生这种情况，你必须手动或使用系统的包管理器安装缺少的库。然后重试数据目录初始化命令。
:::

如果 [mysqld](/4/4.3/4.3.1/mysqld.html) 无法识别安装目录或数据目录的正确位置，则可能需要指定其他选项，例如 [--basedir](/5/5.1/5.1.8/server-system-variables.html) 或 [--datadir](/5/5.1/5.1.8/server-system-variables.html)。例如（在单行上输入命令）：

```bash
bin/mysqld --initialize --user=mysql
  --basedir=/opt/mysql/mysql
  --datadir=/opt/mysql/mysql/data
```

或者，将相关的选项设置放在选项文件中，并将该文件的名称传递给 [mysqld](/4/4.3/4.3.1/mysqld.html)。对于 Unix 和类 Unix 系统，假设选项文件名为 `/opt/mysql/mysql/etc/my.cnf`。

```bash
[mysqld]
basedir=/opt/mysql/mysql
datadir=/opt/mysql/mysql/data
```

然后按如下方式调用 [mysqld](/4/4.3/4.3.1/mysqld.html)（首先在单行中使用 [--defaults-file](/4/4.2/4.2.2/4.2.2.3/option-file-options.html) 选项输入命令）：

```bash
bin/mysqld --defaults-file=/opt/mysql/mysql/etc/my.cnf
  --initialize --user=mysql
```

在Windows 上，假设 `C:\my.ini` 包含以下行：

```bash
[mysqld]
basedir=C:\\Program Files\\MySQL\\MySQL Server 8.0
datadir=D:\\MySQLdata
```

然后按如下方式调用 [mysqld](/4/4.3/4.3.1/mysqld.html)（首先在单行中使用 [--defaults-file](/4/4.2/4.2.2/4.2.2.3/option-file-options.html) 选项输入命令）：

```bash
bin\mysqld --defaults-file=C:\my.ini
   --initialize --console
```

## 数据目录初始化期间的服务器操作

:::tip 注意
服务器执行的数据目录初始化序列不能替代 [mysql_secure_installation](/4/4.4/4.4.2/mysql-secure-installation.html) 和 [mysql_ssl_rsa_setup](/4/4.4/4.4.3/mysql-ssl-rsa-setup.html) 执行的操作。参阅[章节 4.4.2，“mysql_secure_installation——改进 MySQL 安装安全性”](/4/4.4/4.4.2/mysql-secure-installation.html)和[章节 4.4.3，“mysql_ssl_rsa_setup——创建 SSL/RSA 文件”](/4/4.4/4.4.3/mysql-ssl-rsa-setup.html)。
:::

当使用 [--initialize](/5/5.1/5.1.7/server-options.html) 或 [--initialize-insecure](/5/5.1/5.1.7/server-options.html) 选项调用时，[mysqld](/4/4.3/4.3.1/mysqld.html) 在数据目录初始化序列期间执行以下操作：

1. 服务器检查数据目录是否存在，如下所示：

- 如果不存在数据目录，服务器将创建它。
- 如果数据目录存在但不为空（即它包含文件或子目录），则服务器会在生成错误消息后退出：

```bash
[ERROR] --initialize specified but the data directory exists. Aborting.
```

在这种情况下，请删除或重命名数据目录，然后重试。

如果每个条目的名称都以句点（`.`）开头，则允许现有数据目录为非空。

2. 在数据目录中，服务器创建 `mysql` 系统模式及其表，包括数据字典表、授权表、时区表和服务器端帮助表。参阅[章节 5.3，“mysql 系统模式”](/5/5.3/system-schema.html)。

3. 服务器初始化管理 [InnoDB](/15/innodb-storage-engine.html) 表所需的系统表空间和相关数据结构。

:::tip 注意
在 [mysqld](/4/4.3/4.3.1/mysqld.html) 设置 `InnoDB` [系统表空间](/glossary.html)之后，对表空间特性的某些更改需要设置一个全新的实例。合格的更改包括系统表空间中第一个文件的文件名和撤消日志的数量。如果不想使用默认值，请确保在运行 [mysqld](/4/4.3/4.3.1/mysqld.html) *之前*，在 MySQL [配置文件](/glossary.html)中已设置了 [innodb_data_file_path](/15/15.14/innodb-parameters.html) 和 [innodb_log_file_size](/15/15.14/innodb-parameters.html) 配置参数。此外，确保根据需要指定影响 `InnoDB` 文件创建和位置的其他参数，例如 [innodb_data_home_dir](/15/15.14/innodb-parameters.html) 和 [innodb_log_group_home_dir](/15/15.14/innodb-parameters.html)。

如果这些选项在配置文件中，但该文件不在 MySQL 默认读取的位置，则在运行 [mysqld](/4/4.3/4.3.1/mysqld.html) 时使用 [--defaults-extra-file](/5/5.1/5.1.7/server-options.html) 选项指定文件位置。
:::

4. 服务器创建一个 `'root'@'localhost'` 超级用户帐户和其他保留帐户（参阅[章节 6.2.9，“保留帐户”](/6/6.2/6.2.9/reserved-accounts.html)）。某些保留帐户已锁定，客户端无法使用，但 `'root'@'localhost'` 仅供管理使用，你应为其分配密码。

服务器对 `'root'@'localhost'` 帐户密码的操作取决于你如何调用它：

```bash
[Warning] A temporary password is generated for root@localhost:
iTag*AfrH5ej
```

- 使用 [--initialize](/5/5.1/5.1.7/server-options.html) 而非 [--initialize-insecure](/5/5.1/5.1.7/server-options.html)，服务器生成一个随机密码，将其标记为已过期，并编写一条显示密码的消息：

    ```bash
    [Warning] A temporary password is generated for root@localhost:
    iTag*AfrH5ej
    ```

- 使用 [--initialize-insecure](/5/5.1/5.1.7/server-options.html)（使用或不使用 [--initialize](/5/5.1/5.1.7/server-options.html)，因为 [--initialize-insecure](/5/5.1/5.1.7/server-options.html) 暗含 [--initialize](/5/5.1/5.1.7/server-options.html)），服务器不会生成密码或将其标记为已过期，并写入警告消息：

    ```bash
    [Warning] root@localhost is created with an empty password ! Please
    consider switching off the --initialize-insecure option.
    ```

有关分配新 `'root'@'localhost'` 密码的说明，参阅[初始化后 root 密码分配](/2/2.10/2.10.1/data-directory-initialization.html#初始化后-root-密码分配)。

5. 服务器填充用于 [HELP](/13/13.8/13.8.3/help.html) 语句的服务器端帮助表（参阅[章节 13.8.3，“HELP 语句”](/13/13.8/13.8.3/help.html)）。服务器不填充时区表。要手动执行此操作，参阅[章节 5.1.15，“MySQL 服务器时区支持”](/5/5.1/5.1.15/time-zone-support.html)。

6. 如果 [init_file](/5/5.1/5.1.8/server-system-variables.html) 系统变量用于命名 SQL 语句文件，则服务器将执行该文件中的语句。此选项允许你执行自定义引导序列。

当服务器以引导模式运行时，某些功能不可用，从而限制了文件中允许的语句。其中包括与帐户管理（如 [CREATE USER](/13/13.7/13.7.1/13.7.1.3/create-user.html) 或 [GRANT](/13/13.7/13.7.1/13.7.1.6/grant.html)）、复制和全局事务标识符相关的语句。

## 初始化后 root 密码分配

通过使用 [--initialize](/5/5.1/5.1.7/server-options.html) 或 [--initialize-insecure](/5/5.1/5.1.7/server-options.html) 启动服务器来初始化数据目录后，正常启动服务器（即，不使用任何一个选项），并为 'root'@'localhost' 帐户分配新密码：

1. 启动服务器。有关说明，参阅[章节 2.10.2，“启动服务器”](/2/2.10/2.10.2/starting-server.html))。

2. 连接服务器：

- 如果使用 [--initialize](/5/5.1/5.1.7/server-options.html) 但不是 [--initialize-insecure](/5/5.1/5.1.7/server-options.html) 来初始化数据目录，请以 `root` 连接到服务器：

    ```bash
    mysql -u root -p
    ```

    然后，在密码提示下，输入服务器在初始化过程中生成的随机密码：

    ```bash
    Enter password: (enter the random root password here)
    ```

- 如果使用 [--initialize-insecure](/5/5.1/5.1.7/server-options.html) 来初始化数据目录，请以 `root` 连接到服务器，无需密码：

    ```bash
    mysql -u root --skip-password
    ```

3. 连接后，使用 [ALTER USER](/13/13.7/13.7.1/13.7.1.1/alter-user.html) 语句分配新的 `root` 密码：

```bash
ALTER USER 'root'@'localhost' IDENTIFIED BY 'root-password';
```

另请参阅[章节 2.10.4，“保护初始 MySQL 帐户”](/2/2.10/2.10.4/default-privileges.html)。

:::tip 注意
尝试连接到主机 `127.0.0.1` 通常解析为 `localhost` 帐户。但是，如果在启用 [skip_name_resolve](/5/5.1/5.1.8/server-system-variables.html) 的情况下运行服务器，则会失败。如果你计划这样做，请确保存在可以接受连接的帐户。例如，为了能够使用 `--host=127.0.0.1` 或 `--host=::1` 作为 `root` 用户进行连接，请创建以下帐户：

```bash
CREATE USER 'root'@'127.0.0.1' IDENTIFIED BY 'root-password';
CREATE USER 'root'@'::1' IDENTIFIED BY 'root-password';
```

可以使用 [init_file](/5/5.1/5.1.8/server-system-variables.html) 系统变量将这些语句放在要执行的文件中，如[“数据目录初始化期间的服务器操作”](/2/2.10.1/data-directory-initialization.html#数据目录初始化期间的服务器操作)中所述。

:::

> [原始链接](https://dev.mysql.com/doc/refman/8.0/en/data-directory-initialization.html)
