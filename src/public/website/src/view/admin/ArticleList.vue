<template>
  <div class="admin-article__list">
    <md-table v-model="articleList.list"
    v-loading="loading"
    md-card
    :md-sort.sync="options.currentSort"
    :md-sort-order.sync="options.currentSortOrder"
    :md-sort-fn="customSort">
      <md-table-toolbar>
        <md-field md-clearable class="md-toolbar-section-start">
          <md-input placeholder="Search content..." v-model="options.search" @input="searchOnTable" />
        </md-field>
        <div class="md-toolbar-section-end">
          <!-- <h1 class="md-title">Users</h1> -->
          <md-button class="md-primary" @click="$router.push('/admin/article/create')">{{$t('article.skipcreate')}}</md-button>
        </div>
      </md-table-toolbar>
      <md-table-empty-state
        md-label="No users found"
        :md-description="`No user found for this '${options.search}' query. Try a different search term or create a new user.`">
        <md-button class="md-primary md-raised" @click="newUser">Create New User</md-button>
      </md-table-empty-state>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Title">{{ item.title }}</md-table-cell>
        <md-table-cell md-label="Category">{{ item.category ? item.category.name : '-'}}</md-table-cell>
        <md-table-cell md-label="Desc">{{ item.desc || '-'}}</md-table-cell>
        <md-table-cell md-label="CreateAt">{{item.createAt | dtime}}</md-table-cell>
        <md-table-cell md-label="Options">
          <div style="width:110px;">
            <md-button class="md-icon-button md-dense"  @click="$router.push(`/admin/article/update/${item.id}`)">
              <md-icon>border_color</md-icon>
            </md-button>
            <md-button @click="articleDelete(item.id)" class="md-icon-button md-dense">
              <md-icon>delete</md-icon>
            </md-button>
          </div>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <Pages :total="articleList.count" :current="options.page" show-elevator :page-size="10" @change="pageChange"/>
  </div>
</template>

<script>
  export default {
    name: 'AdminArticleList',
    data () {
      return {
        loading: false,
        timer: null,
        options: {
          page: 1,
          search: null,
          currentSort: 'name',
          currentSortOrder: 'desc'
        }
      }
    },
    computed: {
      articleList () {
        return this.$store.getters['article/articleList']
      }
    },
    methods: {
      newUser () {
        window.alert('Noop')
      },
      async searchOnTable () {
        this.options.page = 1
        await this.getArticles()
      },
      async customSort (list) {
        await this.getArticles()
        return this.articleList.list
      },
      async pageChange (page) {
        this.options.page = page
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
      },
      async articleDelete (id) {
        try {
          this.loading = true
          await this.$store.dispatch('article/articleDelete', id)
          this.loading = false
          this.options.page = 1
          this.$message({
            showClose: true,
            message: this.$t('public.delete.success'),
            type: 'success'
          })
          await this.getArticles()
        } catch (error) {
          this.loading = false
          this.$message({
            showClose: true,
            message: this.$t('public.delete.failure'),
            type: 'error'
          })
        }
      }
    },
    async mounted () {
      await this.getArticles()
    }
  }
</script>

<style lang="scss" scoped>
  .md-field {
    max-width: 250px;
  }
  .admin-article__list{
    .md-icon.md-theme-default.md-icon-font{
      font-size: 18px !important;
    }
  }
</style>
