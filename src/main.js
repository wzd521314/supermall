import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast/index.js'
import VueLazyLoad from 'vue-lazyload'

Vue.use(toast)
//使用图片懒加载插件
Vue.use(VueLazyLoad)
Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
