import api from '@api'
const state = {
  tagList: {
    count: 0,
    rows: []
  }
}
const getters = {
  tagList: state => state.tagList
}
const actions = {
  async getTags ({commit, getters}, params = {}) {
    try {
      const {data} = await api.tagList(params)
      commit('SET_STATE', { target: 'tagList', data })
    } catch (error) {
      throw error
    }
  }
}
const mutations = {
  SET_STATE (state, payload) {
    const { target, data } = payload
    state[target] = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
