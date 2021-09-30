# 1.3 MySQL 8.0 有什么新功能

> 译者：此篇内容非常丰富，全文约三万三千字，如果只是想学习 MySQL，而不是关注版本特性差异的，建议忽略此篇。

本节总结了 MySQ L8.0 中添加、弃用和删除的内容。附带的一节列出了 MySQL 8.0 中添加、弃用或删除的 MySQL server 选项和变量；参阅[章节 1.4，“MySQL 8.0 中添加、弃用或删除的服务器和状态变量及选项”](/1/1.4/added-deprecated-removed)。

- [MySQL 8.0 新增特性](/1/1.3/mysql-nutshell?id=MySQL-80-新增特性)
- [MySQL 8.0 弃用特性](/1/1.3/mysql-nutshell?id=MySQL-80-弃用特性)
- [MySQL 8.0 移除特性](/1/1.3/mysql-nutshell?id=MySQL-80-移除特性)

## MySQL 8.0 新增特性

以下特性已添加到 MySQL 8.0：

- **数据字典**。MySQL 现在集成了一个事务性数据字典，它存储数据库对象的信息。在以前的 MySQL 版本中，字典数据存储在元数据文件和非事务表中。更多信息，参阅[章节14，MySQL 数据字典](/14/data-dictionary)。

- **原子数据定义语句（原子 DDL）**。原子 DDL 语句将数据字典更新、存储引擎操作和与 DDL 操作相关联的二进制日志写入合并到单个原子事务中。更多信息，参阅[章节 13.1.1，“原子数据定义语句支持”](/13/13.1/13.1.1/atomic-ddl)。

- **升级存储过程**。以前，安装了新版 MySQL 后，MySQL server 会在下次启动时自动升级数据字典表，之后 DBA 会手动调用 [`mysql_upgrade`](/4/4.4/4.4.5/mysql-update) 来升级 `mysql` 模式（schema）中的系统表，以及 `sys` 模式和 user 模式等其他模式中的对象。

从 MySQL 8.0.16 开始，服务器执行 [`mysql_upgrade`](/4/4.4/4.4.5/mysql-update) 之前处理的任务。安装新 MySQL 版本后，服务器在下次启动时将自动执行所有必要的升级任务，而不依赖 DBA 调用 [`mysql_upgrade`](/4/4.4/4.4.5/mysql-update) 升级。此外，服务器更新帮助表的内容（一些 [`mysql_upgrade`](/4/4.4/4.4.5/mysql-update) 不会做这个）。一个新的 [`--upgrade`](/5/5.1/5.1.7/server-options) 服务器选项提供了服务器如何执行自动数据字典和服务器升级操作。更多信息，参阅[章节 2.11.3，“MySQL 升级过程升级了什么”](/2/2.11/2.11.3/upgrading-what-is-upgraded)。

- **安全和帐户管理**。添加这些增强功能是为了提高安全性并增强 DBA 在帐户管理方面的灵活性：
  
  - `mysql` 系统数据库中的 grant 表现在是 `InnoDB`（事务）表。之前，这些是 `MyISAM`（非事务）表。grant 表存储引擎的变化，是伴随着帐户管理语句行为变化的基础。之前，命名多个用户的帐户管理语句（如 [`CREATE USER`](/13/13.7/13.7.1/13.7.1.3/create-user) 或 [`DROP USER`](/13/13.7/13.7.1/13.7.1.5/drop-user)）对某些用户可能成功，而对其他用户可能失败。现在，每条语句都是事务性的，要么对所有命名用户都成功，要么回滚，如果发生任何错误都没有效果。如果语句成功，则将其写入 binary log （二进制日志），如果语句失败，则不会写入；在这种情况下，将发生回滚，并且不进行任何更改。更多信息，参阅[章节13.1.1，“原子数据定义语句支持”](/13/13.1/13.1.1/atomic-ddl)。

  - 提供了一个新的 `caching_sha2_password` 认验插件。与 `sha256_password` 插件一样，`caching_sha2_password` 实现 SHA-256 密码散列，但使用缓存来解决连接时的延迟问题。它还支持更多的传输协议，不要求与 OpenSSL 链接，以实现基于 RSA 密钥对的密码交换功能。参阅[章节 6.4.1.2，“缓存 SHA-2 可插拔身份验证”](/6/6.4/6.4.1/6.4.1.2/caching-sha2-pluggable-authentication)。

  `caching_sha2_password` 和 `sha256_password` 认证插件提供了比 `mysql_native_password` 插件更安全的密码加密，`caching_sha2_password` 提供了比 `sha256_password`更好的性能。由于 `caching_sha2_password` 的这些优越的安全性和性能特点，它现在是首选的身份验证插件，也是默认的身份验证插件，而不是 `mysql_native_password`。有关此默认插件更改对服务器操作的影响以及服务器与客户端和连接器的兼容性的信息,参阅[caching-sha2-password 作为首选认证插件](/2/2.11/2.11.4/upgrading-from-previous-series?id=caching-sha2-password-作为首选认证插件)。

  - MySQL 现在支持角色，这些角色被命名为权限集合。角色可以创建和删除。角色也可以被授予或撤消权限。可以向用户帐户授予角色，也可以撤消角色。可以从授予帐户的角色中选择帐户的激活的适用角色，并且可以在该帐户的会话期间更改这些角色。更多信息，参阅[章节 6.2.10，“使用角色”](/6/6.2/6.2.10/roles)。

  - MySQL 现在引入了用户帐户类别的概念，根据系统用户和普通用户是否拥有 `SYSTEM_USER` 权限来区分他们。更多信息，参阅[章节 6.2.11，“账户分类”](/6/6.2/6.2.11/account-categories)。

  - 以前，除了特定 schemas(模式)之外，其他的不可能授予全局应用的权限。现在如果 `partial_revokes` 系统变量启用，就可以这样做了。参阅[章节 6.2.12，“使用部分撤销的权限限制”](/6/6.2/6.2.12/partial-revokes)。

  - [`GRANT`](/13/13.7/13.7.1/13.7.1.6/grant) 语句有一个 `AS user [WITH ROLE]` 子句，该子句指定有关语句执行的权限上下文的附加信息。这种语法在 SQL 级别是可见的，尽管它的主要目的是通过让这些限制出现在二进制日志中来实现统一复制，方式就是对所有节点的授予者权限施加限制。参阅[章节 13.7.1.6，“GRANT 语句”](/13/13.7/13.7.1/13.7.1.6/grant)。

  - MySQL 现在维护有关密码历史的信息，从而允许对以前密码的重用进行限制。DBA 可能要密码变更次或从一定时间段内的旧密码中选择新密码。可以在全局和每个帐户的基础上建立密码重用策略。

  现在可以要求通过指定要替换的当前密码来验证更改帐户密码的尝试。这使得 DBA 可以防止用户在不证明他们知道当前密码的情况下更改密码。可以在全局或每个帐户基础上建立密码验证策略。

  帐户现在允许有双重密码，这使得分阶段的密码修改可以在复杂的多服务器系统中无缝执行，无需停机。

  MySQL 现在允许管理员配置用户帐户，这样错误的密码太多连续的登录失败会导致临时的帐户锁定。每个帐户可配置所需的失败次数和锁定时间。

  - MySQL 现在支持 FIPS 模式，如果使用 OpenSSL 编译，在运行时就可以使用 OpenSSL 库和 FIPS 对象模块。FIPS 模式对加密操作施加条件，例如对可接受的加密算法的限制或对更长的密钥长度的要求。参阅[章节 6.8，“FIPS 支持”](/6/6.8/fips-mode)。

  - 服务器用于新连接的 TLS 上下文现在在运行时是可重新配置的。这个功能可能很有用，例如，避免重新启动运行了很长时间以至于 SSL 证书已经过期的 MySQL server。参阅[加密连接服务端运行配置及监控](/6/6.3/6.3.1/using-encrypted-connections?id=加密连接服务端运行配置及监控)。

  - OpenSSL 1.1.1 支持 TLS v1.3 协议进行加密连接，如果服务器和客户端都使用 OpenSSL 1.1.1 或更高版本编译，MySQL 8.0.16 及更高版本也支持 TLS v1.3协议。参阅[章节 6.3.2，“加密连接 TLS 协议和密码”](/6/6.3/6.3.2/encrypted-connection-protocols-ciphers)。

  - MySQL 现在将在命名管道上授予客户端的访问控制设置为在 Windows 上成功通信所需的最小值。更新的 MySQL 客户端软件可以在没有任何附加配置的情况下打开命名管道连接。如果不能立即升级旧的客户端软件，可以使用新的 `named_pipe_full_access_group` 系统变量为 Windows 组提供打开命名管道连接所需的权限。完全访问组的成员资格应该是受限的和临时的。

- **资源管理**。现在可以要求验证尝试更改帐户密码的行为，方式是通过指定要替换的当前密码。这使得 DBA 能够防止用户在不知道当前密码的情况下更改密码。可以在全局以及每个帐户的基础上建立密码验证策略。更多信息，参阅[章节 5.1.6，“资源组”](/5/5.1/5.1.6/resource-groups)。

- **表加密管理**。现在可以通过定义和强制加密默认值来全局管理表加密。`default_table_encryption` 变量定义新创建的模式和常规表空间的加密默认值。在创建模式时，还可以使用 `DEFAULT ENCRYPTION` 子句定义架构的加密默认值。默认情况下，表继承它在创建时所在的模式或常规表空间的加密。加密默认值通过启用表 `table_encryption_privilege_check` 变量来强制开启。当使用与 `default_table_encryption`设置不同的加密设置来创建或修改模式或常规表空间时，或使用与默认模式加密不同的加密设置来创建或更改表时，会发生权限检查。`TABLE_ENCRYPTION_ADMIN` 权限允许在启用 `table_encryption_privilege_check` 时重写默认加密设置。更多信息，参阅[为模式和常规表空间定义加密默认值](/15/15.13/innodb-data-encryption?id=为模式和常规表空间定义加密默认值)。

- **InnoDB 增强功能**。添加了以下 InnoDB 增强功能：
  - 每次值改变时，当前自动增量计数器的最大值就被写入 redo log（重做日志），并保存到每个检查点上的引擎专用系统表中。这些更改使当前最大自动增量计数器值在服务器重启时保持不变。另外:
    - 服务器重启不再取消 `AUTO_INCREMENT = N` 表选项的效果。如果你将自动递增计数器初始化为一个特定的值，或者将自动递增计数器的值更改为一个更大的值，则新值将在服务器重启时持久化。
    - 在 [`ROLLBACK`](/13/13.3/13.3.1/commit) 操作之后立即重启服务器将不再导致分配给回滚事务的自动增量值的重用。
    - 如果将 `AUTO_INCREMENT` 列值修改为大于当前最大自动增量值的值(例如，在 [`UPDATE`](/13/13.2/13.2.13/update) 操作中)，则新值将被持久化，后续的 [`INSERT`](/13/13.2/13.2.6/insert) 操作将从新的更大的值开始分配自动增量值。

    更多信息，参阅[章节 15.6.1.6，“InnoDB 中的 AUTO_INCREMENT 处理”](/15/15.6/15.6.1/15.6.1.6/innodb-auto-increment-handling)和["InnoDB AUTO_INCREMENT 计数器初始化"](/15/15.6/15.6.1/15.6.1.6/innodb-auto-increment-handling?id=InnoDB-AUTO_INCREMENT-计数器初始化)。

  - 当遇到索引树损坏时，`InnoDB` 会在重做日志中写入一个损坏标志，这会使损坏标志崩溃是安全的。`InnoDB` 还将内存中的损坏标志数据写入每个检查点上的引擎专用系统表。在恢复过程中，`InnoDB` 从这两个位置读取损坏标志并合并结果，然后将内存中的表和索引对象标记为损坏。

  - `InnoDB` **memcached** 插件支持多个获取操作（在一个 **memcached** 查询中获取多个键值对）和范围查询。参阅[章节 15.20.4，“InnoDB memcached 多个获取和范围查询支持”](/15/15.20/15.20.4/innodb-memcached-multiple-get-range-query)。

  - 一个新的动态变量 [`innodb_deadlock_detect`](/15/15.14/innodb-parameters?id=innodb_deadlock_detect) 可用于禁用死锁检测。在高并发系统上，当多个线程等待同一个锁时，死锁检测可能会导致速度减慢。有时，禁用死锁检测并在死锁发生时依赖 [`innodb_lock_wait_timeout`](/15/15.14/innodb-parameters?id=innodb_lock_wait_timeout) 设置事务回滚可能更有效。

  - 新的 [`INFORMATION_SCHEMA.INNODB_CACHED_INDEXES`](/26/26.4/26.4.5/information-schema-innodb-cached-indexes-table) 表报告每个索引在 `INNODB` 缓冲池中缓存的索引页数。
  - `InnoDB` 临时表现在是在共享临时表空间 `ibtmp1 中创建的。
  - `InnoDB` [表空间加密功能](/15/15.13/innodb-data-encryption)支持重做日志和撤消日志数据的加密。参阅[重做日志加密](/15/15.13/innodb-data-encryption?id=重做日志加密)，及[撤销日志加密](/15/15.13/innodb-data-encryption?id=撤销日志加密)。
  - `InnoDB` 支持 `NOWAIT` 和 `SKIP LOCKED` 选项，以及 `SELECT ... FOR SHARE` 及 `SELECT ... FOR UPDATE` 锁定读取语句。如果请求的行被另一个事务锁定，`NOWAIT` 会导致语句立即返回。`SKIP LOCKED` 从结果集中删除锁定的行。参阅[读锁](/15/15.7/15.7.2/15.7.2.4/innodb-locking-reads?id=用-NOWAIT-和-SKIP-锁定读并发)。

  `SELECT ... FOR SHARE` 替代了 `SELECT ... LOCK IN SHARE MODE`，但 `LOCK IN SHARE MODE` 仍然向后兼容。这两个语句是等价的。然而，`FOR UPDATE` 和 `FOR SHARE` 支持 `NOWAIT`，`SKIP LOCKED` 和 `OF tbl_name` 选项。参阅[章节 13.2.10，“SELECT 语句”](/13/13.2/13.2.10/select)。

  `OF tbl_name` 用于锁定指定表的查询。

  - `ADD PARTITION`， `DROP PARTITION`， `COALESCE PARTITION`， `REORGANIZE PARTITION` 和 `REBUILD PARTITION` [`ALTER TABLE`](/13/13.1/13.1.9/alter-table) 选项由本地分区的 API 支持，并且可以和 `ALGORITHM={COPY|INPLACE}` 及 `LOCK` 子句一起使用。

  `DROP PARTITION` 带 `ALGORITHM=INPLACE` 删除存储在分区中的数据并删除分区。然而，`DROP PARTITION` 带 `ALGORITHM=COPY` 或 [`old_alter_table=ON`](/5/5.1/5.1.8/server-system-variables) 重新生成分区表，并尝试将数据从删除的分区移动到通过兼容 `PARTITION ... VALUES` 定义另一个分区。

  - `InnoDB` 存储引擎现在使用 MySQL 数据字典，而不是它自己的存储引擎特定的数据字典。有关数据字典更多信息，参阅[章节 14，MySQL 数据字典](/14/data-dictionary)。
  - `mysql` 系统表和数据字典表现在在 MySQL 数据目录中的一个名为 `mysql.ibd` 的 `InnoDB` 表空间文件中创建。以前，这些表是在 `mysql` 数据库目录中的单个 `InnoDB` 表空间文件中创建的。
  - MySQL 8.0 中引入了以下 undo（撤消）表空间更改：
    - 默认情况下，撤销日志现在驻留在两个撤销表空间中，这两个表空间是在 MySQL 实例初始化时创建的。撤消日志不再在系统表空间中创建。
    - 从 MySQL 8.0.14 开始，运行时可以使用 [`CREATE UNDO TABLESPACE`](/13/13.1/13.1.21/create-tablespace) 语法在所选位置创建其他撤销表空间。

    ```bash
    CREATE UNDO TABLESPACE tablespace_name ADD DATAFILE 'file_name.ibu';
    ```

    使用 [`CREATE UNDO TABLESPACE`](/13/13.1/13.1.21/create-tablespace) 语法创建的撤销表空间可以在运行时使用 [`DROP UNDO TABLESPACE`](/13/13.1/13.1.33/drop-tablespace) 语法删除。

    ```bash
    DROP UNDO TABLESPACE tablespace_name;
    ```

    `ALTER UNDO TABLESPACE` 语法可用于将一个撤消表空间标记为活动或非活动。

    ```bash
    ALTER UNDO TABLESPACE tablespace_name SET {ACTIVE|INACTIVE};
    ```

    [`INFORMATION_SCHEMA.INNODB_TABLESPACES`](/26/26.4/26.4.24/information-schema-innodb-tablespaces-table) 表中的列 `STATE` 显示表空间状态。一个撤销表空间在可以删除前必须处于 `empty` 状态。

    - [`innodb_undo_log_truncate`](/15/15.14/innodb-parameters) 变量默认启用。
    - [`innodb_rollback_segments`](/15/15.14/innodb-parameters) 变量定义每个撤消表空间的回滚段数。以前，[`innodb_rollback_segments`](/15/15.14/innodb-parameters) 指定 MySQL 实例的回滚段总数。此更改增加了可用于并发事务的回滚段的数量。更多的回滚段增加了并发事务对撤消日志使用单独回滚段的可能性，从而减少了资源竞争。
  - 已修改影响缓冲池预刷新和刷新行为的变量的默认值：
    - [`innodb_max_dirty_pages_pct_lwm`](/15/15.14/innodb-parameters) 默认值现在为 10。以前默认值 0 禁用缓冲池预刷新。当缓冲池中脏页的百分比超过 10% 时，值 10 将启用预刷新。启用预冲洗可提高性能一致性。
    - [`innodb_max_dirty_pages_pct`](/15/15.14/innodb-parameters) 默认值由 75 增加到 90。`InnoDB` 尝试从缓冲池中刷新数据，以便脏页的百分比不超过此值。增加的默认值允许缓冲池中脏页的百分比增加。
  - 默认的 [`innodb_autoinc_lock_mode`](/15/15.14/innodb-parameters) 设置现在为 2（交错）。交错锁模式允许并行执行多行插入，提高了并发性和可扩展性。[`innodb_autoinc_lock_mode`](/15/15.14/innodb-parameters) 新的默认设置反映了 MySQL 5.7 中默认复制类型从基于语句的复制到基于行的复制的变化。基于语句的复制需要连续自动增量锁定模式（以前的默认模式），以确保以可预测和可重复的顺序为给定的 SQL 语句序列分配自动增量值，而基于行的复制对 SQL 语句的执行顺序不敏感。更多信息，参阅[](/15/15.6/15.6.1/15.6.1.6/innodb-auto-increment-handling?id=InnoDB-AUTO_INCREMENT-锁模式)。

  对于使用基于语句的复制的系统，新的 [`innodb_autoinc_lock_mode`](/15/15.14/innodb-parameters) 默认设置可能会中断依赖于顺序自动增量值的应用程序。为了恢复以前的默认值，设置 [`innodb_autoinc_lock_mode`](/15/15.14/innodb-parameters) 为 1。

  - 重命名常规表空间，由语法 [`ALTER TABLESPACE ... RENAME TO`](/13.1.10/alter-tablespace) 支持。

  - 新增变量 [`innodb_dedicated_server`](/15/15.14/innodb-parameters)，默认是禁用的，它可用于让 `InnoDB` 根据在服务器上检测到的内存量自动配置以下选项：
    - [`innodb_buffer_pool_size`](/15/15.14/innodb-parameters)
    - [`innodb_log_file_size`](/15/15.14/innodb-parameters)
    - [`innodb_flush_method`](/15/15.14/innodb-parameters)
  
    此选项适用于在专用服务器上运行的 MySQL sever 实例。更多信息，参阅[章节 15.8.12，“启用专用 MySQL Server 的自动配置”](/15/15.8/15.8.12/innodb-dedicated-server)。

  - 新的 [`INFORMATION_SCHEMA.INNODB_TABLESPACES_BRIEF`](/26/26.4/26.4.25/information-schema-innodb-tablespaces-brief-table) 视图为 `InnoDB` 表空间提供空间、名称、路径、标志和空间类型数据。
  - 与 MySQL 捆绑的 [zlib 库](http://www.zlib.net/)版本从版本 1.2.3 提升到版本 1.2.11。MySQL 在 zlib 库的帮助下实现压缩。

  如果你使用 `InnoDB` 压缩表，参阅[章节 2.11.4，“MySQL 8.0 中的更改”](/2/2.11/2.11.4/upgrading-from-previous-series)了解相关的升级含义。

  - 序列化字典信息（Serialized dictionary information，SDI）存在于所有 `InnoDB` 表空间文件中，但全局临时表空间和撤消表空间文件除外。SDI 是表和表空间对象的序列化元数据。SDI 数据的存在提供了元数据冗余。例如，如果数据字典变得不可用，则可以从表空间文件中提取字典对象元数据。使用 [ibd2sdi](/4/4.6/4.6.1/ibd2sdi) 工具执行 SDI 提取。SDI 数据以 `JSON` 格式存储。

  在表空间文件中包含 SD I数据会增加表空间文件的大小。SDI 记录需要单个索引页，默认情况下索引页的大小为 16KB。但是，存储 SDI 数据时会对其进行压缩，以减少存储占用空间。

  - `InnoDB` 存储引擎现在支持原子 `DDL`，它确保 `DDL` 操作要么完全提交，要么回滚，即使服务器在操作期间停止。更多信息，参阅[章节 13.1.1，“原子数据定义语句支持”](/13/13.1/13.1.1/atomic-ddl)。
  - 当服务器离线时，可以使用 [`innodb_directories`](/15/15.14/innodb-parameters) 选项将表空间文件移动或恢复到新位置。更多信息，参阅[章节 15.6.3.6，“在服务器离线时移动表空间文件”](/15/15.6/15.6.3/15.6.3.6/innodb-moving-data-files-offline)。
  - 实现了以下重做日志优化：
    - 用户线程现在可以并发地写入日志缓冲区，而无需同步写入。
    - 用户线程现在可以轻松地将脏页添加到刷新列表中。
    - 现在，一个专用的日志线程负责将日志缓冲区写入系统缓冲区、将系统缓冲区刷新到磁盘、向用户线程通知已写入和已刷新的重做、维护松弛的刷新列表顺序所需的延迟以及写入检查点。
    - 添加了系统变量，用于配置等待刷新重做的用户线程使用自旋延迟：
      - [`innodb_log_wait_for_flush_spin_hwm`](/15/15.14/innodb-parameters)：定义等待刷新重做时用户线程不再旋转的最大平均日志刷新时间。
      - [`innodb_log_spin_cpu_abs_lwm`](/15/15.14/innodb-parameters)：定义在等待刷新重做时用户线程不再旋转的最小 CPU 使用量。
      - [`innodb_log_spin_cpu_pct_hwm`](/15/15.14/innodb-parameters)：定义在等待刷新重做时用户线程不再旋转的最大 CPU 使用量。
    - [`innodb_log_buffer_size`](/15/15.14/innodb-parameters) 变量现在是动态的，它允许在服务器运行时调整日志缓冲区的大小。

    更多信息，参阅[章节 8.5.4，“优化 InnoDB 重做日志”](/8/8.5/8.5.4/optimizing-innodb-logging)。

  - 从 MySQL 8.0.12 开始，对大对象（large object，LOB）数据的小更新支持撤销日志，这提高了大小小于等于 100 字节的 LOB 更新的性能。以前，LOB 更新的大小至少为一个 LOB 页，对于只修改几个字节的更新来说，这不是最佳的。此增强基于 MySQL 8.0.4 中添加的对 LOB 数据部分更新的支持。
  - 从 MySQL 8.0.12 开始，以下 [`ALTER TABLE`](/13/13.1/13.1.9/alter-table) 操作支持 `ALGORITHM=INSTANT`：
    - 添加列。此功能也称为“即时 `ADD COLUMN`”。限制使用。参阅[章节 15.12.1，“在线 DDL 操作”](/15/15.12/15.12.1/innodb-online-ddl-operations)。
    - 添加或删除虚拟列。
    - 添加或删除列默认值。
    - 修改 [`ENUM`](/11/11.3/11.3.5/enum) 或 [`SET`](/11/11.3/11.3.6/set) 列定义。
    - 改变索引类型。
    - 重命名表。

    支持 `ALGORITHM=INSTANT` 的操作只修改数据字典中的元数据。表上没有元数据锁，并且表数据不受影响，这使得操作是即时的。如果没有明确指定，默认情况下，支持算法的操作将使用 `ALGORITHM=INSTANT`。如果指定了 `ALGORITHM=INSTANT` 但不支持，则操作会立即失败并出现错误。

    有关支持 `ALGORITHM=INSTANT` 的操作的更多信息，参阅[章节 15.12.1，“在线 DDL 操作”](/15/15.12/15.12.1/innodb-online-ddl-operations)。

  - 从 MySQL 8.0.13 开始，`TempTable` 存储引擎支持二进制大对象（binary large object，BLOB）类型列的存储。这种增强提高了使用包含 BLOB 数据的临时表的查询的性能。以前，包含 BLOB 数据的临时表，存储在由内部磁盘存储引擎定义的磁盘存储引擎中。更多信息，参阅[章节 8.4.4，“在 MySQL 中内部临时表的使用”](/8/8.4/8.4.4/internal-temporary-tables)。
  - 从 MySQL 8.0.13 开始，`InnoDB` 静态数据加密特性支持通用表空间。以前，只能对每个表的文件表空间进行加密。为了支持一般表空间的加密，[`CREATE TABLESPACE`](/13/13.1/13.1.21/create-tablespace) 和 [`ALTER TABLESPACE`](/13/13.1/13.1.10/alter-tablespace) 语法被扩展为包含一个 `ENCRYPTION` 子句。

  [`NFORMATION_SCHEMA.INNODB_TABLESPACES`](/26/26.4/26.4.24/information-schema-innodb-tablespaces-table) 表，现在包含一个 `ENCRYPTION` 列，指示表空间是否加密。

  `stage/innodb/alter tablespace (encryption)` 添加了 Performance Schema 阶段工具以允许监视常规表空间加密操作。

  - 禁用 `innodb_buffer_pool_in_core_file` 变量可以通过排除 `InnoDB` 缓冲池页面来减小核心文件的大小。要使用此变量，必须启用 [`core_file`](/5/5.1/5.1.8/server-system-variables) 变量，并且操作系统必须支持 `madvise()` 的 `MADV_DONTDUMP` 非 POSIX 扩展，这在 Linux 3.4 及更高版本中是受支持的。更多信息，参阅[章节 15.8.3.7，“从核心文件中排除缓冲池页”](/15/15.8/15.8.3/15.8.3.7/innodb-buffer-pool-in-core-file)。
  - 从MySQL 8.0.13 开始，用户创建的临时表和优化器创建的内部临时表都存储在会话临时表空间中，而会话临时表空间是由临时表空间池分配给会话的。当一个会话断开连接时，它的临时表空间将被截断并释放回池。在以前的版本中，临时表是在全局临时表空间(`ibtmp1`)中创建的，在删除临时表之后，它不会向操作系统返回磁盘空间。

  [`innodb_temp_tablespaces_dir`](/15/15.14/innodb-parameters) 变量定义创建会话临时表空间的位置。默认位置是数据目录中的 `#innodb_temp` 目录。

  [`INNODB_SESSION_TEMP_TABLESPACES`](/26/26.4/26.4/26.4.22/information-schema-innodb-session-temp-tablespaces-table) 表提供有关会话临时表空间的元数据。

  全局临时表空间（`ibtmp1`）现在存储对用户创建的临时表所做更改的回滚段。

  - 从 MySQL 8.0.14 开始，`InnoDB` 支持并行聚集索引读取，这可以提高 [`CHECK TABLE`](/13/13.7/13.7.3/13.7.3.2/check-table) 的性能。此功能不适用于辅助索引扫描。[`innodb_parallel_read_threads`](/15/15.14/innodb-parameters) 会话变量必须设置为大于 1 的值，才能进行并行聚集索引读取。默认值为 4。用于执行并行聚集索引读取的实际线程数由 [`innodb_parallel_read_threads`](/15/15.14/innodb-parameters) 设置或要扫描的索引子树数决定，以较小者为准。

  - 从 8.0.14 开始，当启用 [`innodb_dedicated_server`](/15/15.14/innodb-parameters) 变量时，将根据自动配置的缓冲池大小配置日志文件的大小和数量。以前，日志文件大小是根据服务器上检测到的内存量配置的，日志文件的数量不是自动配置的。
  - 从 8.0.14 开始，[`CREATE TABLESPACE`](/13/13.1/13.1.21/create-tablespace) 语句的 `ADD DATAFILE` 子句是可选的，它允许没有 [`FILE`](/6/6.2/6.2.2/privileges-provided) 权限的用户创建表空间。在没有 `ADD DATAFILE` 子句的情况下执行的 [`CREATE TABLESPACE`](/13/13.1/13.1.21/create-tablespace) 语句会隐式地创建具有唯一文件名的表空间数据文件。
  - 默认情况下，当试探性存储引擎占用的内存量超过试探性 [`temptable_max_ram`](/5/5.1/5.1.8/server-system-variables) 变量定义的内存限制时，试探性存储引擎开始从磁盘分配内存映射的临时文件。从 MySQL 8.0.16 开始，这个行为由 [`temptable_use_mmap`](/5/5.1/5.1.8/server-system-variables) 变量控制。禁用 [`tettable_use_mmap`](/5/5.1/5.1.8/server-system-variables) 会导致 `TempTable` 存储引擎使用 `InnoDB` 在硬盘的内部临时表，而不是内存映射文件作为其溢出机制。更多信息，参阅[内部临时表存储引擎](/8/8.4/8.4.4/internal-temporary-tables?id=内部临时表存储引擎)。
  - 从 MySQL 8.0.16 开始，`InnoDB` 静态数据加密功能支持 MySQL 系统表空间的加密。MySQL 系统表空间包含 MySQL 系统数据库和 MySQL 数据字典表。更多信息，参阅[章节 15.13，“InnoDB 静态数据加密”](/15/15.13/innodb-data-encryption)。
  - 在 MySQL 8.0.16 中引入的 `innodb_spin_wait_pause_multiplier` 变量可以更好地控制线程等待获取互斥锁或读写锁时发生的自旋锁轮询延迟的持续时间。可以对延迟进行更精细的调整，以考虑不同处理器体系结构上暂停指令持续时间的差异。更多信息，参阅[章节 15.8.8，“配置自旋锁轮询”](/15/15.8/15.8.8/innodb-performance-spin_lock_polling)。
  - MySQL 8.0.17 通过更好地利用读取线程、减少并行扫描期间发生的预取活动的读线程 I/O 以及支持分区的并行扫描，提高了 MySQL 8.0.17 中大型数据集的 `InnoDB` 并行读取线程性能。

  并行读取线程功能由变量 [`innodb_parallel_read_threads0`](/15/15.14/innodb-parameters) 控制。最大设置现在是 256，这是所有客户端连接的线程总数。如果达到线程限制，连接将返回到使用单个线程。

  - MySQL 8.0.18 中引入的变量 [`innodb_idle_flush_pct`](/15/15.14/innodb-parameters) 允许在空闲期间限制页面刷新，这有助于延长固态存储设备的寿命。参阅[在空闲期间限制缓冲区刷新](/15/15.8/15.8.3/15.8.3.5/innodb-buffer-pool-flushing?id=在空闲期间限制缓冲区刷新)。
  - 从 MySQL 8.0.19 开始，支持对 `InnoDB` 数据进行有效采样，以生成直方图统计信息。参阅[直方图统计分析](/13/13.7/13.7.3/13..3.1/analyze-table?id=直方图统计分析)。
  - 从 MySQL 8.0.20 开始，doublewrite（双写）缓冲区存储区驻留在双写文件中。在以前的版本中，存储区域位于系统表空间中。将存储区域移出系统表空间可减少写入延迟，提高吞吐量，并在放置双写缓冲页方面提供灵活性。为高级双写缓冲区配置引入了以下系统变量：
    - [`innodb_doublewrite_dir`](/15/15.14/innodb-parameters)

    定义双写缓存文件目录。

    - [`innodb_doublewrite_files`](/15/15.14/innodb-parameters)

    定义双写文件数量。

    - [`innodb_doublewrite_pages`](/15/15.14/innodb-parameters)

    定义批量写时每个线程的最大双写页面数量。

    - [`innodb_doublewrite_batch_size`](/15/15.14/innodb-parameters)

    定义在一次批处理中写入的双写页面数量。

    更多信息，参阅[章节 15.6.4，“双写缓冲”](/15/15.6/15.6.4/innodb-doublewrite-buffer)。

  - 在 MySQL 8.0.20 中改进了争用感知事务调度（CATS）算法，该算法对等待锁的事务进行优先级排序。事务调度权重计算现在完全由单独的线程执行，这提高了计算性能和准确性。

    用于事务调度的先进先出（First In First Out，FIFO）算法，已被删除。FIFO算法通过CATS算法增强而变得冗余。以前由 FIFO 算法执行的事务调度现在由 CATS 算法执行。

    在 `INFORMATION_SCHEMA.INNODB_TRX` 表中添加了一个 `TRX_SCHEDULE_WEIGHT` 列，允许查询由 CATS 算法分配的事务调度权重。

    为监视代码级事务调度事件，添加了以下 `INNODB_METRICS` 计数器：

    - `lock_rec_release_attempts`

      尝试释放记录锁的次数。

    - `lock_rec_grant_attempts`

      尝试授予记录锁的次数。

    - `lock_schedule_refreshes`

      分析等待图以更新事务调度权重的次数。

    更多信息，参阅[章节 15.7.6，“事务调度”](/15/15.7/15.7.6/innodb-transaction-scheduling)。

  - 从 MySQL 8.0.21 开始，为了提高需要访问表和行资源的锁队列的操作的并发性，锁系统 mutex（`lock_sys->mutex`）被分片锁存器替换，锁队列被分组到表和页锁队列分片中，每个分片由一个专用的mutex保护。以前，单锁系统mutex保护所有锁队列，这是高并发系统上的争用点。新的分片实现允许对锁队列进行更细粒度的访问。

    锁系统 mutex（`lock_sys->mutex`）被以下分片锁存器替换：

    - 一种全局锁存器（`lock_sys->latches.global_latch`），由 64 个读写锁对象（`rw_lock_t`）组成。对单个锁队列的访问需要共享全局闩锁和锁队列碎片上的闩锁。需要访问所有锁队列的操作采用独占全局锁存器，该锁存器锁存所有表和页锁队列碎片。
    - 表分片锁存器（`lock_sys->latches.table_shards.mutexes`），实现为 512 个互斥体的数组，每个互斥体专用于 512 个表锁队列分片中的一个。
    - 页碎片锁存器（`lock_sys->latches.page_shards.mutexes`），实现为 512个 互斥体的数组，每个互斥体专用于 512 个页锁队列碎片中的一个。

    用于监视单锁系统互斥锁的性能模式 `wait/synch/mutex/innodb/lock_mutex` 工具已被用于监视新的全局、表碎片和页碎片锁存的工具所取代：
    - `wait/synch/sxlock/innodb/lock_sys_global_rw_lock`
    - `wait/synch/mutex/innodb/lock_sys_table_mutex`
    - `wait/synch/mutex/innodb/lock_sys_page_mutex`

  - 从 MySQL 8.0.21 开始，使用 `DATA DIRECTORY` 子句在数据目录之外创建的表和表分区数据文件被限制在 `InnoDB` 已知的目录中。此更改允许数据库管理员控制表空间数据文件的创建位置，并确保在恢复期间可以找到数据文件。

    不能再在撤销表空间目录（[`innodb_undo_directory`](/15/15.14/innodb-parameters)）中创建普通和独表文件的(file-per-table)数据文件（`.ibd` 文件），除非 `InnoDB` 直接知晓。

    已知目录是由 [`datadir`](/5/5.1/5.1.8/server-system-variables)、[`innodb_data_home_dir`](/15/15.14/innodb-parameters) 和 [`innodb_directories`](/15/15.14/innodb-parameters) 变量定义的目录。

    截断驻留在每个表空间文件中的 `InnoDB` 表会降低现有表空间，并创建新表空间。从 MySQL 8.0.21 开始，`InnoDB` 在默认位置创建新的表空间，如果当前表空间目录未知，将向错误日志写入警告。要让 [`TRUNCATE TABLE`](/13/13.1/13.1.37/truncate-table) 在当前位置创建表空间，请在运行 [`TRUNCATE TABLE`](/13/13.1/13.1.37/truncate-table) 之前将目录添加到 [`innodb_directories`](/15/15.14/innodb-parameters) 设置中。

  - 从 MySQL 8.0.21 开始，可以使用 [`ALTER INSTANCE{ENABLE | DISABLE} INNODB REDO_LOG`](/13/13.1/13.1.5/alter-instance) 语法启用和禁用重做日志。此功能用于将数据加载到新的 MySQL 实例中。禁用重做日志有助于通过避免重做日志写入来加速数据加载。

    新的 [`INNODB_REDO_LOG_ENABLE`](/6/6.2/6.2.2/privileges-provided) 特权允许启用和禁用重做日志。

    新的 [`Innodb_redo_log_enabled`](/5/5.1/5.1.10/server-status-variables) 状态变量允许监视重做日志状态。

    参阅[禁用重做日志](/innodb-redo-log?id=禁用重做日志)。

  - 在启动时，`InnoDB` 根据数据字典中存储的表空间文件路径验证已知表空间文件的路径，以防表空间文件被移动到其他位置。MySQL 8.0.21 中引入的新 [`innodb_validate_tablespace_paths`](/15/15.14/innodb-parameters) 变量允许禁用表空间路径验证。此功能适用于不移动表空间文件的环境。禁用表空间路径验证可以缩短具有大量表空间文件的系统的启动时间。

    更多信息，参阅[章节 15.6.3.7，“禁用表空间路径验证”](/15/15.6/15.6.3/15.6.3.7/innodb-disabling-tablespace-path-validation)。

  - 从 MySQL 8.0.21 开始，在支持原子 DDL 的存储引擎上，当使用基于行的复制时，[`CREATE TABLE ... SELECT`](/13/13.1/13.1.20/13.1.20.4/create-table-select) 语句作为一个事务记录在二进制日志中。以前，它被记录为两个事务，一个用于创建表，另一个用于插入数据。使用此更改，[`CREATE TABLE ... SELECT`](/13/13.1/13.1.20/13.1.20.4/create-table-select) 语句现在对于基于行的复制是安全的，并且允许与基于 GTID 的复制一起使用。更多信息，参阅[章节 13.1.1，“原子数据定义语句支持”](/13/13.1/13.1.1/atomic-ddl)。

  - 在繁忙系统上截断撤消表空间可能会影响性能，因为相关的刷新操作会从缓冲池中删除旧的撤消表空间页，并将新撤消表空间的初始页刷新到磁盘。为了解决这个问题，从 MySQL 8.0.21 开始就移除了刷新操作。

    当旧的撤消表空间页在最近最少使用时会被动释放，或者在下一个完整检查点被删除。在 truncate 操作期间，新的撤销表空间的初始页作为重做日志记录，而不是刷新到磁盘，这也提高了撤销表空间 truncate 操作的持久性。

    为了防止由于撤消表空间截断操作过多而导致的潜在问题，检查点之间相同撤消表空间上的截断操作现在限制为 64 个。如果超过此限制，撤消表空间仍可以处于非活动状态，但直到下一个检查点之后才被截断。

    已删除与失效的撤消截断刷新操作关联的 [`INNODB_METRICS`](/26/26.4/26.4.21/information-schema-innodb-metrics-table) 计数器。移除的计数器包括：
    `undo_truncate_sweep_count`、 `undo_truncate_sweep_usec`、 `undo_truncate_flush_count` 和 `undo_truncate_flush_usec`。

    参阅[章节 15.6.3.4，“撤销表空间”](/15.6.3.4/innodb-undo-tablespaces)。

  - 从MySQL 8.0.22 开始，新的 [`innodb_extend_and_initialize`](/15/15.14/innodb-parameters) 变量允许配置 `InnoDB` 如何为 Linux 上的每个表和常规表空间分配空间。默认情况下，当操作需要表空间中的额外空间时，`InnoDB` 会将页分配给表空间，并物理地将空值写入这些页。如果频繁分配新页面，此行为会影响性能。你可以在 Linux 系统上禁用 [`innodb_extend_and_initialize`](/15/15.14/innodb-parameters)，以避免在物理上向新分配的表空间页写入 NULL。当 [`innodb_extend_and_initialize`](/15/15.14/innodb-parameters) 被禁用时，将使用 `posix_fallocate()` 调用来分配空间，该调用会保留空间，而不会实际写入 NULL。

    `posix_fallocate()` 操作不是原子操作，这使得在为表空间文件分配空间和更新文件元数据之间可能发生故障。这样的失败会使新分配的页面处于未初始化状态，导致 `InnoDB` 尝试访问这些页面时失败。为了防止出现这种情况，`InnoDB` 在分配新的表空间页之前会写一个重做日志记录。如果页面分配操作被中断，则在恢复期间将从重做日志记录中重放该操作。

  - 从 MySQL 8.0.23 开始，`InnoDB` 支持加密属于加密表空间的复写（doublewrite）文件页。使用相关表空间的加密密钥对页进行加密。更多信息，参阅[章节 15.13，“InnoDB 静态数据加密”](/15/15.13/innodb-data-encryptio)。
  - 在 MySQL 8.0.23 中引入的 `temptable_max_mmap` 变量定义了在开始在磁盘上存储内部临时表数据之前，允许 TempTable 存储引擎从内存映射（memory-mapped，MMAP）文件分配的最大内存量。设置为 0 将禁用 MMAP 文件的分配。更多信息，参阅[章节 8.4.4，“MySQL 内部临时表的使用”](/8/8.4/8.4.4/internal-temporary-tables)。
  - MySQL 8.0.23中引入了 `AUTOEXTEND_SIZE` 选项，它定义了 `InnoDB` 在表空间满时扩展表空间大小的量，从而可以以更大的增量扩展表空间大小。[`CREATE TABLE`](/13/13.1/13.1.20/create-table)、[`ALTER TABLE`](/13/13.1/13.1.9/alter-table)、[`CREATE TABLESPACE`](/13/13.1/13.1.21/create-tablespace) 和 [`ALTER TABLESPACE`](/13/13.1/13.1.10/alter-tablespace) 语句支持 `AUTOEXTEND_SIZE` 选项。更多信息，参阅[章节 15.6.3.9，“表空间 AUTOEXTEND_SIZE 配置”](/15/15.6/15.6.3/15.6.3.9/innodb-tablespace-autoextend-size)。

    `AUTOEXTEND_SIZE` 列添加在表 [`INFORMATION_SCHEMA.INNODB_TABLESPACES`](/26/26.4/26.4.24/information-schema-innodb-tablespaces-table) 中。

  - MySQL 8.0.26 中引入的 [`innodb_segment_reserve_factor`](/15/15.14/innodb-parameters) 系统变量允许配置保留为空页的表空间文件段页的百分比。更多信息，参阅[章节 15.11.2，“文件空间管理”](innodb-file-space?id=配置保留文件段页的百分比)。
  - 在支持 `fdatasync()` 系统调用的平台上，MySQL 8.0.26 中引入的 [`innodb_use_fdatasync`](/15/15.14/innodb-parameter) 变量允许使用 `fdatasync()` 而不是 `fsync()` 进行操作系统刷新。`fdatasync()` 系统调用不会刷新对文件元数据的更改，除非后续数据检索需要这样做，从而提供了潜在的性能优势。

- **字符集支持**。默认字符集已从 `latin1` 更改为 `utf8mb4`。`utf8mb4` 字符集有几个新的排序规则，包括 `utf8mb4_ja_0900_as_cs`，这是 MySQL 中第一个针对 Unicode 的日语特定排序规则。更多信息，参阅[章节 10.10.1，“Unicode 字符集”](/10/10.10/10.10.1/charset-unicode-sets)。
- **JSON 增强**。对 MySQL 的 JSON 功能进行了以下增强或添加：
  - 添加了 [`->>`](/12/12.18/12.18.3/json-search-functions)（行内路径）操作符，相当于对 [`JSON_EXTRACT()`](/12/12.18/12.18.4/json-modification-functions) 的结果调用 [`JSON_UNQUOTE()`](/12/12.18/12.18.3/json-search-functions)。

    这是 MySQL 5.7 中引入的列路径操作符 [`->`](/12/12.18/12.18.3/json-search-functions) 的改进；`col->>"$.path"` 等同于 `JSON(col->"$.path")`。行内路径操作符可以在任何可以使用 `JSON_UNQUOTE(JSON_EXTRACT())` 的地方使用，例如 [`SELECT`](/13/13.2/13.2.10/select) 列列表、`WHERE` 和 `HAVING` 子句以及 `ORDER BY` 和`GROUP BY` 子句。更多信息，参阅操作符描述，即 [`JSON 路径语法`](/11/11.5/json?id=JSON-路径语法)
  
  - 添加了两个 JSON 聚合函数 [`JSON_ARRAYAGG()`](/12/12.20/12.20.1/aggregate-functions) 和 [`JSON_OBJECTAGG()`](/12/12.20/12.20.1/aggregate-functions)。`JSON_ARRAYAGG()` 将列或表达式作为其参数，并将结果聚合为单个 [`JSON`](/11/11.5/json) 数组。表达式可以对任何 MySQL 数据类型求值；这不必是 JSON 值。`JSON_OBJECTAGG()` 接受两个列或表达式，并将其解释为键和值；它将结果作为单个 JSON 对象返回。更多信息和示例，参阅[章节 12.20，“聚合函数”](/12/12.20/aggregate-functions-and-modifiers)。

  - 添加了 JSON 实用函数 [`JSON_PRETTY()`](/12/12.18/12.18.8/json-utility-functions)，它以易于阅读的格式输出现有的 [`JSON`](/11/11.5/json) 值；每个 JSON 对象成员或数组值都打印在单独的行上，子对象或数组相对于其父对象有两个空格。

    此函数也可以处理字符串，字符串在这里作为 JSON 值处理。

    更多信息及示例，参阅[章节 12.18.8，“JSON 实用函数”](/12/12.18/12.18.8/json-utility-functions)。

  - 在使用 `ORDER BY` 对查询中的 [`JSON`](/11/11.5/json) 值进行排序时，每个值现在都由排序键的可变长度部分来表示，而不是固定 1K 大小。在许多情况下，这可以减少过量使用。例如，标记为 `INT` 甚至 `BIGINT` 值实际上只需要很少的字节，因此这个空间的剩余部分（高达 90% 或更多）被填充占用。此更改对性能有以下好处：
    - 排序缓冲区空间现在得到了更有效的利用，这样文件排序就不必像固定长度排序键那样提前或频繁地刷新到磁盘。这意味着可以在内存中对更多数据进行排序，从而避免不必要的磁盘访问。
    - 较短的键可以比较长的键更快地进行比较，从而显著提高了性能。对于完全在内存中执行的排序，以及需要向磁盘写入和从磁盘读取的排序，都是这样。
  - 在MySQL 8.0.2 中增加了对 `JSON` 列值的部分原地更新的支持，这比完全删除现有的 JSON 值并在其位置写入新的 JSON 值更有效，正如以前在更新任何 `JSON` 列时所做的那样。要应用此优化，必须使用 [`JSON_SET()`](/12/12.18/12.18.4/json-modification-functions)、[`JSON_REPLACE()`](/12/12.18/12.18.4/json-modification-functions) 或 [`JSON_REMOVE()`](/12/12.18/12.18.4/json-modification-functions) 应用更新。无法将新元素添加到正在更新的 JSON 文档中；文档中的值不能比更新前占用更多空间。参阅[JSON 值部分更新](/11/11.5/json?id=JSON-值部分更新)，获取更多的信息和讨论。

    JSON 文档的部分更新可以写入二进制日志，比记录完整的 JSON 文档占用更少的空间。当使用基于语句的复制时，部分更新总是这样记录的。要让这个对基于行的复制生效，你必须先设置 [`binlog_row_value_options=PARTIAL_JSON`](/17/17.1/17.1.6/17.1.6.4/replication-options-binary-log)；参阅这此变量的描述获取更多信息。

  - 添加了 JSON 实用函数 [`JSON_STORAGE_SIZE()`](/12/12.18/12.18.8/json-utility-functions) 和 [`JSON_STORAGE_FREE()`](/12/12.18/12.18.8/json-utility-functions)。`JSON_STORAGE_SIZE()` 返回在任何部分更新之前用于 JSON 文档二进制表示的字节存储空间（参阅上一项）。JSON_STORAGE_FREE() 显示 [`JSON`](/11/11.5/json) 类型的表列在使用 `JSON_SET()` 或 `JSON_REPLACE()` 部分更新后剩余的空间量；如果新值的二进制表示形式小于前一个值的二进制表示形式，则该值大于零。

    每个函数还接受JSON文档的有效字符串表示形式。对于这样的值，`JSON_STORAGE_SIZE()` 返回其二进制表示形式转换为 JSON 文档后使用的空间。对于包含JSON文档的字符串表示形式的变量，`JSON_STORAGE_FREE()` 返回零。如果函数的（非 null）参数不能被解析为有效的 JSON 文档，则会产生错误；如果参数为 `NULL`，则会生成 `NULL`。

    更多信息和示例，参阅[章节 12.18.8，“JSON 实用函数”](/12/12.18/12.18.8/json-utility-functions)。

    `JSON_STORAGE_SIZE()` 和 `JSON_STORAGE_FREE()` 是在 MySQL 8.0.2 实现的。
  - 在 MySQL 8.0.2 中添加了对 XPath 表达式的范围支持，如 `$[1 to 5]`。此外，在该版本中还添加了对 `last` 关键字和相对寻址的支持，这样，`$[last]` 始终选择数组中的最后一个（最高编号）元素，而 `$[last-1]` 选择靠近最后一个元素的元素 。`last` 和使用它的表达式也可以包含在范围定义中。例如，`$[last-2 to last-1]` 返回最后两个元素，但一个来自数组。更多信息和示例，参阅[搜索和修改 JSON 值](/11/11.5/json?id=搜索和修改-JSON-值)。

  - 添加了一个 JSON 合并函数，以符合 [RFC 7396](https://tools.ietf.org/html/rfc7396)。当在两个 JSON 对象上使用 [`JSON_MERGE_PATCH()`](/12/12.18/12.18.4/json-modification-functions) 时，它会将这两个对象合并到一个 JSON 对象中，该对象的成员是以下集合的并集：

    - 第一个对象的每个成员，与第二个对象中的成员不具有相同键。
    - 第二个对象的成员中，与第一个对象中不同键每个成员，并且其值不是 JSON `null` 文本。
    - 每个成员都有一个键，该键存在于两个对象中，并且在第二个对象中的值不是 JSON `null` 文本。

    作为这项工作的一部分，[`JSON_MERGE()`](/12/12.18/12.18.4/json-modification-functions) 函数已重命名为 [`JSON_MERGE_PRESERVE()`](/12/12.18/12.18.4/json-modification-functions)。`JSON_MERGE()` 仍然被认为是 MySQL 8.0 中`JSON_MERGE_PRESERVE()` 的别名，但现在已被弃用，并可能在 MySQL 的未来版本中被删除。

    更多信息及示例，参阅[章节 12.18.4，“修改 JSON 值的函数”](/12/12.18/12.18.4/json-modification-functions)。

  - 实现了重复键的“重复键最后一个有效”标准化，与 [RFC 7159](https://tools.ietf.org/html/rfc7159) 和大多数 JavaScript 解析器一致。此处显示了此行为的示例，其中仅保留具有键 `x` 的最右侧成员：

  ```bash
  mysql> SELECT JSON_OBJECT('x', '32', 'y', '[true, false]',
       >                     'x', '"abc"', 'x', '100') AS Result;
  +------------------------------------+
  | Result                             |
  +------------------------------------+
  | {"x": "100", "y": "[true, false]"} |
  +------------------------------------+
  1 row in set (0.00 sec)
  ```

  插入 MySQL [`JSON`](/11/11.5/json) 列的值也以这种方式规范化，如本例所示：

  ```bash
  mysql> CREATE TABLE t1 (c1 JSON);

  mysql> INSERT INTO t1 VALUES ('{"x": 17, "x": "red", "x": [3, 5, 7]}');

  mysql> SELECT c1 FROM t1;
  +------------------+
  | c1               |
  +------------------+
  | {"x": [3, 5, 7]} |
  +------------------+
  ```

  这与以前版本的 MySQL 不兼容，MySQL 在这种情况下使用了“重复键第一个有效”算法。

  更多信息及示例，参阅[JSON 值的规范化、合并和自动包装](/11/11.5/json?JSON-值的规范化、合并和自动包装)。

  - 在 MySQL 8.0.4 中添加了 [`JSON_TABLE()`](/12/12.18/12.18.6/json-table-functions) 函数。此函数接受 JSON 数据并将其作为具有指定列的关系表返回。

    此函数具有语法 `JSON_TABLE(expr，path COLUMNS column_list）[AS] alias)`，其中 `expr` 是返回 JSON 数据的表达式，`path` 是应用于源的 JSON 路径，`column_list` 是列定义的列表。这里举一个例子：

    ```bash
    mysql> SELECT *
      -> FROM
      ->   JSON_TABLE(
      ->     '[{"a":3,"b":"0"},{"a":"3","b":"1"},{"a":2,"b":1},{"a":0},{"b":[1,2]}]',
      ->     "$[*]" COLUMNS(
      ->       rowid FOR ORDINALITY,
      ->
      ->       xa INT EXISTS PATH "$.a",
      ->       xb INT EXISTS PATH "$.b",
      ->
      ->       sa VARCHAR(100) PATH "$.a",
      ->       sb VARCHAR(100) PATH "$.b",
      ->
      ->       ja JSON PATH "$.a",
      ->       jb JSON PATH "$.b"
      ->     )
      ->   ) AS  jt1;
    +-------+------+------+------+------+------+--------+
    | rowid | xa   | xb   | sa   | sb   | ja   | jb     |
    +-------+------+------+------+------+------+--------+
    |     1 |    1 |    1 | 3    | 0    | 3    | "0"    |
    |     2 |    1 |    1 | 3    | 1    | "3"  | "1"    |
    |     3 |    1 |    1 | 2    | 1    | 2    | 1      |
    |     4 |    1 |    0 | 0    | NULL | 0    | NULL   |
    |     5 |    0 |    1 | NULL | NULL | NULL | [1, 2] |
    +-------+------+------+------+------+------+--------+
    ```

    JSON 源表达式可以是生成有效 JSON 文档的任何表达式，包括 JSON 文本、表列或返回 JSON 的函数调用，如 [`JSON_EXTRACT(t1，data，'$.post.comments')`](/12/12.18/12.18.3/json-search-functions)。更多信息，参阅[章节 12.18.6，“JSON 表函数”](/12/12.18/12.18.6/json-table-functions)。

- **数据类型支持**。MySQL 现在支持在数据类型规范中使用表达式作为默认值。这包括使用表达式作为 [`BLOB`]、[`TEXT`]、`GEOMETRY` 和 [`JSON`] 数据类型的默认值，这些数据类型以前根本不能被指定为默认值。更多细节，参阅[章节 11.6，“数据类型默认值”](/11/11.6/data-type-defaults)。
- **优化器**。添加了以下的优化器增强：
  - MySQL 现在支持不可见索引。优化器根本不使用不可见索引，但通常会维护该索引。默认情况下，索引是可见的。不可见索引可以测试删除索引对查询性能的影响，而无需进行破坏性的更改，如果需要索引，则必须撤消这些更改。参阅[章节 8.3.12，“不可见索引”](/8/8.3/8.3.12/invisible-indexes)。
  - MySQL 现在支持降序索引：索引定义中的 `DESC` 不再被忽略，而是用作按降序存储键值。以前，可以按相反的顺序扫描索引，但会降低性能。降序索引可以按正向顺序扫描，这样更有效。当最有效的扫描顺序混合了某些列的升序和其他列的降序时，降序索引还使优化器可以使用多个列索引。参阅[章节 8.3.13，“降序索引”](/8/8.3/8.3.13/descending-indexes)。
  - MySQL 现在支持创建索引表达式值而不是列值的函数索引键部分。函数式的键部分支持对其他情况下无法索引的值，如 [`JSON`](/11/11.5/json) 值，进行索引。更多信息，参阅[章节 13.1.15，“创建索引语句”](/13/13.1/13.1.15/create-index)。
  - 在 MySQL 8.0.14 及更高版本中，在准备过程中，而非之后的优化过程中，删除常量文本表达式生成的 `WHERE` 条件是非常简单的。在该过程的前面删除该条件，可以简化查询的联接，外部联接具有普通条件，例如：

    ```bash
    SELECT * FROM t1 LEFT JOIN t2 ON condition_1 WHERE condition_2 OR 0 = 1
    ```

    优化器现在在准备过程中发现 0=1 始终为 false，会将 `OR 0=1` 作为冗余，并将其删除，留下以下内容：

    ```bash
    SELECT * FROM t1 LEFT JOIN t2 ON condition_1 where condition_2
    ```

    现在，优化器可以将查询重写为内部联接，如下所示：

    ```bash
    SELECT * FROM t1 LEFT JOIN t2 WHERE condition_1 AND condition_2
    ```

    更多信息，参阅[章节 8.2.1.9，“外部联接优化”](/8/8.2/8.2.1/8.2.1.9/outer-join-optimization)。

  - 在 MySQL 8.0.16 及更高版本中，MySQL 可以在优化时使用常量折叠来处理列与常量值之间的比较，其中常量超出范围或位于与列类型相关的范围边界上，而不是在执行时对每一行进行比较。例如，给定一个表 `t`，其中有一个 `TINYINT UNSIGNED` 列 `c`，优化器可以重写一个条件，例如，将 `c < 256` 重写为 `WHERE 1`（并将该条件全部优化掉），或者将 `WHERE c >= 255` 重写为 `WHERE c = 255`。

    更多信息，参阅[章节 8.2.1.14，“常量折叠优化”](/8/8.2/8.2.1/8.2.1.14/constant-folding-optimization)。

  - 从 MySQL 8.0.16 开始，`IN` 子查询中使用的半连接优化现在也可以应用于 `EXISTS` 子查询。此外，优化器现在将附加到子查询的 `WHERE` 条件中的无关紧要的相关相等谓词解相关，以便可以将它们与 `IN` 子查询中的表达式进行类似的处理；这适用于 `EXISTS` 和 `IN` 子查询。

    更多信息，参阅[章节 8.2.2.1，“使用半连接转换优化 IN 和 EXISTS 子查询谓词”](/8/8.2/8.2.2/8.2.2.1/semijoins)。

  - 从 MySQL 8.0.17 开始，服务器在上下文化阶段将任何不完整的 SQL 谓词（即具有 `WHERE value`形式的谓词，其中 `value` 是列名或常量表达式，并且没有使用比较运算符）在内部重写为 `WHERE value<>0`，以便查询解析器、查询优化器和查询执行器只需要处理完整的谓词。

    此更改的一个明显效果是，对于布尔值，[`EXPLAIN`](/13/13.8/13.8.2/explain) 输出现在显示 `true` 和 `false` ，而不是 `1` 和 `0`。

    这种改变的另一个效果是，在 SQL 布尔上下文中对 JSON 值的评估对 JSON 整数 0 执行隐式比较。

    ```bash
    mysql> CREATE TABLE test (id INT, col JSON);

    mysql> INSERT INTO test VALUES (1, '{"val":true}'), (2, '{"val":false}');
    ```

    以前，在 SQL 布尔值上下文中比较提取的 `true` 或 `false` 值时，服务器尝试将其转换为 SQL 布尔值，如以下使用 `IS TRUE` 的查询示例：

    ```bash
    mysql> SELECT id, col, col->"$.val" FROM test WHERE col->"$.val" IS TRUE;
    +------+---------------+--------------+
    | id   | col           | col->"$.val" |
    +------+---------------+--------------+
    |    1 | {"val": true} | true         |
    +------+---------------+--------------+
    ```

    在 MySQL 8.0.17 及更高版本中，提取值与 JSON 整数 0 的隐式比较会导致不同的结果：

    ```bash
    mysql> SELECT id, col, col->"$.val" FROM test WHERE col->"$.val" IS TRUE;
    +------+----------------+--------------+
    | id   | col            | col->"$.val" |
    +------+----------------+--------------+
    |    1 | {"val": true}  | true         |
    |    2 | {"val": false} | false        |
    +------+----------------+--------------+
    ```

    从 MySQL 8.0.21 开始，你可以在执行测试之前对提取的值使用 [`JSON_VALUE()`](/12/12.18/12.18.3/json-search-functions) 来执行类型转换，如下所示：

    ```bash
    mysql> SELECT id, col, col->"$.val" FROM test
    ->     WHERE JSON_VALUE(col, "$.val" RETURNING UNSIGNED) IS TRUE;
    +------+---------------+--------------+
    | id   | col           | col->"$.val" |
    +------+---------------+--------------+
    |    1 | {"val": true} | true         |
    +------+---------------+--------------+
    ```

    同样从 MySQL 8.0.21 开始，当以这种方式比较在一个 SQL 布尔上下文中提取的值，服务器会发出警告：“正在 SQL 布尔上下文中评估 JSON 值，并与 JSON 整数 0 进行隐式比较；如果这不是你想要的，考虑用 JSON_VALUE 将 JSON 转换成一个 SQL 数值类型”（*Evaluating a JSON value in SQL boolean context does an implicit comparison against JSON integer 0; if this is not what you want, consider converting JSON to an SQL numeric type with JSON_VALUE RETURNING*），

  - 在 MySQL 8.0.17 及更高版本中，`WHERE` 条件 `NOT IN` （子查询）或 `NOT EXISTS`（子查询）在内部转换为反连接(反联接返回表中的所有行，该表中没有与联接条件匹配的行被联接到该表中。）这将删除子查询，因为子查询的表现在在顶层处理，因此可以更快地执行查询。

    这与外部联接的现有 `IS NULL`（不存在）优化类似，并重复使用。参阅[EXPLAIN 额外信息](/8/8.8/8.8.2/explain-output?id=EXPLAIN-额外信息)。
  
  - 从 MySQL 8.0.21 开始，单个表 [`UPDATE`](/13/13.2/13.2.13/update) 或 [`DELETE`](/13/13.2/13.2.2/delete) 语句现在在许多情况下都可以使用半连接转换或子查询具体化。这适用于以下示例语句：
    - `UPDATE t1 SET t1.a=value WHERE t1.a IN (SELECT t2.a FROM t2)`
    - `DELETE FROM t1 WHERE t1.a IN (SELECT t2.a FROM t2)`

    可以对满足以下条件的单个表执行 `UPDATE` 或 `DELETE`：
    - `UPDATE` 或 `DELETE` 语句使用具有 `[NOT] IN` 或 `[NOT] EXISTS` 谓词的子查询。
    - 该语句没有 `ORDER BY` 子句，也没有 `LIMIT` 子句。
      （`UPDATE` 和 `DELETE` 的多表版本不支持 `ORDER BY` 或 `LIMIT`）
    - 目标表不支持先读后写删除（仅与 [`NDB`](/23/mysql-cluster) 表相关）。
    - 基于子查询中包含的任何提示和 [`optimizer_switch`](/5/5.1/5.1.8/server-system-variables) 的值，允许半联接或子查询具体化。

    当半联接优化用于符合条件的单表 `DELETE` 或 `UPDATE` 时，这在优化器跟踪中可见：对于多表语句，跟踪中有一个 `join_optimization` 对象，而对于单表语句则没有。转换在 `EXPLAIN FORMAT=TREE` 或 [`EXPLAIN ANALYZE`](/13/13.8/13.8.2/explain?id=EXPLAIN-ANALYZE-包含信息) 的输出中也可见；单个表语句显示 `<notexecutable by iterator executor>`，而多表语句报告完整的计划。

    同样从 MySQL 8.0.21 开始，使用 [`InnoDB`](/15/innodb-storage-engine) 表的多表 `UPDATE` 语句支持半一致读取，因为事务隔离级别弱于[`REPEATABLE READ`](/15/15.7/15.7.2/15.7.2.1/innodb-transaction-isolation-levels)（可重复读）。
  - **改进哈希连接性能**。MySQL 8.0.23 重新实现了用于哈希连接的哈希表，从而在哈希连接性能方面取得了一些改进。这项工作包括对一个问题（Bug#31516149，Bug#99933）的修复，其中只有大约 2/3 分配给连接缓冲区（[`join_buffer_size`](/5/5.1/5.1.8/server-system-variables)）的内存，可以被散列联接实际使用。

    新的哈希表通常比旧的快，并且在对齐、键/值以及存在许多相等键的情况下使用更少的内存。此外，当哈希表的大小增加时，服务器现在可以释放旧内存。
- **通用表表达式**。MySQL 现在支持通用表表达式，包括非递归和递归。公共表表达式允许使用命名的临时结果集，通过允许 [`SELECT`](/13/13.2/13.2.10/select) 语句和某些其他语句前面的 [`WITH`](/13/13.2/13.2.15/with) 子句实现。更多信息，参阅[章节 13.2.15，“WITH（通用表表达式）”](/13/13.2/13.2.15/with)。

  从 MySQL 8.0.19 开始，递归公共表表达式（CTE）的递归 [`SELECT`](/13/13.2/13.2.10/select) 部分支持 `LIMIT` 子句。还支持 `LIMIT` 带 `OFFSET`。更多信息，参阅[递归通用表表达式](/13/13.2/13.2.15/with?id=递归通用表表达式)。
- **窗口函数**。MySQL 现在支持窗口函数，对于查询中的每一行，使用与该行相关的行执行计算。这些函数包括[`RANK()`](/12/12.21/12.21.1/window-function-descriptions)、[`LAG()`](/12/12.21/12.21.1/window-function-descriptions) 和 [`NTILE()`](/12/12.21/12.21.1/window-function-descriptions) 等函数。此外，一些现有的聚合函数现在可以用作窗口函数（例如，[`SUM()`](/12/12.20/12.20.1/aggregate-functions)和[`AVG()`](/12/12.20/12.20.1/aggregate-functions)）。更多信息，参阅[章节 12.21，“窗口函数”](/12/12.21/window-functions)。
- **横向派生表**。现在，派生表的前面可以加上关键字 `LATERAL`，以指定允许它在同一 `FROM` 子句中引用（依赖）前面表的列。横向派生表使某些 SQL 操作成为可能，这些 SQL 操作无法使用非横向派生表完成，或者需要效率较低的变通方法。参阅[章节 13.2.11.9，“横向派生表”](/13/13.2/13.2.11/13.2.11.9/lateral-derived-tables)。
- **单表 DELETE 语句中的别名**。在 MySQL 8.0.16 及更高版本中，单表 DELETE 语句支持使用表别名。
- **支持正则表达式**。以前，MySQL 使用 Henry Spencer 正则表达式库来支持正则表达式操作符（[`REGEXP`](/12/12.8/12.8.2/regexp)，[`RLIKE`](/12/12.8/12.8.2/regexp)）。正则表达式支持已使用国际 Unicode 组件（International Components for Unicode，ICU）重新实现，ICU 提供了完整的 Unicode 支持，并且是多字节安全。[`REGEXP_LIKE()`](/12/12.8/12.8.2/regexp) 函数以 [`REGEXP`](/12/12.8/12.8.2/regexp) 和 [`RLIKE`](/12/12.8/12.8.2/regexp) 运算符的方式执行正则表达式匹配，现在这两个运算符是该函数的同义词。此外，[`REGEXP_INSTR()`](/12/12.8/12.8.2/regexp)、[`REGEXP_REPLACE()`](/12/12.8/12.8.2/regexp) 和 [`REGEXP_SUBSTR()`](/12/12.8/12.8.2/regexp) 函数分别用于查找匹配位置和执行子字符串替换和提取。[`regexp_stack_limit`](/5/5.1/5.1.8/server-system-variables) 和 [`regexp_time_limit`](/5/5.1/5.1.8/server-system-variables) 系统变量提供对匹配引擎的资源消耗的控制。更多信息，参阅[章节 12.8.2，“正则表达式”](/12/12.8/12.8.2/regexp)。有关使用正则表达式的应用程序可能受到实现更改影响的方式的信息，参阅[正则表达式兼容性注意事项](/12/12.8/12.8.2/regexp?id=正则表达式兼容性注意事项)。
- **内部临时表**。`TempTable` 存储引擎替代 `MEMORY` 存储引擎作为内存内部临时表的默认引擎。`TempTable` 存储引擎为 [`VARCHAR`](/11/11.3/11.3.2/char) 和 [`VARBINARY`](/11/11.3/11.3.3/binary-varbinary) 列提供了高效的存储。[`internal_tmp_mem_storage_engine`](/5/5.1/5.1.8/server-system-variables) 会话变量定义了内存内部临时表的存储引擎。允许的值是 `TempTable`（默认值）和 `MEMORY`。[`temptable_max_ram`](/5/5.1/5.1.8/server-system-variables) 变量定义了 `TempTable` 存储引擎在将数据存储到磁盘之前可以使用的最大内存量。
- **日志**。错误日志被重写为使用 MySQL 组件体系结构。传统的错误日志记录是使用内置组件实现的，而使用系统日志的日志记录是作为可加载组件实现的。此外，还提供了可加载的 JSON 日志编写器。要控制要启用的日志组件，请使用 [`log_error_services`](/5/5.1/5.1.8/server-system-variables) 系统变量。
- **备用锁**。一种新型的备份锁允许在联机备份期间使用 DML，同时防止可能导致快照不一致的操作。新的备份锁由语法 [`LOCK INSTANCE FOR BACKUP`](/13/13.3/13.3.5/lock-instance-for-backup) 和 [`UNLOCK INSTANCE`](/13/13.3/13.3.5/lock-instance-for-backup) 支持。使用这些语句需要具有 [`BACKUP_ADMIN`](/6/6.2/6.2.2/privileges-provided) 权限。
- **复制**。对 MySQL 复制进行了以下增强：
  - MySQL 复制现在支持使用紧凑的二进制格式对 JSON 文档的部分更新进行二进制记录，从而在记录完整的 JSON 文档时节省了日志空间。当使用基于语句的日志记录时，这种紧凑日志记录会自动完成，并且可以通过将新的 `binlog_row_value_options` 系统变量设置为 `PARTIAL_JSON` 来启用。更多信息，参阅[JSON 值的部分更新](/11/11.5/json?id=JSON-值的部分更新)，以及 [`binlog_row_value_options`](/17/17.1/17.1.6/17.1.6.4/replication-options-binary-log) 的描述。
- **连接管理**。MySQL Server 现在允许专门为管理连接配置 TCP/IP 端口。这提供了一种替代单一管理连接的方法，该方法允许在用于普通连接的网络接口上使用，即使已经建立了 [`max_connections`](/5/5.1/5.1.8/server-system-variables)。参阅[章节 5.1.12.1，“连接接口”](/5/5.1/5.1.12/5.1.12.1/connection-interfaces)。

  MySQL 现在提供了对压缩使用的更多控制，以最小化通过连接发送到服务器的字节数。以前，给定的连接要么未压缩，要么使用 `zlib` 压缩算法。现在，还可以使用 `zstd` 算法，并为 `zstd` 连接选择压缩级别。允许的压缩算法可以在服务器端配置，也可以在连接发起端配置，以通过客户端程序和参与源/副本复制或组复制的服务器进行连接。更多信息，参阅[章节 4.2.8，“连接压缩控制”](/4/4.2/4.2.8/connection-compression-control)。

- **配置**。MySQL 中主机名的最大允许长度已从以前的 60 个字符提高到 255 个 ASCII 字符。例如，这适用于数据字典中与主机名相关的列、`mysql` 系统模式、`INFORMATION_SCHEMA`、信息模式和 `sys` 模式；“[CHANGE MASTER TO](/13/13.4/13.4.2/13.4.2.1/change-master-to)” 语句的 `MASTER_HOST`；`SHOW PROCESSLIST` 语句输出中的 `Host` 列；帐户名中的主机名（如用于帐户管理报表和在 `DEFINER` 属性中）；和主机名相关的命令选项和系统变量。
  提醒：
  - 允许的主机名长度的增加可能会影响在主机名列上具有索引的表。例如，`mysql` 系统模式中索引主机名的表，现在有一个显式的 `ROW_FORMAT` 属性，它是 `DYNAMIC` 的，以适应更长的索引值。  
  - 某些文件名值的配置设置可能基于服务器主机名构造。允许的值受基础操作系统的约束，该操作系统可能不允许文件名的长度足以包含 255 个字符的主机名。这会影响 [`general_log_file`](/5/5.1/5.1.8/server-system-variables)、[`log_error`](/5/5.1/5.1.8/server-system-variables)、[`pid_file`](/5/5.1/5.1.8/server-system-variables)、[`relay_log`](/5/5.1/5.1.8/server-system-variables) 和 [`slow_query_log_file`](/5/5.1/5.1.8/server-system-variables) 系统变量和相应选项。如果基于主机名的值对于操作系统来说太长，则必须提供显式的较短值。
  - 尽管服务器现在支持 255个 字符的主机名，但使用 `--ssl mode=VERIFY_IDENTITY` 选项建立的到服务器的连接，受到 OpenSSL 支持的最大主机名长度的限制。主机名匹配与 SSL 证书的两个字段有关，其最大长度如下：普通名称（Common Name）：最大长度 64；备选名字（Subject Alternative Name）：RFC#1034 规定的最大长度。
- **插件**。以前，MySQL 插件可以用 C 或 C++ 编写。现在插件使用的 MySQL 头文件包含 C++ 代码，这意味着插件必须用 C++ 编写，而不是C。
- **C API**。MySQL C API 现在支持异步函数，用于与 MySQL 服务器进行非阻塞通信。每个函数都是现有同步函数的异步对应项。如果从服务器连接读取或写入必须等待，同步函数将阻塞。异步函数使应用程序能够检查服务器连接上的工作是否准备好继续。如果没有，应用程序可以在稍后再次检查之前执行其他工作。参阅 [C API 异步接口](https://dev.mysql.com/doc/c-api/8.0/en/c-api-asynchronous-interface.html)。
- **其他目标类型转换**。函数 [`CAST()`](/12/12.11/cast-functions) 和 [`CONVERT()`](/12/12.11/cast-functions) 现在支持转换为 [`DOUBLE`](/11/11.1/11.1.4/floating-point-types)、[`FLOAT`](/11/11.1/11.1.4/floating-point-types) 和 [`REAL`](/11/11.1/11.1.4/floating-point-types) 类型。MySQL 8.0.17 中加入。参阅[章节 12.11，“转换函数和运算符”](/12/12.11/cast-functions)。
- **JSON 模式校验**。MySQL 8.0.17 添加了两个函数 [`JSON_SCHEMA_VALID()`](/12/12.18/12.18.7/json-validation-functions) 和 [`JSON_SCHEMA_VALIDATION_REPORT()`](/12/12.18/12.18.7/json-validation-functions)，用于再次验证 JSON 文档和 JSON 模式。`JSON_SCHEMA_VALID()` 如果文档根据模式进行验证，则返回 `TRUE(1)`；如果不验证，则返回 `FALSE(0)`。`JSON_SCHEMA_VALIDATION_REPORT()` 返回一个 JSON 文档，其中包含有关验证结果的详细信息。以下语句适用于这两个函数：
  - 模式必须符合 JSON 模式规范 Draft 4。
  - 支持 `required` 属性。
  - 不支持外部资源和 `$ref` 关键字。
  - 支持正则表达式模式；无效模式将被静默忽略。
  参阅[章节 12.18.7，“JSON 模式校验函数”](/12/12.18/12.18.7/json-validation-functions)，获取更多信息和示例。
- **多值索引**。从 MySQL 8.0.17 开始，InnoDB 支持创建多值索引，这是一个在 [`JSON`](/11/11.5/json) 列上定义的二级索引，它存储一个值数组，并且可以为单个数据记录创建多个索引记录。这样的索引使用键部分定义，例如CAST(data->'$.zipcode' AS UNSIGNED ARRAY)。MySQL 优化器会自动使用多值索引进行适当的查询，这可以在 [`EXPLAIN`](/13/13.8/13.8.2/explain) 的输出中看到。

  作为这项工作的一部分，MySQL 添加了一个新函数 [`JSON_OVERLAPS()`](/12/12.18/12.18.3/json-search-functions) 和一个新的 [`MEMBER OF()`](/12/12.18/12.18.3/json-search-functions) 操作符，用于处理 [`JSON`](/11/11.5/json) 文档，另外还使用一个新的数组关键字扩展了 [`CAST()`](/12/12.11/cast-functions) 函数，如下表所示：
  - `JSON_OVERLAPS()` 比较两个 [`JSON`](/11/11.5/json) 文档。如果它们共同包含任何键值对或数组元素，则函数返回 `TRUE(1)`；否则返回 `FALSE(0)`。如果两个值都是标量，则函数将执行简单的相等性测试。如果一个参数是 JSON 数组，另一个是标量，则标量将被视为数组元素。因此，`JSON_OVERLAPS()` 充当 [`JSON_CONTAINS()`](/12/12.18/12.18.3/json-search-functions) 的补充。
  - `MEMBER OF()` 测试第一个操作数（标量或 JSON 文档）是否是作为第二个操作数传递的 JSON 数组的成员，如果是，则返回 `TRUE(1)`，如果不是，则返回 `FALSE(0)`。不执行操作数的类型转换。
  - CAST（expression AS type ARRAY）允许通过将 JSON 文档中 `json_path` 处的 JSON 数组转换为 SQL 数组来创建函数索引。类型说明符仅限于 `CAST()` 已支持的类型说明符，`BINARY`（不支持）除外。只有 [`InnoDB`](/15/innodb-storage-engine) 支持使用 `CAST()`（以及 `ARRAY` 关键字），并且仅用于创建多值索引。

  有关多值索引的更多信息，包括示例，参阅[多值索引](/13/13.1/13.1.15/create-index?id=多值索引)。[章节 12.18.3，“搜索 JSON 值的函数”](/12/12.18/12.18.3/json-search-functions)，提供了更多有关 `JSON_OVERLAPS()` 和 `MEMBER OF()` 的信息及使用示例。

- **暗示性 time_zone**。从 MySQL 8.0.17 开始，可以通过 [`SET_VAR`](/8/8.9/8.9.3/optimizer-hints?id=变量设置提示语法) 将 [`time_zone`](/5/5.1/5.1.8/server-system-variables) 会话变量设置为暗示性。
- **重做日志归档**。从 MySQL 8.0.17 开始，InnoDB 支持重做日志归档。备份操作正在进行时，复制重做日志记录的备份实用程序有时可能无法跟上重做日志生成的速度，从而导致由于覆盖这些记录而丢失重做日志记录。重做日志存档功能通过将重做日志记录顺序写入存档文件来解决此问题。备份实用程序可以根据需要从归档文件复制重做日志记录，从而避免潜在的数据丢失。更多信息，参阅[重做日志归档](/15/15.6/15.6.5/innodb-redo-log?id=重做日志归档)。
- **克隆插件**。从 MySQL 8.0.17 开始，MySQL 提供了一个克隆插件，允许在本地或从远程 MySQL 服务器实例克隆 `InnoDB` 数据。本地克隆操作将克隆数据存储在运行 MySQL 实例的同一服务器或节点上。远程克隆操作通过网络将克隆数据从提供方 MySQL 服务器实例传输到发起克隆操作的接收方服务器或节点。

  克隆插件支持复制。除了克隆数据外，克隆操作还从供体提取和传输复制坐标，并将其应用于接收方，从而允许使用克隆插件来配置组复制成员和副本。使用克隆插件进行资源调配比复制大量事务要快得多、效率更高。还可以将组复制成员配置为使用克隆插件作为恢复的替代方法，以便成员自动选择从种子成员检索组数据的最有效方式。

  更多信息，参阅[章节 5.6.7，“克隆插件”](/5/5.6/5.6.7/clone-plugin)，以及[章节 18.5.3.2，“用于分布式恢复的克隆”](/18/18.5/18.5.3/18.5.3.2/group-replication-cloning)。

- **哈希连接优化**。从 MySQL 8.0.18 开始，只要联接中的每对表至少包含一个 equi-join 条件，并且没有索引应用于任何联接条件，就会使用哈希联接。哈希联接不需要索引，尽管它可以与仅应用于单表谓词的索引一起使用。在大多数情况下，哈希连接比块嵌套循环算法更有效。可以通过以下方式优化此处所示的连接：

  ```bash
  SELECT *
      FROM t1
      JOIN t2
          ON t1.c1=t2.c1;

  SELECT *
      FROM t1
      JOIN t2
          ON (t1.c1 = t2.c1 AND t1.c2 < t2.c2)
      JOIN t3
          ON (t2.c1 = t3.c1
  ```

  当未指定联接条件时，哈希联接也可用于笛卡尔乘积。

  你可以使用 [`EXPLAIN FORMAT=TREE`](/13/13.8/13.8.2/explain) 或 [`EXPLAIN ANALYZE`](/13/13.8/13.8.2/explain?id=通过-EXPLAIN-ANALYZE-获取信息) 查看哈希连接优化何时用于特定查询(在 MySQL 8.0.20 及更高版本中，还可以使用 `EXPLAIN`，省略 `FORMAT=TREE`。）

  哈希联接可用的内存量受 [`join_buffer_size`](/5/5.1/5.1.8/server-system-variables) 的值限制。在磁盘上执行的哈希连接需要的内存超过了这个数量；磁盘上哈希联接可以使用的磁盘文件数受 [`open_files_limit`](/5/5.1/5.1.8/server-system-variables) 限制。

  从 MySQL 8.0.19 开始，MySQL 8.0.18 中引入的 [`hash_join`](/8/8.9/8.9.2/switchable-optimizations) 优化器不再受支持（hash_join=on 仍然作为 optimizer_switch 值的一部分出现，但设置它不再有任何效果）。[`HASH_JOIN`](/8/8.9/8.9.3/optimizer-hints?id=表级优化器提示) 和 `NO_HASH_JOIN` 优化器提示也不再受支持。开关和提示现在都不推荐使用；希望在将来的 MySQL 版本中删除它们。在 MySQL 8.0.18 及更高版本中，可以使用 [`NO_BNL`](/8/8.9/8.9.3/optimizer-hints?id=表级优化器提示) 优化器开关禁用哈希联接。

  在 MySQL 8.0.20 及更高版本中，MySQL 服务器不再使用块嵌套循环，并且在以前使用块嵌套循环的任何时候都会使用哈希联接，即使查询不包含相等联接条件。这适用于内部非等联接、半联接、反联接、左外部联接和右外部联接。[`optimizer_switch`](/5/5.1/5.1.8/server-system-variables) 系统变量的 [`block_nested_loop`](/8/8.9/8.9.2/switchable-optimizations) 标志以及 [`BNL`](/8/8.9/8.9.3/optimizer-hints?id=表级优化器提示) 和 `NO_BNL` 优化器提示仍受支持，但此后仅控制哈希联接的使用。此外，内部联接和外部联接（包括半联接和反联接）现在都可以使用批处理密钥访问（batched key access，BKA），它以增量方式分配联接缓冲区内存，这样单个查询就不需要占用它们实际不需要的大量资源来解决。从 MySQL 8.0.18 开始，仅支持用于内部联接的 BKA。

  MySQL 8.0.20 还将以前版本的 MySQL 中使用的执行器替换为迭代器执行器。这项工作包括替换旧的索引子查询引擎，该引擎管理 `WHERE value IN (SELECT column FROM table WHERE ...)`形式的查询，用于那些未优化为半联接的查询，以及以相同形式具体化的查询，这些查询以前依赖于旧的执行器。

  更多信息和示例，参阅[章节 8.2.1.4，“哈希连接优化”](/8/8.2/8.2.1/8.2.1.4/hash-joins)。也可参阅[批处理密钥访问联接](/bnl-bka-optimization?id=批处理密钥访问联接)。

- **EXPLAIN ANALYZE 语句**。MySQL 8.0.18 中实现了一种新形式的 [`EXPLAIN`](/13/13.8/13.8.2/explain) 语句 [`EXPLAIN ANALYSE`](/13/13.8/13.8.2/explain?id=通过-EXPLAIN-ANALYZE-获取信息)，它以 `TREE` 的形式为处理查询时使用的每个迭代器提供了 `SELECT` 语句执行情况的扩展信息，并可以将估计成本与查询的实际成本进行比较。此信息包括启动成本、总成本、迭代器返回的行数以及执行的循环数。

  在 MySQL 8.0.21 及更高版本中，此语句还支持 `FORMAT=TREE` 标识。`TREE` 是唯一受支持的格式。

  参阅[通过 EXPLAIN ANALYZE 获取信息](/13/13.8/13.8.2/explain?id=通过-EXPLAIN-ANALYZE-获取信息)，获取更多信息。

- **查询转换注入**。在版本 8.0.18 和更高版本中，MySQL 在参数的数据类型和预期数据类型不匹配的表达式和条件中向查询项树中注入强制转换操作。这对查询结果或执行速度没有影响，但使执行时的查询相当于符合 SQL 标准的查询，同时保持与 MySQL 早期版本的向后兼容性。

  这种隐式转换现在在时态类型（[`DATE`](/11/11.2/11.2.2/datetime)、[`DATETIME`](/11/11.2/11.2.2/datetime)、[`TIMESTAMP`](/11/11.2/11.2.2/datetime)、[`TIME`](/11/11.2/11.2.3/time)）和数值类型（[`SMALLINT`](/11/11.1/11.1.2/integer-types)、[`TINYINT`](/11/11.1/11.1.2/integer-types)、[`MEDIUMINT`](/11/11.1/11.1.2/integer-types)、[`INT`](/11/11.1/11.1.2/integer-types)/[`INTEGER`](/11/11.1/11.1.2/integer-types)、[`BIGINT`](/11/11.1/11.1.2/integer-types)；[`DECIMAL`](/11/11.1/11.1.3/fixed-point-types)/[`NUMERIC`](/11/11.1/11.1.3/fixed-point-types)；[`FLOAT`](/11/11.1/11.1.4/floating-point-types)、[`DOUBLE`](/11/11.1/11.1.4/floating-point-types)、 [`REAL`](/11/11.1/11.1.4/floating-point-types)；[`BIT`](/11/11.1/11.1.5/bit-type)）使用任何标准数字比较运算符（[`=`](/12/12.4/12.4.4/assignment-operators)、[`>=`](/12/12.4/12.4.2/comparison-operators)、[`>`](/12/12.4/12.4.2/comparison-operators)、[`<`](/12/12.4/12.4.2/comparison-operators)、[`<=`](/12/12.4/12.4.2/comparison-operators)、[`<>`](/12/12.4/12.4.2/comparison-operators)、[`!=`](/12/12.4/12.4.2/comparison-operators) 或 [`<=>`](/12/12.4/12.4.2/comparison-operators)）进行比较时。在这种情况下，任何尚未为 DOUBLE 值都将转换为一。现在还可以执行强制转换注入来比较 [`DATE`](/11/11.2/11.2.2/datetime) 或 [`TIME`](/11/11.2/11.2.2/datetime) 与 [`DATETIME`](/11/11.2/11.2.2/datetime) 之间的差异，在这种情况下，只要有必要，就可以将参数强制转换为 [`DATETIME`](/11/11.2/11.2.2/datetime)。

  从 MySQL 8.0.21 开始，在比较字符串类型与其他类型时也会执行此类强制转换。强制转换的字符串类型包括 [`CHAR`](/11/11.3/11.3.2/char)、[`VARCHAR`](/11/11.3/11.3.2/char)、[`BINARY`](/11/11.3/11.3.3/binary-varbinary)、[`VARBINARY`](/11/11.3/11.3.3/binary-varbinary)、[`BLOB`](/11/11.3/11.3.4/blob)、[`TEXT`](/11/11.3/11.3.4/blob)、[`ENUM`](/11/11.3/11.3.5/enum) 和 [`SET`](/11/11.3/11.3.6/set)。将字符串类型的值与数字类型或 `YEAR` 进行比较时，字符串类型转换为 [`DOUBLE`]；如果另一个参数的类型不是 [`FLOAT`](/11/11.1/11.1.4/floating-point-types)、[`DOUBLE`](/11/11.1/11.1.4/floating-point-types) 或 [`REAL`](/11/11.1/11.1.4/floating-point-types)，那么它也将转换为 [`DOUBLE`](/11/11.1/11.1.4/floating-point-types)。将字符串类型与 [`DATETIME`](/11/11.2/11.2.2/datetime) 或 [`TIMESTAMP`](/11/11.2/11.2.2/datetime) 值进行比较时，字符串被强制转换为 [`DATETIME`](/11/11.2/11.2.2/datetime)；将字符串类型与日期进行比较时，字符串将强制转换为 [`DATE`](/11/11.2/11.2.2/datetime)。

  通过查看 [`EXPLAIN ANALYZE`](/13/13.8/13.8.2/explain?id=通过-EXPLAIN-ANALYZE-获取信息)、`EXPLAIN FORMAT=JSON` 或 `EXPLAIN FORMAT=TREE` 的输出，可以查看何时将转换注入给定查询：

  ```bash
  mysql> CREATE TABLE d (dt DATETIME, d DATE, t TIME);
  Query OK, 0 rows affected (0.62 sec)

  mysql> CREATE TABLE n (i INT, d DECIMAL, f FLOAT, dc DECIMAL);
  Query OK, 0 rows affected (0.51 sec)

  mysql> CREATE TABLE s (c CHAR(25), vc VARCHAR(25),
      ->     bn BINARY(50), vb VARBINARY(50), b BLOB, t TEXT,
      ->     e ENUM('a', 'b', 'c'), se SET('x' ,'y', 'z'));
  Query OK, 0 rows affected (0.50 sec)

  mysql> EXPLAIN FORMAT=TREE SELECT * from d JOIN n ON d.dt = n.i\G
  *************************** 1. row ***************************
  EXPLAIN: -> Inner hash join (cast(d.dt as double) = cast(n.i as double))
  (cost=0.70 rows=1)
      -> Table scan on n  (cost=0.35 rows=1)
      -> Hash
          -> Table scan on d  (cost=0.35 rows=1)

  mysql> EXPLAIN FORMAT=TREE SELECT * from s JOIN d ON d.dt = s.c\G
  *************************** 1. row ***************************
  EXPLAIN: -> Inner hash join (d.dt = cast(s.c as datetime(6)))  (cost=0.72 rows=1)
      -> Table scan on d  (cost=0.37 rows=1)
      -> Hash
          -> Table scan on s  (cost=0.35 rows=1)

  1 row in set (0.01 sec)

  mysql> EXPLAIN FORMAT=TREE SELECT * from n JOIN s ON n.d = s.c\G
  *************************** 1. row ***************************
  EXPLAIN: -> Inner hash join (cast(n.d as double) = cast(s.c as double))  (cost=0.70 rows=1)
      -> Table scan on s  (cost=0.35 rows=1)
      -> Hash
          -> Table scan on n  (cost=0.35 rows=1)

  1 row in set (0.00 sec)
  ```

  这样的强制转换也可以通过执行 `EXPLAIN[FORMAT=TRACTIVAL]` 看到，在这种情况下，在执行 `EXPLAIN` 语句后还需要发出 [`SHOW WARNINGS`](/13/13.7/13.7.7/13.7.7.42/show-warnings)。

- **时区支持 TIMESTAMP 和 DATETIME**。从 MySQL 8.0.19 开始，服务器接受带有插入日期时间（[`TIMESTAMP`](/11/11.2/11.2.2/datetime) 和 [`DATETIME`](/11/11.2/11.2.2/datetime)）值的时区偏移量。此偏移使用的格式与设置 [`time_zone`](/5/5.1/5.1.8/server-system-variables) 系统变量时使用的格式相同，但当偏移的小时数部分小于 10 时需要前导零，并且不允许使用 “-00:00”。包含时区偏移的日期时间文字的示例有 “`2019-12-11 10:40:30-05:00`”、“`2003-04-14 03:30:00+10:00`” 和 “`2020-01-01 15:35:45+05:30`”。

  选择日期时间值时不显示时区偏移。

  包含时区偏移量的 Datetime 文字可以用作 prepared 语句参数值。

  作为这项工作的一部分，用于设置 [`time_zone`](/5/5.1/5.1.8/server-system-variables) 系统变量的值现在也限制在 `-13:59` 到 `+14:00`（包含上下界）的范围内(仍然可以将名称值分配给 `time_zone`，例如把 “EST”、“Posix/Australia/Brisbane” 和 “Europe/Stockholm” 分配给该变量，前提是加载了 MySQL 时区表；参阅[填充时区表](/5/5.1/5.1.15/time-zone-support?id=填充时区表))。

  更多信息和示例，参阅[章节 5.1.15，“MySQL Server 时区支持”](/5/5.1/5.1.15/time-zone-support)，以及[章节 11.2.2，“DATE、DATETIME 和 TIMESTAMP 类型”](/11/11.2/11.2.2/datetime)。

- **JSON 模式检查约束失败的精确信息**。当使用 [`JSON_SCHEMA_VALID()`](/12/12.18/12.18.7/json-validation-functions) 指定检查约束时，MySQL 8.0.19 及更高版本提供了有关此类约束失败原因的精确信息。

  更多示例及信息，参阅[JSON_SCHEMA_VALID() 及 CHECK 约束](/12/12.18/12.18.7/json-validation-functions)，及[章节 13.1.20.6，“CHECK 约束”](/13/13.1/13.1.20/13.1.20.6/create-table-check-constraints)。

- **用于 ON DUPLICATE KEY UPDATE 的行列别名**。从 MySQL 8.0.19 开始，可以使用别名引用要插入的行，或者引用列。考虑表 `t` 中具有列 `a` 和 `b` 的 [`INSERT`](/13/13.2/13.2.6/insert) 语句：

  ```bash
  INSERT INTO t SET a=9,b=5
      ON DUPLICATE KEY UPDATE a=VALUES(a)+VALUES(b);
  ```

  对于新行使用别名 `new`，在某些情况下，对于此行的列使用别名 `m` 和 `n`，可以用多种不同的方式重写 `INSERT` 语句，其中的一些示例如下所示：

  ```bash
  INSERT INTO t SET a=9,b=5 AS new
      ON DUPLICATE KEY UPDATE a=new.a+new.b;

  INSERT INTO t VALUES(9,5) AS new
      ON DUPLICATE KEY UPDATE a=new.a+new.b;

  INSERT INTO t SET a=9,b=5 AS new(m,n)
      ON DUPLICATE KEY UPDATE a=m+n;

  INSERT INTO t VALUES(9,5) AS new(m,n)
      ON DUPLICATE KEY UPDATE a=m+n;
  ```

  更多信息及示例，参阅[章节 13.2.6.2，“INSERT ... ON DUPLICATE KEY UPDATE 语句”](/13/13.2/13.2.6/13.2.6.2/insert-on-duplicate)。

- **SQL 标准显式表子句和表值构造函数**。根据 SQL 标准添加了表值构造函数和显式表子句。它们分别在 MySQL 8.0.19 中实现为 [`TABLE`](/13/13.2/13.2.12/table) 语句和 [`VALUES`](/13/13.2/13.2.14/values) 语句。

  [`TABLE`](/13/13.2/13.2.12/table) 语句的格式为 `TABLE TABLE_name`，相当于 `SELECT * FROM TABLE_name`。它支持 `ORDER BY` 和 `LIMIT` 子句（后者带有可选偏移量），但不允许选择单个表列。[`TABLE`](/13/13.2/13.2.12/table) 可以在任何使用等效 [`SELECT`](/13/13.2/13.2.10/select) 语句的地方使用；这包括连接、联合、[`INSERT ... SELECT`](/13/13.2/13.2.6/13.2.6.1/insert-select), [`REPLACE`](/13/13.2/13.2.9/replace), [`CREATE TABLE ... SELECT`](/13/13.1/13.1.20/13.1.20.4/create-table-select) 语句和子查询。例如：

  - `TABLE t1 UNION TABLE t2` 等价于 `SELECT * FROM t1 UNION SELECT * FROM t2`
  - `CREATE TABLE t2 TABLE t1` 等价于 `CREATE TABLE t2 SELECT * FROM t1`
  - `SELECT a FROM t1 WHERE b > ANY (TABLE t2)` 等价于 `SELECT a FROM t1 WHERE b > ANY (SELECT * FROM t2)`

  [`VALUES`](/13/13.2/13.2.14/values) 可用于向 [`INSERT`](/13/13.2/13.2.6/insert)、[`REPLACE`](/13/13.2/13.2.9/replace) 或 [`SELECT`](/13/13.2/13.2.10/select) 语句提供表值，它由 `VALUES` 关键字后跟一系列以逗号分隔的行构造函数（`ROW()`）组成。例如，语句 `INSERT INTO t1 VALUES ROW(1,2,3),ROW(4,5,6),ROW(7,8,9)` 提供了与 SQL 兼容的等效语句，相当于 MySQL 特定的 `INSERT INTO t1 VALUES(1,2,3),(4,5,6),(7,8,9)`。你也可以像从表中选择值一样从值表值构造函数中进行选择，记住这样做时必须提供表别名，并像使用任何其他方法一样使用 [`SELECT`](/13/13.2/13.2.10/select)，这包括联接、联合和子查询。

  关于 `TABLES` 和 `VALUES` 更多信息，以及他们的使用示例，参阅文档的以下章节：

  - [章节 13.2.12，“TABLE 语句”](/13/13.2/13.2.12/table)
  - [章节 13.2.14，“VALUES 语句”](/13/13.2/13.2.14/values)
  - [章节 13.1.20.4，“CREATE TABLE ... SELECT 语句”](/13/13.1/13.1.20/13.1.20.4/create-table-select)
  - [章节 13.2.6.1，“INSERT ... SELECT 语句”](/13/13.2/13.2.6/13.2.6.1/insert-select)
  - [章节 13.2.10.2，“JOIN 子句”](/13/13.2/13.2.10.2/join)
  - [章节 13.2.11，“子查询”](/13/13.2/13.2.11/subqueries)
  - [章节 13.2.10.3，“UNION 子句”](/13/13.2/13.2.10/13.2.10.3/union)

- **FORCE INDEX，IGNORE INDEX 的优化器提示**。MySQL 8.0 引入了索引级优化器提示，与[章节 8.9.4，“索引提示”](/8/8.9/8.9.4/index-hints)中描述的传统索引提示类似。此处列出了新提示及其强制索引或忽略索引等价项：

  - [`GROUP_INDEX`](/8/8.9/8.9.3/optimizer-hints?id=索引级优化器提示): 等价于 `FORCE INDEX FOR GROUP BY`
  - [`NO_GROUP_INDEX`](/8/8.9/8.9.3/optimizer-hints?id=索引级优化器提示): 等价于 `IGNORE INDEX FOR GROUP BY`
  - [`JOIN_INDEX`](/8/8.9/8.9.3/optimizer-hints?id=索引级优化器提示): 等价于 `FORCE INDEX FOR JOIN`
  - [`NO_JOIN_INDEX`](/8/8.9/8.9.3/optimizer-hints?id=索引级优化器提示): 等价于 `IGNORE INDEX FOR JOIN`
  - [`ORDER_INDEX`](/8/8.9/8.9.3/optimizer-hints?id=索引级优化器提示): 等价于 `FORCE INDEX FOR ORDER BY`
  - [`NO_ORDER_INDEX`](/8/8.9/8.9.3/optimizer-hints?id=索引级优化器提示): 等价于 `IGNORE INDEX FOR ORDER BY`
  - [`INDEX`](/8/8.9/8.9.3/optimizer-hints?id=索引级优化器提示): 与 [`GROUP_INDEX`](/8/8.9/8.9.3/optimizer-hints?id=索引级优化器提示) 加 [`JOIN_INDEX`](/8/8.9/8.9.3/optimizer-hints?id=索引级优化器提示) 加 [`ORDER_INDEX`](/8/8.9/8.9.3/optimizer-hints?id=索引级优化器提示) 相同； 等价于不带修饰符的 `FORCE INDEX`
  - [`NO_INDEX`](/8/8.9/8.9.3/optimizer-hints?id=索引级优化器提示): 与 [`NO_GROUP_INDEX`](/8/8.9/8.9.3/optimizer-hints?id=索引级优化器提示) 加 [`NO_JOIN_INDEX`](/8/8.9/8.9.3/optimizer-hints?id=索引级优化器提示) 加 [`NO_ORDER_INDEX`](/8/8.9/8.9.3/optimizer-hints?id=索引级优化器提示) 相同； 等价于不带修饰符的 `IGNORE INDEX`

  例如，以下是两个等价查询：

  ```bash
  SELECT a FROM t1 FORCE INDEX (i_a) FOR JOIN WHERE a=1 AND b=2;

  SELECT /*+ JOIN_INDEX(t1 i_a) */ a FROM t1 WHERE a=1 AND b=2;
  ```

  前面列出的优化器提示遵循与现有索引级优化器提示相同的语法和用法基本规则。

  这些优化器提示旨在取代 `FORCE INDEX` 和 `IGNORE INDEX`，我们计划在未来的 MySQL 版本中弃用它们，并随后从 MySQL 中删除。它们没有为 `USE INDEX` 实现一个完全相同的功能;相反，你可以使用一个或多个 [`NO_INDEX`](/8/8.9/8.9.3/optimizer-hints?id=索引级优化器提示) 加 [`NO_ORDER_INDEX`](/8/8.9/8.9.3/optimizer-hints?id=索引级优化器提示)、[`NO_JOIN_INDEX`](/8/8.9/8.9.3/optimizer-hints?id=索引级优化器提示) 加 [`NO_ORDER_INDEX`](/8/8.9/8.9.3/optimizer-hints?id=索引级优化器提示)、[`NO_GROUP_INDEX`](/8/8.9/8.9.3/optimizer-hints?id=索引级优化器提示) 加 [`NO_ORDER_INDEX`](/8/8.9/8.9.3/optimizer-hints?id=索引级优化器提示) 或 [`NO_ORDER_INDEX`](/8/8.9/8.9.3/optimizer-hints?id=索引级优化器提示) 加 [`NO_ORDER_INDEX`](/8/8.9/8.9.3/optimizer-hints?id=索引级优化器提示) 来实现相同的效果。

- **JSON_VALUE() 函数**。MySQL 8.0.21 实现了一个新函数 [`JSON_VALUE()`](/12/12.18/12.18.3/json-search-functions)，用于简化 [`JSON`](/11/11.5/json) 列的索引。在其最基本的形式中，它将JSON文档和指向该文档中单个值的 JSON 路径作为参数，并且（可选）允许你使用 `RETURNING` 关键字指定返回类型。JSON_VALUE(json_doc, path RETURNING type) 等价于：

  ```bash
  CAST(
    JSON_UNQUOTE( JSON_EXTRACT(json_doc, path) )
    AS type
  );
  ```

  你还可以指定 `ON EMPTY`、`ON ERROR` 或两个子句一起，类似于 [`JSON_TABLE()`](/12/12.18/12.18.6/json-table-functions) 中使用的那些子句。

  你可以使用 `JSON_VALUE()` 在 JSON 列上的表达式上创建索引，如下所示：

  ```bash
  CREATE TABLE t1(
    j JSON,
    INDEX i1 ( (JSON_VALUE(j, '$.id' RETURNING UNSIGNED)) )
  );

  INSERT INTO t1 VALUES ROW('{"id": "123", "name": "shoes", "price": "49.95"}');
  ```

  使用此表达式的查询（如此处所示）可以使用索引：

  ```bash
  SELECT name, price FROM t1
    WHERE JSON_VALUE(j, '$.id' RETURNING UNSIGNED) = 123;
  ```

  在许多情况下，这比从 `JSON` 列创建一个生成的列，然后再在生成的列上创建索引要简单。

  更多信息及示例，参阅[`JSON_VALUE()`](/12/12.18/12.18.3/json-search-functions)。

- **用户备注和用户属性**。MySQL 8.0.21 引入了在创建或更新用户帐户时设置用户备注和用户属性的功能。用户备注由作为参数传递给 [`CREATE USER`](/13/13.7/13.7.1/13.7.1.3/create-user) 或 [`ALTER USER`](/13/13.7/13.7.1/13.7.1.1/alter-user) 语句使用的 `COMMENT` 子句的任意文本组成。用户属性由JSON对象形式的数据组成，该 JSON 对象作为参数传递给与这两条语句一起使用的 `ATTRIBUTE` 子句。该属性可以包含 JSON 对象表示法中的任何有效键值对。在单个 `CREATE USER` 或 `ALTER USER` 语句中只能使用 `COMMENT` 或 `ATTRIBUTE` 其中一个。

  用户备注和用户属性在内部作为 JSON 对象存储在一起，备注文本作为元素的值，`comment` 作为它的键。可以从 [`INFORMATION_SCHEMA.USER_ATTRIBUTES`](/26/26.3/26.3.46/information-schema-user-attributes-table) 表的 `ATTRIBUTE` 列检索此信息；因为它是 JSON 格式的，所以你可以使用 MySQL 的 JSON 函数和操作符来解析它的内容（参阅[章节 12.18，“JSON 函数”](/12/12.18/json-functions)）。使用 [`JSON_MERGE_PATCH()`](/12/12.18/12.18.4/json-modification-functions) 函数时，用户属性的连续更改将与其当前值合并。

  示例：

  ```bash
  mysql> CREATE USER 'mary'@'localhost' COMMENT 'This is Mary Smith\'s account';
  Query OK, 0 rows affected (0.33 sec)

  mysql> ALTER USER 'mary'@'localhost'
      -≫     ATTRIBUTE '{"fname":"Mary", "lname":"Smith"}';
  Query OK, 0 rows affected (0.14 sec)

  mysql> ALTER USER 'mary'@'localhost'
      -≫     ATTRIBUTE '{"email":"mary.smith@example.com"}';
  Query OK, 0 rows affected (0.12 sec)

  mysql> SELECT
      ->    USER,
      ->    HOST,
      ->    ATTRIBUTE->>"$.fname" AS 'First Name',
      ->    ATTRIBUTE->>"$.lname" AS 'Last Name',
      ->    ATTRIBUTE->>"$.email" AS 'Email',
      ->    ATTRIBUTE->>"$.comment" AS 'Comment'
      -> FROM INFORMATION_SCHEMA.USER_ATTRIBUTES
      -> WHERE USER='mary' AND HOST='localhost'\G
  *************************** 1. row ***************************
        USER: mary
        HOST: localhost
  First Name: Mary
  Last Name: Smith
      Email: mary.smith@example.com
    Comment: This is Mary Smith's account
  1 row in set (0.00 sec)
  ```

  更多信息及示例，参阅[章节 13.7.1.3，“CREATE USER 语句”](/13/13.7/13.7.1/13.7.1.3/create-user)，[章节 13.7.1.1，“ALTER USER 语句”](/13/13.7/13.7.1/13.7.1.1/alter-user)以及[章节 26.3.46，“INFORMATION_SCHEMA USER_ATTRIBUTES 表”](/26/26.3/26.3.46/information-schema-user-attributes-table)。
- **新的 optimizer_switch 标志**。MySQL 8.0.21 为 [`optimizer_switch`](/5/5.1/5.1.8/server-system-variables) 系统变量添加了两个新标志，如下列：
  - [`prefer_ordering_index`](/8/8.9/8.9.2/switchable-optimizations) 标志

    默认情况下，只要优化器确定能加快执行速度，MySQL 就会尝试对任何具有 `LIMIT` 子句的 `ORDER BY` 或 `GROUP BY`查询使用有序索引。因为在某些情况下，为此类查询选择不同的优化实际上执行得更好，所以现在可以通过将 `prefere_ordering_index` 标志设置为 `off` 来禁用此优化。

    此标志默认值为 `on`。

  - [`subquery_to_derived`](/8/8.9/8.9.2/switchable-optimizations) 标志

    当该标志设置为 `on` 时，优化器将合格的标量子查询转换为派生表上的联接。例如，查询 `SELECT * FROM t1 WHERE t1.a > (SELECT COUNT(a) FROM t2)` 被重写为 `SELECT t1.a FROM t1 JOIN ( SELECT COUNT(t2.a) AS c FROM t2 ) AS d WHERE t1.a > d.c`。

    此优化可应用于作为 `SELECT`、`WHERE`、`JOIN` 或 `HAVING` 子句一部分的子查询；包含一个或多个聚合函数，但没有 `GROUP BY` 子句；不相关；并且不使用任何不确定函数。

    优化还可以应用于表子查询，该表子查询是 `IN`、`NOT IN`、`EXISTS` 或 `NOT EXISTS` 的参数，并且不包含 `GROUP BY`。例如， `SELECT * FROM t1 WHERE t1.b < 0 OR t1.a IN (SELECT t2.a + 1 FROM t2)` 重写为 `SELECT a, b FROM t1 LEFT JOIN (SELECT DISTINCT 1 AS e1, t2.a AS e2 FROM t2) d ON t1.a + 1 = d.e2 WHERE t1.b < 0 OR d.e1 IS NOT NULL`。

    从 MySQL 8.0.24 开始，这种优化也可以应用于相关标量子查询，方法是对其应用额外的分组，然后在提升的谓词上应用外部联接。例如，一个查询，如 `SELECT * FROM t1 WHERE (SELECT a FROM t2 WHERE t2.a=t1.a) > 0` 可被重写为 `SELECT t1.* FROM t1 LEFT OUTER JOIN (SELECT a, COUNT(*) AS ct FROM t2 GROUP BY a) AS derived ON t1.a = derived.a WHERE derived.a > 0`。MySQL 执行基数检查以确保子查询不会返回超过一行（[`ER_subquery_NO_1_row`](https://dev.mysql.com/doc/mysql-errors/8.0/en/server-error-reference.html#error_er_subquery_no_1_row)）。参阅[章节 13.2.11.7，“关联子查询”](/13/13.2/13.2.11/13.2.11.7/correlated-subqueries)。

  更多信息，参阅[章节 8.9.2，“可切换优化”](/8/8.9/8.9.2/switchable-optimizations)。以及[章节 8.2.1.19，“LIMIT 查询优化”](/8/8.2/8.2.1/8.2.1.19/limit-optimization)、[章节 8.2.2.1，“使用半联接转换优化 IN 和 EXISTS 子查询谓词”](/8/8.2/8.2.2/8.2.2.1/semijoins)，[章节 8.2.2.4，“使用合并或物化优化派生表、视图引用和公共表表达式”](/8/8.2/8.2.2/8.2.2.4/derived-table-optimization)。
- **XML 增强**。从 MySQL 8.0.21 开始，[`LOAD XML`](/13/13.2/13.2.8/load-xml) 语句现在支持要导入的 XML 中的 `CDATA` 部分。
- **现在支持转换为 YEAR 类型**。从 MySQL 8.0.22 开始，服务器允许转换为 [`YEAR`](/11/11.2/11.2.4/year)。[`CAST()`](/12/12.11/cast-functions) 和 [`CONVERT()`](/12/12.11/cast-functions) 函数都支持一位、两位和四位的 `YEAR` 值。对于一位和两位的值，允许的范围为 0-99。四位的值必须在 1901-2155 之间。`YEAR` 也可以用作 [`JSON_VALUE()`](/12/12.18/12.18.3/json-search-functions) 函数的返回类型；此函数仅支持四位年份。

  字符串、时间和日期以及浮点值都可以强制转换为 `YEAR`。不支持将 [`GEOMETRY`](/12/12.11/cast-functions) 值转换为 `YEAR`。

  更多信息，包括转换规则，参阅 [`CONVERT()`](/12/12.11/cast-functions) 函数的描述。

- **以 UTC 格式检索 TIMESTAMP**。MySQL 8.0.22 及更高版本支持在检索时，通过 `CAST(value AT TIME ZONE specifier AS DATETIME)` （其中 specifier 为 [INTERVAL] '+00:00' 或 'UTC' 之一），将 [`TIMESTAMP`](/11/11.2/11.2.2/datetime) 列值从系统时区转换为 UTC [`DATETIME`](/11/11.2/11.2.2/datetime)。如果需要，可以将强制转换返回的 `DATETIME` 值的精度指定为最多 6 位小数。此构造不支持 `ARRAY` 关键字。

  也支持使用时区偏移插入表中的 `TIMESTAMP` 值。[`CONVERT()`](/12/12.11/cast-functions)）或任何其他 MySQL 函数或构造都不支持 `AT TIME ZONE`。

  更多信息及示例，参阅 [`CAST()`](/12/12.11/cast-functions) 函数的描述。

- **转储文件输出同步**。MySQL 8.0.22 及更高版本在通过 `SELECT INTO DUMPFILE` 和 `SELECT INTO OUTFILE` 语句写入文件时支持定期同步。这可以通过将 [`select_into_disk_sync`](/5/5.1/5.1.8/server-system-variables) 系统变量设置为 `ON` 来启用；写入缓冲区的大小由为 [`select_into_buffer_size`](/5/5.1/5.1.8/server-system-variables) 设置的值确定；默认值为 131072（2<sup>17</sup>）字节。

  此外，可以使用 [`select_into_disk_sync_delay`](/5/5.1/5.1.8/server-system-variables) 设置磁盘同步后的可选延迟；默认值为无延迟（0毫秒）。

  更多信息，参阅此部分提到的变量的相关描述。

- **单次预处理语句**。从 MySQL 8.0.22 开始，预处理（prepared）语句只准备一次，而不是每次执行一次。这是在执行 [`PREPARE`](/13/13.5/13.5.1/prepare) 时完成的。存储过程中的任何语句也是如此；当存储过程首次执行时，语句预处理一次。

  这种变化的一个结果是，预处理语句中使用的动态参数的解析方式也发生了变化，如下所示：
  
  - 在预处理语句时，为预处理好的语句参数指定数据类型；该类型在语句的每次后续执行中都会保持不变（除非重新编写该语句；见下文）。

    为预处理好的语句中的给定参数或用户变量使用不同的数据类型，以便在第一次执行之后执行该语句，可能会导致重新预处理该语句；因此，在重新执行预处理好的语句时，建议对给定参数使用相同的数据类型。

  - 为了与 SQL 标准保持一致，不再接受使用窗口函数的以下构造：
    - [`NTILE(NULL)`](/12/12.21/12.21.1/window-function-descriptions)
    - [`NTH_VALUE(expr, NULL)`](/12/12.21/12.21.1/window-function-descriptions)
    - [`LEAD(expr, nn)`](/12/12.21/12.21.1/window-function-descriptions) and [`LAG(expr, nn)`](/12/12.21/12.21.1/window-function-descriptions)，其中 *nn* 是一个正数。

    这有助于更好地遵守 SQL 标准。有关更多详细信息，请参见各个功能说明。
  
  - 预处理语句中引用的用户变量现在在预处理语句时已确定其数据类型；对于语句的每次后续执行，该类型都会保持不变。

  - 存储过程中发生的语句引用的用户变量现在在第一次执行该语句时就确定了其数据类型；该类型持续存在，以便后续调用包含的存储过程。

  - 执行格式为 `SELECT expr1, expr2, ... FROM table ORDER BY ?` 中，为参数传递整数值 *N* 不再导致结果按选择列表中的第 N<sup>th</sup> 表达式排序；结果不再是有序的，这与 `ORDER BY constant` 的预期一样。

  将语句作为预处理语句或仅在存储过程中准备一次可以提高语句的性能，因为它可以抵消重复准备所增加的成本。这样做还可以避免准备结构的多次回滚，这一直是 MySQL 中许多问题的根源。

  更多信息，参阅[章节 13.5.1，“PREPARE 语句”](/13/13.5/13.5.1/prepare)。

- **RIGHT JOIN 作为 LEFT JOIN 处理**。从MySQL 8.0.22开始，服务器将 `RIGHT JOIN` 的所有实例作为 `LEFT JOIN` 在内部处理，从而消除了在解析时未执行完全转换的一些特殊情况。
- **导出条件下推优化**。MySQL 8.0.22（及更高版本）为具有物化派生表的查询实现派生条件下推。对于查询，如 `SELECT * FROM (SELECT i, j FROM t1) AS dt WHERE i > constant`，在许多情况下，现在可以将外部 `WHERE` 条件下推到派生表，在这种情况下会得到 `SELECT * FROM (SELECT i, j FROM t1 WHERE i > constant) AS dt`。

  以前，如果派生表是物化的而不是合并的，MySQL 物化整个表，然后使用 `WHERE` 条件限定行。使用派生条件下推优化将WHERE条件移动到子查询中通常可以减少必须处理的行数，这可以减少执行查询所需的时间。

  当派生表不使用任何聚合或窗口函数时，可以将外部 `WHERE` 条件直接下推到具体化的派生表。当派生表具有 `GROUP BY` 且不使用任何窗口函数时，可以将外部 `WHERE` 条件作为 `HAVING` 条件下推到派生表。当派生表使用窗口函数时，`WHERE` 条件也可以向下推，而外部 `WHERE` 引用列在窗口函数的 `PARTITION` 子句中使用。

  派生条件下推默认启用，如 `[`optimizer_switch`](/5/5.1/5.1.8/server-system-variables)` 系统变量的 [`derived_condition_pushdown`](/8/8.9/8.9.2/switchable-optimizations) 标志所标示。MySQL 8.0.22 中添加的标志默认设置为 `on`；要禁用特定查询的优化，可以使用 [`NO_DERIVED_CONDITION_PUSHDOWN`](/8/8.9/8.9.3/optimizer-hints?id=表级优化器提示) 优化器提示（也添加在 MySQL 8.0.22 中）。如果由于 [`derived_condition_pushdown`](/8/8.9/8.9.2/switchable-optimizations) 设置为 `off` 而禁用优化，则可以通过 [`DERIVED_CONDITION_PUSHDOWN`](/8/8.9/8.9.3/optimizer-hints?id=表级优化器提示) 为给定查询启用优化。

  派生条件下推优化不能用于包含 `UNION` 或 `LIMIT` 子句的派生表。此外，不能将本身使用子查询的条件下推，也不能将 `WHERE` 条件下推到也是外部联接的内部表的派生表。更多信息及示例，参阅[章节 8.2.2.5，“导出条件下推优化”](/8/8.2/8.2.2/8.2.2.5/derived-condition-pushdown-optimization)。

- **MySQL 授权表上的非锁定读取**。从 MySQL 8.0.22 开始，为了允许在 MySQL 授权表上同时执行 DML 和 DDL 操作，以前在 MySQL 授权表上获取行锁的读取操作将作为非锁定读取执行。

  现在在 MySQL 授权表上以非锁定读取方式执行的操作包括：

  - [`SELECT`](/13.2.10/select) 语句和其他只读语句，它们通过联接列表和子查询（使用任何事务隔离级别）从授权表读取数据，包括 [`SELECT ... FOR SHARE`](/15/15.7/15.7.2/15.7.2.4/innodb-locking-reads) 语句。

  - 使用任何事务隔离级别从授权表（通过联接列表或子查询）读取数据但不修改数据的 DML 操作。

  更多信息，参阅[授权表并发](/6/6.2/6.2.3/grant-tables?id=授权表并发)。

## MySQL 8.0 弃用特性

以下特性在 MySQL 8.0 中已被弃用，并可能在未来的系列中删除。如果显示了备选方案，则应更新应用程序以使用它们。

对于使用 MySQL 8.0 中不推荐的功能并已在更高的 MySQL 系列中删除的应用程序，当从 MySQL 8.0 源复制到更高的系列副本时，语句可能会失败，或者可能对源和副本产生不同的影响。为避免此类问题，应修改使用 8.0 中不推荐的功能的应用程序，以避免使用这些功能，并在可能的情况下使用其他功能。

- 废弃 `utf8mb3` 字符集。请使用 `utf8mb4`。

- 由于在 MySQL 8.0 中，`caching_sha2_password` 是默认的身份验证插件，并且提供了 `sha256_password` 身份验证插件功能的超集，因此不推荐使用 `sha256_password`；预计它将在 MySQL 的未来版本中删除。使用 `sha256_password` 进行身份验证的 MySQL 帐户应迁移为使用 `caching_sha2_password`。

- `validate_password` 插件已重新实现以使用组件基础结构。`validate_password` 的插件形式仍然可用，但已弃用；预计它将在 MySQL 的未来版本中删除。使用插件的 MySQL 安装应该转换为使用组件。参阅[章节 6.4.3.3，“转换为密码验证组件”](/6/6.4/6.4.3/6.4.3.3/validate-password-transitioning)。

- [`ALTER TABLESPACE`](/13/13.1.10/13.10/alter-tablespace) 和 [`DROP TABLESPACE`](/13/13.1/13.1.13/drop-tablespace) 语句的 `ENGINE` 子句已被弃用。

- [`PAD_CHAR_TO_FULL_LENGTH`](/5/5.1/5.1.11/sql-mode) SQL 模式弃用。

- 对于 [`FLOAT`](/11/11.1/11.1.4/floating-point-types) 和 [`DOUBLE`](/11/11.1/11.1.4/floating-point-types)（以及任何同义词）类型的列，不推荐使用 `AUTO_INCREMENT` 支持。考虑从这些列中删除 `AUTO_INCREMENT` 属性，或将它们转换为整数类型。

- 对于 [`FLOAT`](/11/11.1/11.1.4/floating-point-types)、[`DOUBLE`](/11/11.1/11.1.4/floating-point-types) 和 [`DECIMAL`](/11/11.1/11.1.3/fixed-point-types) （以及任何同义词）类型的列，不推荐使用 `UNSIGNED` 属性。考虑使用一个简单的 `CHECK` 约束来代替这样的列。

- `FLOAT(M,D)` 和 `DOUBLE(M,D)` 语法用于指定 [`FLOAT`](/11/11.1/11.1.4/floating-point-types) 和 [`DOUBLE`](/11/11.1/11.1.4/floating-point-types)（以及任何同义词）类型的列的位数，这是一个非标准的 MySQL 扩展。此语法已弃用。

- 数字数据类型不推荐使用 `ZEROFILL` 属性，整数数据类型不推荐使用展示宽度属性。考虑使用一种替代方法来产生这些属性的效果。例如，应用程序可以使用 [`LPAD()`](/12/12.8/string-functions) 函数将数字零对齐至所需的宽度，也可以将格式化的编号存储在 [`CHAR`](/11/11.3/11.3.2/char) 列中。

- 对于字符串数据类型，`BINARY` 属性是一个非标准的 MySQL 扩展，它是指定列字符集（或如果未指定列字符集，则为表默认字符集）的二进制（`_-bin`）排序规则的缩写。在 MySQL 8.0 中，二进制的这种非标准使用是不明确的，因为 `utf8mb4` 字符集有多个 `_-bin` 排序规则，所以 `BINARY` 属性不推荐使用；期望在 MySQL 的未来版本中删除对它的支持。应用程序应该调整为使用显式的 `_-bin` 排序规则。

  使用 `BINARY` 指定数据类型或字符集保持不变。

- 非标准C风格 [`&&`](/12/12.4/12.4.3/logical-operators)、[`||`](/12/12.4/12.4.3/logical-operators) 和[`!`](/12/12.4/12.4.3/logical-operators) 分别作为标准 SQL [`AND`](/12/12.4/12.4.3/logical-operators)、[`OR`](/12/12.4/12.4.3/logical-operators) 和 [`NOT`](/12/12.4/12.4.3/logical-operators) 运算符同义词的运算符，不推荐使用。应该把使用非标准运算符的应用程序调整为使用标准运算符。

  ?> 注意：除非启用了 [`PIPES_AS_CONCAT`](/5/5.1/5.1.11/sql-mode) 作为 SQL 模式，否则不推荐使用 [`||`](/12/12.4/12.4.3/logical-operators)。在这种情况下，[`||`](/12/12.4/12.4.3/logical-operators) 表示 SQL 标准字符串连接运算符）。

- [`JSON_MERGE()`](/12/12.18/12.18.4/json-modification-functions) 函数废弃。改为使用 [`JSON_MERGE_PRESERVE()`](/12/12.18/12.18.4/json-modification-functions)。

- `SQL_CALC_FOUND_ROWS` 查询修饰符和附带的 [`FOUND_ROWS()`](/12/12.16/information-functions) 函数弃用。有关替代策略的信息，请参阅 [`FOUND_ROWS()`](/12/12.16/information-functions) 说明。

- 从 MySQL 8.0.13 开始，不推荐支持 `TABLESPACE=innodb_file_per_table` 和带有 [`CREATE TEMPORARY TABLE`](/13/13.1/13.1.20/create-table) 的子句 `TABLESPACE = innodb_temporary`。

- 对于 [`SELECT`](/13/13.2/13.2.10/select) 语句，从 MySQL 8.0.20 开始，不推荐在 `FROM` 之后而不是 `SELECT` 末尾使用 `INTO` 子句。最好在语句末尾放置 `INTO`。

  对于 [`UNION`](/13/13.2/13.2.10/13.2.10.3/union) 语句，从 MySQL 8.0.20 开始，不推荐使用包含 `INTO` 的这两个变体：

  - 在查询表达式的尾部查询块中，在 `FROM` 之前使用 `INTO`。

  - 在查询表达式的带括号的尾部块中，使用 `INTO`，而不考虑其相对于 `FROM` 的位置。

  参阅[章节 13.2.10.1，“SELECT ... INTO 语句”](/13/13.2/13.2.10/13.2.10.1/select-into)和[章节 13.2.10.3，“UNION 子句”](/13/13.2/13.2.10/13.2.10.3/unio)。

- 从 MySQL 8.0.23 起，不推荐使用 [`FLUSH HOSTS`](/13/13.7/13.7.8/13.7.8.3/flush)。而是用清空（truncate）性能模式 [`host_cache`](/27/27.12/27.12.21/27.12.21.2/performance-schema-host-cache-table) 表替代：

  ```bash
  TRUNCATE TABLE performance_schema.host_cache;
  ```

  [`TRUNCATE TABLE`](/13/13.1/13.1.37/truncate-table) 操作需要表的 `DROP` 权限。

- 不推荐使用 [**mysql_upgrade**](/4/4.4/4.4.5/mysql-upgrade) 客户端，因为它升级 `mysql` 系统架构中的系统表和其他架构中的对象的功能已移动到 MySQL server 中。参阅[章节 2.11.3，“MySQL 升级过程升级了什么”](/2/2.11/2.11.3/upgrading-what-is-upgraded)。

- [`--no-dd-upgrade`](/5/5.1/5.1.7/server-options) 选项已废弃。它被 [`--upgrade`](/5/5.1/5.1.7/server-options) 选项取代，该选项提供了对数据字典和服务器升级行为的更好控制。

- 创建数据目录并用于存储 MySQL 版本号的 `mysql_upgrade_info` 文件已被弃用；预计它将在 MySQL 的未来版本中删除。

- `relay_log_info_file` 系统变量和 `--master-info-file` 选项已废弃。以前，在设置 [`relay_log_info_repository=FILE`](/17/17.1/17.1.6/17.1.6.3/replication-options-replic) 和 [`master_info_repository=FILE`](/17/17.1/17.1.6/17.1.6.3/replication-options-replica) 时，这些用于指定中继日志信息日志和源信息日志的名称，但这些设置已被弃用。中继日志信息日志和源信息日志文件的使用已被崩溃安全副本表取代，这是 MySQL 8.0 中的默认值。

- [`max_length_for_sort_data`](/5/5.1/5.1.8/server-system-variable) 现已被废弃，因为优化器的更改使其过时且无效。

- 用于压缩到服务器的连接的这些旧参数已废弃：[`--compress`](/4/4.2/4.2.3/connection-options) 客户端命令行选项；[`mysql_options()`](/5/5.4/5.4.51/mysql-options) C API函数的 `MYSQL_OPT_COMPRESS` 选项；[`slave_compressed_protocol`](/17/17.1/17.1.6/17.1.6.3/replication-options-replica) 系统变量。有关替代参数的信息，参阅[章节 4.2.8，“连接压缩控制”](/4/4.2/4.2.8/connection-compression-control)。

- 不推荐使用 `MYSQL_PWD` 环境变量指定 MYSQL 密码。

- 在 [`INSERT ... ON DUPLICATE KEY UPDATE`](/13/13.2/13.2.6/13.2.6.2/insert-on-duplicate) 中使用 [`VALUES()`](/12/12.24/miscellaneous-functions) 访问新的行值，从 MySQL 8.0.20 开始已废弃。为新行和新列使用别名来替代。

- 因为在调用 [`JSON_TABLE()`](/12.18.6/json-table-functions) 时 在 `ON EMPTY` 前指定 `ON ERROR` 与SQL标准背道而驰，所以MySQL中现在不推荐使用这种语法。从 MySQL 8.0.20 开始，每当你尝试这样做时，服务器都会打印一条警告。在单个 `JSON_TABLE()` 调用中指定这两个子句时，请确保首先使用 `ON EMPTY`。

- 具有索引前缀的列从未被支持作为表分区键的一部分；以前，在创建、更改或升级分区表时，这些是允许的，但被表的分区功能排除在外，并且服务器没有发出发生这种情况的警告。这种许可行为现在已被弃用，并可能在 MySQL 的未来版本中被删除，在该版本中，在分区键中使用任何此类列都会导致其中的 [`CREATE TABLE`](/13/13.1/13.1.20/create-table) 或 [`ALTER TABLE`](/13/13.1/13.1.9/alter-table) 语句被拒绝。

  从MySQL 8.0.21开始，每当使用索引前缀的列被指定为分区键的一部分时，就会为每个这样的列生成警告。每当 [`CREATE TABLE`](/13/13.1/13.1.20/create-table) 或 [`ALTER TABLE`](/13/13.1/13.1.9/alter-table) 语句因为建议的分区键中的所有列都有索引前缀而被拒绝时，产生的错误现在提供了拒绝的确切原因。在任何一种情况下，这都包括这样的情况：分区函数中使用的列通过使用空的 `PARTITION BY KEY()` 子句隐式定义为表主键中的列。

  更多信息及示例，参阅[键分区不支持列索引前缀](/24/24.6/partitioning-limitations)。

- InnoDB memcached 插件从 MySQL 8.0.22 开始被弃用；希望在 MySQL 的未来版本中删除对它的支持。

- 从 MySQL 8.0.26 开始，[`temptable_use_mmap`](/5/5.1/5.1.8/server-system-variables) 被废弃；希望在 MySQL 的未来版本中删除对它的支持。

- 从 MySQL 8.0.27 开始，[`BINARY`](/11/11.3/11.3.3/binary-varbinary) 运算符被废弃，期望在将来的 MySQL 版本中删除它。现在使用 `BINARY` 会导致警告。使用 [`CAST(... AS BINARY)`](/12/12.11/cast-functions) 替代。

## MySQL 8.0 移除的特性

以下项目已过时，并已在 MySQL 8.0 中删除。如果显示了备选方案，则应更新应用程序以使用它们。

对于使用 MySQL 8.0 中删除的功能的 MySQL 5.7 应用程序，当从 MySQL 5.7 源复制到 MySQL 8.0 副本时，语句可能会失败，或者可能对源和副本产生不同的影响。为避免此类问题，应修改使用 MySQL 8.0 中删除的功能的应用程序，并在可能的情况下使用替代方案。

- `innodb_locks_unsafe_for_binlog` 系统变量移除。[`READ COMMITTED`](/15/15.7/15.7.2/15.7.2.1/innodb-transaction-isolation-levels) 隔离级别提供了类似的功能。

- MySQL 8.0.0 引入的变量 `information_schema_stats`，移除并在 MySQL 8.0.3 中被 [`information_schema_stats_expiry`](/5/5.1/5.1.8/server-system-variables) 替换。

  `information_schema_stats_expiry` 定义 [`INFORMATION_SCHEMA`](/26/information-schema) 表统计信息的过期设置。更多信息，参阅[章节 8.2.3，“优化信息和模式查询”](/8/8.2/8.2.3/information-schema-optimization)。

- MySQL 8.0.3 中删除了与过时的 `InnoDB` 系统表相关的代码。基于 `InnoDB` 系统表的信息模式视图被数据字典表的内部系统视图所取代。受影响的 [`INFORMATION_SCHEMA`](/26/information-schema) 视图已重命名：

  表 1.1 重命名 InnoDB 信息架构视图
  |旧名字|新名字|
  |--|--|
  |INNODB_SYS_COLUMNS|INNODB_COLUMNS|
  |INNODB_SYS_DATAFILES|INNODB_DATAFILES|
  |INNODB_SYS_FIELDS|INNODB_FIELDS|
  |INNODB_SYS_FOREIGN|INNODB_FOREIGN|
  |INNODB_SYS_FOREIGN_COLS|INNODB_FOREIGN_COLS|
  |INNODB_SYS_INDEXES|INNODB_INDEXES|
  |INNODB_SYS_TABLES|INNODB_TABLES|
  |INNODB_SYS_TABLESPACES|INNODB_TABLESPACES|
  |INNODB_SYS_TABLESTATS|INNODB_TABLESTATS|
  |INNODB_SYS_VIRTUAL|INNODB_VIRTUAL|

  升级到 MySQL 8.0.3 或更高版本后，请更新引用以前 `InnoDB` 信息的所有脚本。

- 已删除与帐户管理相关的以下功能：

  - 使用 [`GRANT`](/13/13.7/13.7.1/13.7.1.6/grant) 创建用户。使用 [`CREATE USER`](/13/13.7/13.7.1/13.7.1.3/create-user) 替代。按照这种做法，`NO_AUTO_CREATE_USER` SQL 模式对于 [`GRANT`](/13/13.7/13.7.1/13.7.1.6/grant) 语句来说无关紧要，因此它也被删除了，并且当选项文件中 `sql_mode` 选项的值阻止 [`mysqld`](/4/4.3/4.3.1/mysqld) 启动时，会将错误写入服务器日志。

  - 使用 [`GRANT`](/13/13.7/13.7.1/13.7.1.6/grant) 修改除权限分配以外的帐户属性。这包括身份验证、SSL和资源限制属性。相反，在创建帐户时使用 [`CREATE USER`](/13/13.7/13.7.1/13.7.1.3/create-user) 建立这些属性，或者在创建帐户后使用 [`ALTER USER`](/13.7/13.7.1/13.7.1.1/alter-user) 修改这些属性。

  - 用于 [`CREATE USER`](/13/13.7/13.7.1/13.7.1.3/create-user) 和 [`GRANT`](/13/13.7/13.7.1/13.7.1.6/grant) 的 `IDENTIFIED BY PASSWORD 'auth_string'`。相反，对于 [`CREATE USER`](/13/13.7/13.7.1/13.7.1.3/create-user) 和 [`GRANT`](/13/13.7/13.7.1/13.7.1.6/grant)，使用 `IDENTIFIED WITH auth_plugin AS 'auth_string'` 替代，其中 'auth_string' 值的格式与命名插件兼容。

    此外，由于 `IDENTIFIED BY PASSWORD` 语法被移除了，因此 `log_builtin_as_IDENTIFIED_BY_PASSWORD` 系统变量是多余的，也被移除了。

  - `PASSWORD()` 函数。此外，`PASSWORD()` 被移除，意味着 [`SET PASSWORD ... = PASSWORD('auth_string')`](/13/13.7/13.7.1/13.7.1.10/set-password) 不再存在。


  - `old_passwords` 系统变量。

- 已删除查询缓存。删除包括以下项目：

  - `FLUSH QUERY CACHE` 和 `RESET QUERY CACHE` 语句。

  - 系统变量：`query_cache_limit`、`query_cache_min_res_unit`、`query_cache_size`、`query_cache_type`、`query_cache_wlock_invalidate`。

  - 状态变量：`Qcache_free_blocks`、`Qcache_free_memory`、`Qcache_hits`、`Qcache_inserts`、`Qcache_lowmem_prunes`、`Qcache_not_cached`、`Qcache_queries_in_cache`、`Qcache_total_blocks`。

  - 线程状态：`hecking privileges on cached query`、`checking query cache for query`、`invalidating query cache entries`、`sending cached result to client`、`storing result in query cache`、`Waiting for query cache lock`。

  - `SQL_CACHE` [`SELECT`](/13/13.2/13.2.10/select) 修饰符。

  这些不推荐使用的查询缓存项仍然不推荐使用，但没有效果；希望在将来的 MySQL 版本中删除它们：

  - `SQL_NO_CACHE` [`SELECT`](/13/13.2/13.2.10/select) 修饰符。

  - `ndb_cache_check_time` 系统变量。

  `have_query_cache`系统变量仍然不推荐使用，并且始终具有 `NO` 值；希望在将来的 MySQL 版本中删除它。

- 数据字典提供有关数据库对象的信息，因此服务器不再检查数据目录中的目录名以查找数据库。因此，`--ignore db dir` 选项和 `ignore_db_dirs` 系统变量是无关的，将被删除。

- DDL 日志（也称为元数据日志）已被删除。从 MySQL 8.0.3 开始，此功能由数据字典 `innodb_ddl_log` 表处理。参阅[`查看 DDL 日志`](/13/13.1/13.1.1/atomic-ddl?id=查看-DDL-日志)。

- `tx_isolation` 和 `tx_read_only` 系统变量被移除。使用 `transaction_isolation` 和 `transaction_read_only` 替代。

- 因为 `.frm` 文件已过时，`sync_frm` 系统变量已被删除。

- `secure_auth` 系统变量和 `--secure-auth` 客户端选项已被移除。[`mysql_options()`](/5/5.4/5.4.51/mysql-options) C API 函数的 `MYSQL_SECURE_AUTH` 选项已被移除。

- `multi_range_count` 系统变量被移除。

- `log_warnings` 系统变量和 `--log-warnings` 服务器选项被移除。使用 [`log_error_verbosity`](/5/5.1/5.1.8/server-system-variables) 系统变量替代。

- [`sql_log_bin`](/17/17.1/17.1.6/17.1.6.4/replication-options-binary-log) 系统变量的全局作用域已移除。`sql_log_bin` 仅具有会话作用域，并且应调整依赖于访问 `@GLOBAL.sql_log_bin` 的应用程序。

- `metadata_locks_cache_size` 和 `metadata_locks_hash_instances` 系统变量已被移除。

- 未使用的 `date_format`、`datetime_format`、`time_format` 和 `max_tmp_tables` 系统变量已被移除。

- 这些不推荐使用的兼容SQL模式被删除：`DB2`、`MAXDB`、`MSSQL`、`MYSQL323`、`MYSQL40`、`ORACLE`、`POSTGRESQL`、`NO_FIELD_OPTIONS`、`NO_KEY_OPTIONS`、`NO_TABLE_OPTIONS`。它们不能再分配给 `sql_mode` 系统变量或用作 [**mysqldump**](/4/4.5/4.5.4/mysqldump) [`--compatible`](/4/4.5/4.5.4/mysqldump) 选项的允许值。

  删除 `MAXDB` 意味着 [`CREATE TABLE`](/13/13.1/13.1.20/create-table) 或 [`ALTER TABLE`](/13/13.1/13.1.9/alter-table) 的 [`TIMESTAMP`](/11/11.2/11.2.2/datetime) 数据类型被视为 [`TIMESTAMP`](/11/11.2/11.2.2/datetime)，而不再被视为 [`DATETIME`](/11/11.2/11.2.2/datetime)。

- 已删除 `GROUP BY` 子句中不推荐使用的 `ASC` 或 `DESC` 限定符。以前依赖 `GROUP BY` 排序的查询可能会产生不同于以前 MySQL 版本的结果。要生成给定的排序顺序，请提供 `ORDER BY` 子句。

- [`EXPLAIN`](/13/13.8/13.8.2/explain) 语句的 `EXTENDED` 和 `PARTITIONS` 关键字已被删除。这些关键字是不必要的，因为它们的效果始终处于启用状态。

- 这些加密相关的项已被移除：

  - `ENCODE()` 和 `DECODE()` 函数。

  - `ENCRYPT()` 函数。

  - `DES_ENCRYPT()` 和 `DES_DECRYPT()` 函数，`--des-key-file` 选项，`have_crypt` 系统变量，[`FLUSH`](/13/13.7/13.7.8/13.7.8.3/flush) 语句的 `DES_KEY_FILE` 选项以及 `HAVE_CRYPT` **CMake** 选项。

    替代的加密函数有：对于 `ENCRYPT()`，考虑使用 [`SHA2()`](/12/12.14/encryption-functions) 替代用于单向哈希。对其他的函数，考虑使用 [`AES_ENCRYPT()`](/12/12.14/encryption-functions) 和 [`AES_DECRYPT()`](/12/12.14/encryption-functions) 替代。

- 在 MySQL 5.7 中，不推荐使用多个名称下的多个可用空间函数，以使空间函数名称空间更加一致，目标是，如果每个空间函数名称执行精确操作，则以 `ST_` 开头；如果每个空间函数名称执行基于最小边界矩形的操作，则以 `MBR` 开头。在 MySQL 8.0 中，删除了不推荐使用的函数，只保留了相应的 `ST_` 和 `MBR` 函数：

  - 移除这些函数以支持 `MBR` 名称：Contains()、Disjoint()、Equals()、Intersects()、Overlaps()、Within()。

  - 移除这些函数以支持 `ST_` 名称：Area()、AsBinary()、AsText()、AsWKB()、AsWKT()、Buffer()、Centroid()、ConvexHull()、Crosses()、Dimension()、Distance()、EndPoint()、Envelope()、ExteriorRing()、GeomCollFromText()、GeomCollFromWKB()、GeomFromText()、GeomFromWKB()、GeometryCollectionFromText()、GeometryCollectionFromWKB()、GeometryFromText()、GeometryFromWKB()、GeometryN()、GeometryType()、InteriorRingN()、IsClosed()、IsEmpty()、IsSimple()、LineFromText()、LineFromWKB()、LineStringFromText()、LineStringFromWKB()、MLineFromText()、MLineFromWKB()、MPointFromText()、MPointFromWKB()、MPolyFromText()、MPolyFromWKB()、MultiLineStringFromText()、MultiLineStringFromWKB()、MultiPointFromText()、MultiPointFromWKB()、MultiPolygonFromText()、MultiPolygonFromWKB()、NumGeometries()、NumInteriorRings()、NumPoints()、PointFromText()、PointFromWKB()、PointN()、PolyFromText()、PolyFromWKB()、PolygonFromText()、PolygonFromWKB()、SRID()、StartPoint()、Touches()、X()、Y()。

  - `GLength()` 被移除，以支持 [`ST_Length()`](/12/12.17/12.17.7/12.17.7.3/gis-linestring-property-functions)

- [章节 12.17.4，“从WKB值创建几何值的函数”](/12/12.17/12.17.4/gis-wkb-functions)中描述的函数以前接受 `WKB` 字符串或几何参数。不再允许几何参数，并会产生错误。有关从使用几何参数迁移查询的指导原则，请参见该部分。

- 解析器不再将 SQL 语句中的 `\N` 视为 `NULL` 同义词。使用 `NULL` 替代。

  此更改不会影响使用 [`LOAD DATA`](/13/13.2/13.2.7/load-data) 或 [`SELECT ... INTO OUTFILE`](/13/13.2/13.2.10/13.2.10.1/select-into) 执行的文本文件导入或导出操作件，对于该文件，`NULL` 继续由 `\N` 表示。参阅[章节 13.2.7，“LOAD DATA 语句”](/13/13.2/13.2.7/load-data)。

- `PROCEDURE ANALYSE()` 语法被移除。

- 客户端的 `--ssl` 和 `--ssl-verify-server-cert` 选项已被移除。使用 [`--ssl-mode=REQUIRED`](/4/4.2/4.2.3/connection-options) 替代 `--ssl=1` 或 `--enable-ssl`。使用 [` --ssl-mode=DISABLED`](/4/4.2/4.2.3/connection-options) 替代 `--ssl=0,`、`--skip-ssl` 或 ` --disable-ssl`。使用 [`--ssl-mode=VERIFY_IDENTITY`](/4/4.2/4.2.3/connection-options) 替代 `--ssl-verify-server-cert` 选项。（服务端 `--ssl` 选项仍然有效，但从 MySQL 8.0.26 起不再推荐，并计划在 MySQL 未来版本中移除。）

  对 C API， mysql_options() 的 `MYSQL_OPT_SSL_ENFORCE` 和 `MYSQL_OPT_SSL_VERIFY_SERVER_CERT` 选项，对应于客户端的 `--ssl` 和 `--ssl-verify-server-cert` 选项已被移除。使用 `MYSQL_OPT_SSL_MODE` 的选项值 `SSL_MODE_REQUIRED` 或 `SSL_MODE_VERIFY_IDENTITY` 来替代。

- 服务器选项 `--temp-pool` 被移除。

- 系统变量 `ignore_builtin_innodb` 被移除。

- 服务器不再通过添加 `#mysql50#` 前缀将包含特殊字符的 MySQL 5.1 之前的数据库名称转换为 5.1 格式。由于不再执行这些转换，[**mysqlcheck**](/4/4.5/4.5.3/mysqlcheck) 的 `--fix-db-names` 和 `--fix-table-names` 选项、[`ALTER DATABASE`](/13/13.1/13.1.2/alter-database) 语句的 `UPGRADE DATA DIRECTORY NAME` 子句以及 `Com_alter_db_upgrade` 状态变量将被移除。

  只支持从一个主要版本升级到另一个主要版本（例如，5.0 到5.1，或 5.1 到 5.5），因此应该不需要将旧的 5.0 数据库名称转换为 MySQL 的当前版本。作为一种解决方法，请先将 MySQL 5.0 安装升级到 MySQL 5.1，然后再升级到最新版本。

- **mysql_install_db** 程序已从 MySQL 发行版中删除。替代为：数据目录初始化应该通过调用 [**mysqld**](/4/4.3/4.3.1/mysqld)，带 [`--initialize`](/5/5.1/5.1.7/server-options) 或 [`--initialize unsecure`](/5/5.1/5.1.7/server-options) 选项来执行。此外，`mysql_install_db` 使用的 [**mysqld**](/4/4.3/4.3.1/mysqld) 的选项 `--bootstrap` 被移除，用于 **mysql_install_db** 控制安装位置的 `INSTALL_SCRIPTDIR` `CMake` 选项也被删除。

- 通用分区处理程序已从 MySQL server 中删除。为了支持给定表的分区，用于该表的存储引擎现在必须提供自己的（“本机”）分区处理程序。MySQL Server 删除了`--partition` 和 `--skip partition` 选项，与分区相关的条目不再显示在 [`SHOW PLUGINS`](/13/13.7/13.7.7/13.7.7.25/show-plugins) 的输出或 [`INFORMATION_SCHEMA.PLUGINS`](/26/26.3/26.3.22/information-schema-plugins-table) 表中。

  目前有两个 MySQL 存储引擎提供本机分区支持：[`InnoDB`](/15/innodb-storage-engine) 和 [`NDB`](/23/mysql-cluster)。其中，MySQL 8.0仅支持 `InnoDB`。任何使用任何其他存储引擎在 MySQL 8.0 中创建分区表的尝试都会失败。

  **升级的后果**。不支持使用 `InnoDB` 以外的存储引擎（如 [`MyISAM`](/16/16.2/myisam-storage-engine)）将分区表从 MySQL 5.7（或更早版本）直接升级到 MySQL 8.0。处理此类表格有两个选项：
  
    - 使用 [`ALTER TABLE ... REMOVE PARTITIONING`](/13/13.1/13.1.9/13.1.9.1/alter-table-partition-operations) 移除表分区。

    - 通过 [`ALTER TABLE ... ENGINE=INNODB`](/13/13.1/13.1.9/alter-table)，将用于表的存储引擎更改为 `InnoDB`。

  在将服务器升级到 MySQL 8.0 之前，必须对每个分区的非 `InnoDB` 表执行刚才列出的两个操作中的至少一个。否则，升级后无法使用此表。

  由于表创建语句会导致使用存储引擎而不支持分区的分区表现在失败并出现错误（`ER_CHECK_NOT_IMPLEMENTED`），你必须确保转储文件（如 [**mysqldump**](/4/4.5/4.5.4/mysqldump) 编写的转储文件）中的任何语句（如您希望导入到创建分区表的 MySQL 8.0 server 的旧版本 MySQL 中的语句）也不会指定没有本机分区处理程序的存储引擎，如 MyISAM。你可以通过执行以下任一操作来完成此操作：

    - 从 `CREATE TABLE` 语句中删除对分区的任何引用，这些语句使用除 `InnoDB` 之外的 `STORAGE ENGINE` 选项值。

    - 将存储引擎指定为 `InnoDB`，或者默认情况下允许将 `InnoDB` 用作表的存储引擎。

  更多信息，参阅[章节 24.6.2，“与存储引擎相关的分区限制”](/24/24.6/24.6.2/partitioning-limitations-storage-engines)。

- `INFORMATION_SCHEMA` 不再维护系统和状态变量信息。这些表被移除：`GLOBAL_VARIABLES`、`SESSION_VARIABLES`、`GLOBAL_STATUS`、`SESSION_STATUS`。使用相应的性能模式表替代。参阅[章节 27.12.14，“性能模式系统变量表”](/27/27.12/27.12.14/performance-schema-system-variable-tables)及[章节 27.12.15，“性能模式状态变量表”](/27/27.12/27.12.14/performance-schema-status-variable-tables)。进一步，`show_compatibility_56` 系统变量已被移除。它用于过渡期，在此期间，`INFORMATION_SCHEMA` 表中的系统和状态变量信息被移动到性能模式表中，它不再需要。这些状态变量被移除：`Slave_heartbeat_period`、`Slave_last_heartbeat`、`Slave_received_heartbeats`、`Slave_retried_transactions`、`Slave_running`。他们提供的信息可以在性能模式表中找到，参阅[性能模式变量表迁移](/25/25.20/performance-schema-variable-table-migration)。

- 性能模式 `setup_timers` 表已删除，[`performance_timers`](/27/27.12/27.12.21/27.12.21.4/performance-schema-performance-timers-table) 表中的 `TICK` 行也已删除。

- 内嵌服务器的库 `libmysqld` 被移除，连同一起的有：

  - [`mysql_options()`](/5/5.4/5.4.51/mysql-options) `MYSQL_OPT_GUESS_CONNECTION`、`MYSQL_OPT_USE_EMBEDDED_CONNECTION`、`MYSQL_OPT_USE_REMOTE_CONNECTION` 和 `MYSQL_SET_CLIENT_IP` 选项

  - [**mysql_config**](/4/4.7/4.7.1/mysql-config) `--libmysqld-libs`、`--embedded-libs` 和 `--embedded` 选项

  - **CMake** `WITH_EMBEDDED_SERVER`、`WITH_EMBEDDED_SHARED_LIBRARY` 和 `INSTALL_SECURE_FILE_PRIV_EMBEDDEDDIR` 选项

  - （未归档的）[**mysql**]*(/4/4.5/4.5.1/mysql) `--server-arg` 选项

  - **mysqltest** `--embedded-server`、`--server-arg` 和 `--server-file`

  - **mysqltest_embedded** 和 **mysql_client_test_embedded** 测试程序

- **mysql_plugin** 实用组件已被删除。替代方法包括在服务器启动时使用 [`--plugin load`](/5/5.1/5.1.7/server-options) 或 [`--plugin load add`](/5/5.1/5.1.7/server-options) 选项加载插件，或者在运行时使用 [`INSTALL PLUGIN`](/13/13.7/13.7.4/13.7.4.4/install-plugin) 语句加载插件。

- **resolveip** 实用组件已移除。可以改用 `nslookup`、`host` 或 `dig`。

- **resolve_stack_dump** 实用组件已移除。来自官方 MySQL 构建的堆栈跟踪始终是符号化的，因此不需要使用 `resolve_stack_dump`。

- 以下服务器错误代码未使用，已被删除。应更新专门针对这些错误进行测试的应用程序。

  ```bash
  ER_BINLOG_READ_EVENT_CHECKSUM_FAILURE
  ER_BINLOG_ROW_RBR_TO_SBR
  ER_BINLOG_ROW_WRONG_TABLE_DEF
  ER_CANT_ACTIVATE_LOG
  ER_CANT_CHANGE_GTID_NEXT_IN_TRANSACTION
  ER_CANT_CREATE_FEDERATED_TABLE
  ER_CANT_CREATE_SROUTINE
  ER_CANT_DELETE_FILE
  ER_CANT_GET_WD
  ER_CANT_SET_GTID_PURGED_WHEN_GTID_MODE_IS_OFF
  ER_CANT_SET_WD
  ER_CANT_WRITE_LOCK_LOG_TABLE
  ER_CREATE_DB_WITH_READ_LOCK
  ER_CYCLIC_REFERENCE
  ER_DB_DROP_DELETE
  ER_DELAYED_NOT_SUPPORTED
  ER_DIFF_GROUPS_PROC
  ER_DISK_FULL
  ER_DROP_DB_WITH_READ_LOCK
  ER_DROP_USER
  ER_DUMP_NOT_IMPLEMENTED
  ER_ERROR_DURING_CHECKPOINT
  ER_ERROR_ON_CLOSE
  ER_EVENTS_DB_ERROR
  ER_EVENT_CANNOT_DELETE
  ER_EVENT_CANT_ALTER
  ER_EVENT_COMPILE_ERROR
  ER_EVENT_DATA_TOO_LONG
  ER_EVENT_DROP_FAILED
  ER_EVENT_MODIFY_QUEUE_ERROR
  ER_EVENT_NEITHER_M_EXPR_NOR_M_AT
  ER_EVENT_OPEN_TABLE_FAILED
  ER_EVENT_STORE_FAILED
  ER_EXEC_STMT_WITH_OPEN_CURSOR
  ER_FAILED_ROUTINE_BREAK_BINLOG
  ER_FLUSH_MASTER_BINLOG_CLOSED
  ER_FORM_NOT_FOUND
  ER_FOUND_GTID_EVENT_WHEN_GTID_MODE_IS_OFF__UNUSED
  ER_FRM_UNKNOWN_TYPE
  ER_GOT_SIGNAL
  ER_GRANT_PLUGIN_USER_EXISTS
  ER_GTID_MODE_REQUIRES_BINLOG
  ER_GTID_NEXT_IS_NOT_IN_GTID_NEXT_LIST
  ER_HASHCHK
  ER_INDEX_REBUILD
  ER_INNODB_NO_FT_USES_PARSER
  ER_LIST_OF_FIELDS_ONLY_IN_HASH_ERROR
  ER_LOAD_DATA_INVALID_COLUMN_UNUSED
  ER_LOGGING_PROHIBIT_CHANGING_OF
  ER_MALFORMED_DEFINER
  ER_MASTER_KEY_ROTATION_ERROR_BY_SE
  ER_NDB_CANT_SWITCH_BINLOG_FORMAT
  ER_NEVER_USED
  ER_NISAMCHK
  ER_NO_CONST_EXPR_IN_RANGE_OR_LIST_ERROR
  ER_NO_FILE_MAPPING
  ER_NO_GROUP_FOR_PROC
  ER_NO_RAID_COMPILED
  ER_NO_SUCH_KEY_VALUE
  ER_NO_SUCH_PARTITION__UNUSED
  ER_OBSOLETE_CANNOT_LOAD_FROM_TABLE
  ER_OBSOLETE_COL_COUNT_DOESNT_MATCH_CORRUPTED
  ER_ORDER_WITH_PROC
  ER_PARTITION_SUBPARTITION_ERROR
  ER_PARTITION_SUBPART_MIX_ERROR
  ER_PART_STATE_ERROR
  ER_PASSWD_LENGTH
  ER_QUERY_ON_MASTER
  ER_RBR_NOT_AVAILABLE
  ER_SKIPPING_LOGGED_TRANSACTION
  ER_SLAVE_CHANNEL_DELETE
  ER_SLAVE_MULTIPLE_CHANNELS_HOST_PORT
  ER_SLAVE_MUST_STOP
  ER_SLAVE_WAS_NOT_RUNNING
  ER_SLAVE_WAS_RUNNING
  ER_SP_GOTO_IN_HNDLR
  ER_SP_PROC_TABLE_CORRUPT
  ER_SQL_MODE_NO_EFFECT
  ER_SR_INVALID_CREATION_CTX
  ER_TABLE_NEEDS_UPG_PART
  ER_TOO_MUCH_AUTO_TIMESTAMP_COLS
  ER_UNEXPECTED_EOF
  ER_UNION_TABLES_IN_DIFFERENT_DIR
  ER_UNSUPPORTED_BY_REPLICATION_THREAD
  ER_UNUSED1
  ER_UNUSED2
  ER_UNUSED3
  ER_UNUSED4
  ER_UNUSED5
  ER_UNUSED6
  ER_VIEW_SELECT_DERIVED_UNUSED
  ER_WRONG_MAGIC
  ER_WSAS_FAILED
  ```

- 不推荐的 `INFORMATION_SCHEMA` `INNODB_LOCKS` 和 `INNODB_LOCK_WAITS` 已被移除。使用性能模式 [`data_locks`](/27/27.12/27.12.13/27.12.13.1/performance-schema-data-locks-table) 和 [`data_lock_waits`](/27/27.12/27.12.13/27.12.13.2/performance-schema-data-lock-waits-table) 替代。

  > **注意** 在 MySQL 5.7 中，`INNODB_LOCKS` 表中的 `LOCK_TABLE` 列以及 `sys` 模式 [`INNODB_LOCK_waits`](/28/28.4/28.4.3/28.4.3.9/sys-innodb-lock-waits) 和 [`x$INNODB_LOCK_waits`](/28/28.4/28.4.3/28.4.3.9/sys-innodb-lock-waits) 视图中的 [`data_locks`](/27/27.12/27.12.13/27.12.13.1/performance-schema-data-locks-table)` 列包含组合模式/表名值。在 MySQL 8.0 中，`data_locks` 表和 `sys` 模式视图包含单独的模式名字和表名列。参阅[章节 28.4.3.9，“innodb_lock_waits 和 x$innodb_lock_waits 视图”](/28/28.4/28.4.3/28.4.3.9/sys-innodb-lock-waits)。

- `InnoDB` 不再支持压缩的临时表。当 [`innodb_strict_mode`](/15/15.14/innodb-parameters) 启用（默认）时，如果指定了 `ROW_FORMAT=COMPRESSED` 或 `KEY_BLOCK_SIZE`，则创建临时表将返回错误。如果 [`innodb_strict_mode`](/15/15.14/innodb-parameters) 禁用时，将发出警告，并使用非压缩行格式创建临时表。

- 在 MySQL 数据目录之外创建表空间数据文件时，`InnoDB` 不再创建 `.isl` 文件（`InnoDB` 符号链接文件）。[`innodb_directories`](/15/15.14/innodb-parameters) 选项现在支持定位在数据目录之外创建的表空间文件。

  通过此更改，不再支持在服务器脱机时通过手动修改 `.isl` 文件来移动远程表空间。[`innodb_directories`](/15/15.14/innodb-parameters) 选项现在支持移动远程表空间文件。参阅[章节 15.6.3.6，“当服务器脱机时移动表空间文件”](/15/15.6/15.6.3/15.6.3.6/innodb-moving-data-files-offline)。

- 以下的 `InnoDB` 文件格式变量已被移除：

  - innodb_file_format

  - innodb_file_format_check

  - innodb_file_format_max

  - innodb_large_prefix

  文件格式变量对于创建与 MySQL 5.1 中早期版本的 `InnoDB` 兼容的表是必需的。现在 MySQL 5.1 已经到了其产品生命周期的末尾，不再需要这些选项。

  `FILE_FORMAT` 列已从 `INNODB_TABLES` 和 `INNODB_TABLESPACES` 信息模式表中移除。

- `innodb_support_xa` 系统变量已被移除，它支持在 XA 事务中的两段提交。`InnoDB` 支持 XA 事务中的两段提交总是启用的。

- 对 DTrace 的支持已移除。

- `JSON_APPEND()` 函数已移除。使用 [`JSON_ARRAY_APPEND()`](/12/12.18/12.18.4/json-modification-functions) 替代。

- MySQL 8.0.13 中删除了在共享 `InnoDB` 表空间中放置表分区的支持。共享表空间包括 `InnoDB` 系统表空间和通用表空间。有关在共享表空间中标识分区并将其移动到每个表的文件表空间的信息，请参阅[章节 2.11.5，“准备用于升级的安装”](/2/2.11/2.11.5/upgrade-prerequisites)。

- MySQL 8.0.13 不推荐在语句中设置用户变量而非 [`SET`](/13/13.7/13.7.6/13.7.6.1/set-variable)。此功能可能会在 MySQL 9.0 中删除。

- `--ndb` [**perror**](/4/4.8/4.8.2/perror) 选项已被移除。使用 [**ndb_perror**](/23/23.5/23.5.16/mysql-cluster-programs-ndb-perror) 实用组件替代。

- `innodb_undo_logs` 变量已移除。[`innodb_rollback_segments`](/15/15.14/innodb-parameters) 变量执行相同的功能，应改用它。

- `Innodb_available_undo_logs` 状态变量已移除。每个表空间的可用回滚段数可以使用 `SHOW VARIABLES LIKE 'innodb_rollback_segments'` 获取。

- 从 MySQL 8.0.14 开始，以前不推荐使用的 [`innodb_undo_tablespaces`](/15/15.14/innodb-parameters) 变量不再是可配置。更多信息，参阅[章节 15.6.3.4，“撤销表空间”](/15/15.6/15.6.3/15.6.3.4/innodb-undo-tablespaces)。

- 支持语句 `ALTER TABLE ... UPGRADE PARTITIONING` 已被移除。

- 从 MySQL 8.0.16 开始，已删除对 [`internal_tmp_disk_storage_engine`](/5/5.1/5.1.8/server-system-variables) 系统变量的支持；磁盘上的内部临时表现在总是使用 [`InnoDB`](/15/innodb-storage-engine) 存储引擎。更多信息，参阅[磁盘上内部临时表的存储引擎](/8/8.4/8.4.4/internal-temporary-tables?id=磁盘上内部临时表的存储引擎)。

- [`DISABLE_SHARED`](/2/2.9/2.9.7/source-configuration-options) **CMake** 选项不再使用，已被移除。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/mysql-nutshell.html)
