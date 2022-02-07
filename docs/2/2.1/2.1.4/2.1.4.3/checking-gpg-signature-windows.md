# 2.1.4.3 使用 Windows 版 Gpg4win 进行签名检查

[章节 2.1.4.2，“使用 GnuPG 进行签名检查”](/2/2.1/2.1.4/2.1.4.2/checking-gpg-signature)描述了如何使用 GPG 验证 MySQL 下载。该指南也适用于 Microsoft Windows，但另一种选择是使用 Gpg4win 之类的 GUI 工具。你可以使用不同的工具，但我们的示例基于 Gpg4win，并使用其捆绑的 `Kleopatra GUI`。

下载并安装 Gpg4win，然后加载 Kleopatra。该对话框应类似于：

**图 2.1 Kleopatra: 初始化屏幕**

![Kleopatra: Initial Screen](../../../_media/gnupg-kleopatra-home.png)

接下来，添加 MySQL 发布工程证书。为此，请单击 `文件（File）`，`查找服务器上的证书（Lookup Certificates on Server）`。在搜索框中键入“Mysql 发布工程”，然后按 `Search（搜索）`。

**图 2.2 Kleopatra：在服务器上查找证书向导：查找证书**

![Kleopatra: Lookup Certificates on Server Wizard: Finding a Certificate](../../../_media/gnupg-kleopatra-find-certificate.png)

选择 “MySQL 发布工程”证书。指纹和密钥 ID 必须为“5072E1F5”，或选择`详细信息...（Details...）`确认证书是否有效。现在，通过单击`导入(Import)`来导入它。显示导入对话框时，选择“确定（Okay）”，此时该证书应列在“已导入证书（Imported Certificates）”选项卡下。

接下来，配置证书的信任级别。选择我们的证书，然后从主菜单中选择`证书（Certificates）`，`更改所有者信任...（Change Owner Trust...）`。我们建议你选择“I believe checks are very accurate”，否则你可能无法验证我们的签名。选择“I believe checks are very accurate”以启用“完全信任”，然后按 `OK`。

**图 2.3 Kleopatra：更改 MySQL 发布工程的信任级别**

![Kleopatra: Change Trust level for MySQL Release Engineering](../../../_media/gnupg-kleopatra-change-trust.png)

接下来，验证下载的 MySQL 包文件。这需要打包文件和签名的文件。签名文件必须与打包文件具有相同的名称，但具有附加的 `.asc` 扩展名，如下表中的示例所示。签名链接到每个 MySQL 产品的下载页面上。必须使用此签名创建 `.asc` 文件。

表格 2.2 适用于 Microsoft Windows 的 MySQL 安装程序的 MySQL 包和签名文件

|文件类型|文件名|
|--|--|
|发布文件|`mysql-installer-community-8.0.27.msi`|
|签名文件|`mysql-installer-community-8.0.27.msi.asc`|

确保两个文件存储在同一目录中，然后运行以下命令验证分发文件的签名。将签名（`.asc`）文件拖放到 Kleopatra 中，或从`文件，解密/验证文件（File,Decrypt/Verify Files...）`加载对话框，然后选择 `.msi` 或 `.asc` 文件。

**图 2.4 Kleopatra：解密和验证文件对话框**

![Kleopatra: The Decrypt and Verify Files Dialog](../../../_media/gnupg-kleopatra-decrypt-load.png)

单击 `解密/验证（Decrypt/Verify）`以检查文件。两个最常见的结果如下图所示；尽管黄色警告看起来可能有问题，但以下内容表示文件检查成功通过。你现在可以运行此安装程序。

**图 2.5 Kleopatra：解密和验证结果对话框：所有操作已完成**

![Kleopatra: the Decrypt and Verify Results Dialog: All operations completed](../../../_media/gnupg-kleopatra-decrypt-okay-sig.png)

看到红色 `The signature is bad` 错误表示文件无效。如果看到此错误，请不要执行 MSI 文件。

**图 2.6 Kleopatra：解密和验证结果对话框：错误**

![Kleopatra: the Decrypt and Verify Results Dialog: Bad](../../../_media/gnupg-kleopatra-decrypt-invalid-sig.png)

[章节 2.1.4.2，“使用 GnuPG 进行签名检查”](/2/2.1/2.1.4/2.1.4.2/checking-gpg-signature)，部分解释了为什么你没有看到绿色良好的签名结果。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/checking-gpg-signature-windows.html)
