
import Vue from 'vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import elementUI from 'element-ui';
import './statics/theme_rms/index.css';
import './statics/css/globalSite.css';
Vue.use(elementUI);

import axios from 'axios';

// 2.0 导入app.vue组件对象
import App from './App.vue';   //当前目录下面查找app.vue这个组件
import layout from './components/admin/layout.vue';
import shiyanList from './components/admin/goods/shiyanList.vue';
import shiyanAdd from './components/admin/goods/shiyanAdd.vue';
import shiyanEdit from './components/admin/goods/shiyanEdit.vue';
import login from './components/admin/login/login.vue';
import shiyan from './components/admin/shiyan.vue'

axios.defaults.baseURL = 'http://127.0.0.1:8899';
Vue.prototype.$ajax = axios;
axios.defaults.withCredentials = true;
var router=new VueRouter({
    routes:[
        {name:'lay',path:'/',redirect:'/layout'},
        {name:'login',path:'/login',component:login,meta:{nologin:true}},
        {name:'layout',path:'/layout',component:layout,children:[
            {name:'shiyanList',path:'shiyanList',component:shiyanList,meta:{currentMenu:'3-1'}},
            {name:'shiyanAdd',path:'shiyanAdd',component:shiyanAdd},
            {name:'shiyanEdit',path:'shiyanEdit/:id',component:shiyanEdit},
            {name:'shiyan',path:'shiyan',component:shiyan,meta:{currentMenu:'3-2'}},
        ]},
        // {name:'shiyan',path:'/shiyan',compenont:shiyan},
    ]
})

router.beforeEach((to,from,next)=>{
    if(to.meta.currentMenu){
        localStorage.setItem('currentMenu',to.meta.currentMenu)//把记录上次点击的菜单栏储存在本地里
    }
    if(to.meta.nologin){
        next();
        return
    }
    axios.get('/admin/account/islogin').then(res=>{
        if(res.data.code=='nologin'){
            router.push({name:'login'})
        }else{
            next()
        }
    })
})


// 3.0 实例化vue对象
new Vue({
    el:'#ln',
    router,
    // render:function(create){create(App)}
    // 将app组件编译将这个组件中的内容填充到 el:指向的app这个div中
    render:create=>create(App)
});