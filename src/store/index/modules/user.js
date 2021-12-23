const state = () => ({
  userToken: ''
})

const mutations = {
  setToken: (state, token) => {
    state.userToken = token
  },
  delToken: state => {
    state.userToken = ''
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
