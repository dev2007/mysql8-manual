# 2.5.6.1 使用 Docker 部署 MySQL 服务器的基本步骤

::: warning 警告
MySQL 团队维护的 MySQL Docker 镜像是专门为 Linux 平台构建的。其他平台不受支持，用户在其上使用这些 MySQL Docker 镜像将自行承担风险。有关在非 Linux 操作系统上运行这些容器的一些已知限制，参阅[此处的讨论](/2/2.5/2.5.6/2.5.6.3/deploy-mysql-nonlinux-docker.html)。
:::

- [下载 MySQL 服务器 Docker 镜像](/2/2.5/2.5.6/2.5.6.1/docker-mysql-getting-started.html#下载-MySQL-服务器-Docker-镜像)

- [启动 MySQL 服务器实例](/2/2.5/2.5.6/2.5.6.1/docker-mysql-getting-started.html#启动-MySQL-服务器实例)

- [从容器内连接到 MySQL 服务器](/2/2.5/2.5.6/2.5.6.1/docker-mysql-getting-started.html#从容器内连接到-MySQL-服务器)

- [容器 Shell 访问](/2/2.5/2.5.6/2.5.6.1/docker-mysql-getting-started.html#容器-Shell-访问)

- [停止和删除 MySQL 容器](/2/2.5/2.5.6/2.5.6.1/docker-mysql-getting-started.html#停止和删除-MySQL-容器)

- [升级 MySQL 服务器容器](/2/2.5/2.5.6/2.5.6.1/docker-mysql-getting-started.html#升级-MySQL-服务器容器)

- [有关使用 Docker 部署 MySQL 服务器的更多主题](/2/2.5/2.5.6/2.5.6.1/docker-mysql-getting-started.html#有关使用-Docker-部署-MySQL-服务器的更多主题)

## 下载 MySQL 服务器 Docker 镜像

::: danger 重要
对于 MySQL 企业版用户：需要订阅才能使用MySQL企业版本的Docker映像。订阅采用自带许可证模式；有关详细信息，参阅[如何购买 MySQL 产品和服务](https://www.mysql.com/buy-mysql/)。
:::

在单独的步骤中下载服务器图像不是严格必要的；但是，在创建 Docker 容器之前执行此步骤可以确保本地镜像是最新的。要下载 MySQL 社区版镜像，请运行以下命令：

```bash
docker pull mysql/mysql-server:tag
```

**tag** 是要提取的镜像版本的标签（例如，`5.6`、`5.7`、`8.0` 或 `latest`）。如果省略 `:tag`，则使用 `latest` 标签，并下载 MySQL 社区服务器最新 GA 版本的图像。参阅[Docker Hub 中 mysql/mysql服务器页面](https://hub.docker.com/r/mysql/mysql-server/tags/)上可用版本的标签列表。

```bash
docker pull container-registry.oracle.com/mysql/community-server:tag
```

要从 OCR 下载 MySQL 企业版镜像，你需要首先接受 OCR 上的许可协议，并使用 Docker 客户端登录到容器仓库：

- 访问 OCR：[https://container-registry.oracle.com/](https://container-registry.oracle.com/) 选择MySQL。

- 在 MySQL 仓库列表下，选择`企业服务器（enterprise-server）`。

- 如果你尚未登录到OCR，请单击页面右侧的`登录`按钮，然后在提示时输入你的 Oracle 帐户凭据。

- 按照页面右侧的说明接受许可协议。

- 使用 `docker login` 命令登录 Docker 客户端的 OCR（`docker` 命令）：

```bash
# docker login container-registry.oracle.com 
Username: Oracle-Account-ID
Password: password
Login successful.
```

使用以下命令从 OCR下 载 MySQL 企业版 Docker 镜像：

```bash
docker pull  container-registry.oracle.com/mysql/enterprise-server:tag
```

*tag* 有不同的选择，对应于 OCR 提供的不同版本的 MySQL Docker 镜像：

- `8.0`、`8.0.x`（*x* 是 8.0 系列中的最新版本号），`latest`：MySQL 8.0，最新 GA
- `5.7`、`5.7.y`（*y* 是 5.7 系列中的最新版本号）：MySQL 5.7

要从[我的 Oracle 支持](https://support.oracle.com/)网站下载 MySQL 企业版镜像，请访问该网站，登录您的 Oracle 帐户，并在登录页面后执行以下步骤：

- 选择**补丁和更新**选项卡。

- 转到**补丁搜索**区域，然后在**搜索**选项卡上切换到**产品或系列（高级）**子选项卡。

- 在**产品**字段中输入“MySQL Server”，在**发布**字段中输入所需的版本号。

- 使用其他过滤器的下拉列表选择**描述**——**包含**，并在文本字段中输入“Docker”。

下图显示了 MySQL 服务器 8.0 的 MySQL 企业版镜像的搜索设置：

![docker-search2](../../../_media/docker-search2.png)

- 单击`搜索`按钮，然后从结果列表中选择所需的版本，然后单击`下载`按钮。

- 在出现的**文件下载**对话框中，单击并下载 Docker 镜像的 `.zip` 文件。

解压缩下载的 `.zip` 压缩包以获得内部的 tarball（`mysql-enterprise-server-**version.tar`），然后通过运行以下命令加载镜像：

```bash
docker load -i mysql-enterprise-server-version.tar
```

你可以使用以下命令列出下载的 Docker 镜像：

```bah
$> docker images
REPOSITORY           TAG                 IMAGE ID            CREATED             SIZE
mysql/mysql-server   latest              3157d7f55f8d        4 weeks ago         241MB
```

## 启动 MySQL 服务器实例

要为 MySQL 服务器启动新的 Docker 容器，请使用以下命令：

```bash
docker run --name=container_name  --restart on-failure -d image_name:tag
```

可以使用 **docker images** 命令获得镜像名称，如[下载 MySQL 服务器 Docker 镜像](/2/2.5/2.5.6/2.5.6.1/docker-mysql-getting-started.html#下载-MySQL-服务器-Docker-镜像)中所述。

`--name` 选项是可选的，用于为服务器容器提供自定义名称；如果没有提供容器名称，则生成一个随机名称。

`--restart` 选项用于配置容器的[重启策略](/2/2.5/2.5.6/2.5.6.1/docker-mysql-getting-started.html#下载-MySQL-服务器-Docker-镜像)；应将其设置为故障时的值，以支持客户端会话中的服务器重启（例如，当客户端执行重启语句或[配置 InnoDB 集群实例](/7/7.4/7.4.2/configuring-production-instances.html)时）。在启用[重启](/13/13.7/13.7.8/13.7.8.8/restart.html)支持的情况下，在客户端会话中发出重启会导致服务器和容器停止，然后重新启动。*MySQL 8.0.21 及更高版本支持服务器重启*。

例如，要为 MySQL 社区版服务器启动一个新的 Docker 容器，请使用以下命令：

```bash
docker run --name=mysql1 --restart on-failure -d mysql/mysql-server:8.0
```

要使用从 OCR 下载的名为 MySQL 企业版服务器的 Docker 镜像来启动新的 Docker 容器，请使用以下命令：

```bash
docker run --name=mysql1 --restart on-failure -d container-registry.oracle.com/mysql/enterprise-server:8.0
```

要使用从我的 Oracle 支持下载的，名为 MySQL 企业版服务器的 Docker 镜像，来启动一个新的 Docker 容器，请使用以下命令：

```bash
docker run --name=mysql1 --restart on-failure -d mysql/enterprise-server:8.0
```

如果指定名称和标记的 Docker 镜像尚未通过早期的 **docker pull**或 **docker run** 命令下载，则该镜像现在已下载。容器初始化开始，当你运行 **docker ps** 命令时，容器将显示在正在运行的容器列表中。例如：

```bash
$> docker ps
CONTAINER ID   IMAGE                COMMAND                  CREATED             STATUS                              PORTS                NAMES
a24888f0d6f4   mysql/mysql-server   "/entrypoint.sh my..."   14 seconds ago      Up 13 seconds (health: starting)    3306/tcp, 33060/tcp  mysql1
```

容器初始化可能需要一些时间。当服务器准备好使用时，docker ps命令输出中容器的状态从（健康：开始）更改为（健康）。
上面 **docker run** 命令中使用的 `-d` 选项使容器在后台运行。使用此命令监视容器的输出：

```bash
docker logs mysql1
```

初始化完成后，命令的输出将包含为根用户生成的随机密码；例如，使用以下命令检查密码：

```bash
$> docker logs mysql1 2>&1 | grep GENERATED
GENERATED ROOT PASSWORD: Axegh3kAJyDLaRuBemecis&EShOs
```

## 从容器内连接到 MySQL 服务器

一旦服务器准备就绪，就可以在刚刚启动的 [mysql](/4/4.5/4.5.1/mysql.html) 服务器容器中运行 mysql 客户端，并将其连接到 MySQL 服务器。使用 **docker exec-it** 命令在已启动的 docker 容器内启动 [mysql](/4/4.5/4.5.1/mysql.html) 客户端，如下所示：

```bash
docker exec -it mysql1 mysql -uroot -p
```

当询问时，输入生成的 root 密码（参阅上面[启动 MySQL 服务器实例](/2/2.5/2.5.6/2.5.6.1/docker-mysql-getting-started.html#启动-MySQL-服务器实例)的最后一步，了解如何查找密码）。由于默认情况下 [MYSQL_ONETIME_PASSWORD](/2/2.5/2.5.6/2.5.6.2/docker-mysql-more-topics.html#Docker-环境变量) 选项为 true，因此将 [mysql](/4/4.5/4.5.1/mysql.html) 客户端连接到服务器后，必须通过发出以下语句重置服务器根密码：

```bash
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';
```

用你选择的密码替换 **password**。重置密码后，服务器就可以使用了。

## 容器 Shell 访问

要让 shell 访问 MySQL 务器容器，请使用 `docker exec-it` 命令在容器内启动 bash shell：

```bash
$> docker exec -it mysql1 bash
bash-4.2#
```

然后可以在容器中运行 Linux 命令。例如，要查看容器内服务器数据目录中的内容，请使用以下命令：

```bash
bash-4.2# ls /var/lib/mysql
auto.cnf    ca.pem	     client-key.pem  ib_logfile0  ibdata1  mysql       mysql.sock.lock	   private_key.pem  server-cert.pem  sys
ca-key.pem  client-cert.pem  ib_buffer_pool  ib_logfile1  ibtmp1   mysql.sock  performance_schema  public_key.pem   server-key.pem
```

## 停止和删除 MySQL 容器

要停止我们创建的 MySQL 服务器容器，请使用以下命令：

```bash
docker stop mysql1
```

**docker stop** 向 [mysqld](/4/4.3/4.3.1/mysqld.html) 进程发送一个 SIGTERM 信号，以便服务器正常关闭。

还要注意，当容器的主进程（MySQL 服务器容器的情况下为 [mysqld](/4/4.3/4.3.1/mysqld.html)）停止时，Docker 容器会自动停止。

要再次启动MySQL服务器容器，请执行以下操作：

```bash
docker start mysql1
```

要使用单个命令停止并重新启动MySQL服务器容器，请执行以下操作：

```bash
docker restart mysql1
```

要删除 MySQL 容器，请先停止它，然后使用 **docker rm** 命令：

```bash
docker stop mysql1
```

```bash
docker rm mysql1
```

如果希望同时删除服务器数据目录的 Docker 卷，请在 **docker rm** 命令中添加 `-v` 选项。

## 升级 MySQL 服务器容器

::: danger 重要
在执行任何 MySQL 升级之前，请仔细遵循[章节 2.11，“升级 MySQL”](/2/2.11/upgrading.html)中的说明。在这里讨论的其他说明中，在升级之前备份数据库尤其重要。<br> 本节中的说明要求将服务器的数据和配置保存在主机上。有关详细信息，参阅[持久化数据和配置更改](/2/2.5/2.5.6/2.5.6.2/docker-mysql-more-topics.html#持久化数据和配置更改)。
:::

按照以下步骤将 MySQL 5.7 的 Docker 安装升级到 8.0：

- 停止MySQL 5.7服务器（本例中容器名为 `mysql57`）：

```bash
docker stop mysql57
```

- 下载MySQL 8.0服务器Docker镜像。请参阅下载MySQL Server Docker映像中的说明。确保为MySQL 8.0使用正确的标记。

- 启动一个新的 MySQL 8.0 Docker 容器（在本例中命名为 `mysql80`），使用主机上保存的旧服务器数据和配置（如果需要进行适当修改，参阅[章节 2.11，“升级 MySQL”](/2/2.11/upgrading.html)）（本例中通过[绑定挂载](https://docs.docker.com/engine/reference/commandline/service_create/#add-bind-mounts-or-volumes.html)）。对于 MySQL 社区版服务器，运行以下命令：

```bash
docker run --name=mysql80 \
   --mount type=bind,src=/path-on-host-machine/my.cnf,dst=/etc/my.cnf \
   --mount type=bind,src=/path-on-host-machine/datadir,dst=/var/lib/mysql \
   -d mysql/mysql-server:8.0
```

如果需要，将 `mysql/mysql-server` 调整为正确的镜像名称，例如，将其替换为 `container-registry.oracle。com/mysql/enterprise-server` 用于从 OCR 下载的 mysql 企业版镜像，或 `mysql/enterprise-server` 用于从 [我的 Oracle 支持](https://support.oracle.com/)下载的 MySQL 企业版镜像。

- 等待服务器完成启动。你可以使用 **docker ps** 命令检查服务器的状态（参阅[启动 MySQL 服务器实例](/2/2.5/2.5.6/2.5.6.1/docker-mysql-getting-started.html#启动-MySQL-服务器实例)以了解如何做到这一点）。

在 8.0 系列（即从 `8.0.x` 版升级到 `8.0.y` 版）中，请遵循相同的步骤：停止原始容器，并在旧服务器数据和配置上使用更新的映像启动新容器。如果你在启动原始容器时使用了 `8.0` 或 `latest`，并且现在有一个新的 MySQL 8.0 版本要升级到它，你必须首先使用以下命令为新版本拉取镜像：

```bash
docker pull mysql/mysql-server:8.0
```

然后，你可以通过在旧数据和配置上启动具有相同标记的新容器进行升级（如果你使用的是 MySQL 企业版，请调整仓库名称；参阅下载 [MySQL 服务器 Docker 镜像](/2/2.5/2.5.6/2.5.6.1/docker-mysql-getting-started.html#下载-MySQL-服务器-Docker-镜像)）：

```bash
docker run --name=mysql80new \
   --mount type=bind,src=/path-on-host-machine/my.cnf,dst=/etc/my.cnf \
   --mount type=bind,src=/path-on-host-machine/datadir,dst=/var/lib/mysql \
-d mysql/mysql-server:8.0
```

::: tip 注意
对于 MySQL 8.0.15 及更早版本：你需要通过在 MySQL8.0 服务器容器中运行 [mysql_upgrade](/4/4.4/4.4.5/mysql-upgrade.html) 实用程序来完成升级过程（对于 MySQL 8.0.16 及更高版本，此步骤*非*必需）：

- docker exec -it mysql80 mysql_upgrade -uroot -p

   出现提示时，输入旧服务器的 root 密码。

- 通过重新启动新容器完成升级：

   docker restart mysql80
:::

## 有关使用 Docker 部署 MySQL 服务器的更多主题

有关使用类似 Docker 的服务器配置部署 MySQL 服务器、持久化数据和配置、服务器错误日志和容器环境变量的更多主题，参阅[章节 2.5.6.2，“使用 Docker 部署 MySQL 服务器的更多主题”](/2/2.5/2.5.6/2.5.6.2/docker-mysql-more-topics.html)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-getting-started.html)
