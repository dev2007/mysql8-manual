# 3.5 在批处理模式下使用 mysql

在前面的部分中，你以交互方式使用 [mysql](/4/4.5/4.5.1/mysql.html) 输入语句并查看结果。你也可以在批处理模式下运行 [mysql](/4/4.5/4.5.1/mysql.html)。为此，将要运行的语句放在一个文件中，然后告诉 [mysql](/4/4.5/4.5.1/mysql.html) 从文件中读取其输入：

```bash
$> mysql < batch-file
```

如果你在 Windows 下运行 [mysql](/4/4.5/4.5.1/mysql.html)，并且文件中有一些导致问题的特殊字符，可以执行以下操作：

```bash
C:\> mysql -e "source batch-file"
```

如果需要在命令行上指定连接参数，命令可能如下所示：

```bash
$> mysql -h host -u user -p < batch-file
Enter password: ********
```

当你以这种方式使用 [mysql](/4/4.5/4.5.1/mysql.html) 时，你正在创建一个脚本文件，然后执行该脚本。

如果希望脚本继续运行，即使其中的某些语句产生错误，也应使用 [--force](/4/4.5/4.5.1/4.5.1.1/mysql-command-options.html) 命令行选项。

为什么要使用脚本？以下是几个原因：

- 如果你重复运行一个查询（例如，每天或每周），将其设置为脚本可以避免每次执行时重新键入。
- 通过复制和编辑脚本文件，可以从类似的现有查询生成新查询。
- 在开发查询时，批处理模式也很有用，特别是对于多行语句或多语句序列。如果你犯了错误，你不必重新键入所有内容。只需编辑脚本以更正错误，然后告诉 [mysql](/4/4.5/4.5.1/mysql.html) 再次执行它。
- 如果你有一个产生大量输出的查询，你可以通过分页器运行输出，而不是看着它从屏幕顶部滚动：

```bash
$> mysql < batch-file | more
```

- 你可以捕获文件中的输出以进行进一步处理：

```bash
$> mysql < batch-file > mysql.out
```

你可以将脚本分发给其他人，以便他们也可以运行这些语句。

某些情况下不允许交互使用，例如，当你从 **cron** 作业运行查询时。在这种情况下，必须使用批处理模式。

在批处理模式下运行 [mysql](/4/4.5/4.5.1/mysql.html) 时，默认输出格式与交互使用时不同（更简洁）。例如，当以交互方式运行 [mysql](/4/4.5/4.5.1/mysql.html) 时，`SELECT DISTINCT species FROM pet` 的输出如下所示：

```bash
+---------+
| species |
+---------+
| bird    |
| cat     |
| dog     |
| hamster |
| snake   |
+---------+
```

在批处理模式下，输出如下所示：

```bash
species
bird
cat
dog
hamster
snake
```

如果你想以批处理模式获得交互式输出格式，请使用 [mysql -t](/4/4.5/4.5.1/mysql.html)。要将执行的语句返回到输出，请使用 [mysql -v](/4/4.5/4.5.1/mysql.html)。

你还可以通过使用 `source` 命令或 `\.` 从 [mysql](/4/4.5/4.5.1/mysql.html) 提示符中使用脚本。命令：

```bash
mysql> source filename;
mysql> \. filename
```

有关详细信息，参阅[章节 4.5.1.5，“从文本文件执行 SQL 语句”](/4/4.5/4.5.1/4.5.1.5/mysql-batch-commands.html)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/batch-mode.html)
