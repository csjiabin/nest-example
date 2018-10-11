export function getMain ({commit}, payload) {
  commit('SET_STATE', { target: 'main', data: payload })
}
