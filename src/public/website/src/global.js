import Vue from 'vue'
import api from '@api'
import 'normalize.css'
import 'animate.css'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css' // This line here
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css'
import Loading from '@components/Loading'
import pages from '@components/pages'
import * as filters from '@utils/filters'
import VeeValidate from 'vee-validate'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Vuelidate from 'vuelidate'
import Message from '@components/Message'
import MessageBox from '@components/MessageBox'
import '@style/index.scss'

// import VueLazyLoad from 'vue-lazyload'
// Vue.use(VueLazyLoad, {
//   error: './static/error.png',
//   loading: './static/loading.png'
// })
Vue.use(VeeValidate)
Vue.use(VueMaterial)
Vue.use(pages)
Vue.use(mavonEditor)
Vue.use(Vuelidate)
Vue.use(Loading.directive)

Vue.config.productionTip = false

Vue.prototype.$loading = Loading.service
Vue.prototype.$http = api
Vue.prototype.$hljs = hljs
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
for (let key in filters) {
  Vue.filter(key, filters[key])
}

// setInterval(() => {
//   var content = document.title
//   var firstChar = content.charAt(0)
//   var sub = content.substring(1, content.length)
//   document.title = sub + firstChar
// }, 1000)
