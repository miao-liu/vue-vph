import ajax from '@/api/ajax'
import { CART } from '@/config/api'
const state = () => ({
  all: []
})

const mutations = {
  setCartProducts: (state, products) => {
    state.all = products
  }
}

const actions = {
  async setCartProducts ({ commit }, items) {
    commit('setCartProducts', await ajax('post', CART, { items: items }).then(res => res.data))
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
