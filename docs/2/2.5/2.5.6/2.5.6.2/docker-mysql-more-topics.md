# 2.5.6.2 关于使用 Docker 部署 MySQL 服务的更多主题

::: tip 注意
以下大多数示例命令都将 `mysql/mysql-server` 作为 Docker 镜像仓库（如 **docker pull** 和 **docker run** 命令）；如果你的镜像来自另一个仓库，请将其替换为 `container-registry.oracle.com/mysql/enterprise` 服务器，用于从 Oracle 容器注册表（OCR）下载的 MySQL 企业版镜像，或从[我的 Oracle 支持](https://support.oracle.com/)下载的，用于 MySQL 企业版镜像的 `mysql/enterprise-server`。
:::

- [为 Docker 优化的 MySQL 安装](/2/2.5/2.5.6/2.5.6.2/docker-mysql-more-topics.html#为-Docker-优化的-MySQL-安装)

- [配置 MySQL 服务器](/2/2.5/2.5.6/2.5.6.2/docker-mysql-more-topics.html#配置-MySQL-服务器)

- [持久化数据和配置更改](/2/2.5/2.5.6/2.5.6.2/docker-mysql-more-topics.html#持久化数据和配置更改)

- [运行其他初始化脚本](/2/2.5/2.5.6/2.5.6.2/docker-mysql-more-topics.html#运行其他初始化脚本)

- [从另一个 Docker 容器应用连接到 MySQL](/2/2.5/2.5.6/2.5.6.2/docker-mysql-more-topics.html#从另一个-Docker-容器应用连接到-MySQL)

- [服务器错误日志](/2/2.5/2.5.6/2.5.6.2/docker-mysql-more-topics.html#服务器错误日志)

- [Docker 中使用 MySQL 企业备份](/2/2.5/2.5.6/2.5.6.2/docker-mysql-more-topics.html#Docker-中使用-MySQL-企业备份)

- [Docker 中使用 mysqldump](/2/2.5/2.5.6/2.5.6.2/docker-mysql-more-topics.html#Docker-中使用-mysqldump)

- [已知问题](/2/2.5/2.5.6/2.5.6.2/docker-mysql-more-topics.html#已知问题)

- [Docker 环境变量](/2/2.5/2.5.6/2.5.6.2/docker-mysql-more-topics.html#Docker-环境变量)

## 为 Docker 优化的 MySQL 安装

针对 MySQL 的 Docker 镜像针对代码大小进行了优化，这意味着它们只包含与大多数在 Docker 容器中运行 MySQL 实例的用户相关的关键组件。MySQL Docker 安装与普通非 Docker 的安装在以下方面有所不同：

- 包含的二进制文件限于：

  - `/usr/bin/my_print_defaults`

  - `/usr/bin/mysql`

  - `/usr/bin/mysql_config`

  - `/usr/bin/mysql_install_db`

  - `/usr/bin/mysql_tzinfo_to_sql`

  - `/usr/bin/mysql_upgrade`

  - `/usr/bin/mysqladmin`

  - `/usr/bin/mysqlcheck`

  - `/usr/bin/mysqldump`

  - `/usr/bin/mysqlpump`

  - `/usr/bin/mysqlbackup` (仅用于 MySQL 企业版 8.0 )

  - `/usr/sbin/mysqld`

- 所有二进制文件被剥离；它们不包含调试信息。

## 配置 MySQL 服务器

启动 MySQL Docker 容器时，可以通过 **docker run** 命令将配置选项传递给服务器。例如：

```bash
docker run --name mysql1 -d mysql/mysql-server:tag --character-set-server=utf8mb4 --collation-server=utf8mb4_col
```

该命令启动 MySQL 服务器，将 `utf8mb4` 作为默认字符集，并将 `utf8mb4_col` 作为数据库的默认排序规则。

配置 MySQL 服务器的另一种方法是准备一个配置文件，并将其安装在容器中服务器配置文件的位置。有关详细信息，参阅[持久化数据和配置更改](/2/2.5/2.5.6/2.5.6.2/docker-mysql-more-topics.html#持久化数据和配置更改)。

## 持久化数据和配置更改

Docker 容器原则上是短暂的，如果容器被删除或损坏，任何数据或配置都将丢失（参阅此处的[讨论](https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices/)）。[Docker 卷](https://docs.docker.com/engine/admin/volumes/volumes/)提供了一种持久化 Docker 容器内创建的数据的机制。在初始化时，MySQL 服务器容器为服务器数据目录创建一个 Docker 卷。容器上 **docker inspect** 命令的 JSON 输出包括一个 `Mount` 键，其值提供数据目录卷的信息：

```bash
$> docker inspect mysql1
...
 "Mounts": [
            {
                "Type": "volume",
                "Name": "4f2d463cfc4bdd4baebcb098c97d7da3337195ed2c6572bc0b89f7e845d27652",
                "Source": "/var/lib/docker/volumes/4f2d463cfc4bdd4baebcb098c97d7da3337195ed2c6572bc0b89f7e845d27652/_data",
                "Destination": "/var/lib/mysql",
                "Driver": "local",
                "Mode": "",
                "RW": true,
                "Propagation": ""
            }
        ],
...
```

输出显示源目录 `/var/lib/docker/volumes/4f2d463cfc4bdd4baebcb098c97d7da3337195ed2c6572bc0b89f7e845d27652/_data`（其中数据保存在主机上）已安装在容器内的服务器数据目录 `/var/lib/mysql`。

另一种保存数据的方法是在创建容器时使用 `--mount` 选项绑定挂载主机目录。可以使用相同的技术来持久化服务器的配置。以下命令创建一个 MySQL 服务器容器，并绑定数据目录和服务器配置文件：

```bash
docker run --name=mysql1 \
--mount type=bind,src=/path-on-host-machine/my.cnf,dst=/etc/my.cnf \
--mount type=bind,src=/path-on-host-machine/datadir,dst=/var/lib/mysql \
-d mysql/mysql-server:tag
```

该命令在 `/etc/my.cnf`（容器内的服务器配置文件）处挂载 `path-on-host-machine/my.cnf`，并在主机 `/datadir/var/lib/mysql`（容器内数据目录）上挂载 `path-on-host-machine/datadir`。绑定挂载工作必须满足以下条件：

- 配置文件 `path-on-host-machine/my.cnf` 必须已经存在，并且必须包含用户 `mysql` 启动服务器的规范：

```bash
[mysqld]
user=mysql
```

你还可以在文件中包含其他服务器配置选项。

- 数据目录 `path-on-host-machine/datadir` 必须已经存在。要进行服务器初始化，目录必须为空。你还可以挂载预先填充了数据的目录，并用它启动服务器；但是，你必须确保使用与创建数据的服务器相同的配置启动 Docker 容器，并且在启动容器时安装所需的任何主机文件或目录。

## 运行其他初始化脚本

如果有任何 `.sh` 或 `.sql` 脚本要在创建后立即在数据库上运行，则可以将它们放入主机目录中，然后将目录挂载到容器中的 `/docker-entrypoint-initdb.d/` 位置。例如：

```bash
docker run --name=mysql1 \
--mount type=bind,src=/path-on-host-machine/scripts/,dst=/docker-entrypoint-initdb.d/ \
-d mysql/mysql-server:tag
```

## 从另一个 Docker 容器应用连接到 MySQL

通过设置 Docker 网络，你可以允许多个 Docker 容器相互通信，以便另一个 Docker 容器中的客户端应用程序可以访问服务器容器中的 MySQL 服务器。首先，创建 Docker 网络：

```bash
docker network create my-custom-net
```

然后，在创建和启动服务器和客户机容器时，使用 `--network` 选项将它们放在你创建的网络上。例如：

```bash
docker run --name=mysql1 --network=my-custom-net -d mysql/mysql-server
```

```bash
docker run --name=myapp1 --network=my-custom-net -d myapp
```

然后，`myapp1` 容器可以使用 `mysql1` 主机名连接到 `mysql1` 容器，反之亦然，因为 Docker 会自动为给定的容器名称设置 DNS。在下面的示例中，我们从 `myapp1` 容器内部运行 [mysql](/4/4.5/4.5.1/mysql.html) 客户端，以连接到自己容器中的主机 `mysql1`：

```bash
docker exec -it myapp1 mysql --host=mysql1 --user=myuser --password
```

有关容器的其他网络技术，参阅 Docker 文档中的 [Docker 容器网络](https://docs.docker.com/engine/userguide/networking/)部分。

## 服务器错误日志

当使用服务器容器首次启动 MySQL 服务器时，如果以下任一条件为真，则不会生成服务器错误日志：

- 已装载主机的服务器配置文件，但该文件不包含系统变量 [log_error](/5/5.1/5.1.8/server-system-variables.html)（参阅绑定装载服务器配置文件时的[持久数据和配置更改](/2/2.5/2.5.6/2.5.6.2/docker-mysql-more-topics.html#持久化数据和配置更改)）。

- 来自主机的服务器配置文件尚未挂载，但 Docker 环境变量 [MYSQL_LOG_CONSOLE](/2/2.5/2.5.6/2.5.6.2/docker-mysql-more-topics.html#Docker-环境变量) 为true（这是 MYSQL 8.0 服务器容器的默认状态）。然后，MySQL 服务器的错误日志被重定向到 stderr，以便错误日志进入 Docker 容器的日志，并可以使用 `docker logs mysqld-container` 容器命令查看。

要使 MySQL 服务器在这两个条件之一为真时生成错误日志，请使用 [--log-error](/5/5.1/5.1.7/server-options.html) 选项将[配置服务器](/2/2.5/2.5.6/2.5.6.2/docker-mysql-more-topics.html#配置-MySQL-服务器)为在容器内的特定位置生成错误日志。要持久化错误日志，请在容器内的错误日志位置安装主机文件，如[持久数据和配置更改](/2/2.5/2.5.6/2.5.6.2/docker-mysql-more-topics.html#持久化数据和配置更改)中所述。但是，你必须确保容器中的 MySQL 服务器对装载的主机文件具有写访问权限。

## Docker 中使用 MySQL 企业备份

[MySQL 企业备份](https://dev.mysql.com/doc/mysql-enterprise-backup/8.0/en/)是 MySQL 服务器的商业授权备份实用程序，可与 [MySQL 企业版](https://dev.mysql.com/doc/mysql-enterprise-backup/8.0/en/)一起使用。MySQL 企业备份包含在 MySQL 企业版的 Docker 安装中。

在下面的示例中，我们假设你已经在 Docker 容器中运行了 MySQL 服务器（参阅[章节 2.5.6.1，“使用 Docker 部署 MySQL 服务器的基本步骤”](/2/2.5/2.5.6/2.5.6.1/docker-mysql-getting-started.html)，了解如何使用 Docker 启动 MySQL 服务器实例）。为了使 MySQL 企业备份能够备份 MySQL 服务器，它必须能够访问服务器的数据目录。例如，可以通过在启动服务器时[将主机目录绑定到 MySQL 服务器的数据目录](/2/2.5/2.5.6/2.5.6.2/docker-mysql-more-topics.html#持久化数据和配置更改)来实现：

```bash
docker run --name=mysqlserver \
--mount type=bind,src=/path-on-host-machine/datadir/,dst=/var/lib/mysql \
-d mysql/enterprise-server:8.0
```

使用此命令，MySQL 服务器将使用 MySQL 企业版的 Docker 镜像启动，主机目录 */path-on-host-machine/datadir/* 已安装到服务器容器内的服务器数据目录（`/var/lib/mysql`）。我们还假设，在服务器启动后，还为 MySQL 企业备份设置了访问服务器所需的权限（有关详细信息，参阅[向备份管理员授予 MySQL 权限](/4/4.1/4.1.2/mysqlbackup.privileges)）。使用以下步骤备份和恢复 MySQL 服务器实例。

要使用 Docker 中使用 MySQL 企业备份在 Docker 容器中运行的 MySQL 服务器实例，请执行以下步骤：

1. 在运行 MySQL 服务器容器的同一主机上，使用 MySQL 企业版的镜像启动另一个容器，以使用 MySQL 企业备份命令 [backup-to-image](/19/19.1/backup-commands-backup) 执行备份。使用我们在上一步中创建的绑定挂载提供对服务器数据目录的访问。此外，将主机目录（在本例中为 `/path-on-host-machine/backups/`）挂载到容器中的备份存储文件夹（在本示例中为 `/data/backups`），以持久化我们正在创建的备份。以下是此步骤的示例命令，其中 MySQL 企业备份使用从[我的 Oracle 支持](https://support.oracle.com/)下载的 Docker 镜像启动）：

```bash
$> docker run \
--mount type=bind,src=/path-on-host-machine/datadir/,dst=/var/lib/mysql \
--mount type=bind,src=/path-on-host-machine/backups/,dst=/data/backups \
--rm mysql/enterprise-server:8.0 \
mysqlbackup -umysqlbackup -ppassword --backup-dir=/tmp/backup-tmp --with-timestamp \
--backup-image=/data/backups/db.mbi backup-to-image

[Entrypoint] MySQL Docker Image 8.0.11-1.1.5
MySQL Enterprise Backup version 8.0.11 Linux-4.1.12-61.1.16.el7uek.x86_64-x86_64 [2018-04-08  07:06:45]
Copyright (c) 2003, 2018, Oracle and/or its affiliates. All Rights Reserved.

180921 17:27:25 MAIN    INFO: A thread created with Id '140594390935680'
180921 17:27:25 MAIN    INFO: Starting with following command line ...
...

-------------------------------------------------------------
   Parameters Summary
-------------------------------------------------------------
   Start LSN                  : 29615616
   End LSN                    : 29651854
-------------------------------------------------------------

mysqlbackup completed OK!
```

重要的是检查 **mysqlbackup** 输出的结尾，以确保备份已成功完成。

2. 一旦备份作业完成，容器就会退出，并且使用 `--rm` 选项启动它，容器在退出后就会被删除。镜像备份已经创建，可以在上一步挂载的用于保存备份的主机目录中找到，如下所示:

```bash
$> ls /tmp/backups
db.mbi
```

要在 Docker 容器中使用 MySQL 企业版备份恢复 MySQL 服务器实例，请遵循下面列出的步骤:

1. 停止 MySQL 服务器容器，它也会停止 MySQL 服务器运行:

```bash
docker stop mysqlserver
```

2. 在主机上，删除 MySQL 服务器数据目录的绑定挂载中的所有内容:

```bash
rm -rf /path-on-host-machine/datadir/*
```

3. 启动一个带有 MySQL 企业版镜像的容器，使用 MySQL 企业版备份命令 [copy-back-apply-log](/19/19.3/backup-commands-restore) 执行恢复。绑定挂载服务器的数据目录和备份的存储文件夹，就像我们备份服务器时所做的那样:

```bash
$> docker run \
--mount type=bind,src=/path-on-host-machine/datadir/,dst=/var/lib/mysql \
--mount type=bind,src=/path-on-host-machine/backups/,dst=/data/backups \
--rm mysql/enterprise-server:8.0 \
mysqlbackup --backup-dir=/tmp/backup-tmp --with-timestamp \
--datadir=/var/lib/mysql --backup-image=/data/backups/db.mbi copy-back-and-apply-log

[Entrypoint] MySQL Docker Image 8.0.11-1.1.5
MySQL Enterprise Backup version 8.0.11 Linux-4.1.12-61.1.16.el7uek.x86_64-x86_64 [2018-04-08  07:06:45]
Copyright (c) 2003, 2018, Oracle and/or its affiliates. All Rights Reserved.

180921 22:06:52 MAIN    INFO: A thread created with Id '139768047519872'
180921 22:06:52 MAIN    INFO: Starting with following command line ...
...
180921 22:06:52 PCR1    INFO: We were able to parse ibbackup_logfile up to
          lsn 29680612.
180921 22:06:52 PCR1    INFO: Last MySQL binlog file position 0 155, file name binlog.000003
180921 22:06:52 PCR1    INFO: The first data file is '/var/lib/mysql/ibdata1'
                              and the new created log files are at '/var/lib/mysql'
180921 22:06:52 MAIN    INFO: No Keyring file to process.
180921 22:06:52 MAIN    INFO: Apply-log operation completed successfully.
180921 22:06:52 MAIN    INFO: Full Backup has been restored successfully.

mysqlbackup completed OK! with 3 warnings
```

一旦备份作业完成，容器就会退出，并且在启动它时使用 `--rm` 选项，它会在退出后被删除。

4. 重启服务器容器，服务器容器也会重启恢复的服务器，可以使用以下命令:

```bash
docker restart mysqlserver
```

或者，在恢复的数据目录上启动一个新的 MySQL 服务器，如下所示:

```bash
docker run --name=mysqlserver2 \
--mount type=bind,src=/path-on-host-machine/datadir/,dst=/var/lib/mysql \
-d mysql/enterprise-server:8.0
```

## Docker 中使用 mysqldump

除了[使用 MySQL 企业备份来备份运行在 Docker 容器中的 MySQL 服务器](/2/2.5/2.5.6/2.5.6.2/docker-mysql-more-topics.html#Docker-中使用-MySQL-企业备份)，你还可以使用运行在 Docker 容器中的 [mysqldump](/4/4.5/4.5.4/mysqldump) 工具来对服务器进行逻辑备份。

下面的说明假设你已经在 Docker 容器中运行了一个 MySQL 服务器，并且当容器第一次启动时，一个主机目录 */path-on-host-machine/datadir/* 已经挂载到服务器的数据目录 `/var/lib/mysql` 上(详细信息参阅[在 MySQL 服务器的数据目录上绑定挂载一个主机目录](/2/2.5/2.5.6/2.5.6.2/docker-mysql-more-topics.html#持久化数据和配置更改))，该目录包含Unix套接字文件，[mysqldump](/4/4.5/4.5.4/mysqldump) 和 [mysql](/4/4.5/4.5.1/mysql) 可以通过该套接字文件连接到服务器。我们还假设，在服务器启动之后，创建了一个具有适当权限的用户(在本例中为 `admin`)， mysqldump 可以通过该用户访问服务器。备份和恢复 MySQL 服务器数据的操作步骤如下:

*在 Docker 中使用 [mysqldump](/4/4.5/4.5.4/mysqldump) 备份 MySQL 服务器数据:*

1. 在 MySQL 服务器容器运行的同一台主机上，用 MySQL 服务器的镜像启动另一个容器，使用 [mysqldump](/4/4.5/4.5.4/mysqldump) 实用程序执行备份(有关其功能、选项和限制，参阅该实用程序的文档)。通过绑定挂载 */path-on-host-machine/datadir/* 提供对服务器数据目录的访问。另外，将一个主机目录(本例中为 */path-on-host-machine/backups/*)挂载到容器内用于备份的存储文件夹上(本例中使用 `/data/backups`)，以持久化所创建的备份。下面是使用此设置备份服务器上所有数据库的示例命令:

```bash
$> docker run --entrypoint "/bin/sh" \ 
--mount type=bind,src=/path-on-host-machine/datadir/,dst=/var/lib/mysql \
--mount type=bind,src=/path-on-host-machine/backups/,dst=/data/backups \
--rm mysql/mysql-server:8.0 \
-c "mysqldump -uadmin --password='password' --all-databases > /data/backups/all-databases.sql"
```

在该命令中，使用 `--entrypoint` 选项，以便在容器启动后调用系统 shell，使用 `-c` 选项指定要在 shell 中运行的 [mysqldump](/4/4.5/4.5.4/mysqldump) 命令，该命令的输出将被重定向到备份目录中的 `all-databases.sql`文件。

2. 一旦备份作业完成，容器就会退出，并且使用 `--rm` 选项启动它，容器在退出后就会被删除。创建了一个逻辑备份，可以在用于存储备份的挂载的主机目录中找到，如下所示:

```bash
$> ls /path-on-host-machine/backups/
all-databases.sql
```

*在 Docker 使用 [mysqldump](/4/4.5/4.5.4/mysqldump) 恢复 MySQL 服务器数据:*

1. 确保 MySQL 服务器在容器中运行，你希望将备份数据恢复到该容器上。

2. 用 MySQL 服务器的镜像启动一个容器，用 MySQL 客户端执行恢复。绑定挂载服务器的数据目录，以及包含备份的存储文件夹:

```bash
$> docker run  \
--mount type=bind,src=/path-on-host-machine/datadir/,dst=/var/lib/mysql \
--mount type=bind,src=/path-on-host-machine/backups/,dst=/data/backups \
--rm mysql/mysql-server:8.0 \
mysql -uadmin --password='password' -e "source /data/backups/all-databases.sql"
```

一旦备份任务完成，容器就退出，并且在启动它时使用 `--rm` 选项，在它退出后将其删除。

3. 登录到服务器，检查恢复的数据现在已经在服务器上。

## 已知问题

当使用服务器系统变量 [audit_log_file](/6/6.4/6.4.5/6.4.5.11/audit-log-reference)配置审计日志文件名时，使用 `loose` [选项修饰符](/4/4.2/4.2.2/4.2.2.4/option-modifiers);否则，Docker 无法启动服务器。

## Docker 环境变量

当你创建 MySQL 服务器容器时，你可以使用 `--env` 选项(简写形式 `-e`)并指定一个或多个环境变量来配置 MySQL 实例。如果挂载的数据目录不为空，则不执行服务器初始化，在这种情况下，设置任何这些变量都不起作用(参阅[持久化数据和配置更改](/2/2.5/2.5.6/2.5.6.2/docker-mysql-more-topics.html#持久化数据和配置更改))，并且在容器启动期间不会修改目录的现有内容(包括服务器设置)。

可以用来配置 MySQL 实例的环境变量如下:

- 布尔变量包括 `MYSQL_RANDOM_ROOT_PASSWORD`、`[`MYSQL_ONETIME_PASSWORD`、`MYSQL_ALLOW_EMPTY_PASSWORD` 和 `MYSQL_LOG_CONSOLE` 通过使用任何非零长度的字符串来设置它们，使其为真。因此，将它们设置为“0”、“false” 或 “no” 并不会使它们为假，而是实际上使它们为真。这是一个众所周知的问题。

- `MYSQL_RANDOM_ROOT_PASSWORD`：当该变量为 true(这是它的默认状态，除非 `MYSQL_ROOT_PASSWORD` 被设置或 `MYSQL_ALLOW_EMPTY_PASSWORD` 被设置为 true)时，在 Docker 容器启动时为服务器的 root 用户生成一个随机密码。密码被打印到容器的 `stdout`，可以通过查看容器的日志找到(参阅[启动 MySQL 服务器实例](/2/2.5/2.5.6/2.5.6.2/docker-mysql-getting-started.html#启动 MySQL 服务器实例))。

- `MYSQL_ONETIME_PASSWORD`：当变量为 true(这是它的默认状态，除非 `MYSQL_ROOT_PASSWORD` 被设置或 `MYSQL_ALLOW_EMPTY_PASSWORD` 被设置为 true)时，root 用户的密码被设置为过期，必须修改后 MySQL 才能正常使用。

- `MYSQL_DATABASE`：这个变量允许你指定要在镜像启动时创建的数据库的名称。如果 `MYSQL_USER和MYSQL_PASSWORD` 提供了用户名和密码，则创建该用户并授予对该数据库的超级用户访问权(对应于 `GRANT ALL`)。指定的数据库是通过 [CREATE database IF NOT EXIST](/13/13.1/13.1.12/create-database) 语句创建的，因此如果数据库已经存在，则该变量将不起作用。

- `MYSQL_USER`、`MYSQL_PASSWORD`：这些变量一起用来创建一个用户并设置该用户的密码，并且该用户被授予 `MYSQL_DATABASE` 变量指定的数据库的超级用户权限。要创建用户，`MYSQL_USER` 和 `MYSQL_PASSWORD` 都是必需的——如果没有设置这两个变量中的任何一个，则忽略另一个。如果两个变量都设置了，但 `MYSQL_DATABASE` 没有设置，则创建的用户没有任何特权。

::: tip 注意
不需要使用这种机制来创建 root 超级用户，默认情况下创建 root 超级用户时使用的密码由 `MYSQL_ROOT_PASSWORD` 和 `MYSQL_RANDOM_ROOT_PASSWORD` 描述中讨论的任何一种机制设置，除非 `MYSQL_ALLOW_EMPTY_PASSWORD` 为 true。
:::

- `MYSQL_ROOT_HOST`：默认情况下，MySQL 创建 `'root'@'localhost'` 帐户。该帐户只能从容器内连接，如[从容器内连接 MySQL 服务器](/2/2.5/2.5.6/2.5.6.2/docker-mysql-more-topics.html#从另一个-Docker-容器应用连接到-MySQL)中所述。若要允许来自其他主机的 root 连接，请设置此环境变量。例如，值 `172.17.0.1` 是默认的 Docker 网关 IP，它允许来自运行容器的主机的连接。该选项只接受一个条目，但是允许通配符(例如，`MYSQL_ROOT_HOST=172.*.*.*` 或 `MYSQL_ROOT_HOST=%`)。

- `MYSQL_LOG_CONSOLE`：当变量为 true 时(这是 MySQL 8.0 服务器容器的默认状态)，MySQL 服务器的错误日志被重定向到 stderr，这样错误日志就会进入 Docker 容器的日志中，并且可以使用 **docker logs** *mysqld-container* 命令查看。

::: tip 注意
如果已经挂载了来自主机的服务器配置文件，则该变量将不起作用(参阅在绑定挂载配置文件时[持久化数据和配置更改](/2/2.5/2.5.6/2.5.6.2/docker-mysql-more-topics.html#持久化数据和配置更改))。
:::

- `MYSQL_ROOT_PASSWORD`：该变量指定为 MySQL root 帐户设置的密码。

::: warning 警告
在命令行设置 MySQL root用户密码是不安全的。作为显式指定密码的替代方法，你可以使用密码文件的容器文件路径设置变量，然后在容器文件路径上挂载主机上包含密码的文件。这仍然不是很安全，因为密码文件的位置仍然暴露在外。最好使用 `MYSQL_RANDOM_ROOT_PASSWORD` 和 `MYSQL_ONETIME_PASSWORD` 的默认设置都为 true。
:::

- `MYSQL_ALLOW_EMPTY_PASSWORD`。将其设置为 true 将允许容器以 root 用户的空密码启动。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html)
