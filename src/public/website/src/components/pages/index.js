import Pages from './pages.vue'
import './pages.scss'
Pages.install = Vue => {
  Vue.component(Pages.name, Pages)
}
export default Pages
