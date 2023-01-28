# 2.5.6.3 使用 Docker 在 Windows 和其他非 Linux 平台上部署 MySQL

:::warning 警告
Oracle 提供的 MySQL Docker 镜像是专门为 Linux 平台构建的。其他平台不受支持，在其上运行 Oracle MySQL Docker 镜像的用户将自行承担风险。本节讨论在非 Linux 平台上使用镜像时的一些已知问题。
:::

在 Windows 上使用 Oracle 中的 MySQL Server Docker 镜像的已知问题包括：

- 如果要在容器的 MySQL 数据目录上绑定挂载（有关信息，参阅[持久化数据和配置变更](/2/2.5/2.5.6/2.5.6.2/docker-mysql-more-topics.html#持久化数据和配置变更)），你必须使用 `--socket` 选项将服务器套接字文件的位置设置为 MySQL 数据目录之外的某个位置；否则，服务器无法启动。这是因为 Windows 下的 Docker 处理文件装载的方式不允许在套接字文件上绑定装载主机文件。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/deploy-mysql-nonlinux-docker.html)
