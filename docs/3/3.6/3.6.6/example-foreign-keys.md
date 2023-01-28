# 3.6.6 使用外键

MySQL 支持外键（允许跨表交叉引用相关数据）和外键约束（有助于保持相关数据的一致性）。

外键关系涉及保存初始列值的父表，以及具有引用父列值的列值的子表。在子表上定义了外键约束。

以下示例通过单列外键关联 `parent` 表和 `child` 表，并显示外键约束如何强制引用完整性。

创建父表和子表：

```bash
CREATE TABLE parent (
    id INT NOT NULL,
    PRIMARY KEY (id)
) ENGINE=INNODB;


CREATE TABLE child (
    id INT,
    parent_id INT,
    INDEX par_ind (parent_id),
    FOREIGN KEY (parent_id)
        REFERENCES parent(id)
) ENGINE=INNODB;
```

在父表中插入行：

```bash
mysql> INSERT INTO parent (id) VALUES (1);
```

验证数据是否已插入：

```bash
mysql> SELECT * FROM parent;
+----+
| id |
+----+
|  1 |
+----+
```

在子表中插入行：

```bash
mysql> INSERT INTO child (id,parent_id) VALUES (1,1);
```

插入操作成功，因为父表中存在 `parent_id` `1`。

将父表中不存在 `parent_id` 值的行插入子表：

```bash
mysql> INSERT INTO child (id,parent_id) VALUES(2,2);
ERROR 1452 (23000): Cannot add or update a child row: a foreign key constraint fails 
(`test`.`child`, CONSTRAINT `child_ibfk_1` FOREIGN KEY (`parent_id`) 
REFERENCES `parent` (`id`))
```

操作失败，因为父表中不存在指定的 `parent_id` 值。

尝试从父表中删除以前插入的行：

```bash
mysql> DELETE FROM parent WHERE id VALUES = 1;
ERROR 1451 (23000): Cannot delete or update a parent row: a foreign key constraint fails 
(`test`.`child`, CONSTRAINT `child_ibfk_1` FOREIGN KEY (`parent_id`) 
REFERENCES `parent` (`id`))
```

此操作失败，因为子表中的记录包含引用的id（`parent_id`）值。

当操作影响父表中具有子表中匹配行的键值时，结果取决于 `FOREIGN KEY` 子句的 `ON UPDATE` 和 `ON DELETE` 子子句指定的引用操作。省略 `ON DELETE` 和 `ON UPDATE` 子句（与当前子表定义中一样）与指定 `RESTRICT` 选项相同，该选项拒绝影响父表中具有匹配行的主键值的操作。

要演示 `ON DELETE` 和 `ON UPDATE` 引用操作，请删除子表并重新创建它，以使用 `CASCADE` 选项包含 `ON UPDATE` 和 `ON DELETE` 子句。删除或更新父表中的行时，`CASCADE` 选项会自动删除或更新子表中的匹配行。

```bash
DROP TABLE child;

CREATE TABLE child (
    id INT,
    parent_id INT,
    INDEX par_ind (parent_id),
    FOREIGN KEY (parent_id)
        REFERENCES parent(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE=INNODB;
```

将以下行插入子表：

```bash
mysql> INSERT INTO child (id,parent_id) VALUES(1,1),(2,1),(3,1);
```

验证数据是否已插入：

```bash
mysql> SELECT * FROM child;
+------+-----------+
| id   | parent_id |
+------+-----------+
|    1 |         1 |
|    2 |         1 |
|    3 |         1 |
+------+-----------+
```

更新父表中的 id，将其从 `1` 更改为 `2`。

```bash
mysql> UPDATE parent SET id = 2 WHERE id = 1;
```

验证更新是否成功：

```bash
mysql> SELECT * FROM parent;
+----+
| id |
+----+
|  2 |
+----+
```

验证 `ON UPDATE CASCADE` 引用操作是否更新了子表：

```bash
mysql> SELECT * FROM child;
+------+-----------+
| id   | parent_id |
+------+-----------+
|    1 |         2 |
|    2 |         2 |
|    3 |         2 |
+------+-----------+
```

要演示 `ON DELETE CASCADE` 引用操作，请从父表中删除 `parent_id = 2` 的记录，这将删除父表中的所有记录。

```bash
mysql> DELETE FROM parent WHERE id = 2;
```

因为子表中的所有记录都与 `parent_id = 2` 关联，所以 `ON DELETE CASCADE` 引用操作会从子表中删除所有记录：

```bash
mysql> SELECT * FROM child;
Empty set (0.00 sec)
```

有关外键约束的更多信息，参阅[章节 13.1.20.5，“外键约束”](/13/13.1/13.1.20/13.1.20.5/create-table-foreign-keys.html)。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/example-foreign-keys.html)
