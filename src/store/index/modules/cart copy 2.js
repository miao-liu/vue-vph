const state = () => ({
  itemsId: [],
  partsId: [{ id: 1, quantity: 2 }, { id: 2, quantity: 2 }],
  allId: [],
  stack: []
})
const getters = {
  partCartProducts: (state, getters, rootState) => {
    if (rootState.products.all.length) {
      let arr = []
      while (state.partsId.length) {
        const { id, quantity } = state.partsId.pop()
        const product = rootState.products.all.find(product => product.id === id)
        arr.push({
          id: product.id,
          title: product.name,
          img: product.pic_imgs,
          price: product.price1,
          quantity
        })
      }
      return arr
    } else {
      console.log('waiting...')
    }
  },
  cartTotalPrice: (state, getters) => {
    if (!getters.allCartProducts) {
      console.log('wating...')
    } else {
      return getters.allCartProducts.reduce((total, product) => {
        return total + product.price * product.quantity
      }, 0)
    }
  }
}
const mutations = {
  pushProductToCart (state, id) {
    state.partsId.push({ id, quantity: 1 })
    state.allId.push(...state.partsId)
  },
  setItemsId (state) {
    state.itemsId = state.partsId.reduce((cur, next) => [...cur, next.id], [])
  },
  clearPartsId (state) {
    state.partsId = []
  },
  incrementItemQuantity (state, id) {
    const cartItem = state.allId.find(item => item.id === id)
    cartItem.quantity++
  },
  decrementItemQuantity (state, id) {
    const cartItem = state.allId.find(item => item.id === id)
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
