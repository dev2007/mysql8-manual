# 2.13.3 使用 Perl DBI/DBD 接口的问题

如果 Perl 报告它找不到 `../mysql/mysql.so` 模块，问题可能是 Perl 找不到 `libmysqlclient.so` 共享库。你应该能够通过以下方法之一解决此问题：

- 将 `libmysqlclient.so` 复制到其他共享库所在的目录（可能是 `/usr/lib` 或 `/lib`）。
- 修改用于编译 `DBD::mysql` 的 `-L` 选项，以反映 `libmysqlclient.so` 的实际位置。
- 在 Linux上，可以将 `libmysqlclient.so` 所在目录的路径名添加到 `/etc/ld.so.conf` 文件中。
- 将 `libmysqlclient.so` 所在目录的路径名添加到 `LD_RUN_PATH ` 环境变量。某些系统改用 `LD_LIBRARY_PATH`。

注意，如果链接器找不到其他库，则可能还需要修改 `-L` 选项。例如，如果链接器找不到 `libc`，因为它位于 `/lib` 中，而链接命令指定了 `-L/usr/lib`，请将 `-L` 选项更改为 `-L/lib` 或将 `-L/lib` 添加到现有的链接命令中。

如果你从 `DBD::mysql` 中得到以下错误，那么你可能正在使用 **gcc**（或使用用 **gcc** 编译的旧二进制文件）：

```bash
/usr/bin/perl: can't resolve symbol '__moddi3'
/usr/bin/perl: can't resolve symbol '__divdi3'
```

当构建 `mysql.so` 库时，添加 `-L/usr/lib/gcc-lib/... -lgcc` 到链接命令（编译 Perl 客户端时，请检查用于 `mysql.so` 的 **make** 输出）。`-L` 选项应指定 `libgcc.a` 在系统上所在目录的路径名。

这个问题的另一个原因可能是 Perl 和 MySQL 都不是用 **gcc** 编译的。在这种情况下，可以通过使用 **gcc** 编译两者来解决不匹配问题。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/perl-support-problems.html)
