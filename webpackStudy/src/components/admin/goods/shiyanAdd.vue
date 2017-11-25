<template>
  <div class="add">
    <div class="abread bt-line">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <span>返回上一层</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>购物商城</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>新增商品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="内容标题" prop="title" style='width:500px'>
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="副标题" prop="sub_title" style='width:500px'>
        <el-input v-model="ruleForm.sub_title"></el-input>
      </el-form-item>
      <el-form-item label="所属类别" prop='category_id'>
        <el-select v-model="ruleForm.category_id" placeholder="请选择">
          <el-option v-for='items in menu' :value='items.category_id' :label='items.title'>
            <span v-for='list in (items.class_layer-1)'>&nbsp;</span>
            <span v-if='items.class_layer>1'>|-</span>{{items.title}}
          </el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="是否发布">
        <el-switch on-text="是" off-text="否" v-model="ruleForm.status" style='width:50px'></el-switch>
      </el-form-item>
      <el-form-item label="推荐类型">
        <el-switch on-text="轮播图" off-text="轮播图" v-model="ruleForm.is_slide" style='width:80px'></el-switch>
        <el-switch on-text="置顶" off-text="置顶" v-model="ruleForm.is_top" style='width:80px'></el-switch>
        <el-switch on-text="推荐" off-text="推荐" v-model="ruleForm.is_hot" style='width:80px'></el-switch>
      </el-form-item>
      <el-form-item label='封面'>
        <el-upload class="upload-demo" action="http://127.0.0.1:8899/admin/article/uploadimg" 
        :file-list="ruleForm.imgList" list-type="picture" :on-success='imgGet'>
          <el-button size="small" type="primary">上传封面</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      </el-form-item>
        <el-form-item label='图片文件'>
        <el-upload class="upload-demo" action="http://127.0.0.1:8899/admin/article/uploadfile"
         :on-success='fileGet' :file-list="ruleForm.fileList" list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <!-- <div slot="tip" class="el-upfile__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      </el-form-item>
      <el-form-item label="商品货号" prop="goods_no" style='width:200px'>
        <el-input v-model="ruleForm.goods_no"></el-input>
      </el-form-item>
      <el-form-item label="库存数量" prop="stock_quantity" style='width:200px'>
        <el-input v-model="ruleForm.stock_quantity"></el-input>
      </el-form-item>
      <el-form-item label="市场价格" prop="market_price" style='width:200px'>
        <el-input v-model="ruleForm.market_price"></el-input>
      </el-form-item>
      <el-form-item label="销售价格" prop="sell_price" style='width:200px'>
        <el-input v-model="ruleForm.sell_price"></el-input>
      </el-form-item>
      <el-form-item label="内容摘要" prop="zhaiyao">
        <el-input type="textarea" v-model="ruleForm.zhaiyao"></el-input>
      </el-form-item>
      <el-form-item label="商品详情" prop="content">
        <quill-editor :content="ruleForm.content" @change="onEditorChange($event)" ref="myQuillEditor">
        </quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { quillEditor } from 'vue-quill-editor';
  export default {
    components: {
      quillEditor
    },
    mounted(){
      this.getlist();
    },
    data() {
      return {
        menu:[],
        ruleForm: {
          "title": '1',
          "sub_title": '2',
          "is_slide": true,
          "is_top": false,
          "is_hot": true,
          "category_id": '40',
          "status": false,
          "zhaiyao": '飞樊',
          "imgList": [],
          "fileList":[],
          "goods_no": '2222222',
          "stock_quantity": '0',
          "market_price": '0',
          "sell_price": '0',
          "content": '<p><strong>产品参数：</strong></p>'
        },
        rules: {
          title: [
            { required: true, message: '请填标题', trigger: 'blur' }
          ],
          zhaiyao: [
            { required: true, message: '请填写摘要', trigger: 'blur' }
          ],
          // category_id:[
          //   { required: true, message: '请选择', trigger: 'change' }
          // ]
        }
      };
    },
    methods: {
      getlist(){
        var url='/admin/category/getlist/goods';
        this.$ajax.get(url).then(res=>{
          this.menu=res.data.message;
        })
      },
      fileGet(response){
        this.ruleForm.fileList.push(response);
      },
      imgGet(response){
        this.ruleForm.imgList=[response];
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var url='/admin/goods/add/goods';
            this.ruleForm.category_id-=0;
            this.$ajax.post(url,this.ruleForm).then(res=>{
              // console.log(this.ruleForm)
              if(res.data.status==1){
                this.$message({
                  showClose:true,
                  message:res.data.message,
                  type:'error',
                  duration:1000
                })
              }else{
                this.$message({
                  showClose:true,
                  message:res.data.message,
                  type:'success',
                  duration:1000
                })
                this.$router.push({name:'shiyanList'})
              }
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      onEditorChange(e) {
        this.ruleForm.content = e.html
      }
    }
  }
</script>

<style coped>
  .ql-editor {
    min-height: 200px;
    height: 200px;
    max-height: 200px;
  }
</style>