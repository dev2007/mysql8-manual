# 3.3.1 创建和选择数据库

如果管理员在设置权限时为你创建数据库，你可以开始使用它。否则，你需要自己创建数据库：

```bash
mysql> CREATE DATABASE menagerie;
```

在 Unix 下，数据库名称区分大小写（与 SQL 关键字不同），因此你必须始终将数据库称为 `menagerie`，而不是 `Menagerie`、`MENAGERIE` 或其他变体。对于表名也是如此。（在 Windows 下，此限制不适用，尽管你必须在整个给定查询中使用相同的字母大小写来引用数据库和表。但是，出于各种原因，建议的最佳做法始终使用创建数据库时使用的相同字母大小写。）

:::tip 注意
如果尝试创建数据库时出现错误 `ERROR 1044 (42000): Access denied for user 'micah'@'localhost' to database 'menagerie'`，这意味着你的用户帐户没有执行此操作所需的权限。请与管理员讨论，或参阅[章节 6.2，“访问控制和帐户管理”](/6/6.2/access-control.html)。
:::

创建数据库不会选择使用；你必须明确地这样做。要将当前数据库变为 `menagerie `，请使用以下语句：

```bash
mysql> USE menagerie
Database changed
```

你的数据库只需要创建一次，但每次开始 [mysql](/4/4.5/4.5.1/mysql.html) 会话时都必须选择它。你可以通过发出 [USE](/13/13.8/13.8.4/use.html) 语句来实现这一点，如示例所示。或者，你可以在调用 [mysql](/4/4.5/4.5.1/mysql.html) 时在命令行上选择数据库。只需在你可能需要提供的任何连接参数之后指定其名称。例如：

```bash
$> mysql -h host -u user -p menagerie
Enter password: ********
```

:::danger 重要
刚才显示的命令中的 `managerie` **不是**你的密码。如果要在 `-p` 选项之后的命令行中提供密码，则必须在没有空格的情况下提供密码（例如，作为 `-p`*password*，而不是作为 `-p` *password*）。但是，不建议将密码放在命令行上，因为这样做会让登录到计算机上的其他用户窥探密码。
:::

:::tip 注意
你可以随时使用 [SELECT](/13/13.2/13.2.13/select.html)  [DATABASE()](/12/12.16/information-functions.html) 查看当前选择的数据库。
:::

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/creating-database.html)
