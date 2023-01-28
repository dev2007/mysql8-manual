# 2.5.9 使用 systemd 管理 MySQL 服务器

如果在以下 Linux 平台上使用 RPM 或 Debian 软件包安装 MySQL，服务器启动和关闭由 systemd 管理：

- RPM 包平台：
  - 企业版 Linux 变体版本7及更高版本
  - SUSE Linux 企业版服务器 12 及更高版本
  - Fedora 29 及以上
- Debian 系列平台：
  - Debian 平台
  - Ubuntu 平台

如果在使用 systemd 的平台上从通用二进制发行版安装 MySQL，则可以按照 [MySQL 8.0 安全部署指南](https://dev.mysql.com/doc/mysql-secure-deployment-guide/8.0/en/)的安装后设置部分中提供的说明手动配置对 MySQL 的 systemd 支持。

如果在使用 systemd 的平台上从源发行版安装 MySQL，请通过使用 [-DWITH_SYSTEMD=1](/2/2.9/2.9.7/source-configuration-options) **CMake** 选项配置发行版来获得对 MySQL 的 systemd 支持。参阅[章节 2.9.7，“MySQL 源配置选项”](/2/2.9/2.9.7/source-configuration-options)。

以下讨论涵盖了这些主题：

- [systemd 概览](/2/2.5/2.5.9/using-systemd.html#systemd-概览)
- [为 MySQL 配置 systemd](/2/2.5/2.5.9/using-systemd.html#为-mysql-配置-systemd)
- [使用 systemd 配置多个 MySQL 实例](/2/2.5/2.5.9/using-systemd.html#使用-systemd-配置多个-mysql-实例)
- [从 mysqld_safe 迁移到 systemd](/2/2.5/2.5.9/using-systemd.html#从-mysqld-safe-迁移到-systemd)

:::tip 注意
在安装了 MySQL 版的 systemd 支持的平台上，诸如 [mysqld_safe](/4/4.3/4.3.2/mysqld-safe) 和 System V 初始化这类脚本是非必需的，且也没有安装。例如，mysqld_safe可以处理服务器重启，但 systemd 提供了相同的功能，并以与其他服务的管理一致的方式进行，而不是使用特定于应用程序的程序。
在使用 systemd 进行服务器管理的平台上不使用 [mysqld_safe](/4/4.3/4.3.2/mysqld-safe) 的一个暗示是，不支持在选项文件中使用 `[mysqld_safe]` 或 `[safe_mysqld]` 部分，这可能会导致意外行为。
因为 systemd 能够在安装了 MySQL 版的 systemd 支持的平台上管理多个 MySQL 实例，即 [mysqld_multi](/4/4.3/4.3.4/mysqld-multi)和 **mysqld_multi.server** 是不必要的，并且没有安装。
:::

## systemd 概览

systemd 提供 MySQL 服务器的自动启动和关闭。它还使用 systemctl 命令启用手动服务器管理。例如：

```bash
$> systemctl {start|stop|restart|status} mysqld
```

或者，使用与 System V 系统兼容的 service 命令（参数反转）：

```bash
$> service mysqld {start|stop|restart|status}
```

:::tip 注意
对于 systemctl 命令（以及备用 **service** 命令），如果 MySQL 服务名称不是 mysqld，则使用适当的名称。例如，在基于 Debian 和 SLES 系统上使用 `mysql` 而不是 `mysqld`。
:::

对 systemd 的支持包括以下文件：

- `mysqld.service`（RPM 平台）、`mysql.service`（Debian 平台）：systemd 服务单元配置文件，包含 MySQL 服务的详细信息。
- `mysqld@.service`（RPM 平台），`mysql@.service`（Debian 平台）：比如 mysqld.service 或 mysql.service，但用于管理多个 MySQL 实例。
- `mysqld.tmpfiles.d`： 包含支持 `tmpfiles` 功能的信息的文件。此文件以名称 `mysql.conf` 安装。
- `mysqld_pre_systemd`（RPM 平台）、`mysql-system-start`（Debian 平台）：支持单元文件的脚本。只有当日志位置与模式匹配时，此脚本才有助于创建错误日志文件（对于 RPM 平台为 `/var/log/mysql*.log`，对于 Debian 平台为 `/var/log/mysql/*.log`）。在其他情况下，错误日志目录必须是可写的，或者对于运行 [mysqld](/4/4.3/4.3.1/mysqld) 进程的用户，错误日志必须存在且可写。

## 为 MySQL 配置 systemd

要添加或更改MySQL的systemd选项，可以使用以下方法：

- 使用本地化的 systemd 配置文件。
- 安排 systemd 为 MySQL 服务器进程设置环境变量。
- 设置 `MYSQLD_OPTS` systemd 变量。
- 要使用本地化的systemd配置文件，请创建 `/etc/systemd/system/mysqld.service.d` 目录（如果不存在）。在该目录中，创建一个文件，其中包含列出所需设置的 `[Service]` 部分。例如：

```bash
[Service]
LimitNOFILE=max_open_files
Nice=nice_level
LimitCore=core_file_limit
Environment="LD_PRELOAD=/path/to/malloc/library"
Environment="TZ=time_zone_setting"
```

此处的讨论使用 `override.conf` 作为此文件的名称。较新版本的 systemd 支持以下命令，该命令将打开编辑器并允许你编辑文件：

```bash
systemctl edit mysqld  # RPM platforms
systemctl edit mysql   # Debian platforms
```

无论何时创建或更改 `override.conf`，重新加载 systemd 配置，然后告诉 systemd 重新启动 MySQL 服务：

```bash
systemctl daemon-reload
systemctl restart mysqld  # RPM platforms
systemctl restart mysql   # Debian platforms
```

对于 systemd，`override.conf` 配置方法必须用于确定的参数，而不是 MySQL 选项文件中的 `[mysqld]`、`[mysqld_safe]` 或 `[safe_mysqld]` 组中的设置：

- 对于某些参数，必须使用 `override.conf`，因为 systemd 本身必须知道它们的值，又不能读取 MySQL 选项文件来获取它们。
- 指定值的参数只能使用 [mysqld_safe](/4/4.3/4.3.2/mysqld-safe) 已知的选项设置，必须使用 systemd 指定，因为没有相应的 [mysqld](/4/4.3/4.3.1/mysqld) 参数。

更多使用 systemd 而不是 mysqld_safe 的信息，参阅[从 mysqld_safe 迁移到 systemd](/2/2.5/2.5.9/using-systemd.html#从-mysqld-safe-迁移到-systemd)。

你可以在 `override.conf` 中设置以下参数：

- 要设置 MySQL 服务器可用的文件描述符数量，请在 `override.conf` 中使用 `LimitNOFILE` 而不是 [mysqld](/4/4.3/4.3.1/mysqld) 的 [open_files_limit](/5/5.1/5.1.8/server-system-variables) 系统变量，或者 [mysqld_safe](/4/4.3/4.3.2/mysqld-safe) 的 [--open-files_limit](/4/4.3/4.3.2/mysqld-safe) 选项。
- 要设置最大核心文件大小，请在 `override.conf` 中使用 `LimitCore`，而不是 [mysqld_safe](/4/4.3/4.3.2/mysqld-safe) 的 [--core-file-size](/4/4.3/4.3.2/mysqld-safe) 选项。
- 要设置 MySQL 服务器的调度优先级，请在 `override.conf` 中使用 `Nice` 而不是 [mysqld_safe](/4/4.3/4.3.2/mysqld-safe) 的 [--nice](/4/4.3/4.3.2/mysqld-safe) 选项。

一些 MySQL 参数是使用环境变量配置的：

- `LD_PRELOAD`：如果 MySQL 服务器应该使用特定的内存分配库，则设置此变量。
- `NOTIFY_SOCKET`：此环境变量指定 [mysqld](/4/4.3/4.3.1/mysqld) 用于与 systemd 通信启动完成通知和服务状态更改通知的套接字。当 [mysqld](/4/4.3/4.3.1/mysqld) 服务启动时，它由 systemd 设置。[mysqld](/4/4.3/4.3.1/mysqld) 服务读取变量设置并写入定义的位置。

  在 MySQL 8.0 中，[mysqld](/4/4.3/4.3.1/mysqld) 使用 `Type=notify` 进程启动类型。（MySQL 5.7 中使用了 `Type=forking`。）使用 `Type=notify`，systemd 会自动配置套接字文件并将路径导出到 `NOTIFY_SOCKET` 环境变量。
- `TZ`：设置此变量以指定服务器的默认时区。

有多种方法可以指定由 systemd 管理的 MySQL 服务器进程使用的环境变量值：

- 在 `override.conf` 文件中使用 `Environment` 线。有关语法，参阅前面讨论中描述如何使用此文件的示例。
- 在 `/etc/sysconfig/mysql` 文件中指定值（如果文件不存在，则创建该文件）。使用以下语法分配值：

```bash
LD_PRELOAD=/path/to/malloc/library
TZ=time_zone_setting
```

修改 `/etc/sysconfig/mysql` 后，重新启动服务器以使更改生效：

```bash
systemctl restart mysqld  # RPM platforms
systemctl restart mysql   # Debian platforms
```

要在不直接修改 systemd 配置文件的情况下为 [mysqld](/4/4.3/4.3.1/mysqld) 指定选项，请设置或取消设置 `MYSQLD_OPTS` systemd 变量。例如：

```bash
systemctl set-environment MYSQLD_OPTS="--general_log=1"
systemctl unset-environment MYSQLD_OPTS
```

也可以在 `/etc/sysconfig/mysql` 文件中设置 `MYSQLD_OPTS`。
修改 systemd 环境后，重新启动服务器以使更改生效：

```bash
systemctl restart mysqld  # RPM platforms
systemctl restart mysql   # Debian platforms
```

对于使用 systemd 的平台，如果服务器启动时数据目录为空，则会进行初始化。如果数据目录是暂时消失的远程装载，这可能是一个问题：装载点将显示为空数据目录，然后将其初始化为新的数据目录。要禁止这种自动初始化行为，请在 `/etc/sysconfig/mysql` 文件中指定以下行（如果文件不存在，请创建该文件）：

```bash
NO_INIT=true
```

## 使用 systemd 配置多个 MySQL 实例

本节介绍如何为多个 MySQL 实例配置 systemd。

:::tip 注意
因为 systemd 能够在安装了 systemd 支持的平台上管理多个 MySQL 实例，即 [mysqld_multi](/4/4.3/4.3.4/mysqld-multi) 和 **mysqld_multi.server** 是不必要的，并且没有安装。
:::

要使用多实例功能，请修改 `my.cnf` 选项文件以包括每个实例的键选项配置。这些文件位置是典型的：

- `/etc/my.cnf` 或 `/etc/mysql/my.conf`（RPM 平台）
- `/etc/mysql/mysql.conf.d/mysqld.cnf`（Debian 平台）

例如，要管理名为 `replica01` 和 `replica02` 的两个实例，请在选项文件中添加如下内容：

RPM 平台：

```bash
[mysqld@replica01]
datadir=/var/lib/mysql-replica01
socket=/var/lib/mysql-replica01/mysql.sock
port=3307
log-error=/var/log/mysqld-replica01.log

[mysqld@replica02]
datadir=/var/lib/mysql-replica02
socket=/var/lib/mysql-replica02/mysql.sock
port=3308
log-error=/var/log/mysqld-replica02.log
```

Debian 平台：

```bash
[mysqld@replica01]
datadir=/var/lib/mysql-replica01
socket=/var/lib/mysql-replica01/mysql.sock
port=3307
log-error=/var/log/mysql/replica01.log

[mysqld@replica02]
datadir=/var/lib/mysql-replica02
socket=/var/lib/mysql-replica02/mysql.sock
port=3308
log-error=/var/log/mysql/replica02.log
```

此处显示的副本名称使用 `@` 作为分隔符，因为这是 systemd 支持的唯一分隔符。

然后，实例由正常的 systemd 命令管理，例如：

```bash
systemctl start mysqld@replica01
systemctl start mysqld@replica02
```

要使实例在启动时运行，请执行以下操作：

```bash
systemctl enable mysqld@replica01
systemctl enable mysqld@replica02
```

还支持使用通配符。例如，此命令显示所有复制副本实例的状态：

```bash
systemctl status 'mysqld@replica*'
```

为了管理同一台机器上的多个 MySQL 实例，systemd 会自动使用不同的单元文件：

- `mysqld@.service` 而不是 `mysqld.service`（RPM 平台）
- `mysql@.service` 而不是 `mysql.service`（Debian 平台）

在单元文件中，`%I` 和 `%i` 引用了在 `@` 标记之后传入的参数，用于管理特定实例。对于这样的命令：

```bash
systemctl start mysqld@replica01
```

systemd 使用以下命令启动服务器：

```bash
mysqld --defaults-group-suffix=@%I ...
```

结果是 `[server]`、`[mysqld]` 和 `[mysqld@replica01]` 选项组被读取并用于该服务实例。

:::tip 注意
在 Debian 平台上，AppArmor 阻止服务器读取或写入 `/var/lib/mysql-replica*` 或其他任何非默认位置。要解决此问题，必须在 `/etc/apparmor.d/usr.sbin.mysqld` 中自定义或禁用配置文件。
:::

:::tip 注意
在 Debian 平台上，MySQL 卸载的打包脚本当前无法处理 `mysqld@` 实例。在删除或升级包之前，必须先手动停止任何额外的实例。
:::

## 从 mysqld_safe 迁移到 systemd

由于 [mysqld_safe](/4/4.3/4.3.2/mysqld-safe) 未安装在使用 systemd 管理 MySQL 的平台上，因此之前为该程序指定的选项（例如，在 `[mysqld_safe]` 或 `[safe_mysqld]` 选项组中）必须以其他方式指定：

- 一些 [mysqld_safe](/4/4.3/4.3.2/mysqld-safe) 选项也能被 [mysqld](/4/4.3/4.3.1/mysqld) 解读，可以从 `[mysqld_safe]` 或 `[safe_mysqld]` 选项组移动到 `[mysqld]` 组。这*不*包括 [--pid-file](/4/4.3/4.3.2/mysqld-safe)、[--open-files-limit](/4/4.3/4.3.2/mysqld-safe) 或 [--nice](/4/4.3/4.3.2/mysqld-safe)。要指定这些选项，请使用 `override.conf` systemd文件，如前所述。

:::tip 注意
在 systemd 平台上，不支持使用 `[mysqld_safe]` 和 `[safe_mysqld]` 选项组，可能会导致意外行为。
:::

- 对于一些 [mysqld_safe](/4/4.3/4.3.2/mysqld-safe) 选项，有其他 [mysqld](/4/4.3/4.3.1/mysqld) 过程。例如，用于启用 `syslog` 日志记录的 [mysqld_safe](/4/4.3/4.3.2/mysqld-safe) 选项是 [--syslog](/4/4.3/4.3.2/mysqld-safe)，已弃用。要将错误日志输出写入系统日志，请使用[章节 5.4.2.8，“错误日志写入系统日志”](/5/5.4/5.4.2/5.4.2.8/error-log-syslog)中的说明。

- [mysqld](/4/4.3/4.3.1/mysqld) 无法解读的 [mysqld_safe](/4/4.3/4.3.2/mysqld-safe) 选项可以在 `override.conf` 或环境变量中指定。例如，对于 [mysqld_safe](/4/4.3/4.3.2/mysqld-safe)，如果服务器应该使用特定的内存分配库，则使用 [--malloc-lib](/4/4.3/4.3.2/mysqld-safe) 选项指定。对于使用 systemd 管理服务器的安装，请按照前面所述安排设置 `LD_PRELOAD` 环境变量。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/using-systemd.html)
