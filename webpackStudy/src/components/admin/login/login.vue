<template>
  <div class="ln">
    <li>
      <input type="text" v-model="user.uname">
    </li>
    <li>
      <input type="password" v-model='user.upwd'>
    </li>
    <li>
      <el-button @click='login'>登陆</el-button>
      <el-button>注册</el-button>
    </li>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        user: {
          uname: 'admin',
          upwd: '123456'
        }

      }
    },
    methods: {
      login() {
        var url = '/admin/account/login';
        this.$ajax.post(url,this.user).then(res=>{
          if(res.data.status==1){
            alert(res.data.message)
          }else{
            this.$router.push({name:'shiyanList'})
          }
        })
      }
    }
  }

</script>

<style scoped>
  .ln {
    margin: 100px auto;
    width: 300px;
    height: 300px;
    border: 1px solid grey;
    text-align: center
  }
</style>