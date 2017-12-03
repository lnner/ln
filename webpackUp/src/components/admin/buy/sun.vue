<template>
<div class="ln">
  <div class="subtmpl">
    <ul>
      <li @click="substract">-</li>
      <li>{{count}}</li>
      <li @click="add">+</li>
    </ul>
  </div>
</div>
</template>
<script>
  export default {
    data(){
      return {
        count:1
      }
    },
      props:['obj'],
      mounted(){
        this.count=this.obj.count;
      },
      methods:{
        add(){
          this.count++;
          this.notice();
        },
        substract(){
          if(this.count<=1){
            this.count=1;
            return;
          }
          this.count--;
          this.notice();
        },
        notice(){
          this.$emit('msg',{gid:this.obj.gid,count:this.count})
        }
    }
  }
</script>
<style coped>
     .subtmpl ul{
        width: 120px;
    }

    .subtmpl li{
        list-style: none;
        display:inline-block;
        width: 30px;
        border: 1px solid rgba(0,0,0,0.3);
        text-align: center;
        padding: 2px;
        cursor: pointer;
    }
</style>  