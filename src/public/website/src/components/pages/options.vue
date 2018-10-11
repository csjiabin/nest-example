<template>
    <div v-if="showSizer || showElevator" :class="optsClasses">
        <div v-if="showElevator" :class="ElevatorClasses">
            跳至
            <!-- <md-field md-inline>
              <label>Inline</label>
              <md-input
                v-model="current"
                autocomplete="off"
                spellcheck="false"
                @keyup.enter.once="changePage"></md-input>
            </md-field> -->
            <input
              type="text"
              :value="current"
              autocomplete="off"
              spellcheck="false"
              @keyup.enter.once="changePage"
              @blur="blurPage"
            >
            页
        </div>
    </div>
</template>
<script>

const prefixCls = 'page'

function isValueNumber (value) {
  return (/^[1-9][0-9]*$/).test(value + '')
}

export default {
  name: 'PageOption',
  props: {
    pageSizeOpts: Array,
    showSizer: Boolean,
    showElevator: Boolean,
    current: Number,
    _current: Number,
    pageSize: Number,
    allPages: Number,
    isSmall: Boolean,
    placement: String,
    transfer: Boolean
  },
  data () {
    return {
      currentPageSize: this.pageSize
    }
  },
  watch: {
    pageSize (val) {
      this.currentPageSize = val
    }
  },
  computed: {
    size () {
      return this.isSmall ? 'small' : 'default'
    },
    optsClasses () {
      return [
        `${prefixCls}-options`
      ]
    },
    sizerClasses () {
      return [
        `${prefixCls}-options-sizer`
      ]
    },
    ElevatorClasses () {
      return [
        `${prefixCls}-options-elevator`
      ]
    }
  },
  methods: {
    changeSize () {
      this.$emit('on-size', this.currentPageSize)
    },
    changePage (event) {
      let val = event.target.value.trim()
      let page = 0

      if (isValueNumber(val)) {
        val = Number(val)
        if (val !== this.current) {
          const allPages = this.allPages

          if (val > allPages) {
            page = allPages
          } else {
            page = val
          }
        }
      } else {
        page = 1
      }

      if (page) {
        this.$emit('on-page', page)
        event.target.value = page
      }
    },
    blurPage (event) {
      let val = event.target.value.trim()
      if (!val) {
        this.$emit('on-page', 1)
        event.target.value = 1
      }
    }
  }
}
</script>
