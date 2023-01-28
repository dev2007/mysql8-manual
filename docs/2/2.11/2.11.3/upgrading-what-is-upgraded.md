# 2.11.3 MySQL 升级过程升级的内容

安装新版本的 MySQL 可能需要升级现有安装的以下部分：

- `mysql` 系统模式，其中包含存储 MySQL 服务器运行时所需信息的表（参阅[章节 5.3，“mysql 系统架构”](/5/5.3/system-schema.html)）。`mysql` 模式表分为两大类：
    - 数据字典表，用于存储数据库对象元数据。
    - 系统表（即剩余的非数据字典表），用于其他操作目的。

- 其他模式，其中一些是内置的，可能被认为是服务器“拥有”的，其他模式则不是：
    - 性能模式、`INFORMATION_SCHEMA`、[ndbinfo](/23/23.6/23.6.16/mysql-cluster-ndbinfo.html) 和 `sys` 模式。
    - 用户模式。

两个不同的版本号与可能需要升级的安装部分相关联：

- 数据字典版本。这适用于数据字典表。
- 服务器版本，也称为 MySQL 版本。这适用于其他模式中的系统表和对象。

在这两种情况下，适用于现有 MySQL 安装的实际版本都存储在数据字典中，当前预期版本被编译为新版本的 MySQL。当实际版本低于当前预期版本时，与该版本关联的安装部分必须升级到当前版本。如果两个版本都表明需要升级，则必须首先进行数据字典升级。

作为上述两个不同版本的反映，升级分为两个步骤：

- 步骤1：数据字典升级。

    此步骤升级：

    - `mysql` 模式中的数据字典表。如果实际数据字典版本低于当前预期版本，服务器将使用更新的定义创建数据字典表，将持久化元数据复制到新表，用新表原子替换旧表，并重新初始化数据字典。
    - 性能模式、`INFORMATION_SCHEMA` 和 `ndbinfo`。

- 步骤2：服务器升级。

    此步骤包括所有其他升级任务。如果现有 MySQL 安装的服务器版本低于新安装的 MySQL 版本，则必须升级所有其他版本：

    - `mysql` 模式中的系统表（其余的非数据字典表）。
    - `sys` 模式。
    - 用户模式。

数据字典升级（步骤1）由服务器负责，服务器在启动时根据需要执行此任务，除非使用阻止它执行此任务的选项进行调用。从 MySQL 8.0.16 开始，选项为 [--upgrade=NONE](/5/5.1/5.1.7/server-options.html)，从 MySQL 8.0.16 开始，选项是 [--no-dd-upgrade](/5/5.1/5.1.7/server-options.html)。

如果数据字典已过期，但服务器无法对其进行升级，则服务器不会运行，而是退出并返回错误。例如：

```bash
[ERROR] [MY-013381] [Server] Server shutting down because upgrade is
required, yet prohibited by the command line option '--upgrade=NONE'.
[ERROR] [MY-010334] [Server] Failed to initialize DD Storage Engine
[ERROR] [MY-010020] [Server] Data Dictionary initialization failed.
```

MySQL 8.0.16 中对步骤 2 的职责进行了一些更改：

- 在 MySQL 8.0.16 之前，[mysql_upgrade](/4/4.4/4.4.5/mysql-upgrade.html) 升级了性能模式、`INFORMATION_SCHEMA` 和步骤 2 中描述的对象。DBA 应该在启动服务器后手动调用 [mysql_upgrade](/4/4.4/4.4.5/mysql-upgrade.html)。
- 从 MySQL 8.0.16 开始，服务器执行以前由 [mysql_upgrade](/4/4.4/4.4.5/mysql-upgrade.html) 处理的所有任务。虽然升级仍然是一个两步操作，但服务器同时执行这两个操作，从而简化了过程。

根据要升级到的 MySQL 版本，[就地升级](/2/2.11/2.11.6/upgrade-binary-package.html#就地升级)和[逻辑升级](/2/2.11/2.11.6/upgrade-binary-package.html#逻辑升级)中的说明指示服务器是否执行所有升级任务，或者在服务器启动后是否还必须调用 [mysql_upgrade](/4/4.4/4.4.5/mysql-upgrade.html)。

:::tip 提示
由于服务器从 MySQL 8.0.16 开始升级性能模式、`INFORMATION_SCHEMA` 和步骤 2 中描述的对象，因此 [mysql_upgrade](/4/4.4/4.4.5/mysql-upgrade.html) 是不必要的，并且从该版本起已弃用；预计它将在 MySQL 的未来版本中删除。
:::

在步骤 2 中发生的大多数方面与 MySQL 8.0.16 之前和之后相同，但可能需要不同的命令选项来实现特定效果。

从 MySQL 8.0.16 开始，[--upgrade](/5/5.1/5.1.7/server-options.html) 服务器选项控制服务器是否以及如何在启动时执行自动升级：

- 如果没有选项或 [--upgrade=AUTO](/5/5.1/5.1.7/server-options.html)，服务器将升级它确定为过期的任何内容（步骤 1 和 2）。
- 如果 [--upgrade=NONE](/5/5.1/5.1.7/server-options.html)，服务器将不升级任何内容（跳过步骤 1 和 2），但如果必须升级数据字典，服务器也会退出并返回错误。无法使用过期的数据字典运行服务器；服务器坚持升级或退出。
- 使用 [--upgrade=MINIMAL](/5/5.1/5.1.7/server-options.html)，服务器将根据需要升级数据字典、性能模式和 `INFORMATION_SCHEMA`（步骤 1）。请注意，使用此选项升级后，无法启动组复制，因为复制内部结构所依赖的系统表未更新，而且在其他方面也可能会明显减少功能。
- 使用 [--upgrade=FORCE](/5/5.1/5.1.7/server-options.html)，服务器将根据需要升级数据字典、性能模式和 `INFORMATION_SCHEMA`（步骤 1），并强制升级所有其他内容（步骤 2）。由于服务器检查所有模式中的所有对象，因此使用此选项，服务器启动需要更长的时间。

如果服务器认为不需要执行步骤 2 操作，则 `FORCE` 可用于强制执行这些操作。`FORCE` 与 `AUTO` 的一个不同之处在于，使用 `FORCE`，如果缺少帮助表或时区表，服务器会重新创建系统表。

下表显示了 MySQL 8.0.16 之前的升级命令以及 MySQL 8.0.16 及更高版本的等效命令：

- 执行正常升级（必要时执行步骤 1 和 2）：
    - MySQL 8.0.16 之前的版本：[mysqld](/4/4.3/4.3.1/mysqld.html) 之后是 [mysql_upgrade](/4/4.4/4.4.5/mysql-upgrade.html)
    - 截至 MySQL 8.0.16：[mysqld](/4/4.3/4.3.1/mysqld.html)

- 必要时只执行步骤 1：
    - MySQL 8.0.16 之前的版本：不可能执行步骤1中描述的所有升级任务，同时排除步骤 2 中描述的任务。但是，可以避免使用 [mysqld](/4/4.3/4.3.1/mysqld.html)，然后使用 [--upgrade-system-tables](/4/4.4/4.4.5/mysql-upgrade.html) 和 [--skip-sys-schema](/4/4.4/4.4.5/mysql-upgrade.html) 选项升级 [mysql_upgrade](/4/4.4/4.4.5/mysql-upgrade.html) 来升级用户模式和 `sys` 模式。
    - 截至 MySQL 8.0.16：[mysqld --upgrade=MINIMAL](/4/4.3/4.3.1/mysqld.html)

- 必要时执行步骤1，强制执行步骤2：
    - MySQL 8.0.16 [mysqld](/4/4.3/4.3.1/mysqld.html) 后跟 [mysql_upgrade --force](/4/4.4/4.4.5/mysql-upgrade.html)
    - 截至MySQL 8.0.16：[mysqld --upgrade=FORCE](/4/4.3/4.3.1/mysqld.html)

在 MySQL 8.0.16 之前，某些 [mysql_upgrade](/4/4.4/4.4.5/mysql-upgrade.html) 选项会影响它执行的操作。下表显示了从 MySQL 8.0.16 开始要使用哪些服务器升级选项值来实现类似的效果。（这些不一定是完全等价的，因为给定的 `--upgrade` 选项值可能会产生额外的影响。）

|mysql_upgrade 选项|服务器选项|
|--|--|
|[--skip-sys-schema](/4/4.4/4.4.5/mysql-upgrade.html)|[--upgrade=NONE](/5/5.1/5.1.7/server-options.html) 或 [--upgrade=MINIMAL](/5/5.1/5.1.7/server-options.html)|
|[--upgrade-system-tables](/4/4.4/4.4.5/mysql-upgrade.html)|[--upgrade=NONE](/5/5.1/5.1.7/server-options.html) 或 [--upgrade=MINIMAL](/5/5.1/5.1.7/server-options.html)|
|[--force](/4/4.4/4.4.5/mysql-upgrade.html)|[--upgrade=FORCE](/5/5.1/5.1.7/server-options.html)|

有关升级步骤2期间发生的情况的其他说明：

- 步骤 2 安装 `sys` 模式（如果未安装），否则将其升级到当前版本。如果 `sys` 模式存在但没有 `version` 视图，则会发生错误，假设其不存在表示用户创建的模式：

    ```bash
    A sys schema exists with no sys.version view. If
    you have a user created sys schema, this must be renamed for the
    upgrade to succeed.
    ```

    要在这种情况下升级，请先删除或重命名现有的sys架构。然后再次执行升级过程。（可能需要强制执行步骤 2。）

    要防止 `sys` 模式检查，请执行以下操作：

    - 从 MySQL 8.0.16 开始：使用 `--upgrade=NONE`或 `--upgrad=MINIMAL` 选项启动服务器。
    - MySQL 8.0.16 之前的版本：使用 [--skip-sysschema](/4/4.4/4.4.5/mysql-upgrade.html) 选项调用 [mysql_upgrade](/4/4.4/4.4.5/mysql-upgrade.html)。

- 步骤 2 升级系统表以确保它们具有当前结构。无论服务器还是 [mysql_upgrade](/4/4.4/4.4.5/mysql-upgrade.html) 执行该步骤，都是如此。关于帮助表和时区表的内容，[mysql_upgrade](/4/4.4/4.4.5/mysql-upgrade.html) 不加载任何一种类型的表，而服务器加载帮助表，但不加载时区表。（即，在 MySQL 8.0.16 之前，服务器仅在数据目录初始化时加载帮助表。从 MySQL 8.0.16 开始，它在初始化和升级时加载帮助表。）加载时区表的过程依赖于平台，需要 DBA 做出决定，因此无法自动完成。

- 从 MySQL 8.0.30 开始，当步骤 2 升级 `mysql` 模式中的系统表时，`mysql.db`、`mysql.tables_priv`、`mysql.columns_priv` 和 `mysql.procs_priv` 表的主键中的列顺序将更改为将主机名和用户名列放在一起。将主机名和用户名放在一起意味着可以使用索引查找，这提高了 [CREATE USER](/13/13.7/13.7.1/13.7.1.3/create-user.html)、 [DROP USER](/13/13.7/13.7.1/13.7.1.5/drop-user.html) 和 [RENAME USER](/13/13.7/13.7.1/13.7.1.7/rename-user.html) 语句的性能，也提高了具有多个权限的多个用户的 ACL 检查的性能。删除和重新创建索引是必要的，如果系统拥有大量用户和权限，可能需要一些时间。

- 步骤 2 根据需要处理所有用户模式中的所有表。表检查可能需要很长时间才能完成。每个表都被锁定，因此在处理过程中其他会话无法使用。检查和修复操作可能很耗时，尤其是对于大型表。表检查使用 [CHECK TABLE](/13/13.7/13.7.3/13.7.3.2/check-table.html) 语句的 `FOR UPGRADE` 选项。有关此选项的详细信息，参阅[章节 13.7.3.2，“检查表声明”](/13/13.7/13.7.3/13.7.3.2/check-table.html)。

    要防止检查表，请执行以下操作：
        
    - 从 MySQL 8.0.16 开始：使用 `--upgrade=NONE` 或 `--upgrad=MINIMAL` 选项启动服务器。
    - MySQL 8.0.16 之前的版本：使用 [--upgrade-system-tables](/4/4.4/4.4.5/mysql-upgrade.html) 选项调用 [mysql_upgrade](/4/4.4/4.4.5/mysql-upgrade.html)。

    要强制检查表格，请执行以下操作：

    - 从MySQL 8.0.16 开始：使用 `--upgrade=FORCE` 选项启动服务器。
    - MySQL 8.0.16 之前的版本：使用 [--force](/4/4.4/4.4.5/mysql-upgrade.html) 选项调用 [mysql_upgrade](/4/4.4/4.4.5/mysql-upgrade.html)。

- 步骤 2 将 MySQL 版本号保存在数据目录中名为MySQL_upgrade_info的文件中。

    要忽略 `mysql_upgrade_info` 文件并执行检查，请执行以下操作：

    - 从 MySQL 8.0.16 开始：使用 `--upgrade=FORCE` 选项启动服务器。
    - MySQL 8.0.16 之前的版本：[--force](/4/4.4/4.4.5/mysql-upgrade.html) 选项调用 [mysql_upgrade](/4/4.4/4.4.5/mysql-upgrade.html)。

:::tip 注意
`mysql_upgrade_info` 文件已弃用；预计它将在 MySQL 的未来版本中删除。
:::

- 步骤 2 使用当前 MySQL 版本号标记所有检查和修复的表。这可以确保下次在服务器的同一版本上进行升级检查时，可以确定是否需要再次检查或修复给定的表。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/upgrading-what-is-upgraded.html)
