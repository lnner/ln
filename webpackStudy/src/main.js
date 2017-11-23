
import Vue from 'vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import elementUI from 'element-ui';
import './statics/theme_rms/index.css';
import './statics/css/globalSite.css'
Vue.use(elementUI);

import axios from 'axios';

// 2.0 导入app.vue组件对象
import App from './App.vue';   //当前目录下面查找app.vue这个组件
import layout from './components/admin/layout.vue';
import shiyan from './shiyan.vue';

axios.defaults.baseURL = 'http://127.0.0.1:8899';
Vue.prototype.$ajax = axios;

var router=new VueRouter({
    routes:[
        {name:'lay',path:'/',redirect:'/layout'},
        {name:'layout',path:'/layout',component:layout,children:[
            {name:'shiyan',path:'shiyan',component:shiyan}
        ]},
        // {name:'shiyan',path:'/shiyan',compenont:shiyan},
    ]
})
// 3.0 实例化vue对象
new Vue({
    el:'#ln',
    router,
    // render:function(create){create(App)}
    // 将app组件编译将这个组件中的内容填充到 el:指向的app这个div中
    render:create=>create(App)
});