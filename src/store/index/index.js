import Vue from 'vue'
import Vuex from 'vuex'
import types from './modules/types'
import user from './modules/user'
import cart from './modules/cart'
import products from './modules/products'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    types,
    user,
    cart,
    products
  }
})
