const shouldUseTransition = !/transition=none/.test(location.href)
const state = {
  demoScrollTop: 0,
  isLoading: false,
  direction: shouldUseTransition ? 'forward' : ''
}
const getters = {

}
const actions = {
  updateDemoPosition ({commit}, top) {
    commit({type: 'updateDemoPosition', top})
  }
}
const mutations = {
  updateDemoPosition (state, payload) {
    state.demoScrollTop = payload.top
  },
  updateLoadingStatus (state, payload) {
    state.isLoading = payload.isLoading
  },
  updateDirection (state, payload) {
    if (!shouldUseTransition) {
      return
    }
    state.direction = payload.direction
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
