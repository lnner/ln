<template>
  <div class="ln">
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/cart.html">购物车</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <!--购物车头部-->
          <div class="cart-head clearfix">
            <h2>
              <i class="iconfont icon-cart"></i>我的购物车</h2>
            <div class="cart-setp">
              <ul>
                <li class="first active">
                  <div class="progress">
                    <span>1</span>
                    放进购物车
                  </div>
                </li>
                <li>
                  <div class="progress">
                    <span>2</span>
                    填写订单信息
                  </div>
                </li>
                <li class="last">
                  <div class="progress">
                    <span>3</span>
                    支付/确认订单
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--购物车头部-->
          <!--商品列表-->
          {{value}}
          <div class="cart-box">
            <input id="jsondata" name="jsondata" type="hidden">
            <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
              <tbody>
                <tr>
                  <th width="48" align="center">
                    <el-button @click='selectAll'>{{text}}</el-button>
                  </th>
                  <th align="left" colspan="2">商品信息</th>
                  <th width="100" align="center">单价</th>
                  <th width="104" align="center">数量</th>
                  <th width="104" align="center">金额(元)</th>
                  <th width="54" align="center">操作</th>
                </tr>
                <tr v-if='!message'>
                  <td colspan="10">
                    <div class="msg-tips">
                      <div class="icon warning">
                        <i class="iconfont icon-tip"></i>
                      </div>
                      <div class="info">
                        <strong>购物车没有商品！</strong>
                        <p>您的购物车为空，
                          <a href="/index.html">马上去购物</a>吧！</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-for='(items,index) in message'>
                  <td><el-switch v-model="value[index]" on-text='已选' off-text="未选" active-color="#13ce66" inactive-color="#ff4949">
                    </el-switch></td>
                  <td colspan="2" align="left"><img :src="items.img_url" alt="" style='width:50px'>{{items.title}}</td>
                  <td width="100" align="center">{{items.sell_price}}</td>
                  <td width="104" align="center">
                    <!--<span class="reduce">-</span><span class="amount">{{items.buycount}}</span><span class="add">+</span>-->
                    <inputNumber v-bind:obj="{gid:items.id,count:items.buycount}" @msg="getinputnumber"></inputNumber>
                  </td>
                  <td width="104" align="center">{{items.buycount*items.sell_price}}</td>
                  <td width="54" align="center">
                    <el-button @click="delData(items.id)">删除</el-button>
                  </td>
                </tr>
                <tr>
                  <th align="right" colspan="8">
                    已选择商品
                    <b class="red" id="totalQuantity">{{selecteCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                    <span class="red">￥</span>
                    <b class="red" id="totalAmount">{{getAmount}}</b>元
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <!--/商品列表-->
          <!--购物车底部-->
          <div class="cart-foot clearfix">
            <div class="right-box">
              <button class="button">继续购物</button>
              <button class="submit" @click='shopping'>立即结算</button>
            </div>
          </div>
          <!--购物车底部-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { getItem ,setItemReplace,removeItem} from '../bus/localStorage.js';
  import inputNumber from './sun.vue';
  export default {
    components:{
      inputNumber
    },
    data() {
      return {
        selecteCount:0,
        text:'全选',
        isstrue:false,
        value:[],
        message: [],//value里的
      }
    },
    computed:{
      // selectAll(){
      //   this.isstrue=!this.isstrue;
      //   for(var i=0;i<this.value.length;i++){
      //     this.value[i]=this.isstrue
      //   }
      //   this.value.push(false);
      //   this.value.pop();
      // },
      getAmount(){
        var trueArr=this.value.filter(item=>item);
        console.log(trueArr)
        this.selecteCount=trueArr.length;
        var totalcount=0;
        this.value.forEach((item,index)=>{
          if(item){
            totalcount+=(this.message[index].buycount * this.message[index].sell_price)
          }
        })
        return totalcount
      }
    },
    watch:{
      // selectAll(){
      //   this.isstrue=!this.isstrue;
      //   for(var i=0;i<this.value.length;i++){
      //     this.value[i]=this.isstrue
      //   }
      //   this.value.push(false);
      //   this.value.pop();
      // }
  },
    methods: {
      shopping(){
        var goodsids=[];
        this.value.forEach((item,index)=>{
          if(item==true){
            goodsids.push(this.message[index].id)
          }
        });
        if(goodsids.length<=0){
          return this.$message.error('请至少选择一个商品')
        }
        this.$router.push({name:'shopping',params:{ids:goodsids.join(',')}})
      },
      delData(goodsid){
        var index=this.message.findIndex(item=>item.is==goodsid);
        this.message.splice(index,1);
        this.value.splice(index,1)
        remoteItem(goodsid);
        this.$store.dispatch('changeCount',{})
      },
      getinputnumber(obj){
        setItemReplace(obj);
        var index=this.message.findIndex(function(item){
          return item.id==obj.gid
        })
        this.message[index].buycount=obj.count;
      },
      selectAll(){
        this.isstrue=!this.isstrue;
        for(var i=0;i<this.value.length;i++){
          this.value[i]=this.isstrue
        }
        this.value.push(false);
        this.value.pop();
      },
      getList() {
        var idsObj = getItem();
        var idArr = [];
        var ids
        for (var key in idsObj) {
          idArr.push(key)
        }
        ids = idArr.join(',')
        var url = '/site/comment/getshopcargoods/' + ids;
        this.$ajax.get(url).then(res => {
          if (res.data.status == 0) {
            res.data.message.forEach((item,index)=>{
              item.buycount=idsObj[item.id];
              this.value[index]=false;
            })
            this.message = res.data.message;
          } else {
            this.$message.error('错误')
          }
        })
      }
    },
    mounted() {
      this.getList()
    }
  }
</script>
<style coped>
  .reduce,.add,.amount{
    width:30px;
    display:inline-block;
  }
</style>