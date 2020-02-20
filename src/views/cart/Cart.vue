<template>
  <div class="cart">
    <cart-nav-bar></cart-nav-bar>
    <scroll class="content" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <cart-button-bar></cart-button-bar>
  </div>
</template>

<script>
import cartNavBar from "./cartChildComponents/cartNavBar";
import cartList from './cartChildComponents/cartList'
import scroll from "components/common/scroll/Scroll"
import cartButtonBar from "./cartChildComponents/cartButtonBar"

import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      cartNavBar,
      scroll,
      cartList,
      cartButtonBar
    },
    computed: {
      ...mapGetters({
        length: 'getCartCount',
        cartList: 'getCartList'
      })
    },
    activated() {
      this.$refs.scroll.Refresh()
    },
  }
</script>

<style scoped>
.cart{
  height: 100vh;
}
.content{
  height: calc(100% - 84px - 49px);
  overflow: hidden;
}
</style>
