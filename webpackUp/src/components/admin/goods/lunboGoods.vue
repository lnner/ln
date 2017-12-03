<template>
  <div class="ln">
    <!-- 导航栏 -->
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a>
        <a href="/goods/42/1.html">商品详情</a>

      </div>
    </div>

    <!-- 商品详情 -->
    <div class="section">
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <!--页面左边-->
          <div class="left-925">
            <div class="goods-box clearfix">
              <!--商品图片-->
              <div class="pic-box">
                  <div class="magnifier" id="magnifier1">
                      <div class="magnifier-container">
                          <div class="images-cover"></div>
                          <!--当前图片显示容器-->
                          <!-- <img :src="imglist.original_path" alt=""> -->
                          <div class="move-view"></div>
                          <!--跟随鼠标移动的盒子-->
                          </div>
                          <div class="magnifier-assembly">
                          <div class="magnifier-btn">
                                  <span class="magnifier-btn-left">&lt;</span>
                                  <span class="magnifier-btn-right">&gt;</span>
                              </div>
                              <!--按钮组-->
                              <div class="magnifier-line">
                                  <ul class="clearfix animation03">
                                      <li v-for='items in imglist'>
                                          <div class="small-img">
                                              <img :src="items.thumb_path" />
                                          </div>
                                      </li>
                                  </ul>
                              </div>
                              <!--缩略图-->
                          </div>
                          <div class="magnifier-view"></div>
                          <!--经过放大的图片显示容器-->
                      </div>
              </div>
              <!--/商品图片-->

              <!--商品信息-->
              <div class="goods-spec">
                <h1>{{goodsinfo.title}}</h1>
                <p class="subtitle">{{goodsinfo.zhaiyao}}</p>
                <div class="spec-box">
                  <dl>
                    <dt>货号</dt>
                    <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                  </dl>
                  <dl>
                    <dt>市场价</dt>
                    <dd>
                      <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}.00</s>
                    </dd>
                  </dl>
                  <dl>
                    <dt>销售价</dt>
                    <dd>
                      <em class="price" id="commoditySellPrice">¥{{goodsinfo.sell_price}}.00</em>
                    </dd>
                  </dl>
                </div>

                <div class="spec-box">
                  <dl>
                    <dt>购买数量</dt>
                    <dd>
                      <div class="stock-box">
                        <el-input-number v-model="amount" @change="handleChange" :min="1" :max="goodsinfo.stock_quantity"></el-input-number>
                      </div>
                      <span class="stock-txt">
                        库存
                        <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dd>
                      <div class="btn-buy" id="buyButton">
                        <router-link v-bind="{to:'/layout/buy/'}">
                          <button class="buy">立即购买</button>
                        </router-link>
                        <button class="add" @click='add' style="width:150px">加入购物车</button>
                      </div>
                    </dd>
                  </dl>
                </div>

              </div>
              <!--/商品信息-->
            </div>

            <div id="goodsTabs" class="goods-tab bg-wrap">
              <!--选项卡-->
              <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                <ul>
                  <li>
                    <a v-bind="{class:(goods?'selected':'')}" @click='goods=true' href="javascript:;" style='width:60px;display:inline-block'>商品介绍</a>
                  </li>
                  <li>
                    <a v-bind="{class:(goods?'':'selected')}" href="javascript:;" @click='goods=false' style='width:60px;display:inline-block'>商品评论</a>
                  </li>
                </ul>
              </div>
              <!--/选项卡-->
              <div v-html="goodsinfo.content" v-if="goods"></div>
              <!--选项内容-->
              <div class="tab-content entry" style="display:block;">
                <div class="tab-content" style="display: block;">
                  <!--网友评论-->
                  <div class="comment-box">
                    <!--取得评论总数-->
                    <form id="commentForm" name="commentForm" class="form-box">
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="conn-box">
                        <div class="editor">
                          <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                          <span class="Validform_checktip"></span>
                        </div>
                        <div class="subcon">
                          <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                          <span class="Validform_checktip"></span>
                        </div>
                      </div>
                    </form>
                    <ul id="commentList" class="list-box">
                      <p style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
                      <li v-for='items in comment'>
                        <div class="avatar-box">
                          <i class="iconfont icon-user-full"></i>
                        </div>
                        <div class="inner-box">
                          <div class="info">
                            <span>{{items.user_name}}</span>
                            <span>{{items.add_time}}</span>
                          </div>
                          <p>{{items.content}}</p>
                        </div>
                      </li>
                    </ul>
                    <!--放置页码-->
                    <div class="page-box" style="margin:5px 0 0 62px">
                      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[1,10,20,30]"
                        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalcount">
                      </el-pagination>
                    </div>
                    <!--/放置页码-->
                  </div>
                  <!--/网友评论-->
                </div>
              </div>
            </div>

          </div>
          <!--/页面左边-->

          <!--页面右边-->
          <div class="left-220">
            <div class="bg-wrap nobg">
              <div class="sidebar-box">
                <h4>推荐商品</h4>
                <ul class="side-img-list">
                  <li v-for='items in hotgoodslist' :key='items.id'>
                    <div class="img-box">
                      <router-link v-bind='{to:"/layout/lunboGoods/"+items.id}'>
                        <img :src="items.img_url">
                      </router-link>
                    </div>
                    <div class="txt-box">
                        <router-link v-bind='{to:"/layout/lunboGoods/"+items.id}'>{{items.title}}</router-link>
                      <span>{{items.add_time|datefmt}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!--/页面右边-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import '../../../../statics/site/js/jqplugins/imgzoom/magnifier.js';
  import {bus,key} from '../bus/bus.js';
  import {setItem} from '../bus/localStorage.js'
  export default {
    data() {
      return {
        amount: 1,
        goodsinfo: {},
        imglist: [],
        hotgoodslist: [],
        goods: true,
        id: this.$route.params.id,
        pageIndex: 1,
        pageSize: 10,
        comment: [],
        pageIndex: 1,
        totalcount: 1,
        commenttxt:''
      }
    },
    watch: {
            $route: function () {
                this.getList()
            }
        },
    methods: {
      add(){
        bus.$emit(key,this.amount);
        var goodsObj={getId:this.$route.params.id,count:this.amount};
        // var goodsObj={};
        // if(goodsObj[this.$route.params.id]){
        //   goodsObj[this.$route.params.id]=this.amount
        //   localStorage.setItem(key,JSON.stringify(goodsObj))
        // }
        setItem(goodsObj);
        this.$store.dispatch('changeCount',goodsObj);
        this.isshow=true;
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
      },
      handleChange(val) {
        // console.log(val)
        this.amount=val
      },
      setComment(){
        var url='/site/validate/comment/post/goods/'+this.$route.params.id;
        this.$ajax.post(url,this.commenttxt).then(res=>{
          if(res.data.status==0){
            this.$message.error(res.data.status);
          }else{
            this.getComment()
          }
        })
      },
      getComment() {
        var url = `/site/comment/getbypage/goods/${this.id}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`;
        this.$ajax.get(url).then(res => {
          if (res.data.status == 1) {
            this.$message.error(res.data.status);
          } else {
            this.comment = res.data.message;
            this.totalcount = res.data.totalcount;
            this.pageIndex = res.data.pageIndex;
            this.pageSize = res.data.pageSize
          }
        })
      },
      getList() {
        // var url = `/site/goods/getgoodsinfo/${this.id}`;
        // var url = '/site/goods/getgoodsinfo/' + this.id;
        var url = '/site/goods/getgoodsinfo/' + this.$route.params.id;
        this.$ajax.get(url).then(res => {
          if (res.data.status == 0) {
            this.goodsinfo = res.data.message.goodsinfo;
            this.imglist = res.data.message.imglist;
            this.hotgoodslist = res.data.message.hotgoodslist;
            this.getComment();
            setTimeout(function() {
              $('#magnifier1').imgzoon({magnifier:'#magnifier1'});
            }, 200);
          } else {
            this.$message.error('无数据')
          }
        })
      }
    },
    mounted() {
      this.getList();
    },
  }
</script>
<style coped>
  @import url('../../../../statics/site/js/jqplugins/imgzoom/css/magnifier.css');
</style>