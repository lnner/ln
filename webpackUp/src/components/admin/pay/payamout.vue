<template>
    <div class="tmpl">
        {{orderid}}
        <input type="text" v-model="amount">
        <el-button type="success" size="small" @click="pay">支付</el-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                orderid:this.$route.params.orderid,
                amount:0
            }
        },
        mounted(){
            this.getorderInfo();
        },
        methods: {
            // 根据订单id获取订单金额
            getorderInfo(){
                this.$ajax.get('/site/validate/order/getorderdetial/'+this.orderid)
                .then(res=>{
                    this.amount = res.data.message.orderinfo.order_amount;
                });
            },
            // 支付
            pay(){
                // 获取到url:  /site/validate/order/pay/:orderid 
                var url = '/site/validate/order/pay/'+this.orderid;
                this.$ajax.get(url).then(res=>{
                    if(res.data.status == 1){
                        this.$message.error(res.data.message);
                        return;
                    }

                    // 支付成功跳转到成功页面提示用户(在手机浏览器中信息展示)
                    this.$router.push({name:'pcpaysuccess'});
                });
            }
        }
    }
</script>
<style scoped>
</style>