<!--  -->
<template>
<div class='goods'>
  <goods-list-item v-for="goods1 in goods" :key="goods1.acm" :goodsItem="goods1"></goods-list-item>
</div>
</template>

<script>
import GoodsListItem from "./GoodsListItem"
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {
  GoodsListItem
},
props: {
  goods: {
    type: Array,
    default() {
      return []
    }
  }
},
data() {
//这里存放数据
return {

};
},
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }
</style>