import api from '@api'
const state = {
  categoryList: {
    count: 0,
    list: []
  },
  articleDetail: {}
}
const getters = {
  categoryList: state => state.categoryList || { count: 0, list: [] },
  articleDetail: state => state.articleDetail || {}
}
const actions = {
  async getCategoryList ({ commit }, params = {}) {
    try {
      const { data } = await api.categoryList(params)
      commit('SET_STATE', { target: 'categoryList', data })
    } catch (error) {
      throw error
    }
  },
  async getArticleDetail ({ commit }, id) {
    try {
      const { data } = await api.articleDetail(id)
      commit('SET_STATE', { target: 'articleDetail', data })
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
