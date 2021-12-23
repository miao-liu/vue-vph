const state = () => ({
  items: [],
  itemsId: []
})
const getters = {
  cartProducts: (state, getters, rootState) => {
    return state.items.map(({ id, quantity }) => {
      if (rootState.products.all.length === 0) {
        console.log('wating...')
      } else {
        const product = rootState.products.all.find(product => product.id === id)
        return {
          id: product.id,
          title: product.name,
          img: product.pic_imgs,
          price: product.price1,
          quantity
        }
      }
    })
  },
  cartTotalPrice: (state, getters) => {
    if (!getters.cartProducts[0]) {
      console.log('wating...')
    } else {
      return getters.cartProducts.reduce((total, product) => {
        return total + product.price * product.quantity
      }, 0)
    }
  }
}
const mutations = {
  pushProductToCart (state, id) {
    state.items.push({ id, quantity: 1 })
  },
  setItemsId (state) {
    state.itemsId = state.items.reduce((cur, next) => [...cur, next.id], [])
  },
  incrementItemQuantity (state, id) {
    const cartItem = state.items.find(item => item.id === id)
    cartItem.quantity++
  },
  decrementItemQuantity (state, id) {
    const cartItem = state.items.find(item => item.id === id)
    cartItem.quantity = cartItem.quantity >= 2 ? --cartItem.quantity : 1
  }
}
const actions = {
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
