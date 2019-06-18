# day09

## 同源与跨域

- 基本概念
  - 同源策略是浏览器的一种安全策略，所谓同源指的是请求URL地址中的协议、域名和端口都相同，只要其中之一不相同就是跨域
  - 同源策略主要为了保证浏览器的安全性
  - 在同源策略下，浏览器不允许Ajax跨域获取服务器数据
- 下列地址是否与该地址同源http://www.example.com/detail.html

| URL                                      | 描述      |
| ---------------------------------------- | ------- |
| http://api.example.com/detail.html       | 域名不同    |
| https://www.example.com/detail.html      | 协议不同    |
| http://www.example.com:8080/detail.html  | 端口不同    |
| http://api.example.com:8080/detail.html  | 域名、端口不同 |
| https://api.example.com/detail.html      | 协议、域名不同 |
| https://www.example.com:8080/detail.html | 端口、协议不同 |

- 跨域访问会受到限制：
  + 不允许XMLHttpRequest（Ajax）请求

## 跨域解决方案

- 解决方案概述
- jsonp原理分析

```javascript
function hello(data){
    console.log(data);
}
var script = document.createElement('script');
script.src = 'http://tom.com/data.php?_cb=hello&username=zhangsan&password=123';
var head = document.getElementsByTagName('head')[0];
head.appendChild(script);
```

- 实现jsonp后台接口
  - 回调函数名称获取
  - 返回数据格式分析

## JSONP

+ JSON with Padding

### 原理剖析

+ 其本质是利用了<script src=""></script>标签具有可跨域的特性，由服务端返回一个预先定义好的Javascript函数的调用，并且将服务器数据以该函数参数的形式传递过来，此方法需要前后端配合完成。

  + 文件后缀并不能代表什么，关建我们要看服务器返回的内容，比如css.php

    + 这时返回的内容为 echo ‘body {background:color}’我们可以通过content-type:text/css来指定浏览器该如何解析，返回的内容

      ```php
      <?php
      	header('Content-Type: text/css; charset=utf-8');
      	$color = $_GET['color'];
      	echo 'body {background: ' . $color . '}';
      ?>
      ```


  + 同样我们也可以js文件以.php结尾，比如js.php 这时我们可以指定Content-Type: text/javascript可告知浏览器要以javascript来执行我们返回的内容，如果返回的是一个javascript的一个函数调用，那么在这个函数调用过程中可以将跨域请求来的数据以“实参”的传递过来，并且这个实参一般是JSON格式的

    ```php
    <?php
    	$arr = array(
    		"name"=>"itcast",
    		"age"=>10
    	);
    	$json = json_encode($arr);
    	$callback = $_GET['callback']; // jsonp
    	echo $callback . '(' . $json . ')';
    ?>
    ```

    ​

  + 结合html标签src具有跨域访问的特性和Content-Type指定文档类型两个方面，可以实现跨域的数据访问。

    ```php
    <?php
    	header('Content-Type: text/javascript; charset=utf-8');
    	$callback = $_GET['callback']; 
    	$arr = array(
    		"name"=>"itcast",
    		"age"=>10
    	);
    	$json = json_encode($arr);
    	echo $callback . '(' . $json . ')'; // fn({"name": "itcast", "age": 10})
    ?>
    ```

    ​

+ JSONP其本质就是服务端返回了一个Javascript的一个函数调用，而这个函数已经提前被定义了。

## 基于jQuery的jsonp

- $.ajax基本使用
  - dataType为jsonp
- 参数分析
  - jsonp
  - jsonpCallback
- 调用第三方jsonp接口
  - 第三方数据平台概述
  - 第三方jsonp接口调用

## 案例

- 天气预报案例

  ```javascript
  		// 跨域访问
  		$.ajax({
  			type: 'get',
  			url: 'http://api.map.baidu.com/telematics/v3/weather',
  			// 必备的条件
  			dataType: 'jsonp',
  			data: {ak: '0A5bc3c4fb543c8f9bc54b77bc155724', location: '海口', output: 'json'},
  			success: function (info) {
  				console.log(info);
  				var data = info.results[0];
  				var html = template('tpl', data);
  				$('table').html(html);
  			}
  		});
  ```

  ​
