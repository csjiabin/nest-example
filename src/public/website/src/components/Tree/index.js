import Tree from './Tree.vue'
import './Tree.scss'
Tree.install = function (Vue) {
  Vue.component(Tree.name, Tree)
}

export default Tree
