import ajax from '@/api/ajax'
import { TYPES_HOTS } from '@/config/api'

const state = () => ({
  hots: [],
  recentlyHots: []
})

const getters = {}

const mutations = {
  setHots: (state, results) => {
    state.hots = results
  },
  addRecently: (state, item) => {
    const isReplace = state.recentlyHots.some(val => val.name === item.name)
    !isReplace && state.recentlyHots.unshift(item)
  },
  clearRecently: state => {
    state.recentlyHots = []
  },
  setRecentlyHots: (state, results) => {
    state.recentlyHots = results
  }
}

const actions = {
  async getData ({ commit }) {
    const results = await ajax('get', TYPES_HOTS)
    commit('setHots', results.data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
