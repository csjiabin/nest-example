<template>
  <md-card class="home-article__list" md-with-hover>
    <md-card-header>
      <div class="md-title">{{row.title}}</div>
      <div class="md-subhead">
        {{$d(new Date(row.createAt) , 'long')}}
        <!-- {{row.createAt | dtime('yyyy-MM-dd hh:mm:ss')}}&nbsp; -->
        {{row.category ? row.category.name : ''}}
      </div>
    </md-card-header>
    <md-card-content>
      <div class="desc-or-content" v-html="substring"></div>
    </md-card-content>
    <md-card-actions>
      <md-button @click="skip(row.id)" class="md-primary">
        {{$t('read-more')}}
      </md-button>
    </md-card-actions>
  </md-card>
</template>
<script>
  export default {
    name: 'ArticleCard',
    props: {
      row: Object
    },
    computed: {
      substring () {
        if (this.row.desc) return this.row.desc
        if (this.row.content) return this.row.content.substring(0, 80)
        return '-'
      }
    },
    methods: {
      skip (id) {
        this.$router.push(`/article/${id}`)
      }
    }
  }
</script>
<style lang="scss">
  .md-card.home-article__list {
    // margin-top: 10px;
    .md-card-header {
      padding: 0 16px;
      padding-top: 8px;
    }
    .md-card-content {
      padding-bottom: 0;
      img {
        max-height: 100px;
      }
    }
    .router-skip {
      text-decoration: none;
    }
  }
</style>
