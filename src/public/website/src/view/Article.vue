<template>
  <div class="article-detail" ref="detail">
    <md-card v-loading="loading" ref="article">
      <md-card-header>
        <div class="md-title">{{detail.title}}</div>
        <div class="md-subhead">{{detail.createAt | dtime('yyyy-MM-dd hh:mm:ss')}}</div>
      </md-card-header>
      <md-card-content>
        <div ref="content" v-html="detail.content"></div>
        <ul class="nav-list">
          <li v-for="(tag,index) in tagsMenu" :key="index" :class="tag.tagName" @click="offsetTop(tag.val)">
            {{tag.val}}
          </li>
        </ul>
      </md-card-content>
    </md-card>
  </div>
</template>
<script>
  export default {
    name: 'ArticleDetail',
    data () {
      return {
        loading: false,
        tagsMenu: []
      }
    },
    computed: {
      detail () {
        return this.$store.getters['article/articleDetail']
      },
      parentMain () {
        return this.$store.getters['main']
      }
    },
    methods: {
      async getArticleDetail () {
        this.loading = true
        try {
          await this.$store.dispatch(
            'article/getArticleDetail',
            this.$route.params.id
          )
          this.loading = false
        } catch (error) {
          this.loading = false
        }
      },
      offsetTop (id) {
        const offsetTop = document.getElementById(id).offsetTop + this.$refs.detail.offsetTop
        let top = this.parentMain.scrollTop
        let step = Math.floor(top / 20)
        let timer = null
        timer = setInterval(() => {
          if (top <= offsetTop) {
            clearInterval(timer)
          }
          top -= step
          this.parentMain.scrollTop = top
        }, 15)
      }
    },
    async mounted () {
      await this.getArticleDetail()
      this.$nextTick(() => {
        let tagsArr = []
        let tags = this.$refs.content.getElementsByTagName('*')
        for (const key in tags) {
          const el = tags[key]
          if (el.nodeType === 1) {
            let tagName = el.tagName.toLowerCase()
            if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3' || tagName === 'h4' || tagName === 'h5' || tagName === 'h6') {
              el.setAttribute('id', el.innerText)
              tagsArr.push({
                tagName,
                val: el.innerText
              })
            }
          }
        }
        this.tagsMenu = tagsArr
        // 定义一个数组用于存放相同的元素
      })
    }
  }
</script>
<style lang="scss">
  .article-detail {
    .md-card-content{
      padding-bottom: 10px !important;
    }

    img {
      max-height: 100px;
    }
    .nav-list{
      list-style: none;
      padding: 0;
    }
    .h1{
      padding-left: 10px;
    }
    .h2{
      padding-left: 20px;
    }
    .h3{
      padding-left: 30px;
    }
    .h4{
      padding-left: 40px;
    }
    .h5{
      padding-left: 50px;
    }
    .h6{
      padding-left: 60px;
    }
  }
</style>
