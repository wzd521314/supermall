<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" 
                  @tabClick="tabclick" 
                  ref="tabControl1" 
                  v-show="isShowTabControl" class="tab-control"></tab-control>
    <better-scroll class="content" ref="betterScroll" 
                   :probeType="3" 
                   @pageScroll="contentScroll" 
                   :pullUpLoad="true" 
                   @loadMore="loadmore">
      <home-swiper :banner="banner" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend :recommend="recommend"></home-recommend>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabclick" ref="tabControl2"></tab-control>
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
        isShowBackTop: false,
        isShowTabControl: false,
        offsetTop: 0, 
        scrollY: 1
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
      //防抖函数
      deBounce(func,delaytime) {
        let timeId = null;
        return function (...args)  {
          timeId && clearTimeout(timeId)
          timeId = setTimeout(() => {
            func.apply(this,args)
          },delaytime)
        }
      },
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
        this.$refs.tabControl1.currentIndex= item
        this.$refs.tabControl2.currentIndex= item
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
        this.$refs.betterScroll.ScrollTo(0, 0,500)
      },
      //监听topback是否出现
      contentScroll(position) {
        this.isShowBackTop = (-position.y) > 1000

        this.isShowTabControl = (-position.y) > this.offsetTop
      },
      //上拉加载更多
      loadmore() {
        this.getHomeGoods(this.currentType)
      },
      //获取tab-control的offsetTop
      swiperImageLoad() {
        this.offsetTop = this.$refs.tabControl2.$el.offsetTop
      }
    },
    created() {
      this.getHomeData(),
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      const refresh = this.deBounce(this.$refs.betterScroll.Refresh,100)
      // function(...args) {
      //     console.log(this)
      //     timeId && clearTimeout(timeId)
      //     timeId = setTimeout(() => {
      //       func.apply(this,args)
      //     },delaytime)
      this.$bus.$on('imageLoad', () => {
        refresh()
      })
    },
    activated() {
      this.$refs.betterScroll.ScrollTo(0, this.scrollY,1)
      this.$refs.betterScroll.Refresh()
    },
    deactivated() {
      this.scrollY = this.$refs.betterScroll.scrollY()
      console.log(this.scrollY)
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

  /* position: fixed;
  left:0;
  right:0;
  top:0;

  z-index: 9; */
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

.tab-control{
  position: relative;
}
</style>
