# day06

## 完成学习管理系统

- 查
  - 完成查询的静态页面
  - 将静态页面改为动态页面
    - 将原来静态页面上的数据全部删除
    - 再新建一个data.txt文件，将数据存储进去
      - 数据的保存格式为：id:1,name:jack,age:18,gender:男,edu:1
      - 属性与属性之间用逗号隔开，属性键与属性值以冒号隔开
      - 所以将来我们只需要将数据读取出来以后用逗号进行分隔能够得到所有的属性键和属性值
      - 将来再将属性键与属性值以冒号分隔开，那么就可 以得到单独的属性键和值了。
    - 将data.txt中的文件读取出来
      - 用file方法来读取，会将data.txt中的每一行数据读取成为数组中的一个元素
      - 为了操作方便，我们需要交一行数据转换为一个对象
      - 创建了一个对象：Person，对象又必须依赖于类来创建，所以我们又创建了一类Person
      - 通过Person将所有行数据转为了对象
    - 将得到的对象用一个数组统一管理起来
    - 再将数组转换为字符串替换原来静态数据 
- 增
  - 完成新增的静态页面，并且在首页中添加一个进入新增页面按钮，并且添加事件
  - 在新增页面中添加一些表单元素，所有的表单元素必须放在form标签中
    - 所有的表单元素必须具备name属性，因为将来提交的时候，form会将表单的name属性作为键，表单的value属性作为值传递到目标页面
    - 如果是下拉框或者是单选框将来也是提交它里面的value属性，所以必须给这种类型的元素添加默认的value属性
  - 给form元素指定action属性，用来确定将来数据提交的页面
  - 创建一个action指定的数据提交页面
  - 接收所有的参数，并且将参数转换为一个对象
    - 对象中所有的属性都有，但是没有id属性
    - 需要得到现在data中所有数据里id最大的id值，并且将其它加1，赋值这个缺少id属性的对象
  - 得到所有data中的数据，并且将新得到的这个对象添加到data数据中
  - 重新将数据写入到data.txt页面
  - 如果写入成功重新跳转回首页"/"
- 改
  - 完成修改的静态页面，并且在首页中添加一个进入修改页面按钮，并且添加事件
    - 修改的时候需要指定到底修改哪条数据，所以需要带上一个id
  - 创建一个修改页面
  - 在修改页面中添加一些表单元素，所有的表单元素必须放在form标签中
    - 所有的表单元素必须具备name属性，因为将来提交的时候，form会将表单的name属性作为键，表单的value属性作为值传递到目标页面
    - 如果是下拉框或者是单选框将来也是提交它里面的value属性，所以必须给这种类型的元素添加默认的value属性
    - 由于将来提交到服务器的时候没有带id，所以需要在修改页面添加一个id，并且这个id不想让用户看到，所以我们在表单元素中添加了一个<input type="hidden">,用来隐藏id的值
    - 要根据id得到id对象的数据，将数据的值填充到表单元素中
  - 将来数据修改完成以后，需要将数据提交到一个新的页面中，需要再次添加一个新的页面
  - 在新的页面中
    - 得到所有数据，
    - 将数据转换为一个对象
    - 取出来data.txt中的所有数据，再转换成对象数据，
    - 并且通过id找到id对应的那个对象，
    - 将我们修改后对象的所有的值赋值给这个找到的对象
    - 将修改完成以后听数组对象，重新转换为字符串
    - 再次写入到data.txt中 

## 会话技术

- http无状态概述
- 状态保持方式概述

## cookie

### cookie原理分析

- 一个cookie的设置以及发送过程分为以下四步
  1. 客户端发送一个http请求到服务器端 
  2. 服务器端发送一个http响应到客户端，其中包含Set-Cookie头部 
  3. 客户端发送一个http请求到服务器端，其中包含Cookie头部 
  4. 服务器端发送一个http响应到客户端 

## 语法：

```php
setcookie(name[, value, expire, path, domain]);
```

#### cookie常用属性

- expires 有效期 

  - 临时COOKIE(缓存cookie)

    ```php
    setcookie("uName","admin");
    ```

  - 硬盘COOKIE

    ```php
    //一小时过期
    setcookie("uName","admin",time()+ 3600)
    //永久性COOKIE
    setcookie("password","123",PHP_INT_MAX);
    ```

- path有效 路径 

  ```php
  //只有在upload文件夹下才能被访问到
  setcookie("uName","admin",time()+ 3600,"/upload")
  ```

- domain 域名 

  - 域名：
    - 顶级：baidu.com
    - 二级域名
      - www.baidu.com
      - music.baidu.com
        - api.music.baidu.com
      - image.baidu.com

  ```php
  //只有在a.com以及它下面的子域名中才能被访问
  setcookie("uName","admin",time()+ 3600,"/","a.com")
  ```

### 删除cookie

+ 设置有效时间为过去时间

  ```php
  setcookie("uName","admin",time()-1);
  ```

+ 将cookie中的值设置为false或者空字符串

  ```php
  setcookie("uName",false);
  //或者
  setcookie("uName","");
  ```

+ 不设置值

  ```php
  setcookie("uName");
  ```

+ 在浏览器中清除缓存

### 服务器操作cookie

```php
// 设置cookie
// 
// 设置1小时后过期
setcookie("user", "lisi", time()+3600);
// 获取单个cookie
echo $_COOKIE["user"];
// 查看所有cookie
print_r($_COOKIE);
```

#### js对cookie基本操作

```javascript
// 设置cookie
function setCookie(key,value,param){
    document.cookie = key + '=' + value + '; expires=' + param.expires + '; path=' + param.path; 
}
// 获取cookie
function getCookie(key){
    var cookies = document.cookie;
    var arr = cookies.split('; ');
    if(arr){
        for (var i = 0; i < arr.length; i++) {
            var kv = arr[i].split('=');
            if(kv[0] == key){
                return kv[1];
            }
        }
    }
}
```

### cookie的缺点：

+ COOKIE数据不太安全；
+ COOKIE存储的数据类型，只能是字符串；
+ COOKIE文件是有容量限制(大约4KB)。4*1024b--> 1个文字大概是2~3b

## session

### session的优点：

+ SESSION也是一种会话技术；
+ SESSION数据存在服务器端，相对于比较安全；
+ SESSION技术是基于COOKIE的，没有COOKIE也就没有SESSION了。
+ 服务器将SESSION数据保存在服务器上，而将SESSION的用户id存储在客户端电脑上。
+ SESSION存储的数据类型，除了资源外的数据类型都可以；
+ SESSION文件没有大小限制；

### session原理分析

- 客户端第一次请求服务器时，服务器开启一个session，生成一个唯一标识（sessionid：存储的数据与此sessionid关联），并以响应头的Set-Cookie属性响应到客户端
- 客户端的后续请求会一直通过请求头的Cookie属性携带sessionid（客户端与服务器通过此id维持状态）

### session基本操作

- 设置session

```php
session_start();
$_SESSION['user'] = array('username'=>'lisi','age'=>'12');
```

- 读取session

```php
session_start();
$user = $_SESSION['user'];
```

- 删除一个session信息

```php
session_start();
unset($_SESSION['user']);
```

- 删除所有session信息

```php
session_start();
unset($_SESSION);
```

- 销毁session

```php
session_destroy();
```

### session与cookie的关系

- session可以借助cookie实现状态维持，也可以不依赖cookie（URL重写）

| 区别        | cookie        | session          |
| --------- | ------------- | ---------------- |
| 存储位置      | 浏览器           | 服务器              |
| 浏览器携带的数据量 | 多             | 少（只携带session-id） |
| 存储的数据类型   | 只能是字符串        | 任意类型             |
| 安全性       | 较低            | 较高               |
| 默认的有效路径   | 当前路径及其子路径     | 整站有效             |
| 数据的传输量    | 有限制4K，不能超过20个 | 无限制              |

### session的回收时间：

+ session.gc_maxlifetime(1564行)

```asp
session.gc_maxlifetime = 1440
```

