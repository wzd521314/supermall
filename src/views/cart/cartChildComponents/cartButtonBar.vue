<!--  -->
<template>
<div class='bottom-bar'>
  <div class="check-content">
    <check-button class="check-button" :isChecked="isSelectorAll" @click.native="allSelector"></check-button>
    <span>全选</span>
  </div>

  <div class="price">
    合计：{{totalPrice}}
  </div>

  <div class="calculate">去计算: {{checkLength}}</div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import checkButton from 'components/content/checkButton/checkButton' 
export default {
//import引入的组件需要注入到对象中才能使用
components: {
  checkButton
},
computed: {
  checkLength() {
    return this.$store.state.cartList.filter(item => item.checked).length
  },  
  totalPrice() {
    return '￥' + this.$store.state.cartList.filter(item => item.checked).reduce((preventValue,item) => {
      return preventValue + item.price * item.count
    },0).toFixed(2)
  },
  isSelectorAll() {
    if (this.$store.state.cartList.length === 0) {return false}
    return !this.$store.state.cartList.some((item) => item.checked === false)
      
  }
},
data() {
//这里存放数据
return {

};
},
methods: {
  allSelector() {
    console.log('全选')
    if(this.isSelectorAll) {
      this.$store.state.cartList.forEach((item) => {
        item.checked = false
      }) 
    } else {
      this.$store.state.cartList.forEach((item) => {
        item.checked = true
      })
    }
  }
},
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  line-height: 40px;
  display: flex;
  font-size: 14px;
}

.check-content {
  display: flex;
  width: 60px;
  align-items: center;
  margin-left: 10px;
  margin-right: 5px;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
}

.price {
  margin-left: 20px;
  flex: 1
}

.calculate {
  width: 90px;
  color: #fff;
  text-align: center;
  background-color: red;
}
</style>