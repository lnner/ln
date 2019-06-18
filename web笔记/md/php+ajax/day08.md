# day08

## Ajax概述

+ 术语ajax最早产生于2005年，Ajax表示Asynchronous JavaScript and XML(异步JavaScript和XML)，但是它不是像HTML、JavaScript或CSS这样的一种“正式的”技术，它是表示一些技术的混合交互的一个术语（JavaScript、Web浏览器和Web服务器），它使我们可以获取和显示新的内容而不必载入一个新的Web页面。增强用户体验，更有桌面程序的感觉。

## 同步和异步概念分析

- 生活中同步与异步
  - 买水例子：
    - 同步：
      - 上课---->暂停----->买水----->继续
    - 异步：
      - 我上课---->我继续上课
      - 找一个人去买  ，买完以后送来
- 浏览器与服务器交互的同步与异步
  - 异步：指某段程序执行时不会阻塞其它程序执行，其表现形式为程序的执行顺序不依赖程序本身的书写顺序，相反则为同步。
  - XMLHttpRequest可以以异步方式的处理程序

## XMLHttpRequest

+ 浏览器内建对象，用于在后台与服务器通信(交换数据) ，由此我们便可实现对网页的部分更新，而不是刷新整个页面。

  ```php
  // 1、创建XMLHttpRequest对象
  var xhr = new XMLHttpRequest();
  // 2、设置参数
  xhr.open('get','./index.php',true);
  // 3、指定回调函数
  xhr.onreadystatechange = function(){
    	//5、判断响应
      if(xhr.readyState == 4){
          if(xhr.status == 200){
              // 获取响应数据
              var data = xhr.responseText;
              var info = document.getElementById('info');
              if(data == '1'){
                  info.innerHTML = '成功';
              }else if(data == '2'){
                  info.innerHTML = '失败';
              }
          }
      }
  }
  // 4、发送请求
  xhr.send(null);
  ```

+ 步骤：

  + 1.0 创建对象

    ```php
    var xhr = new XMLHttpRequest();
    ```

  + 2.0 设置参数

    ```php
    //get 请求
    xhr.open('get','./index.php',true);
    //post 请求
    xhr.open('post','./index.php',true);
    ```

    + 参数传递：
      + get：直接放在url后面即可
      + post：通过send方法来传递

  + 3.0 设置回调函数

    ```php
    xhr.onreadystatechange = function(){}
    ```

    +   onreadystatechange为 readstate 属性状态改变时执行
    +   readstate 属性有五个状态：
        +    xhr.readyState = 0时，（未初始化）还没有调用send()方法
        +    xhr.readyState = 1时，（载入）已调用send()方法，正在发送请求
        +    xhr.readyState = 2时，（载入完成）send()方法执行完成，已经接收到全部响应内容
        +    xhr.readyState = 3时，（交互）正在解析响应内容
        +    xhr.readyState = 4时，（完成）响应内容解析完成，可以在客户端调用了
        +    了解即可  

  + 4.0 发送请求

    ```php
    xhr.send(null);
    ```

    + post方式时，可以在send后面带参数

    + 参数形式：key1=value1&key2=value2;

    + 如果要后台接收到，还必须加上：

      ```javascript
      //post请求时如果要传递参数需要带上
      xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
      ```

  + 5.0 判断响应

    + 当响应状态为200时，才需要执行回调函数

## 案例

- 登录验证功能

## JSON

+ 即 JavaScript Object Notation，另一种轻量级的文本数据交换格式，独立于语言。

+ 它是javascript对象的一种字符串的表现形式

  ```javascript
  //表示对象
  {"name":"jack","age":"18","gender":"男"}
  //表示数组
  [{"name":"jack","age":"18","gender":"男"},{"name":"rose","age":"18","gender":"女"}]
  ```

+ ### 语法规则

  + 1、数据在键/值对中
  + 2、数据由逗号分隔(最后一个健/值对不能带逗号)
  + 3、花括号保存对象方括号保存数组
  + 4、使用双引号

+ ## JSON解析

  + JSON数据在不同语言进行传输时，类型为字符串，不同的语言各自也都对应有解析方法，需要解析完成后才能读取
  + Javascript 解析方法
    + eval()
      + 如果转换JSON数组的字符串可以直接转换

      + 如果将JSON对象的字符串转为对象

        + 需要将对象首尾加上“（）”，才能转换成功

      + eval可以解析并执行js代码：

        ```js
        eval('alert("abc");');
        ```
    + JSON对象  
      + JSON.parse()：将JSON格式的字符串转为JSON对象
      + JSON.stringify()：将JSON对象转为JSON格式的字符串
  + PHP解析方法
    + json_encode()：将对象转为JSON格式的字符串
    + json_decode()：将JSON格式的字符串转为对象
      + 转为对象的类型是 stdClass，这类似于一个没有名字的类型，将来将字符串转换以后会得到这个类型的对象，可以通过这个对象最出其中的属性。

+ 总结：JSON体积小、解析方便且高效，在实际开发成为首选。

## 函数封装

```javascript
function ajax(url,type,param,dataType,callback){
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    if(type == 'get'){
        url += "?" + param;
    }
    xhr.open(type,url,true);

    var data = null;
    if(type == 'post'){
        data = param;
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    }
    xhr.send(data);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                var data = xhr.responseText;
                if(dataType == 'json'){
                    data = JSON.parse(data);
                }
                callback(data);
            }
        }
    }
}
```

## 基于封装的案例

- 动态获取下拉框中的数据

## jQuery的Ajax相关api

- $.ajax()
- $.get()
- $.post()
- $.load()
- $.serialize()

## 模板引擎[artTemplate](https://aui.github.io/art-template/)

- 基本使用步骤
  - 引入模板引擎js文件
  - 编写模板
  - 通过api渲染
- 基础语法
  - 分支结构
  - 循环结构
- api
  - template(filename, data);// 基于模板名渲染模板

