<template>
  <transition name="fow-message-fade">
    <div
      :class="[
        'fow-message',
        type && !iconClass ? `fow-message--${ type }` : '',
        center ? 'is-center' : '',
        customClass]"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      role="alert"
    >
      <i :class="iconClass" v-if="iconClass"></i>
      <i :class="typeClass" v-else></i>
      <slot>
        <p v-if="!dangerouslyUseHTMLString" class="fow-message__content">{{ message }}</p>
        <p v-else v-html="message" class="fow-message__content"></p>
      </slot>
      <i v-if="showClose" class="fow-message__closeBtn fow-icon-close" @click="close"></i>
    </div>
  </transition>
</template>

<script type="text/babel">
const typeMap = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error'
}

export default {
  data () {
    return {
      visible: false,
      message: '',
      duration: 3000,
      type: 'info',
      iconClass: '',
      customClass: '',
      onClose: null,
      showClose: false,
      closed: false,
      timer: null,
      dangerouslyUseHTMLString: false,
      center: false
    }
  },

  computed: {
    iconWrapClass () {
      const classes = ['fow-message__icon']
      if (this.type && !this.iconClass) {
        classes.push(`fow-message__icon--${this.type}`)
      }
      return classes
    },

    typeClass () {
      return this.type && !this.iconClass
        ? `fow-message__icon fow-icon-${typeMap[this.type]}`
        : ''
    }
  },

  watch: {
    closed (newVal) {
      if (newVal) {
        this.visible = false
        this.$el.addEventListener('transitionend', this.destroyElement)
      }
    }
  },

  methods: {
    destroyElement () {
      this.$el.removeEventListener('transitionend', this.destroyElement)
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },

    close () {
      this.closed = true
      if (typeof this.onClose === 'function') {
        this.onClose(this)
      }
    },

    clearTimer () {
      clearTimeout(this.timer)
    },

    startTimer () {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close()
          }
        }, this.duration)
      }
    },
    keydown (e) {
      if (e.keyCode === 27) { // esc关闭消息
        if (!this.closed) {
          this.close()
        }
      }
    }
  },
  mounted () {
    this.startTimer()
    document.addEventListener('keydown', this.keydown)
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.keydown)
  }
}
</script>
