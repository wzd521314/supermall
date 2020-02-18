<!--  -->
<template>
  <div class='details'>
    <navbar class="detail-navbar"></navbar>
    <Scroll class="content" ref="betterScroll">
      <swiper :topImages="topImages"></swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramsInfo"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
      <goods-list :goods="recommend"></goods-list>
    </Scroll>
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

import GoodsList from "components/content/goods/GoodsList.vue"

import Scroll from "components/common/scroll/Scroll.vue"

import {imgListenerMixin} from 'common/mixin.js'

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
  Scroll
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
  recommend: []
};
},

methods: {
  imageLoad() {
    this.$refs.betterScroll.Refresh()
  }
},

mixins: [imgListenerMixin],

created() {
  console.log('我加载了')
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
   console.log(this.recommend)
  })
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
  height: calc(100% - 44px);
}

.detail-navbar{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>