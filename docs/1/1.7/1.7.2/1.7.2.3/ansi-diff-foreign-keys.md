# 1.7.2.3 FOREIGN KEY 约束的区别

外键约束的 MySQL 实现在以下关键方面与SQL标准不同：

- 如果父表中有多行具有相同的引用键值，[`InnoDB`](/15/innodb-storage-engine) 将执行外键检查，就像不存在具有相同键值的其他父行一样。例如，如果定义了 `RESTRICT` 类型约束，并且有一个子行包含多个父行，则 `InnoDB` 不允许删除任何父行。

- 如果 `ON UPDATE CASCADE` 或 `ON UPDATE SET NULL` 递归以更新它以前在同一级联过程中更新过的*同一个表*，则其行为类似于 `RESTRICT`。这意味着你不能在 `ON UPDATE CASCADE` 或 `ON UPDATE SET NULL` 操作上使用自引用。这是为了防止级联更新导致无限循环。另一方面，`ON DELETE SET NULL` 上的自引用是可行的，`ON DELETE CASCADE` 上的自引用也是可行的。级联操作的嵌套深度不得超过 15 层。

- 在插入、删除或更新多行的 SQL 语句中，将逐行检查外键约束（如唯一约束）。在执行外键检查时，[`InnoDB`](/15/innodb-storage-engine) 会对必须检查的子记录或父记录设置共享行级锁。MySQL 立即检查外键约束；检查不会延迟到事务提交。根据 SQL 标准，默认行为应该是延迟检查。也就是说，只有在处理*完整 SQL 语句*后才检查约束。这意味着无法使用外键删除引用自身的行。

- 包括 InnoDB 在内的任何存储引擎都无法识别或强制执行引用完整性约束定义中使用的 `MATCH` 子句。使用显式 `MATCH` 子句没有指定的效果，它会导致忽略 `ON DELETE` 和 `ON UPDATE` 子句。应避免指定 `MATCH`。

  SQL 标准中的 `MATCH` 子句控制在与引用表中的主键进行比较时，如何处理复合（多列）外键中的 `NULL` 值。MySQL 本质上实现了 `MATCH SIMPLE` 定义的语义，它允许外键全部或部分为空。在这种情况下，可以插入包含此类外键的（子表）行，即使它与引用的（父表）表中的任何行都不匹配。（可以使用触发器实现其他语义。）

- 出于性能原因，MySQL 要求对引用的列进行索引。但是，MySQL 不强制要求引用的列是 `UNIQUE` 或声明为 `NOT NULL`。

  引用非 `UNIQUE` 键的 `FOREIGN KEY` 不是标准 SQL，而是 [`InnoDB`](/15/innodb-storage-engine) 扩展。另一方面，[`NDB`](/23/mysql-cluster) 存储引擎要求在作为外键引用的任何列上有一个明确的唯一键（或主键）。

  对于诸如 `UPDATE` 或 `DELETE CASCADE` 之类的操作，没有很好地定义对非唯一键或包含空值的键的外键引用的处理。建议你使用外键时只引用 `UNIQUE` 键（包括 `PRIMARY`）和 `NOT NULL` 键。

- 对于不支持外键的存储引擎（如 [`MyISAM`](/16/16.2/myisam-storage-engine)），MySQL Server 解析并忽略外键规范。

- MySQL 解析但忽略“内联 `REFERENCES` 规范”（在 SQL 标准中定义），其中引用被定义为列规范的一部分。MySQL 仅在指定作为部分单独的 `FOREIGN KEY` 规范的，才接受 `REFERENCES` 子句。

  使用 `REFERENCES tbl_name(col_name)` 子句定义列没有实际效果，*只是作为一个备忘录或注释，告知你当前定义的列是要引用另一个表中的列*。使用此语法时，必须意识到：

  - MySQL 不会执行任何类型的检查以确保 *col_name* 确实存在于 *tbl_name* 中（甚至 *tbl_name* 本身是否存在）。

  - MySQL 不会对 `tbl_name` 执行任何类型的操作，例如删除行以响应对你正在定义的表中的行执行的操作；换句话说，这种语法不会导致任何关于删除或更新的行为。（尽管你可以将 `ON DELETE` 或 `ON UPDATE` 子句作为 `REFERENCES` 子句的一部分编写，但它也会被忽略。）

  - 此语法创建一 *column（列）*；它**不**创建任何类型的索引或键。

  可以将这样创建的列用作联接列，如下所示：

  ```bash
  CREATE TABLE person (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name CHAR(60) NOT NULL,
    PRIMARY KEY (id)
  );

  CREATE TABLE shirt (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    style ENUM('t-shirt', 'polo', 'dress') NOT NULL,
    color ENUM('red', 'blue', 'orange', 'white', 'black') NOT NULL,
    owner SMALLINT UNSIGNED NOT NULL REFERENCES person(id),
    PRIMARY KEY (id)
  );

  INSERT INTO person VALUES (NULL, 'Antonio Paz');

  SELECT @last := LAST_INSERT_ID();

  INSERT INTO shirt VALUES
  (NULL, 'polo', 'blue', @last),
  (NULL, 'dress', 'white', @last),
  (NULL, 't-shirt', 'blue', @last);

  INSERT INTO person VALUES (NULL, 'Lilliana Angelovska');

  SELECT @last := LAST_INSERT_ID();

  INSERT INTO shirt VALUES
  (NULL, 'dress', 'orange', @last),
  (NULL, 'polo', 'red', @last),
  (NULL, 'dress', 'blue', @last),
  (NULL, 't-shirt', 'white', @last);

  SELECT * FROM person;
  +----+---------------------+
  | id | name                |
  +----+---------------------+
  |  1 | Antonio Paz         |
  |  2 | Lilliana Angelovska |
  +----+---------------------+

  SELECT * FROM shirt;
  +----+---------+--------+-------+
  | id | style   | color  | owner |
  +----+---------+--------+-------+
  |  1 | polo    | blue   |     1 |
  |  2 | dress   | white  |     1 |
  |  3 | t-shirt | blue   |     1 |
  |  4 | dress   | orange |     2 |
  |  5 | polo    | red    |     2 |
  |  6 | dress   | blue   |     2 |
  |  7 | t-shirt | white  |     2 |
  +----+---------+--------+-------+


  SELECT s.* FROM person p INNER JOIN shirt s
    ON s.owner = p.id
  WHERE p.name LIKE 'Lilliana%'
    AND s.color <> 'white';

  +----+-------+--------+-------+
  | id | style | color  | owner |
  +----+-------+--------+-------+
  |  4 | dress | orange |     2 |
  |  5 | polo  | red    |     2 |
  |  6 | dress | blue   |     2 |
  +----+-------+--------+-------+
  ```

  以这种方式使用时，`REFERENCES` 子句不会显示在 `SHOW CREATE TABLE` 或 `DESCRIPE` 的输出中：

  ```bash
  SHOW CREATE TABLE shirt\G
  *************************** 1. row ***************************
  Table: shirt
  Create Table: CREATE TABLE `shirt` (
  `id` smallint(5) unsigned NOT NULL auto_increment,
  `style` enum('t-shirt','polo','dress') NOT NULL,
  `color` enum('red','blue','orange','white','black') NOT NULL,
  `owner` smallint(5) unsigned NOT NULL,
  PRIMARY KEY  (`id`)
  ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4
  ```

  更多有关外键约束的信息，参阅[章节 13.1.20.5，“FOREIGN KEY 约束”](/13/13.1/13.1.20/13.1.20.5/create-table-foreign-keys)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/ansi-diff-foreign-keys.html)
