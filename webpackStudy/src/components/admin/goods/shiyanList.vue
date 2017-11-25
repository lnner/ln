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
      <el-col :span='2'>
        <router-link to='/layout/shiyanAdd'>
          <el-button>新添加</el-button>
        </router-link>
      </el-col>
      <el-col :span='2'>
          <el-button @click='delAll'>删除选中</el-button>
      </el-col>
      <el-col :span='2'>
        <el-button @click='all(table)'>全选</el-button>
      </el-col>
      <el-col :offset="15" :span="3">
        <el-input placeholder="请选择日期" icon="search" v-model="search" :on-icon-click="clickSearch">
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table ref="multipleTable" :data="table" @select='select' @select-all='all' border tooltip-effect="dark" style="width: 100%">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="title" label="标题">
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
              <i v-bind="{class:'el-icon-picture '+(scope.row.is_slide==1?'':'grey')}" @click='setChange($event)'></i>
              <i v-bind="{class:'el-icon-upload '+(scope.row.is_top==1?'':'grey')}" @click='setChange($event)'></i>
              <i v-bind="{class:'el-icon-star-on '+(scope.row.is_hot==1?'':'grey')}" @click='setChange($event)'></i>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" show-overflow-tooltip>
            <template scope="scope">
              <router-link v-bind="{to:'/layout/shiyanEdit/'+scope.row.id}">
                <el-button>修改</el-button>
              </router-link>
              <el-button>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <template>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
        </div>
      </template>
    </el-row>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        // currentMenu:'3-1',
        pageSize: 10, //定义一个分页组件中页容量，默认是10条
        pageIndex: 1, //定义一个分页中的页索引，默认是第一页
        totalCount: 0,//数据api返回的数据总行数
        search: '',
        table: [],
        ids: [],
        istrue:false
      }
    },
    methods: {
      all(rows) {
        this.ids=[]
        this.istrue=!this.istrue;
        if (this.istrue) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
            this.ids.push(row.id);
          });
        }else{
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
          
        }
      },
      select(selection, row) {
        // console.log(selection,row)
        this.ids.push(row.id);
      },
      delAll() {
        var ids=this.ids.join(',');
        var url='/admin/goods/del/'+ids;
        this.$ajax.get(url).then(res=>{
          if(res.data.status==1){
            this.$message.error(res.data.message);
          }else{
            this.$message({
              duration:500,
              type:'success',
              message:res.data.message});
            this.getlist();
          }
        })
      },
      getlist() {
        var url = '/admin/goods/getlist?pageIndex=' + this.pageIndex + '&pageSize=' + this.pageSize + '&searchvalue=';
        this.$ajax.get(url).then(res => {
          this.table = res.data.message;
          this.totalCount = res.data.totalcount;
          // console.log(res.data)
        })
      },
      clickSearch(val) {
        this.getlist()
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getlist()
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.pageIndex = val;
        this.getlist()
      },
      setChange(e) {
        var icon = e.currentTarget.getAttribute('class')
        if (icon.indexOf('grey') > -1) {
          icon = icon.replace('grey', '')
        } else {
          icon += ' grey'
        }
        e.currentTarget.setAttribute('class', icon)
      }
    },
    mounted() {
      this.getlist();
    }
  }
</script>
<style>
  .grey {
    color: rgba(0, 0, 0, 0.3)
  }
</style>