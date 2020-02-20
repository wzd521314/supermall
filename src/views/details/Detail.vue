<!--  -->
<template>
  <div class='details'>
    <navbar class="detail-navbar" @titleClick="titleClick" ref="detailBar"></navbar>
    <Scroll class="content" ref="betterScroll" @pageScroll="pageScroll" :probeType="3">
      <swiper :topImages="topImages"></swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramsInfo" ref="param"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommend" ref="recommend"></goods-list>
    </Scroll>
    <detail-bottom-bar @cartClick="addToCart"></detail-bottom-bar>
    <top-back @click.native="backClick" v-show="isShowBackTop"></top-back>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import navbar from './childComponents/detail-navbar'
import swiper from './childComponents/detail-swiper'
import DetailBaseInfo from './childComponents/DetailBaseInfo'
import DetailShopInfo from './childComponents/DetailShopInfo'
import DetailGoodsInfo from './childComponents/DetailGoodsInfo'
import DetailParamInfo from './childComponents/DetailParamInfo'
import DetailCommentInfo from './childComponents/DetailCommentInfo'
import DetailBottomBar from './childComponents/DetailBottomBar'

import TopBack from "components/content/Topback/TopBack.vue"
import GoodsList from "components/content/goods/GoodsList.vue"

import Scroll from "components/common/scroll/Scroll.vue"

import {imgListenerMixin} from 'common/mixin.js'
import {debounce} from 'common/utils'

import {getDetail, Goods, Shop, GoodsParam, getCommend} from "network/details";

export default {
name: "Detail",
//import引入的组件需要注入到对象中才能使用

components: {
  navbar,
  swiper,
  DetailBaseInfo,
  DetailShopInfo,
  DetailGoodsInfo,
  DetailParamInfo,
  DetailCommentInfo,
  GoodsList,
  Scroll,
  DetailBottomBar,
  TopBack
},
data() {
//这里存放数据
return {
  iid: null,
  topImages: [],
  goods: {},
  shop: {},
  detailInfo: {},
  paramsInfo: {},
  commentInfo: {},
  recommend: [],
  getDtailElementY: null,
  getDtailElementYs: [],
  detailImageLoad: null,
  isShowBackTop: false
};
},

methods: {
  imageLoad() {
    this.detailImageLoad();
    this.getDtailElementY()
  },

  titleClick(index) {
  this.$refs.betterScroll.ScrollTo(0,-(this.getDtailElementYs[index]+1),100)
  },

  pageScroll(position) {
    //监听topback是否出现
    this.isShowBackTop = (-position.y) > 1000
    //判断页面处于哪个部分
    for (let index = 0; index < (this.getDtailElementYs.length - 1); index++) {
      if((-position.y >this.getDtailElementYs[index] && -position.y <this.getDtailElementYs[index + 1]) && this.$refs.detailBar.currentIndex !==index) {
        this.$refs.detailBar.currentIndex = index
      }
    }
  },

  //topBack点击回到顶部
  backClick() {
    this.$refs.betterScroll.ScrollTo(0, 0,500)
  },

  //点击添加购物车
  addToCart() {
    //获取要添加至购物车商品的信息
    console.log("点击了购物车一次")
    const product = {}
    product.image = this.topImages[0];
    product.title = this.goods.title;
    product.desc = this.goods.desc;
    product.price = this.goods.realPrice;
    product.iid = this.iid;
    console.log(product)
    //将该商品的信息添加至购物车内
    this.$store.commit('addCart',product)
  }  
},

mixins: [imgListenerMixin],

created() {
  //1.保存当前item的路由id
  this.iid = this.$route.params.id
  //2.获取对应item的数据
  getDetail(this.iid).then((res) => {

    const data = res.data.result;
    this.topImages = data.itemInfo.topImages

    // 3.获取商品信息
    this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

    // 4.创建店铺信息的对象
    this.shop = new Shop(data.shopInfo)
    //5.保存商品的详情数据
    this.detailInfo = data.detailInfo;
    //6.获取参数信息
    this.paramsInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
    //7.获取评论信息
    if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0] || {};
        }
  })
  //3.请求推荐数据
  getCommend().then(res => {
    
   this.recommend = res.data.data.list
  })
  //获取各个元素得offsetTOP
  this.getDtailElementY = debounce(() => {
    this.getDtailElementYs = [];
    this.getDtailElementYs.push(0)
    this.getDtailElementYs.push(this.$refs.param.$el.offsetTop)
    this.getDtailElementYs.push(this.$refs.comment.$el.offsetTop)
    this.getDtailElementYs.push(this.$refs.recommend.$el.offsetTop)
    this.getDtailElementYs.push(Number.MAX_VALUE)
  },100)
},
mounted() {
  this.detailImageLoad = debounce(this.$refs.betterScroll.Refresh,100)
},
destroyed() {
  this.$bus.$off('imageLoad', this.itemImgListener)
},
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.details{
  height: 100vh;
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content{
  height: calc(100% - 44px - 49px);
}

.detail-navbar{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>