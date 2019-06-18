# 登陆的做法

~~~php
<?php
header("Content-type:text/html;charset=utf-8");
// 当以post的方式去请求的时候，要检查一下

$message = '';//先定义一个变量，下面要用到
if(!empty($_POST)){
	$email = $_POST['email'];
	$password = $_POST['password'];

	// 验证的时候，需要先检查一下有没有对应的用户，如果有对应的用户，再查询密码是否匹配

	//1. 先连接数据库服务器
  $connect =	mysqli_connect('localhost','root','123456');

  //2. 选择数据库
  mysqli_select_db($connect,'baixiu');

  //3. 防止乱码，设置一个编码集
  mysqli_set_charset($connect,'utf8');

  //4.查询数据库，是否有这个用户名  注意连接的时候$email有一个引号包裹起来
	// select * from users where email="admin@baixiu.com"
	// select * from users where email = "admin@baixiu.com";
   $result=  mysqli_query($connect,'SELECT * FROM users WHERE email = "'.$email.'"');

//   var_dump($result);   mysqli_fetch_assoc从结果集中取得一条数据
//var_dump($result);
	$row = mysqli_fetch_assoc($result);

//	var_dump($row);
if($row){		// 如果有数据了，再来判断密码是否正确
	if($row['password']==$password){
//		echo '登陆成功';

	header('location:/admin');
		exit;// 退出程序
	}else {
//		echo '登陆失败';
$message = "密码错误...";
	}
}else {
		// 没有结果，用户名不存在，邮箱输错了。。。
//		echo '登陆失败...';
$message = "用户名不存在...";
}
//   exit;
}

?>
~~~

# 登陆状态检测

~~~php
if($row){		// 如果有数据了，再来判断密码是否正确
	if($row['password']==$password){
//		echo '登陆成功';
		// 通过会话记录下登陆的状态
		// 存一个session 服务器会自动 的设置一个响应头信息
		//set-cookie 给浏览器，然后浏览器在本地存一个cookie 这个cookie默认叫做PHPSESSID
		// PHP通过超全局数组 $_SESSION存一个session
		// php中要使用session需要 先开启session
		session_start(); //这是一个函数
		$_SESSION['user_info'] = $row; // 因为 这一行中就存在着用户登陆的信息
	header('location:/admin');
		exit;// 退出程序
	}else {
//		echo '登陆失败';
$message = "密码错误...";
	}
}else {
		// 没有结果，用户名不存在，邮箱输错了。。。
//		echo '登陆失败...';
$message = "用户名不存在...";
}
~~~

# 设置主页面的检测

- 1.在index.php里面进行如下的设置

~~~php
<?php
	// 要读取session的话，先开启
	// 如果读取不到user_info这个session的话，认为是没有登陆的状态
	if(!isset($_SESSION['user_info'])) { //检测当前页面里面有没有 session
		 header('location:/admin/login.php');
		 exit;//不要往下执行了
	}

?>
~~~

# 定义数据库的配置信息

- 1.在项目文件夹中新建一个config.php的文件，写如下代码:

~~~php
<?php
	 // 数据库的连接一般不会变，因此这个配置信息可以使用常量 来定义
	 // php 中定义 常量 要使用define()

	 // 1. 定义一个数据库的服务地址
	 define('DB_HOST','127.0.0.1');
		//2. 定义数据库服务器用户名
		define('DB_USER','root');
		//3.定义数据库服务器的密码
		define('DB_PASSWORD','123456');
		//4.定义数据库的名称
		define('DB_NAME','baixiu');
		
		// 还需要在单独的一个文件中封装一些常用 的函数
 ?>
~~~

# 封装一些常用 的函数

~~~php
<?php

	//1.导入配置文件
	require('./config.php'); // 如果有错误就会终止操作，因此此处使用requrire而不是使用include

	//2. 封装数据库的连接操作
	function connect(){
	  $connection=	mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD);

	  if(!$connection){
//			echo '数据库连接失败...';
			die('数据库连接失败...'); // 等同于echo''+return，就是终止程序的往下执行
	  }
			//2. 选择数据库
        mysqli_select_db($connection,DB_NAME);

        //3. 防止乱码，设置一个编码集
        mysqli_set_charset($connection,DB_CHARSET);


	  return $connection;
	}
		//用来查询sql语句
		function query($sql){
		// 连接数据库
		$connection = connect();

// 查询到的资源
		 $result =	mysqli_query($connection,$sql);
		 return $result;
		}

	// 用于将查询到的资源，转化 成数组
	function fetch($result){
	$rows = array();
	// 从资源中取一行 ,如果有多行需要取的话，要用循环
	while($row = mysqli_fetch_assoc($result)){
		$rows[] = $row;
	}

	return $rows;


	}
	connect();
 ?>
~~~




