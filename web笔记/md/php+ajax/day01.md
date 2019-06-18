# PHP基础第1天

## 学习目标

+ 网站的分类
+ B/S结构的处理流程
+ 安装WAMP环境



## 前端回顾

+   基础班
    + HTML：决定页面的结构
    + CSS：决定页面的外观
    + JS：决定页面的交互 
+   就业班
    + JD：练习使用HTML，CSS完成简单的页面布局
    + JS基础：
        + JS基础语法
        + DOM/BOM
        + JS 特效

## WAMP环境配置

+ W：Window 环境下
+ A：Apache 服务器
+ M：MySQL 服务器
+ P：PHP 后台
+ LAMP: 
    + L：linux 环境下

## 网络基本概念 

+ 客户端与服务器
  - 浏览器
  - 服务器
  - B/S结构
+ IP
  + IP(Internet Protocol Address网际协议地址)。互联网上的每台主机都有一个”身份证号码”，就是IP地址。
  + IP地址是由32位二进制构成(计算机底层)，分成4段，每段8位。
  + IP地址平常用”点分十进制”方法，来进行书写。如：a.b.c.d
  + 其中，a、b、c、d 取值是 0~255。如：192.168.0.98
  + 每台计算机都有一个本地的IP地址127.0.0.1。主要用于本地网站测试、或者进程通信。
  + 127.0.0.1 地址，只能是自己访问自己，其它电脑无法通过127.0.0.1来访问你的电脑。
+ 域名
  - 计算机只能识别IP地址的访问，其它方式的访问，计算机不识别。
  - 虽然使用IP地址访问主机速度很快，但是IP地址不方便记忆。
  - 我们就可以用字母组合来代替某一个主机，这个字母组合就是”域名”。如：[www.baidu.com](http://www.baidu.com)
  - 域名的构成：字母、数字、中划线组成。
  - 域名提供商：万网(net.cn)、新网(xin.net)、西部数据等。
  - 域名的层级：[www.sina.com.cn](http://www.sina.com.cn)，
    - 域名组成
      - www网络名
      - sina域名主体
      - com商业公司
      - cn代表中国
    - .edu后缀：教育系统
    - .org后缀：非盈利性组织
    - .mil后缀：军事网站
    - .gov后缀：政府
    - .jp日本
    - .tw台湾
    - .hk香港
  - 通过域名查看ip地址：nslookup 域名
+ DNS
  + 网络DNS
    + 互联网上的每台主机，都只能直接识别IP地址的访问，不能直接识别域名访问。
    + DNS(Domain Name System域名解析系统)，负责将域名翻译成IP地址。
    + DNS是一台运行在互联网上的一台主机， 一年365天，一天24小时运行。
    + DNS也是一台主机，DNS也是一台服务器。它的主要职责，就是将域名转成IP地址。
    + DNS其实是一个数据库，存储域名和IP地址的对应关系表。
  + 本地DNS-hosts
    + hosts是本地的一个隐藏文件，没有扩展名的文件，路径为：C:\Windows\System32\drivers\etc目录中
    + 主要用来设置IP地址和域名对应关系的；
+ 端口
  - 每台电脑都是一个服务集合：
  - 每个服务都有自己单独空间，为了区分这些服务，电脑给每个服务统一设置了自己的一个标识：端口
  - 常见的端口：
    - . HTTP协议代理服务器常用端口号：80
    - . FTP（文件传输）协议代理服务器常用端口号：21
    - MSSQL数据库，默认的端口号：1433
    - QQ默认的端口号：1080
    - ...

## WAMP环境安装配置

### 安装Apache服务器

+ Apache是当前最流行的服务器端软件之一。其它：IIS、Nginx等
+ Apache是基于文件配置
+ Apache可以搭建虚拟主机

#### 步骤：

+ 下载 apache： [httpd.apache.org](http://httpd.apache.org/)
+ 选择安装路径：C:\wamp\apache

#### 测试：

+ 在打开浏览器，输入127.0.0.1/localhost
+ 如果浏览器可以显示：It works；说明安装成功
+ 右下角的工具栏中会出现有Apache的图标

#### 开启和关闭方式

+ 1.0 直接在右下角工具栏中的小图标中开启或者关闭
+ 2.0 通过：我的电脑（右键）>>管理>> 服务和应用程序>>服务器>>Apache2.2>>右键（开启或者关闭）
+ 3.0 通过CMD命令开启和关闭
  + 打开CMD
  + net start Apache2.2（开启服务）
  + net stop Apache2.2 （关闭服务）

#### 目录结构

![Alt 1](./img/1.png)

#### 基本配置

+ listen

  + 当Apache启动后，监听自己的电脑的IP地址或端口的访问，并且为其提供服务:

  + 语法：listen  \[IP地址\]\[:端口号\] (46行)

    ```
    Listen 80
    ```

+ DocumentRoot

  + 服务启动后Apache一般会先去DocumentRoot设置下面去找对应的文件

  + 最好改为我们常用的路径：(179行)

    ```
    DocumentRoot "C:\Users\PC\Desktop\PHP\day01-php"
    ```

+ Directory

  + 路径改完后需要设置路径权限

  + 通过Directory属性设置：

  + 语法：\<Directory  dir-path\>\</Directory\>（189行） dir-path设置权限的路径

    ```
    <Directory "C:\Users\PC\Desktop\PHP\day01-php">
    ```

  + 其它属性：

    + Options：指定Apache启用哪些服务器特性

      + ALL：启用所有的服务器特性
      + NONE：没有任何的访问权限
      + Indexes：如果首页文件不存在，显示文件列表

    + Order：指定Allow和deny执行顺序

      + allow：允许哪些外部IP地址访问你的主机

        ```
        Allow from All  //所有外部IP都可以访问我的主机
        Allow from 192.168.0.10  192.168.0.8   //只有指定的IP可以访问你的主机
        Allow from 192.168.0     //指定一个网段可以访问你的主机
        ```

        ​

      + deny：禁止哪些外部IP地址访问你的主机

        ```
        Deny from All   //禁止所有IP的访问
        Deny from 192.168.0.10   192.168.0.8
        Deny from 192.168.0   //禁止一个网段的访问
        ```

+ DirectoryIndex

  + 设置网站的默认首页

  + 语法：DirectoryIndex  filename1  filename2  filename3(239行)

  + 可以同时设置多个首页文件名，哪个先存在，就先执行哪个

    ```
    <IfModule dir_module>
        DirectoryIndex index.html index.php
    </IfModule>
    ```

    ​

####  配置文件语法检查

+ 配置文件一旦修改，Apache服务必须重启/html>


+ 由于反复修改配置文件代码，可能会造成语法错误，主配置文件出问题，那么Apache服务无法启动

+ 可以使用httpd.exe来帮助我们检查文件语法：

  ```
  httpd.exe -t
  ```

### Apache虚拟主机

+ 服务开启以后，只能有一个工作目录，如果将来需要在同一台服务器上开启多个服务就没有办法了，为了解决这个问题，我们可以配置虚拟主机来解决问题

    ```
    	专业的服务器(主机)，市场价几十万左右一台。专业服务器太贵，小公司都买不起。小公司一般可以租用小空间。租用100MB\200MB，大致价格 1元/1MB/年。大公司，买一台专业服务器，分割成10000个小空间出租，每个空间收300元/年。这1万个小网站共享Apache服务器、PHP服务、MySQL数据库服务。
    ```

####  虚拟主机分类

+ 基于域名的虚拟主机
  + 多个域名，对应一个IP地址
+ 基于IP的虚拟主机
  + 一个IP对应一个域名

#### 配置步骤

```
配置 www.a.com    指定网站根目录  c:\a
配置 www.b.com    指定网站根目录  c:\b
配置 www.c.com    指定网站根目录  c:\c
```



+ 1.0 设置本地 hosts 文件

  ```
  127.0.0.1		www.a.com
  127.0.0.1		www.b.com
  127.0.0.1		www.c.com
  ```

+ 2.0 修改Apache的主配置文件(httpd.conf)(468行)

  ```
  Virtual hosts
  Include conf/extra/httpd-vhosts.conf
  ```

+ 3.0 配置虚拟主机

  + 打开：C:\wamp\Apache2.2\conf/extra/httpd-vhosts.conf


+ 删除所有内容，保留：NameVirtualHost *:80

    ```
    # 配置自己的虚拟主机ip地址和端口号
    #该IP地址是自己的IP地址，如果不限制IP，请求用*代替
    NameVirtualHost *:80

    #配置www.a.com的虚拟主机，下面的*:80要与上面保持一致
    <VirtualHost *:80>
    	#绑定的域名
        ServerName www.a.com
    	#指定默认首页，如果不指定，会继承全局配置
        DirectoryIndex index.html index.php
    	#指定网站根目录
    	DocumentRoot "C:\Users\PC\Desktop\phpDemo"
    	#指定网站目录权限
    	<Directory "C:\Users\PC\Desktop\phpDemo">
    		#如果首页不存在，则显示文件列表
    		Options Indexes
    		#指定deny和allow的执行顺序
    		Order deny,allow
    		Deny from all
    		Allow from all
    	</Directory>
    </VirtualHost>

    #配置www.b.com的虚拟主机
    <VirtualHost *:80>
    	#绑定的域名
        ServerName www.b.com
    	#指定默认首页，如果不指定，会继承全局配置
        DirectoryIndex index.html index.php
    	#指定网站根目录
    	DocumentRoot "C:\Users\PC\Desktop\php"
    	#指定网站目录权限
    	<Directory "C:\Users\PC\Desktop\php">
    		#如果首页不存在，则显示文件列表
    		Options Indexes
    		#指定deny和allow的执行顺序
    		Order deny,allow
    		Deny from all
    		Allow from all
    	</Directory>
    </VirtualHost>
    ```

### 安装PHP环境

​	现在的服务器已经配置成功，但是没有办法处理PHP语言，所以需要安装PHP环境

#### 安装步骤

+ 1.0 安装PHP安装包

  + 直接将压缩包解压到：C:\wamp\php5

+ 2.0 LoadModule

  + Apache 自身功能有限，想要添加功能必须通过LoadModule来加载文件

  + 通过Apache加载PHP5处理模块；当Apache服务启动时，自动启动PHP5插件。

    ```
    # 告诉Apache，启动时自动加载PHP5模块
    LoadModule php5_module C:\wamp\php5\php5apache2_2.dll
    ```

+ AddType

  + 将指定的扩展名，与文件内容类型，进行一个绑定。即设置：PHP只能处理什么类型的文件

    ```
    LoadModule php5_module C:\wamp\php5\php5apache2_2.dll
    # 告诉PHP，要处理的文件类型
    AddType application/x-httpd-php .php .phtml
    ```

+ 测试

  ```
  <?php
  phpinfo()
  ?>
  ```


## PHP基础

### 简介

+ PHP （Hypertext Preprocessor） 超文本预处理器，是嵌入到HTML文件中的服务器端的脚本语言；
+ 一个PHP文件中，可以包含多种代码：HTML、CSS、JS、Jquery、PHP、MySQL等。
+ PHP主要应用于Web开发领域。
+ PHP特点：入门简单、免费的、连接多种数据；
+ PHP的语法，与C、Java、Perl、JS语法比较相似；
+ PHP是服务器端的脚本语言，脚本语言相对编程语言来说，要简单的多。
+ PHP程序只能运行在服务器端，在客户端看不见PHP任何代码；
+ PHP文件的扩展名是以.php为后缀的

### hello world

- 代码标记 <?php  …… ?>

- 输出方式：echo

  ```
  echo 'hello world'
  ```

- 注释 

  - /* 多行注释 */
  - // 单行注释

- 语句分隔符 ;

- PHP文件访问方式

### 输出时间

```
echo date('Y-m-d H:i:s');
```

+   默认情况下PHP输出的时间是格林威治时间，比中国时区晚8个小时

+   解决方案：

    + 1.0 找到PHP的配置文件 C:\wamp\php5\php.ini-development

    + 2.0 定位到 1008行

    + 3.0 设置中国时区

        ```
        ; PRC为中华人民共和国
        date.timezone = PRC
        ```

    + 4.0 将PHP的配置文件设置到Apache主配置中

        ```
        AddType application/x-httpd-php .php .phtml
        # 加载PHP的配置文件
        PHPIniDir "C:\wamp\php5\php.ini-development"
        ```

### 变量

- 变量基本概念分析
- 变量命名规则
- 变量的声明与赋值
- 变量值的读取
- 变量相关api
  - isset() 判断变量是否存在
  - empty() 判断变量是否为空
  - unset() 删除变量
  - var_dump() 显示变量的类型和值
  - print_r() 显示数组的元素信息
- 可变变量
- 引用传递与值传递









##  