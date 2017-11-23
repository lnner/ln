<template>
  <div class="ln">
    <el-row>
      <el-col :span="24">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span='1'><button>11111</button></el-col>
      <el-col :span='1'><button>22222</button></el-col>
      <el-col :span='1'><button>33333</button></el-col>
      <el-col :offset="18" :span="3">
        <el-input
        placeholder="请选择日期"
        icon="search"
        v-model="search"
        :on-icon-click="clickSearch">
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table ref="multipleTable" :data="table" border tooltip-effect="dark" style="width: 100%">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="title" label="标题">
            <!-- <template scope="scope">{{ scope.row.date }}</template> -->
          </el-table-column>
          <el-table-column prop="categoryname" label="所属类别" width="120">
          </el-table-column>
          <el-table-column prop="stock_quantity" label="库存" width="120" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="market_price" label="市场价" width="120" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="sell_price" label="销售价" width="120" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="属性" width="120" show-overflow-tooltip>
            <template scope="scope">
              <i v-bind="{class=''}"></i>
              
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        search:'',
        table: []
      }
    },
    methods: {
      getlist() {
        var url = '/admin/goods/getlist?pageIndex=1&pageSize=10&searchvalue=';
        this.$ajax.get(url).then(res => {
          this.table = res.data.message
        })
      },
      clickSearch(val){
        console.log(val)
      }
    },
    mounted() {
      this.getlist();
    }
  }
</script>
<style>
</style>