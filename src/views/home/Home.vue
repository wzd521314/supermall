<template>
  <div>
    <nav-bar class="home">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <home-swiper :banner="banner"></home-swiper>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {getHomeMultidata} from 'network/home.js';

import HomeSwiper from "./childComps/HomeSwiper.vue"

  export default {
    name: "Home",
    data () {
      return {
        banner: [],
        recommend: []
      }
    },
    components: {
      NavBar,
      HomeSwiper
    },
    created() {
      getHomeMultidata().then(res => {
        this.banner = res.data.data.banner.list;
        this.recommend = res.data.data.recommend.list;
      })
    },
  }
</script>

<style scoped>
.home{
  background-color: var(--color-tint);
  color: aliceblue;
};
</style>
