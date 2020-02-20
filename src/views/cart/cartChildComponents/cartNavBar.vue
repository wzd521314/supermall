<!--  -->
<template>
<div class='cart-navbar'>
  <nav-bar>
    <div slot="center">购物车({{length}})</div>
  </nav-bar>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import NavBar from 'components/common/navbar/NavBar'
import {mapGetters} from 'vuex'
export default {

//import引入的组件需要注入到对象中才能使用
components: {
  NavBar
},
data() {
//这里存放数据
return {

};
},
computed: {
  ...mapGetters({
    length: 'getCartCount',
    cartList: 'getCartList'
  })
},
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.cart-navbar{
  color: white;
  background-color: #ff8198;
}
</style>