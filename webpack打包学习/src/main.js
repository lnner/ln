
import Vue from 'vue';
import css from './statics/css/site.css';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import elementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
Vue.use(elementUI);

// 2.0 导入app.vue组件对象
import App from './App.vue';   //当前目录下面查找app.vue这个组件
import layout from './components/admin/layout.vue';
import shiyan from './shiyan.vue';

var router=new VueRouter({
    routes:[
        {name:'lay',path:'/',redirect:'/layout'},
        {name:'layout',path:'/layout',component:layout},
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