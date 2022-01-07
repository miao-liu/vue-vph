const state = () => ({
  allItems: [],
  partItems: [],
  cartProducts: [],
  itemsId: []
})
const getters = {
  getProducts: (state, getters, rootState) => {
    if (rootState.products.all.length) {
      const arr = state.partItems.map(({ id, quantity }) => {
        const product = rootState.products.all.find(item => item.id === id)
        return {
          id: product.id,
          img: product.pic_imgs,
          price: product.price1,
          title: product.name,
          quantity
        }
      })
      state.cartProducts.push(...arr)
      state.partItems = []
    } else {
      console.log('waiting...')
    }
    return state.cartProducts
  },
  cartTotalPrice: (state, getters) => {
    if (!state.cartProducts) {
      console.log('wating...')
    } else {
      return state.cartProducts.reduce((total, product) => {
        return total + product.price * product.quantity
      }, 0)
    }
  },
  checkouProduct: state => id => {
    return state.allItems.some(product => product.id === id)
  }
}
const mutations = {
  pushProductToCart (state, id) {
    state.partItems.push({ id, quantity: 1 })
    state.allItems.push({ id, quantity: 1 })
  },
  setItemsId (state) {
    state.itemsId = state.partItems.reduce((cur, next) => [...cur, next.id], [])
  },
  clearPartItems (state) {
    console.log('clear--')
    state.partItems = []
  },
  incrementItemQuantity (state, id) {
    const cartItem = state.cartProducts.find(item => item.id === id)
    cartItem.quantity++
  },
  decrementItemQuantity (state, id) {
    const cartItem = state.cartProducts.find(item => item.id === id)
    cartItem.quantity = cartItem.quantity >= 2 ? --cartItem.quantity : 1
  }
}
const actions = {
  setItemsId ({ commit }) {
    commit('setItemsId')
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
