# day07

## 数据库软件概述

+ 数据库是存储网站数据的一种工具，通过数据软件进行管理，常见的数据库软件有MySQL、Oracle、Sql Server等，MySQL由瑞典MySQL AB 公司开发，目前属于 Oracle 旗下产品，MySQL 是最流行的关系型数据库管理系统之一

## 安装

### 步骤

### 测试

+   首先查看MySQL的路径是否添加到了环境变量中

    ```cmd
    set path
    ```

+   使用CMD登录MySQL

    ```cmd
      mysql -hlocalhost -uroot -proot
    ```

    + 参数：
      + -h：表示MySQL服务器地址
      + -u：表示用户名称 默认root
      + -p：表单用户名称 默认空
    + 如果进入REPL模式，说明数据库安装成功
    + 使用exit可以退出REPL环境

## MySQL基本概念

| SQL术语/概念    |       | 解释/说明    |
| ----------- | ----- | -------- |
| database    | 表的集合  | 数据库      |
| table       | 行的集合  | 数据库表/集合  |
| row         | 一条数据  | 数据记录行/文档 |
| column      | 字段/属性 | 数据字段/域   |
| index       |       | 索引       |
| primary key |       | 主键       |
|             |       |          |

## 使用CMD操作数据库：

+ 连接

  ```mysql
  mysql -hlocalhost -uroot -proot
  ```


+ 创建数据库

  ```mysql
  CREATE DATABASE 数据库名;
  ```

+ 查看数据库

  ```mysql
  SHOW DATABASES;
  ```

+ 切换数据库

  ```mysql
  USE 数据库名;
  ```

+ 创建数据表

  ```mysql
  CREATE TABLE 表名(id int,name char(12),age int);
  ```

+ 显示当前数据库中的所有表

  ``` mysql
  SHOW TABLES;
  ```

+ 查看表结构

  ```mysql
  DESC 表名;
  ```

+ 查询数据

  ```mysql
  SELECT * FROM 表名;
  //
  SELECT * FROM 表名 where id=1;
  ```

+ 插入数据

  ```mysql
  //插入之前需要设置编码
  set names gbk;

  INSERT INTO 表名 ( field1, field2,...fieldN )
                         VALUES
                         ( value1, value2,...valueN );
  ```

+ 删除数据

  ```mysql
  //删除数据
  DELETE FROM 表名 [WHERE Clause]

  ```

+ 修改数据

  ```mysql
  UPDATE 表名 SET field1=new-value1, field2=new-value2
  [WHERE Clause]
  ```

## 可视化工具

+ CMD做为客户端可以访问MySQL服务器，但工作效率非常低，实际开发中一般使用可视化的工具管理数据库

### Navicat for MySQL

+ 安装
  + 使用安装包安装


+ 登录
+ 创建数据库
+ 创建数据表
+ 显示当前数据库中的所有表
+ 查看表结构
+ 查询数据
+ 插入数据
+ 删除数据
+ 修改数据

## PHP操作数据库

+ 配置（一）：

  + MySQL对于PHP来说，也是它的一个模块或插件。

  + PHP对于Apache来说，是Apache的一个模块或插件。

  + 提示：修改PHP的配置文件php.ini，使PHP能自动装载MySQL模块

    ```
    //设置脚本文件所在的目录
    extension_dir='ext'
    //引入第三方脚本     .dll：动态链接库
    extension=php_mysql.dll
    extension=php_mysqli.dll
    ```

+ 如果配置（一）操作完成执行完成以后还是不成功，建议使用以下操作：

  + 找到Apache的配置文件：httpd.conf
  + 在之前loadmodule PHP5的下面加上这句代码：PHPIniDir "路径" 这里的路径指的是你PHP环境的路径（PHP.ini-development那个文件所在的路径）


+ 登录

  ```php
  $connect = mysqli_connect(host,username,password,dbname);
  ```

+ 设置编码集

  ```php
  mysqli_set_charset($connect,'utf-8');
  ```

+ 执行SQL语句

  ```php
  //执行插入语句
  mysqli_query($connect,"inset into uinfo(id,name,age) values(4,'小明',30)");
  //执行查询语句
  mysqli_query($connect,"SELECT * FROM uinfo");
  ```

+ mysqli_fetch_array:函数从结果集中取得一行作为关联数组，或数字（每句）数组，或二者兼有（可以依次将结果集中的内容取出）

  ```php
  $row = mysqli_fetch_array($res1[,resulttype]);
  ```

  + 参数：
    + $res1:查询的结果集
    + resulttype:设置数组的类型
      + MYSQLI_ASSOC：关联数组
      + MYSQLI_NUM：数字枚举数组
      + MYSQLI_BOTH：两者都有（默认值）























