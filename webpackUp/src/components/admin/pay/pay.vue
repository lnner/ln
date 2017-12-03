<template>
  <div class="tmpl">
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="javascript:;">支付中心</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit pay">
            <a href="javascript:;" class="selected">支付中心</a>
          </div>
          <div class="form-box payment">
            <div class="el-row">
              <div class="el-col el-col-16">
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>订 单 号：</dt>
                      <dd>{{orderinfo.order_no}}</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>收货人姓名：</dt>
                      <dd>{{orderinfo.accept_name}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>送货地址：</dt>
                      <dd>{{orderinfo.area}}
                      </dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>手机号码：</dt>
                      <dd>{{orderinfo.mobile}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付金额：</dt>
                      <dd>{{orderinfo.order_amount}} 元</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付方式：</dt>
                      <dd>在线支付</dd>
                    </dl>
                  </div>
                </div>
                <div class="message">
                  <span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                  <span>sdf</span>
                </div>
              </div>
              <div class="el-col el-col-8">
                <!--文字logo-->
                <div id="container">
                  <canvas width="400" height="400"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  </div>
</template>
<script>
  import '../../../../statics/jqplugins/jqueryqr.js'
  export default {
    data() {
      return {
        intervalObj: null,
        orderinfo: {},
        orderid: this.$route.params.orderid
      }
    },
    mounted() {
      $("#container").erweima({
        label: '黑马支付',
        text: 'http://103.44.145.245:30727/index.html#/payamout/21'  //改成支付的页面
      });
      this.getorderiinfor();
      this.intervalObj=setInterval(()=>{
        this.$ajax.get('/site/validate/order/getorderdetial/'+this.$route.params.orderid)
        .then(res=>{
          if(res.data.message.orderinfo.status==2){
            if(this.intervalObj){
              clearInterval(this.intervalObj);
            }
            this.$router.push({name:'pcpaysuccess'})
          }
        })
      },3000);
    },
    beforeDestroy(){
      clearInterval(this.intervalObj)
    },
    methods:{
      getorderiinfor(){
        var url = '/site/validate/order/getorder/' + this.orderid;
        this.$ajax.get(url).then(res=>{
          this.orderinfo=res.data.message[0]
        })
      }
    }
  }
</script>