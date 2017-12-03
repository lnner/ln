<template>
  <div class="tmpl">
      <!-- 顶部导航设定 -->
      <div id="header" class="header">
          <div class="head-top">
              <div class="section">
                  <div class="left-box">
                      <span>vue2.0单页应用</span>
                      <a target="_blank" href="#"></a>
                      <a target="_blank" href="#"></a>
                  </div>
                  <div id="menu" class="right-box">
                        <router-link v-if="!islogin" to="/layout/login">登录</router-link>
                        <a v-if="!islogin" href="/register.html">注册</a>
                      <strong v-if="islogin">|</strong>
                        <router-link to="/layout/vipcenter" v-if="islogin">会员中心</router-link>
                        <a v-if="islogin" @click="logout" href="javascript:void(0)">退出</a>
                      <router-link to='/layout/buy'>
                      <i class="iconfont icon-cart"></i>
                            购物车 (<span id="layoutbuycar">{{this.$store.getters.getBuyCount||0}}</span>)
                      </router-link>
                  </div>
              </div>
          </div>
          <div class="head-nav">
              <div class="section">
                  <div id="menu2" class="nav-box menuhd">
                      <ul>
                          <li class="index">
                              <a href="/index.html">
                                  首页
                              </a>
                          </li>
                          <li class="news">
                              <a href="/news.html">
                                  学员问题汇总
                              </a>
                          </li>
                          <li class="photo">
                              <a href="/photo.html">
                                  重难点专区
                              </a>
                          </li>
                          <li class="video">
                              <a href="/video.html">
                                  前端常用功能
                              </a>
                          </li>
                          <li class="down">
                              <a href="/down.html">
                                  资源下载
                              </a>
                          </li>
                          <li>
                              <a target="_blank" href="/admin/index.aspx">
                                  问题提交
                              </a>
                          </li>
                      </ul>
                  </div>
                  <div class="search-box">
                      <div class="input-box">
                          <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){SiteSearch('/search.html', '#keywords');return false};"
                              placeholder="输入关健字" x-webkit-speech="">
                      </div>
                      <a href="javascript:;" onclick="SiteSearch('/search.html', '#keywords');">
                          <i class="iconfont icon-search"></i>
                      </a>
                  </div>
              </div>
          </div>
      </div>

      <!-- 中间内容占位 -->
      <router-view></router-view>
  </div>
</template>

<script>
import {bus,key} from './bus/bus.js';
  export default {
      data() {
          return {
              amount:0,
              islogin:false
          }
      },
      mounted() {
          // jquery的实现应该要能够找到dom对象     
           
          $("#menu2 li a").wrapInner('<span class="out"></span>');
          $("#menu2 li a").each(function () {
              $('<span class="over">' + $(this).text() + '</span>').appendTo(this);
          });

          $("#menu2 li a").hover(function () {
              $(".out", this).stop().animate({ 'top': '48px' }, 300); // move down - hide
              $(".over", this).stop().animate({ 'top': '0px' }, 300); // move down - show

          }, function () {
              $(".out", this).stop().animate({ 'top': '0px' }, 300); // move up - show
              $(".over", this).stop().animate({ 'top': '-48px' }, 300); // move up - hide
          });
          var countStr=localStorage.getItem('amount');
          this.amount=parseInt(countStr);
        //   console.log(this.amount)
        bus.$on(key,(buyAmount)=>{
              this.amount+=buyAmount;
              localStorage.setItem('amount',this.amount)
          });
          this.checkLogin();
          bus.$on('changelogin',(val)=>{
              this.checkLogin()
          })
      },
      methods: {
          logout(){
              this.$ajax.get('/site/account/logout').then(res=>{
                  if(res.data.status==0){
                      this.islogin=false;
                      localStorage.setItem('logined','false');
                      this.$router.push({name:'shiyan'})
                  }
              })
          },
          checkLogin(){
              var res=localStorage.getItem('logined');
              if(res=='true'){
                  this.islogin=true;
              }else{
                  this.islogin=false;
              }
          }
      }
  }
</script>
<style scoped>
  /* 导入样式 */
  @import url('../../../statics/jqplugins/jqhovernav/jqhoverNav.css');
</style>