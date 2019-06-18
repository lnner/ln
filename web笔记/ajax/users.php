<?php  
header('content-type:text/html;charset=utf-8');
  require "./fengzhuang.php";
  ses();
  $action = isset($_GET['action'])? $_GET['action']:'add';
  $ms="";
  $title = '添加新用户';
  $btnText = '添加';
$table='users';
  if(!empty($_POST)){
    if($action=="add"){
      $email=$_POST['email'];
      $slug=$_POST['slug'];
      $password=$_POST['password'];
      $nickname=$_POST['nickname'];
      $status="unactivated";
      $sql='insert into '.$table.' (email,slug,password,status,id,nickname) values ("'.$email.'","'.$slug.'","'.$password.'","'.$status.'",null,"'.$nickname.'")';
      $result=add($sql);
      // $_POST['status'] = "unactivated";
      // $result=insert($_POST);
      if($result){
        header('location:/admin/users.php');
      }
      else{
        $ms="数据错误";
      }
      // exit;
    }
    if($action=="update"){
        $id = $_POST['id'];
        unset($_POST['id']); //因为id为主键是不能随便被更改的，虽然已把name='id'显示设为隐藏但还不够保险，删除这个提交过来的id，这样能强制防止id的改变，
        $result =  update($table,$_POST,$id);
        if($result){
          header('location:/admin/users.php');
          exit;
         }
    }
    if($action=="deleteAll"){
      // $sql='DELETE FROM '.$table.' WHERE id in('.implode(',',$_POST['iss']).')';
      // $result=delete($sql);
      print_r($_POST['iss']);
          exit;
      $result=del($table,$_POST['iss']);
      header('Content-Type:application/json');
      if($result){
        $info=array('code'=>100,'message'=>'删除成功');
      }else{
        $info=array('code'=>101,'message'=>'删除失败');
      }
      echo json_encode($info);
      exit;
    }
  }
  $yonghu="SELECT * FROM ".$table;
  $lists=query($yonghu);
  $user_id = isset($_GET['user_id'])?$_GET['user_id']:'';
        if($action == 'edit'){
          $action='update';
          $title = '编辑此用户';
          $btnText = '更新';
          $rows=query('SELECT * FROM '.$table.' WHERE id='.$user_id);
        }else if($action == 'delete'){ 
              $result=delete($table,$user_id);
              // $result=del($table,$user_id);
              if($result){
                header("location:/admin/users.php");
                exit;
              }
        }
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>Users &laquo; Admin</title>
  <link rel="stylesheet" href="../assets/vendors/bootstrap/css/bootstrap.css">
  <link rel="stylesheet" href="../assets/vendors/font-awesome/css/font-awesome.css">
  <link rel="stylesheet" href="../assets/vendors/nprogress/nprogress.css">
  <link rel="stylesheet" href="../assets/css/admin.css">
  <script src="../assets/vendors/nprogress/nprogress.js"></script>
</head>
<body>
  <script>NProgress.start()</script>

  <div class="main">
    <nav class="navbar">
      <button class="btn btn-default navbar-btn fa fa-bars"></button>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="profile.php"><i class="fa fa-user"></i>个人中心</a></li>
        <li><a href="login1.php"><i class="fa fa-sign-out"></i>退出</a></li>
      </ul>
    </nav>
    <div class="container-fluid">
      <div class="page-title">
        <h1>用户</h1>
      </div>
      <!-- 有错误信息时展示 -->
      <?php  if(!empty($ms)){?>
      <div class="alert alert-danger">
        <strong>错误！<?php echo $ms?></strong>
      </div>
      <?php }?>
      <div class="row">
        <div class="col-md-4">
          <form method="POST" action="/admin/users.php?action=<?php echo $action ?>">
            <h2><?php echo $title ?></h2>
            <div class="form-group">
              <label for="email">邮箱</label>
              <!-- id -->
              <?php if($action !='add'){?>
              <input type="hidden" name="id" value="<?php echo isset($rows[0]['id'])?$rows[0]['id']:''?>">
              <?php }?>
              <input id="email" class="form-control" value="<?php echo isset($rows[0]['email'])?$rows[0]['email']:''?>" name="email" type="email" placeholder="邮箱">
            </div>
            <div class="form-group">
              <label for="slug">别名</label>
              <input id="slug" class="form-control" name="slug" type="text" value="<?php echo isset($rows[0]['slug'])?$rows[0]['slug']:''?>"placeholder="slug">
              <p class="help-block">https://zce.me/author/<strong>slug</strong></p>
            </div>
            <div class="form-group">
              <label for="nickname">昵称</label>
              <input id="nickname" value="<?php echo isset($rows[0]['nickname'])?$rows[0]['nickname']:''?>" class="form-control" name="nickname" type="text" placeholder="昵称">
            </div>
            <div class="form-group">
              <label for="password">密码</label>
              <input id="password" class="form-control" value="<?php echo isset($rows[0]['password'])?$rows[0]['password']:''?>" name="password" type="text" placeholder="密码">
            </div>
            <div class="form-group">
              <button class="btn btn-primary" type="submit"><?php echo $btnText ?></button>
            </div>
          </form>
        </div>
        <div class="col-md-8">
          <div class="page-action">
            <!-- show when multiple checked -->
            <a class="btn btn-danger btn-sm deleteAll" href="javascript:;" style="display: none;position:absolute;top:-20px;">批量删除</a>
          </div>
          <table class="table table-striped table-bordered table-hover">
            <thead>
               <tr>
                <th class="text-center" width="40">
                    <input type="checkbox" class="checkAll">
                </th>
                <th class="text-center" width="80">头像</th>
                <th>邮箱</th>
                <th>别名</th>
                <th>昵称</th>
                <th>状态</th>
                <th class="text-center" width="100">操作</th>
              </tr>
            </thead>
            <tbody>
              <?php  foreach ($lists as $key => $value) {?>
              <tr>
                <td class="text-center"><input type="checkbox" class="ck" value="<?php echo $value['id']?>"></td>
                <td class="text-center"><img class="avatar" src="../assets/img/default.png"></td>
                <td><?php echo $value['email']?></td>
                <td><?php echo $value['slug']?></td>
                <td><?php echo $value['nickname']?></td>
                <?php if($value['status']=='activated'){?>
                <td>激活</td>
                <?php } else if($value['status']=='unactivated'){ ?>
                <td>未激活</td>
                <?php } else if($value['status']=='forbidden'){?>
                <td>已禁用</td>
                <?php } else{ ?>
                <td>已删除</td>
                <?php } ?>
                <td class="text-center">
                <a href="users.php?action=edit&user_id=<?php echo $value['id']?>" class="btn btn-default btn-xs">编辑</a>
                  <a href="users.php?action=delete&user_id=<?php echo $value['id']?>" class="btn btn-danger btn-xs">删除</a>
                </td>
              </tr>
              <?php  }?>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <?php include 'public/aside.php' ?>
  <script src="../assets/vendors/jquery/jquery.js"></script>
  <script src="../assets/vendors/bootstrap/js/bootstrap.js"></script>
  <script>NProgress.done()</script>
</body>
<script>
      $(".checkAll").on('click',function(){
        if(this.checked){
          $(".ck").prop("checked",true);
          $(".deleteAll").show(600);
        }else{
          $(".ck").prop("checked",false);
          $(".deleteAll").hide(600);
        }
      })
      $(".ck").on("click",function(){
          if($(".ck").length===$(".ck:checked").length){
            $(".checkAll").prop("checked",true);
          }else{
            $(".checkAll").prop("checked",false);
          }
          if($(".ck:checked").length>0){
            $(".deleteAll").show(600);
          }else{
            $(".deleteAll").hide(600);
          }
      })
      $(".deleteAll").on('click',function(){
        var ids=[];
        $(".ck:checked").each(function() {
          ids.push($(this).val());
        });
        $.ajax({                                        
          url:'/admin/users.php?action=deleteAll',      
          type:'POST',
          dataType:'json',
          //var xhr = new XMLHttpRequest();   //第一步1
          //xhr.open('post','/admin/users.php?action=deleteAll');  //3
          data:{iss:ids},       //"x=".x."&y=".y              {W3c草案提供了三种方案对form表单元素来获取或修改FormData。//这个方法只支持到IE10，IE10以下不支持new FormData();}          
          // 一、
          //var data = new FormData(); //FormData能上传文件
          //data.append('iss',ids)//文件和其他对象一同传输
          //xhr.send(data)     //4                     
          // 二、                
          // var formobj = document.getElementById("form");
          // var formdata = new FormData(formobj);
          // 三、
          // var formobj = document.getElementById("form");
          // var formdata = formobj.getFormData();

          //传统的方法是：xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
          // 　　var form=document.getElementById(id);
          // 　　xhr.send(serialize(form));
          success:function(info){
            alert(info.message);
            if(info.code==100){
              location.reload(true);
            }
          }
          //xhr.onreadystatechange = function(info){   //2  readystatechange--页面加载状态改变时的事件
          //  if(xhr.readyState == 4 && xhr.status == 200){  //5   readyState---返回当前文档的状态--5种{uninitialized(为初始化)：对象正在加载数据；loading(正在加载)：对象正在加载数据；loaded(加载完毕)：对象加载数据我能撑；interactive(交互)：可以操作对象了，但还没有完全加载；complete(完成)：对象已经加载完毕}，并非所有对象都会经过readyState的这几个阶段
          //     if(info.code==100){
          //     location.reload(true);
          //       }
          //    }
          // }
        })
      })
</script>
</html>
