<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <better-scroll class="content" ref="betterScroll" 
                   :probeType="3" 
                   :pullUpload="true" 
                   @pageScroll="contentScroll" @pullingUp="loadMore">
      <home-swiper :banner="banner"></home-swiper>
      <home-recommend :recommend="recommend"></home-recommend>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabclick"></tab-control>
      <goods-list :goods="goodsCount"></goods-list>
    </better-scroll>

    <top-back @click.native="backClick" v-show="isShowBackTop"></top-back>

  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import BetterScroll from "components/common/scroll/Scroll.vue"

import GoodsList from "components/content/goods/GoodsList.vue"
import TabControl from "components/content/tabControl/TabControl.vue"
import TopBack from "components/content/Topback/TopBack.vue"

import {getHomeMultidata, getHomeGoods} from 'network/home.js';

import HomeSwiper from "./childComps/HomeSwiper.vue"
import HomeRecommend from "./childComps/HomeRecommend.vue"
import FeatureView from "./childComps/FeatureView.vue"

  export default {
    name: "Home",
    data () {
      return {
        banner: [],
        recommend: [],
        goods: {
          'pop': {page: 0,list: []},
          'new': {page: 0,list: []},
          'sell': {page: 0,list: []}
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommend,
      FeatureView,
      TabControl,
      GoodsList,
      BetterScroll,
      TopBack
    },
    computed: {
      goodsCount() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      //获取页面数据
      getHomeData() {
        getHomeMultidata().then(res => {
        this.banner = res.data.data.banner.list;
        this.recommend = res.data.data.recommend.list;
      })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page += 1

          this.$refs.betterScroll.finishPullUp()
        })
      },
      //页面数据切换
      tabclick(item) {
        switch(item) {
          case 0:
            this.currentType='pop'
            break;
          case 1:
            this.currentType='new'
            break;
          case 2:
            this.currentType='sell'
            break;
        }
      },
      //topBack点击回到顶部
      backClick() {
        console.log(this.$refs.betterScroll.ScrollTo)
        this.$refs.betterScroll.ScrollTo(0, 0,500)
      },
      //监听topback是否出现
      contentScroll(position) {
        this.isShowBackTop = (-position.y) > 1000 
      },
      //上拉加载更多
      loadMore() {
        this.getHomeGoods(this.currentType)
      }
    },
    created() {
      this.getHomeData(),

      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
  }
</script>

<style scoped>
.home{
  padding-top: 44px;
}

.home-nav{
  background-color: var(--color-tint);
  color: aliceblue;

  position: fixed;
  left:0;
  right:0;
  top:0;

  z-index: 9;
}

.content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
}

#home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
}
</style>
