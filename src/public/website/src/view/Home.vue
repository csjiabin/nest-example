<template>
  <div class="home" v-loading="loading">
      <article-card v-for="item in articleList.list" :row="item" :key="item.id"/>
      <Pages :total="articleList.count" show-elevator :page-size="10" @change="pageChange"/>
  </div>
</template>
<script>
import ArticleCard from '../components/ArticleCard.vue'
export default {
  components: {
    ArticleCard
  },
  data () {
    return {
      loading: false,
      options: {
        page: 1,
        search: null
      }
    }
  },
  computed: {
    articleList () {
      return this.$store.getters['article/articleList']
    }
  },
  methods: {
    async pageChange (page) {
      this.page = page
      await this.getArticles()
    },
    async getArticles () {
      clearTimeout(this.thimer)
      this.loading = true
      this.thimer = setTimeout(async () => {
        try {
          let params = {...this.options}
          params.page--
          await this.$store.dispatch('article/getArticleList', {
            ...params,
            pagesize: 10
          })
          this.loading = false
        } catch (error) {
          this.loading = false
        }
      }, 200)
    }
  },
  async mounted () {
    await this.getArticles()
  }
}
</script>

<style lang="scss">
.md-card{
  margin-bottom: 10px;
}
</style>
