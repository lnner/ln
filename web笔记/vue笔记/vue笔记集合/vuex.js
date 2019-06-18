import Vue from 'vue'
import vuex from 'vuex';
Vue.use(vuex);
const isDev = process.env.NODE_ENV === 'development' //开发环境为true
let state = {
  login: false,
  bodyClick: 0
}

let mutations = {
  mmm(state, obj) {

  },
}
let actions = {
  aaa({
    state,
    commit,
    rootState
  }, ft) {
    commit(
      'change',
      ft, {
        root: true //设置为true就只能获取到全局的，否则根据是否有设置namespaced判断获取的是全局还是局部（模块）里的
      }) //联系到mutation
  },
  // changeClick(state, ft) {
  //   
  // },
}
let getters = {
  ggg(state, getters, rootstate) {
    state, //state上的数据
    getters, //getters上的数据
    rootstate //注册到vuex上的数据
    return
  }
}

//引入该js时可以注册一个modules，然后动态加载,写法为
//引入该js的名字例如store
store.registerModule('modules名字', {
  state: {
    xx: 'xx'
  }
})

store.unregisterModule('modules名字')//解绑

store.watch((state)=>{state+1},(value)=>{})//监听值的变化，并返回一个函数

store.subscribe((mutation,state)=>{//监听mutation
  console.log(mutation.type);//所触发的是哪个mutation
  console.log(mutation.payload); //所触发的mutation的传入值
})
store.subscribeAction((action,state)=>{//监听action
  console.log(action.type);//所触发的是哪个action
  console.log(action.payload); //所触发的action的传入值
})

export default () => {
  const store = new vuex.Store({
    strict: isDev, //严格控制是否能直接对state状态进行赋值，true是不可以
    state,
    mutations,
    actions,
    getters,
    modules: {
      a: {
        namespaced: true, //state, mutations,actions,getters,把独立出来,不然就为全局的
        state: {
          text: 1
        },
        mutations: {}
      }
    }
  })
  if (module.hot) { //热更新的功能
    module.hot.accept([
      state,//路径
      mutations,
      actions,
      getters
    ], () => {
      const newState = require(state).default
      const newMutations = require(newMutations).default
      const newActions = require(newActions).default
      const newGetters = require(newGetters).default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        actions: newActions,
        getters: newGetters
      })
    })
  }
  return store
};