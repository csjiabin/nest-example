<template>
  <md-app ref="layout" class="layout-app">
    <md-app-toolbar class="md-primary">
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
          <span class="md-title">
                  <router-link to="/" class="skip-home">{{$t('title')}}</router-link>
                </span>
        </div>
        <!-- <md-autocomplete
                class="search"
                v-model="selectedEmployee"
                :md-options="employees"
                md-layout="box">
                <label>Search...</label>
              </md-autocomplete> -->
        <div class="md-toolbar-section-end">
          <!-- <md-button class="md-icon-button">
                  <md-icon>refresh</md-icon>
                </md-button> -->
          <!-- <md-button @click="changeLocale" class="md-icon-button">
                  <md-icon>more_vert</md-icon>
                </md-button> -->
          <md-button @click="changeLocale">
            {{$i18n.locale}}
          </md-button>
        </div>
      </div>
    </md-app-toolbar>
    <md-app-content>
      <div class="container">
        <div class="md-layout">
          <div class="md-layout-item md-size-70 md-small-size-100">
            <slot></slot>
          </div>
          <div class="md-layout-item md-size-30 md-small-size-100">
            <right-about/>
          </div>
        </div>
      </div>
      <div class="footer">闽ICP备17017246号 &copy; hjbnice.com</div>
    </md-app-content>
  </md-app>
</template>
<script>
  import RightAbout from './RightAbout.vue'
  export default {
    name: 'Layout',
    components: {
      RightAbout
    },
    data () {
      return {
        selectedEmployee: null,
        employees: [
          'Jim Halpert',
          'Dwight Schrute',
          'Michael Scott',
          'Pam Beesly',
          'Angela Martin',
          'Kelly Kapoor',
          'Ryan Howard',
          'Kevin Malone',
          'Creed Bratton',
          'Oscar Nunez',
          'Toby Flenderson',
          'Stanley Hudson',
          'Meredith Palmer',
          'Phyllis Lapin-Vance'
        ]
      }
    },
    methods: {
      changeLocale () {
        let locale = this.$i18n.locale
        this.$i18n.locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'
        localStorage.setItem('LANG', locale === 'zh-CN' ? 'en-US' : 'zh-CN')
      }
    }
  }
</script>

<style lang="scss">
  .layout-app {
    min-height: 350px;
    height: 100%;
    background-color: #f2f3f5 !important;
    overflow-x: hidden;
    .skip-home {
      color: #fff !important;
      text-decoration: none !important;
    }
    .md-toolbar.md-app-toolbar {
      // background-color: transparent;
    }
    .md-drawer {
      background-color: #f2f3f5 !important;
    }
    .md-app-container,
    .md-content.md-app-content {
      overflow-x: hidden;
      height: 100%;
      background-color: #f2f3f5 !important;
    }
    .md-app-content {
      padding: 0
    }
  }
  .footer {
    text-align: center;
    color: #9faebd;
    padding: 20px 0;
  }
  .container {
    width: 100%;
    padding: 30px 15px 0;
    margin-right: auto;
    margin-left: auto;
    .md-app-content .md-card {
      margin-right: 10px;
      margin-left: 10px;
    }
  }
  @media (min-width: 576px) {
    .container {
      max-width: 540px;
    }
  }
  @media (min-width: 768px) {
    .container {
      max-width: 720px;
    }
  }
  @media (min-width: 992px) {
    .container {
      max-width: 960px;
    }
  }
  @media (min-width: 1200px) {
    .container {
      max-width: 1140px;
    }
  }
  @media (min-width: 1600px) {
    .container {
      max-width: 1320px;
    }
  }
</style>