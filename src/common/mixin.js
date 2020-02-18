import {debounce} from './utils'

export const imgListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.betterScroll.Refresh,100)
       this.itemImgListener = () => {
        refresh()
      }
      // function(...args) {
      //     console.log(this)
      //     timeId && clearTimeout(timeId)
      //     timeId = setTimeout(() => {
      //       func.apply(this,args)
      //     },delaytime)
      this.$bus.$on('imageLoad', this.itemImgListener)
      console.log("我是混入")
  },
}