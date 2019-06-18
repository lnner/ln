# day05

## 超全局数组变量$_SERVER

+ 用来获取浏览器与服务器进行数据传递所有信息
+ $_SERVER["REQUEST_METHOD"]可以得到当前页面的请求方式

## PHP文件操作

+   fopen:           打开文件或者 URL

    ```php
    resource fopen ( string $filename , string $mode [, bool $use_include_path = false [, resource $context ]] )
    ```

    ​

+   fclose:           关闭一个已打开的文件指针

    ````php
      bool fclose ( resource $handle )
    ````

+   fread:           读取文件（可安全用于二进制文件）

    ```php
      string fread ( resource $handle , int $length )
    ```

+   fwrite:           写入文件（可安全用于二进制文件）

    ```php
      int fwrite ( resource $handle , string $string [, int $length ] )
    ```

+   file:           把整个文件读入一个数组中

    ```php
      array file ( string $filename [, int $flags = 0 [, resource $context ]] )
    ```

+   file_get_contents:           将整个文件读入一个字符串

    ```php
      string file_get_contents ( string $filename [, bool $use_include_path = false [, resource $context [, int $offset = -1 [, int $maxlen ]]]] )
    ```

+   file_put_contents:             将一个字符串写入文件

    ```php
      int file_put_contents ( string $filename , mixed $data [, int $flags = 0 [, resource $context ]] )
    ```

      ​

## 学生信息管理系统

- 目的：
  - 使用PHP完成一套CRUD（Create、Retrieve、Update、Delete即增删改查）
  - 了解服务器的工作原理
- 查询
  - 1）先完成查询的静态页面
  - 2）自己创建一个数据存放的文件:data.txt
  - 3）按照我们约定好的格式添加数据：
    - 约定：id:1,name:jack,gender:男,age:18,edu:高中
    - 并且：一行表示一条数据
  - 4）通过PHP代码将数据全部读取出来，并且转成对应的格式替换掉静态页面的中的静态数据
    - 读取 出数据以后需要将数据转换成为一个具体的对象
- 新增
- 修改
- 删除