import Vue from 'vue'
const vm=new Vue({
  el:'#root',
  beforeCreate() {
    
  },
  created () {
    
  },
  beforeMount () {
    
  },
  mounted () {
    
  },
  beforeUpdate () {
    
  },
  updated () {
    
  },
  beforeDestroy () {
    
  },
  destroyed() {
    
  },
  render(h){
    return h('div', {}, 'this is shiyan')
  },
  renderError(h,err){
    //当前组件报错会获取到信息
    return h('div',{},err.stack)
  },
  // errorCaptured: (err, vm, info) => {//??有待实验
  //   return h('div', {}, err.stack)
  // }
})

vm.$mount('#root')//---el:'#root'---挂载到html（行为）
vm.$el//----代表挂在到html上的真正节点
vm.$options//----new Vue({括号中里对象和默认的属性})---要数据更新后才生效
vm.$root //----===vm----new Vue()
vm.$children//-----组件（表）里的标签
vm.$slots//
vm.$scopedSlots//
vm.$refs//类似class
vm.$isServer//服务端渲染要用到

const unWatch=vm.$watch('xxx', (newValue,oldValue)=>{
  console.log(`${newValue}:${oldValue}`);
  //对于在new Vue()里，路由跳转是会自动注销该监听效果，全局的要手动才会注销
})
//手动注销
unWatch()

//watch:{
// xxx(newValue, oldValue){
//   console.log(`$(newValue):$(oldValue)`);
//路由跳转会自动注销该监听效果
//   }
// }


vm.$on('xxx',(x,y)=>{
  //事件监听
})
vm.$once()//效果同上，但只能作用一次

vm.$emit('xxx',1,2)
//$on和$emit  只能用于同时作用同一个组件上（不会冒泡），常用于组件的传值

vm.$forceUpdate()
//举个例子vue是响应式的，当没有进行声明就进行赋值，就是非响应的，即使有值且在不断变化，也不会渲染到页面，不会刷新dom节点
//而这个api会不断更新数据，所以会渲染出来，但不建议使用，不断刷新整个页面是很耗内存的

vm.$set(vm.$data.obj,'xx','yy')//可以解决上述例子   //vm--vue上的声明   'xx'---vm的属性名   'yy'---属性值

vm.$delete()//可以彻底删掉数据，不会有内存溢出

vm.$nextTick //vue渲染是异步的，在更新数据（dom节点）之后立即使用

vm.$parent //在子组件里使用可调用父组件的属性，有些需要通过vm.$parent.$options.xxx才能获取到值

computed//适用于同时监听多个对象，并把它们组合起来

watch//倾向于监听单个，执行单个语句，例如：发送请求；

watch:{
  firstName:{
    handler(){
      (newName,oldName){
        this.fullName=newName+" "+oldName
      }
    },//于平常写法不同，实际相等vue会默认转成这种加载方式
    immediate: false,//默认是false，当改为true时，能在初始加载时就立即执行，不用等改变才开始监听，即以初始值执行handle函数，但要注意的一点是初始是属于挂载前的所以获取不了节点
    deep:false,//默认时false，当改为true时，能深入监听到对象的属性（原本只能监听一级，即本身，现在深入监听，当监听对象的下级发生变化时，也会被监听到，但同时只要有某个属性改变了，就会导致性能开销大，解决方法直接只监听该对象的需要所监听的属性，这样就可以把deep改回去了，例如'firstName.a':{handler(){}}）
  }
}

//重要：千万别在computed和watch里修改修改所监听的对象值（computed原本就生成的变量不算），不然会陷入循环监听之中
//使用computed和watch的好处是减少内存的消耗，具有缓存作用，不改变时不触发，触发后会缓存（在template上渲染data数据时，data上数据改变都会导致重新渲染，使用了这个就不会）

//声明一个组件
const component={
  // props:{}//使用extend时子组件component的props不可用
}//这是一个组件

// extend第一种用法
const CompVue=Vue.extend(component);

new CompVue({
  el:'#root',
  propsData:{
    propOne:'xxx'
  } //propsData代替子component里的props
})//使用extend后新的实例声明会覆盖与合并所声明的component的data的属性,其他的不会覆盖

//结束

const parent=new Vue({
  name: 'parent' ,//顺便举个$parent的例子
})

// extend第二种用法
const component2={
  parent: parent, //顺便举个$parent的例子，这里不可更改子组件（component2）的父组件对象（#root）为（parent），只有new Vue才能指定父组件
  extends:component,
  data(){
    return {
    }
  },
  mounted () {
    //extend后name只能通过this.$parent.$option.name获取到extend的父组件的name数据
    // this.$parent 可直接改变上一级父组件的的数据（即使子组件通过parent:parent绑定到另一个父组件，this.$parent也还是原来的的父组件）   
    //不建议通过$parent更改父组件的值，会造成逻辑的混乱，要是忘了就很麻烦了，最好只用来获取值

  }
}//覆盖
new Vue({
  el:'#root',
  parent: parent, //顺便举个$parent的例子，这里可更改new Vue父组件

  components:{
    Comp:component2
  },
  data:{num:0},//没extand时不会覆盖子组件内容，正常使用
  template:`<comp/>`
})



'v-model与slot详解（插槽）' (附带provide与inject)
const component3={
  model:{
    prop:'value1', //改变组件的v-model的默认值的名
    event: 'change'//改变组件的v-model的默认事件的名
  }, 
  //祖组件上的 v-model 默认会使用名为 value (这个很重要)的 prop 和名为 input 的事件，但是像单选框、复选框等类型的输入控件可能会将 value 特性用于不同的目的。model 选项可以用来避免这样的冲突,即使时默认，要老实把props的值写上value，要是值没有字符串'value',又不使用model声明改变默认的值，那将取不到v-model在组件上所传过来的值
  props:['value1'],
  inject:['grandfather','data'],
  mounted(){
    console.log('grandfather:', this.grandfather);
  },
  template:`
    <div>
      <input type='text' @change = '$emit('change', $event.target.value)' :value='value1' >
      <slot name='text'></slot>//占位，为使代表子组件里的dom节点能传送过来，slot属性值为text的dom节点
      < slot :value = 'value'
      ss = '321' > < /slot>
      {
        {
          data.uname //随祖组件的input输入而改变
        }
      }
    </div>
  `,
  data(){
    return {
      value:'shiyanxxx'
    }
  },
  methods: {
  }
}
new Vue({
  components:{                         
    CompOne:component3
  },
  el:'#root',
  provide() {//provide（祖）和inject（后辈）构成跨级值传递
    const data={}
    Object.defineProperty(data, 'uname', { //每次使用了data.uname实际上是调用了下面的get方法
      //使用了这个能实时传递值但不建议使用，未来可能废弃掉该方法,而目前这个是比较好的跨级处理的方法
      get: () => this.uname,//这样做是为了目标组件（带有inject）实时获取的是最新值
      enumerable:true//使得可读取
    })
    return {
      grandfather:this,
      data, //传递实例到任意子组件上(包括孙子组件)
    }
  },
  data(){
    return {
      value:123,
      uname:'lnner'
    }
  },
  template:`
    <div>
      <comp-one v-model='value'>
        <span>这个会传到子组件的slot标签上</span>
        <span solt='text'>这个会传到子组件中的带有slot属性的与该slot值相同的name的标签上</span>

        <span solt-scope = 'shiyan' ref='asdf'> {
          {
            shiyan.value //shiyanxxx,来自component3组件data
          }
        } 

        {
          {
            shiyan.ss
          }
        } {{value //123来自自身data}}</span>// 既可以使用从子传递过来值，又可以使用从父组件传递过去的值 ----这就是作用域插槽作用--另一种父子组件的值传递
        //可以在父组件上通过设置子组件的ref获取子组件的属性并赋值，但不建议，会造成逻辑混乱
      </comp-one>


      //<comp-one v-model='value'></comp-one>等同 <comp-one :value='value' @input='value =arguments[0]' ></comp-one>

      < input type = "text" v-model = "uname" / >
      //其实等同于<input type="text" :value="uname" @input="uname=$event.target.value" />
    </div>
  `
})


render//----可更好的理解vue编译
 
const component4={
  name:'comp',
  props:['props1'],
  template:`
    <div :style='style'>
      <slot></slot>
    </div>
  `,
  render(createElement){
    return createElement('div',{
      style:this.style,
      on:{
        click:()=>{
          this.$emit('click')//子传父
        }
      }
    }, [
      // this.$slots.default,
        this.$slots.header,//无声明slot属性值就为default
      this.props1]) 
  },
  data(){
    return {
      style:{
        width:'200px',
        height:'200px',

      }
    }
  }
}

new Vue({
  components:{
    CompOne:component4
  },
  data(){
    return {
      value:123
    }
  },
  template:`
    <comp-one ref='comp'>
      <span ref='span' style='color:#999'>{{value}}{{props1}}</span>
      <slot></slot>
    </comp-one>
  `,
  render(createElement) { //this.$createElement   --template最终都会编译为render
    return createElement('comp-one',{//与上面的template等同渲染
      ref:'comp',//这个ref既可以是标记组件也可以是标记dom节点 
      props:{
        props1:this.value,//传递props过去到component
      },
      on:{//绑定事件
        click:this.handleClick
      },
      nativeOn:{
        click:this.handleClick
      }
    },
    [//作为子节点时需是数组，字符串不用数组括号直接写
      createElement('span',{
        ref: 'span',//这个既可以是组件也可以是dom节点 
          slot:'header',//若无slot值，子组件就直接用this.$slots.default代替为<slot></slot>
          style:{
            color:'#999'
          }
      },this.value),
    ])
  },
  methods:{
    handleClick(){}
  }
})