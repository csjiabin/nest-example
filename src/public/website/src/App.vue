<template>
  <div id="app">
    <layout ref="layout">
      <!-- <transition :name="viewTransition" :css="!!direction"> -->
        <router-view class="router-view"></router-view>
      <!-- </transition> -->
    </layout>
    <transition name="fade">
      <md-button v-if="scrollTop > 20" @click="backTopClick" class="md-icon-button md-raised back-top">
        <md-icon>expand_less</md-icon>
      </md-button>
    </transition>
  </div>
</template>

<script>
  import wisdom from '@utils/wisdom'
  import Layout from './components/Layout.vue'
  export default {
    name: 'app',
    components: {
      Layout
    },
    data () {
      return {
        scrollTop: 0,
        main: null
      }
    },
    computed: {
      direction () {
        return this.$store.state.pop.direction
      },
      viewTransition () {
        if (!this.direction) return ''
        return 'pop-' + (this.direction === 'forward' ? 'in' : 'out')
      }
    },
    watch: {
      '$route.path' (n, o) {
        // this.backTopClick()
      }
    },
    methods: {
      backTopClick () {
        this.$nextTick(() => {
          const main = this.$refs.layout.$el.children[0]
          let top = main.scrollTop
          let step = Math.floor(top / 20)
          let timer = null
          timer = setInterval(() => {
            if (top <= 0) {
              clearInterval(timer)
            }
            top -= step
            main.scrollTop = top
          }, 15)
        })
      }
    },
    mounted () {
      this.$nextTick(() => {
        const main = this.$refs.layout.$el.children[0]
        this.main = main
        this.$store.dispatch('getMain', main)
        main.addEventListener('scroll', (ev) => {
          this.scrollTop = main.scrollTop
        })
      })
    },
    beforeCreate (to, from, next) {
      let randomNum = parseInt(100 * Math.random())
      document.title = 'website - ' + wisdom[randomNum]
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
    overflow: hidden;
  }
</style>
