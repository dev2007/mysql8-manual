# 前言和法律条款

这是 MySQL 数据库系统 v8.0 到 v8.0.18 的参考手册。 在本文中，参考发行编号（8.0.x），注意 MySQL 8.0 的小版本之间的差异。许可信息，参阅[法律条款](/readme?id=法律条款)。

由于 MySQL 8.0 与以前版本在功能和其他方面存在许多差异，本手册不适用于较旧版本的 MySQL 软件。如果你使用的是较早发布的 MySQL 软件，请参阅对应的手册。例如，[MySQL 5.7 参考手册](https://dev.mysql.com/doc/refman/5.7/en/)涵盖 5.7 系列 MySQL 软件发布版本。

**许可信息——MySQL 8.0**。 本产品可能包含经许可使用的第三方软件。 如果你使用的是 MySQL 8.0 的商业版，请参阅 [MySQL 8.0 商业版许可证信息用户手册](https://downloads.mysql.com/docs/licenses/mysqld-8.0-com-en.pdf)以获取许可信息，包括与此商业版中可能包含的第三方软件相关的许可信息。如果你使用的是 MySQL 8.0 社区版本，请参阅 [MySQL 8.0 社区版本许可证信息用户手册](https://downloads.mysql.com/docs/licenses/mysqld-8.0-gpl-en.pdf)以获取许可信息，包括与此社区版本中可能包含的第三方软件相关的许可信息。

**许可信息——MySQL NDB Cluster 8.0**。 如果你使用的是 MySQL NDB Cluster 8.0 社区版本，请参阅 [MySQL NDB Cluster 8.0社区版本许可证信息用户手册](https://downloads.mysql.com/docs/licenses/cluster-8.0-gpl-en.pdf)以获取许可信息，包括与此社区版本中可能包含的第三方软件相关的许可信息。

## 法律条款

Copyright © 1997, 2021, Oracle and/or its affiliates.

This software and related documentation are provided under a license agreement containing restrictions on use and disclosure and are protected by intellectual property laws. Except as expressly permitted in your license agreement or allowed by law, you may not use, copy, reproduce, translate, broadcast, modify, license, transmit, distribute, exhibit, perform, publish, or display any part, in any form, or by any means. Reverse engineering, disassembly, or decompilation of this software, unless required by law for interoperability, is prohibited.

The information contained herein is subject to change without notice and is not warranted to be error-free. If you find any errors, please report them to us in writing.

If this is software or related documentation that is delivered to the U.S. Government or anyone licensing it on behalf of the U.S. Government, then the following notice is applicable:

U.S. GOVERNMENT END USERS: Oracle programs (including any operating system, integrated software, any programs embedded, installed or activated on delivered hardware, and modifications of such programs) and Oracle computer documentation or other Oracle data delivered to or accessed by U.S. Government end users are "commercial computer software" or "commercial computer software documentation" pursuant to the applicable Federal Acquisition Regulation and agency-specific supplemental regulations. As such, the use, reproduction, duplication, release, display, disclosure, modification, preparation of derivative works, and/or adaptation of i) Oracle programs (including any operating system, integrated software, any programs embedded, installed or activated on delivered hardware, and modifications of such programs), ii) Oracle computer documentation and/or iii) other Oracle data, is subject to the rights and limitations specified in the license contained in the applicable contract. The terms governing the U.S. Government's use of Oracle cloud services are defined by the applicable contract for such services. No other rights are granted to the U.S. Government.

This software or hardware is developed for general use in a variety of information management applications. It is not developed or intended for use in any inherently dangerous applications, including applications that may create a risk of personal injury. If you use this software or hardware in dangerous applications, then you shall be responsible to take all appropriate fail-safe, backup, redundancy, and other measures to ensure its safe use. Oracle Corporation and its affiliates disclaim any liability for any damages caused by use of this software or hardware in dangerous applications.

Oracle and Java are registered trademarks of Oracle and/or its affiliates. Other names may be trademarks of their respective owners.

Intel and Intel Inside are trademarks or registered trademarks of Intel Corporation. All SPARC trademarks are used under license and are trademarks or registered trademarks of SPARC International, Inc. AMD, Epyc, and the AMD logo are trademarks or registered trademarks of Advanced Micro Devices. UNIX is a registered trademark of The Open Group.

This software or hardware and documentation may provide access to or information about content, products, and services from third parties. Oracle Corporation and its affiliates are not responsible for and expressly disclaim all warranties of any kind with respect to third-party content, products, and services unless otherwise set forth in an applicable agreement between you and Oracle. Oracle Corporation and its affiliates will not be responsible for any loss, costs, or damages incurred due to your access to or use of third-party content, products, or services, except as set forth in an applicable agreement between you and Oracle.

This documentation is NOT distributed under a GPL license. Use of this documentation is subject to the following terms:

You may create a printed copy of this documentation solely for your own personal use. Conversion to other formats is allowed as long as the actual content is not altered or edited in any way. You shall not publish or distribute this documentation in any form or on any media, except if you distribute the documentation in a manner similar to how Oracle disseminates it (that is, electronically for download on a Web site with the software) or on a CD-ROM or similar medium, provided however that the documentation is disseminated together with the software on the same medium. Any other use, such as any dissemination of printed copies or use of this documentation, in whole or in part, in another publication, requires the prior written consent from an authorized representative of Oracle. Oracle and/or its affiliates reserve any and all rights to this documentation not expressly granted above.

## 文档可访问性

有关 Oracle 对辅助功能的承诺的信息，请访问 Oracle 辅助功能计划网站 https://www.oracle.com/corporate/accessibility/ 。

## 访问 Oracle 支持

购买了支持的Oracle客户可以通过My Oracle support访问电子支持。有关信息，请访问 https://www.oracle.com/corporate/accessibility/learning-support.html#support-tab 。

> [原文链接](https://dev.mysql.com/doc/refman/8.0/en/preface.html)
