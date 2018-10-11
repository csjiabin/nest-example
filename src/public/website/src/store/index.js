import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'
const state = {
  direction: 'forward',
  main: null
}
const modulesFilse = require.context('./modules', true, /\.js$/)
let modules = {}
modulesFilse.keys().forEach(key => {
  let fileName = key.split(/(\.\/)|(\.js)/)[3]
  modules[fileName] = require(`./modules/${fileName}.js`).default
})
Vue.use(Vuex)
const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules
})

export default store
