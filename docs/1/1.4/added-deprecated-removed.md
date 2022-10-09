# 1.4 MySQL 8.0 中添加、弃用或删除的服务器和状态变量及选项

- [MySQL 8.0 中引入的选项和变量](/1/1.4/added-deprecated-removed.html#MySQL-80-中引入的选项和变量)
- [MySQL 8.0 中弃用的选项和变量](/1/1.4/added-deprecated-removed.html#MySQL-80-中弃用的选项和变量)
- [MySQL 8.0 中删除的选项和变量](/1/1.4/added-deprecated-removed.html#MySQL-80-中删除的选项和变量)

本节列出了 MySQL 8.0 中首次添加、已弃用或已删除的服务器变量、状态变量和选项。

## MySQL 8.0 中引入的选项和变量

- [Acl_cache_items_count](/5/5.1/5.1.10/server-status-variables.html)：缓存特权对象的数量。MySQL 8.0.0 中添加。

- [Audit_log_current_size](/6/6.4/6.4.5/6.4.5.10/audit-log-reference.html)：审核日志文件当前大小。MySQL 8.0.11 中添加。

- [Audit_log_event_max_drop_size]((/5/5.1/5.1.10/server-status-variables.html))：最大下降的审计事件的规模。MySQL 8.0.11 中添加。

- [Audit_log_events](/5/5.1/5.1.10/server-status-variables.html)：已处理的经审计事件数量。MySQL 8.0.11 中添加。

- [Audit_log_events_filtered](/5/5.1/5.1.10/server-status-variables.html)：经过滤的经审计事件数量。MySQL 8.0.11 中添加。

- [Audit_log_events_lost](/5/5.1/5.1.10/server-status-variables.html)：被审计事件被丢弃的事件数量。MySQL 8.0.11 中添加。

- [Audit_log_events_written](/5/5.1/5.1.10/server-status-variables.html)：书面审计事件的数量。MySQL 8.0.11 中添加。

- [Audit_log_total_size](/5/5.1/5.1.10/server-status-variables.html)：书面审计事件的总规模。MySQL 8.0.11 中添加。

- [Audit_log_write_waits](/5/5.1/5.1.10/server-status-variables.html)：书面延迟审核事件的数量。MySQL 8.0.11 中添加。

- [Authentication_ldap_sasl_supported_methods](/5/5.1/5.1.10/server-status-variables.html)：支持 SASL LDAP 认证的认证方法。MySQL 8.0.21 中添加。

- [Caching_sha2_password_rsa_public_key](/5/5.1/5.1.10/server-status-variables.html)：caching_sha2_password 认证插件 RSA 公共关键值。MySQL 8.0.4 中添加。

- [Com_alter_resource_group](/5/5.1/5.1.10/server-status-variables.html)： `ALTER RESOURCE GROUP` 语句计数。MySQL 8.0.3 中添加。

- [Com_alter_user_default_role](/5/5.1/5.1.10/server-status-variables.html)：`ALTER USER ... DEFAULT ROLE` 语句。MySQL 8.0.0 中添加。

- [Com_clone](/5/5.1/5.1.10/server-status-variables.html)：`CLONE` 语句计数。MySQL 8.0.2 中添加。

- [Com_create_resource_group](/5/5.1/5.1.10/server-status-variables.html)：`CREATE RESOURCE GROUP` 语句计数。MySQL 8.0.3 中添加。

- [Com_create_role](/5/5.1/5.1.10/server-status-variables.html)：`CREATE ROLE` 语句计数。MySQL 8.0.0 中添加。

- [Com_drop_resource_group](/5/5.1/5.1.10/server-status-variables.html)：`DROP RESOURCE GROUP` 语句计数。MySQL 8.0.3 中添加。

- [Com_drop_role](/5/5.1/5.1.10/server-status-variables.html)：`DROP ROLE` 语句计数。MySQL 8.0.0 中添加。

- [Com_grant_roles](/5/5.1/5.1.10/server-status-variables.html)：`GRANT ROLE` 语句计数。MySQL 8.0.0 中添加。

- [Com_install_component](/5/5.1/5.1.10/server-status-variables.html)：`INSTALL COMPONENT` 语句计数。MySQL 8.0.0 中添加。

- [Com_replica_start](/5/5.1/5.1.10/server-status-variables.html)：`START REPLICA` 和 `START SLAVE` 语句计数。MySQL 8.0.22 中添加。

- [Com_replica_stop](/5/5.1/5.1.10/server-status-variables.html)：`STOP REPLICA` 和 `STOP SLAVE` 语句计数。MySQL 8.0.22 中添加。

- [Com_restart](/5/5.1/5.1.10/server-status-variables.html)：`RESTART` 语句计数。MySQL 8.0.4 中添加。

- [Com_revoke_roles](/5/5.1/5.1.10/server-status-variables.html)：`REVOKE ROLES` 语句计数。MySQL 8.0.0 中添加。

- [Com_set_resource_group](/5/5.1/5.1.10/server-status-variables.html)：`SET RESOURCE GROUP` 语句计数。MySQL 8.0.3 中添加。

- [Com_set_role](/5/5.1/5.1.10/server-status-variables.html)：`SET ROLE` 语句计数。MySQL 8.0.0 中添加。

- [Com_show_replica_status](/5/5.1/5.1.10/server-status-variables)：`SHOW REPLICA STATUS` 状态和 `SHOW SLAVE STATUS` 语句的计数。MySQL 8.0.22 中添加。

- [Com_show_replicas](/5/5.1/5.1.10/server-status-variables.html)：`SHOW REPLICAS` 和 `SHOW SLAVE HOSTS` 语句计数。MySQL 8.0.22 中添加。

- [Com_uninstall_component](/5/5.1/5.1.10/server-status-variables.html)：`UINSTALL COMPONENT` 语句。MySQL 8.0.0 中添加。

- [Compression_algorithm](/5/5.1/5.1.10/server-status-variables.html)：当前连接的压缩算法。MySQL 8.0.18 中添加。

- [Compression_level](/5/5.1/5.1.10/server-status-variables.html)：当前连接的压缩级别。MySQL 8.0.18 中添加。

- [Connection_control_delay_generated](/6/6.4/6.4.2/6.4.2.2/connection-control-variables.html)：服务器延迟连接请求的次数。MySQL 8.0.1 中添加。

- [Current_tls_ca](/5/5.1/5.1.10/server-status-variables.html)：ssl_ca 系统变量的当前值。MySQL 8.0.16 中添加。

- [Current_tls_capath](/5/5.1/5.1.10/server-status-variables.html)：ssl_capath 系统变量的当前值。MySQL 8.0.16 中添加。

- [Current_tls_cert](/5/5.1/5.1.10/server-status-variables.html)：ssl_cert 系统变量的当前值。MySQL 8.0.16 中添加。

- [Current_tls_cipher](/5/5.1/5.1.10/server-status-variables.html)：ssl_cipher 系统变量的当前值。MySQL 8.0.16 中添加。

- [Current_tls_ciphersuites](/5/5.1/5.1.10/server-status-variables.html)：tsl_ciphersuites 系统变量的当前值。MySQL 8.0.16 中添加。

- [Current_tls_crl](/5/5.1/5.1.10/server-status-variables.html)：ssl_crl系统变量的当前值。MySQL 8.0.16 中添加。

- [Current_tls_crlpath](/5/5.1/5.1.10/server-status-variables.html)：ssl_crlpath系统变量的当前值。MySQL 8.0.16 中添加。

- [Current_tls_key](/5/5.1/5.1.10/server-status-variables.html)：ssl_key 系统变量的当前值。MySQL 8.0.16 中添加。

- [Current_tls_version](/5/5.1/5.1.10/server-status-variables.html)：tls_version 系统变量的当前值。MySQL 8.0.16 中添加。

- [Error_log_buffered_bytes](/5/5.1/5.1.10/server-status-variables.html)：error_log 表中使用的字节数。MySQL 8.0.22 中添加。

- [Error_log_buffered_events](/5/5.1/5.1.10/server-status-variables.html)：error_log 表中的事件数量。MySQL 8.0.22 中添加。

- [Error_log_expired_events](/5/5.1/5.1.10/server-status-variables.html)：从 error_log 表丢弃的事件数量。MySQL 8.0.22 中添加。

- [Error_log_latest_write](/5/5.1/5.1.10/server-status-variables.html)：最后写到 error_log 表的时间。MySQL 8.0.22 中添加。

- [Firewall_access_denied](/6/6.4/6.4.7/6.4.7.4/firewall-reference.html)：MySQL 企业防火墙拒绝的语句数量。MySQL 8.0.11 中添加。

- [Firewall_access_granted](/6/6.4/6.4.7/6.4.7.4/firewall-reference.html)：MySQL 企业防火墙接受的语句数量。MySQL 8.0.11 中添加。

- [Firewall_cached_entries](/6/6.4/6.4.7/6.4.7.4/firewall-reference.html)：MySQL 企业防火墙记录的语句数量。MySQL 8.0.11 中添加。

- [Global_connection_memory](/5/5.1/5.1.10/server-status-variables.html)：目前所有用户线程使用的内存量。MySQL 8.0.28 中添加。

- [Innodb_redo_log_enabled](/5/5.1/5.1.10/server-status-variables.html)：Innodb 重做日志状态。MySQL 8.0.21 中添加。

- [Innodb_system_rows_deleted](/5/5.1/5.1.10/server-status-variables.html)：从系统示图表中删除的行数。MySQL 8.0.19 中添加。

- [Innodb_system_rows_inserted](/5/5.1/5.1.10/server-status-variables.html)：插入系统示图表的行数。MySQL 8.0.19 中添加。

- [Innodb_system_rows_read](/5/5.1/5.1.10/server-status-variables.html)：从系统示图表中读取的行数。MySQL 8.0.19 中添加。

- [Innodb_undo_tablespaces_active](/5/5.1/5.1.10/server-status-variables.html)：主动撤消表空间的数量。MySQL 8.0.14 中添加。

- [Innodb_undo_tablespaces_explicit](/5/5.1/5.1.10/server-status-variables.html)：用户创建的撤消表空间数量。MySQL 8.0.14 中添加。

- [Innodb_undo_tablespaces_implicit](/5/5.1/5.1.10/server-status-variables.html)：InnoDB 创建的撤消表空间数量。MySQL 8.0.14 中添加。

- [Innodb_undo_tablespaces_total](/5/5.1/5.1.10/server-status-variables.html)：撤消表空间总数。MySQL 8.0.14 中添加。

- [Mysqlx_bytes_received_compressed_payload](/20/20.5/20.5.6/20.5.6.3/x-plugin-status-variables.html)：解压前测量的压缩消息有效载荷接收字节数。MySQL 8.0.19 中添加。

- [Mysqlx_bytes_received_uncompressed_frame](/20/20.5/20.5.6/20.5.6.3/x-plugin-status-variables.html)：解压后作为压缩消息有效载荷接收的字节数。MySQL 8.0.19 中添加。

- [Mysqlx_bytes_sent_compressed_payload](/20/20.5/20.5.6/20.5.6.3/x-plugin-status-variables.html)：压缩后作为压缩消息有效载荷发送的字节数。MySQL 8.0.19 中添加。

- [Mysqlx_bytes_sent_uncompressed_frame](/20/20.5/20.5.6/20.5.6.3/x-plugin-status-variables.html)：压缩消息有效载荷发送的字节数，在压缩前测量。MySQL 8.0.19 中添加。

- [Mysqlx_compression_algorithm](/20/20.5/20.5.6/20.5.6.3/x-plugin-status-variables.html)：此会话用于 X 协议连接的压缩算法。MySQL 8.0.20 中添加。

- [Mysqlx_compression_level](/20/20.5/20.5.6/20.5.6.3/x-plugin-status-variables.html)：此会话 X 协议连接使用的压缩级别。MySQL 8.0.20 中添加。

- [Replica_open_temp_tables](/5/5.1/5.1.10/server-status-variables.html)：复制 SQL 线程已打开的临时表数量。MySQL 8.0.26 中添加。

- [Replica_rows_last_search_algorithm_used](/5/5.1/5.1.10/server-status-variables.html)：该副本最近使用的搜索算法用于定位基于行的复制行（索引、表或哈希扫描）。MySQL 8.0.26 中添加。

- [Rpl_semi_sync_replica_status](/5/5.1/5.1.10/server-status-variables.html)：半同步复制是否在副本上运行。MySQL 8.0.26 中添加。

- [Rpl_semi_sync_source_clients](/5/5.1/5.1.10/server-status-variables.html)：半同步副本的数量。MySQL 8.0.26 中添加。

- [Rpl_semi_sync_source_net_avg_wait_time](/5/5.1/5.1.10/server-status-variables.html)：源等待来自复制副本的答复的平均时间。MySQL 8.0.26 中添加。

- [Rpl_semi_sync_source_net_wait_time](/5/5.1/5.1.10/server-status-variables.html)：源已等待副本的答复的总时间。MySQL 8.0.26 中添加。

- [Rpl_semi_sync_source_net_waits](/5/5.1/5.1.10/server-status-variables.html)：源等待副本答复的总次数。MySQL 8.0.26 中添加。

- [Rpl_semi_sync_source_no_times](/5/5.1/5.1.10/server-status-variables.html)：源关闭半同步复制的次数。MySQL 8.0.26 中添加。

- [Rpl_semi_sync_source_no_tx](/5/5.1/5.1.10/server-status-variables.html)：未成功确认的提交次数。MySQL 8.0.26 中添加。

- [Rpl_semi_sync_source_status](/5/5.1/5.1.10/server-status-variables.html)：半同步复制是否在源头上运行。MySQL 8.0.26 中添加。

- [Rpl_semi_sync_source_timefunc_failures](/5/5.1/5.1.10/server-status-variables.html)：源调用时间函数时失败的次数。MySQL 8.0.26 中添加。

- [Rpl_semi_sync_source_tx_avg_wait_time](/5/5.1/5.1.10/server-status-variables.html)：源等待每次事务的平均时间。MySQL 8.0.26 中添加。

- [Rpl_semi_sync_source_tx_wait_time](/5/5.1/5.1.10/server-status-variables.html)：源等待事务的总时间。MySQL 8.0.26 中添加。

- [Rpl_semi_sync_source_tx_waits](/5/5.1/5.1.10/server-status-variables.html)：源等待事务的总次数。MySQL 8.0.26 中添加。

- [Rpl_semi_sync_source_wait_pos_backtraverse](/5/5.1/5.1.10/server-status-variables.html)：源等待二进制坐标的事件的总次数低于之前等待的事件的总次数。MySQL 8.0.26 中添加。

- [Rpl_semi_sync_source_wait_sessions](/5/5.1/5.1.10/server-status-variables.html)：目前等待副本答复的会话数。MySQL 8.0.26 中添加。

- [Rpl_semi_sync_source_yes_tx](/5/5.1/5.1.10/server-status-variables.html)：成功确认的提交次数。MySQL 8.0.26 中添加。

- [Secondary_engine_execution_count](/5/5.1/5.1.10/server-status-variables.html)：卸载到二级发动机的查询次数。MySQL 8.0.13 中添加。

- [activate_all_roles_on_login](/5/5.1/5.1.8/server-system-variables.html)：是否在连接时间激活所有用户角色。MySQL 8.0.2 中添加。

- [admin-ssl](/5/5.1/5.1.7/server-options.html)：启用连接加密。MySQL 8.0.21 中添加。

- [admin_address](/5/5.1/5.1.8/server-system-variables.html)：要绑定在管理界面上的连接的 IP 地址。MySQL 8.0.14 中添加。

- [admin_port](/5/5.1/5.1.8/server-system-variables.html)：用于管理界面连接的 TCP/IP 值。MySQL 8.0.14 中添加。

- [admin_ssl_ca](/5/5.1/5.1.8/server-system-variables.html)：包含受信任 SSL 证书机构列表的文件。MySQL 8.0.21 中添加。

- [admin_ssl_capath](/5/5.1/5.1.8/server-system-variables.html)：包含受信任的 SSL 证书颁发机构证书文件的目录。MySQL 8.0.21 中添加。

- [admin_ssl_cert](/5/5.1/5.1.8/server-system-variables.html)：包含 X.509 证书的文件。MySQL 8.0.21 中添加。

- [admin_ssl_cipher](/5/5.1/5.1.8/server-system-variables.html)：连接加密的允许密码。MySQL 8.0.21 中添加。

- [admin_ssl_crl](/5/5.1/5.1.8/server-system-variables.html)：包含证书撤销列表的文件。MySQL 8.0.21 中添加。

- [admin_ssl_crlpath](/5/5.1/5.1.8/server-system-variables.html)：包含证书撤销列表文件的目录。MySQL 8.0.21 中添加。

- [admin_ssl_key](/5/5.1/5.1.8/server-system-variables.html)：包含 X.509 密钥的文件。MySQL 8.0.21 中添加。

- [admin_tls_ciphersuites](/5/5.1/5.1.8/server-system-variables.html)：允许用于加密连接的 TLSv1.3 密码套件。MySQL 8.0.21 中添加。

- [admin_tls_version](/5/5.1/5.1.8/server-system-variables.html)：允许加密连接的 TLS 协议。MySQL 8.0.21 中添加。

- [audit-log](/6/6.4/6.4.5/6.4.5.10/audit-log-reference.html)：是否激活审核日志插件。MySQL 8.0.11 中添加。

- [audit_log_buffer_size](/6/6.4/6.4.5/6.4.5.10/audit-log-reference.html)：审计日志缓冲器的大小。MySQL 8.0.11 中添加。

- [audit_log_compression](/6/6.4/6.4.5/6.4.5.10/audit-log-reference.html)：审核日志文件压缩方法。MySQL 8.0.11 中添加。

- [audit_log_connection_policy](/6/6.4/6.4.5/6.4.5.10/audit-log-reference.html)：审核与连接相关的事件的记录策略。MySQL 8.0.11 中添加。

- [audit_log_current_session](/6/6.4/6.4.5/6.4.5.10/audit-log-reference.html)：是否审核本次会话。MySQL 8.0.11 中添加。

- [audit_log_encryption](/6/6.4/6.4.5/6.4.5.10/audit-log-reference.html)：审核日志文件加密方法。MySQL 8.0.11 中添加。

- [audit_log_exclude_accounts](/6/6.4/6.4.5/6.4.5.10/audit-log-reference.html)：不审计的账户。MySQL 8.0.11 中添加。

- [audit_log_file](/6/6.4/6.4.5/6.4.5.10/audit-log-reference.html)：审核日志文件的名称。MySQL 8.0.11 中添加。

- [audit_log_filter_id](/6/6.4/6.4.5/6.4.5.10/audit-log-reference.html)：当前审核日志过滤器的 ID。MySQL 8.0.11 中添加。

- [audit_log_flush](/6/6.4/6.4.5/6.4.5.10/audit-log-reference.html)：关闭并重新打开审核日志文件。MySQL 8.0.11 中添加。

- [audit_log_format](/6/6.4/6.4.5/6.4.5.10/audit-log-reference.html)：审核日志文件格式。MySQL 8.0.11 中添加。

- [audit_log_format_unix_timestamp](/6/6.4/6.4.5/6.4.5.10/audit-log-reference.html)：是否在 JSON 格式的审核日志中包含 Unix 时间戳。MySQL 8.0.26 中添加。

- [audit_log_include_accounts](/6/6.4/6.4.5/6.4.5.10/audit-log-reference.html)：要审计的账户。MySQL 8.0.11 中添加。

- [audit_log_max_size](/6/6.4/6.4.5/6.4.5.10/audit-log-reference.html)：限制 JSON 审核日志文件的组合大小。MySQL 8.0.26 中添加。

- [audit_log_password_history_keep_days](/6/6.4/6.4.5/6.4.5.10/audit-log-reference.html)：保留存档审核日志加密密码的天数。MySQL 8.0.17 中添加。

- [audit_log_policy](/6/6.4/6.4.5/6.4.5.10/audit-log-reference.html)：审核日志记录策略。MySQL 8.0.11 中添加。

- [audit_log_prune_seconds](/6/6.4/6.4.5/6.4.5.10/audit-log-reference.html)：审核日志文件被修剪后的秒数。MySQL 8.0.24 中添加。

- [audit_log_read_buffer_size](/6/6.4/6.4.5/6.4.5.10/audit-log-reference.html)：审核日志文件读取缓冲区大小。MySQL 8.0.11 中添加。

- [audit_log_rotate_on_size](/6/6.4/6.4.5/6.4.5.10/audit-log-reference.html)：关闭并重新打开此大小的审核日志文件。MySQL 8.0.11 中添加。

- [audit_log_statement_policy](/6/6.4/6.4.5/6.4.5.10/audit-log-reference)：语句相关事件的审核日志记录策略。MySQL 8.0.11 中添加。

- [audit_log_strategy](/6/6.4/6.4.5/6.4.5.10/audit-log-reference.html)：审计日志策略。MySQL 8.0.11 中添加。

- [authentication_fido_rp_id](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：FIDO 多因素身份验证的依赖方 ID。MySQL 8.0.27 中添加。

- [authentication_kerberos_service_key_tab](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：包含用于验证 TGS 票证的 Kerberos 服务密钥的文件。MySQL 8.0.26 中添加。

- [authentication_kerberos_service_principal](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：Kerberos 服务主体名称。MySQL 8.0.26 中添加。

- [authentication_ldap_sasl_auth_method_name](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：身份验证方法名称。MySQL 8.0.11 中添加。

- [authentication_ldap_sasl_bind_base_dn](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：LDAP 服务器基可分辨名称。MySQL 8.0.11 中添加。

- [authentication_ldap_sasl_bind_root_dn](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：LDAP 服务器根可分辨名称。MySQL 8.0.11 中添加。

- [authentication_ldap_sasl_bind_root_pwd](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：LDAP 服务器根绑定密码。MySQL 8.0.11 中添加。

- [authentication_ldap_sasl_ca_path](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables)：LDAP 服务器证书颁发机构文件名。MySQL 8.0.11 中添加。

- [authentication_ldap_sasl_group_search_attr](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：LDAP 服务器组搜索属性。MySQL 8.0.11 中添加。

- [authentication_ldap_sasl_group_search_filter](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：LDAP 自定义组搜索筛选器。MySQL 8.0.11 中添加。

- [authentication_ldap_sasl_init_pool_size](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：LDAP 服务器初始连接池大小。MySQL 8.0.11 中添加。

- [authentication_ldap_sasl_log_status](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：LDAP 服务器日志级别。MySQL 8.0.11 中添加。

- [authentication_ldap_sasl_max_pool_size](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：LDAP 服务器最大连接池大小。MySQL 8.0.11 中添加。

- [authentication_ldap_sasl_referral](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：是否启用 LDAP 搜索引用。MySQL 8.0.20 中添加。

- [authentication_ldap_sasl_server_host](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables)：LDAP 服务器主机名或 IP 地址。MySQL 8.0.11 中添加。

- [authentication_ldap_sasl_server_port](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：LDAP 服务器端口号。MySQL 8.0.11 中添加。

- [authentication_ldap_sasl_tls](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：是否使用到 LDAP 服务器的加密连接。MySQL 8.0.11 中添加。

- [authentication_ldap_sasl_user_search_attr](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：LDAP 服务器用户搜索属性。MySQL 8.0.11 中添加。

- [authentication_ldap_simple_auth_method_name](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：身份验证方法名称。MySQL 8.0.11 中添加。

- [authentication_ldap_simple_bind_base_dn](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：LDAP 服务器基础可分辨名称（base dn）。MySQL 8.0.11 中添加。

- [authentication_ldap_simple_bind_root_dn](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：LDAP 服务器根可分辨名称（root dn）。MySQL 8.0.11 中添加。

- [authentication_ldap_simple_bind_root_pwd](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：LDAP 服务器根绑定密码。MySQL 8.0.11 中添加。

- [authentication_ldap_simple_ca_path](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：LDAP 服务器证书颁发机构文件名。MySQL 8.0.11 中添加。

- [authentication_ldap_simple_group_search_attr](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：LDAP 服务器组搜索属性。MySQL 8.0.11 中添加。

- [authentication_ldap_simple_group_search_filter](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：LDAP 自定义组搜索筛选器。MySQL 8.0.11 中添加。

- [authentication_ldap_simple_init_pool_size](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：LDAP 服务器初始连接池大小。MySQL 8.0.11 中添加。

- [authentication_ldap_simple_log_status](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：LDAP 服务器日志级别。MySQL 8.0.11 中添加。

- [authentication_ldap_simple_max_pool_size](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：LDAP 服务器最大连接池大小。MySQL 8.0.11 中添加。

- [authentication_ldap_simple_referral](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：是否启用 LDAP 搜索引用。MySQL 8.0.20 中添加。

- [authentication_ldap_simple_server_host](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：LDAP 服务器主机名或 IP 地址。MySQL 8.0.11 中添加。

- [authentication_ldap_simple_server_port](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：LDAP 服务器端口号。MySQL 8.0.11 中添加。

- [authentication_ldap_simple_tls](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：LDAP 服务器端口号。MySQL  8.0.11 中添加。

- [authentication_ldap_simple_user_search_attr](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：LDAP 服务器用户搜索属性。MySQL 8.0.11 中添加。

- [authentication_policy](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：用于多因素身份验证的插件。MySQL 8.0.27 中添加。

- [authentication_windows_log_level](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：Windows 身份验证插件日志记录级别。MySQL 8.0.11 中添加。

- [authentication_windows_use_principal_name](/6/6.4/6.4.1/6.4.1.13/pluggable-authentication-system-variables.html)：是否使用 Windows 身份验证插件主名称。MySQL 8.0.11 中添加。

- [binlog_encryption](/17/17.1/17.1.6/17.1.6.4/replication-options-binary-log.html)：启用二进制日志文件的加密，并在本服务器上继电器日志文件。MySQL 8.0.14 中添加。

- [binlog_expire_logs_seconds](/17/17.1/17.1.6/17.1.6.4/replication-options-binary-log.html)：在多少秒后清除二进制日志。MySQL 8.0.1  中添加。

- [binlog_rotate_encryption_master_key_at_startup](/17/17.1/17.1.6/17.1.6.4/replication-options-binary-log.html)：在服务器启动时旋转二进制日志主密钥。MySQL 8.0.14 中添加。

- [binlog_row_metadata](/17/17.1/17.1.6/17.1.6.4/replication-options-binary-log.html)：使用基于行的日志时，是否将所有或仅最小表相关元数据记录到二进制日志中。MySQL 8.0.1 中添加。

- [binlog_row_value_options](/17/17.1/17.1.6/17.1.6.4/replication-options-binary-log.html)：启用部分 JSON 更新的二进制记录，以便基于行的复制。MySQL 8.0.3 中添加。

- [binlog_transaction_compression](/17/17.1/17.1.6/17.1.6.4/replication-options-binary-log.html)：启用二进制日志文件中的交易有效载荷压缩。MySQL 8.0.20 中添加。

- [binlog_transaction_compression_level_zstd](/17/17.1/17.1.6/17.1.6.4/replication-options-binary-log.html)：二进制日志文件中交易有效载荷的压缩级别。MySQL 8.0.20 中添加。

- [binlog_transaction_dependency_history_size](/17/17.1/17.1.6/17.1.6.4/replication-options-binary-log.html)：排数为查找上次更新的行的事务而保留。MySQL 8.0.1 中添加。

- [binlog_transaction_dependency_tracking](/17/17.1/17.1.6/17.1.6.4/replication-options-binary-log.html)：依赖信息来源（提交时间戳或交易书写集），从中评估哪些交易可以通过复制品的多读应用同时执行。MySQL 8.0.1 中添加。

- [caching_sha2_password_auto_generate_rsa_keys](/5/5.1/5.1.8/server-system-variables.html)：是否自动生成 RSA 键对文件。MySQL 8.0.4 中添加。

- [caching_sha2_password_digest_rounds](/5/5.1/5.1.8/server-system-variables.html)：用于 caching_sha2_password 身份验证插件的哈希轮数。添加到 MySQL 8.0.24 中。

- [caching_sha2_password_private_key_path](/5/5.1/5.1.8/server-system-variables.html)：SHA2 认证插件专用键路径名称。MySQL 8.0.3 中添加。

- [caching_sha2_password_public_key_path](/5/5.1/5.1.8/server-system-variables.html)：SHA2 认证插件公共关键路径名称。MySQL 8.0.3 中添加。

- [clone_autotune_concurrency](/5/5.6/5.6.7/5.6.7.13/clone-plugin-options-variables.html)：启用用于远程克隆操作的线程的动态生成。MySQL 8.0.17 中添加。

- [clone_block_ddl](/5/5.6/5.6.7/5.6.7.13/clone-plugin-options-variables.html)：在克隆操作期间启用专用备份锁。MySQL 8.0.27 中添加。

- [clone_buffer_size](/5/5.6/5.6.7/5.6.7.13/clone-plugin-options-variables.html)：定义 MySQL 服务器实例上中间缓冲区的大小。。MySQL 8.0.17 中添加。

- [clone_ddl_timeout](/5/5.6/5.6.7/5.6.7.13/clone-plugin-options-variables.html)：克隆操作等待备份锁的秒数。MySQL 8.0.17 中添加。

- [clone_donor_timeout_after_network_failure](/5/5.6/5.6.7/5.6.7.13/clone-plugin-options-variables.html)：网络故障后重新启动克隆操作的时间。添加到 MySQL 8.0.24 中。

- [clone_enable_compression](/5/5.6/5.6.7/5.6.7.13/clone-plugin-options-variables.html)：在克隆过程中实现网络层数据的压缩。MySQL 8.0.17 中添加。

- [clone_max_concurrency](/5/5.6/5.6.7/5.6.7.13/clone-plugin-options-variables.html)：用于执行克隆操作的并发螺纹的最大数量。MySQL 8.0.17 中添加。

- [clone_max_data_bandwidth](/5/5.6/5.6.7/5.6.7.13/clone-plugin-options-variables.html)：远程克隆操作中 MiB 每秒的最大数据传输速率。MySQL 8.0.17 中添加。

- [clone_max_network_bandwidth](/5/5.6/5.6.7/5.6.7.13/clone-plugin-options-variables.html)：远程克隆操作中 MiB 每秒的最大网络传输速率。MySQL 8.0.17 中添加。

- [clone_ssl_ca](/5/5.6/5.6.7/5.6.7.13/clone-plugin-options-variables.html)：指定证书授权 （CA） 文件的路径。MySQL 8.0.14 中添加。

- [clone_ssl_cert](/5/5.6/5.6.7/5.6.7.13/clone-plugin-options-variables.html)：指定通往公共钥匙证书文件的路径。MySQL 8.0.14 中添加。

- [clone_ssl_key](/5/5.6/5.6.7/5.6.7.13/clone-plugin-options-variables.html)：指定通往私钥文件的路径。MySQL 8.0.14 中添加。

- [clone_valid_donor_list](/5/5.6/5.6.7/5.6.7.13/clone-plugin-options-variables.html)：定义远程克隆操作的捐赠者主机地址。MySQL 8.0.17 中添加。

- [connection_control_failed_connections_threshold](/6/6.4/6.4.2/6.4.2.2/connection-control-variables.html)：延迟发生前的连续连接尝试失败。MySQL 8.0.1 中添加。

- [connection_control_max_connection_delay](/6/6.4/6.4.2/6.4.2.2/connection-control-variables.html)：服务器对连接尝试失败的反应的最大延迟（毫秒）。MySQL 8.0.1 中添加。

- [connection_control_min_connection_delay](/6/6.4/6.4.2/6.4.2.2/connection-control-variables.html)：服务器对连接尝试失败响应的最小延迟（毫秒）。MySQL 8.0.1 中添加。

- [connection_memory_chunk_size](/5/5.1/5.1.8/server-system-variables.html)：仅当用户内存使用量按此数量更改或更多时，才会更新Global_connection_memory：0 禁用更新。MySQL 8.0.28 中添加。

- [connection_memory_limit](/5/5.1/5.1.8/server-system-variables.html)：在拒绝该用户的其他查询之前，任何一个用户连接都可以消耗的最大内存量。不适用于系统用户，如 MySQL 根。MySQL 8.0.28 中添加。

- [create_admin_listener_thread](/5/5.1/5.1.8/server-system-variables.html)：是否使用专用监听线程连接管理界面。MySQL 8.0.14 中添加。

- [cte_max_recursion_depth](/5/5.1/5.1.8/server-system-variables.html)：普通表的表达式最大递归深度。MySQL 8.0.3 中添加。

- [ddl-rewriter](/5/5.1/5.1.8/server-system-variables.html)：是否激活插件 ddl_rewriter。MySQL 8.0.16 中添加。

- [default_collation_for_utf8mb4](/5/5.1/5.1.8/server-system-variables.html)：utf8mb4 字符集的默认整理。MySQL 8.0.11 中添加。

- [default_table_encryption](/5/5.1/5.1.8/server-system-variables.html)：默认模式和桌面空间加密设置。MySQL 8.0.16 中添加。

- [dragnet.Status](/5/5.1/5.1.8/server-system-variables.html)：dragnet.log_error_filter_rules 最新分配结果。MySQL 8.0.12 中添加。

- [dragnet.log_error_filter_rules](/5/5.1/5.1.8/server-system-variables.html)：错误记录的过滤规则。MySQL 8.0.4 中添加。

- [early-plugin-load](/5/5.1/5.1.8/server-system-variables.html)：在加载强制性内置插件之前和存储引擎初始化之前指定插件加载。MySQL 8.0.0 中添加。

- [generated_random_password_length](/5/5.1/5.1.8/server-system-variables.html)：生成密码的最大长度。MySQL 8.0.18 中添加。

- [global_connection_memory_tracking](/5/5.1/5.1.8/server-system-variables.html)：是否计算全局连接内存使用率（如全局连接内存所示）；默认设置为禁用。MySQL 8.0.28 中添加。

- [group_replication_advertise_recovery_endpoints](/18/18.9/group-replication-options.html)：为分布式恢复提供的连接。MySQL 8.0.21 中添加。

- [group_replication_autorejoin_tries](/18/18.9/group-replication-options.html)：该成员自动重新加入组的尝试次数。MySQL 8.0.16 中添加。

- [group_replication_clone_threshold](/18/18.9/group-replication-options.html)：贡献者和接受者之间的事务编号差距，超过该差距的远程克隆操作用于状态传输。MySQL 8.0.17 中添加。

- [group_replication_communication_debug_options](/18/18.9/group-replication-options.html)：组复制组件的调试消息级别。MySQL 8.0.3 中添加。

- [group_replication_communication_max_message_size](/18/18.9/group-replication-options.html)：组复制通信的最大消息大小，较大的消息是支离破碎的。MySQL 8.0.16 中添加。

- [group_replication_communication_stack](/18/18.9/group-replication-options.html)：具体说明 XCom 通信堆栈或 MySQL 通信栈是否用于在成员之间建立群组通信连接。MySQL 8.0.27 中添加。

- [group_replication_consistency](/18/18.9/group-replication-options.html)：组提供的事务一致性保证类型。MySQL 8.0.14 中添加。

- [group_replication_exit_state_action](/18/18.9/group-replication-options.html)：实例在非自愿离开组时的行为。。MySQL 8.0.12 中添加。

- [group_replication_flow_control_hold_percent](/18/18.9/group-replication-options.html)：保留未使用的组配额百分比。MySQL 8.0.2 中添加。

- [group_replication_flow_control_max_commit_quota](/18/18.9/group-replication-options.html)：组的最大流量控制配额。MySQL 8.0.2 中添加。

- [group_replication_flow_control_member_quota_percent](/18/18.9/group-replication-options.html)：成员在计算配额时应承担的配额百分比是可以自行获得的。MySQL 8.0.2 中添加。

- [group_replication_flow_control_min_quota](/18/18.9/group-replication-options.html)：每个成员可分配的最低流量控制配额。MySQL 8.0.2 中添加。

- [group_replication_flow_control_min_recovery_quota](/18/18.9/group-replication-options.html)：由于另一组成员正在恢复，因此每个成员可以分配的最低配额。MySQL 8.0.2 中添加。

- [group_replication_flow_control_period](/18/18.9/group-replication-options.html)：定义在流量控制迭代之间等待多少秒。MySQL 8.0.2 中添加。

- [group_replication_flow_control_release_percent](/18/18.9/group-replication-options.html)：当流量控制不再需要限制作者成员时， 应如何释放组配额。MySQL 8.0.2 中添加。

- [group_replication_ip_allowlist](/18/18.9/group-replication-options.html)：允许连接到组的主机列表（MySQL 8.0.22 及以后）。MySQL 8.0.22 中添加。

- [group_replication_member_expel_timeout](/18/18.9/group-replication-options.html)：从怀疑组成员出现故障到将其从组中驱逐（导致组成员重新配置）之间的时间。MySQL 8.0.13 中添加。

- [group_replication_member_weight](/18/18.9/group-replication-options.html)：该成员被选为初选成员的机会。MySQL 8.0.2 中添加。

- [group_replication_message_cache_size](/18/18.9/group-replication-options.html)：群通信引擎消息缓存 （XCom） 的最大内存。MySQL 8.0.16 中添加。

- [group_replication_paxos_single_leader](/18/18.9/group-replication-options.html)：在单一主模式下使用单一共识领导者。MySQL 8.0.27 中添加。

- [group_replication_recovery_compression_algorithms](/18/18.9/group-replication-options.html)：用于传出恢复连接的允许压缩算法。MySQL 8.0.18 中添加。

- [group_replication_recovery_get_public_key](/18/18.9/group-replication-options.html)：是否接受有关从捐赠者获取公钥的首选项。MySQL 8.0.4 中添加。

- [group_replication_recovery_public_key_path](/18/18.9/group-replication-options.html)：接受公共关键信息。MySQL 8.0.4 中添加。

- [group_replication_recovery_tls_ciphersuites](/18/18.9/group-replication-options.html)：当 TLSv1.3 用作将此实例作为客户端（加入成员）进行连接加密时，允许密码套件。MySQL 8.0.19 中添加。

- [group_replication_recovery_tls_version](/18/18.9/group-replication-options.html)：允许 TLS 协议作为客户端（加入成员）进行连接加密。MySQL 8.0.19 中添加。

- [group_replication_recovery_zstd_compression_level](/18/18.9/group-replication-options.html)：使用 zstd 压缩的恢复连接的压缩级别。MySQL 8.0.18 中添加。

- [group_replication_tls_source](/18/18.9/group-replication-options.html)：组复制的 TLS 材料来源。MySQL 8.0.21 中添加。

- [group_replication_unreachable_majority_timeout](/18/18.9/group-replication-options.html)：等待导致少数者离开组的网络分区需要等待多久。MySQL 8.0.2 中添加。

- [group_replication_view_change_uuid](/18/18.9/group-replication-options.html)：UUID 查看更改事件 GTID。MySQL 8.0.26 中添加。

- [histogram_generation_max_mem_size](/5/5.1/5.1.8/server-system-variables.html)：创建直方图统计的最大内存。MySQL 8.0.2 中添加。

- [immediate_server_version](/17/17.1/17.1.6/17.1.6.2/replication-options-source.html)：MySQL 服务器发布服务器数量，即即时复制源。MySQL 8.0.14 中添加。

- [information_schema_stats_expiry](/5/5.1/5.1.8/server-system-variables.html)：缓存表统计的到期设置。MySQL 8.0.3 中添加。

- [init_replica](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：复制品连接到源时执行的语句。MySQL 8.0.26 中添加。

- [innodb_buffer_pool_debug](/15/15.14/innodb-parameters.html)：允许多个缓冲池实例，当缓冲池大小小于 1GB 时。MySQL 8.0.0 中添加。

- [innodb_buffer_pool_in_core_file](/15/15.14/innodb-parameters.html)：将缓冲池页面的编写控制到核心文件。MySQL 8.0.14 中添加。

- [innodb_checkpoint_disabled](/15/15.14/innodb-parameters.html)：禁用检查点，以便有意退出服务器始终启动恢复。MySQL 8.0.2 中添加。

- [innodb_ddl_buffer_size](/15/15.14/innodb-parameters.html)：DDL 操作的最大缓冲大小。MySQL 8.0.27 中添加。

- [innodb_ddl_log_crash_reset_debug](/15/15.14/innodb-parameters.html)：重置 DDL 日志崩溃喷射计数器的调试选项。MySQL 8.0.3 中添加。

- [innodb_ddl_threads](/15/15.14/innodb-parameters.html)：用于创建索引的最大平行线程数。MySQL 8.0.27 中添加。

- [innodb_deadlock_detect](/15/15.14/innodb-parameters)：启用或禁用死锁检测。MySQL 8.0.0 中添加。

- [innodb_dedicated_server](/15/15.14/innodb-parameters.html)：实现缓冲池大小、日志文件大小和冲洗方法的自动配置。MySQL 8.0.3 中添加。

- [innodb_directories](/15/15.14/innodb-parameters.html)：定义在启动时扫描桌面数据文件的目录。MySQL 8.0.4 中添加。

- [innodb_doublewrite_batch_size](/15/15.14/innodb-parameters.html)：每批要编写的双写页数。MySQL 8.0.20 中添加。

- [innodb_doublewrite_dir](/15/15.14/innodb-parameters.html)：双写缓冲文件目录。MySQL 8.0.20 中添加。

- [innodb_doublewrite_files](/15/15.14/innodb-parameters.html)：双重写文件的数量。MySQL 8.0.20 中添加。

- [innodb_doublewrite_pages](/15/15.14/innodb-parameters.html)：每个线程的双写页数。MySQL 8.0.20 中添加。

- [innodb_extend_and_initialize](/15/15.14/innodb-parameters.html)：控制如何在 Linux 上分配新的表空间面。MySQL 8.0.22 中添加。

- [innodb_fsync_threshold](/15/15.14/innodb-parameters.html)：控制 Innodb 在创建新文件时调用 fsync 的频率。MySQL 8.0.13 中添加。

- [innodb_idle_flush_pct](/15/15.14/innodb-parameters.html)：当 InnoDB 处于闲置状态时，限制 I/O 操作。MySQL 8.0.18 中添加。

- [innodb_log_checkpoint_fuzzy_now](/15/15.14/innodb-parameters.html)：强制 InnoDB 写入模糊检查点的调试选项。MySQL 8.0.13 中添加。

- [innodb_log_spin_cpu_abs_lwm](/15/15.14/innodb-parameters.html)：在等待刷新重做时，用户线程不再旋转的最小 CPU 使用量。MySQL 8.0.11 中添加。

- [innodb_log_spin_cpu_pct_hwm](/15/15.14/innodb-parameters)：等待刷新重做时用户线程不再旋转的最大 CPU 使用量。MySQL 8.0.11 中添加。

- [innodb_log_wait_for_flush_spin_hwm](/15/15.14/innodb-parameters.html)：等待刷新重做时用户线程不再旋转的最大平均日志刷新时间。MySQL 8.0.11 中添加。

- [innodb_log_writer_threads](/15/15.14/innodb-parameters.html)：启用专用日志编写器线程以写入和刷新重做日志。MySQL 8.0.22 中添加。

- [innodb_parallel_read_threads](/15/15.14/innodb-parameters.html)：并行索引读取的线程数。MySQL 8.0.14 中添加。

- [innodb_print_ddl_logs](/15/15.14/innodb-parameters.html)：是否将 DDL 日志打印到错误日志。MySQL 8.0.3 中添加。

- [innodb_redo_log_archive_dirs](/15/15.14/innodb-parameters.html)：标记的重做日志存档目录。MySQL 8.0.17 中添加。

- [innodb_redo_log_encrypt](/15/15.14/innodb-parameters.html)：控制加密表空间的重做日志数据的加密。MySQL 8.0.1 中添加。

- innodb_scan_directories：定义目录，以便在 InnoDB 恢复期间扫描表空间文件。MySQL 8.0.2 中添加。

- [innodb_segment_reserve_factor](/15/15.14/innodb-parameters.html)：保留为空页的表空间文件段页的百分比。MySQL 8.0.26 中添加。

- [innodb_spin_wait_pause_multiplier](/15/15.14/innodb-parameters.html)：用于确定自旋等待循环中暂停指令数的乘数值。MySQL 8.0.16 中添加。

- [innodb_stats_include_delete_marked](/15/15.14/innodb-parameters.html)：在计算持久的 InnoDB 统计数据时，包括删除标记的记录。MySQL 8.0.1 中添加。

- [innodb_temp_tablespaces_dir](/15/15.14/innodb-parameters.html)：会话临时表空间路径。MySQL 8.0.13 中添加。

- [innodb_tmpdir](/15/15.14/innodb-parameters.html)：在线 ALTER TABLE 操作期间创建的临时表文件的目录位置。MySQL 8.0.0 中添加。

- [innodb_undo_log_encrypt](/15/15.14/innodb-parameters.html)：控制加密表空间的撤消日志数据的加密。MySQL 8.0.1 中添加。

- [innodb_use_fdatasync](/15/15.14/innodb-parameters.html)：InnoDB 在将数据刷新到操作系统时是否使用 fdatasync() 而不是 fsync()。MySQL 8.0.26 中添加。

- [innodb_validate_tablespace_paths](/15/15.14/innodb-parameters.html)：在启动时启用表空间路径验证。MySQL 8.0.21 中添加。

- [internal_tmp_mem_storage_engine](/5/5.1/5.1.8/server-system-variables.html)：用于内存中内部临时表的存储引擎。MySQL 8.0.2 中添加。

- [keyring-migration-destination](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：密钥迁移目的地密钥环插件。MySQL 8.0.4 中添加。

- [keyring-migration-host](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：主机名称，用于连接到运行中的密钥迁移服务器。MySQL 8.0.4 中添加。

- [keyring-migration-password](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：用于连接到运行服务器进行密钥迁移的密码。MySQL 8.0.4 中添加。

- [keyring-migration-port](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：用于连接到运行服务器进行密钥迁移的 TCP/IP 端口号。MySQL 8.0.4 中添加。

- [keyring-migration-socket](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：Unix 套接字文件或 Windows 命名管道，用于连接到正在运行的服务器进行密钥迁移。MySQL 8.0.4 中添加。

- [keyring-migration-source](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：密钥迁移源密钥环插件。MySQL 8.0.4 中添加。

- [keyring-migration-to-component](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：密钥环迁移是从插件到组件的迁移。MySQL 8.0.24 中添加。

- [keyring-migration-user](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：用于连接到正在运行的服务器以进行密钥迁移的用户名。MySQL 8.0.4 中添加。

- [keyring_aws_cmk_id](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：AWS 密钥环插件客户主密钥 ID 值。MySQL 8.0.11 中添加。

- [keyring_aws_conf_file](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：AWS 密钥环插件配置文件位置。MySQL 8.0.11 中添加。

- [keyring_aws_data_file](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：AWS 密钥环插件存储文件位置。在MySQL 8.0.11中添加。

- [keyring_aws_region](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：AWS 密钥环插件区域。MySQL 8.0.11 中添加。

- [keyring_encrypted_file_data](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：keyring_encrypted_file 插件数据文件。 MySQL 8.0.11 中添加。

- [keyring_encrypted_file_password](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：keyring_encrypted_file 插件密码。 MySQL 8.0.11 中添加。

- [keyring_hashicorp_auth_path](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：HashiCorp Vault 应用角色认证路径。MySQL 8.0.18 中添加。

- [keyring_hashicorp_ca_path](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：keyring_hashicorp CA 文件路径。MySQL 8.0.18 中添加。

- [keyring_hashicorp_caching](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：是否启用 keyring_hashicorp 缓存。MySQL 8.0.18 中添加。

- [keyring_hashicorp_commit_auth_path](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：keyring_hashicorp_auth_path 使用中的值。MySQL 8.0.18 中添加。

- [keyring_hashicorp_commit_ca_path](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：keyring_hashicorp_ca_path 使用中的值。MySQL 8.0.18 中添加。

- [keyring_hashicorp_commit_caching](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：keyring_hashicorp_caching 使用中的值。MySQL 8.0.18 中添加。

- [keyring_hashicorp_commit_role_id](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：keyring_hashicorp_role_id 使用中的值。MySQL 8.0.18 中添加。

- [keyring_hashicorp_commit_server_url](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：keyring_hashicorp_server_url 使用中的值。MySQL 8.0.18 中添加。

- [keyring_hashicorp_commit_store_path](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：keyring_hashicorp_store_path 使用中的值。MySQL 8.0.18 中添加。

- [keyring_hashicorp_role_id](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：HashiCorp Vault 应用角色认证 ID。MySQL 8.0.18 中添加。

- [keyring_hashicorp_secret_id](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：HashiCorp Vault 应用角色认证密钥 ID。MySQL 8.0.18 中添加。

- [keyring_hashicorp_server_url](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：HashiCorp Vault 服务器 URL。MySQL 8.0.18 中添加。

- [keyring_hashicorp_store_path](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：HashiCorp Vault 存储路径。MySQL 8.0.18 中添加。

- [keyring_oci_ca_certificate](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：每个认证的 CA 认证文件。MySQL 8.0.22 中添加。

- [keyring_oci_compartment](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：OCI 隔间 OCID。MySQL 8.0.22 中添加。

- [keyring_oci_encryption_endpoint](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：OCI 加密服务器端。MySQL 8.0.22 中添加。

- [keyring_oci_key_file](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：OCI RSA 私钥文件 。MySQL 8.0.22 中添加。

- [keyring_oci_key_fingerprint](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：OCI RSA 私钥文件指纹。MySQL 8.0.22 中添加。

- [keyring_oci_management_endpoin](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)t：OCI 管理服务器端。MySQL 8.0.22 中添加。

- [keyring_oci_master_key](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：OCI 主密钥 OCID。MySQL 8.0.22 中添加。

- [keyring_oci_secrets_endpoint](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：OCI 密钥服务器端。MySQL 8.0.22 中添加。

- [keyring_oci_tenancy](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：OCI 租房 OCID。MySQL 8.0.22 中添加。

- [keyring_oci_user](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：OCI 用户 OCID。MySQL 8.0.22 中添加。

- [keyring_oci_vaults_endpoint](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：OCI vaults 服务器端。MySQL 8.0.22 中添加。

- [keyring_oci_virtual_vault](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：OCI vault OCID。MySQL 8.0.22 中添加。

- [keyring_okv_conf_dir](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：Oracle Key Vault 密钥环插件配置目录。MySQL 8.0.11 中添加。

- [keyring_operations](/6/6.4/6.4.4/6.4.4.17/keyring-options.html)：是否启用密钥圈操作。MySQL 8.0.4 中添加。

- [lock_order](/5/5.9/5.9.3/lock-order-tool.html)：是否在运行时启用 LOCK_ORDER 工具。 MySQL 8.0.17 中添加。

- [lock_order_debug_loop](/5/5.9/5.9.3/lock-order-tool.html)：当 LOCK_ORDER 工具遇到标记为循环的依赖项时，是否导致调试断言。 MySQL 8.0.17 中添加。

- [lock_order_debug_missing_arc](/5/5.9/5.9.3/lock-order-tool.html)：当 LOCK_ORDER 工具遇到未声明的依赖项时是否导致调试断言。 MySQL 8.0.17 中添加。

- [lock_order_debug_missing_key](/5/5.9/5.9.3/lock-order-tool.html)：当 LOCK_ORDER 工具遇到未使用性能模式正确检测的对象时，是否导致调试断言。MySQL 8.0.17 中添加。

- [lock_order_debug_missing_unlock](/5/5.9/5.9.3/lock-order-tool.html)：当 LOCK_ORDER 工具遇到仍然保持的锁被破坏时，是否导致调试断言。添MySQL 8.0.17 中添加。

- [lock_order_dependencies](/5/5.9/5.9.3/lock-order-tool.html)：lock_order_dependencies.txt 文件的路径。MySQL 8.0.17 中添加。

- [lock_order_extra_dependencies](/5/5.9/5.9.3/lock-order-tool.html)：第二个依赖文件的路径。MySQL 8.0.17 中添加。

- [lock_order_output_directory](/5/5.9/5.9.3/lock-order-tool.html)：LOCK_ORDER 工具写日志的目录。MySQL 8.0.17 中添加。

- [lock_order_print_txt](/5/5.9/5.9.3/lock-order-tool.html)：是否执行锁顺序图分析和打印文本报告。MySQL 8.0.17 中添加。

- [lock_order_trace_loop](/5/5.9/5.9.3/lock-order-tool.html)：当 LOCK_ORDER 工具遇到标记为循环的依赖性时，是否打印日志文件跟踪。MySQL 8.0.17 中添加。

- [lock_order_trace_missing_arc](/5/5.9/5.9.3/lock-order-tool.html)：当 LOCK_ORDER 工具遇到未申报的依赖性时，是否打印日志文件跟踪。MySQL 8.0.17 中添加。

- [lock_order_trace_missing_key](/5/5.9/5.9.3/lock-order-tool.html)：当 LOCK_ORDER 工具遇到未使用性能模式正确检测的对象时，是否打印日志文件跟踪。MySQL 8.0.17 中添加。

- [lock_order_trace_missing_unlock](/5/5.9/5.9.3/lock-order-tool.html)：当 LOCK_ORDER 工具遇到仍然保持的锁被破坏时，是否打印日志文件跟踪。MySQL 8.0.17 中添加。

- log_error_filter_rules：错误记录的过滤规则。MySQL 8.0.2 中添加。

- [log_error_services](/5/5.1/5.1.8/server-system-variables.html)：用于错误日志的组件。MySQL 8.0.2 中添加。

- [log_error_suppression_list](/17/17.1/17.1.6/17.1.6.4/replication-options-binary-log.html)：警告/信息错误日志消息要抑制。MySQL 8.0.13 中添加。

- [log_replica_updates](/5/5.1/5.1.8/server-system-variables.html)：复制器是否应将其复制 SQL 线程执行的更新记录到其自己的二进制日志。MySQL 8.0.26 中添加。

- [log_slow_extra](/5/5.1/5.1.8/server-system-variables.html)：是否编写额外信息以减慢查询日志文件。MySQL 8.0.14 中添加。

- [log_slow_replica_statements](/17/17.1/17.1.6/17.1.6.4/replication-options-binary-log.html)：将复制执行的慢报表写入以减慢查询日志。MySQL 8.0.26 中添加。

- [mandatory_roles](/5/5.1/5.1.8/server-system-variables.html)：自动授予所有用户的角色。MySQL 8.0.2 中添加。

- [mysql_firewall_mode](/6/6.4/6.4.7/6.4.7.4/firewall-reference.html)：MySQL 企业防火墙是否可操作。MySQL 8.0.11 中添加。

- [mysql_firewall_trace](/6/6.4/6.4.7/6.4.7.4/firewall-reference.html)：是否启用防火墙跟踪。MySQL 8.0.11 中添加。

- [mysqlx](/20/20.5/20.5.6/20.5.6.2/x-plugin-options-system-variables.html)：X 插件是否初始化。MySQL 8.0.11 中添加。

- [mysqlx_compression_algorithms](/20/20.5/20.5.6/20.5.6.2/x-plugin-options-system-variables.html)：X 协议连接允许的压缩算法。MySQL 8.0.19 中添加。

- [mysqlx_deflate_default_compression_level](/20/20.5/20.5.6/20.5.6.2/x-plugin-options-system-variables.html)：X 协议连接上的放气算法的默认压缩级别。MySQL 8.0.20 中添加。

- [mysqlx_deflate_max_client_compression_level](/20/20.5/20.5.6/20.5.6.2/x-plugin-options-system-variables.html)：X 协议连接上的放气算法的最大允许压缩级别。MySQL 8.0.20 中添加。

- [mysqlx_interactive_timeout](/20/20.5/20.5.6/20.5.6.2/x-plugin-options-system-variables.html)：等待交互式客户端超时的秒数。MySQL 8.0.4 中添加。

- [mysqlx_lz4_default_compression_level](/20/20.5/20.5.6/20.5.6.2/x-plugin-options-system-variables.html)：X 协议连接上的 LZ4 算法的默认压缩级别。MySQL 8.0.20 中添加。

- [mysqlx_lz4_max_client_compression_level](/20/20.5/20.5.6/20.5.6.2/x-plugin-options-system-variables.html)：X 协议连接上的 LZ4 算法的最大允许压缩级别。MySQL 8.0.20 中添加。

- [mysqlx_read_timeout](/20/20.5/20.5.6/20.5.6.2/x-plugin-options-system-variables.html)：等待阻止读取操作完成的秒数。MySQL 8.0.4 中添加。

- [mysqlx_wait_timeout](/20/20.5/20.5.6/20.5.6.2/x-plugin-options-system-variables.html)：等待连接活动的时间数。MySQL 8.0.4 中添加。

- [mysqlx_write_timeout](/20/20.5/20.5.6/20.5.6.2/x-plugin-options-system-variables.html)：等待阻止编写操作完成的秒数。MySQL 8.0.4 中添加。

- [mysqlx_zstd_default_compression_level](/20/20.5/20.5.6/20.5.6.2/x-plugin-options-system-variables.html)：X 协议连接上的 zstd 算法的默认压缩级别。MySQL 8.0.20 中添加。

- [mysqlx_zstd_max_client_compression_level](/20/20.5/20.5.6/20.5.6.2/x-plugin-options-system-variables.html)：X 协议连接上的 zstd 算法的最大允许压缩级别。MySQL 8.0.20 中添加。

- [named_pipe_full_access_group](/5/5.1/5.1.8/server-system-variables.html)：Windows 组的名称允许完全访问命名的管道。MySQL 8.0.14 中添加。

- [no-dd-upgrade](/5/5.1/5.1.7/server-options.html)：防止在启动时自动升级数据字典表。MySQL 8.0.4 中添加。

- [no-monitor](/5/5.1/5.1.7/server-options.html)：不为 RESTART fork 所需的监视进程。MySQL 8.0.12 中添加。

- [original_commit_timestamp](/17/17.1/17.1.6/17.1.6.4/replication-options-binary-log.html)：在原始源上提交事务的时间。MySQL 8.0.1 中添加。

- [original_server_version](/17/17.1/17.1.6/17.1.6.4/replication-options-binary-log.html)：MySQL Server 最初提交事务的服务器版本号。MySQL 8.0.14 中添加。

- [partial_revokes](/5/5.1/5.1.8/server-system-variables.html)：是否启用部分撤销。MySQL 8.0.16 中添加。

- [password_history](/5/5.1/5.1.8/server-system-variables.html)：密码重用前需要更改的密码次数。MySQL 8.0.3 中添加。

- [password_require_current](/5/5.1/5.1.8/server-system-variables.html)：密码更改是否需要当前密码验证。MySQL 8.0.13 中添加。

- [password_reuse_interval](/5/5.1/5.1.8/server-system-variables.html)：密码重用前所需的天数。MySQL 8.0.3 中添加。

- [performance_schema_max_digest_sample_age](/27/27.15/performance-schema-system-variables.html)：查询重采样时长秒。MySQL 8.0.3 中添加。

- [performance_schema_show_processlist](/27/27.15/performance-schema-system-variables.html)：选择 SHOW PROCESSLIST 实现。MySQL 8.0.22 中添加。

- [persist_only_admin_x509_subject](/5/5.1/5.1.8/server-system-variables.html)：SSL 证书 X.509 主题，支持持久化受限系统变量。MySQL 8.0.14 中添加。

- [persisted_globals_load](/5/5.1/5.1.8/server-system-variables.html)：是否加载持续配置设置。MySQL 8.0.0 中添加。

- [print_identified_with_as_hex](/5/5.1/5.1.8/server-system-variables.html)：对于 SHOW CREATE USER，以十六进制打印包含不可打印字符的哈希值。MySQL 8.0.17 中添加。

- [protocol_compression_algorithms](/5/5.1/5.1.8/server-system-variables.html)：允许的传入连接压缩算法。MySQL 8.0.18 中添加。

- [pseudo_replica_mode](/5/5.1/5.1.8/server-system-variables.html)：内部服务器使用。MySQL 8.0.26 中添加。

- [regexp_stack_limit](/5/5.1/5.1.8/server-system-variables.html)：正则表达式匹配堆栈大小限制。MySQL 8.0.4 中添加。

- [regexp_time_limit](/5/5.1/5.1.8/server-system-variables.html)：正则表达式匹配超时。MySQL 8.0.4 中添加。

- [replica_checkpoint_group](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：在调用检查点操作以更新进度状态之前，多线程复制副本处理的最大事务数。NDB 群集不支持。MySQL 8.0.26 中添加。

- [replica_checkpoint_period](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：在此毫秒数之后，更新多线程复制副本的进度状态并将中继日志信息刷新到磁盘。NDB 群集不支持。 MySQL 8.0.26 中添加。

- [replica_compressed_protocol](/17/17.1/17.1.6/17.1.6.3/replication-options-replica)：使用源/副本协议的压缩。MySQL 8.0.26 中添加。

- [replica_exec_mode](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：允许在 IDEMPOTENT 模式（键和一些其他错误被抑制）和 STRICT 模式之间切换复制线程；STRICT 模式是默认模式，但 NDB 集群除外，其中始终使用 IDEMPOTENT。MySQL 8.0.26 中添加。

- [replica_load_tmpdir](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：复制 LOAD DATA 语句时副本放置其临时文件的位置。MySQL 8.0.26 中添加。

- [replica_max_allowed_packet](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：可从复制源服务器发送到复制副本的数据包的最大大小（字节）；覆盖允许的 max_allowed_packet。MySQL 8.0.26 中添加。

- [replica_net_timeout](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：中止读取之前等待源/副本连接中的更多数据的秒数。MySQL 8.0.26 中添加。

- [replica_parallel_type](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：告诉复制副本使用时间戳信息（LOGICAL_CLOCK）或数据库分区（DATABASE）来并行化事务。MySQL 8.0.26 中添加。

- [replica_parallel_workers](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：用于并行执行复制事务的应用程序线程数。0 禁用副本多线程。不支持 MySQL 集群。MySQL 8.0.26 中添加。

- [replica_pending_jobs_size_max](/17/17.1/17.1.6/17.1.6.3/replication-options-replica)：包含尚未应用的事件的副本工作队列的最大大小。MySQL 8.0.26 中添加。

- [replica_preserve_commit_order](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：确保复制工作者的所有承诺都以与源相同的顺序发生，以便在使用平行适用线程时保持一致性。MySQL 8.0.26 中添加。

- [replica_skip_errors](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：当查询从提供的列表返回错误时，告诉复制线程继续复制。MySQL 8.0.26 中添加。

- [replica_sql_verify_checksum](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：使复制副本在读取中继日志时检查校验和。MySQL 8.0.26 中添加。

- [replica_transaction_retries](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：复制 SQL 线程在事务因死锁或已用锁等待超时而失败时，在放弃和停止之前重试事务的次数。MySQL 8.0.26 中添加。

- [replica_type_conversions](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：控制副本上的类型转换模式。值是此列表中零个或多个元素的列表：ALL_LOSSY、ALL_NON_LOSSY。设置为空字符串以禁止源和副本之间的类型转换。MySQL 8.0.26 中添加。

- [replication_optimize_for_static_plugin_config](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：用于半同步复制的共享锁。MySQL 8.0.23 中添加。

- [replication_sender_observe_commit_only](/17/17.1/17.1.6/17.1.6.3/replication-options-replica)：半同步复制的有限回调。MySQL 8.0.23 中添加。

- [require_row_format](/5/5.1/5.1.8/server-system-variables.html)：内部服务器使用。MySQL 8.0.19 中添加。

- [resultset_metadata](/5/5.1/5.1.8/server-system-variables.html)：服务器是否返回结果设置元数据。MySQL 8.0.3 中添加。

- [rpl_read_size](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：设置从二进制日志文件和中继日志文件读取的最小字节数据量。MySQL 8.0.11 中添加。

- [rpl_semi_sync_replica_enabled](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：是否在副本上启用了半同步复制。MySQL 8.0.26 中添加。

- [rpl_semi_sync_replica_trace_level](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：副本上的半同步复制调试跟踪级别。MySQL 8.0.26 中添加。

- [rpl_semi_sync_source_enabled](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：半同步复制是否在源上启用。MySQL 8.0.26 中添加。

- [rpl_semi_sync_source_timeout](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：等待副本确认的毫秒数。MySQL 8.0.26 中添加。

- [rpl_semi_sync_source_trace_level](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：源上的半同步复制调试跟踪级别。MySQL 8.0.26 中添加。

- [rpl_semi_sync_source_wait_for_replica_count](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：在继续之前，每个事务源必须接收的副本确认数。MySQL 8.0.26 中添加。

- [rpl_semi_sync_source_wait_no_replica](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：源是否等待超时， 即使没有副本。MySQL 8.0.26 中添加。

- [rpl_semi_sync_source_wait_point](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：副本事务接收确认的等待点。MySQL 8.0.26 中添加。

- [rpl_stop_replica_timeout](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：STOP REPLICA 超时等待时间。MySQL 8.0.26 中添加。

- [secondary_engine_cost_threshold](/5/5.1/5.1.8/server-system-variables.html)：查询卸载到辅助引擎的优化器成本阈值。MySQL 8.0.16 中添加。

- [select_into_buffer_size](/5/5.1/5.1.8/server-system-variables.html)：用于 OUTFILE 或 DUMPFILE 的缓冲器大小;覆盖 read_buffer_size。MySQL 8.0.22 中添加。

- [select_into_disk_sync](/5/5.1/5.1.8/server-system-variables.html)：冲洗外文件或 DUMPFILE 出口文件的冲洗缓冲后，将数据与存储设备同步：OFF 禁用同步，是默认值。MySQL 8.0.22 中添加。

- [select_into_disk_sync_delay](/5/5.1/5.1.8/server-system-variables.html)：当select_into_sync_disk = ON 时，每次同步 OUTFILE 或 DUMPFILE 出口文件缓冲后，设置延迟几毫秒，否则不会产生任何效果。MySQL 8.0.22 中添加。

- [show-replica-auth-info](/17/17.1/17.1.6/17.1.6.2/replication-options-source.html)：在此源上 SHOW REPLICAS 中显示用户名和密码。MySQL 8.0.26 中添加。

- [show_create_table_skip_secondary_engine](/5/5.1/5.1.8/server-system-variables.html)：是否在 SHOW CREATE TABLE 输出中排除 SECONDARY ENGINE 子句。MySQL 8.0.18 中添加。

- [show_create_table_verbosity](/5/5.1/5.1.8/server-system-variables.html)：是否在 SHOW CREATE TABLE 中显示 ROW_FORMAT，即使它具有默认值。MySQL 8.0.11 中添加。

- [skip-replica-start](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：如果设置，复制服务器启动时不会自动启动。MySQL 8.0.26 中添加。

- [source_verify_checksum](/17/17.1/17.1.6/17.1.6.4/replication-options-binary-log.html)：导致源在从二进制日志中读取时检查检查库。MySQL 8.0.26 中添加。

- [sql_replica_skip_counter](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：复制品应跳过的源事件数量。与 GTID 复制不兼容。MySQL 8.0.26 中添加。

- [sql_require_primary_key](/5/5.1/5.1.8/server-system-variables.html)：表是否必须有主密钥。MySQL 8.0.13 中添加。

- [ssl_fips_mode](/5/5.1/5.1.8/server-system-variables.html)：是否在服务器端启用 FIPS 模式。MySQL 8.0.11 中添加。

- [sync_source_info](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：每次 #th 事件后同步源信息。MySQL 8.0.26 中添加。

- [syseventlog.facility](/5/5.1/5.1.8/server-system-variables.html)：syslog 消息的功能。MySQL 8.0.13 中添加。

- [syseventlog.include_pid](/5/5.1/5.1.8/server-system-variables.html)：是否将服务器 PID 包含在 syslog 消息中。MySQL 8.0.13 中添加。

- [syseventlog.tag](/5/5.1/5.1.8/server-system-variables.html)：在 syslog 消息中标记服务器标识符。MySQL 8.0.13 中添加。

- [table_encryption_privilege_check](/5/5.1/5.1.8/server-system-variables.html)：启用 TABLE_ENCRYPTION_ADMIN 权限检查。MySQL 8.0.16 中添加。

- [temptable_max_mmap](/5/5.1/5.1.8/server-system-variables.html)：TempTable 存储引擎可以从内存映射的临时文件中分配的最大内存量。MySQL 8.0.23  中添加。

- [temptable_max_ram](/5/5.1/5.1.8/server-system-variables.html)：定义在数据存储在磁盘上之前，TempTable 存储引擎可以占用的最大内存量。MySQL 8.0.2 中添加。

- [temptable_use_mmap](/5/5.1/5.1.8/server-system-variables.html)：定义 TempTable 存储引擎在达到 temptable_max_ram 阈值时是否分配内存映射文件。MySQL 8.0.16 中添加。

- [terminology_use_previous](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：在更改不兼容的指定版本之前使用术语。MySQL 8.0.26 中添加。

- [thread_pool_algorithm](/5/5.1/5.1.8/server-system-variables.html)：线程池算法。MySQL 8.0.11 中添加。

- [thread_pool_high_priority_connection](/5/5.1/5.1.8/server-system-variables.html)：当前会话是否最高优先级。MySQL 8.0.11 中添加。

- [thread_pool_max_active_query_threads](/5/5.1/5.1.8/server-system-variables.html)：每个组允许的最大活动查询线程数。MySQL 8.0.19 中添加。

- [thread_pool_max_unused_threads](/5/5.1/5.1.8/server-system-variables.html)：允许的最大未使用线程数。MySQL 8.0.11 中添加。

- [thread_pool_prio_kickup_timer](/5/5.1/5.1.8/server-system-variables.html)：语句移动到高优先级执行之前的多长时间。MySQL 8.0.11 中添加。

- [thread_pool_size](/5/5.1/5.1.8/server-system-variables.html)：线程池中的线程组数。MySQL 8.0.11 中添加。

- [thread_pool_stall_limit](/5/5.1/5.1.8/server-system-variables.html)：在语句定义为暂停之前多长时间。MySQL 8.0.11 中添加。

- [tls_ciphersuites](/5/5.1/5.1.8/server-system-variables.html)：允许用于加密连接的 TLSv1.3 密码套件。MySQL 8.0.16 中添加。

- [upgrade](/5/5.1./5.1.7/server-options.html)：在启动时控制自动升级。MySQL 8.0.16 中添加。

- [use_secondary_engine](/5/5.1/5.1.8/server-system-variables.html)：是否使用辅助引擎执行查询。MySQL 8.0.13 中添加。

- [validate-config](/5/5.1./5.1.7/server-options.html)：验证服务器配置。MySQL 8.0.16 中添加。

- [alidate_password.check_user_name](/6/6.4/6.4.3/6.4.3.2/validate-password-options-variables.html)：是否根据用户名检查密码。MySQL 8.0.4 中添加。

- [validate_password.dictionary_file](/6/6.4/6.4.3/6.4.3.2/validate-password-options-variables.html)：validate_password 字典文件。MySQL 8.0.4 中添加。

- [validate_password.dictionary_file_last_parsed](/6/6.4/6.4.3/6.4.3.2/validate-password-options-variables.html)：当字典文件最后解析时。MySQL 8.0.4 中添加。

- [validate_password.dictionary_file_words_count](/6/6.4/6.4.3/6.4.3.2/validate-password-options-variables.html)：字典文件中的单词数。MySQL 8.0.4 中添加。

- [validate_password.length](/6/6.4/6.4.3/6.4.3.2/validate-password-options-variables.html)：validate_password 所需的密码长度。MySQL 8.0.4 中添加。

- [validate_password.mixed_case_count](/6/6.4/6.4.3/6.4.3.2/validate-password-options-variables.html)：validate_password 需要的大写/小写字符数量。MySQL 8.0.4 中添加。

- [validate_password.number_count](/6/6.4/6.4.3/6.4.3.2/validate-password-options-variables.html)：validate_password 所需的数字字符数。MySQL 8.0.4 中添加。

- [validate_password.policy](/6/6.4/6.4.3/6.4.3.2/validate-password-options-variables.html)：validate_password 密码策略。MySQL 8.0.4 中添加。

- [validate_password.special_char_count](/6/6.4/6.4.3/6.4.3.2/validate-password-options-variables.html)：validate_password 特殊字符的数量。MySQL 8.0.4 中添加。

- [version_compile_zlib](/5/5.1/5.1.8/server-system-variables.html)：在 zlib 库中编译的版本。MySQL 8.0.11 中添加。

- [windowing_use_high_precision](/5/5.1/5.1.8/server-system-variables.html)：是否将窗口函数提到高精度。MySQL 8.0.2 中添加。

## MySQL 8.0 中弃用的选项和变量

以下系统变量、状态变量和选项在 MySQL 8.0 中已被弃用。

- [Compression](/5/5.1/5.1.10/server-status-variables.html)：客户端连接是否在客户端/服务器协议中使用压缩。MySQL 8.0.18 中已弃用。

- [Slave_open_temp_tables](/5/5.1/5.1.10/server-status-variables.html)：复制SQL线程当前打开的临时表数。MySQL 8.0.26 中已弃用。

- [Slave_rows_last_search_algorithm_used](/5/5.1/5.1.10/server-status-variables.html)：此复制副本最近使用的搜索算法，用于定位基于行的复制（索引、表或哈希扫描）的行。MySQL 8.0.26 中已弃用。

- [admin-ssl](/5/5.1/5.1.7/server-options.html)：启用连接加密。MySQL 8.0.26中已弃用。

- [default_authentication_plugin](/5/5.1/5.1.8/server-system-variables.html)：默认认证插件。MySQL 8.0.27 中已弃用。

- [expire_logs_days](/17/17.1/17.1.6/17.1.6.4/replication-options-binary-log.html)：在这许多天后清除二进制日志。MySQL 8.0.3 中已弃用。

- [group_replication_ip_whitelist](/18/18.9/group-replication-options.html)：允许连接到组的主机列表。MySQL 8.0.22 中已弃用。

- [have_openssl](/5/5.1/5.1.8/server-system-variables.html):mysqld 是否支持 SSL 连接。MySQL 8.0.26 中已弃用。

- [have_ssl](/5/5.1/5.1.8/server-system-variables.html)：mysqld 是否支持 SSL 连接。MySQL 8.0.26 中已弃用。

- [init_slave](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：复制副本连接到源时执行的语句。MySQL 8.0.26 中已弃用。

- [innodb_undo_tablespaces](/15/15.14/innodb-parameters.html): 回滚段划分的表空间文件数。MySQL 8.0.4 中已弃用。

- [log_bin_use_v1_row_events](/17/17.1/17.1.6/17.1.6.4/replication-options-binary-log.html)：服务器是否使用版本1二进制日志行事件。MySQL 8.0.18 中已弃用。

- [log_slave_updates](/17/17.1/17.1.6/17.1.6.4/replication-options-binary-log.html)：复制副本是否应将其复制 SQL 线程执行的更新记录到其自己的二进制日志中。MySQL 8.0.26 中已弃用。

- [log_slow_slave_statements](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：使副本执行的慢语句写入慢查询日志。MySQL 8.0.26 中已弃用。

- [log_syslog](/5/5.1/5.1.8/server-system-variables.html)：是否将错误日志写入 syslog。MySQL 8.0.2 中已弃用。

- [master-info-file](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：记住源以及 I/O 复制线程在源二进制日志中的位置的文件的位置和名称。MySQL 8.0.18 中已弃用。

- [master_info_repository](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：是否将连接元数据存储库（包含源二进制日志中的源信息和复制 I/O 线程位置）写入文件或表。MySQL 8.0.23 中已弃用。

- [master_verify_checksum](/17/17.1/17.1.6/17.1.6.4/replication-options-binary-log.html)：使源在从二进制日志读取时检查校验和。MySQL 8.0.26 中已弃用。

- [max_length_for_sort_data](/5/5.1/5.1.8/server-system-variables.html)：排序记录中的最大字节数。MySQL 8.0.20 中已弃用。

- [no-dd-upgrade](/5/5.1/5.1.7/server-options.html)：防止在启动时自动升级数据字典表。MySQL 8.0.16 中已弃用。

- [pseudo_slave_mode](/5/5.1/5.1.8/server-system-variables.html)：内部服务器使用。MySQL 8.0.26 中已弃用。

- [query_prealloc_size](/5/5.1/5.1.8/server-system-variables.html)：用于查询解析和执行的持久缓冲区。MySQL 8.0.29 中已弃用。

- [relay_log_info_file](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：应用者元数据存储库的文件名，副本在其中记录有关中继日志的信息。MySQL 8.0.18 中已弃用。

- [relay_log_info_repository](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：是将中继日志中复制 SQL 线程的位置写入文件还是表。MySQL 8.0.23 中已弃用。

- [rpl_stop_slave_timeout](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：超时前 STOP REPLICA 或 STOP SLAVE 等待的秒数。MySQL 8.0.26 中已弃用。

- [show-slave-auth-info](/17/17.1/17.1.6/17.1.6.2/replication-options-source.html)：展示在此源上 SHOW REPLICAS 中用户名和密码，及 SHOW SLAVE HOSTS。MySQL 8.0.26 中已弃用。

- [skip-slave-start](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：如果已设置，则在副本服务器启动时复制不会自动启动。MySQL 8.0.26 中已弃用。

- [slave-skip-errors](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：当查询从提供的列表返回错误时，通知复制线程继续复制。MySQL 8.0.26 中已弃用。

- [slave_checkpoint_group](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：在调用检查点操作以更新进度状态之前，多线程复制副本处理的最大事务数。NDB 群集不支持。MySQL 8.0.26 中已弃用。

- [slave_checkpoint_period](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：在这个毫秒数之后更新多线程副本的进度状态并将中继日志信息刷新到磁盘。NDB 群集不支持。MySQL 8.0.26 中已弃用。

- [slave_compressed_protocol](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：使用源/副本协议的压缩。MySQL 8.0.18中已弃用。

- [slave_load_tmpdir](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：复制 LOAD DATA 语句时复制副本应放置其临时文件的位置。MySQL 8.0.26中已弃用。

- [slave_max_allowed_packet](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：可以从复制源服务器发送到复制副本的数据包的最大大小（以字节为单位）；覆盖允 max_allowed_packet。MySQL 8.0.26 中已弃用。

- [slave_net_timeout](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：在中止读取之前，等待源/副本连接提供更多数据的秒数。MySQL 8.0.26 中已弃用。

- [slave_parallel_type](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：告诉复制副本使用时间戳信息（LOGICAL_CLOCK）或数据库分区（DATABASE）来并行化事务。MySQL 8.0.26 中已弃用。

- [slave_parallel_worker](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：用于并行执行复制事务的应用程序线程数。0禁用副本多线程。MySQL 群集不支持。MySQL 8.0.26 中已弃用。

- [slave_pending_jobs_size_max](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：包含尚未应用的事件的副本工作队列的最大大小。MySQL 8.0.26 中已弃用。

- [slave_preserve_commit_order](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：确保在使用并行应用者线程时，副本工作线程的所有提交都以与源上相同的顺序进行，以保持一致性。MySQL 8.0.26 中已弃用。

- [slave_rows_search_algorithms](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：确定用于副本更新批处理的搜索算法。此列表中的任意两到三个：INDEX_SEARCH、TABLE_SCAN、HASH_SCAN。MySQL 8.0.18  中已弃用。

- [slave_sql_verify_checksum](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：使复制副本在从中继日志读取时检查校验和。MySQL 8.0.26中已弃用。

- [slave_transaction_retries](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：复制 SQL 线程在事务因死锁或已用锁等待超时而失败时，在放弃和停止之前重试事务的次数。MySQL 8.0.26 中已弃用。

- [slave_type_conversions](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：控制副本上的类型转换模式。值是此列表中零个或多个元素的列表：ALL_LOSSY、ALL_NON_LOSSY。设置为空字符串以禁止源和副本之间的类型转换。MySQL 8.0.26 中已弃用。

- [sql_slave_skip_counter](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：复制副本应跳过的源事件数。与 GTID 复制不兼容。MySQL 8.0.26中已弃用。

- [ssl](/5/5.1/5.1.7/server-options.html)：启用连接加密。MySQL 8.0.26 中已弃用。

- [symbolic-links](/5/5.1/5.1.7/server-options.html)：允许 MyISAM 表的符号链接。MySQL 8.0.2 中已弃用。

- [sync_master_info](/17/17.1/17.1.6/17.1.6.3/replication-options-replica.html)：在每个 #th 事件后同步源信息。MySQL 8.0.26 中已弃用。

- [temptable_use_mmap](/5/5.1/5.1.8/server-system-variables.html)：定义当达到 temptable_max_ram 阈值时，TempTable 存储引擎是否分配内存映射文件。MySQL 8.0.26 中已弃用。

- [transaction_prealloc_size](/5/5.1/5.1.8/server-system-variables.html)：用于存储在二进制日志中的事务的持久缓冲区。MySQL 8.0.29中已弃用。

- [transaction_write_set_extraction](/17/17.1/17.1.6/17.1.6.4/replication-options-binary-log.html)：定义用于对事务期间提取的写入进行哈希运算的算法。MySQL 8.0.26 中已弃用。

## MySQL 8.0 中删除的选项和变量

MySQL 8.0 中删除了以下系统变量、状态变量和选项。

- Com_alter_db_upgrade：ALTER DATABASE ... UPGRADE DATA DIRECTORY NAME 计数。MySQL 8.0.0 中删除。

- Innodb_available_undo_logs：Innodb 回滚段的总数；与 innodb_rollback_segments 不同，innodb_rollback_段显示活动回滚段的数量。MySQL 8.0.2 中删除。

- Qcache_free_blocks：查询缓存中的可用内存块数。MySQL 8.0.3 中删除。

- Qcache_free_memory：查询缓存的可用内存量。MySQL 8.0.3 中删除。

- Qcache_hits：查询缓存命中数。MySQL 8.0.3 中删除。

- Qcache_inserts：查询缓存插入的数量。MySQL 8.0.3 中删除。

- Qcache_lowmem_prunes：由于缓存中缺少可用内存而从查询缓存中删除的查询数。MySQL 8.0.3 中删除。

- Qcache_not_cached：未缓存的查询数（不可缓存，或由于查询缓存类型设置而未缓存）。MySQL 8.0.3 中删除。

- Qcache_querys_in_cache：在查询缓存中注册的查询数。MySQL 8.0.3 中删除。

- Qcache_total_blocks：查询缓存中的块总数。MySQL 8.0.3 中删除。

- Slave_heartbeat_period：复制副本的复制心跳周期，以秒为单位。MySQL 8.0.1 中删除。

- Slave_last_heartbeat：以时间戳（TIMESTAMP）格式显示何时接收到最新的心跳信号。MySQL 8.0.1 中删除。

- Slave_received_heartbeats：自上次重置以来复制副本接收的心跳数。MySQL 8.0.1 中删除。

- Slave_retried_transactions：自启动以来，复制SQL线程重试事务的总次数。MySQL 8.0.1 中删除。

- Slave_running：此服务器作为副本的状态（复制I/O线程状态）。MySQL 8.0.1 中删除。

- bootstrap：由mysql安装脚本使用。MySQL 8.0.0 中删除。

- date_format：DATE（未使用）。MySQL 8.0.3 中删除。

- datetime_format：日期或时间戳（DATETIME/TIMESTAMP）格式（未使用）。MySQL 8.0.3 中删除。

- des-key-file：从给定文件加载 des_encrypt() 和 des_encrypt 的密钥。MySQL 8.0.3 中删除。

- group_replication_allow_local_disjoint_gtids_join：允许当前服务器加入组，即使该组中不存在事务。MySQL 8.0.4 中删除。

- have_crypt:crypt() 系统调用的可用性。MySQL 8.0.3 中删除。

- ignore-db-dir：将目录视为非数据库目录。MySQL 8.0.0 中删除。

- ignore_builtin_innodb：忽略内置的 InnoDB。MySQL 8.0.3 中删除。

- ignore_db_dirs：被视为非数据库目录的目录。MySQL 8.0.0 中删除。

- innodb_checksums：启用 InnoDB 校验和验证。MySQL 8.0.0 中删除。

- innodb_disable_resize_buffer_pool_debug：禁用 InnoDB 缓冲池的大小调整。MySQL 8.0.0 中删除。

- innodb_file_format：新 InnoDB 表的格式。MySQL 8.0.0 中删除。

- innodb_file_format_check：InnoDB 是否执行文件格式兼容性检查。MySQL 8.0.0 中删除。

- innodb_file_format_max：共享表空间中的文件格式标记。MySQL 8.0.0 中删除。

- innodb_large_prefix：为列前缀索引启用更长的键。MySQL 8.0.0 中删除。

- innodb_locks_unsafe_for_binlog：强制 InnoDB 不使用下一个密钥锁定。相反，只使用行级锁定。MySQL 8.0.0 中删除。

- innodb_scan_directories：定义在 InnoDB 恢复期间扫描表空间文件的目录。MySQL 8.0.4 中删除。

- innodb_stats_sample_pages：索引分布统计中要采样的索引页数。MySQL 8.0.0 中删除。

- innodb_support_xa：为 xa 两阶段提交启用 InnoDB支持。MySQL 8.0.0 中删除。

- innodb_undo_logs：InnoDB 使用的撤消日志（回滚段）数量；innodb_rollback_segments 的别名。MySQL 8.0.2 中删除。

- [internal_tmp_disk_storage_engine](/5/5.1/5.1.8/server-system-variables.html)：用于内部临时表的存储引擎。MySQL 8.0.16 中删除。

- log-warnings：将一些非关键警告写入日志文件。MySQL 8.0.3 中删除。

- log_builtin_as_identified_by_password：是否记录创建/更改用户，以向后兼容的方式授予。MySQL 8.0.11 中删除。

- log_error_filter_rules：错误日志的过滤规则。MySQL 8.0.4 中删除。

- [log_syslog](/5/5.1/5.1.8/server-system-variables.html)：是否将错误日志写入 syslog。MySQL 8.0.13 中删除。

- [log_syslog_facility](/5/5.1/5.1.8/server-system-variables.html)：用于 syslog 消息的设施。MySQL 8.0.13 中删除。

- [log_syslog_include_pid](/5/5.1/5.1.8/server-system-variables.html)：是否在 syslog 消息中包含服务器 pid。MySQL 8.0.13 中删除。

- [log_syslog_tag](/5/5.1/5.1.8/server-system-variables.html)：syslog 消息中服务器标识符的标记。MySQL 8.0.13 中删除。

- max_tmp_tables：未使用。MySQL 8.0.3 中删除。

- [metadata_locks_cache_size](/5/5.1/5.1.8/server-system-variables.html)：元数据锁定缓存的大小。MySQL 8.0.13 中删除。

- [metadata_locks_hash_instances](/5/5.1/5.1.8/server-system-variables.html)：元数据锁哈希数。MySQL 8.0.13 中删除。

- multi_range_count：范围选择期间一次发送到表处理程序的最大范围数。MySQL 8.0.3 中删除。

- old_passwords：为 password() 选择密码哈希方法。MySQL 8.0.11 中删除。

- partition：启用（或禁用）分区支持。MySQL 8.0.0 中删除。

- query_cache_limit：不要缓存大于此值的结果。MySQL 8.0.3 中删除。

- query_cache_min_res_unit：为结果分配空间的单元的最小大小（写入所有结果数据后最后一个单元被修剪）。MySQL 8.0.3 中删除。

- query_cache_size：分配用于存储旧查询结果的内存。MySQL 8.0.3 中删除。

- query_cache_type：查询缓存类型。MySQL 8.0.3 中删除。

- query_cache_wlock_invalidate：在写锁定时使查询缓存中的查询无效。MySQL 8.0.3 中删除。

- secure_auth：不允许对具有旧（4.1之前）密码的帐户进行身份验证。MySQL 8.0.3 中删除。

- show_compatibility_56：显示状态/变量的兼容性。MySQL 8.0.1 中删除。

- skip-partition：不启用用户定义的分区。在MySQL 8.0.0中删除。

- sync_frm：创建时将 .frm 同步到磁盘。默认情况下启用。MySQL 8.0.0 中删除。

- temp-pool：使用此选项会导致创建的大多数临时文件使用一小组名称，而不是每个新文件的唯一名称。MySQL 8.0.1 中删除。

- time_format：时间格式（未使用）。MySQL 8.0.3 中删除。

- tx_isolation：默认事务隔离级别。MySQL 8.0.3 中删除。

- tx_read_only：默认事务访问模式。MySQL 8.0.3 中删除。

> [原文链接](https：//dev.mysql.com/doc/refman/8.0/en/added-deprecated-removed.html)
