## 配置公共文件

- 1.在根目录下新建一个文件config.php,定义连接数据库的常量 

  ~~~php
  <?php
  	//一般配置信息使用常量 来表示
  	//在php中使用define来定义 常量 
  	
  	//1. 定义数据库服务器地址
  	define('DB_HOST','127.0.0.1');
  	//2. 定义服务器用户名
  	define('DB_USER','root');
  	//3. 定义服务器密码
  	define('DB_PASSWORD','123456');

  	//4. 定义数据库名称
  	define('DB_NAME','baixiu');
  	//5. 定义字符集
  	define('DB_CHARSET','utf8');
  ?>
  ~~~

## 定义公共的函数

- 在根目录下继续创建一个functions.php文件，封装公用的函数

  ~~~php
  <?php
  	header('content-type:text/html;charset=utf-8');
  	//在这个里面定义常用 的函数
  	require '../config.php';//将配置文件信息引入进来，使用require的好处，就是如果报错，就不会往下执行了，如果是include的话，则还会往下执行解析

  	//1. 定义一个连接数据库的函数
  	function connect(){
  	 $connection = mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD);

  	 var_dump($connection);
  	 if(!$connection){
  	 	 die('数据库连接失败...'); 
  	 	 // die就好比如 echo + return 程序执行到return 之后就不会再往下走了
  	 }

  	 // 选择数据库
  	  mysqli_select_db($connection,DB_NAME);

  	  // 设置数据库编辑，防止乱码
  	  mysqli_set_charset($connection,DB_CHARSET);
  	 return $connection;
  	}

  	 // 2. 定义一个查询数据库的函数
  	function query($sql){
  		$connection = connect();
   
  	  $result=	mysqli_query($connection,$sql); //会获取到一个结果集

  	   $rows= fetch($result);
  	  // return $result;

  	   return $rows;
  	}
  	// connect();
  	//3. 定义一个获取结果集中的数据的函数，存入数组中
  	function fetch($result){
  			$rows = array();
  			//获取一条数据
  			while($row = mysqli_fetch_assoc($result)){
  				$rows[] = $row;
  			}

  			return $rows;
  	}
  ?>
  ~~~

## 改造login.php中的代码

- 用封装好的共有的函数，改造原来的login.php中的代码，如下

  ~~~php
  <?php 
    
    $msg = '';

    //先引入一下文件
     require '../functions.php';
    if(!empty($_POST)){
      $email = $_POST['email'];
      $password = $_POST['password'];
      
        $rows= query('SELECT * FROM USERS WHERE EMAIL = "'.$email.'"');
        // $result= mysqli_query($connect,'SELECT * FROM USERS WHERE EMAIL = "'.$email.'"');

        //5.选取其中的一条数据
        // $row = mysqli_fetch_assoc($result);
          // print_r($rows);  $rows是一个二维数组
          // exit;
        if($rows[0]){
          if($rows[0]['password']==$password){

            //说明 用户名是存在的，是可以进行跳转的
            session_start();// 开启session
            $_SESSION['user_info'] = $rows[0];//存储一个session信息

            header('location:/admin');
            exit;//不要再往下执行了
          }else {
            $msg = '密码不正确...';
          }
        }else {
          $msg = '用户名不存在...';
        }
    }
  ?>
  ~~~

## 添加用户模块

- 1.先到admin文件夹下面的，找到users.html，将公有的部分进行替换,代码引入如下

  ~~~php
  <?php include './inc/style.php'?>
  <?php include './inc/script.php'?>
  <?php include './inc/nav.php'?>
  <?php include './inc/aside.php'?>
  ~~~

- 2.引入的公共样式需要正常解析，因此需要将当前的users.html改名为users.php

- 3.侧边栏的用户导航，要能够正常跳转，因此需要重新修改指向，找到inc文件夹下的aside.php文件

  ~~~html
  <li>
        <a href="/admin/users.php"><i class="fa fa-users"></i>用户</a>
  </li>
  ~~~

- 4.在users.php当中，先检测是否已经登陆

  ~~~php
  <?php 
      //引入共有的函数文件
      require '../functions.php';
      //检测是否已经登陆过
      checkLogin();
  ?>
  ~~~

- 5.对users.php页面进行改造，在form当中，添加action和method

  ~~~html
  <form action="/admin/users.php" method="post">
  ~~~

- 6.在users.php当中书写添加用户的代码

  ~~~php
  <?php 
      //引入共有的函数文件
      require '../functions.php';

      //检测是否已经登陆过
      checkLogin();

      $message = '';
      // 如果以post的方式提交的话，则需要获取数据
      if(!empty($_POST)){
        $slug = $_POST['slug'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $status = 'unactivated'; //未激活的

        // 执行插入操作
        //'insert into users (id,slug,email,password,status) value (null,"'.$slug.'","'.$email.'","'.$password.'","'.$status.'")';
        $result= insert('insert into users (id,slug,email,password,status) values (null,"'.$slug.'","'.$email.'","'.$password.'","'.$status.'")');
        // print_r($result);
        // exit;
        //如果插入成功
        if($result){
          header('location:/admin/users.php');//刷新 当前的页面
        }else {
          $message = "添加用户失败...";
        }
      }
  ?>
  ~~~

  ​



## 封装检测登陆的函数

- 在functions.php中新封装检测登陆的函数，因为除登陆页面之外，每个页面都应该是登陆之后跳转而来，因此需要把这个公共的提取出来，放在当前函数下面，代码如下：

  ~~~php
  //封装一个检测是否登陆的函数
  	function checkLogin(){
  		// 开启session
  		session_start();
  		if(!isset($_SESSION['user_info'])){
  			header('location:/admin/login.php');
  			exit;
  		}
  	}
  ~~~

  ​

## 封装插入数据的函数

- 在functions.php当中，新增一个插入数据的函数,代码如下

  ~~~php
  function insert($sql){
  		// 先连接数据库
  		$connection = connect();
  		// 执行插入语句 
  	 $result =	mysqli_query($connection,$sql);

  	 // 返回插入的结果
  	 return $result;
  	}
  ~~~

  ​

## 展示用户数据

- 1.在index.php 文件中，先调用方法，查询用户库中的所有的数据，代码如下

  ~~~php
   //查询所有的用户
      $rows = query('SELECT * FROM USERS');
      print_r($rows);
      exit;
  ~~~

- 2.在下面的tbody当中渲染出来当前的数据

  ~~~php
   <tbody>
                <?php foreach($rows as $key=>$val) { ?>
                <tr>
                  <td class="text-center"><input type="checkbox"></td>
                  <td class="text-center"><img class="avatar" src="<?php echo $val['avatar']; ?>"></td>
                  <td><?php echo $val['email']; ?></td>
                  <td><?php echo $val['slug']; ?></td>
                  <td><?php echo $val['nickname']; ?></td>
                  <?php if($val['status']=='activated'){ ?>
                  <td>激活</td>
                  <?php } else if($val['status']=='unactivated') { ?>
                  <td>未激活</td>
                  <?php } else if($val['status']=='forbidden') { ?>
                  <td>已禁用</td>
                  <?php } else { ?>
                  <td>已删除</td>
                  <?php } ?>
                  <td class="text-center">
                    <a href="post-add.php" class="btn btn-default btn-xs">编辑</a>
                    <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
                  </td>
                </tr>
                
                <?php } ?>
   </tbody>
  ~~~

  ​