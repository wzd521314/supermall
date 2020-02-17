<!--  -->
<template>
<div class=''>
  <detail-navbar>
    <div slot="left" class="navbar-left" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="navbar-center" >
      <div class="title-item" v-for="(item,index) in title" :key="item" :class="{active: index === currentIndex}" @click="titleClick(index)">{{item}}</div>
    </div>
  </detail-navbar>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import detailNavbar from 'components/common/navbar/NavBar.vue'
export default {
//import引入的组件需要注入到对象中才能使用
components: {
  detailNavbar
},
data() {
//这里存放数据
return {
  title: ['商品','参数','评论','推荐'],
  currentIndex: 0
};
},
methods: {
  titleClick(index) {
    this.currentIndex = index
  },
  backClick() {
    this.$router.go(-1)
  }
},
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.navbar-left{
  margin-top: 7px;
}

.navbar-center{
  display: flex
}
.title-item{
  flex: 1;
  font-size: 13px;
}

.active{
  color: var(--color-tint)
}
</style>