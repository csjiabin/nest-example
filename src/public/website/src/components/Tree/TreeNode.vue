<template>
  <div
    class="tree-node"
    @click.stop="handleClick"
    v-show="node.visible"
    :class="{
      'is-expanded': expanded,
      'is-current': tree.store.currentNode === node,
      'is-hidden': !node.visible,
      'is-focusable': !node.disabled,
      'is-checked': !node.disabled && node.checked
    }"
    role="treeitem"
    tabindex="-1"
    :aria-expanded="expanded"
    :aria-disabled="node.disabled"
    :aria-checked="node.checked"
  >

  <md-button :class="{
    'is-focusable': !node.disabled,
    'is-checked': !node.disabled && node.checked,
    'is-expanded': expanded,
    'is-current': tree.store.currentNode === node}">
    <div class="tree-node__content"
      :style="{ 'padding-left': (node.level - 1) * tree.indent + 'px' }">
        <md-icon class="tree-node__expand-icon"
        @click.stop="handleExpandIconClick"
        :class="{ 'is-leaf': node.isLeaf, expanded: !node.isLeaf && expanded }">&#xE037;</md-icon>
      <md-checkbox
      v-if="showCheckbox"
      v-model="node.checked"
      class="md-primary"
      :class="{indeterminate:node.indeterminate}"
      :disabled="!!node.disabled"
      @click.native.stop
      @change="handleCheckChange(node.checked,$event)"
      >
      </md-checkbox>
      <span
        v-if="node.loading"
        class="tree-node__loading-icon fow-icon-loading">
      </span>
      <node-content :node="node"></node-content>
    </div>
    </md-button>
    <collapse-transition>
      <div
        class="tree-node__children"
        v-if="childNodeRendered"
        v-show="expanded"
        role="group"
        :aria-expanded="expanded"
      >
        <tree-node
          :render-content="renderContent"
          v-for="child in node.childNodes"
          :key="getNodeKey(child)"
          :node="child"
          @node-expand="handleChildNodeExpand">
        </tree-node>
      </div>
      </collapse-transition>
  </div>
</template>

<script type="text/jsx">
import CollapseTransition from '../utils/transitions/collapse-transition'
import emitter from '../utils/mixins/emitter'

export default {
  name: 'TreeNode',
  componentName: 'TreeNode',
  mixins: [emitter],

  props: {
    node: {
      default () {
        return {}
      }
    },
    props: {},
    renderContent: Function
  },

  components: {
    CollapseTransition,
    NodeContent: {
      props: {
        node: {
          required: true
        }
      },
      render (h) {
        const parent = this.$parent
        const node = this.node
        const data = node.data
        const store = node.store
        return (
          parent.renderContent
            ? parent.renderContent.call(parent._renderProxy, h, { _self: parent.tree.$vnode.context, node, data, store })
            : <span class="tree-node__label">{ this.node.label }</span>
        )
      }
    }
  },

  data () {
    return {
      tree: null,
      expanded: false,
      childNodeRendered: false,
      showCheckbox: false,
      oldChecked: null,
      oldIndeterminate: null
    }
  },

  watch: {
    'node.indeterminate' (val) {
      this.handleSelectChange(this.node.checked, val)
    },

    'node.checked' (val) {
      this.handleSelectChange(val, this.node.indeterminate)
    },

    'node.expanded' (val) {
      this.$nextTick(() => { this.expanded = val })
      if (val) {
        this.childNodeRendered = true
      }
    }
  },

  methods: {
    getNodeKey (node, index) {
      const nodeKey = this.tree.nodeKey
      if (nodeKey && node) {
        return node.data[nodeKey]
      }
      return index
    },

    handleSelectChange (checked, indeterminate) {
      if (this.oldChecked !== checked && this.oldIndeterminate !== indeterminate) {
        this.tree.$emit('check-change', this.node.data, checked, indeterminate)
      }
      this.oldChecked = checked
      this.indeterminate = indeterminate
    },

    handleClick () {
      const store = this.tree.store
      store.setCurrentNode(this.node)
      this.tree.$emit('current-change', store.currentNode ? store.currentNode.data : null, store.currentNode)
      this.tree.currentNode = this
      if (this.tree.expandOnClickNode) {
        this.handleExpandIconClick()
      }
      this.tree.$emit('node-click', this.node.data, this.node, this)
    },

    handleExpandIconClick () {
      if (this.node.isLeaf) return
      if (this.expanded) {
        this.tree.$emit('node-collapse', this.node.data, this.node, this)
        this.node.collapse()
      } else {
        this.node.expand()
        this.$emit('node-expand', this.node.data, this.node, this)
      }
    },

    handleCheckChange (value) {
      this.node.setChecked(value, !this.tree.checkStrictly)
    },

    handleChildNodeExpand (nodeData, node, instance) {
      this.broadcast('FowTreeNode', 'tree-node-expand', node)
      this.tree.$emit('node-expand', nodeData, node, instance)
    }
  },

  created () {
    const parent = this.$parent

    if (parent.isTree) {
      this.tree = parent
    } else {
      this.tree = parent.tree
    }

    const tree = this.tree
    if (!tree) {
      console.warn('Can not find node\'s tree.')
    }

    const props = tree.props || {}
    const childrenKey = props['children'] || 'children'

    this.$watch(`node.data.${childrenKey}`, () => {
      this.node.updateChildren()
    })

    this.showCheckbox = tree.showCheckbox

    if (this.node.expanded) {
      this.expanded = true
      this.childNodeRendered = true
    }

    if (this.tree.accordion) {
      this.$on('tree-node-expand', node => {
        if (this.node !== node) {
          this.node.collapse()
        }
      })
    }
  }
}
</script>
