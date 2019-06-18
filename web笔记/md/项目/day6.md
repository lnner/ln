## ueditor富文本编辑器的使用

- 1.新建一个demo.html的页面,引入文件，然后调用, 观察样式

  ~~~html
  <!DOCTYPE html>
  <html lang="en">
  <head>
  	<meta charset="UTF-8">
  	<title>Document</title>
  	<script src='../assets/vendors/ueditor/ueditor.config.js'></script>
  	<script src='../assets/vendors/ueditor/ueditor.all.min.js'></script>
  </head>
  <body>
  	<textarea id="content" rows="30" cols="80"></textarea>
  </body>
  </html>
  <script type="text/javascript">
  	UE.getEditor('content',{
  		initialFrameHeight :500
  	});
  </script>
  ~~~

## 把ueditor应用到项目中

- 1.在assets/vendors下面加入ueditor文件

- 2.在post-add.php文件中引入文件

  ~~~javascript
  <script src='/assets/vendors/ueditor/ueditor.config.js'></script>
  <script src='/assets/vendors/ueditor/ueditor.all.min.js'></script>
  ~~~

- 3.在当前页面的最下面添加调用

  ~~~javascript
  <script>
    //添加富文本编辑器的调用
    UE.getEditor('content',{
      initialFrameHeight :300
    });

    $('#feature').on('change',function(){
      //所有的文件都是以二进制的形式进行传递
      var data = new FormData(); 
      data.append('feature',this.files[0]);

      //创建一个异步对象
      var xhr = new XMLHttpRequest();

      //发送请求
      xhr.open('post','/admin/post-add.php?action=upfile');

      // 发送数据
      xhr.send(data);

      //  发送成功之后，要接收返回来的数据
      xhr.onreadystatechange = function(){
        if(xhr.status == 200 &&xhr.readyState ==4){
          //  修改当前的头像信息
          $('.thumbnail').attr('src',xhr.responseText).show();

          //还应该把此图片的路径上传到服务器存到数据库里面
          //把后台传过来的图片路径存在一个隐藏域里面
          $('#thumb').val(xhr.responseText);
        }
      }
    })
  </script>	
  ~~~

- 4.使用了富文本编辑器后的数据添加，会有一点点瑕疵,问题在于sql语句,把sql语句修改一下即可,单双引号的问题,把functions.php中的插入函数修改一下:

  ~~~php
  //5. 封装了一个插入数据的函数
  		function insert($table,$arr){
  				$connect=	connect();

  			$keys = array_keys($arr); //获取数组中的属性
  		$values = array_values($arr); //获取数组中的属性值
   $sql = "insert into ".$table." (".implode(",",$keys).") values ('".implode("', '",$values)."')";
  			
  			// print_r($sql);
  			// exit;
  			$result =	mysqli_query($connect,$sql);
  			return  $result;
  		}
  ~~~

## 编辑功能的实现

### 1.修改posts.php页面样式及链接

- 1.将当前页面前的筛选框改成编号

  ~~~php
   <tbody>
          <?php foreach($lists as $key => $vals){ ?>
            <tr>
              <td class="text-center">
                <?php echo $vals['id']?>
              </td>
              <td><?php echo $vals['title']?></td>
              <td><?php echo $vals['nickname']?></td>
              <td><?php echo $vals['name']?></td>
              <td class="text-center"><?php echo $vals['created']?></td>
              <?php if($vals['status']=='published'){ ?>
              <td class="text-center">已发布</td>
              <?php }else {?>
              <td class="text-center">草稿</td>
              <?php }?>
              <td class="text-center">
                <a href="javascript:;" class="btn btn-default btn-xs">编辑</a>
                <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
              </td>
            </tr>
           <?php } ?>
          </tbody>
  ~~~

- 2.给编辑按钮设置链接

  ~~~php
  <td class="text-center">
       <a href="/admin/post-add.php?action=edit&pid=<?php echo $vals['id']?>" class="btn btn-default btn-xs">编辑</a>
       <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
  </td>
  ~~~

### 2.查询数据渲染页面

- 1.跳转到post-add.php的时候,根据action的值,进行业务书写

  ~~~php
   //如果是编辑的时候
     if($action =='edit'){
        //根据id获取数据，渲染在当前的页面上
        $rows = query('SELECT * FROM posts WHERE id = '.$pid);
        // print_r($rows);
        // exit;
        
       //修改时间的格式
        $rows[0]['created'] = str_replace(' ','T',$rows[0]['created']);
        // print_r($rows[0]['created']);
        // exit;
       
       
        $btnText = '更 新';
        $action = 'update';      

     } 
  ~~~

- 2.渲染页面信息

  ~~~php
  <form class="row" action='/admin/post-add.php?action=<?php echo $action ?>' method = 'post'>
        <input type='hidden' value='<?php echo isset($rows[0]['user_id'])?$rows[0]['user_id']: $_SESSION['user_info'][0]['id']?>' name='user_id'>
        <input type='hidden' value='<?php echo $pid?>' name='pid'>
          <div class="col-md-9">
            <div class="form-group">
              <label for="title">标题</label>
              <input id="title" value='<?php echo isset($rows[0]['title'])?$rows[0]['title']:""?>' class="form-control input-lg" name="title" type="text" placeholder="文章标题">
            </div>
            <div class="form-group">
              <label for="content">内容</label>
              <textarea id="content"    name="content" cols="30" rows="10" placeholder="内容"><?php echo isset($rows[0]['content'])?$rows[0]['content']:""?></textarea>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label for="slug">别名</label>
              <input id="slug" value='<?php echo isset($rows[0]['slug'])?$rows[0]['slug']:""?>' class="form-control" name="slug" type="text" placeholder="slug">
              <p class="help-block">https://zce.me/post/<strong>slug</strong></p>
            </div>
            <div class="form-group">
              <label for="feature">特色图像</label>
              <!-- show when image chose -->
              <?php if(empty($rows[0]['feature'])){?>
              <img class="help-block thumbnail" style="display: none">
              <?php }else {?>
              <img class="help-block thumbnail" src='<?php echo $rows[0]['feature']?>' >
              <?php } ?>
              <input id="feature" class="form-control"  type="file">
              <input type='hidden' name= 'feature' value='<?php echo isset($rows[0]['feature'])?$rows[0]['feature']:''?>' id = 'thumb'>
            </div>
            <div class="form-group">
              <label for="category">所属分类</label>
              <select id="category" class="form-control" name="category_id">
              
              <?php foreach($lists as $key => $vals){ ?>
                 
                  <option <?php if(!empty($rows)&&$rows[0]['category_id']==$vals['id']) { ?> selected <?php }?> value="<?php echo $vals['id']?>"><?php echo $vals['name']?></option>
                
              
              <?php } ?>
              </select>

            </div>
            <div class="form-group">
              <label for="created">发布时间</label>
              <input id="created" class="form-control" name="created" value='<?php echo isset($rows[0]['created'])?$rows[0]['created']:""?>' type="datetime-local">
            </div>
            <div class="form-group">
              <label for="status">状态</label>
              <select id="status" class="form-control" name="status">

               <?php if(!empty($rows)){ ?> 
                  <?php if($rows[0]['status']=='drafted'){?>
                  <option value="drafted" selected>草稿</option>
                  <option value="published" >已发布</option>
                  <?php }else {?>
                  <option value="published" selected>已发布</option>
                  <option value="published" >草稿</option>
                  <?php } ?>
               <?php }else{ ?> 
                  <option value="drafted" selected>草稿</option>
                  <option value="published" selected>已发布</option>
               <?php }?> 
              </select>
            </div>
            <div class="form-group">
              <button class="btn btn-primary" type="submit"><?php echo $btnText ?></button>
            </div>
          </div>
        </form>
  ~~~

- 3.注意上面，是要有一行代码获取到$pid的

  ~~~php
   $lists =  query('SELECT * FROM categories');
     // print_r($lists);
     // exit;
     $btnText = '添 加';
     $action = isset($_GET['action']) ? $_GET['action'] :'add';

     $pid = isset($_GET['pid'])?$_GET['pid']:0;
  ~~~

### 3.更新数据

- 因为是post的提交方式,因此单击更新按钮的时候，代码如下

  ~~~php
  // 接收post过来的数据
     if(!empty($_POST)){
        if($action =='add'){
            $result =  insert('posts',$_POST);
          // var_dump($result);
          // exit;
          if($result){
            header('location:/admin/posts.php'); //跳转到所有的文件的列表页
            exit;
          }
        }
        

        if($action=='update'){
          // print_r($_POST);
          //    exit;
          $id = $_POST['pid'];
          unset($_POST['pid']);
          // unset($_POST['id']);
          $result = update('posts', $_POST,$id);
          // print_r($result);
          // exit;
          if($result){
            //如果成功的话
            header('location:/admin/posts.php');
            exit;
          }
        }
     }
  ~~~


  ​	

- 这个时候的更新如果有问题的话，请检查一下sql语句的格式，也是单双引号的问题

  ~~~php
  //7. 封装一个更新数据的函数 
  		function update($table,$arr,$id){
  			// UPDATE FROM 表名  SET  字段=值,字段=值...WHERE id = 
  				$connection = connect();
  				$str = "''";
            foreach($arr as $key => $val){
               // $str .= $key . '=' . '"'.$val .'", ';
               $str .= $key . "=" . "'".$val ."', ";
            }

            $str = substr($str,0,-2); //截取字符串，将最后的,和空格去掉
          // 拼写真正的sql语句
           // $sql = 'UPDATE '.$table.' SET ' .$str .' WHERE id = ' . $id;
           $sql = "UPDATE ".$table." SET " .$str ." WHERE id =" . $id;
           // echo $sql;
           // exit;
  			 $result =	mysqli_query($connection,$sql);

  			 return  $result;
  		}
  ~~~



## 仪表盘的实现

### 1.前期准备工作

- 1.修改侧边栏的链接,找到inc文件夹下的aside.php

  ~~~php
  <li class="active">
          <a href="/admin"><i class="fa fa-dashboard"></i>仪表盘</a>
  </li>
  ~~~

### 2.查询数据，渲染页面

- 查询数据库，获取数据

  ~~~php
  <?php
      require '../functions.php';

      checkLogin();

      //查询数据库中文章数量，渲染页面数据
      $rows = query('SELECT COUNT(*) AS total FROM posts');
      // print_r($rows);
      // exit;

      //查询草稿数量
      $Dtotal = query('SELECT COUNT(*) AS Dtotal FROM posts WHERE status = "drafted"');
      // print_r($Dtotal);
      // exit;
  ?>
  ~~~

- 渲染页面

  ~~~php
  <div class="panel panel-default   ">
         <div class="panel-heading">
                <h3 class="panel-title">站点内容统计：</h3>
         </div>
         <ul class="list-group">
               <li class="list-group-item"><strong><?php echo $rows[0]['total']?></strong>篇文章（<strong><?php echo $Dtotal[0]['Dtotal']?></strong>篇草稿）</li>
               <li class="list-group-item"><strong>6</strong>个分类</li>
               <li class="list-group-item"><strong>5</strong>条评论（<strong>1</strong>条待审核）</li>
        </ul>
  </div>
  ~~~

## 导航菜单实现

### 1.前期准备工作

- 将admin文件夹下的nav-menu.html页面的后缀修改为nav-menu.php,并修改页面公共样式

  ~~~php
  <?php include './inc/style.php'?>
  <?php include './inc/script.php'?>
  <?php include './inc/nav.php'?>
  <?php include './inc/aside.php'?>
  ~~~

- 此时头像和用户名会有报错，因为需要开启session

  ~~~php
  <?php 
    
    require '../functions.php';
    checkLogin();//检测是否登陆
  ?>
  ~~~

- 到inc文件夹下找到aside.php中修改链接指向

  ~~~php
  <ul id="menu-settings" class="collapse">
            <li><a href="/admin/nav-menus.php">导航菜单</a></li>
            <li><a href="slides.html">图片轮播</a></li>
            <li><a href="settings.html">网站设置</a></li>
  </ul>
  ~~~

### 2.查询数据库，渲染当前页面

- 查询数据库

  ~~~php
  <?php 
    
    require '../functions.php';
    checkLogin();//检测是否登陆
    $sql = 'SELECT `value` FROM options WHERE `key` =  "nav_menus"';
    $lists = query($sql); //是一个二维的关联数据
    // print_r($lists);
    // exit;

    $json = $lists[0]['value']; //导航是以json形式的字符串数组存在的，需要转换成对象或是数组
    // var_dump($json);
    // exit;
    $data = json_decode($json,true); //加第二个参数就可以转换成数组
    // var_dump($data);
    // print_r($data);
    // exit;
  ?>
  ~~~

- 渲染页面

  ~~~php
  <tbody>
        <?php foreach($data as $key => $vals) {?>
             <tr>
                <td class="text-center"><input type="checkbox"></td>
                  <td><i class="<?php echo $vals['icon']?>"></i><?php echo $vals['text']?></td>
                  <td><?php echo $vals['title']?></td>
                  <td><?php echo $vals['link']?></td>
                  <td class="text-center">
                    <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
                </td>
             </tr>
        <?php }?>
  </tbody>
  ~~~

### 3.删除某条数据

- 1.修改删除按钮的链接 

  ~~~php
  <tbody>
              <?php foreach($data as $key => $vals) {?>
                <tr>
                  <td class="text-center"><input type="checkbox"></td>
                  <td><i class="<?php echo $vals['icon']?>"></i><?php echo $vals['text']?></td>
                  <td><?php echo $vals['title']?></td>
                  <td><?php echo $vals['link']?></td>
                  <td class="text-center">
                    <a href="/admin/nav-menus.php?action=delete&index=<?php echo $key?>?" class="btn btn-danger btn-xs">删除</a>
                  </td>
                </tr>
              <?php }?>
              </tbody>
  ~~~

- 2.接收发送过来的数据,删除数据

  ~~~php
  <?php 
    
    require '../functions.php';
    checkLogin();//检测是否登陆
    $sql = 'SELECT `value` FROM options WHERE `key` =  "nav_menus"';
    $lists = query($sql); //是一个二维的关联数据
    // print_r($lists);
    // exit;

    $json = $lists[0]['value']; //导航是以json形式的字符串数组存在的，需要转换成对象或是数组
    // var_dump($json);
    // exit;
    $data = json_decode($json,true); //加第二个参数就可以转换成数组
    // var_dump($data);
    // print_r($data);
    // exit;

    $action = isset($_GET['action'])?$_GET['action']:'add';

    if($action == 'delete'){
      // 获取传递过来的索引值
      $index = $_GET['index'];

      //从数组中删除某个单元
      unset($data[$index]); //删除了之后，下面的代码会继续执行，也是相当于重新加载页面了，所以不需要进行跳转
    }
  ?>
  ~~~

- 3.以上仅仅是删除了查询出来的数组中的数据，数据库中还没有真正的删除掉，因此,还需要更新数据库

  ~~~php
  urldecode();

  <?php 
    header('Content-type:text/html;charset=utf-8');
    require '../functions.php';
    checkLogin();//检测是否登陆
    $sql = 'SELECT `value` FROM options WHERE `key` =  "nav_menus"';
    $lists = query($sql); //是一个二维的关联数据
    // print_r($lists);
    // exit;

    $json = $lists[0]['value']; //导航是以json形式的字符串数组存在的，需要转换成对象或是数组
    // var_dump($json);
    // exit;
    $data = json_decode($json,true); //加第二个参数就可以转换成数组
    // var_dump($data);
    // print_r($data);
    // exit;

    $action = isset($_GET['action'])?$_GET['action']:'add';

    if($action == 'delete'){
      // 获取传递过来的索引值
      $index = $_GET['index'];

      //从数组中删除某个单元
      unset($data[$index]); //删除了之后，下面的代码会继续执行，也是相当于重新加载页面了，所以不需要进行跳转
      //以上只是删除了上面的数组中的数据，还得需要更新数据库

      
      // 将数组转换成json进行重新存储，并且要让里面的汉字不被编译
      //将二维数据变成一个json字符串，而不转义汉字的方法
        function json_encode_no_zh($arr) {
          $str = str_replace ( "\\/", "/", json_encode ( $arr ) );
          $search = "#\\\u([0-9a-f]+)#ie";
         
          if (strpos ( strtoupper(PHP_OS), 'WIN' ) === false) {
            $replace = "iconv('UCS-2BE', 'UTF-8', pack('H4', '\\1'))";//LINUX
          } else {
            $replace = "iconv('UCS-2', 'UTF-8', pack('H4', '\\1'))";//WINDOWS
          }
         
          return preg_replace ( $search, $replace, $str );
        }
        // print_r(json_encode_no_zh($data)) ;
        // 转换成json格式字符串
        $json = json_encode_no_zh($data);

        //执行更新操作
        $result = update('options',array('value'=>$json),9);
        if($result){
          header('location:/admin/nav-menus.php');
          exit;
        }
    }
  ?>
  ~~~

- 4.高版本的apache服务器(5.4+),使用此方法，进行转化

  ~~~php
  <?php 
    header('Content-type:text/html;charset=utf-8');
    require '../functions.php';
    checkLogin();//检测是否登陆
    $sql = 'SELECT `value` FROM options WHERE `key` =  "nav_menus"';
    $lists = query($sql); //是一个二维的关联数据
    // print_r($lists);
    // exit;

    $json = $lists[0]['value']; //导航是以json形式的字符串数组存在的，需要转换成对象或是数组
    // var_dump($json);
    // exit;
    $data = json_decode($json,true); //加第二个参数就可以转换成数组
    // var_dump($data);
    // print_r($data);
    // exit;

    $action = isset($_GET['action'])?$_GET['action']:'add';

    if($action == 'delete'){
      // 获取传递过来的索引值
      $index = $_GET['index'];

      //从数组中删除某个单元
      unset($data[$index]); //删除了之后，下面的代码会继续执行，也是相当于重新加载页面了，所以不需要进行跳转
      //以上只是删除了上面的数组中的数据，还得需要更新数据库

      
      // 将$data数组中的单元取出重新生成一个数组
      // （这里是为了解决 PHP 数组转 json 时格式问题）
      // 需要 [{},{}] 格式，而非 {"0": {}, "1": {}}
      $data = array_values($data);

      // 将PHP数组再次转成 json 进行重新存储
      // JSON_UNESCAPED_UNICODE 设置汉字不被编码
      $json = json_encode($data, JSON_UNESCAPED_UNICODE);

      // 执行更新操作
      $result = update('options', array('value'=>$json), 9);

      if($result) {
        header('Location: /admin/menus.php');
        exit;
      }
    }
  ?>
  ~~~

- 5.查看当前服务器中apache服务器的版本

  ~~~
  echo PHP_VERSION;
  ~~~

  ​



