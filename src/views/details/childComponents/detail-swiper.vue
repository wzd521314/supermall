<!--  -->
<template>
<div class=''>
  <swiper class="detail-swiper">
      <swiper-item v-for="item in topImages" :key="item">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {Swiper, SwiperItem} from 'components/common/swiper/index'
export default {
//import引入的组件需要注入到对象中才能使用
components: {
  Swiper,
  SwiperItem
},
data() {
//这里存放数据
return {

};
},
props: {
  topImages: {
    type: Array,
    default() {
      return []
    }
  }
}
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.detail-swiper{
  height: 300px;
  overflow: hidden;
}
</style>