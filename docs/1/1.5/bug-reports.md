# 1.5 如何报告 bug 或问题

在发布有关问题的 bug 报告之前，请尝试验证该错误是否为 bug，以及该 bug 是否尚未报告：

- 首先从以下位置搜索 MySQL 在线手册：[https://dev.mysql.com/doc/](https://dev.mysql.com/doc/) 。我们试图通过频繁更新手册以解决新发现的问题，使手册保持最新。此外，手册随附的发行说明可能特别有用，因为更新版本很可能包含问题的解决方案。发布说明可在刚刚为手册提供的位置获得。

- 如果 SQL 语句出现解析错误，请仔细检查语法。如果你找不到错误，那么你当前版本的 MySQL Server 极有可能不支持你使用的语法。如果你使用的是当前版本，并且手册中没有介绍你使用的语法，那么 MySQL Server 不支持你的语句。

  如果该手册涵盖了你正在使用的语法，但你使用的是较旧版本的 MySQL Server，那么你应该检查 MySQL 更改历史记录，以查看该语法是何时实现的。在这种情况下，你可以选择升级到较新版本的 MySQL Server。

- 有关一些常见问题的解决方案，请参见[章节B.3节 “问题和常见错误”](/appendix/b/b.3/problems)。

- 在以下位置搜索bugs数据库：[http://bugs.mysql.com/](http://bugs.mysql.com/) 查看是否已报告并修复该错误。

- 你也可以使用 [http://www.mysql.com/search/](http://www.mysql.com/search/) 搜索 MySQL 网站上的所有网页（包括手册）。

如果你在手册、bug 数据库或邮件列表档案中找不到答案，请咨询你当地的 MySQL 专家。如果你仍然无法找到问题的答案，请使用以下准则报告错误。

报告bug的正常方法是访问 [http://bugs.mysql.com/](http://bugs.mysql.com/)，这是 bug 数据库的地址。这个数据库是公共的，任何人都可以浏览和搜索。如果登录到系统，则可以输入新报告。

发布在 bug 数据库中的（[http://bugs.mysql.com/](http://bugs.mysql.com/) ）bug，在发行说明中注明了针对给定发行版进行的更正。

如果你发现 MySQL Server 存在安全漏洞，请立即向 <secalert_us@oracle.com> 发送电子邮件告知我们。 例外情况：支持客户应在以下位置向 Oracle 支持部门报告所有问题，包括安全漏洞：[http://support.oracle.com/](http://support.oracle.com/)。

要与其他用户讨论问题，可以使用 [MySQL 社区](https://mysqlcommunity.slack.com/)。

写一个好的 bug 报告需要耐心，但是第一次就把它做好可以为我们和你自己节省时间。一个好的 bug 报告，包含 bug 的完整测试用例，使得我们很可能在下一个版本中修复 bug。本节帮助你正确编写报告，这样你就不会浪费时间做对我们帮助不大或根本没有帮助的事情。请仔细阅读本节，并确保你的报告中包含此处描述的所有信息。

最好在发布之前使用最新的 MySQL Server 生产或开发版本测试问题。任何人只要在测试用例中使用 `mysql test < script_file`，或者运行 bug 报告中包含的 shell 或 Perl 脚本，就可以重现这个 bug。我们能够重现的任何 bug 都有很高的机会在下一个 MySQL 版本中被修复。

当错误报告中包含了对问题的良好描述时，它会非常有用。也就是说，举一个好例子，说明你所做的一切导致了问题，并详细描述问题本身。最好的报告包括一个完整的例子，说明如何重现错误或问题。参阅[章节5.9，“调试 MySQL”](/5/5.9/debugging-mysql.html)。

请记住，我们可以对包含太多信息的报告作出回应，但不能对包含太少信息的报告作出回应。人们常常忽略事实，因为他们认为自己知道问题的原因，并认为某些细节无关紧要。一个好的原则是，如果你对陈述某事有疑问，就陈述它。如果我们必须要求你提供初始报告中缺少的信息，那么在报告中多写几行比等待答复的时间更长更快、更省事。

错误报告中最常见的错误是（a）不包括你使用的 MySQL 发行版的版本号，以及（b）不完整描述安装 MySQL Server的平台（包括平台类型和版本号）。这些都是高度相关的信息，在 100 个案例里，99 个案例没有这些信息的 bug 报告是无用的。我们经常会遇到这样的问题，“为什么这个对我不起作用？”然后我们发现请求的功能没有在 MySQL 版本中实现，或者报告中描述的错误已经在较新的 MySQL 版本中修复。错误通常与平台有关。在这种情况下，我们几乎不可能在不知道操作系统和平台版本号的情况下修复任何东西。

如果你是从源代码处编译 MySQL 的，请记住，如果编译器与问题有关，也要提供有关它的信息。人们经常在编译器中发现 bug，并认为问题与 MySQL 有关。大多数编译器一直都在开发中，并且一个版本一个版本地变得更好。要确定问题是否取决于编译器，我们需要知道你使用的编译器。注意，每一个编译问题都应该被视为一个 bug 并相应地报告。

如果程序生成错误消息，则在报告中包含该消息非常重要。如果我们试图从存档中搜索某些内容，那么报告的错误消息最好与程序生成的消息完全匹配。（即使是文件夹也要注意。）最好将整个错误信息复制并粘贴到报告中。你不应该试图从记忆中重现信息。

如果 Connector/ODBC（MyODBC）有问题，请尝试生成跟踪文件并将其与报告一起发送。参阅[如何报告 Connector/ODBC 问题或 bug](https://dev.mysql.com/doc/connector-odbc/en/connector-odbc-support-bug-report.html)。

如果你的报告包含来自使用 [mysql](/4/4.5/4.5.1/mysql.html) 命令行工具运行的测试用例的长查询输出行，则可以使用 [--vertical](/4/4.5/4.5.1/4.5.1.1/mysql-command-options.html) 选项或 `\G` 语句终止符使输出更具可读性。本节后面的 [EXPLAIN SELECT](/13/13.8/13.8.2/explain.html) 示例演示了 `\G` 的使用。

请在你的报告中包含以下信息：

- 你正在使用的 MySQL 发行版的版本号（例如，MySQL 5.7.10）。通过执行 [`mysqladmin version`](/4/4.5/4.5.2/mysqladmin.html)，你可以找到正在运行的版本。[`mysqladmin`](/4/4.5/4.5.2/mysqladmin.html) 程序可以在 MySQL 安装目录下的 bin 目录中找到。

- 你遇到问题的机器的制造商和型号。

- 操作系统名称和版本。如果你使用 Windows，通常可以通过双击“我的电脑”图标并下拉“帮助/关于 Windows”菜单来获取名称和版本号。对于大多数类 Unix 的操作系统，你可以通过执行命令 `uname -a` 来获取此信息。

- 有时，内存量（真实和虚拟）是相关的。如果有疑问，请包括这些值。

- MySQL 安装中的 `docs/INFO_BIN` 文件的内容。此文件包含有关如何配置和编译 MySQL 的信息。

- 如果你使用的是 MySQL 软件的源代码发行版，请提供所用编译器的名称和版本号。如果你有二进制发行版，请包括发行版名称。

- 如果问题发生在编译过程中，请在发生错误的文件中包含确切的错误消息，并在有问题的代码周围包含几行上下文。

- 如果 [`mysqld`](/4/4.3/4.3.1/mysqld.html) 死亡，你还应该报告导致 [`mysqld`](/4/4.3/4.3.1/mysqld.html) 意外退出的语句。你通常可以通过在启用查询日志记录的情况下运行 [`mysqld`](/4/4.3/4.3.1/mysqld.html)，然后在 [`mysqld`](/4/4.3/4.3.1/mysqld.html) 退出后查看日志来获取此信息。参阅[章节 5.9，“调试 MySQL”](/5/5.9/debugging-mysql.html)。

- 如果数据库表与问题相关，请在错误报告中包含 `SHOW CREATE table db_name.tbl_name`语句的输出。这是获取数据库中任何表的定义的一种非常简单的方法。这些信息有助于我们创建与你所经历的情况相匹配的情况。

- 问题发生时有效的 SQL 模式可能非常重要，因此请报告 [sql_mode](/5/5.1/5.1.8/server-system-variables.html) 系统变量的值。对于存储过程、存储函数和触发器对象，相关的 [sql_mode](/5/5.1/5.1.8/server-system-variables.html) 值是创建对象时有效的值。对于存储过程或函数， [SHOW CREATE PROCEDURE](/13/13.7/13.7.7/13.7.7.9/show-create-procedure.html) 或 [SHOW CREATE FUNCTION](/13/13.7/13.7.7/13.7.7.8/show-create-function.html) 语句显示相关的SQL模式，或者你可以查询 `INFORMATION_SCHEMA` 获得信息：

  ```bash
  SELECT ROUTINE_SCHEMA, ROUTINE_NAME, SQL_MODE
  FROM INFORMATION_SCHEMA.ROUTINES;
  ```

  对于触发器，你可以使用以下语句：

  ```bash
  SELECT EVENT_OBJECT_SCHEMA, EVENT_OBJECT_TABLE, TRIGGER_NAME, SQL_MODE
  FROM INFORMATION_SCHEMA.TRIGGERS;
  ```

- 对于与性能相关的错误或 [`SELECT`](/13/13.2/13.2.10/select.html) 语句问题，你应该始终包括 `EXPLAIN SELECT ...` 的输出，以及 [`SELECT`](/13/13.2/13.2.10/select.html) 语句生成的行数。你还应该为所涉及的每个表包含 `SHOW CREATE TABLE tbl_name` 的输出。你提供的关于你的情况的信息越多，就越有可能有人能帮助你。

  下面是一个非常好的 bug 报告示例。这些语句使用 [`mysql`](/4/4.5/4.5.1/mysql.html) 命令行工具运行。请注意 `\G` 语句终止符用于语句，否则会提供很长的难以读取的输出行。

  ```bash
  mysql> SHOW VARIABLES;
  mysql> SHOW COLUMNS FROM ...\G
        <output from SHOW COLUMNS>
  mysql> EXPLAIN SELECT ...\G
        <output from EXPLAIN>
  mysql> FLUSH STATUS;
  mysql> SELECT ...;
        <A short version of the output from SELECT,
        including the time taken to run the query>
  mysql> SHOW STATUS;
        <output from SHOW STATUS>
  ```

- 如果在运行 [`mysqld`](/4/4.3/4.3.1/mysqld.html) 时出现错误或问题，请尝试提供一个复制异常的输入脚本。此脚本应包括任何必要的源文件。脚本越能再现你的情况，效果越好。如果你可以制作一个可复制的测试用例，你应该上传它以附加到 bug 报告中。

  如果无法提供脚本，则至少应在报告中包含 [mysqladmin variables extended-status processlist](/4/4.5/4.5.2/mysqladmin.html) 的输出，以提供有关系统执行情况的一些信息。

- 如果你无法生成只有几行的测试用例，或者如果测试表太大而无法包含在错误报告中（超过 10 行），则应该使用 [`mysqldump`](/4/4.5/4.5.4/mysqldump.html) 转储表，并创建一个 `README` 文件来描述你的问题。使用 **tar** 和 **gzip** 或 **zip** 创建文件的压缩存档。在你为我们的错误数据库启动错误报告后 [http://bugs.mysql.com/](http://bugs.mysql.com/)，单击 bug 报告中的“文件”选项卡，获取有关将存档上载到 bug 数据库的说明。

- 如果你认为 MySQL Server 从一条语句中产生了一个奇怪的结果，那么不仅要包括结果，还要包括你对结果应该是什么的看法，以及描述你观点基础的解释。

- 当你提供问题示例时，最好使用实际情况中存在的表名、变量名等，而不是使用新名称。问题可能与表或变量的名称有关。这些病例可能很少见，但与其说抱歉，不如说安全。毕竟，你应该更容易提供一个使用你的实际情况的例子，这对我们来说绝对是更好的。如果在bug报告中有你不想让其他人看到的数据，你可以使用前面描述的“文件”选项卡上载它。如果信息确实是绝密信息，你甚至不想向我们展示，请继续使用其他名称提供示例，但请将此视为最后选择。

- 如果可能的话，包括相关程序的所有选项。例如，指出启动 [`mysqld`](/4/4.3/4.3.1/mysqld.html) 服务器时使用的选项，以及用于运行任何 MySQL 客户端程序的选项。[`mysqld`](/4/4.3/4.3.1/mysqld.html) 和 [`mysql`](/4/4.5/4.5.1/mysql.html) 等程序以及 **configure** 脚本的选项通常是解决问题的关键，并且非常相关。把它们包括在内从来都不是一个坏主意。如果你的问题涉及用 Perl 或 PHP 等语言编写的程序，请包括语言处理器的版本号以及程序使用的任何模块的版本。例如，如果你有一个使用 `DBI` 和 `DBD:：mysql` 模块的 Perl 脚本，请包括Perl、`DBI` 和 `DBD:：mysql` 的版本号。

- 如果你的问题与特权系统有关，请包括 [mysqladmin reload](/4/4.5/4.5.2/mysqladmin.html) 输出，以及尝试连接时收到的所有错误消息。当你测试你的权限时，你应该执行 [mysqladmin reload version](/4/4.5/4.5.2/mysqladmin.html)，并尝试连接给你带来麻烦的程序。

- 如果你有一个 bug 补丁，一定要包括它。但是，如果你没有提供一些必要的信息，例如显示修补程序修复的 bug 的测试用例，那么不要假设修补程序就是我们所需要的，或者我们可以使用它。我们可能会发现你的修补程序有问题，或者根本不了解它。如果是这样，我们就不能使用它。

  如果我们无法验证补丁的确切用途，我们将不会使用它。测试用例在这里帮助我们。显示修补程序可以处理所有可能发生的情况。如果我们发现修补程序无法工作的临界情况（即使是罕见的情况），它可能是无用的。

- 对错误是什么、发生原因或它依赖于什么的猜测通常是错误的。即使是MySQL团队，如果不首先使用调试器来确定错误的真正原因，也无法猜测这些事情。

- 在错误报告中指出你已检查参考手册和邮件存档，以便其他人知道你已尝试自己解决问题。

- 如果访问特定表时数据损坏或出现错误，请首先使用 [`CHECK TABLE`](/13/13.7/13.7.3/13.7.3.2/check-table.html) 检查表。如果该语句报告任何错误：

  - `InnoDB` 崩溃恢复机制在服务器被终止后重新启动时处理清理，因此在典型操作中不需要“修复”表。如果 `InnoDB` 表出现错误，请重新启动服务器，查看问题是否仍然存在，或者该错误是否仅影响内存中的缓存数据。如果磁盘上的数据损坏，请考虑启用 [`innodb_force_recovery`](/15/15.14/innodb-parameters.html) 选项重新启动，这样你就可以转储受影响的表。

  - 对于非事务性表，请尝试使用 [`REPAIR TABLE`](/13/13.7/13.7.3/13.7.3.5/repair-table.html) 或 [myisamchk](/4/4.6/4.6.4/myisamchk.html) 修复它们。参阅[章节 5，MySQL Server管理](/5/server-administration.html)。

如果你运行的是 Windows，请使用 `SHOW VARIABLES LIKE 'lower_case_table_names'` 语句验证 [lower_case_table_names](/5/5.1/5.1.8/server-system-variables.html) 的值。此变量影响服务器处理数据库和表名的大小写的方式。其对给定值的影响应如[章节 9.2.3，“标识符区分大小写”](/9/9.2/9.2.3/identifier-case-sensitivity.html)所述。

- 如果你经常得到损坏的表，你应该尝试找出发生这种情况的时间和原因。在这种情况下，MySQL 数据目录中的错误日志可能包含一些关于发生了什么的信息。（这是名称中带有 `.err` 后缀的文件。）参阅[章节 5.4.2，“错误日志”](/5/5.4/5.4.2/error-log.html)。请在错误报告中包含此文件中的任何相关信息。通常情况下，如果在更新的中间没有任何东西损坏，MySQL就不会损坏表。如果你能找到 [mysqld](/4/4.3/4.3.1/mysqld.html)死亡的原因，我们就更容易为你提供问题的解决方案。参见[章节 B.3.1，“如何确定引起问题的原因”](/appendix/b/b.3/b.3.1/what-is-crashing.html)。

- 如果可能，下载并安装最新版本的 MySQL Server，并检查它是否解决了你的问题。MySQL 软件的所有版本都经过彻底测试，应该可以正常工作。我们相信让一切尽可能向后兼容，你应该能够毫不费力地切换 MySQL 版本。参阅[章节 2.1.2，“安装哪个 MySQL 版本和发行版”](/2/2.1/2.1.2/which-version.html)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/bug-reports.html)
