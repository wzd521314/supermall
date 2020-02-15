<!--  -->
<template>
<div class='tab-control'>
    <div v-for="(item, index) in titles" :key="item" @click="itemClick(index)" 
      class="tab-control-item" :class="{active: index === currentIndex}">
        <span>{{item}}</span>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
name: "tabControl",
//import引入的组件需要注入到对象中才能使用
props: {
    titles: {
        type: Array,
        default() {
            return []
        }
    }
},
methods: {
  itemClick(index) {
    this.currentIndex = index;
    this.$emit('tabClick',index)
  }
},
components: {},
data() {
//这里存放数据
return {
  currentIndex:0
};
},
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.tab-control{
    background-color: #fff;
    display: flex;
    text-align: center;
    font-size: 15px;
    z-index: 9;
}
.tab-control-item{
    flex:1;
    height:40px;
    line-height: 40px;
}
.active{
  color: var(--color-high-text);
}
.active span{
  padding: 5px;
  border-bottom: 3px solid var(--color-tint);
}
</style>