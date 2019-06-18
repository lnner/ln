## 头像上传功能

- 1.将profile.php页面中的头像渲染代码修改如下:

  ~~~php
  <div class="col-sm-6">
         <label class="form-image">
            <input id="avatar" type="file">
            <img src="<?php echo isset($rows[0]['avatar'])?$rows[0]['avatar']:'/assets/img/default.png'?>">
            <i class="mask fa fa-upload"></i>
         </label>
  </div>
  ~~~

- 2.在profile.php中写js代码,注册事件提交图片

  ~~~javascript
  <script>
    $('#avatar').on('change',function(){
      // console.log(123);
      // for(var k in this){
      //   console.log(k + "==="+ this[k]); // files是所有的上传的文件列表
      // }
      // console.log(this.files[0]);//将得到的图片传到服务器
      //所有的文件的传输都是以二进制的形式进行的传输
      var data = new FormData(); 
      data.append('avatar',this.files[0]); //将文件转换成二进制

      //实例化一个异步对象
      var xhr = new XMLHttpRequest();
      // 发送请求
      xhr.open('post','/admin/upfile.php');

      xhr.send(data);
    })
  </script>
  ~~~

  ​

- 3.在admin下面新建一个upfile.php文件，接收传过来的文件内容

  ~~~php
  <?php
  	// 接收文件的上传需要使用$_FILES
  	print_r($_FILES);
  	// php有一个特性，就是会把文件先存在一个临时的目录里面，然后再由开发人员存到特定的目录下

  	// if(file_exists('../uploads')){
  	// 	//存在的话，就存入进去 
  	// }else {
  	// 	// 不存在的话，就创建
  	// 	mkdir('../uploads');
  	// }

  	//还有另一种写法
  	if(!file_exists('../uploads')){
  			mkdir('../uploads');//创建此文件夹
  	}
  	// 为避免文件名重复，可以使用时间戳做为文件名
  	$fileName = time();

  	//截取字符串，获取后缀名
  	$ext = explode('.', $_FILES['avatar']['name']);//获取后缀名

  		// $ext = explode('.',$_FILES['avatar']['name'])[1];
  		//  $ext = explode('.', $_FILES['avatar']['name'])[1];
  	$path = '../uploads/'.$fileName.'.'.$ext[1];
  	echo $path;
  	//将文件转存到指定的目录,
  	move_uploaded_file($_FILES['avatar']['tmp_name'],$path);
  	//到这一步可以验证是否上传成功
  ?>
  ~~~


- 4.要将图片的保存路径，存到数据库中，以便方便之后的加载，并返回给浏览器一份路径信息

  ~~~php
  <?php
  	// 接收文件的上传需要使用$_FILES
  	// print_r($_FILES);
  	require '../functions.php';
  	// php有一个特性，就是会把文件先存在一个临时的目录里面，然后再由开发人员存到特定的目录下

  	// if(file_exists('../uploads')){
  	// 	//存在的话，就存入进去 
  	// }else {
  	// 	// 不存在的话，就创建
  	// 	mkdir('../uploads');
  	// }

  	//还有另一种写法
  	if(!file_exists('../uploads')){
  			mkdir('../uploads');//创建此文件夹
  	}
  	// 为避免文件名重复，可以使用时间戳做为文件名
  	$fileName = time();

  	//截取字符串，获取后缀名
  	$ext = explode('.', $_FILES['avatar']['name']);//获取后缀名

  		// $ext = explode('.',$_FILES['avatar']['name'])[1];
  		//  $ext = explode('.', $_FILES['avatar']['name'])[1];
  	$path = '/uploads/'.$fileName.'.'.$ext[1];
  	// echo $path;
  	//将文件转存到指定的目录,
  	move_uploaded_file($_FILES['avatar']['tmp_name'],'..'.$path);

  	//读取用户id，因为下面用到了
  	$user_id = $_SESSION['user_info'][0]['id'];
  	//更新数据库，进行永久存储，每次都可以渲染出来
  	update('users',array('avatar'=>$path),$user_id);

  	//将上传的路径返回给浏览器
  	echo $path;
  ?>
  ~~~

- 5.接收服务器传过来的数据，渲染在当前页面上

  ~~~javascript
  <script>
    $('#avatar').on('change',function(){
      // console.log(123);
      // for(var k in this){
      //   console.log(k + "==="+ this[k]); // files是所有的上传的文件列表
      // }
      // console.log(this.files[0]);//将得到的图片传到服务器
      //所有的文件的传输都是以二进制的形式进行的传输
      var data = new FormData(); 
      data.append('avatar',this.files[0]); //将文件转换成二进制

      //实例化一个异步对象
      var xhr = new XMLHttpRequest();
      // 发送请求
      xhr.open('post','/admin/upfile.php');

      //发送数据
      xhr.send(data);

      //接收返回的信息
      xhr.onreadystatechange = function(){
        if(xhr.readyState ==4 && xhr.status == 200){
          //将上传后的路径获取到，给img，以便实现预览效果
          $('.form-image img').attr('src',xhr.responseText);
        }
      }
    })
  </script>
  ~~~



## 侧边栏中头像和用户名的修改

- 1.找到侧边栏的文件，在inc文件夹中的aside.php中，修改里面的路径

  ~~~php
  <div class="profile">
        <img class="avatar" src="<?php echo isset($_SESSION['user_info'][0]['avatar'])?$_SESSION['user_info'][0]['avatar']:'/assets/img/default.png'?>">
        <h3 class="name"><?php echo $_SESSION['user_info'][0]['nickname']?></h3>
      </div>
  ~~~

  ​

## 退出登陆的操作

- 1.在inc文件下面的nav.php文件夹中，修改路径指向

  ~~~php
  <nav class="navbar">
        <button class="btn btn-default navbar-btn fa fa-bars"></button>
        <ul class="nav navbar-nav navbar-right">
          <li><a href="/admin/profile.php"><i class="fa fa-user"></i>个人中心</a></li>
          <li><a href="/admin/logout.php"><i class="fa fa-sign-out"></i>退出</a></li>
        </ul>
  </nav>
  ~~~

- 2.在admin文件夹下，新建一个logout.php文件

  ~~~php
  <?php
  	
  	//怎么样才算是退出登陆，就是清空了session就算是退出了
  	session_start();

  	unset($_SESSION['user_info']);

  	//跳转到登陆页面
  	header('location:/admin/login.php');
  ~~~



## 文章分类操作

### 1.先做分类目录   -渲染

- 把categories.html修改成categories.php,并修改里面的公共样式

  ~~~php
  <?php include './inc/style.php'?>
    <?php include './inc/script.php'?>
    <?php include './inc/nav.php'?>
    <?php include './inc/aside.php'?>
  ~~~

- 修改侧边栏的指向,找inc文件夹下面的aside.php文件，修改文章的指向 

  ~~~html
   <ul id="menu-posts" class="collapse">
            <li><a href="posts.html">所有文章</a></li>
            <li><a href="post-add.html">写文章</a></li>
            <li><a href="/admin/categories.php">分类目录</a></li>
  </ul>
  ~~~

  ​			

- 此时左边的用户名可能会报错，因为没有开启session,，可以做如下操作

  ~~~php
  <?php
    
    require '../functions.php';

    checkLogin();
  ?>
  ~~~

-  当前页面请求过来的时候，是get请求，要渲染右侧的信息，在当前页面写如下代码

   ~~~php
    // 查询数据库，渲染右侧的信息
     $lists = query('SELECT * FROM categories');
   ~~~

-  在当前页面的下面要拼接模板

   ~~~php
   <tbody>
               <?php foreach($lists as $key=>$vals){ ?>
                 <tr>
                   <td class="text-center"><input type="checkbox"></td>
                   <td><?php echo $vals['name']?></td>
                   <td><?php echo $vals['slug']?></td>
                   <td class="text-center">
                     <a href="javascript:;" class="btn btn-info btn-xs">编辑</a>
                     <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
                   </td>
                 </tr>
                 <?php }?>
     </tbody>
   ~~~

### 2.分类目录中的编辑和删除

- 把编辑和删除按钮的代码做如下修改

  ~~~php
  <td class="text-center">
                    <a href="/admin/categories.php?action=edit&ct_id=<?php echo $vals['id']?>" class="btn btn-info btn-xs">编辑</a>
                    <a href="/admin/categories.php?action=delete&ct_id=<?php echo $vals['id']?>" class="btn btn-danger btn-xs">删除</a>
                  </td>
  ~~~

- 先把大体步骤显示出来，在当前面的最上面写如下代码

  ~~~php
  <?php
    
    require '../functions.php';

    checkLogin();

    // 查询数据库，渲染右侧的信息
    $lists = query('SELECT * FROM categories');

    // print_r($lists);
    // exit;
    //只要是地址栏中有参数的拼接，都可以使用$_GET的方式来获取传递过来的参数
    $action = isset($_GET['action'])?$_GET['action']:'add';
    if($action=='add'){

    }else if($action=='edit'){

    }else if($action =='delete'){

    }
  ?>
  ~~~

### 3.删除操作

- 当删除按钮的时候

  ~~~php
   }else if($action =='delete'){
      $result= delete('DELETE FROM categories WHERE id = ' .$ct_id);
      if($result) {
        header('location:/admin/categories.php');//刷新页面
        exit;
      }
    }
  ~~~


### 4.文章分类中的编辑操作

- 当点编辑按钮的时候,查询数据，渲染在当前的页面上

  ~~~php
  else if($action == 'edit'){
      $title = '修改新分类目录';
      $btnText = '修 改';
      $action = 'update';
      // 先去数据库查询数据，渲染在当前面的页面当中
      $sql = 'SELECT * FROM categories WHERE id = ' . $ct_id;
      $rows = query($sql);
      // print_r($rows);
      // exit;
    }
  ~~~

- 渲染左侧表单的代码如下：

  ~~~php
  <form >
              <h2><?php echo $title?></h2>
              <div class="form-group">
                <label for="name">名称</label>
                <input id="name" class="form-control" value="<?php echo isset($rows[0]['name'])?$rows[0]['name']:'' ?>" name="name" type="text" placeholder="分类名称">
              </div>
              <div class="form-group">
                <label for="slug">别名</label>
                <input id="slug" class="form-control" value="<?php echo isset($rows[0]['slug'])?$rows[0]['slug']:'' ?>" name="slug" type="text" placeholder="slug">
                <p class="help-block">https://zce.me/category/<strong>slug</strong></p>
              </div>
              <div class="form-group">
                <button class="btn btn-primary" type="submit"><?php echo $btnText?></button>
              </div>
            </form>
  ~~~

- 当点更新按钮的时候

  - 这个时候的提交方式容易和上面的冲突，因此也需要进行get的提交,给表单设置提交路径

    ~~~
    <form action='/admin/categories.php' method='get'>
    ~~~

  - 因为还得根据action来确定是如何的操作,所以还需要添加action和id

    ~~~php
     <form action='/admin/categories.php' method='get'>
              <input type='hidden' name='action' value='<?php echo $action?>'>
              <input type='hidden' name='id' value='<?php echo $ct_id?>'>
             <h2><?php echo $title?></h2>
    ~~~

  - 在$action==update中书写如下代码

    ~~~php
    else if($action=='update'){

        // 单击按钮的时候，要提交到数据库中

        // print_r($_GET);
        // exit;
        unset($_GET['action']); //数据库 没有此项
       
        $ct_id = $_GET['id'];
        unset($_GET['id']);//主键也不允许被修改，也要删除掉

        $result = update('categories',$_GET,$ct_id);
        // var_dump($result);
        // exit;
        if($result){
          header('location:/admin/categories.php');
          exit;
        }
      }
    ~~~

###   5.添加操作

- 当单击添加按钮的时候，要把数据添加到数据库中

  ~~~php
  if($action =='add'){

        $title = '新增分类目录';
        $btnText = '增 加';

        // print_r($_GET); 一开始跳转过来的时候，是没有值的
        // exit;
        // 只有有值的时候，才会插入数据
        if(!empty($_GET)){
          // print_r($_GET);// 一开始跳转过来的时候，是没有值的
          // exit;
          unset($_GET['id']);
          unset($_GET['action']);

          $result = insert('categories',$_GET);
          if($result){
            header('location:/admin/categories.php');
            exit;
          }
        }
     }
  ~~~


### 6.批量删除(和之前几乎一模一样,课堂上不再讲述)

- 1.与之前的类似,给复选框添加适当的类名

  - 给thead标签中的input标签添加一个类开名

    ~~~
    <th class="text-center" width="40">
          <input type="checkbox" class="deleteAll">
    </th>
    ~~~

  - 给tbody标签中的第一个复选框 input标签添加一个类名

    ~~~php
    <td class="text-center">
           <input type="checkbox" class="deleteChk">
    </td>
    ~~~

  - 如果有多个标签被选中的话，要把批量删除的按钮显示出来，需要添加一个类

    ~~~php
    <div class="page-action">
                <!-- show when multiple checked -->
         <a class="btn btn-danger btn-sm deleteBtn" href="javascript:;" style="display: none">批量删除</a>
    </div>
    ~~~

- 2.在当前页的最下面写js代码,总按钮控制所有小按钮的选中与否

  ~~~php
   // 总按钮选中的时候，下面的所有的小按钮也要选中，批量删除按钮要显示出来，反之隐藏
      $('.deleteAll').on('click',function(){
        if(this.checked){
          $('.deleteChk').prop('checked',true);
          $('.deleteBtn').show();
        }else {
         $('.deleteChk').prop('checked',false);
          $('.deleteBtn').hide();
        }
      })
  ~~~

- 3.若干个小按钮选中的时候，也要让批量删除按钮显示出来

  ~~~php
  //2. 如果单独的选中若干个小按钮的话，也需要显示批量删除的按钮
    $('.deleteChk').on('click',function(){
      // 每次触发一个按钮的时候，都要判断一下当前有多少被选中了
       var size = $('.deleteChk:checked').size(); // 获取被选中的个数
       if(size>0){
          $('.deleteBtn').show(400);
          return ; //在函数内部，代码执行return关键字这里之后，不再往下执行
       }
        $('.deleteBtn').hide(400);
    })
  ~~~

- 4.给批量删除按钮注册事件，进行批量删除操作

  - 1.单击批量删除按钮的时候,获取所有的要删除数据的id,因此先给每一行数据添加id,到tbody下面的input中，添加id

    ~~~php
    <td class="text-center">
         <input type="checkbox" value="<?php echo $vals['id']?>" class="deleteChk">
    </td>
    ~~~

  - 2.给批量删除按钮注册事件,获取要删除的数据的id，并发送ajax请求

    ~~~php
    //3.给批量删除按钮，注册事件来删除对应的数据
      $('.deleteBtn').on('click',function(){
         // 先查询一下选中的按钮，并获取到对应的id
        var ids = [];
         $('.deleteChk:checked').each(function(){ //each函数用来遍历所有被选中的input
            ids.push($(this).val()); //将被选中的按钮的value值(id)存入数组当中
         })
         // console.log(ids);

         //4. 发送ajax请求，删除所有的选中的按钮的那些数据
         $.ajax({
          url:'/admin/categories.php?action=deleteAll',
          type:'post',
          data:{ids:ids},
          success:function(info){
            // alert(info.message) ;
            if(info.code == 10000){
              // 说明 删除成功了，需要刷新 当前页面
              location.reload(true); // 重新加载页面
            }
          }
         })
    ~~~

- 5.如果action=deleateAll的话，需要进行删除的操作,在当前页面的最上面，添加新的判断条件$action=='deleteAll'如下代码：

  ~~~php
  else if($action=='deleteAll'){
        // 'DELETE FROM users WHERE id in ()''
          //拼接sql语句
          // print_r($_POST);
          // exit;
          $sql = 'DELETE FROM categories WHERE id in ('.implode(',',$_POST['ids']).')';
          // echo $sql;
          // exit;
           $result = delete($sql);
           // 设置一个返回来的解析格式
           header('Content-type:application/json'); //告知前端jQuery如何来解析数据
           if($result){ // 如果删除成功的话
              $info = array('code'=>10000,'message'=>'删除成功!');
              
           }else {
              $info = array('code'=>10001,'message'=>'删除失败!');
              
           }
           echo json_encode($info);
           exit;
     }

  ~~~

  ​







