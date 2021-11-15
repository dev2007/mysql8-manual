# 1.8.1 MySQL 贡献者

尽管 Oracle 公司和/或其附属公司拥有 `MySQL 服务器` 和 `MySQL 手册`的所有版权，但我们希望对那些为 `MySQL 发行版` 做出各种贡献的人表示感谢。贡献者按随机顺序列在这里：

- Gianmassimo Vigazzola <qwerg@mbox.vol.it> or <qwerg@tin.it>

  Win32/NT 的初始移植。

- Per Eric Olsson

  用于动态记录格式的建设性批评和实际测试。

- Irena Pancirov <irena@mail.yacc.it>

  Borland 编译器的 Win32 移植。`mysqlshutdown.exe` 和 `mysqlwatch.exe`。

- David J. Hughes

  用于创建共享软件 SQL 数据库。在 MySQL AB 的前身 TcX，我们从 `mSQL` 开始，但发现它不能满足我们的目的，所以作为替代，我们为我们的应用程序生成器 Unireg 编写了一个 SQL 接口。[mysqladmin](/4/4.5/4.5.2/mysqladmin) 和 [mysql](/4/4.5/4.5.1/mysql) 客户端是受其 `mSQL` 对应程序影响较大的程序。我们已经花了很多精力使 MySQL 语法成为 `mSQL` 的超集。该 API 的许多思想都是从 `mSQL` 中借鉴的，以便于将免费的 `mSQL` 程序移植到 MySQL API。MySQL 软件不包含任何来自 `mSQL` 的代码。发行版中的两个文件（*client/insert_test.c* 和*client/select_test.c*）基于 `mSQL` 发行版中相应的（无版本）文件，但作为示例进行了修改，以显示将代码从 `mSQL` 转换为 MySQL Server 所需的更改。（`mSQL` 版权归 David J.Hughes 所有。）

- Patrick Lynch

  帮助我们获得 [http://www.mysql.com/](http://www.mysql.com/)。

- Fred Lindberg

  帮助设置 qmail 来处理 MySQL 邮件列表，以及我们在管理 MySQL 邮件列表方面获得极大的帮助。

- Igor Romanenko <igor@frog.kiev.ua>

  [mysqldump](/4/4.5/4.5.4/mysqldump)（以前是 `msqldump`，但通过 Monty 进行了移植和增强）。

- Yuri Dario

  持续扩展和维护 MySQL OS/2 移植。

- Tim Bunce

  **mysqlhotcopy** 的作者。

- fZarko Mocnik <zarko.mocnik@dem.si>

  斯洛文尼亚语排序。

- "TAMITO" <tommy@valley.ne.jp>

  _MB 字符集宏以及 ujis 和 sjis 字符集。

- Joshua Chamas <joshua@chamas.com>

  用于并发插入、扩展日期语法、NT 调试的基础和 MySQL 邮件列表应答。

- Yves Carlier <Yves.Carlier@rug.ac.be>

  **mysqlaccess**，展示用户访问权限的程序。

- Rhys Jones <rhys@wales.com> (以及 GWE Technologies Limited)

  早期的 JDBC 驱动程序之一。

- Dr Xiaokun Kelvin ZHU <X.Zhu@brad.ac.uk>

  早期 JDBC 驱动程序和其他 MySQL 相关 Java 工具的进一步开发。

- James Cooper <pixel@organic.com>

  在他的网站上建立一个可搜索的邮件列表档案。

- Rick Mehalick <Rick_Mehalick@i-o.com>

  `xmysql`，一个图形化的 MySQL Server 的 X 客户端。

- Doug Sisk <sisk@wix.com>

  为 Red Hat Linux 提供 MySQL 的 RPM 包。

- Diemand Alexander V. <axeld@vial.ethz.ch>

  为 Red Hat Linux-Alpha 提供 MySQL 的 RPM 包。

- Antoni Pamies Olive <toni@readysoft.es>

  为 Intel 和 SPARC 提供许多 MySQL 客户端的 RPM 版本。

- Jay Bloodworth <jay@pathways.sde.state.sc.us>

  为 MySQL 3.21 提供 RPM 版本。

- David Sacerdote <davids@secnet.com>

  安全检查 DNS 主机名的点子。

- Wei-Jou Chen <jou@nematic.ieo.nctu.edu.tw>

  对中文（BIG5）字符的一些支持。

- Wei He <hewei@mail.ied.ac.cn>

  中文（GBK）字符集的很多功能。

- Jan Pazdziora <adelton@fi.muni.cz>

  捷克语分类顺序。

- Zeev Suraski <bourbon@netvision.net.il>

  来自 `_UNIXTIME()` 时间格式化、`ENCRYPT()` 函数和 **bison** 顾问。活动邮件列表成员。

- Luuk de Boer <luuk@wxs.nl>

  将基准测试套件移植（并扩展）到 DBI/DBD。在 `crash me` 和运行基准测试方面都有很大的帮助。一些新的日期函数。**mysql_setpermission** 脚本。

- Alexis Mikhailov <root@medinf.chuvashia.su>

  可加载函数；创建 [`CREATE FUNCTION`](/13/13.1/13.1.14/create-function) 和 [`DROP FUNCTION`](/13/13.1/13.1.26/drop-function)。

- Andreas F. Bobak <bobak@relog.ch>

  可加载函数的 `AGGREGATE` 扩展。

- Ross Wakelin <R.Wakelin@march.co.uk>

  帮助设置 MySQL-Win32 的安装向导。

- Jethro Wright III <jetman@li.net>

  `libmysql.dll` 库。

- James Pereria <jpereira@iafrica.com>

  Mysqlmanager，用于管理 MySQL 服务器的 Win32 图形化工具。

- Curt Sampson <cjs@portal.ca>

  将 MIT-pthreads 移植到 NetBSD/Alpha 和 NetBSD 1.3/i386。

- Martin Ramsch <m.ramsch@computer.org>

  MySQL 教程中的示例。

- Steve Harvey

  使 mysqlaccess 更安全。

- Konark IA-64 Centre of Persistent Systems Private Limited.

  帮助移植 MySQL 服务器到 Win64。

- Albert Chin-A-Young

  为 Tru64、大文件支持和更好的 TCP 包装器支持配置更新。

- John Birrell

  在 OS/2 上模拟 `pthread_mutex()`。

- Benjamin Pflugmann

  用于处理 `INSERTS` 的扩展 `MERGE` 表。MySQL 邮件列表上的活动成员。

- Jocelyn Fournier

  出色地发现和报告无数错误（特别是在 MySQL 4.1 子查询代码中）。

- Marc Liyanage

  维护 OS X 软件包，并提供有关如何创建 OS X 软件包的宝贵反馈。

- Robert Rutherford

  提供关于 QNX 端口的宝贵信息和反馈。

- NDB 集群的早期开发人员

  许多人以各种方式参与了暑期学生、硕士论文学生、员工。总共有 100 多人，以至于在这里提及会太多了。著名的名字是 Ataullah Dabaghi，直到 1999 年，他贡献了大约三分之一的代码库。还要特别感谢 AXE 系统的开发人员，AXE 系统为 NDB 集群提供了许多架构基础，包括块、信号和崩溃跟踪功能。此外，还应该致谢那些相信从 1992 年到现在，能够为其发展分配预算的想法的人。

- Google Inc.

  我们希望表彰 Google Inc. 对 MySQL 发行版的贡献：Mark Callaghan 的 SMP 性能补丁和其他补丁。

其他贡献者、错误发现者和测试者：James H. Thompson、 Maurizio Menghini、 Wojciech Tryc、 Luca Berra、 Zarko Mocnik、 Wim Bonis、Elmar Haneke、 <jehamby@lightside>、 <psmith@BayNetworks.com>、 <duane@connect.com.au>、 Ted Deppner <ted@psyber.com>、 Mike Simons,、Jaakko Hyvatti。

还有很多来自邮件列表上的人的 bug 报告/补丁。

感谢那些帮助我们回答 MySQL 邮件列表中问题的人：

- Daniel Koch <dkoch@amcity.com>

  Irix 安装。

- Luuk de Boer <luuk@wxs.nl>

  基准问题。

- Tim Sailer <tps@users.buoy.com>

  `DBD::mysql` 问题。

- Boyd Lynn Gerber <gerberb@zenez.com>

  SCO 相关问题。

- Richard Mehalick <RM186061@shellus.com>

  `xmysql` 相关问题和基础安装问题。

- Zeev Suraski <bourbon@netvision.net.il>

  Apache 模块配置问题（日志和身份验证）、PHP 相关问题、SQL 语法相关问题和其他一般问题。

- Francesc Guasch <frankie@citel.upc.es>

  一般问题。

- Jonathan J Smith <jsmith@wtp.net>

  关于 Linux 操作系统细节、SQL 语法以及其他可能需要做一些工作的问题。

- David Sklar <sklar@student.net>

  在 PHP 和 Perl 中使用 MySQL。

- Alistair MacDonald <A.MacDonald@uel.ac.uk>

  具有灵活性，可以处理 Linux 和 HP-UX。

- John Lyon <jlyon@imag.net>

  关于在 Linux 系统上安装 MySQL（使用 `.rpm` 文件或从源代码编译）的问题。

- Lorvid Ltd. <lorvid@WOLFENET.com>

  简单的计费/许可证/支持/版权问题。

- Patrick Sherrill <patrick@coconet.com>

  ODBC 和 VisualC++ 接口问题。

- Randy Harmon <rjharmon@uptimecomputers.com>

  DBD、Linux、一些 SQL 语法问题。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/contributors.html)
