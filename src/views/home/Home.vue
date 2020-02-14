<template>
  <div class="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <home-swiper :banner="banner"></home-swiper>
    <home-recommend :recommend="recommend"></home-recommend>
    <feature-view></feature-view>
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabclick"></tab-control>
    <goods-list :goods="goodsCount"></goods-list>

  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import GoodsList from "components/content/goods/GoodsList.vue"
import TabControl from "components/content/tabControl/TabControl.vue"

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
        currentType: 'pop'
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommend,
      FeatureView,
      TabControl,
      GoodsList
    },
    computed: {
      goodsCount() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
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
        })
      },

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
};
</style>
