# 7.2 多种数据库备份方法
This section summarizes some general methods for making backups.

Making a Hot Backup with MySQL Enterprise Backup
Customers of MySQL Enterprise Edition can use the MySQL Enterprise Backup product to do physical backups of entire instances or selected databases, tables, or both. This product includes features for incremental and compressed backups. Backing up the physical database files makes restore much faster than logical techniques such as the mysqldump command. InnoDB tables are copied using a hot backup mechanism. (Ideally, the InnoDB tables should represent a substantial majority of the data.) Tables from other storage engines are copied using a warm backup mechanism. For an overview of the MySQL Enterprise Backup product, see Section 30.2, “MySQL Enterprise Backup Overview”.

Making Backups with mysqldump
The mysqldump program can make backups. It can back up all kinds of tables. (See Section 7.4, “Using mysqldump for Backups”.)

For InnoDB tables, it is possible to perform an online backup that takes no locks on tables using the --single-transaction option to mysqldump. See Section 7.3.1, “Establishing a Backup Policy”.

Making Backups by Copying Table Files
MyISAM tables can be backed up by copying table files (*.MYD, *.MYI files, and associated *.sdi files). To get a consistent backup, stop the server or lock and flush the relevant tables:

FLUSH TABLES tbl_list WITH READ LOCK;
You need only a read lock; this enables other clients to continue to query the tables while you are making a copy of the files in the database directory. The flush is needed to ensure that the all active index pages are written to disk before you start the backup. See Section 13.3.6, “LOCK TABLES and UNLOCK TABLES Statements”, and Section 13.7.8.3, “FLUSH Statement”.

You can also create a binary backup simply by copying the table files, as long as the server isn't updating anything. (But note that table file copying methods do not work if your database contains InnoDB tables. Also, even if the server is not actively updating data, InnoDB may still have modified data cached in memory and not flushed to disk.)

For an example of this backup method, refer to the export and import example in Section 13.2.6, “IMPORT TABLE Statement”.

Making Delimited-Text File Backups
To create a text file containing a table's data, you can use SELECT * INTO OUTFILE 'file_name' FROM tbl_name. The file is created on the MySQL server host, not the client host. For this statement, the output file cannot already exist because permitting files to be overwritten constitutes a security risk. See Section 13.2.13, “SELECT Statement”. This method works for any kind of data file, but saves only table data, not the table structure.

Another way to create text data files (along with files containing CREATE TABLE statements for the backed up tables) is to use mysqldump with the --tab option. See Section 7.4.3, “Dumping Data in Delimited-Text Format with mysqldump”.

To reload a delimited-text data file, use LOAD DATA or mysqlimport.

Making Incremental Backups by Enabling the Binary Log
MySQL supports incremental backups using the binary log. The binary log files provide you with the information you need to replicate changes to the database that are made subsequent to the point at which you performed a backup. Therefore, to allow a server to be restored to a point-in-time, binary logging must be enabled on it, which is the default setting for MySQL 8.0 ; see Section 5.4.4, “The Binary Log”.

At the moment you want to make an incremental backup (containing all changes that happened since the last full or incremental backup), you should rotate the binary log by using FLUSH LOGS. This done, you need to copy to the backup location all binary logs which range from the one of the moment of the last full or incremental backup to the last but one. These binary logs are the incremental backup; at restore time, you apply them as explained in Section 7.5, “Point-in-Time (Incremental) Recovery”. The next time you do a full backup, you should also rotate the binary log using FLUSH LOGS or mysqldump --flush-logs. See Section 4.5.4, “mysqldump — A Database Backup Program”.

Making Backups Using Replicas
If you have performance problems with a server while making backups, one strategy that can help is to set up replication and perform backups on the replica rather than on the source. See Section 17.4.1, “Using Replication for Backups”.

If you are backing up a replica, you should back up its connection metadata repository and applier metadata repository (see Section 17.2.4, “Relay Log and Replication Metadata Repositories”) when you back up the replica's databases, regardless of the backup method you choose. This information is always needed to resume replication after you restore the replica's data. If your replica is replicating LOAD DATA statements, you should also back up any SQL_LOAD-* files that exist in the directory that the replica uses for this purpose. The replica needs these files to resume replication of any interrupted LOAD DATA operations. The location of this directory is the value of the system variable replica_load_tmpdir (from MySQL 8.0.26) or slave_load_tmpdir (before MySQL 8.0.26). If the server was not started with that variable set, the directory location is the value of the tmpdir system variable.

Recovering Corrupt Tables
If you have to restore MyISAM tables that have become corrupt, try to recover them using REPAIR TABLE or myisamchk -r first. That should work in 99.9% of all cases. If myisamchk fails, see Section 7.6, “MyISAM Table Maintenance and Crash Recovery”.

Making Backups Using a File System Snapshot
If you are using a Veritas file system, you can make a backup like this:

From a client program, execute FLUSH TABLES WITH READ LOCK.

From another shell, execute mount vxfs snapshot.

From the first client, execute UNLOCK TABLES.

Copy files from the snapshot.

Unmount the snapshot.

Similar snapshot capabilities may be available in other file systems, such as LVM or ZFS.