import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  getters: {
    getCartCount(state) {
      return state.cartList.length
    },
    getCartList(state) {
      return state.cartList
    }
  },  
  mutations: {
    addCart(state ,payload) {
      let oldProduct = state.cartList.find(item => item.iid === payload.iid); 
      if(oldProduct) {
        oldProduct.count += 1
      }else {
        payload.count = 1;
        payload.checked = true;
        state.cartList.push(payload);
      }
    },
    reverseChecked(state,payload) {
      payload.checked = !payload.checked
    }
  },
  actions: {
    addToast(context,payload) {
      return  new Promise((resolve,reject) => {
        let Product = context.state.cartList.find(item => item.iid === payload.iid);
        if(Product) {
          Product.count += 1
          resolve('当前商品数量+1')
        } else {
          payload.count = 1;
          payload.checked = true;
          context.state.cartList.push(payload);
          resolve('添加了新的商品')
        }
      })

      
    }
      
      
  },

  modules: {
  }
})
