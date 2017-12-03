<template>
  <div class="ln">
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/login.html">会员登录</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit">
            <a class="selected" href="javascript:;">账户登录</a>
            <i>|</i>
            <a href="/register.html">免费注册</a>
          </div>
          <el-form :model="form" status-icon :rules="rules" ref="form">
            <form id="loginform" name="loginform" class="login-box">
              <div class="input-box">
                <el-form-item label="账号" prop="user_name">
                  <el-input type="text" v-model="form.user_name" placeholder='用户名' auto-complete="off"></el-input>
                </el-form-item>
              </div>
              <div class="input-box">
                <el-form-item label="密码" prop="password">
                  <el-input type="password" v-model="form.password" placeholder='密码' auto-complete="off"></el-input>
                </el-form-item>
              </div>
              <div class="btn-box">
                <el-form-item>
                  <el-button type="primary" @click="submitValidate">提交</el-button>
                  <el-button @click="resetForm">重置</el-button>
                </el-form-item>
              </div>
              <!--记住上一页网址-->
            </form>
          </el-form>
        </div>
      </div>
    </div>
  </div>


</template>
<script>
  import { bus } from '../bus/bus.js'
  export default {
    data() {
      return {
        form: {
          "user_name": "ivanyb",
          "password": "123"
        },
        rules: {
          user_name: [
            { required: true, message: '请输入用户名', tigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', tigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitValidate() {
        this.$refs.form.validate(valid => {
          if (valid) {
            var url = '/site/account/login';
            this.$ajax.post(url, this.form).then(res => {
              if (res.data.status == 1) {
                this.$message.error(res.data.message);
                return;
              }
              var path = localStorage.getItem('currentPath');
              this.$router.push({ path:path });
              localStorage.setItem('logined', 'true');
              bus.$emit('changelogin', true);
            })
          } else {
            this.$message.error('表单验证失败')
          }
        })
      },
      resetForm() {
        this.$refs.form.resetFields();
      }
    }
  }
</script>
<style coped>
</style>