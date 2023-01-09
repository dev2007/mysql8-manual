# 2.11.5 准备升级安装

在升级到最新的 MySQL 8.0 版本之前，通过执行以下初步检查，确保当前 MySQL 5.7 或 MySQL 8.0 服务器实例的升级准备就绪。否则，升级过程可能会失败。

:::tip 注意
考虑使用 [MySQL Shell 升级检查器实用程序](https://dev.mysql.com/doc/mysql-shell/8.0/en/mysql-shell-utilities-upgrade.html)，该实用程序使你能够验证 MySQL 服务器实例是否已准备好升级。你可以选择计划升级到的目标 MySQL Server 版本，范围从 MySQL 服务器 8.0.11 到与当前 MySQL Shell 版本号匹配的 MySQL 服务器版本号。升级检查器实用程序执行与指定目标版本相关的自动检查，并建议你手动进行进一步的相关检查。升级检查器适用于 MySQL 5.7 和 8.0 的所有 GA 版本。MySQL Shell 的安装说明可在[此处](https://dev.mysql.com/doc/mysql-shell/8.0/en/mysql-shell-install.html)找到。
:::

初步检查：
1. 不得出现以下问题：

    - 不能有使用过时数据类型或函数的表。
    - 如果表包含 5.6.4 之前格式的旧时间列（[`TIME`](/11/11.2/11.2.3/time.html)、[`DATETIME`](/11/11.2/11.2.2/datetime.html) 和 [`TIMESTAMP`](/11/11.2/11.2.2/datetime.html) 列不支持小数秒精度），则不支持就地升级到 MySQL 8.0。如果你的表仍然使用旧的时间列格式，请在尝试就地升级到 MySQL 8.0 之前使用 [REPAIR TABLE](/13/13.7/13.7.3/13.7.3.5/repair-table.html) 对其进行升级。有关更多信息，参阅 [MySQL 5.7参考手册](https://dev.mysql.com/doc/refman/5.7/en/)中的[服务器变更](https://dev.mysql.com/doc/refman/5.7/en/upgrading-from-previous-series.html#upgrade-server-changes)。
    - 必须没有孤立的 `.frm` 文件。
    - 触发器不能有丢失的或空的定义符或无效的创建上下文（由 [SHOW TRIGGERS](/13/13.7/13.7.7/13.7.7.40/show-triggers.html) 或 `INFORMATION_SCHEMA` [TRIGGERS](/26/26.3/26.3.45/information-schema-triggers-table.html) 表显示的`character_set_client`、`collation_connection`、`Database Collation` 属性指示）。必须转储和恢复任何此类触发器以解决问题。

    要检查这些问题，请执行以下命令：

    ```bash
    mysqlcheck -u root -p --all-databases --check-upgrade
    ```

    如果 [mysqlcheck](/4/4.5/4.5.3/mysqlcheck.html) 报告任何错误，请更正问题。

2. 不能有使用不支持本机分区的存储引擎的分区表。要标识此类表，请执行以下查询：

    ```bash
    SELECT TABLE_SCHEMA, TABLE_NAME
    FROM INFORMATION_SCHEMA.TABLES
    WHERE ENGINE NOT IN ('innodb', 'ndbcluster')
    AND CREATE_OPTIONS LIKE '%partitioned%';
    ```

    查询所报告的任何表都必须更改为使用 `InnoDB` 或不分区。要将表存储引擎更改为InnoDB，请执行以下语句：

    ```bash
    ALTER TABLE table_name ENGINE = INNODB;
    ```

    有关将 `MyISAM` 表转换为 `InnoDB` 的信息，参阅[章节 15.6.1.5，“将表从 MyISAM 转换为 InnoDB”](/15/15.6/15.6.1/15.6.1.5/converting-tables-to-innodb.html)。

    要使分区表不分区，请执行以下语句：

    ```bash
    ALTER TABLE table_name REMOVE PARTITIONING;
    ```

3. MySQL 8.0 中可能保留了一些以前未保留的关键字。参阅[章节 9.3，“关键词和保留词”](/9/9.3/keywords.html)。这可能会导致以前用作标识符的单词变得非法。要修复受影响的语句，请使用标识符引号。参阅[章节 9.2，“模式对象名称”](/9/9.2/identifiers.html)。

4. MySQL 5.7 `mysql` 系统数据库中不能有与 MySQL 8.0 数据字典使用的表同名的表。要标识具有这些名称的表，请执行以下查询：

    ```bash
    SELECT TABLE_SCHEMA, TABLE_NAME
    FROM INFORMATION_SCHEMA.TABLES
    WHERE LOWER(TABLE_SCHEMA) = 'mysql'
    and LOWER(TABLE_NAME) IN
    (
    'catalogs',
    'character_sets',
    'check_constraints',
    'collations',
    'column_statistics',
    'column_type_elements',
    'columns',
    'dd_properties',
    'events',
    'foreign_key_column_usage',
    'foreign_keys',
    'index_column_usage',
    'index_partitions',
    'index_stats',
    'indexes',
    'parameter_type_elements',
    'parameters',
    'resource_groups',
    'routines',
    'schemata',
    'st_spatial_reference_systems',
    'table_partition_values',
    'table_partitions',
    'table_stats',
    'tables',
    'tablespace_files',
    'tablespaces',
    'triggers',
    'view_routine_usage',
    'view_table_usage'
    );
    ```

    必须删除或重命名查询报告的任何表（使用 [RENAME TABLE](/13/13.1/13.1.36/rename-table.html)）。这还可能需要更改使用受影响表的应用程序。

5. 不能有外键约束名称超过 64 个字符的表。使用此查询可标识约束名称过长的表：

    ```bash
    SELECT TABLE_SCHEMA, TABLE_NAME
    FROM INFORMATION_SCHEMA.TABLES
    WHERE TABLE_NAME IN
    (SELECT LEFT(SUBSTR(ID,INSTR(ID,'/')+1),
                INSTR(SUBSTR(ID,INSTR(ID,'/')+1),'_ibfk_')-1)
    FROM INFORMATION_SCHEMA.INNODB_SYS_FOREIGN
    WHERE LENGTH(SUBSTR(ID,INSTR(ID,'/')+1))>64);
    ```

    对于约束名称超过 64 个字符的表，请删除约束并将其添加回不超过 64 个的约束名称（使用 [`ALTER TABLE`](/13/13.1/13.1.9/alter-table.html)）。

6. [sql_mode](/5/5.1/5.1.8/server-system-variables.html) 系统变量不能定义过时的 SQL 模式。尝试使用过时的 SQL 模式会阻止 MySQL 8.0 启动。应修改使用过时 SQL 模式的应用程序以避免它们。有关 MySQL 8.0 中删除的 SQL 模式的信息，参阅[服务器变更](/2/2.11/2.11.4/upgrading-from-previous-series.html#服务器变更)。

7. 任何视图的显式定义列名不得超过 64 个字符（MySQL 5.7 中允许列名最多为 255 个字符的视图）。为避免升级错误，应在升级前更改此类视图。目前，识别列名超过 64 个字符的视图的唯一方法是使用 [SHOW CREATE VIEW](/13/13.7/13.7.13/show-create-view.html) 检查视图定义。还可以通过查询 [INFORMATION_SCHEMA.VIEWS](/26/26.3/26.3.48/information-schema-views-table.html) 表来检查视图定义。

8. 任何表或存储过程的单个 `ENUM` 或 `SET` 列元素的长度不得超过 255 个字符或 1020 个字节。在 MySQL 8.0 之前，`ENUM` 或 `SET` 列元素的最大组合长度为 64K。在 MySQL 8.0 中，单个 `ENUM` 或 `SET` 列元素的最大字符长度为 255 个字符，最大字节长度为 1020 个字节。（1020 字节限制支持多字节字符集）。升级到 MySQL 8.0 之前，请修改超过新限制的任何 `ENUM` 或 `SET` 列元素。否则将导致升级失败并出现错误。
9. 在升级到 MySQL 8.0.13 或更高版本之前，共享的 `InnoDB` 表空间中必须没有表分区，其中包括系统表空间和通用表空间。通过查询 `INFORMATION_SCHEMA` 标识共享表空间中的表分区：

    如果从MySQL 5.7升级，请运行以下查询：

    ```bash
    SELECT DISTINCT NAME, SPACE, SPACE_TYPE FROM INFORMATION_SCHEMA.INNODB_SYS_TABLES
    WHERE NAME LIKE '%#P#%' AND SPACE_TYPE NOT LIKE 'Single';
    ```

    如果从早期的 MySQL 8.0 版本升级，请运行以下查询：

    ```bash
    SELECT DISTINCT NAME, SPACE, SPACE_TYPE FROM INFORMATION_SCHEMA.INNODB_TABLES
        WHERE NAME LIKE '%#P#%' AND SPACE_TYPE NOT LIKE 'Single';
    ```

    使用 [ALTER TABLE ... REORGANIZE PARTITION](/13/13.1/13.1.9/alter-table.html) 将表分区从共享表空间移动到每个表的文件表空间：

    ```bash
    ALTER TABLE table_name REORGANIZE PARTITION partition_name
        INTO (partition_definition TABLESPACE=innodb_file_per_table);
    ```

10. MySQL 8.0.12 或更低版本中的查询和存储程序定义不能对 `GROUP BY` 子句使用 `ASC` 或 `DESC` 限定符。否则，升级到 MySQL 8.0.13 或更高版本可能会失败，复制到 MySQL 8.0-13 或更高副本服务器也可能会失败。有关其他详细信息，参阅[SQL 变更](/2/2.11/2.11.4/upgrading-from-previous-series.html#SQL-变更)。

11. 你的 MySQL 5.7 安装不得使用 MySQL 8.0 不支持的功能。此处的任何更改都必须是特定于安装的，但以下示例说明了需要查找的内容：

    MySQL 8.0 中删除了一些服务器启动选项和系统变量。参阅 [MySQL 8.0 中删除的特性](/1/1.3/mysql-nutshell.html#mysql-8-0-弃用特性)，以及[章节 1.4，“MySQL 8.0 中添加的、不推荐的或删除的服务器和状态变量和选项”](/1/1.4/added-deprecated-removed.html)。如果你使用这些功能，升级需要更改配置。

    示例：因为数据字典提供有关数据库对象的信息，所以服务器不再检查数据目录中的目录名以查找数据库。因此，`--ignore-db-dir` 选项是多余的，已被删除。要处理此问题，请从启动配置中删除 `--ignore-db-dir` 的所有实例。此外，在升级到 MySQL 8.0 之前，请删除或移动已命名的数据目录子目录。（或者，让 8.0 服务器将这些目录作为数据库添加到数据字典中，然后使用 [DROP DATABASE](/13/13.1/13.1.24/drop-database.html) 删除每个数据库。）

12. 如果你打算在升级时将 [lower_case_table_names](/5/5.1/5.1.8/server-system-variables.html) 设置更改为 `1`，请确保模式和表名在升级前为小写。否则，可能会由于架构或表名字母大小写不匹配而发生故障。可以使用以下查询检查包含大写字符的架构和表名：

    ```bash
    mysql> select TABLE_NAME, if(sha(TABLE_NAME) !=sha(lower(TABLE_NAME)),'Yes','No') as UpperCase from information_schema.tables;
    ```

    从 MySQL 8.0.19 开始，如果 [lower_case_table_names=1](/5/5.1/5.1.8/server-system-variables.html)，升级过程将检查表和模式名称，以确保所有字符都是小写的。如果发现表或架构名称包含大写字符，则升级过程将失败并出现错误。

    :::tip 注意
    不建议在升级时更改 [lower_case_table_names](/5/5.1/5.1.8/server-system-variables.html) 设置。
    :::

如果由于上述任何问题导致升级到 MySQL 8.0 失败，服务器会将所有更改还原到数据目录。在这种情况下，删除所有重做日志文件，并在现有数据目录上重新启动 MySQL 5.7 服务器以解决错误。默认情况下，重做日志文件（`ib_logfile*`）位于 MySQL 数据目录中。修复错误后，在再次尝试升级之前，执行缓慢关闭（通过设置 [innodb_fast_shutdown=0](innodb-parameters.html)）。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/upgrade-prerequisites.html)
