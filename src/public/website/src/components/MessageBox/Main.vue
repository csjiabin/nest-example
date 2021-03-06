<template>
  <transition name="msgbox-fade">
    <div
      class="fow-message-box__wrapper"
      tabindex="-1"
      v-show="visible"
      @click.self="handleWrapperClick"
      role="dialog"
      aria-modal="true"
      :aria-label="title || 'dialog'">
      <div class="fow-message-box" :class="[customClass, center && 'fow-message-box--center']">
        <div class="fow-message-box__header" v-if="title !== undefined">
          <div class="fow-message-box__title">
            <div class="fow-message-box__status" :class="[ typeClass ]" v-if="typeClass && center"></div>
            <span>{{ title }}</span>
          </div>
          <button type="button"
                  class="fow-message-box__headerbtn"
                  aria-label="Close"
                  v-if="showClose"
                  @click="handleAction('cancel')"
                  @keydown.enter="handleAction('cancel')">
            <i class="fow-message-box__close fow-icon-close"></i>
          </button>
        </div>
        <div class="fow-message-box__content" v-if="message !== ''">
          <div class="fow-message-box__status" :class="[ typeClass ]" v-if="typeClass && !center"></div>
          <div class="fow-message-box__message">
            <slot>
              <p v-if="!dangerouslyUseHTMLString&&$type !== 'prompt'">{{ message }}</p>
              <p v-if="dangerouslyUseHTMLString&&$type !== 'prompt'" v-html="message"></p>
            </slot>
          </div>
          <div class="fow-message-box__input" v-show="showInput">
            <md-field :class="messageClass">
              <label>{{message}}</label>
              <md-input required
                v-model="inputValue"
                @compositionstart.native="handleComposition"
                @compositionupdate.native="handleComposition"
                @compositionend.native="handleComposition"
                @keyup.enter.native="handleKeyup"
                :placeholder="inputPlaceholder"
               ref="input"></md-input>
              <span class="md-error">{{editorErrorMessage}}</span>
            </md-field>
            <!-- <div class="fow-message-box__errormsg" :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }">
              {{ editorErrorMessage }}
            </div> -->
          </div>
        </div>
        <div class="fow-message-box__btns">
          <md-button
            :loading="cancelButtonLoading"
            class="md-raised md-accent"
            :class="[ cancelButtonClasses ]"
            v-show="showCancelButton"
            @click.native="handleAction('cancel')"
            @keydown.enter="handleAction('cancel')"
          >
            {{ cancelButtonText || '取消' }}
          </md-button>
          <md-button
            ref="confirm"
            class="md-raised md-primary"
            :class="[ confirmButtonClasses ]"
            v-show="showConfirmButton"
            @click.native="handleAction('confirm')"
            @keydown.enter="handleAction('confirm')"
          >
            {{ confirmButtonText || '确定' }}
          </md-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
import Popup from '../utils/popup'
import Locale from '../utils/mixins/locale'
import { addClass, removeClass } from '../utils/dom'
import Dialog from '../utils/aria-dialog'

let messageBox
let typeMap = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error'
}

export default {
  mixins: [Popup, Locale],

  props: {
    modal: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    closeOnHashChange: {
      type: Boolean,
      default: true
    },
    center: {
      default: false,
      type: Boolean
    }
  },

  computed: {
    typeClass () {
      return this.type && typeMap[this.type] ? `fow-icon-${typeMap[this.type]}` : ''
    },

    confirmButtonClasses () {
      return `fow-button--primary ${this.confirmButtonClass}`
    },
    cancelButtonClasses () {
      return `${this.cancelButtonClass}`
    },
    messageClass () {
      return {
        'md-invalid': this.hasMessages
      }
    }
  },

  methods: {
    handleComposition (event) {
      if (event.type === 'compositionend') {
        setTimeout(() => {
          this.isOnComposition = false
        }, 100)
      } else {
        this.isOnComposition = true
      }
    },
    handleKeyup () {
      !this.isOnComposition && this.handleAction('confirm')
    },
    getSafeClose () {
      const currentId = this.uid
      return () => {
        this.$nextTick(() => {
          if (currentId === this.uid) this.doClose()
        })
      }
    },
    doClose () {
      if (!this.visible) return
      this.visible = false
      this._closing = true

      this.onClose && this.onClose()
      messageBox.closeDialog() // 解绑
      if (this.lockScroll) {
        setTimeout(() => {
          if (this.modal && this.bodyOverflow !== 'hidden') {
            document.body.style.overflow = this.bodyOverflow
            document.body.style.paddingRight = this.bodyPaddingRight
          }
          this.bodyOverflow = null
          this.bodyPaddingRight = null
        }, 200)
      }
      this.opened = false

      if (!this.transition) {
        this.doAfterClose()
      }
      setTimeout(() => {
        if (this.action) this.callback(this.action, this)
      })
    },

    handleWrapperClick () {
      if (this.closeOnClickModal) {
        this.handleAction('cancel')
      }
    },

    handleAction (action) {
      if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
        return
      }
      this.action = action
      if (typeof this.beforeClose === 'function') {
        this.close = this.getSafeClose()
        this.beforeClose(action, this, this.close)
      } else {
        this.doClose()
      }
    },

    validate () {
      if (this.$type === 'prompt') {
        var inputPattern = this.inputPattern
        if (inputPattern && !inputPattern.test(this.inputValue || '')) {
          this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法'
          addClass(this.getInputElement(), 'invalid')
          this.hasMessages = true
          return false
        }
        var inputValidator = this.inputValidator
        if (typeof inputValidator === 'function') {
          var validateResult = inputValidator(this.inputValue)
          if (validateResult === false) {
            this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法'
            addClass(this.getInputElement(), 'invalid')
            this.hasMessages = true

            return false
          }
          if (typeof validateResult === 'string') {
            this.editorErrorMessage = validateResult
            this.hasMessages = true
            return false
          }
        }
      }
      this.editorErrorMessage = ''
      this.hasMessages = false
      removeClass(this.getInputElement(), 'invalid')
      return true
    },
    getFistFocus () {
      const $btns = this.$el.querySelector('.fow-message-box__btns .fow-button')
      const $title = this.$el.querySelector('.fow-message-box__btns .fow-message-box__title')
      return ($btns && $btns[0]) || $title
    },
    getInputElement () {
      const inputRefs = this.$refs.input.$refs
      return inputRefs.input || inputRefs.textarea
    }
  },

  watch: {
    inputValue: {
      immediate: true,
      handler (val) {
        this.$nextTick(_ => {
          if (this.$type === 'prompt' && val !== null) {
            this.validate()
          }
        })
      }
    },

    visible (val) {
      if (val) {
        this.uid++
        if (this.$type === 'alert' || this.$type === 'confirm') {
          this.$nextTick(() => {
            this.$refs.confirm.$el.focus()
          })
        }
        this.focusAfterClosed = document.activeElement
        messageBox = new Dialog(this.$el, this.focusAfterClosed, this.getFistFocus())
      }

      // prompt
      if (this.$type !== 'prompt') return
      if (val) {
        setTimeout(() => {
          if (this.$refs.input && this.$refs.input.$el) {
            this.$refs.input.$el.focus()
          }
        }, 500)
      } else {
        this.editorErrorMessage = ''
        removeClass(this.getInputElement(), 'invalid')
      }
    }
  },

  mounted () {
    if (this.closeOnHashChange) {
      window.addEventListener('hashchange', this.close)
    }
  },

  beforeDestroy () {
    if (this.closeOnHashChange) {
      window.removeEventListener('hashchange', this.close)
    }
    setTimeout(() => {
      messageBox.closeDialog()
    })
  },

  data () {
    return {
      uid: 1,
      title: undefined,
      message: '',
      type: '',
      customClass: '',
      showInput: false,
      inputValue: null,
      inputPlaceholder: '',
      inputType: 'text',
      inputPattern: null,
      inputValidator: null,
      inputErrorMessage: '',
      showConfirmButton: true,
      showCancelButton: false,
      action: '',
      confirmButtonText: '',
      cancelButtonText: '',
      confirmButtonLoading: false,
      cancelButtonLoading: false,
      confirmButtonClass: '',
      confirmButtonDisabled: false,
      cancelButtonClass: '',
      editorErrorMessage: null,
      callback: null,
      dangerouslyUseHTMLString: false,
      focusAfterClosed: null,
      isOnComposition: false,
      hasMessages: false
    }
  }
}
</script>
