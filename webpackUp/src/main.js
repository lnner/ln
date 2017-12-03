
import Vue from 'vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);
import { Affix } from 'iview';
Vue.component('Affix', Affix);

import elementUI from 'element-ui';
import '../statics/elementuiCss/index.css';
import '../statics/site/css/style.css';
Vue.use(elementUI);

import vuex from 'vuex';
Vue.use(vuex);
import { setItem, getItem } from './components/admin/bus/localStorage.js';

var state={
    buyCount:0
}
//this.$store.state.buyCount
var mutations={
    changeCount(state,parmsbuyCount){
        // state.buyCount+=parmsbuyCount;
        var obj=getItem();
        var tcount=0;
        for (var key in obj){
            tcount+=obj[key];
        }
        state.buyCount=tcount;
    }
}

var actions={
    changeCount({commit},parmsbuyCount){
        commit('changeCount',parmsbuyCount)
    }
}

var getters={
    getBuyCount(state){
        if(state.buyCount>0){
            return state.buyCount;
        }else{
            var obj=getItem();
            var tcount=0;
            for(var key in obj){
                tcount+=obj[key];
            }
            state.buyCount=tcount;
            return tcount;
        }
    }
}


import axios from 'axios';

import App from './App.vue';
import layout from './components/admin/layout.vue';
import login from './components/admin/login/login.vue';

import shiyan from './components/admin/goods/shiyan.vue';
import lunboGoods from './components/admin/goods/lunboGoods.vue';

import buy from './components/admin/buy/buy.vue';
import shopping from './components/admin/buy/shopping.vue';
import sun from './components/admin/buy/sun.vue';

import pay from './components/admin/pay/pay.vue'
import payamout from './components/admin/pay/payamout.vue'
import pcpaysuccess from './components/admin/pay/pcpaysuccess.vue'

import checkorders from './components/admin/status/checkorders.vue'
import myorders from './components/admin/status/myorders.vue'
import vipcenter from './components/admin/status/vipcenter.vue'

axios.defaults.baseURL = 'http://127.0.0.1:8899';
Vue.prototype.$ajax = axios;
axios.defaults.withCredentials = true;
var router=new VueRouter({
    routes:[
        {name:'lay',path:'/',redirect:'/layout/shiyan'},
        {name:'payamout', path: '/payamout/:orderid', component: payamout },        
        {name:'pcpaysuccess',path:'/pcpaysuccess',component:pcpaysuccess},
        {name:'layout',path:'/layout',component:layout,children:[
            {name:'login',path:'login',component:login,meta:{isslogin:true}},            
            {name:'shiyan',path:'shiyan',component:shiyan},
            {name:'lunboGoods',path:'lunboGoods/:id',component:lunboGoods},
            {name:'buy',path:'buy',component:buy,meta:{checklogin:true}},
            {name:'shopping',path:'shopping/:ids',component:shopping,meta:{checklogin:true}},
            { name: 'pay', path: 'pay/:orderid', component: pay, meta: { checklogin: true }},            
            {name:'myorders',path:'myorders',component:myorders,meta:{checklogin:true}},
            {name:'checkorders',path:'checkorders/:order',component:checkorders,meta:{checklogin:true}},
            {name:'vipcenter',path:'vipcenter',component:vipcenter,meta:{checklogin:true}},
        ]},
    ]
})
router.beforeEach((to,from,next)=>{
    if(!to.meta.isslogin){
        localStorage.setItem('currentPath',to.path);
    }
    if(to.meta.checklogin){
        axios.get('/site/account/islogin').then(res=>{
            if(res.data.code=='logined'){
                next()
            }else{
                router.push({name:'login'})
            }
        })
    }else{
        next()
    }
})
Vue.filter('datefmt',(input,seconds)=>{
    var date = new Date(input);
    var y = date.getFullYear();
    var m = date.getMonth() +1 ;
    var d = date.getDate();
    var h=date.getHours();
    var mm=date.getMinutes();
    var ss=date.getSeconds();
    if(seconds=='YYYY-MM-DD HH:mm:ss'){
        return y + '-' + m + '-' + d+' '+h+':'+mm+':'+ss
    }else{
        return y + '-' + m + '-' + d;
    }
});

var store=new vuex.Store({state,mutations,actions,getters});

new Vue({
    el:'#ln',
    router,
    store,
    // render:function(create){create(App)}
    render:create=>create(App)
});