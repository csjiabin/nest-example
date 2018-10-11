export function SET_STATE (state, payload) {
  const { target, data } = payload
  state[target] = data
}
