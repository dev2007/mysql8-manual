# 2.9.7 MySQL 源配置选项

**CMake** 程序提供了对如何配置 MySQL 源分发的大量控制。通常，可以使用 **CMake** 命令行上的选项执行此操作。有关 **CMake** 支持的选项的信息，请在顶级源目录中运行以下任一命令：

```bash
cmake . -LH
ccmake .
```

还可以使用某些环境变量影响 **CMake**。参阅[章节 4.9，“环境变量”](/4/4.9/environment-variables.html)。

对于布尔选项，该值可以指定为 `1` 或 `ON` 以启用该选项，或指定为 `0` 或 `OFF` 以禁用该选项。

许多选项配置可在服务器启动时覆盖的编译时默认值。例如，可以在服务器启动时使用 [mysqld](/4/4.3/4.3.1/mysqld.html) 的 [--basedir](/5/5.1/5.1.8/server-system-variables.html)、[--PORT](/5/5.1/5.1.7/server-options.html) 和 [--socket](/5/5.1/5.1.7/server-options.html) 选项更改配置默认安装基础目录位置、TCP/IP 端口号和 UNIX 套接字文件的 `CMAKE_INSTALL_PPREFIX`、`MYSQL_TCP_PORT` 和 `MYSQL_UNIX_ADDR` 选项。在适用的情况下，配置选项描述指示相应的 [mysqld](/4/4.3/4.3.1/mysqld.html) 启动选项。

以下部分提供了有关 **CMake** 选项的更多信息。

[[toc]]

## CMake 选项参考

下表显示了可用的 **CMake** 选项。在默认列中，`PREFIX` 代表 `CMAKE_INSTALL_PPREFIX` 选项的值，该选项指定安装基础目录。此值用作多个安装子目录的父位置。

**表 2.14 MySQL 源配置选项参考（CMake）**

|格式|描述|默认|引入|移除|
|--|--|--|--|--|--|
|`ADD_GDB_INDEX`|是否启用在二进制文件中生成 .gdb_index 节||8.0.18||
|`BUILD_CONFIG`|使用与官方版本相同的构建选项||||
|`BUNDLE_RUNTIME_LIBRARIES`|将运行库与用于 Windows 的服务器 MSI 和 Zip 包捆绑|`OFF`|||
|`CMAKE_BUILD_TYPE`|要生成的生成类型|`RelWithDebInfo`|||
|`CMAKE_CXX_FLAGS`|C++ 编译器标志||||
|`CMAKE_C_FLAGS`|C 编译器标志||||
|`CMAKE_INSTALL_PREFIX`|安装基础目录|`/usr/local/mysql`|||
|`COMPILATION_COMMENT`|关于编译环境的备注||||
|`COMPILATION_COMMENT_SERVER`|关于 mysqld 使用的编译环境的评论||8.0.14||
|`COMPRESS_DEBUG_SECTIONS`|压缩二进制可执行文件的调试部分|`OFF`|8.0.22||
|`CPACK_MONOLITHIC_INSTALL`|包生成是否生成单个文件|`OFF`|||
|`DEFAULT_CHARSET`|默认服务器字符集|`utf8mb4`|||
|`DEFAULT_COLLATION`|默认服务器排序规则|`utf8mb4_0900_ai_ci`|||
|`DISABLE_PSI_COND`|排除性能架构条件检测|`OFF`|||
|`DISABLE_PSI_DATA_LOCK`|排除性能架构数据锁检测|`OFF`|||
|`DISABLE_PSI_ERROR`|排除性能架构服务器错误检测|`OFF`|||
|`DISABLE_PSI_FILE`|排除性能架构文件检测|`OFF`|||
|`DISABLE_PSI_IDLE`|排除性能架构空闲检测|`OFF`|||
|`DISABLE_PSI_MEMORY`|排除性能架构内存检测|`OFF`|||
|`DISABLE_PSI_METADATA`|排除性能架构元数据检测|`OFF`|||
|`DISABLE_PSI_MUTEX`|排除性能架构互斥检测|`OFF`|||
|`DISABLE_PSI_PS`|排除性能架构准备语句|`OFF`|||
|`DISABLE_PSI_RWLOCK`|排除性能架构rwlock检测|`OFF`|||
|`DISABLE_PSI_SOCKET`|排除性能架构套接字检测|`OFF`|||
|`DISABLE_PSI_SP`|排除性能架构存储程序检测|`OFF`|||
|`DISABLE_PSI_STAGE`|排除性能架构阶段检测|`OFF`|||
|`DISABLE_PSI_STATEMENT`|排除性能架构语句检测|`OFF`|||
|`DISABLE_PSI_STATEMENT_DIGEST`|排除性能架构语句 _digest 检测|`OFF`|||
|`DISABLE_PSI_TABLE`|排除性能架构表检测|`OFF`|||
|`DISABLE_PSI_THREAD`|排除性能架构线程检测|`OFF`|||
|`DISABLE_PSI_TRANSACTION`|排除性能架构事务检测|`OFF`|||
|`DISABLE_SHARED`|不构建共享库，编译位置相关代码|`OFF`||8.0.18|
|`DOWNLOAD_BOOST`|是否下载 Boost 库|`OFF`|||
|`DOWNLOAD_BOOST_TIMEOUT`|下载 Boost 库超时（秒）|`600`|||
|`ENABLED_LOCAL_INFILE`|是否为 LOAD DATA 启用 LOCAL|`OFF`|||
|`ENABLED_PROFILING`|是否启用查询分析代码|`ON`|||
|`ENABLE_DOWNLOADS`|是否下载可选文件|`OFF`||8.0.26|
|`ENABLE_EXPERIMENTAL_SYSVARS`|是否启用实验 InnoDB 系统变量|`OFF`|||
|`ENABLE_GCOV`|是否包括 gcov 支持||||
|`ENABLE_GPROF`|启用 gprof（仅限优化的 Linux 版本）|`OFF`|||
|`FORCE_INSOURCE_BUILD`|是否强制源内生成|`OFF`|	8.0.14||
|`FORCE_UNSUPPORTED_COMPILER`|是否允许不支持的编译器|`OFF`|||
|`FPROFILE_GENERATE`|是否生成配置文件引导的优化数据|`OFF`|8.0.19||
|`FPROFILE_USE`|是否使用配置文件引导的优化数据|`OFF`|8.0.19||
|`HAVE_PSI_MEMORY_INTERFACE`|为过度对齐类型的动态存储中使用的内存分配函数启用性能架构内存跟踪模块|`OFF`|8.0.26||
|`IGNORE_AIO_CHECK`|使用 `-DBUILD_CONFIG=mysql_release`，忽略 libaio 检查|`OFF`|||
|`INSTALL_BINDIR`|用户可执行文件目录|`PREFIX/bin`|||
|`INSTALL_DOCDIR`|文档目录|`PREFIX/docs`|||		
|`INSTALL_DOCREADMEDIR`|README 文件目录|`PREFIX`|||		
|`INSTALL_INCLUDEDIR`|头文件目录 |`PREFIX/include`|||		
|`INSTALL_INFODIR`|Info 文件目录|`PREFIX/docs`|||		
|`INSTALL_LAYOUT`|选择预定义的安装结构|`STANDALONE`|||		
|`INSTALL_LIBDIR`|库文件目录|`PREFIX/lib`|||		
|`INSTALL_MANDIR`|手册页目录|`PREFIX/man`|||		
|`INSTALL_MYSQLKEYRINGDIR`|`keyring_file` 插件数据文件目录|平台特定|||		
|`INSTALL_MYSQLSHAREDIR`|共享数据目录|`PREFIX/share`|||		
|`INSTALL_MYSQLTESTDIR`|mysql-test 目录|`PREFIX/mysql-test`|||		
|`INSTALL_PKGCONFIGDIR`|mysqlclient.pc pkg-config 文件目录|`INSTALL_LIBDIR/pkgconfig`|||		
|`INSTALL_PLUGINDIR`|插件目录|`PREFIX/lib/plugin`|||
|`INSTALL_PRIV_LIBDIR`|安装的私有库目录||8.0.18	||
|`INSTALL_SBINDIR`|服务器执行目录|`PREFIX/bin`|||
|`INSTALL_SECURE_FILE_PRIVDIR`|secure_file_priv 默认值|平台特定|||		
|`INSTALL_SHAREDIR`|aclocal/mysql.m4 安装目录|`PREFIX/share`|||
|`INSTALL_STATIC_LIBRARIES`|是否安装静态库|`ON`|||		
|`INSTALL_SUPPORTFILESDIR`|扩展支持文件目录|`PREFIX/support-files`|||
|`LINK_RANDOMIZE`|是否随机化mysqld二进制文件中的符号顺序|`OFF`|||		
|`LINK_RANDOMIZE_SEED`|LINK_RANDOMIZE 选项的种子值|`mysql`|||		
|`MAX_INDEXES`|每个表的最大索引|`64`|||		
|`MEMCACHED_HOME`|memcached 的相对路径|`[none]`||8.0.23|
|`MUTEX_TYPE`|InnoDB 互斥类型|`event`|||		
|`MYSQLX_TCP_PORT`|X 插件使用的 TCP/IP 端口数|`33060`|||
|`MYSQLX_UNIX_ADDR`|X 插件使用的 Unix 套接字文件|`/tmp/mysqlx.sock`|||
|`MYSQL_DATADIR`|数据目录||||
|`MYSQL_MAINTAINER_MODE`|是否启用 MySQL 维护者特定的开发环境|`OFF`|||
|`MYSQL_PROJECT_NAME`|Windows/macOS 项目名字|`MySQL`|||
|`MYSQL_TCP_PORT`|TCP/IP 端口数|`3306`|||
|`MYSQL_UNIX_ADDR`|Unix 套接字文件|`/tmp/mysql.sock`|||
|`NDB_UTILS_LINK_DYNAMIC`|使 NDB 工具动态链接到 ndbclient||8.0.22||
|`ODBC_INCLUDES`|ODBC includes 目录||||
|`ODBC_LIB_DIR`|ODBC 库目录||||
|`OPTIMIZER_TRACE`|是否支持优化器跟踪||||
|`REPRODUCIBLE_BUILD`|特别注意创建独立于生成位置和时间的生成结果||||
|`SHOW_SUPPRESSED_COMPILER_WARNING`|是否显示被抑制的编译器警告，并且不使用 -Werror 失败|`OFF`|8.0.30||
|`SYSCONFDIR`|选项文件目录||||
|`SYSTEMD_PID_DIR`|systemd 下的 PID 文件目录|`/var/run/mysqld`|||
|`SYSTEMD_SERVICE_NAME`|systemd 下的 MySQL 服务名字|`mysqld`|||
|`TMPDIR`|tmpdir 默认值||||
|`USE_LD_GOLD`|是否使用 GNU 黄金链接器|`ON`|||
|`USE_LD_LLD`|是否使用 llvm lld 链接器|`ON`|8.0.16||
|`WIN_DEBUG_NO_INLINE`|是否禁用函数内联|`OFF`|||	
|`WITHOUT_SERVER`|不编译服务器|`OFF`|||		
|`WITHOUT_xxx_STORAGE_ENGINE`|从编译中排除存储引擎 xxx||||
|`WITH_ANT`|构建 GCS Java 包装器的 Ant 路径||||			
|`WITH_ASAN`|启用 AddressSanitizer|`OFF`|||		
|`WITH_ASAN_SCOPE`|启用 AddressSanitizer -fsanitize-address-use-after-scope Clang 标志|`OFF`|||
|`WITH_AUTHENTICATION_CLIENT_PLUGINS`|如果构建了任何相应的服务器身份验证插件，则自动启用||8.0.26||
|`WITH_AUTHENTICATION_LDAP`|如果无法生成 LDAP 认证插件，是否报告错误|`OFF`|||		
|`WITH_AUTHENTICATION_PAM`|构造 PAM 认证插件|`OFF`|||
|`WITH_AWS_SDK`|Amazon Web 服务软件开发工具包位置||||
|`WITH_BOOST`|Boost 库源码位置||||	
|`WITH_BUILD_ID`|在 Linux 系统，生成一个唯一的编译 ID|`ON`|8.0.31||
|`WITH_BUNDLED_LIBEVENT`|在构建 ndbmemcache 时使用捆绑的 libevent；废弃|`ON`|8.0.23||
|`WITH_BUNDLED_MEMCACHED`|在构建 ndbmemcache 时使用捆绑的 memcached；废弃|`ON`|8.0.23||
|`WITH_CLASSPATH`|构建 MySQL Cluster Connector for Java 时要使用的 Classpath。默认值为空字符串。||||			
|`WITH_CLIENT_PROTOCOL_TRACING`|构建客户端协议跟踪框架|`ON`|||		
|`WITH_CURL`|curl 库位置||||	
|`WITH_DEBUG`|是否包含调试支持|`OFF`|||		
|`WITH_DEFAULT_COMPILER_OPTIONS`|是否使用默认编译选项|`ON`|||		
|`WITH_DEFAULT_FEATURE_SET`|是否使用默认特性集|`ON`|8.0.22`||
|`WITH_EDITLINE`|使用哪个 libedit/editline 库|`bundled`|||
|`WITH_ERROR_INSERT`|在NDB存储引擎中启用错误注入。不应用于生成用于生产的二进制文件。|`OFF`|||		
|`WITH_FIDO`|FIDO 库支持的类型|`bundled`|8.0.27|||
|`WITH_GMOCK`|googlemock 分发的位置||8.0.26||
|`WITH_ICU`|ICU 支持的类型|`bundled`|||
|`WITH_INNODB_EXTRA_DEBUG`|是否为 InnoDB 包含额外的调试支持|`OFF`|||		
|`WITH_INNODB_MEMCACHED`|是否生成 memcached 共享库|`OFF`|||		
|`WITH_JEMALLOC`|是否使用 -ljemalloc 链接|`OFF`|8.0.16||
|`WITH_KEYRING_TEST`|编译 keyring 测试程序|`OFF`|||		
|`WITH_LIBEVENT`|使用哪个 libevent 库|`bundled`|||
|`WITH_LIBWRAP`|是否包含 libwrap （TCP wrappers）支持|`OFF`|||		
|`WITH_LOCK_ORDER`|是否启用 LOCK_ORDER 工具|`OFF`|8.0.17||	
|`WITH_LSAN`|是否不使用 AddressSanitizer，运行 LeakSanitizer|`OFF`|8.0.16||
|`WITH_LTO`|启用 link-time 优化器|`OFF`|8.0.13||
|`WITH_LZ4`|支持的 LZ4 库类型|`bundled`|||
|`WITH_LZMA`|支持的 LZMA 库类型|`bundled`|8.0.16||
|`WITH_MECAB`|编译 MeCab||||
|`WITH_MSAN`|启用 MemorySanitizer|`OFF`|||
|`WITH_MSCRT_DEBUG`|启用 Visual Studio CRT 内存泄漏跟踪|`OFF`|||		
|`WITH_MYSQLX`|是否禁用 X 协议|`ON`|||		
|`WITH_NDB`|构建 MySQL NDB 集群|`OFF`|8.0.31||
|`WITH_NDBAPI_EXAMPLES`|构建 API 示例程序|`OFF`|||		
|`WITH_NDBCLUSTER`|构建 NDB 存储引擎|`OFF`|||		
|`WITH_NDBCLUSTER_STORAGE_ENGINE`|内部使用；在任何情况下都可能无法按预期工作；用户应改用 WITH_NDBCLUSTER|`ON`|||		
|`WITH_NDBMTD`|构建多线程数据节点|`ON`|||		
|`WITH_NDB_DEBUG`|生成用于测试或故障排除的调试构建|`OFF`|||		
|`WITH_NDB_JAVA`|支持构建 Java 和 ClusterJ 支持。默认情况下启用。仅在 MySQL 集群中支持|`ON`|||		
|`WITH_NDB_PORT`|使用此选项构建的管理服务器使用的默认端口。如果未使用此选项构建它，则管理服务器的默认端口为 1186|`[none]`|||		
|`WITH_NDB_TEST`|包含 NDB API 测试程序|`OFF`|||		
|`WITH_NUMA`|设置 NUMA 内存分配策略||||		
|`WITH_PACKAGE_FLAGS`|对于通常用于 RPM/DEB 包的标志，是否将其添加到这些平台上的独立构建中||8.0.26||
|`WITH_PLUGIN_NDBCLUSTER`|内部使用；在任何情况下都可能无法按预期工作。用户应改用 WITH_NDBCLUSTER 或 WITH_NDB||8.0.13|8.0.31|
|`WITH_PROTOBUF`|要使用的协议缓冲区包|`bundled`|||
|`WITH_RAPID`|是否构建快速开发周期插件|`ON`|||		
|`WITH_RAPIDJSON`|支持的 RapidJSON 类型|`bundled`|8.0.13||
|`WITH_RE2`|支持的 RE2 库类型|`bundled`|8.0.18||
|`WITH_ROUTER`|是否编译 MySQL 路由器|`ON`|8.0.16||
|`WITH_SSL`|支持的 SSL 类型|system|||		
|`WITH_SYSTEMD`|启用 systemd 支持文件的安装|`OFF`|||		
|`WITH_SYSTEMD_DEBUG`|启用其他系统调试信息|`OFF`|8.0.22||
|`WITH_SYSTEM_LIBS`|设置未显式设置的库选项的系统值|`OFF`|||		
|`WITH_TCMALLOC`|是否与 -ltcmalloc 链接|`OFF`|8.0.22||	
|`WITH_TEST_TRACE_PLUGIN`|构建测试协议跟踪插件|`OFF`|||		
|`WITH_TSAN`|启用 ThreadSanitizer|`OFF`|||		
|`WITH_UBSAN`|启用未定义的行为清理器|`OFF`|||		
|`WITH_UNIT_TESTS`|带单元测试编译 MySQL|`ON`|||		
|`WITH_UNIXODBC`|启用 unixODBC 支持|`OFF`|||		
|`WITH_VALGRIND`|是否在 Valgrind 头文件中编译|`OFF`|||		
|`WITH_WIN_JEMALLOC`|包含 jemalloc.dll 的目录路径||8.0.29||
|`WITH_ZLIB`|支持的 zlib 类型|`bundled`|||
|`WITH_ZSTD`|支持的 zstd 类型|`bundled`|8.0.18|||
|`WITH_xxx_STORAGE_ENGINE`|将存储引擎 xxx 静态编译到服务器中||||


## 常规选项

- `-DBUILD_CONFIG=mysql_release`

    此选项使用 Oracle 用于为 MySQL 官方版本生成二进制发行版的相同构建选项配置源发行版。

- `-DWITH_BUILD_ID=bool`

    在 Linux 系统上，生成一个唯一的构建 ID，该 ID 用作 [build_id](/5/5.1/5.1.8/server-system-variables.html) 系统变量的值，并在启动时写入 MySQL 服务器日志。将此选项设置为 `OFF` 以禁用此功能。

    在 MySQL 8.0.31 中添加；对 Linux 以外的平台没有影响。

- `-DBUNDLE_RUNTIME_LIBRARIES=bool`

    是否将运行库与 Windows 的服务器 MSI 和 Zip 包捆绑。

- `-DCMAKE_BUILD_TYPE=type`

    要生成的生成类型：

    - `RelWithDebInfo`：启用优化并生成调试信息。这是默认的 MySQL 构建类型。
    - `Release`：启用优化，但忽略调试信息以减少生成大小。此构建类型是在 MySQL 8.0.13 中添加的。
    - `Debug`：禁用优化并生成调试信息。如果启用 `WITH_DEBUG` 选项，也会使用此生成类型。也就是说，`-DWITH_DEBUG=1` 与 `-DCMAKE_BILD_TYPE=DEBUG` 具有相同的效果。

- `-DCPACK_MONOLITHIC_INSTALL=bool`

    此选项影响生成包操作是生成多个安装包文件还是生成单个文件。如果禁用，该操作将生成多个安装包文件，如果你只想安装完整 MySQL 安装的一个子集，则该文件可能很有用。如果启用，它将生成一个用于安装所有内容的文件。

- `-DFORCE_INSOURCE_BUILD=bool`

    定义是否强制源内生成。建议使用源外构建，因为它们允许来自同一源的多个构建，并且可以通过删除构建目录来快速执行清理。要强制源代码内构建，请使用 `-DFORCE_INSOURCE_build=ON` 调用 **CMake**。

## 安装布局选项

`CMAKE_INSTALL_PPREFIX` 选项指示基本安装目录。其他名称为 `INSTALL_xxx` 的选项（表示组件位置）相对于前缀进行解释，其值为相对路径名。它们的值不应包含前缀。

- `-DCMAKE_INSTALL_PREFIX=dir_name`

    安装基础目录。

    可以在服务器启动时使用 `--basedir` 选项设置此值。

- `-DINSTALL_BINDIR=dir_name`

    安装用户程序的位置。

- `-DINSTALL_DOCDIR=dir_name`

    安装文档的位置。

- `-DINSTALL_DOCREADMEDIR=dir_name`

    安装 `README` 文件的位置。

- `-DINSTALL_INCLUDEDIR=dir_name`

    安装头文件的位置。

- `-DINSTALL_INFODIR=dir_name`

    安装 Info 文件的位置。

- `-DINSTALL_LAYOUT=name`

    选择预定义的安装布局：

    - `STANDALONE`：与 `.tar.gz` 和 `.zip` 包使用的布局相同。这是默认设置。
    - `RPM`：布局类似于 RPM 包。
    - `SVR4`：Solaris 包布局。
    - `DEB`：DEB包布局（实验）。

    你可以选择预定义的布局，但可以通过指定其他选项修改单个组件的安装位置。例如：

    ```bash
    cmake . -DINSTALL_LAYOUT=SVR4 -DMYSQL_DATADIR=/var/mysql/data
    ```

    `INSTALL_LAYOUT` 值确定 [secure_file_priv](/5/5.1/5.1.8/server-system-variables.html)、[keyring_encrypted_file_data](/6/6.4/6.4.4/6.4.4.19/keyring-system-variables.html) 和 [keyring_file_data](/6/6.4/6.4.4/6.4.4.19/keyring-system-variables.html) 系统变量的默认值。参阅[章节 5.1.8，“服务器系统变量”](/5/5.1/5.1.8/server-system-variables.html)和[章节 6.4.4.19，“Kering 系统变量”](/6/6.4/6.4.4/6.4.4.19/keyring-system-variables.html)中对这些变量的描述。

- `-DINSTALL_LIBDIR=dir_name`

    安装库文件的位置。

- `-DINSTALL_MANDIR=dir_name`

    安装手册页的位置。

- `-DINSTALL_MYSQLKEYRINGDIR=dir_path`

    要用作 `keyring_file` 插件数据文件位置的默认目录。默认值是特定于平台的，取决于 `INSTALL_LAYOUT` **CMake** 选项的值；参阅[章节 5.1.8，“服务器系统变量”](/5/5.1/5.1.8/server-system-variables.html)中 [keyring_file_data](/6/6.4/6.4.4/6.4.4.19/keyring-system-variables.html) 系统变量的描述。

- `-DINSTALL_MYSQLSHAREDIR=dir_name`

    安装共享数据文件位置。

- `-DINSTALL_MYSQLTESTDIR=dir_name`

    `mysql -test` 目录的安装位置。要禁止安装此目录，请将该选项显式设置为空值（`-DINSALL_MYSQLTESTDIR=`）。

- `-DINSTALL_PKGCONFIGDIR=dir_name`

    安装 `mysqlclient.pc` 文件以供 **pkg-config** 使用的目录。默认值为 `INSTALL_LIBDIR/pkgconfig`，除非 `INSTALL_LABDIR` 以 `/mysql` 结尾，在这种情况下，将首先删除该值。

- `-DINSTALL_PLUGINDIR=dir_name`

    插件目录的位置。

    该值可以在服务器启动时使用 `--plugin_dir` 选项设置。

- `-DINSTALL_PRIV_LIBDIR=dir_name`

    动态库目录的位置。

    默认位置：RPM = `/usr/lib64/mysql/private/`, DEB = `/usr/lib/mysql/private/` 和 TAR = `lib/private/`。

    该选项是在 MySQL 8.0.18 中添加的。

    对于 Protobuf：由于这是一个私有位置，加载器（如 Linux 上的 ld-linux.so）可能无法在没有帮助的情况下找到 `libprotobuf.so` 文件。为引导装载程序，值为 `$ORIGIN//$INSTALL_PRIV_LIBDIR` 的 `RPATH` 添加到 mysqld 和 mysqlxtest。这在大多数情况下都有效，但在使用资源组功能时，*mysqld* 是 *setuid*，然后加载器忽略包含 `$ORIGIN` 的 `RPATH`。为了克服这个问题，在 mysqld 的 DEB 和 RPM 变体中设置了一个指向目录的显式完整路径，因为目标目标是已知的。对于 tarball 安装，需要使用 **patchelf** 等工具修补 mysqld。

- `-DINSTALL_SBINDIR=dir_name`

    [mysqld](/4/4.3/4.3.1/mysqld.html) 服务器的安装位置。

- `-DINSTALL_SECURE_FILE_PRIVDIR=dir_name`

    [secure_file_priv](/5/5.1/5.1.8/server-system-variables.html) 系统变量的默认值。默认值是特定于平台的，取决于 `INSTALL_LAYOUT` **CMake** 选项的值；参阅[章节 5.1.8，“服务器系统变量”](/5/5.1/5.1.8/server-system-variables.html)中对 [secure_file_priv](/5/5.1/5.1.8/server-system-variables.html) 系统变量的描述。

- `-DINSTALL_SHAREDIR=dir_name`

    安装 `aclocal/mysql.m4` 的位置。

- `-DINSTALL_STATIC_LIBRARIES=bool`

    是否安装静态库。默认值为 `ON`。如果设置为 `OFF`，则不会安装这些库：`libmysqlclient.a`、`libmysqlservices.a`。

- `-DINSTALL_SUPPORTFILESDIR=dir_name`

    安装额外的支持文件位置。

- `-DLINK_RANDOMIZE=bool`

    是否随机化 [mysqld](/4/4.3/4.3.1/mysqld.html) 二进制文件中的符号顺序。默认值为 `OFF`。应仅为调试目的启用此选项。

- `-DLINK_RANDOMIZE_SEED=val`

    `LINK_RANDOMIZE` 选项的种子值。该值是一个字符串。默认值是 `mysql`，这是一个任意选择。

- `-DMYSQL_DATADIR=dir_name`

    MySQL 数据目录的位置。

    可以在服务器启动时使用 [--datadir](/5/5.1/5.1.8/server-system-variables.html) 选项设置该值。

- `-DODBC_INCLUDES=dir_name`

    ODBC 的位置包括目录，可以在配置 Connector/ODBC 时使用。

- `-DODBC_LIB_DIR=dir_name`

    ODBC 库目录的位置，可以在配置 Connector/ODBC 时使用。

- `-DSYSCONFDIR=dir_name`

    默认 `my.cnf` 选项文件目录。

    无法在服务器启动时设置此位置，但可以使用 [--defaultsfile=file_name](/4/4.2/4.2.2/4.2.2.3/option-file-options.html) 选项使用给定的选项文件启动服务器，其中 `file_name` 是文件的完整路径名。

- `-DSYSTEMD_PID_DIR=dir_name`

    当 MySQL 由 systemd 管理时，要在其中创建 PID 文件的目录的名称。默认值为 `/var/run/mysqld`；这可以根据 `INSTALL_LAYOUT` 值隐式更改。

    除非启用 `WITH_SYSTEMD`，否则将忽略此选项。

- `-DSYSTEMD_SERVICE_NAME=name`

    当 MySQL 由 systemd 管理时要使用的 MySQL 服务的名称。默认值为 `mysqld`；这可以根据 `INSTALL_LAYOUT` 值隐式更改。

    除非启用 `WITH_SYSTEMD`，否则将忽略此选项。

- `-DTMPDIR=dir_name`

    用于 [tmpdir](/5/5.1/5.1.8/server-system-variables.html) 系统变量的默认位置。如果未指定，则值默认为 `<stdio.h>` 中的 `P_tmpdir`。

## 存储引擎选项

存储引擎是作为插件构建的。你可以将插件构建为静态模块（编译到服务器中）或动态模块（构建为动态库，必须使用 [INSTALL PLUGIN](/13/13.7/13.7.4/13.7.4.4/install-plugin.html) 语句或 [--plugin-load](/5/5.1/5.1.7/server-options.html) 选项将其安装到服务器中才能使用）。某些插件可能不支持静态或动态构建。

[InnoDB](/15/innodb-storage-engine.html)、[MyISAM](/16/16.2/myisam-storage-engine.html)、[MERGE](/16/16.7/merge-storage-engine.html)、[MEMORY](/16/16.3/memory-storage-engine.html) 和 [CSV](/16/16.4/csv-storage-engine.html) 引擎是强制性的（总是编译到服务器中），不需要显式安装。

要将存储引擎静态编译到服务器中，请使用 `-DWITH_engine_STORAGE_ENGINE=1`。某些允许的 *engine* 值为 `ARCHIVE`、`BLACKHOLE`、`EXAMPLE` 和 `FEDERATED`。示例：

```bash
-DWITH_ARCHIVE_STORAGE_ENGINE=1
-DWITH_BLACKHOLE_STORAGE_ENGINE=1
```

要构建支持 NDB 集群的 MySQL，请使用 `with_NDB` 选项。（*NDB 8.0.30 及更早版本*：使用 `WITH_NDBCLUSTER`。）

:::tip 注意
没有性能架构支持，无法编译。如果希望在不使用特定类型的检测的情况下进行编译，可以使用以下 **CMake** 选项来完成：

```bash
DISABLE_PSI_COND
DISABLE_PSI_DATA_LOCK
DISABLE_PSI_ERROR
DISABLE_PSI_FILE
DISABLE_PSI_IDLE
DISABLE_PSI_MEMORY
DISABLE_PSI_METADATA
DISABLE_PSI_MUTEX
DISABLE_PSI_PS
DISABLE_PSI_RWLOCK
DISABLE_PSI_SOCKET
DISABLE_PSI_SP
DISABLE_PSI_STAGE
DISABLE_PSI_STATEMENT
DISABLE_PSI_STATEMENT_DIGEST
DISABLE_PSI_TABLE
DISABLE_PSI_THREAD
DISABLE_PSI_TRANSACTION
```

例如，要在不使用互斥检测的情况下进行编译，请使用 `-DDISABLE_PSI_MUTEX=1` 选项配置 MySQL。
:::

要从生成中排除存储引擎，请使用 `-DWITH_engine_STORAGE_ENGINE=0`。示例：

```bash
-DWITH_ARCHIVE_STORAGE_ENGINE=0
-DWITH_EXAMPLE_STORAGE_ENGINE=0
-DWITH_FEDERATED_STORAGE_ENGINE=0
```

也可以使用 `-DWITHOUT_engine_STORAGE_ENGINE=1` 从构建中排除存储引擎（但首选 `-DWITH_engine_STORAGE_ENGINE=0`）。示例：

```bash
-DWITHOUT_ARCHIVE_STORAGE_ENGINE=1
-DWITHOUT_EXAMPLE_STORAGE_ENGINE=1
-DWITHOUT_FEDERATED_STORAGE_ENGINE=1
```

如果既没有为给定的存储引擎指定 `-DWITH_engine_STORAGE_ENGINE`，也没有指定 `-DWITHOUT_engine_STORAGE_ENGINE`，则该引擎将作为共享模块生成，如果无法作为共享模块构建，则排除该引擎。

## 特性选项

- `-DADD_GDB_INDEX=bool`

    此选项确定是否启用二进制文件中的 `.gdb_index` 部分的生成，这将使在调试器中加载它们更快。默认情况下禁用该选项。**lld** 链接器被使用，并且被禁用。如果使用了 **lld** 或 GNU **gold** 以外的链接器，它将无效。

    该选项是在 MySQL 8.0.18 中添加的。

- `-DCOMPILATION_COMMENT=string`

    关于编译环境的描述性注释。从 MySQL 8.0.14 开始，[mysqld](/4/4.3/4.3.1/mysqld.html) 使用 `COMPILATION_COMMENT_SERVER`。其他程序继续使用 `COMPILATION_COMMENT`。

- `-DCOMPRESS_DEBUG_SECTIONS=bool`

    是否压缩二进制可执行文件的调试部分（仅限 Linux）。压缩可执行调试部分以在构建过程中额外的 CPU 时间为代价来节省空间。

    默认值为 `OFF`。如果未显式设置此选项，但设置了 `COMPRES_DEBUG_SECTIONS` 环境变量，则该选项将从该变量中获取其值。

    该选项是在 MySQL 8.0.22 中添加的。

- `-DCOMPILATION_COMMENT_SERVER=string`

    关于 [mysqld](/4/4.3/4.3.1/mysqld.html) 使用的编译环境的描述性注释（例如，设置 [version_comment](/5/5.1/5.1.8/server-system-variables.html) 系统变量）。该选项是在 MySQL 8.0.14 中添加的。8.0.14 之前，服务器使用 `COMPILATION_COMMENT`。

- `-DDEFAULT_CHARSET=charset_name`

    服务器字符集。默认情况下，MySQL 使用 `utf8mb4` 字符集。

    *charset_name* 可以为其中之一：`binary`、 `armscii8`、 `ascii`、 `big5`、 `cp1250`、 `cp1251`、 `cp1256`、 `cp1257`、 `cp850`、 `cp852`、 `cp866`、 `cp932`、 `dec8`、 `eucjpms`、 `euckr`、 `gb2312`、 `gbk`、 `geostd8`、 `greek`、 `hebrew`、 `hp8`、 `keybcs2`、 `koi8r`、 `koi8u`、 `latin1`、 `latin2`、 `latin5`、 `latin7`、 `macce`、 `macroman`、 `sjis`、 `swe7`、 `tis620`、 `ucs2`、 `ujis`、 `utf8mb3`、 `utf8mb4`、 `utf16`、 `utf16le`、 `utf32`。

    可以在服务器启动时使用 [--character_set_server](/5/5.1/5.1.8/server-system-variables.html) 选项设置此值。

- `-DDEFAULT_COLLATION=collation_name`

    服务器排序规则。默认情况下，MySQL 使用 `utf8mb4_0900_ai_ci`。使用 [SHOW COLLATION](/13/13.7/13.7.7/13.7.7.4/show-collation.html) 语句确定每个字符集可使用哪些排序规则。

    可以在服务器启动时使用 [--collation_server](/5/5.1/5.1.8/server-system-variables.html) 选项设置此值。

- `-DDISABLE_PSI_COND=bool`

    是否排除性能架构条件检测。默认值为 `OFF`（包括）。

- `-DDISABLE_PSI_FILE=bool`

    是否排除性能架构文件检测。默认值为 `OFF`（包括）。

- `-DDISABLE_PSI_IDLE=bool`

    是否排除性能架构空闲检测。默认值为 `OFF`（包括）。

- `-DDISABLE_PSI_MEMORY=bool`

    是否排除性能架构内存检测。默认值为 `OFF`（包括）。

- `-DDISABLE_PSI_METADATA=bool`

    是否排除性能架构元数据检测。默认值为 `OFF`（包括）。

- `-DDISABLE_PSI_MUTEX=bool`

    是否排除性能架构互斥检测。默认值为 `OFF`（包括）。

- `-DDISABLE_PSI_RWLOCK=bool`

    是否排除性能架构 rwlock 检测。默认值为 `OFF`（包括）。

- `-DDISABLE_PSI_SOCKET=bool`

    是否排除性能架构套接字检测。默认值为 `OFF`（包括）。

- `-DDISABLE_PSI_SP=bool`

    是否排除性能架构存储程序检测。默认值为 `OFF`（包括）。

- `-DDISABLE_PSI_STAGE=bool`

    是否排除性能架构阶段检测。默认值为 `OFF`（包括）。

- `-DDISABLE_PSI_STATEMENT=bool`

    是否排除性能架构语句检测。默认值为 `OFF`（包括）。

- `-DDISABLE_PSI_STATEMENT_DIGEST=bool`

    是否排除性能架构语句 _digest 检测。默认值为 `OFF`（包括）。

- `-DDISABLE_PSI_TABLE=bool`

    是否排除性能架构表检测。默认值为 `OFF`（包括）。

- `-DDISABLE_SHARED=bool`

    是否禁用生成共享库和编译位置相关代码。默认值为 `OFF`（编译位置无关代码）。

    此选项未使用，已在 MySQL 8.0.18 中删除。

- `-DDISABLE_PSI_PS=bool`

    排除性能架构准备语句实例检测。默认值为 `OFF`（包括）。

- `-DDISABLE_PSI_THREAD=bool`

    排除性能架构线程检测。默认值为 `OFF`（包括）。

    在没有任何检测的情况下生成时仅禁用线程，因为其他检测依赖于线程。

- `-DDISABLE_PSI_TRANSACTION=bool`

    排除性能架构事务检测。默认值为 `OFF`（包括）。

- `-DDISABLE_PSI_DATA_LOCK=bool`

    排除性能架构数据锁检测。默认值为 `OFF`（包括）。

- `-DDISABLE_PSI_ERROR=bool`

    排除性能架构服务器错误检测。默认值为 `OFF`（包括）。

- `-DDOWNLOAD_BOOST=bool`

    是否下载 Boost 库。默认值为 `OFF`。

    有关使用 BOOST 的更多讨论，参阅 `WITH_BOOST` 选项。

- `-DDOWNLOAD_BOOST_TIMEOUT=seconds`

    下载 Boost 库的超时（秒）。默认值为 600 秒。

    有关使用 BOOST 的更多讨论，参阅 `WITH_BOOST` 选项。

- `-DENABLE_DOWNLOADS=bool`

    是否下载可选文件。例如，启用此选项后，**CMake** 将下载测试套件用于运行单元测试的 Google Test 发行版，或者构建 GCS Java 包装器所需的 Ant 和 JUnit。

    从 MySQL 8.0.26 开始，MySQL 源分发捆绑了 Google Test 源代码，用于运行基于 Google Test 的单元测试。因此，从该版本起，`WITH_GMOCK` 和`ENABLE_DOWNLOADS` **CMake** 选项将被删除，如果指定，将被忽略。

- `-DENABLE_EXPERIMENTAL_SYSVARS=bool`

    是否启用实验 `InnoDB` 系统变量。实验系统变量适用于从事 MySQL 开发的人员，只能在开发或测试环境中使用，并且可能会在未来的 MySQL 版本中删除而不另行通知。有关实验系统变量的信息，参阅 MySQL 源树中的 `/storage/innobase/handler/ha_nodb.cc`。可以通过搜索 “PLUGIN_VAR_Experimental” 来识别实验系统变量。

- `-DWITHOUT_SERVER=bool`

    是否构建时不带 MySQL 服务器。默认值为 `OFF`，这会构建服务器。

    这被认为是一个实验选项；最好带服务器进行构建。

- `-DENABLE_GCOV=bool`

    是否包括 gcov 支持（仅限 Linux）。

- `-DENABLE_GPROF=bool`

    是否启用 gprof（仅限优化的Linux版本）。

- `-DENABLED_LOCAL_INFILE=bool`

    此选项控制 MySQL 客户端库的默认编译 `LOCAL` 功能。因此，根据 MySQL 构建时指定的 `ENABLED_LOCAL_INFILE` 设置，未进行明确安排的客户端将禁用或启用 `LOCAL` 功能。

    默认情况下，MySQL 二进制发行版中的客户端库是在禁用 `ENABLED_LOCAL_INFILE` 的情况下编译的。如果从源代码编译MySQL，请根据没有明确安排的客户端是否应分别禁用或启用 `LOCAL` 功能，将其配置为禁用或启用 `ENABLED_LOCAL_INFILE`。

    `ENABLED_LOCAL_INFILE` 控制客户端 `LOCAL` 功能的默认值。对于服务器，[local_infile](/5/5.1/5.1.8/server-system-variables.html) 系统变量控制服务器端 `LOCAL` 功能。要显式地使服务器拒绝或允许 [LOAD DATA LOCAL](/13/13.2/13.2.9/load-data.html) 语句（无论客户端程序和库在构建时或运行时如何配置），请分别在禁用或启用 [local_infile](/5/5.1/5.1.8/server-system-variables.html) 的情况下启动 [mysqld](/4/4.3/4.3.1/mysqld.html)。[local_infile](/5/5.1/5.1.8/server-system-variables.html) 也可以在运行时设置。参阅[章节 6.1.6，“本地加载数据的安全注意事项”](/6/6.1/6.1.6/load-data-local-security.html)。

- `-DENABLED_PROFILING=bool`

    是否启用查询分析代码（用于 [SHOW PROFILE](/13/13.7/13.7.7/13.7.7.30/show-profile.html) 和 [SHOW PROFILES](/13/13.7/13.7.7/13.7.7.31/show-profiles.html) 语句）。

- `-DFORCE_UNSUPPORTED_COMPILER=bool`

    默认情况下，**CMake** 检查支持的编译器的最低版本：Visual Studio 2015（Windows）；GCC 4.8 或 Clang 3.4（Linux）；Developer Studio 12.5（Solaris 服务器）；Developer Studio 12.4 或 GCC 4.8（Solaris 客户端库）；Clang 3.6（macOS），Clang 3.4（FreeBSD）。要禁用此检查，请使用 `-DFORCE_UNSUPPORTED_COMPILER=ON`。

- `-DSHOW_SUPPRESSED_COMPILER_WARNINGS=bool`

    显示被抑制的编译器警告，并在不出现 -Werror 的情况下执行此操作。默认设置为 `OFF`。

    该选项是在 MySQL 8.0.30 中添加的。

- `-DFPROFILE_GENERATE=bool`

    是否生成配置文件引导优化（PGO）数据。此选项可用于实验带 GCC 的 PGO。有关使用 `FPROFILE_GENERATE` 和 `FPROFILE_USE` 的信息，参阅 MySQL 源分发中的 `cmake/fprofile.cmake` 文件。这些选项已经用 GCC 8 和 9 进行了测试。

    该选项是在 MySQL 8.0.19 中添加的。

- `-DFPROFILE_USE=bool`

    是否使用配置文件引导优化（PGO）数据。此选项可用于实验带 GCC 的 PGO。有关使用 `FPROFILE_GENERATE` 和 `FPROFILE_USE` 的信息，参阅 MySQL 源分发中的 `cmake/fprofile.cmake` 文件。这些选项已经用 GCC 8 和 9 进行了测试。

    启用 `FPROFILE_USE` 也会启用 `WITH_LTO`。

    该选项是在 MySQL 8.0.19 中添加的。

- `-DHAVE_PSI_MEMORY_INTERFACE=bool`

    是否为过对齐类型的动态存储中使用的内存分配函数（`ut:：aligned_name` 库函数）启用性能架构内存跟踪模块。

- `-DIGNORE_AIO_CHECK=bool`

    如果在 Linux 上提供了 `-DBUILD_CONFIG=mysql_release` 选项，则默认情况下必须链接 libaio 库。如果你没有 libaio 或不想安装它，可以通过指定 `-DIGNORE_AIO_check=1` 来抑制对它的检查。

- `-DMAX_INDEXES=num`

    每个表的最大索引数。默认值为 64。最大值为 255。小于 64 的值将被忽略，并使用默认值 64。

- `-DMYSQL_MAINTAINER_MODE=bool`

    是否启用特定于 MySQL 维护者的开发环境。如果启用，此选项将导致编译器警告变为错误。

- `-DMUTEX_TYPE=type`

    `InnoDB` 使用的互斥类型。选项包括：

    - `event`：使用事件互斥体。这是默认值和原始的 `InnoDB` 互斥实现。
    - `sys`：在 UNIX 系统上使用 POSIX 互斥锁。在 Windows 上使用 `CRITICAL_SECTION` 对象（如果可用）。
    - `futex`：使用 Linux futex 代替条件变量来调度等待线程。

- `-DMYSQLX_TCP_PORT=port_num`

    X 插件侦听 TCP/IP 连接的端口号。默认值为 33060。

    该值可以在服务器启动时使用 [mysqlx_port](/20/20.5/20.5.6/20.5.6.2/x-plugin-options-system-variables.html) 系统变量设置。

- `-DMYSQLX_UNIX_ADDR=file_name`

    服务器侦听 X 插件套接字连接的 Unix套 接字文件路径。这必须是绝对路径名。默认值为 `/tmp/mysqlx.sock`。

    该值可以在服务器启动时使用 [mysqlx_port](/20/20.5/20.5.6/20.5.6.2/x-plugin-options-system-variables.html) 系统变量设置。

- `-DMYSQL_PROJECT_NAME=name`

    对于 Windows 或 macOS，要合并到项目文件名中的项目名称。

- `-DMYSQL_TCP_PORT=port_num`

    服务器侦听 TCP/IP 连接的端口号。默认值为 3306。

    可以在服务器启动时使用 [--port](/5/5.1/5.1.8/server-system-variables.html) 选项设置该值。

- `-DMYSQL_UNIX_ADDR=file_name`

    服务器侦听套接字连接的 Unix 套接字文件路径。这必须是绝对路径名。默认值为 `/tmp/mysql.sock`。

    可以在服务器启动时使用 [--socket](/5/5.1/5.1.8/server-system-variables.html) 选项设置该值。

- `-DOPTIMIZER_TRACE=bool`

    是否支持优化器跟踪。参阅 [MySQL 内部构件：跟踪优化器](https://dev.mysql.com/doc/internals/en/optimizer-tracing.html)。

- `-DREPRODUCIBLE_BUILD=bool`

    对于 Linux 系统上的构建，此选项控制是否要格外小心地创建独立于构建位置和时间的构建结果。

    该选项是在 MySQL 8.0.11 中添加的。从 MySQL 8.0.12 开始，`RelWithDebInfo` 版本默认为 `ON`。

- `-DUSE_LD_GOLD=bool`

    GNU **gold** 链接器支持在 v8.0.31 中被删除；此 **CMake** 选项也被删除。

    **CMake** 使构建过程与 GNU **gold** 链接器链接（如果它可用且未明确禁用）。要禁用此链接器，请指定 `-DUE_LD_GOLD=OFF` 选项。

- `-DUSE_LD_LLD=bool`

    CMake 使构建过程与 Clang 的 **llvm** **lld** 链接器链接（如果它可用且未明确禁用）。要禁用此链接器，请指定 `-DUE_LD_LLD=OFF` 选项。

    该选项是在 MySQL 8.0.16 中添加的。

- `-DWIN_DEBUG_NO_INLINE=bool`

    是否在 Windows 上禁用函数内联。默认设置为禁用（启用内联）。

- `-DWITH_ANT=path_name`

    将路径设置为 Ant，这在构建 GCS Java 包装器时是必需的。工作方式与现有的 `WITH_BOOST` CMake 选项类似。将 `WITH_ANT` 设置为保存 ANT tarball 或已解压缩文件的目录路径。当 `WITH_ANT` 未设置，或使用特殊值 `system` 设置时，构建假设 `$PATH` 中存在二进制 **ant**。

- `-DWITH_ASAN=bool`

    是否为支持 AddressSanitizer 的编译器启用它。默认设置为关闭。

- `-DWITH_ASAN_SCOPE=bool`

    是否启用 AddressSanitizer-fsanitiz 地址在作用域 Clang 标志后使用，以便在作用域检测后使用。默认设置为禁用。若要使用此选项，还必须启用 `-DWITH_ASAN`。

- `-DWITH_AUTHENTICATION_CLIENT_PLUGINS=bool`

    如果构建了任何相应的服务器身份验证插件，则会自动启用此选项。因此，其值取决于其他 **CMake** 选项，不应显式设置。

    该选项是在 MySQL 8.0.26 中添加的。

- `-DWITH_AUTHENTICATION_LDAP=bool`

    如果无法构建 LDAP 认证插件，是否报告错误：

    - 如果禁用此选项（默认设置），则如果找到所需的头文件和库，则会构建 LDAP 插件。如果没有，**CMake** 会显示一条关于它的注释。
    - 如果启用此选项，则无法找到所需的头文件和库会导致 **CMake** 产生错误，从而导致无法构建服务器。

- `-DWITH_AUTHENTICATION_PAM=bool`

    是否为包含此插件的源树构建 PAM 认证插件。（参阅[章节 6.4.1.5，“PAM 可插拔认证”](6/6.4/6.4.1/6.4.1.5/pam-pluggable-authentication.html)。）如果指定了此选项，并且无法编译插件，则构建失败。

- `-DWITH_AWS_SDK=path_name`

    Amazon Web Services 软件开发工具包的位置。

- `-DWITH_BOOST=path_name`

    构建 MySQL 需要 Boost 库。这些 **CMake** 选项可以控制库源位置，以及是否自动下载：

    - `-DWITH_BOOST=path_name` 指定 Boost 库目录位置。也可以通过设置 `Boost_ROOT` 或 `WITH_Boost` 环境变量来指定 Boost 位置。

        `-DWITH_BOOST=system` 也是允许的，并指示编译主机上的标准位置安装了正确版本的 Boost。在这种情况下，将使用已安装的 Boost 版本，而不是 MySQL 源分发中包含的任何版本。
    - `-DDOWNLOAD_BOOST=bool` 指定如果 Boost 源不在指定位置，是否下载该源。默认值为 `OFF`。
    - `-DDOWNLOAD_BOOST_TIMEOUT=seconds` 下载 Boost 库的超时（秒）。默认值为 600 秒。

    例如，如果你通常将对象输出放置在 MySQL 源树的 `bld` 子目录中来构建 MySQL，则可以使用 Boost 进行如下构建：

    ```bash
    mkdir bld
    cd bld
    cmake .. -DDOWNLOAD_BOOST=ON -DWITH_BOOST=$HOME/my_boost
    ```

    这会导致 Boost 下载到主目录下的 `my_boost` 目录中。如果所需的 Boost 版本已经存在，则不进行下载。如果所需的 Boost 版本发生更改，则会下载更新的版本。

    如果 Boost 已经在本地安装，并且编译器自己找到 Boost 头文件，则可能不需要指定前面的 **CMake** 选项。但是，如果 MySQL 所需的 Boost 版本发生变化，并且本地安装的版本尚未升级，则可能会出现构建问题。使用 **CMake** 选项应该可以成功构建。

    使用以上允许 Boost 下载到指定位置的设置，当所需的 Boost 版本更改时，你需要删除 `bld` 文件夹，重新创建它，然后再次执行 **cmake** 步骤。否则，新的 Boost 版本可能无法下载，编译可能会失败。

- `-DWITH_CLIENT_PROTOCOL_TRACING=bool`

    是否将客户端协议跟踪框架构建到客户端库中。默认情况下，此选项处于启用状态。

    有关编写协议跟踪客户端插件的信息，参阅[编写协议跟踪插件](https://dev.mysql.com/doc/extending-mysql/8.0/en/writing-protocol-trace-plugins.html)。

    另请参阅 `WITH_TEST_TRACE_PLUGIN` 选项。

- `-DWITH_CURL=curl_type`

    **curl** 库位置。*curl_type* 可为 `system`（使用系统 **curl** 库）或指向 **curl** 库的路径名字。

- `-DWITH_DEBUG=bool`

    是否包括调试支持。

    通过使用调试支持配置 MySQL，可以在启动服务器时使用 [--debug="d，parser_debug"](/5/5.1/5.1.8/server-system-variables.html) 选项。这导致用于处理 SQL 语句的 Bison 解析器将解析器跟踪转储到服务器的标准错误输出。通常，此输出会写入错误日志。

    `InnoDB` 存储引擎的同步调试检查在 `UNIV_DEBUG` 下定义，并且在使用 `WITH_DEBUG` 选项编译调试支持时可用。编译调试支持时，可以使用 [innodb_sync_debug](/15/15.14/innodb-parameters.html) 配置选项启用或禁用 `InnoDB` 同步调试检查。

    启用 `WITH_DEBUG` 还可以启用调试同步。该设备用于测试和调试。在编译时，默认情况下在运行时禁用调试同步。要启用它，请使用 [--debug-sync-timeout=N](/5/5.1/5.1.8/server-system-variables.html) 选项启动 [mysqld](/4/4.3/4.3.1/mysqld.html)，其中 ***N*** 是大于 0 的超时值。（默认值为 0，这将禁用调试同步。）***N*** 将成为各个同步点的默认超时。

    在使用 `WITH_DEBUG` 选项编译调试支持时，可以对 `InnoDB` 存储引擎进行同步调试检查。

    有关调试同步功能以及如何使用同步点的描述，参阅 [MySQL 内部构件：测试同步](https://dev.mysql.com/doc/internals/en/test-synchronization.html)。

- `-DWITH_DEFAULT_FEATURE_SET=bool`

    是否使用 `cmake/build_configurations/feature_set.cmake` 中的标志。此选项已在 MySQL 8.0.22 中删除。

- `-DWITH_EDITLINE=value`

    要使用哪个 `libedit/editline` 库。允许的值是 `bundled`（默认值）和 `system`。

- `-DWITH_FIDO=fido_type`

    `authentication_fido` 认证插件使用 FIDO 库实现（参阅[章节 6.4.1.11，“FIDO 可插拔认证”](/6/6.4/6.4.1/6.4.1.11/fido-pluggable-authentication.html)）。`WITH_FIDO` 选项表示 FIDO 支持的来源：

    - `bundled`：使用随分发附带的 FIDO 库。这是默认设置。

    截至 MySQL 8.0.30，MySQL 包含 `fido2` 1.8.0 版本。（之前版本使用 `fido2` 1.5.0）。

    - `system`：使用系统 FIDO 库。

    该选项是在 MySQL 8.0.27 中添加的。

- `-DWITH_GMOCK=path_name`

    googlemock 发行版的路径，用于基于 Google Test 的单元测试。选项值是分发 Zip 文件的路径。或者，将 `WITH_GMOCK` 环境变量设置为路径名。也可以使用 `-DENABLE_DOWNLOADS=1`，以便 **CMake** 从 GitHub 下载发行版。

    如果你在没有基于 Google Test 的单元测试的情况下构建 MySQL（通过在没有 `WITH_GMOCK` 的情况下进行配置），**CMake** 将显示一条消息，指示如何下载它。

    从 MySQL 8.0.26 开始，MySQL 源分发捆绑了 Google Test 源代码，用于运行基于 Google Test 的单元测试。因此，从该版本起，`WITH_GMOCK` 和 `ENABLE_DOWNLOADS` **CMake** 选项将被删除，如果指定，将被忽略。

- `-DWITH_ICU={icu_type|path_name}`

    MySQL 使用 Unicode 国际组件（ICU）来支持正则表达式操作。`WITH_ICU` 选项指示要包括的 ICU 支持类型或要使用的 ICU 安装路径名称。

    - `icu_type` 可以是以下任一值：

        - `bundled`：使用与分发捆绑的 ICU 库。这是默认选项，也是 Windows 唯一支持的选项。
        - `system`：使用系统 ICU 库。

    - `path_name` 是要使用的 ICU 安装的路径名。这可能比使用系统的 *icu_type* 值更好，因为它可以防止 **CMake** 检测并使用系统上安装的较旧或不正确的 ICU 版本。（另一种允许的方法是将 `WITH_ICU` 设置为 `system`，并将 `CMAKE_PREFIX_PATH` 选项设置为 *path_name*。）

- `-DWITH_INNODB_EXTRA_DEBUG=bool`

    是否包括额外的 InnoDB 调试支持。

    启用 `WITH_INNODB_EXTRA_DEBUG` 将启用额外的 InnoDB 调试检查。仅当启用 `WITH_DEBUG` 时，才能启用此选项。

- `-DWITH_INNODB_MEMCACHED=bool`

    是否生成 memcached 共享库（`libmemcached.so` 和 `innodb_engine.so`）。

- `-DWITH_JEMALLOC=bool`

    是否与 `-ljemalloc` 链接。如果启用，内置的 `malloc()`、`calloc()`、`realloc()` 和 `free()` 程序是禁用的。 默认为 `OFF`。

    `WITH_JEMALLOC` 和 `WITH_TCMALLOC` 互斥。

    该选项是在 MySQL 8.0.16 中添加的。

- `-DWITH_WIN_JEMALLOC=string`

    在 Windows 上，输入包含 `jemalloc.dll` 的目录的路径以启用 jemalloc 功能。构建系统将 `jemalloc.dll` 复制到与 `mysqld.exe` 和/或 `mysqld-debug.exe` 相同的目录中，并将其用于内存管理操作。如果找不到 `jemalloc.dll` 或没有导出所需的函数，则使用标准内存函数。INFORMATION 级别的日志消息记录是否找到并使用了 jemalloc。

    此选项适用于 Windows 官方 MySQL 二进制文件。

    该选项是在 MySQL 8.0.29 中添加的。

- `-DWITH_KEYRING_TEST=bool`

    是否构建 `keyring_file` 插件附带的测试程序。默认值为 `OFF`。测试文件源代码位于 `plugin/keyring/keyring-test` 目录中。

- `-DWITH_LIBEVENT=string`

    要使用的 `libevent` 库。允许的值是 `bundled`（默认值）和 `system`。在 MySQL 8.0.21 之前，如果指定 `system`，则会使用系统 `libevent` 库（如果存在），否则会发生错误。在 MySQL 8.0.21 及更高版本中，如果指定了 `system`，但找不到系统 `libevent` 库，则无论如何都会发生错误，并且不会使用绑定的 `libevent`。

    `InnoDB` memcached、X 插件和 MySQL 路由需要 `libevent` 库。

- `-DWITH_LIBWRAP=bool`

    是否包括 `libwrap`（TCP 包装器）支持。

- `-DWITH_LOCK_ORDER=bool`

    是否启用 `LOCK_ORDER` 工具。默认情况下，此选项被禁用，并且服务器构建不包含工具。如果启用了工具，则 `LOCK_ORDER` 工具可用，可按照[章节 5.9.3，“LOCK_ORDEER 工具”](/5/5.9/5.9.3/lock-order-tool.html)中的说明使用。

    :::tip 注意
    启用 `With_LOCK_ORDER` 选项后，MySQL 构建需要 **flex** 程序。
    :::

    该选项是在 MySQL 8.0.17 中添加的。

- `-DWITH_LSAN=bool`

    是否在没有 AddressSanitizer 的情况下运行LeakSanitizer。默认值为 `OFF`。

    该选项是在 MySQL 8.0.16 中添加的。

- `-DWITH_LTO=bool`

    如果编译器支持，是否启用链接时间优化器。除非启用 `FPROFILE_USE`，否则默认值为 `OFF`。

    该选项是在 MySQL 8.0.13 中添加的。

- `-DWITH_LZ4=lz4_type`

    `WITH_LZ4` 选项表示 `zlib` 支持的来源：

    - `bundled`：使用与发行版捆绑的 `lz4` 库。这是默认设置。
    - `system`：使用系统 `lz4` 库。如果 `WITH_LZ4` 设置为该值，则不会构建 [lz4_decompress](/4/4.8/4.8.1/lz4-decompress.html) 实用程序。在这种情况下，可以改用系统 `lz4` 命令。

- `-DWITH_LZMA=lzma_type`

    要包含的 LZMA 库支持的类型 *.lzma_type* 可以是以下值之一：

    - `bundled`：使用发行版附带的 LZMA 库。这是默认设置。
    - `system`：使用系统 LZMA 库。

    MySQL 8.0.16 中移除了此选项。

- `-DWITH_MECAB={disabled|system|path_name}`

    使用此选项编译 MeCab 解析器。如果已将MeCab安装到其默认安装目录，请设置 `-DWITH_MECOB=system`。`system` 选项适用于使用本机包管理实用程序从源文件或二进制文件执行的 MeCab 安装。如果将 MeCab 安装到自定义安装目录，请指定 MeCab 的安装路径。例如，`-DWITH_MECAB=/opt/mecab`。如果系统选项不起作用，则指定 MeCab 安装路径在所有情况下都应起作用。

    有关相关信息，参阅[章节 12.10.9，“MeCab 全文解析器插件”](/12/12.10/12.10.9/fulltext-search-mecab.html)。

- `-DWITH_MSAN=bool`

    是否为支持 MemoryAnitizer 的编译器启用它。默认设置为关闭。

    若要使此选项生效（如果启用），所有链接到 MySQL 的库也必须在启用该选项的情况下编译。

- `-DWITH_MSCRT_DEBUG=bool`

    是否启用 Visual Studio CRT 内存泄漏跟踪。默认值为 `OFF`。

- `-DWITH_MYSQLX=bool`

    是否在支持 X 插件的情况下生成。默认为 `ON`。参阅[章节 20，使用 MySQL 作为文档存储](/20/document-store.html)。

- `-DWITH_NUMA=bool`

    明确设置 NUMA 内存分配策略。**CMake** 根据当前平台是否支持 NUMA 设置默认 `WITH_NUMA` 值。对于不支持 NUMA 的平台，**CMake** 的行为如下：
    - 如果没有 NUMA 选项（正常情况下），**CMake** 将继续正常运行，只生成以下警告：NUMA 库缺失或所需版本不可用（NUMA library missing or required version not available）
    - 如果 `-DWITH_NUMA=ON`，**CMake** 将中止，并出现以下错误：NUMA 库缺失或所需版本不可用

- `-DWITH_PACKAGE_FLAGS=bool`

    对于通常用于 RPM 和 Debian 包的标志，是否将它们添加到这些平台上的独立构建中。对于非调试版本，默认值为 `ON`。

    该选项是在 MySQL 8.0.26 中添加的。

- `-DWITH_PROTOBUF=protobuf_type`

    要使用的协议缓冲区包 *.protobuf_type() 可以是以下值之一：
    - `bundled`：使用与分发捆绑的软件包。这是默认设置。（可选）使用INSTALL_PRIV_LIBDIR修改动态Protobuf库目录。
    - `system`：使用系统上安装的软件包。

    其他值将被忽略，并回退为 `bundled`。

- `-DWITH_RAPID=bool`

    是否构建 rapid 开发周期插件。启用后，将在包含这些插件的构建树中创建一个 rapid 目录。禁用时，不会在构建树中创建快速目录。默认值为 `ON`，除非从源树中删除快速目录，否则默认值为 `OFF`。

- `-DWITH_RAPIDJSON=rapidjson_type`

    要包含的 RapidJSON 库支持的类型 *.rapidjson_type* 可以是以下值之一：
    - `bundled`：使用与发行版捆绑的 RapidJSON 库。这是默认设置。
    - `system`：使用系统 RapidJSON 库。需要 1.1.0 或更高版本。

    该选项是在 MySQL 8.0.13 中添加的。

- `-DWITH_RE2=re2_type`

    要包含的 RE2 库支持的类型 *.re2_type* 可以是以下值之一：
    - `bundled`：使用与发行版捆绑的 RE2 库。这是默认设置。
    - `system`：使用系统 RE2 库。

    从 MySQL 8.0.18 开始，MySQL 不再使用 RE2 库，该选项已移除。

- `-DWITH_ROUTER=bool`

    是否构建 MySQL 路由器。默认值为 `ON`。

    该选项是在 MySQL 8.0.16 中添加的。

- `-DWITH_SSL={ssl_type|path_name}`

    为了支持加密连接、生成随机数的熵以及其他加密相关操作，MySQL 必须使用 SSL 库构建。此选项指定要使用的 SSL 库。

    - *ssl_type* 可以是以下值之一：
        - `system`：使用系统 OpenSSL 库。这是默认设置。

        在 macOS 和 Windows 上，使用系统将 MySQL 配置为构建，就像调用 CMake 时使用 *path_name* 指向手动安装的 OpenSSL 库一样。这是因为它们没有系统 SSL 库。在 macOS 上，*brew install openssl* 安装到 `/usr/local/opt/openssl`，以便 `system` 可以找到它。在 Windows 上，它检查 `%ProgramFiles%/OpenSSL`、`%ProgramFiles%/OpenSSL-Win32`、`%ProgramFiles%/OpenSSL-Win64`、`C:/OpenSSL`、`C:/OpenSSL-Win32` 和 `C:/OpenSSL-Win64`。

        - `yes`：这是 `system` 的同义词。

        - `openssl[\d]`：使用备用 OpenSSL 系统包，如 EL7 上的 *openssl11* 或 EL8 上的 *openssl3*。v8.0.30 中添加了支持。

        认证插件（如 LDAP 和 Kerberos）被禁用，因为它们不支持这些 OpenSSL 的替代版本。

    - *path_name* 是要使用的 OpenSSL 安装的路径名。这可能比使用 `system` 的 *ssl_type* 值更好，因为它可以防止 CMake 检测并使用系统上安装的较旧或不正确的 OpenSSL 版本。（另一种允许的方法是将 `WITH_SSL` 设置为 `system`，并将 `CMAKE_PREFIX_PATH` 选项设置为 *path_name*。）

    有关配置 SSL 库的其他信息，参阅[章节 2.9.6，“配置 SSL 库支持”](/2/2.9/2.9.6/source-ssl-library-configuration)。

- `-DWITH_SYSTEMD=bool`

    是否启用 systemd 支持文件的安装。默认情况下，此选项处于禁用状态。启用后，将安装 systemd 支持文件，但不安装 [mysqld_safe](/4/4.3/4.3.2/mysqld-safe.html) 和 System V 初始化脚本等脚本。在 systemd 不可用的平台上，启用 `WITH_SYSTEMD` 会导致 **CMake** 出错。

    有关使用 systemd 的更多信息，参阅[章节 2.5.9，“使用 systemd 管理 MySQL Server”](/2/2.5/2.5.9/using-systemd.html)。该部分还包括有关指定之前在 [mysqld_safe] 选项组中指定的选项的信息。由于在使用 systemd 时未安装 [mysqld_safe](/4/4.3/4.3.2/mysqld-safe.html) ，因此必须以其他方式指定这些选项。

- `-DWITH_SYSTEM_LIBS=bool`

    此选项用作“保护伞”选项，用于设置以下任何未明确设置的 CMake 选项的系统值：`WITH_CURL`、`WITH_EDITLINE`、`WITH_FIDO`、`WITH_ICU`、`WITH_LIBEVENT`、`WITH_LZ4`、`WITH_IZMA`、`WITH_PROTOBUF`、`WITH_RE2`、`WITH_SSL`、`WITH_ZSTD`。

    `WITH_ZLIB` 在 v8.0.30 之前包含在此处。

- `-DWITH_SYSTEMD_DEBUG=bool`

    是否为使用 systemd 运行 MySQL 的平台生成其他 systemd 调试信息。默认值为 `OFF`。

    该选项是在 MySQL 8.0.22 中添加的。

- `-DWITH_TCMALLOC=bool`

    是否与 `-ltcmalloc` 链接。如果启用，将禁用内置 `malloc()`、`calloc()`、`realloc()` 和 `free()` 程序。默认值为 `OFF`。

    `WITH_TCMALLOC` 和 `WITH_JEMALLOC` 互斥。

    该选项是在 MySQL 8.0.22 中添加的。

- `-DWITH_TEST_TRACE_PLUGIN=bool`

    是否构建测试协议跟踪客户端插件（参阅[使用测试协议跟踪插件](https://dev.mysql.com/doc/extending-mysql/8.0/en/test-protocol-trace-plugin.html)）。默认情况下，此选项处于禁用状态。除非启用 `WITH_CLIENT_PROTOCOL_TRACING` 选项，否则启用此选项无效。如果 MySQL 配置为启用了这两个选项，则 `libmysqlclient` 客户端库将内置测试协议跟踪插件，所有标准 MySQL 客户端都将加载该插件。然而，即使启用了测试插件，默认情况下它也没有效果。使用环境变量提供对插件的控制；参阅[使用测试协议跟踪插件](https://dev.mysql.com/doc/extending-mysql/8.0/en/test-protocol-trace-plugin.html)。

    :::tip 注意
    如果要使用自己的协议跟踪插件，请*不*启用 `WITH_TEST_TRACE_PLUGIN` 选项，因为一次只能加载一个这样的插件，并且尝试加载第二个插件时会出错。如果你已经构建了 MySQL 并启用了测试协议跟踪插件以查看其工作原理，则必须在不使用该插件的情况下重新构建 MySQL，然后才能使用自己的插件。
    :::

    有关编写跟踪插件的信息，参阅[编写协议跟踪插件](https://dev.mysql.com/doc/extending-mysql/8.0/en/writing-protocol-trace-plugins.html)。

- `-DWITH_TSAN=bool`

    是否为支持 ThreadAnitizer 的编译器启用它。默认值为禁用。

- `-DWITH_UBSAN=bool`

    是否为支持它的编译器启用未定义行为清理器。默认设置为禁用。

- `-DWITH_UNIT_TESTS={ON|OFF}`

    如果启用，则使用单元测试编译 MySQL。除非未编译服务器，否则默认值为 `ON`。

- `-DWITH_UNIXODBC=1`

    为 Connector/ODBC 启用 unixODBC 支持。

- `-DWITH_VALGRIND=bool`

    是否在 Valgrind 头文件中编译，这将 Valgrind API 暴露给 MySQL 代码。默认值为 `OFF`。

    要生成 Valgrind 感知调试生成，`-DWITH_VALGRIND=1` 通常与 `-DWITH_DEBUG=1` 组合。参阅[生成调试配置](https://dev.mysql.com/doc/internals/en/debug-configurations.html)。

- `-DWITH_ZLIB=zlib_type`

    某些功能要求服务器内置压缩库支持，例如 [COMPRESS()](/12/12.14/encryption-functions.html) 和 [UNCOMPRESS()](/12/12.14/encryption-functions.html) 函数，以及客户端/服务器协议的压缩。`WITH_ZLIB` 选项表示 `zlib` 支持的来源：

    从 MySQL 8.0.30 起，支持的最低 `zlib` 版本为 1.2.12。

    - `bundled`：使用与发行版捆绑的 `zlib` 库。这是默认设置。
    - `system`：使用系统 `zlib` 库。如果 `WITH_ZLIB` 设置为该值，则不会构建 [zlib_decompress](/4/4.8/4.8.3/zlib-decompress.html) 实用程序。在这种情况下，可以改用系统 **openssl zlib** 命令。

- `-DWITH_ZSTD=zstd_type`

    使用 `zstd` 算法的连接压缩（参阅[章节，4.2.8“连接压缩控制”](/4/4.2/4.2.8/connection-compression-control.html)）要求使用 `zstd` 库支持构建服务器。`WITH_ZSTD` 选项表示 `zstd` 支持的来源：

    - `bundled`：使用发行版附带的 `zstd` 库。这是默认设置。
    - `system`：使用系统 `zstd` 库。

    该选项是在 MySQL 8.0.18 中添加的。

## 编译器标志

- `DCMAKE_C_FLAGS="flags"`

    C 编译器标志。

- `-DCMAKE_CXX_FLAGS="flags"`

    C++ 编译器标志。

- `-DWITH_DEFAULT_COMPILER_OPTIONS=bool`

    是否使用来自 `cmake/build_configurations/compiler_options.cmake` 的标志。

    :::tip 注意
    MySQL 构建团队仔细选择并测试了所有优化标志。覆盖它们可能会导致意外的结果，并且风险自负。
    :::

要指定自己的 C 和 C++ 编译器标志，对于不影响优化的标志，请使用 `CMAKE_C_FLAGS`  和 `CMAKE_CXX_FLAGS` Cmake 选项。

在提供自己的编译器标志时，可能还需要指定 `CMAKE_BUILD_TYPE`。

例如，要在 64 位 Linux 机器上创建 32 位版本构建，请执行以下操作：

```bash
mkdir bld
cd bld
cmake .. -DCMAKE_C_FLAGS=-m32 \
  -DCMAKE_CXX_FLAGS=-m32 \
  -DCMAKE_BUILD_TYPE=RelWithDebInfo
```

如果设置了影响优化的标志（-O*number*），则必须设置 `CMAKE_C_FLAGS_build_type`  和/或 `CMAKE_CXX_FLAGS_build_type` 选项，其中 *build_type* 对应于 `CMAKE_BUILD_TYPE` 值。要为默认生成类型（`RelWithDebInfo`）指定不同的优化，请设置 `CMAKE_C_FLAGS_RELWITHDEBINFO` 和 `CMAKE_CXX_FLAGS_RELWITHDEBINFO ` 选项。例如，要在 Linux 上使用 `-O3` 和调试符号进行编译，请执行以下操作：

```bash
cmake .. -DCMAKE_C_FLAGS_RELWITHDEBINFO="-O3 -g" \
  -DCMAKE_CXX_FLAGS_RELWITHDEBINFO="-O3 -g"
```

## CMake 选项用于编译 NDB 集群

以下选项适用于使用 NDB 集群支持构建 MySQL 8.0 源时。

- `-DMEMCACHED_HOME=dir_name`

    NDB 8.0.23 中删除了对 memcached 的 `NDB` 支持；因此，此版本或更高版本的 `NDB` 不再支持此选项。

- `-DNDB_UTILS_LINK_DYNAMIC={ON|OFF}`

    控制 NDB 实用程序（如 [ndb_drop_table]()）是静态（`OFF`）还是动态（`ON`）与 `ndbclient` 链接；默认设置为 `OFF`（静态链接）。通常，在构建这些时使用静态链接，以避免 `LD_LIBRARY_PATH` 问题，或者在安装了多个版本的 `ndbclient` 时。此选项用于创建 Docker 镜像，以及可能的其他情况，在这些情况下，目标环境受到精确控制，并且需要减小镜像大小。

    在 NDB 8.0.22 中添加。

- `-DWITH_BUNDLED_LIBEVENT={ON|OFF}`

    NDB 8.0.23 中删除了对 memcached 的 `NDB` 支持；因此，此版本或更高版本的 `NDB` 不再支持此选项。

- `-DWITH_BUNDLED_MEMCACHED={ON|OFF}`

    NDB 8.0.23 中删除了对 memcached 的 `NDB` 支持；因此，此版本或更高版本的 `NDB` 不再支持此选项。

- `-DWITH_CLASSPATH=path`

    设置用于构建用于 Java 的 NDB Cluster Connector 的类路径。默认值为空。如果使用 `-DWITH_NDB_JAVA=OFF`，则忽略此选项。

- `-DWITH_ERROR_INSERT={ON|OFF}`

    在 [NDB](/23//mysql-cluster.html) 内核中启用错误注入。仅用于测试；不用于构建生产二进制文件。默认值为 `OFF`。

- `-DWITH_NDB={ON|OFF}`

    构建 MySQL NDB 集群；构建 NDB 插件和所有 NDB 程序。

    在 NDB 8.0.31 中添加。

- `-DWITH_NDBAPI_EXAMPLES={ON|OFF}`

    构建 `storage/ndb/ndbapi-examples/` 中的 API 示例程序。

- `-DWITH_NDBCLUSTER_STORAGE_ENGINE={ON|OFF}`

    *NDB 8.0.30 及更早版本*：仅供内部使用；可能不总是按预期工作。要使用 NDB 支持进行构建，请改用 `WITH_NDBCLUSTER`。

    *NDB 8.0.31 及更高版本*：控制（仅）`ndbcluster` 插件是否包含在构建中；`WITH_ND` B会自动启用此选项，因此建议你改用 `WITH_NDA`。

- `-DWITH_NDBCLUSTER={ON|OFF}`

    在 [mysqld](/4/4.3/4.3.1/mysqld.html) 中构建和链接支持 [NDB](/23//mysql-cluster.html) 存储引擎。

    该选项在 NDB 8.0.31 中被废弃，最终可能会被删除；请改用 `WITH_NDB`。

- `-DWITH_NDBMTD={ON|OFF}`

    构建多线程数据节点可执行文件 [ndbmtd](/23/23.5/23.5.3/mysql-cluster-programs-ndbmtd.html)。默认值为 `ON`。

- `-DWITH_NDB_DEBUG={ON|OFF}`

    启用构建 NDB 集群二进制文件的调试版本。默认情况下为 `OFF`。

- `-DWITH_NDB_JAVA={ON|OFF}`

    支持使用 Java 支持构建 NDB 集群，包括 `ClusterJ`。

    默认情况下，此选项为 `ON`。如果不希望使用 Java 支持编译 NDB 集群，则必须在运行 **CMake** 时通过指定 `-DWITH_NDB_VAV=OFF` 来显式禁用它。否则，如果找不到 Java，则构建的配置将失败。

- `-DWITH_NDB_PORT=port`

    使构建的 NDB 集群管理服务器（[ndb_mgmd](/23/23.5/23.5.4/mysql-cluster-programs-ndb-mgmd.html)）默认使用此端口。如果未设置此选项，则生成的管理服务器将在默认情况下尝试使用端口 `1186`。

- `-DWITH_NDB_TEST={ON|OFF}`

    如果启用，请包含一组 NDB API 测试程序。默认值为 `OFF`。

- `-DWITH_PLUGIN_NDBCLUSTER={ON|OFF}`

    仅供内部使用；可能不总是按预期工作。NDB 8.0.31 中删除了该选项；使用 `WITH_NDB` 来构建 MySQL 集群。（*NDB 8.0.30 及更早版本*：使用 `WITH_NDBCLUSTER`。）

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/source-configuration-options.html)
