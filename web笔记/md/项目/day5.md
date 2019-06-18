## 添加文章

### 1.添加前的准备工作

- 1.将admin文件夹下的post-add.html修改成post-add.php

- 2.将aside.php中的导航链接修改一下

  ~~~php
   <ul id="menu-posts" class="collapse">
            <li><a href="/admin/posts.php">所有文章</a></li>
            <li><a href="/admin/post-add.php">写文章</a></li>
            <li><a href="/admin/categories.php">分类目录</a></li>
  </ul>
  ~~~

- 3.到post-add.php文件中修改公共的样式 

  ~~~php
  <?php include './inc/style.php'?>
  <?php include './inc/script.php'?>
  <?php include './inc/nav.php'?>
  <?php include './inc/aside.php'?>
  ~~~

- 4.改完了之后，左侧的头像和昵称会报错，需要开启session

  ~~~php
  <?php

    require '../functions.php';
    checkLogin();
  ?>
  ~~~

- 5.查看表单中的设置,注意每个输入框 里面的name属性是否跟数据库中的字段值是一样的

### 2.渲染页面所属分类信息

- 要把页面中应该显示的信息渲染出来,比如**所属分类**

  - 2.1 在当前页面的最上面，先把分类信息查询出来

    ~~~php
    <?php
      header('Content-type:text/html;charset=utf-8');
      require '../functions.php';
      checkLogin(); //检测用户是否登陆

      //先查询数据，把当前页面上的信息显示出来，比如分类信息
      $lists = query('SELECT * FROM categories');

    ?>
    ~~~

  - 2.2 在html结构中,渲染信息

    ~~~php
    <div class="form-group">
        <label for="category">所属分类</label>
        <select id="category" class="form-control" name="category_id">
        <?php foreach($lists as $key => $vals) { ?>
    		<option value="<?php echo $vals['id']?>"><?php echo $vals['name']?></option>
        <?php } ?>
        </select>
    </div>
    ~~~

### 3.上传缩略图片

- 3.1这个的操作和之前几乎是一样的，在当前页面的最下面,给按钮注册事件,发送文件和请求

  ~~~javascript
  <script>
    $('#feature').on('change',function(){

      //所有的文件都是以二进制的形式进行传输的
      var data = new FormData();
      data.append('feature',this.files[0]);

      // 创建异步对象 
      var xhr = new XMLHttpRequest;

      //设置请求头
      xhr.open('post','/admin/post-add.php?action=upfile');

      //发送数据
      xhr.send(data);

      //请求成功之后的处理
      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
          // console.log(xhr.responseText);
          //预览图片
          $('.thumbnail').attr('src',xhr.responseText).show();
        }
      }
    })
  </script>
  ~~~

- 3.2 在当前面的最上面,接收传递过来的数据 

  ~~~php
  <?php

    // header('Content-type:text/html;charset=utf-8');
    require '../functions.php';
    checkLogin();

     //先查询数据，把当前页面上的信息显示出来，比如分类信息
      $lists = query('SELECT * FROM categories');

    $action = isset($_GET['action']) ? $_GET['action'] : '';

    if($action =='upfile'){
      //文件上传
      if(!file_exists('../uploads/thumbs')){
        mkdir('../uploads/thumbs');
      }
      
      //设置时间戳
      $fileName = time();

      //根据文件名截取后缀
      $ext = explode('.',$_FILES['feature']['name']);

      //拼接完整路径 
      $path = '../uploads/thumbs/' . $fileName . '.' . $ext[1];

      // 转移上传文件
      move_uploaded_file($_FILES['feature']['tmp_name'],$path);

      // 处理成网络路径，将相对路径做成绝对路径
      echo substr($path,2);
      exit;
    }
  ?>
  ~~~

- 3.3 把服务器传过来的数据,存在表单里,一块提交给服务器 

  - 在表单里面新增一个隐藏域

    ~~~php
     <div class="form-group">
                <label for="feature">特色图像</label>
                <!-- show when image chose -->
                <img class="help-block thumbnail" style="display: none">
                <input id="feature" class="form-control"  type="file">
                <input type='hidden' name="feature" value="" id="thumb">
    </div>
    ~~~

  - 给此隐藏域赋值

    ~~~javascript
    //请求成功之后的处理
        xhr.onreadystatechange = function(){
          if(xhr.readyState == 4 && xhr.status == 200){
            // console.log(xhr.responseText);
            //预览图片
            $('.thumbnail').attr('src',xhr.responseText).show();

            // 把数据存在表单里面以便提交到服务器
            $('#thumb').val(xhr.responseText);
          }
        }
    ~~~

### 4.提交页面信息

- 4.1 获取页面数据提交到数据库

  ~~~php
  <?php

    // header('Content-type:text/html;charset=utf-8');
    require '../functions.php';
    checkLogin();

     //先查询数据，把当前页面上的信息显示出来，比如分类信息
      $lists = query('SELECT * FROM categories');

    $action =  isset($_GET['action']) ?$_GET['action'] : '' ;

    if($action =='upfile'){
      //文件上传
      if(!file_exists('../uploads/thumbs')){
        mkdir('../uploads/thumbs');
      }
      
      //设置时间戳
      $fileName = time();

      //根据文件名截取后缀
      $ext = explode('.',$_FILES['feature']['name']);

      //拼接完整路径 
      $path = '../uploads/thumbs/' . $fileName . '.' . $ext[1];

      // 转移上传文件
      move_uploaded_file($_FILES['feature']['tmp_name'],$path);

      // 处理成网络路径，将相对路径做成绝对路径
      echo substr($path,2);
      exit;
    }

    //如果是post过来的数据的话,则需要将数据添加到数据库中
    if(!empty($_POST)){
      // print_r($_POST);
      // exit;
       $result =  insert('posts',$_POST);
       if($result){
        header('location:/admin/posts.php'); //插入成功的话，跳转到所有文章列表页
        exit;
       }
    }
  ?>
  ~~~



## 文章列表

###  1.准备工作 

- 1.将posts.html修改成posts.php

- 2.修改页面中的公共部分

  ~~~
   <ul id="menu-posts" class="collapse">
            <li><a href="/admin/posts.php">所有文章</a></li>
            <li><a href="/admin/post-add.php">写文章</a></li>
            <li><a href="/admin/categories.php">分类目录</a></li>
  </ul>
  ~~~

- 3.不要忘了开启session

  ~~~php
  <?php
    
    require '../functions.php';
    checkLogin();
  ?>
  ~~~

### 2.查询数据渲染页面

- 4.到数据库中去查询数据，渲染在当前页面上

  ~~~php
  <?php
    
    require '../functions.php';
    checkLogin();

    //1.到数据库中查询数据
    $lists = query('SELECT * FROM posts');
    // print_r($lists);//检测一下，是否获取到了所有的数据
    // exit;
  ?>

  ~~~

- 5.在页面渲染对应的数据

  ~~~php
  <tbody>
           <?php foreach($lists as $key => $vals){ ?>
            <tr>
              <td class="text-center"><input type="checkbox"></td>
              <td><?php echo $vals['title']?></td>
              <td><?php echo $vals['user_id']?></td>
              <td><?php echo $vals['category_id']?></td>
              <td class="text-center"><?php echo $vals['created']?></td>
              <?php if($vals['status']=='published') { ?>
              <td class="text-center">已发布</td>
              <?php } else { ?>
              <td class="text-center">草稿</td>
              <?php }  ?>
              <td class="text-center">
                <a href="javascript:;" class="btn btn-default btn-xs">编辑</a>
                <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
              </td>
            </tr>
           <?php } ?>
  </tbody>
  ~~~


## 联表查询

- 有的时候，两个表之间或是多个表之间是有关联的，因此需要进行多表查询

  ~~~
  SELECT * FROM posts
  SELECT * FROM posts LEFT JOIN users on posts.user_id = users.id
  SELECT * FROM posts LEFT JOIN users on posts.user_id = users.id LEFT JOIN categories on posts.category_id = categories.id
  ~~~

- 将页面中的信息进行更改

  ~~~php
  <tbody>
        <?php foreach($lists as $key => $vals){ ?>
            <tr>
              <td class="text-center"><input type="checkbox"></td>
              <td><?php echo $vals['title']?></td>
              <td><?php echo $vals['nickname']?></td>
              <td><?php echo $vals['name']?></td>
              <td class="text-center"><?php echo $vals['created']?></td>
              <?php if($vals['status']=='published') { ?>
              <td class="text-center">已发布</td>
              <?php } else { ?>
              <td class="text-center">草稿</td>
              <?php }  ?>
              <td class="text-center">
                <a href="javascript:;" class="btn btn-default btn-xs">编辑</a>
                <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
              </td>
            </tr>
        <?php } ?>
  </tbody>
  ~~~

- 如果查询出来的name为空的话，可以再重新设置一下

  ~~~php
  <tbody>
           <?php foreach($lists as $key => $vals){ ?>
            <tr>
              <td class="text-center"><input type="checkbox"></td>
              <td><?php echo $vals['title']?></td>
              <td><?php echo $vals['nickname']?></td>
              <?php if(empty($vals['name'])) { ?>
              <td>未分类</td>
              <?php } else { ?>
              <td><?php echo $vals['name']?></td>
              <?php } ?>
              <td class="text-center"><?php echo $vals['created']?></td>
              <?php if($vals['status']=='published') { ?>
              <td class="text-center">已发布</td>
              <?php } else { ?>
              <td class="text-center">草稿</td>
              <?php }  ?>
              <td class="text-center">
                <a href="javascript:;" class="btn btn-default btn-xs">编辑</a>
                <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
              </td>
            </tr>
           <?php } ?>
  </tbody>
  ~~~

## 分页介绍

- 1.假设有某些数据，每页显示N条

  ~~~php
  <?php 
  	
  	// 假设有102条数据
  	$total = 102;

  	//每页显示5条
  	$pageSize = 5;

  	//根据上述两个值，计算总共有多少页
  	$pageCount = ceil($total / $pageSize) ;

  	
   	// 获取用户传递过来的页码
  	 $currentPage = isset($_GET['page']) ? $_GET['page'] : 1;

  	//系统函数range可以将一个连续的数字存入数组，此数据是关联数组
  	// print_r(range(1,10));
  	 // print_r(range(1,$pageCount));
  	 $pages = range(1,$pageCount);
  ?>
  ~~~

- 2.把页数显示在页面上

  ~~~php
  <!DOCTYPE html>
  <html lang="en">
  <head>
  	<meta charset="UTF-8">
  	<title>分页</title>
  </head>
  <body>
  	
  	<?php foreach($pages as $key => $val) { ?>
  			<a href="./page.php?page=<?php echo $val?>"><?php echo $val?></a>
  	<?php } ?>
  	
  </body>
  </html>
  ~~~

- 3.数据还有上一面和下一页,并判断是否显示

  ~~~php
  <?php 
  	
  	// 假设有102条数据
  	$total = 102;

  	//每页显示5条
  	$pageSize = 5;

  	//根据上述两个值，计算总共有多少页
  	$pageCount = ceil($total / $pageSize) ;
  ~~~


  	 // 获取用户传递过来的页码
  	 $currentPage = isset($_GET['page']) ? $_GET['page'] : 1;

  	 //设置上一页
  	 $prevPage = $currentPage - 1;

  	 //设置下一页
  	 $nextPage = $currentPage + 1;

  	//系统函数range可以将一个连续的数字存入数组，此数据是关联数组
  	// print_r(range(1,10));
  	 // print_r(range(1,$pageCount));
  	 $pages = range(1,$pageCount);
  ?>

  <!DOCTYPE html>
  <html lang="en">
  <head>
  	<meta charset="UTF-8">
  	<title>分页</title>
  </head>
  <body>
  	<!-- 如果页数为负数就不应该有上一页 -->
  	<?php if($currentPage>1){ ?>
  	<a href="./page.php?page=<?php echo $prevPage?>">上一页</a>
  	<?php } ?>
  	<?php foreach($pages as $key => $val) { ?>
  			<a href="./page.php?page=<?php echo $val?>"><?php echo $val?></a>
  	<?php } ?>
  	<?php if($currentPage < $pageCount){ ?>
  	<a href="./page.php?page=<?php echo $nextPage?>">下一页</a>
  	<?php } ?>
  </body>
  </html>
  ~~~

- 4.如果数据量超多,需要进行分页显示

  ~~~php
  <?php 
  	
  	// 假设有102条数据
  	$total = 102;

  	//每页显示5条数据
  	$pageSize = 5;

  	//根据上述两个值，计算总共有多少页
  	$pageCount = ceil($total / $pageSize) ;


  	 // 获取用户传递过来的页码
  	 $currentPage = isset($_GET['page']) ? $_GET['page'] : 1;

  	 //设置上一页
  	 $prevPage = $currentPage - 1;

  	 //设置下一页
  	 $nextPage = $currentPage + 1;

  	 // 设置显示的页码编号   假设每页显示6个
  	 // 1 2 3 4 5 6		   3 4 5 6 7 8        8 9 10 11 12 13
  	 $pageLimit = 6;

  	 // 根据当前页面确定页码的起点
  	 $start = $currentPage - floor($pageLimit / 2);

  	 //起点不能小于0
  	 $start = $start < 1 ? 1 : $start;
  	 // 根据当前页面确定页码的终点
  	 $end = $start + $pageLimit - 1;

  	 //$end不能大于最后一页
  	 if($end > $pageCount) {
  	 		$end = $pageCount;
  	 }

  	 //系统函数range可以将一个连续的数字存入数组，此数据是关联数组
  	// print_r(range(1,10));
  	 // print_r(range(1,$pageCount));
  	 // $pages = range(1,$pageCount);
  	 $pages = range($start,$end);
  ?>

  <!DOCTYPE html>
  <html lang="en">
  <head>
  	<meta charset="UTF-8">
  	<title>分页</title>
  </head>
  <body>
  	<!-- 如果页数为负数就不应该有上一页 -->
  	<?php if($currentPage>1){ ?>
  	<a href="./page.php?page=<?php echo $prevPage?>">上一页</a>
  	<?php } ?>
  	<?php foreach($pages as $key => $val) { ?>
  			<a href="./page.php?page=<?php echo $val?>"><?php echo $val?></a>
  	<?php } ?>
  	<?php if($currentPage<$pageCount){ ?>
  	<a href="./page.php?page=<?php echo $nextPage?>">下一页</a>
  	<?php } ?>
  </body>
  </html>
  ~~~

- 5.此时有点小瑕疵，就是最后的时候，显示不全6个，需要倒着往前推

  ~~~php
   //$end不能大于最后一页
  	 if($end > $pageCount) {
  	 		$end = $pageCount;

  	 		//要想让当前的页面也显示6个页码的话，要以最后的为起点往前算
  	 		$start = $end - $pageLimit + 1;
  	 }
  ~~~

- 6.查询数据的时候，想要显示特定的几条连惯数据，比如想从第8条开始，显示8条

  ~~~
  DELETE * FROM posts LIMIT 7,8;
  ~~~

- 7.查询某个表中的所有数据数量,并赐别名

  ~~~
  SELECT COUNT(*) AS total FROM posts;
  ~~~


## 数据分页应用

- 1.把之前的内容 考到当前文件下面,并修改SQL语句

  ~~~php
  <?php
    
    header('Content-type:text/html;charset=utf-8');
    require '../functions.php';
    checkLogin();
  ~~~


    // 假设有102条数据
    $total = 102;
    
    //每页显示5条数据
    $pageSize = 5;
    
    //根据上述两个值，计算总共有多少页
    $pageCount = ceil($total / $pageSize) ;


     // 获取用户传递过来的页码
     $currentPage = isset($_GET['page']) ? $_GET['page'] : 1;
    
     //设置上一页
     $prevPage = $currentPage - 1;
    
     //设置下一页
     $nextPage = $currentPage + 1;
    
     // 设置显示的页码编号   假设每页显示6个
     // 1 2 3 4 5 6      3 4 5 6 7 8        8 9 10 11 12 13
     $pageLimit = 6;
    
     // 根据当前页面确定页码的起点
     $start = $currentPage - floor($pageLimit / 2);
    
     //起点不能小于0
     $start = $start < 1 ? 1 : $start;
     // 根据当前页面确定页码的终点
     $end = $start + $pageLimit - 1;
    
     //$end不能大于最后一页
     if($end > $pageCount) {
        $end = $pageCount;
    
        //要想让当前的页面也显示6个页码的话，要以最后的为起点往前算
        $start = $end - $pageLimit + 1;
     }
    
     //系统函数range可以将一个连续的数字存入数组，此数据是关联数组
    // print_r(range(1,10));
     // print_r(range(1,$pageCount));
     // $pages = range(1,$pageCount);
     $pages = range($start,$end);
    
    //1.到数据库中查询数据
    // $lists = query('SELECT * FROM posts');
    // $lists = query('SELECT * FROM posts LEFT JOIN users on posts.user_id = users.id');
    $sql = 'SELECT * FROM posts LEFT JOIN users on posts.user_id = users.id LEFT JOIN categories on posts.category_id = categories.id LIMIT 0,7';
    $lists = query($sql);
     
    // print_r($lists);//检测一下，是否获取到了所有的数据
    // exit;
  ?>
  ~~~

- 2.修改当前显示的页码编号

  ~~~php
   <ul class="pagination pagination-sm pull-right">
            <li><a href="#">上一页</a></li>
            <?php foreach($pages as $key => $vals){ ?>
            <li><a href="/admin/posts.php?page=<?php echo $vals ?>"><?php echo $vals?></a></li>
            <?php }?>
            <li><a href="#">下一页</a></li>
  </ul>
  ~~~

- 3.设置上一页和下一页

  ~~~php
   <ul class="pagination pagination-sm pull-right">
          <?php if($currentPage > 1){ ?>
            <li><a href="/admin/posts.php?page=<?php echo $prevPage?>">上一页</a></li>
            <?php }?>
            <?php foreach($pages as $key => $vals){ ?>
            <li><a href="/admin/posts.php?page=<?php echo $vals ?>"><?php echo $vals?></a></li>
            <?php }?>
            <?php if($currentPage < $pageCount) { ?>
            <li><a href="/admin/posts.php?page=<?php echo $nextPage?>">下一页</a></li>
            <?php } ?>
  </ul>
  ~~~

- 4.设置每一页显示数据的起始编号,并修改sql语句

  ~~~php
   //根据当前页，计算需要显示的数据内容起始编号
     $offset = ($currentPage - 1) * $pageSize;
    $sql = 'SELECT * FROM posts LEFT JOIN users on posts.user_id = users.id LEFT JOIN categories on posts.category_id = categories.id LIMIT ' . $offset . ',' . $pageSize;
  ~~~

- 5.设置当前页码高亮显示,在foreach里面进行判断添加类active

  ~~~php
  <?php foreach($pages as $key => $vals){ ?>
     <?php if($currentPage == $vals) { ?>
         <li class="active">
            <a href="/admin/posts.php?page=<?php echo $vals ?>"><?php echo $vals?></a>
         </li>
     <?php }else { ?>
         <li>
           <a href="/admin/posts.php?page=<?php echo $vals ?>"><?php echo $vals?></a>
         </li>
       <?php }?>
           
  <?php }?>
  ~~~

  ​

  ​













