import api from '@api'
const state = {
  articleList: {
    count: 0,
    list: []
  },
  articleDetail: {}
}
const getters = {
  articleList: state => state.articleList || { count: 0, list: [] },
  articleDetail: state => state.articleDetail || {}
}
const actions = {
  async getArticleList ({ commit }, params = {}) {
    try {
      const { data } = await api.articleList(params)
      commit('SET_STATE', { target: 'articleList', data })
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
  },
  async articleAdd ({commit}, params = {}) {
    try {
      const { data } = await api.articleAdd(params)
      return data
    } catch (error) {
      throw error
    }
  },
  async articleDelete ({commit}, id) {
    try {
      const {data} = await api.articleDelete(id)
      return data
    } catch (error) {
      throw error
    }
  },
  async articleUpdate ({commit}, params) {
    try {
      const {data} = await api.articleUpdate(params)
      return data
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
