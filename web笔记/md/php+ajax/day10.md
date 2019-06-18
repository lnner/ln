# day10

## 文件上传

### 同步上传

+ 客户端通过表单，将附件发往服务器；
+ 表单的提交方法，必须是POST才能上传附件；
+ 表单的数据编码，必须是multipart/form-data；
+ 表单中必须有一个文件域：\<input type = ‘file’ name = ‘upload’>
+ 附件发往服务器，临时存储在c:/windows/temp目录中；
+ 临时文件在脚本执行完毕，就消失了；
+ 因此，在临时文件消失前，要移动到一个永久目录中(网站目录)：move_uploaded_file()
+  保存到服务器的文件名，不能包含中文、不能包含空格。

### 相关方法和属性：

+ enctype
  + 属性规定在发送到服务器之前应该如何对表单数据进行编码
  + 取值
    + application/x-www-form-urlencoded
      + 在发送前编码所有字符（默认）
    + multipart/form-data
      + 不对字符编码。在使用包含文件上传控件的表单时，必须使用该值


+ move_uploaded_file

  + 本函数检查并确保由 `filename`    指定的文件是合法的上传文件（即通过 PHP 的 HTTP POST    上传机制所上传的）。如果文件合法，则将其移动为由    `destination` 指定的文件。

  ```php
  bool move_uploaded_file ( string $filename , string $destination )
  ```

+ pathinfo()

  +  pathinfo() 返回一个关联数组包含有 *path*    的信息。返回关联数组还是字符串取决于 `options`。

  ```php
  mixed pathinfo ( string $path [, int $options = PATHINFO_DIRNAME | PATHINFO_BASENAME | PATHINFO_EXTENSION | PATHINFO_FILENAME ] )
  ```

### 异步上传

+ 文件上传与FormData

  ```php
      var file = document.getElementById("form").upload.files[0];
  	var fm = new FormData();
      fm.append('file', file);
      $.ajax(
          {
              url: 'submitform.php',
              type: 'POST',
              data: fm,
              contentType: false, //禁止设置请求类型
              processData: false, //禁止jquery对DAta数据的处理,默认会处理,禁止的原因是,FormData已经帮我们做了处理
              success: function (result) {
                  //测试是否成功
                  alert(result);
              }
          }
      );。
  ```

  ​

  ​

## 文件下载

+ 设置a标签跳转到要下载文件的页面，并且带上文件名

+ 文件名可以是真实的，也可以是虚拟的（最好是一个虚拟路径）

+ 在指定页面接收要下载的文件名参数

+ 通过：fopen()，fread()，fclose()方法将文件读取并响应

+ 重要：在下载文件的页面中加入以下设置

  ```php
  //设置返回数据的内容类型
  header("content-type:application/octet-stream");
  //给用户提供文件是保存还是打开的对话选择框
  header("content-disposition:attachment;filename=$filename");
  ```

  ​