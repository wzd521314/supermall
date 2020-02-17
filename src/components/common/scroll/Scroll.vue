<!--  -->
<template>
<div class='wrapper' ref="wrapper">
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import BScroll from 'better-scroll'

export default {

//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
  betterScroll:null,
};
},
props: {
  probeType: {
    type: Number,
    default: 0
  },
  pullUpLoad: {
    type: Boolean,
    default: false
  }
},
methods: {
  ScrollTo(x ,y ,time=300) {
    this.betterScroll.scrollTo(x, y, time)
  },
  //上拉加载操作完成一次
  finishPullUp() {
    this.betterScroll.finishPullUp()
  },
  //重置wrapper.height
  Refresh() {
    this.betterScroll.refresh()
  },
  scrollY() {
    return this.betterScroll.y
  }

},

mounted() {
  //1.创建BScroll对象
  this.betterScroll = new BScroll(this.$refs.wrapper, {
    click: true,
    probeType: this.probeType,
    pullUpLoad: this.pullUpLoad
  })

  //2.监听用户滚到的位置
  this.betterScroll.on('scroll',(position) => {
    this.$emit('pageScroll',position)
  })

  //3.监听上拉事件
  this.betterScroll.on('pullingUp',() => {
    this.$emit('loadMore')
  })
},
}
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类

</style>