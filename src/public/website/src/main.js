// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import locale from './locale'
import './global'
import store from './store'
Vue.config.productionTip = false
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: localStorage.getItem('LANG') || 'en-US', // 语言标识
  messages: locale,
  dateTimeFormats: locale.dateTimeFormats
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  template: '<App/>',
  components: { App }
})
