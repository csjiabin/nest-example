<template>
  <div class="right-about">
    <md-card>
      <md-card-header>
        <!-- <md-avatar>
                  <img src="https://vuematerial.io/assets/examples/card-example.jpg" alt="Avatar">
                </md-avatar> -->
        <div class="md-title">{{$t('aboutMe')}}</div>
      </md-card-header>
      <md-card-media>
        <md-avatar class="md-large">
          <img src="https://avatars1.githubusercontent.com/u/20592953?s=460&v=4" alt="avatar">
        </md-avatar>
      </md-card-media>
      <md-card-content>
        {{detail.desc || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea nostrum.'}}
      </md-card-content>
      <!-- <md-card-actions class="external-link">
    
        </md-card-actions> -->
    </md-card>
    <md-card>
      <md-card-content>
        <md-list class="md-dense">
          <md-list-item @click="skipExternalLink('https://github.com/csjiabin')">
            <md-icon :md-src="githubsvg"></md-icon>
            <span class="md-list-item-text">
              github.com/csjiabin
            </span>
          </md-list-item>
          <md-list-item @click="skipExternalLink('mailto:1187712426@qq.com')">
            <md-icon>email</md-icon>
            <span class="md-list-item-text">
                1187712426@qq.com
              </span>
          </md-list-item>
          <md-list-item @click="skipExternalLink('http://wpa.qq.com/msgrd?v=3&uin=1187712426&site=qq&menu=yes')">
            <md-icon :md-src="qqsvg"></md-icon>
            <span class="md-list-item-text">
                1187712426
              </span>
          </md-list-item>
          <!-- <md-divider class="md-inset"></md-divider>
            <md-list-item>
              <md-avatar>
                <img src="https://placeimg.com/40/40/people/5" alt="People">
              </md-avatar>
              <span class="md-list-item-text">Abbey Christansen</span>
              <md-button class="md-icon-button md-list-action">
                <md-icon class="md-primary">chat_bubble</md-icon>
              </md-button>
            </md-list-item> -->
        </md-list>
      </md-card-content>
    </md-card>
  </div>
</template>
<script>
  import githubsvg from '@assets/github.svg'
  import qqsvg from '@assets/qq.svg'
  export default {
    data () {
      return {
        githubsvg,
        qqsvg
      }
    },
    computed: {
      detail () {
        return this.$store.getters['user/detail']
      }
    },
    methods: {
      async userDetail () {
        await this.$store.dispatch('user/getDetail', 1)
      },
      skipExternalLink (action) {
        window.open(action)
      }
    },
    async mounted () {
      await this.userDetail()
    }
  }
</script>
<style lang="scss">
  .right-about {
    .md-card {
      margin-bottom: 10px;
      .md-card-header {
        padding: 16px;
      }
      .md-card-content {
        padding-bottom: 10px;
      }
      .md-avatar.md-large {
        min-width: 150px;
        min-height: 150px;
        border-radius: 8px;
        left: 50%;
        margin-left: -75px;
      }
      .external-link {
        justify-content: center;
      }
    }
  }
</style>
