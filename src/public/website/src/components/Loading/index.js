import directive from './directive'
import service from './service'
import './Loading.scss'
export default {
  install (Vue) {
    Vue.use(directive)
    Vue.prototype.$loading = service
  },
  directive,
  service
}
