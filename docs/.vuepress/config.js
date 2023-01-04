module.exports = {
  title: 'MySQL 8.0 中文参考手册',
  description: '对官方参考手册的翻译，持续翻译中',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'keywords', content: 'mysql,sql,innodb' }],
    ['script', { src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8380975615223941', crossorigin: 'anonymous' }]
  ],
  base: '/',
  markdown: {
    lineNumbers: true
  },
  plugins: [
    [
      '@vuepress/google-analytics', {
        'ga': ''
      }
    ],
    [
      '@renovamen/vuepress-plugin-baidu-tongji', {
        'ba': 'ece50ab3c3bf1d0d5c67f008f83b769f'
      }
    ]
  ],
  themeConfig: {
    logo: '/favicon.ico',
    nav: [
      { text: 'BookHub 首页', link: 'https://www.bookhub.tech' },
      { text: '中文文档', link: 'https://docs.bookhub.tech' },
      { text: '计算机书库', link: 'https://pdf.bookhub.tech' },
      { text: 'GitHub', link: 'https://github.com/dev2007/mysql8-manual' }
    ],
    sidebar: [
      ["/", "MySQL 翻译说明"],
      ['/mysql', '前言和法律条款'],
      {
        title: '基本信息',
        path: '/1/introduction',
        children: [
          ['/1/1.1/manual-info', '关于本手册'],
          {
            title: 'MySQL 数据库管理系统概述',
            path: '/1/1.2/what-is',
            children: [
              ['/1/1.2/1.2.1/what-is-mysql', '什么是 MySQL ？'],
              ['/1/1.2/1.2.2/features', 'MySQL 主要特性'],
              ['/1/1.2/1.2.3/history', 'MySQL 历史']
            ]
          },
          ['/1/1.3/mysql-nutshell', 'MySQL 8.0 新增特性'],
          ['/1/1.4/added-deprecated-removed', 'MySQL 8.0 中添加、弃用或删除的服务器和状态变量及选项'],
          ['/1/1.5/bug-reports', '如何报告错误或问题'],
          {
            title: 'MySQL 标准遵从性',
            path: '/1/1.6/compatibility',
            children: [
              ['/1/1.6/1.6.1/extensions-to-ansi', 'MySQL 对标准 SQL 的扩展'],
              {
                title: 'MySQL 与标准 SQL 的区别',
                path: '/1/1.6/1.6.2/differences-from-ansi',
                children: [
                  ['/1/1.6/1.6.2/1.6.2.1/ansi-diff-select-into-table', 'SELECT INTO TABLE 区别'],
                  ['/1/1.6/1.6.2/1.6.2.2/ansi-diff-update', 'UPDATE 区别'],
                  ['/1/1.6/1.6.2/1.6.2.3/ansi-diff-foreign-keys', 'FOREIGN KEY 约束的区别'],
                  ['/1/1.6/1.6.2/1.6.2.4/ansi-diff-comments', "'--' 作为备注的开头"]
                ]
              },
              {
                title: 'MySQL 如何处理约束',
                path: '/1/1.6/1.6.3/constraints',
                children: [
                  ['/1/1.6/1.6.3/1.6.3.1/constraint-primary-key', 'PRIMARY KEY 和 UNIQUE 索引约束'],
                  ['/1/1.6/1.6.3/1.6.3.2/constraint-foreign-key', 'FOREIGN KEY 约束'],
                  ['/1/1.6/1.6.3/1.6.3.3/constraint-invalid-data', '对无效数据的强制约束'],
                  ['/1/1.6/1.6.3/1.6.3.4/constraint-enum', 'ENUM 和 SET 约束']
                ]
              }
            ]
          },
          {
            title: 'MySQL 贡献者',
            path: '/1/1.7/credits',
            children: [
              ['/1/1.7/1.7.1/contributors', 'MySQL 贡献者'],
              ['/1/1.7/1.7.2/documenters-translators', '资料员和翻译'],
              ['/1/1.7/1.7.3/packages', '支持 MySQL 的包'],
              ['/1/1.7/1.7.4/tools-used-to-create-mysql', '用于创建 MySQL 的工具'],
              ['/1/1.7/1.7.5/supporters', 'MySQL 支持者']
            ]
          }
        ]
      },
      {
        title: 'MySQL 的安装和升级',
        path: '/2/installing',
        children: [
          {
            title: '通用安装指南',
            path: '/2/2.1/general-installation-issues',
            children: [
              ['/2/2.1/2.1.1/platform-support', '支持的平台'],
              ['/2/2.1/2.1.2/which-version', '安装哪个 MySQL 版本和发行版'],
              ['/2/2.1/2.1.3/getting-mysql', '如何获取 MySQL'],
              {
                title: '使用 MD5 校验和或 GnuPG 验证包完整性',
                path: '/2/2.1/2.1.4/verifying-package-integrity',
                children: [
                  ['/2/2.1/2.1.4/2.1.4.1/verifying-md5-checksum', '验证 MD5 校验和'],
                  ['/2/2.1/2.1.4/2.1.4.2/checking-gpg-signature', '使用 GnuPG 进行签名检查'],
                  ['/2/2.1/2.1.4/2.1.4.3/checking-gpg-signature-windows', '使用 Windows 版 Gpg4win 进行签名检查'],
                  ['/2/2.1/2.1.4/2.1.4.4/checking-rpm-signature', '使用 RPM 进行签名检查']
                ]
              }
            ]
          },
          ['/2/2.2/binary-installation', '使用通用二进制文件在 Unix/Linux 上安装 MySQL'],
          {
            title: '在 Microsoft Windows 上安装 MySQL',
            path: '/2/2.3/windows-installation',
            children: [
              ['/2/2.3/2.3.1/windows-installation-layout', 'Microsoft Windows上的 MySQL 安装布局'],
              ['/2/2.3/2.3.2/windows-choosing-package', '选择安装包'],
              {
                title: 'Windows 版 MySQL 安装程序',
                path: '/2/2.3/2.3.3/mysql-installer',
                children: [
                  ['/2/2.3/2.3.3/2.3.3.1/mysql-installer-setup', 'MySQL 安装程序初始设置'],
                  ['/2/2.3/2.3.3/2.3.3.2/mysql-installer-change-path-proc', '使用 MySQL 安装程序设置其他服务器路径'],
                  ['/2/2.3/2.3.3/2.3.3.3/mysql-installer-workflow', 'MySQL 安装程序的安装工作流'],
                  ['/2/2.3/2.3.3/2.3.3.4/mysql-installer-catalog-dashboard', 'MySQL 安装程序产品目录和面板'],
                  ['/2/2.3/2.3.3/2.3.3.5/MySQLInstallerConsole', 'MySQL 安装程序控制台参考']
                ]
              },
              {
                title: '使用非安装压缩包在 Microsoft Windows 上安装 MySQL',
                path: '/2/2.3/2.3.4/windows-install-archive',
                children: [
                  ['/2/2.3/2.3.4/2.3.4.1/windows-extract-archive', '解压安装压缩包'],
                  ['/2/2.3/2.3.4/2.3.4.2/windows-create-option-file', '创建选项文件',],
                  ['/2/2.3/2.3.4/2.3.4.3/windows-select-server', '选择 MySQL 服务器类型'],
                  ['/2/2.3/2.3.4/2.3.4.4/windows-initialize-data-directory', '初始化数据目录'],
                  ['/2/2.3/2.3.4/2.3.4.5/windows-server-first-start', '首次启动服务器'],
                  ['/2/2.3/2.3.4/2.3.4.6/windows-start-command-line', '从 Windows 命令行启动 MySQL'],
                  ['/2/2.3/2.3.4/2.3.4.7/mysql-installation-windows-path', '自定义 MySQL 工具的路径'],
                  ['/2/2.3/2.3.4/2.3.4.8/windows-start-service', '将 MySQL 作为 Windows 服务启动'],
                  ['/2/2.3/2.3.4/2.3.4.9/windows-testing', '测试 MySQL 安装']
                ]
              },
              ['/2/2.3/2.3.5/windows-troubleshooting','Microsoft Windows MySQL 服务器安装故障排除'],
              ['/2/2.3/2.3.6/windows-postinstallation','Windows 安装后程序'],
              ['/2/2.3/2.3.7/windows-restrictions','Windows 平台限制']
            ]
          },
          {
            title: '在 macOS 上安装 MySQL',
            path: '/2/2.4/macos-installation',
            children: [
              ['/2/2.4/2.4.1/macos-installation-notes', '在 macOS 上安装 MySQL 的通用说明'],
              ['/2/2.4/2.4.2/macos-installation-pkg', '使用本机软件包在 macOS 上安装 MySQL'],
              ['/2/2.4/2.4.3/macos-installation-launchd', '安装和使用 MySQL 启动守护程序'],
              ['/2/2.4/2.4.4/macos-installation-prefpane', '安装和使用 MySQL 首选项面板']
            ]
          },
          {
            title: '在 Linux 上安装 MySQL',
            path: '/2/2.5/linux-installation',
            children: [
              ['/2/2.5/2.5.1/linux-installation-yum-repo', '使用 MySQL Yum 存储库在 Linux 上安装 MySQL'],
              ['/2/2.5/2.5.2/linux-installation-apt-repo', '使用 MySQL APT 存储库在 Linux 上安装 MySQL'],
              ['/2/2.5/2.5.3/linux-installation-sles-repo', '使用 MySQL SLES 仓库在 Linux 上安装 MySQL'],
              ['/2/2.5/2.5.4/linux-installation-rpm', '使用 Oracle 的 RPM 包在 Linux 上安装 MySQL'],
              ['/2/2.5/2.5.5/linux-installation-debian', '使用 Oracle 的 Debian 软件包在 Linux上 安装 MySQL'],
              {
                title: '使用 Docker 在 Linux 上部署 MySQL',
                path: '/2/2.5/2.5.6/linux-installation-docker',
                children: [
                  ['/2/2.5/2.5.6/2.5.6.1/docker-mysql-getting-started', '使用 Docker 部署 MySQL 服务器的基本步骤'],
                  ['/2/2.5/2.5.6/2.5.6.2/docker-mysql-more-topics', '关于使用 Docker 部署 MySQL 服务的更多主题']
                ]
              },
              ['/2/2.5/2.5.7/linux-installation-native', '从本地软件仓库在 Linux 上安装 MySQL'],
              ['/2/2.5/2.5.8/linux-installation-juju', '在有 Juju 的 Linux 上安装 MySQL'],
              ['/2/2.5/2.5.9/using-systemd', '使用 systemd 管理 MySQL 服务器']
            ]
          },
          ['/2/2.6/uln-installation', '使用不可破坏的 Linux 网络（ULN）安装 MySQL'],
          {
            title: '在 Solaris 上安装 MySQL',
            path: '/2/2.7/solaris-installation',
            children: [
              ['/2/2.7/2.7.1/solaris-installation-pkg', '使用 Solaris PKG 在 Solaris 上安装 MySQL']
            ]
          },
          ['/2/2.8/freebsd-installation', '在 FreeBSD 上安装 MySQL'],
          {
            title: '从源代码安装 MySQL',
            path: '/2/2.9/source-installation',
            children: [
              ['/2/2.9/2.9.1/source-installation-methods', '源码安装方法'],
              ['/2/2.9/2.9.2/source-installation-prerequisites', '源安装前提条件'],
              ['/2/2.9/2.9.3/source-installation-layout', '源安装的 MySQL 布局'],
              ['/2/2.9/2.9.4/installing-source-distribution', '使用标准源分发安装 MySQL'],
              ['/2/2.9/2.9.5/installing-development-tree', '使用开发源树安装 MySQL'],
              ['/2/2.9/2.9.6/source-ssl-library-configuration', '配置 SSL 库支持'],
              ['/2/2.9/2.9.7/source-configuration-options', 'MySQL 源配置选项'],
              ['/2/2.9/2.9.8/compilation-problems', 'MySQL 编译问题的处理'],
              ['/2/2.9/2.9.9/source-configuration-third-party', 'MySQL 配置和第三方工具'],
              ['/2/2.9/2.9.10/source-installation-doxygen', '生成 MySQL Doxygen 文档内容']
            ]
          },
          {
            title: '安装后设置和测试',
            path: '/2/2.10/postinstallation',
            children: [
              ['/2/2.10/2.10.1/data-directory-initialization','初始化数据目录'],
              {
                title: '启动服务器',
                path: '/2/2.10/2.10.2/starting-server',
                children:[
                  ['/2/2.10/2.10.2/2.10.2.1/starting-server-troubleshooting','启动 MySQL 服务器的疑难解答']
                ]
              },
              ['/2/2.10/2.10.3/testing-server','测试服务器'],
              ['/2/2.10/2.10.4/default-privileges','保护初始 MySQL 帐户'],
              ['/2/2.10/2.10.5/automatic-start','自动启动和停止 MySQL']
            ]
          },
          ['/2/2.12/downgrading', '降级 MySQL']
        ]
      }
    ]

  }
};