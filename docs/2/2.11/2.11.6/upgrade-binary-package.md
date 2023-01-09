# 2.11.6 在 Unix/Linux 上升级 MySQL 二进制或基于包的安装

本节介绍如何在 Unix/Linux 上升级 MySQL 二进制和基于包的安装。描述了就地和逻辑升级方法。

[[toc]]

## 就地升级

就地升级包括关闭旧的 MySQL 服务器，用新的二进制文件替换旧的 MySQL 二进制文件或包，在现有数据目录上重新启动 MySQL，以及升级需要升级的现有安装的任何剩余部分。有关可能需要升级的内容的详细信息，参阅[章节 2.11.3，“MySQL 升级过程升级的内容”](/2/2.11/2.11.3/upgrading-what-is-upgraded.html)。

:::tip 注意
如果要升级最初通过安装多个 RPM 软件包生成的安装，请升级所有软件包，而不仅仅是一些。例如，如果以前安装了服务器和客户端 RPM，则不要只升级服务器 RPM。

对于某些 Linux 平台，RPM 或 Debian 包中的 MySQL 安装包括管理 MySQL 服务器启动和关闭的 systemd 支持。在这些平台上，未安装 [mysqld_safe](/4/4.3/4.3.2/mysqld-safe.html)。在这种情况下，请使用 systemd 来启动和关闭服务器，而不是使用以下说明中使用的方法。参阅[章节 2.5.9，“使用 systemd 管理 MySQL 服务器”](/2/2.5/2.5.9/using-systemd.html)。

有关 MySQL 集群安装的升级，参阅 [MySQL 集群升级](/2/2.11/2.11.6/upgrade-binary-package.html#MySQL-集群升级)。
:::


要执行就地升级，请执行以下操作：

1. 查看[章节 2.11.1，“在你开始前”](/2/2.11/2.11.1/upgrade-before-you-begin)中的信息。
2. 通过完成[章节 2.11.5，“为升级准备安装”](/2/2.11/2.11.5/upgrade-prerequisites.html)中的初步检查，确保安装的升级准备就绪。
3. 如果将 XA 事务与 `InnoDB` 一起使用，请在升级之前运行 [XA RECOVER](/13/13.3/13.3.8.1/xa-statements.html) 以检查未提交的 XA 事务。如果返回结果，则通过发出 [XA COMMIT](/13/13.3/13.3.8.1/xa-statements.html)或 [XA ROLLBACK](/13/13.3/13.3.8.1/xa-statements.html) 语句来提交或回滚 XA 事务。
4. 如果你要从 MySQL 5.7.11 或更早版本升级到 MySQL 8.0，并且有加密的 `InnoDB` 表空间，请执行以下语句来旋转 keyring 主密钥：

    ```bash
    ALTER INSTANCE ROTATE INNODB MASTER KEY;
    ```

5. 如果你通常运行配置为 [innodb_fast_shutdown](/15/15.14/innodb-parameters.html)（冷关机）的 MySQL 服务器，请通过执行以下任一语句将其配置为执行快速或慢速关机：

    ```bash
    SET GLOBAL innodb_fast_shutdown = 1; -- fast shutdown
    SET GLOBAL innodb_fast_shutdown = 0; -- slow shutdown
    ```

    无论是快速还是缓慢关闭，`InnoDB` 都会将其撤消日志和数据文件保持在一种状态，以便在不同版本之间的文件格式不同时处理。

6. 关闭旧的 MySQL 服务器。例如：

    ```bash
    mysqladmin -u root -p shutdown
    ```

7. 升级 MySQL 二进制文件或包。如果升级二进制安装，解压缩新的 MySQL 二进制分发包。参阅[获取并打开分发包](/2/2.2/binary-installation.html#获取并打开分发包)。对于基于软件包的安装，安装新的软件包。

8. 使用现有数据目录启动 MySQL 8.0 服务器。例如：

    ```bash
    mysqld_safe --user=mysql --datadir=/path/to/existing-datadir &
    ```

    如果存在加密的 `InnoDB` 表空间，请使用 [--early-plugin-load](/5/5.1/5.1.7/server-options.html) 选项加载 keyring 插件。

    当你启动 MySQL 8.0 服务器时，它会自动检测是否存在数据字典表。如果没有，服务器将在数据目录中创建它们，用元数据填充它们，然后继续正常的启动顺序。在此过程中，服务器将升级所有数据库对象的元数据，包括数据库、表空间、系统和用户表、视图以及存储程序（存储过程和函数、触发器和事件调度器事件）。服务器还删除以前用于元数据存储的文件。例如，从 MySQL 5.7 升级到 MySQL 8.0 后，你可能会注意到表不再具有 `.frm` 文件。

    如果此步骤失败，服务器会将所有更改还原到数据目录。在这种情况下，你应该删除所有重做日志文件，在同一数据目录上启动 MySQL 5.7 服务器，并修复任何错误的原因。然后再次缓慢关闭 5.7 服务器并启动 MySQL 8.0 服务器重试。

9. 在上一步骤中，服务器根据需要升级数据字典。现在需要执行任何剩余的升级操作：

    从 MySQL8.0.16 开始，服务器会在上一步中执行此操作，在 MySQL5.7 和 MySQL8.0 之间的 `mysql` 系统数据库中进行所需的任何更改，以便你可以利用新的特权或功能。它还更新了 MySQL 8.0 的性能模式、`INFORMATION_SCHEMA` 和 `sys` 数据库，并检查所有用户数据库是否与当前版本的 MySQL 不兼容。

    在 MySQL 8.0.16 之前，服务器在上一步中只升级数据字典。MySQL 8.0 服务器成功启动后，执行 [`mysql_upgrade`](/4/4.4/4.4.5/mysql-update.html) 以执行剩余的升级任务：

    ```bash
    mysql_upgrade -u root -p
    ```

    然后关闭并重新启动 MySQL 服务器，以确保对系统表所做的任何更改都生效。例如：

    ```bash
    mysqladmin -u root -p shutdown
    mysqld_safe --user=mysql --datadir=/path/to/existing-datadir &
    ```

    第一次启动 MySQL 8.0 服务器时（在前面的步骤中），你可能会注意到错误日志中有关未升级表的消息。如果 [`mysql_upgrade`](/4/4.4/4.4.5/mysql-update.html) 已经成功运行，那么第二次启动服务器时应该不会出现这样的消息。

    :::tip 注意
    升级过程不会升级时区表的内容。有关升级说明，请参阅第5.1.15节“MySQL服务器时区支持”。

    如果升级过程使用 [`mysql_upgrade`](/4/4.4/4.4.5/mysql-update.html)（即 MySQL 8.0.16 之前的版本），那么该过程也不会升级帮助表的内容。有关这种情况下的升级说明，参阅[章节 5.1.17，“服务器端帮助支持”](/5/5.1.17/server-side-help-support.html)。
    :::

## 逻辑升级

逻辑升级包括使用备份或导出实用程序（如 [mysqldump](/4/4.5/4.5.4/mysqldump.html) 或 [mysqlpump](/4/4.5/4.5.6/mysqlpump) ）从旧 MySQL 实例导出 SQL，安装新的 MySQL 服务器，并将 SQL 应用到新的 MySQL 实例。有关可能需要升级的内容的详细信息，参阅[章节 2.11.3，“MySQL 升级过程升级的内容”](/2/2.11/2.11.3/upgrading-what-is-upgraded.html)。

:::tip 注意
对于某些 Linux 平台、RPM 或 Debian 包中的 MySQL 安装包括管理 MySQL 服务器启动和关闭的 systemd 支持。在这些平台上，未安装 [mysqld_safe](/4/4.3/4.3.2/mysqld-safe.html)。在这种情况下，请使用 systemd 来启动和关闭服务器，而不是使用以下说明中使用的方法。参阅[章节 2.5.9，“使用 systemd 管理 MySQL 服务器”](/2/2.5/2.5.9/using-systemd.html)。
:::

:::warning 警告
将从以前的 MySQL 版本中提取的 SQL 应用到新的 MySQL 版本可能会导致错误，因为新的、已更改的、已弃用的或已删除的特性和功能会导致不兼容。因此，从以前的 MySQL 版本中提取的 SQL 可能需要进行修改以实现逻辑升级。

要在升级到最新的 MySQL 8.0 版本之前识别不兼容性，请执行[章节 2.11.5，“准备升级安装”](/2/2.11/2.11.5/2/2.11/2.11.5/upgrade-prerequisites.html)中描述的步骤。
:::

要执行逻辑升级，请执行以下操作：
1. 查看[章节 2.11.1，“在你开始前”](/2/2.11/2.11.1/upgrade-before-you-begin.html)中的信息。
2. 从以前的 MySQL 安装导出现有数据：

    ```bash
    mysqldump -u root -p
        --add-drop-table --routines --events
        --all-databases --force > data-for-upgrade.sql
    ```

    :::tip 注意
    如果数据库中包含存储的程序，请在 [mysqldump](/4/4.5/4.5.4/mysqldump.html) 中使用 [--routines](/4/4.5/4.5.4/mysqldump.html) 和 [--events](/4/4.5/4.5.4/mysqldump.html) 选项（如上所示）。[--all-databases](/4/4.5/4.5.4/mysqldump.html) 选项包括转储中的所有数据库，包括保存系统表的 `mysql` 数据库。
    :::

    :::danger 重要
    如果你的表包含生成的列，请使用 MySQL 5.7.9 或更高版本提供的 [mysqldump](/4/4.5/4.5.4/mysqldump.html) 实用程序创建转储文件。早期版本中提供的 [mysqldump](/4/4.5/4.5.4/mysqldump.html) 实用程序对生成的列定义使用了错误的语法（Bug #20769542）。可以使用 `INFORMATION_SCHEMA.COLUMNS` 表来标识具有生成列的表。
    :::

3. 关闭旧的 MySQL 服务器。例如：

    ```bash
    mysqladmin -u root -p shutdown
    ```

4. 安装 MySQL 8.0。有关安装说明，参阅[章节 2，安装和升级MySQL](/2/installing.html)。

5. 初始化新的数据目录，如[章节 2.10.1，“初始化数据目录”](/2/2.10/2.10.1/data-directory-initialization.html)所述。例如：

    ```bash
    mysqld --initialize --datadir=/path/to/8.0-datadir
    ```

    将显示在屏幕上的临时 'root'@'localhost' 密码复制到错误日志中，以便以后使用。

6. 使用新的数据目录启动 MySQL 8.0 服务器。例如：

    ```bash
    mysqld_safe --user=mysql --datadir=/path/to/8.0-datadir &
    ```
7. 重置 `root` 密码：

    ```bash
    $> mysql -u root -p
    Enter password: ****  <- enter temporary root password
    ```

    ```bash
    mysql> ALTER USER USER() IDENTIFIED BY 'your new password';
    ```

8. 将先前创建的转储文件加载到新的 MySQL 服务器中。例如：

    ```bash
    mysql -u root -p --force < data-for-upgrade.sql
    ```

    :::tip 提示
    如果转储文件包含系统表，建议在服务器上启用 GTID 时（[gtid_mode=ON](/17/17.1/17.1.6/17.1.6.5/replication-options-gtids.html)）不加载转储文件。[mysqldump](/4/4.5/4.5.4/mysqldump.html) 为使用非事务性 `MyISAM` 存储引擎的系统表发出 DML 指令，并且在启用 GTID 时不允许这种组合。还要注意，将转储文件从启用了 GTID 的服务器加载到另一个启用了 GTID 的服务器，会生成不同的事务标识符。
    :::

9. 执行任何剩余的升级操作：

    - 在 MySQL 8.0.16 及更高版本中，关闭服务器，然后使用 [--upgrade=FORCE](/5/5.1/5.1.7/server-options.html) 选项重新启动服务器，以执行剩余的升级任务：

        ```bash
        mysqladmin -u root -p shutdown
        mysqld_safe --user=mysql --datadir=/path/to/8.0-datadir --upgrade=FORCE &
        ```

        在使用 [--upgrade=FORCE](/5/5.1/5.1.7/server-options.html) 重新启动时，服务器会对 MySQL 5.7 和 MySQL 8.0 之间的 `mysql` 系统模式进行任何所需的更改，以便你可以利用新的特权或功能。它还更新了 MySQL 8.0 的性能模式、`INFORMATION_SCHEMA` 和 `sys` 模式，并检查所有用户模式是否与当前版本的 MySQL 不兼容。

    - 在 MySQL 8.0.16 之前，执行 [mysql_upgrade](/4/4.4/4.4.5/mysql-upgrade.html) 以执行剩余的升级任务：

        ```bash
        mysql_upgrade -u root -p
        ```

        然后关闭并重新启动 MySQL 服务器，以确保对系统表所做的任何更改都生效。例如：

        ```bash
        mysqladmin -u root -p shutdown
        mysqld_safe --user=mysql --datadir=/path/to/8.0-datadir &
        ```

    :::tip 注意
    升级过程不会升级时区表的内容。有关升级说明，参阅[章节 5.1.15，“MySQL 服务器时区支持”](/5/5.1/5.1.15/time-zone-support.html)。
    
    如果升级过程使用 [mysql_upgrade](/4/4.4/4.4.5/mysql-upgrade.html)（即 MySQL 8.0.16 之前的版本），那么该过程也不会升级帮助表的内容。有关这种情况下的升级说明，参阅[章节 5.1.17，“服务器端帮助支持”](/5/5.1/5.1.17/server-side-help-support.html)。
    :::

    :::tip 注意
    加载包含 MySQL 5.7 `mysql` 模式的转储文件会重新创建两个不再使用的表：`event` 和 `proc`。（对应的 MySQL 8.0 表是 `events ` 和 `routines`，这两个表都是数据字典表，并且受到保护。）在你确信升级成功后，可以通过执行以下 SQL 语句删除 `event` 和 `proc` 表：

    ```bash
    DROP TABLE mysql.event;
    DROP TABLE mysql.proc;
    ```
    :::

## MySQL 集群升级

本节中的信息是就地升级中描述的就地升级过程的附件，用于升级 MySQL 集群。

从 MySQL 8.0.16 开始，MySQL 集群升级可以作为常规滚动升级执行，遵循通常的三个有序步骤：

1. 升级 MGM 节点。
2. 一次升级一个数据节点。
3. 一次升级一个 API 节点（包括 MySQL 服务器）。

升级每个节点的方式与 MySQL 8.0.16 之前的几乎相同，因为升级数据字典和升级系统表之间存在分离。升级每个 `mysqld` 有两个步骤：

1. 导入数据字典。

    使用 [--upgrade=MINIMAL](/5/5.1/5.1.7/server-options.html) 选项启动新服务器，以升级数据字典，但不升级系统表。这与 MySQL 8.0.16 之前的操作基本相同，即启动服务器而不调用 [mysql_upgrade](/4/4.4/4.4.5/mysql-upgrade.html)。

    MySQL 服务器必须连接到 `NDB` 才能完成此阶段。如果存在任何 `NDB` 或 `NDBINFO` 表，并且服务器无法连接到集群，则会退出并显示错误消息：

    ```bash
    Failed to Populate DD tables.
    ```

2. 升级系统表。

    在 MySQL 8.0.16 之前，DBA 调用 [mysql_upgrade](/4/4.4/4.4.5/mysql-upgrade.html) 客户端来升级系统表。从 MySQL 8.0.16 开始，服务器执行以下操作：要升级系统表，重启每个单独的 [mysqld](/4/4.3/4.3.1/mysqld.html)，而不使用 [--upgrade=MINIMAL](/5/5.1/5.1.7/server-options.html) 选项。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/upgrade-binary-package.html)
