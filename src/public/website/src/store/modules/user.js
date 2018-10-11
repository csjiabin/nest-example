import api from '@api'
const state = {
  detail: {}
}
const getters = {
  detail: state => state.detail || {}
}
const actions = {
  async getDetail ({commit}, id) {
    try {
      const {data} = await api.userDetail({id})
      commit('SET_STATE', { target: 'detail', data })
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
