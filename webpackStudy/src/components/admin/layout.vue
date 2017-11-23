<!-- 1.0 组件的模板，需要注意有一个根元素 -->
<template>
    <el-row>
      <el-col :span='4'>
      <!--<img src="../../statics/imgs/logo.png" alt="">-->
      <div class="layout menu">
      <img src="../../statics/imgs/logo.png" alt="">
        <el-row id="nav">
          <el-col :span="24">
            <el-menu default-active="2" class="el-menu-vertical-demo">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>购物商城</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">项目1</template>
                  <el-menu-item index="1-1">内容管理</el-menu-item>
                  <el-menu-item index="1-1">分类管理</el-menu-item>
                  <el-menu-item index="1-2">评论管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span slot="title">订单管理</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">项目2</template>
                  <el-menu-item index="2-1">选项1</el-menu-item>
                  <el-menu-item index="2-2">选项2</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span slot="title">导航三</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">项目2</template>
                  <el-menu-item index="3-1">选项1</el-menu-item>
                  <el-menu-item index="3-2">选项2</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
        </div>
      </el-col>
      <el-col :span='20'>
        <el-row>
          <!-- 右顶部 -->
          <el-col :span='24'>
          <div class="topbg">
            <el-col :span='1'><i class="el-icon-menu"></i></el-col>
            <el-col :span='23'>
              欢迎登录！
              <el-dropdown class="right" split-button type="primary" @click="handleClick">
                更多菜单
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>修改密码</el-dropdown-item>
                  <el-dropdown-item>注销</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <!-- 右下部 -->
          <el-col :span='24'></el-col>
          <router-view></router-view>
        </el-row>
      </el-col>
    </el-row>
</template>

<!-- 2.0 定义组件中的相关对象(data,methods) -->
<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClick() {
        alert('button click');
      }
    }
  }
</script>

<!-- 3.0  -->
<style>
  .el-dropdown {
    vertical-align: top;
  }

  .el-dropdown+.el-dropdown {
    margin-left: 15px;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .right {
    /* float: right; */
  }
</style>