# day04

## 函数

### 函数的返回值

- 函数的返回值，通过return语句来实现；
- 将函数的执行结果，返给了函数调用者；
- return语句一旦执行，函数立即结束，函数剩余的代码不再执行了。
- return语句有”中断”函数、”退出”函数；
- return不能同时返回多个值，只能返回一个值。如果想返回多个值，可以放入数组

## **匿名函数**

+ 没有名字的函数，就是”匿名函数”。
+ 匿名函数不能单独定义，也不能单独调用.
+ 匿名函数，一般是做为数据，给变量赋值的.
+ 匿名函数结束大括号后的分号，不能省略。

## 常用系统函数

### 字符串

- 定义字符串基本语法
  - 单引号字符串
  - 双引号字符串
  - nowdoc字符串
  - heredoc字符串
- 字符串常用api
  - strlen() 获取字符串长度
  - substr() 返回字符串的子串
  - strtoupper() 将字符串转化为大写
  - strtolower() 将字符串转化为小写
  - ucfirst() 将字符串的首字母转换为大写
  - trim() 去除字符串首尾处的空白字符
  - ltrim() 删除字符串开头的空白字符
  - rtrim() 删除字符串末端的空白字符
  - strrev() 反转字符串
  - strpos() 查找字符串首次出现的位置，从左往右查找
  - strrpos() 计算指定字符串在目标字符串中最后一次出现的位置，从右往左查找
  - strchr()和strstr() 两者一样，用于查找字符串的首次出现
  - str_replace() 子字符串替换
  - str_repeat() 重复一个字符串

### 数学

- 常用函数
  - max() 求最大值
  - min() 求最小值
  - rand() 产生一个随机整数
  - mt_rand() 更高效的随机数
  - ceil() 进一法取整
  - floor() 舍去法取整
  - round() 对浮点数进行四舍五入
  - pow() 次方运算
  - abs() 求绝对值
  - sqrt() 开方运算

#### 日期

- 常用函数
  - time() 返回自从 Unix 纪元（格林威治时间 1970 年 1 月 1 日 00:00:00）到当前时间的秒数
  - date() 格式化一个本地时间/日期 
  - microtime() 返回当前 Unix 时间戳和微秒数
  - strtotime() 将任何英文文本的日期时间描述解析为 Unix 时间戳



## 变量作用域

+   分类
    + 全局作用域：全局变量的作用范围。在函数外部定义的变量，都是全局变量。网页执行完毕，全局变量就消失了。
    + 局部作用域：局部变量的作用范围。在函数内部定义的变量，就是局部变量。函数执行完毕，局部变量就消失了。
    + 超全局变量：在网页的任何地方(函数内、函数外)，都能使用的变量
+   与JS的区别
    +   在JS中，全局变量可以直接在函数内部来使用；但是，在PHP中，全局变量不能直接在函数内部使用。
    +   在PHP中，函数内和函数外是不通的。

###  在局部作用域中访问全局变量

+ global 关键字

  + PHP中全局变量，不能直接在函数中使用；

  + 使用global关键字，来实现：将全局变量引入到函数中来用。

  + global在声明为全局变量，不能直接赋值，需要在下一行来赋值；

  + global关键字只能在函数内部来使用。

  + global关键字与JS中的全局变量的功能不一样，可以理解为”引用传地址”

    ```php
    <?php
    header("content-type:text/html;charset=utf-8");
    $name = "jack";
    $age = 18;

    function showInfo(){
    	global $name;
    	global $age;
    	$age = 30;
    	echo "我的名字叫做{$name},今年{$age}岁了---函数内";
    }
    showInfo();

    function show2() {
    	global $name;
    	global $age;
    	echo "我的名字叫做{$name},今年{$age}岁了---函数内";
    }
    echo "<hr/>";
    show2();

    echo "<hr/>";
    echo "我的名字叫做{$name},今年{$age}岁了---函数外";
    ?>
    ```

### $GLOBALS超全局数组变量

+ 超全局数组变量：\$\_GET、\$\_POST、\$\_SERVER、\$\_REQUEST、\$\_FILES、$_COOKIE、\$\_SESSION、\$GLOBALS

+ 超全局数组变量，可以在网页的任何地方都能使用

  ```php
  header("content-type:text/html;charset=utf-8");
  $name = "jack";
  $age =  18;

  function showInfo(){                                             	;
  echo "我的名字叫做{$GLOBALS['name']},今年{$GLOBALS['age']}岁了---函数内";
  }
  showInfo();
  ```

## PHP中的构造函数-----类（class）

### 概念：

- php中为了方便管理对象，会将对象抽象成为一个类似于JS中构造函数的结构--->类

### 定义与使用

- 关键字：class
```php
<?php
  class p {
      public $id;
      public $name;
      public $age;
  }
?>
```

- 创建类的对象
```php
$p = new P();
```


- 给对象中的属性赋值
```php
$p->id = 12;
$p->name = "jack";
$p->age = 19;
```

- 取值
```php
echo $p->age;
```



## PHP服务器端包含

+ include：包含文件，当包含的文件不存在，会报警告错误，脚本会继承执行；

+ require：包含文件，当包含的文件不存在，会报致命错误，脚本立即停止执行；

+ include_once：包含文件一次，如果第2次包含不再执行，相当于if判断。其它情况与include一样。

+ require_once：包含文件一次，如果第2次包含不再执行，其它情况下require一样。

## HTTP协议

### B/S网络结构

+ B/S，Brower/Server(浏览器/服务器)，是当前最流行的网络模式，将所有的功能放在服务器上，客户端只需要一个浏览器软件即可。
+ C/S，Client/Server(客户端/服务器)，在这种模式下，客户端电脑必须要安装相应的客户端软件。如：QQ聊天、MySQL客户端/MySQL服务器。
+ 静态网页和动态网页：文件代码中，是否含有服务器端的脚本语言。如：PHP、Java、ASP、JSP、C#。

### HTTP协议

+ HTTP，HyperText Transfer Protocol，超文本传输协议，是一种网络数据的传递标准。
+ HTTP也是请求和响应的一种标准

### HTTP协议之URL

+ URL概念：
  +  Uniform Resource Locator统一资源定位符，
  +  统一资源定位符是对可以从互联网上得到的资源的位置和访问方法的一种简洁的表示，是互联网上标准资源的地址。
  +  互联网上的每个文件都有一个唯一的URL，它包含的信息指出文件的位置以及浏览器应该怎么处理它
+ URL的构成
  + protocol：网络协议，访问不同资源所采用的规则。
    + 如：ftp、http、https、 email、news、telnet
  + host：资源主机名，可以是IP地址或域名
    + 如：www.baidu.com、183.232.231.172
  + port：代表主机端口号，
    + 如：80，21，25，1080，3306
  + directory：访问资源所有的目录名称，ergouge/article
    + 如：http://blog.csdn.net/ergouge/article
  + filename：访问的文件名称，php_superglobals.asp
    + 如：http://www.w3school.com.cn/php/php_superglobals.asp
  + ?key=value，访问的参数，utm_source=tuicool&utm_medium=referral
    + https://zhuanlan.zhihu.com/p/20782320?utm_source=tuicool&utm_medium=referral



+   报文

    +   请求报文

        +   请求报文头

            ```http
                GET http://www.a.com/ HTTP/1.1
            ```

        +   请求报文行

            ````http
            Host: www.a.com
            Connection: keep-alive
            Upgrade-Insecure-Requests: 1
            User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
            Accept-Encoding: gzip, deflate
            Accept-Language: zh-CN,zh;q=0.8
            ````

        +   请求报文体

            +   一般为空

    +   响应报文 

        - 响应报文头

          - 状态码：http://blog.csdn.net/windyf2013/article/details/77834714

          ```http
          HTTP/1.1 200 OK
          ```

        - 响应报文行
          ```http
            Date: Mon, 18 Sep 2017 20:34:21 GMT
            Server: Apache/2.2.22 (Win32) PHP/5.3.13
            Content-Length: 427
            Keep-Alive: timeout=5, max=100
            Connection: Keep-Alive
            Content-Type: text/html;charset=UTF-8
          ```

        - 响应报文体
          ```http
                <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
                <html>
                 <head>
                  <title>Index of /</title>
                 </head>
                 <body>
                <h1>Index of /</h1>
                <ul><li><a href="01array.php"> 01array.php</a></li>
                <li><a href="02abc.php"> 02abc.php</a></li>
                <li><a href="03.php"> 03.php</a></li>
                <li><a href="1122.php"> 1122.php</a></li>
                <li><a href="a.php"> a.php</a></li>
                <li><a href="%e5%89%af%e6%9c%ac.php"> 副本.php</a></li>
                </ul>
                </body></html>
          ```


+   报文查看工具：fiddler

## HTTP请求方式及PHP中参数的接收方式：

+   get

    +   特点：

        +   将参数放到URL中传递到服务器，
        +   一般用来从服务器中得到数据
        +   数据量有限
        +   数据不安全

    +   方式：

        +   在URL中直接输出参数
        +   通过a链接请求传递参数
        +   通过js方式传递参数
        +   通过表单的get提交参数
        +   ajax的get请求方式

    +   PHP中的接收方式：

        ```php
                                $name = $_GET['name'];
                                $age = $_GET['age'];
                                echo "{$name},{$age}";
        ```

+   post

    +   特点：

        +   将参数放到请求报文体中传递到服务器，
        +   一般用来提交数据到服务器中
        +   传递数据量相比get要大
        +   数据相对get而言安全

    +   方式：

        +   表单的POST提交
        +   ajax的post请求方式

    +   PHP中的接收方式

        ```php
                                $name = $_POST['name'];
                                $age = $_POST['age'];
                                echo "{$name},{$age}";
        ```

+   $_REQUEST:

    +   作用：既可以接收GET传递的参数，又可以接收POST传递的参数

    ```php
      $name = $_REQUEST['name'];
      $age = $_REQUEST['age'];
      echo "{$name},{$age}";
    ```




##	学生信息管理系统
+	目的：
     +	使用PHP完成一套CRUD（Create、Retrieve、Update、Delete即增删改查）
       +了解服务器的工作原理

