<template>
  <div>
    <form novalidate @submit.prevent="submit">
      <md-card>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-100">
              <md-field :class="getValidationClass('title')">
                <label for="title">{{$t('article.create.title')}}</label>
                <md-input name="title" id="title" v-model="form.title" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.title.required">
                {{$t('article.create.title')}}{{$t('public.vuelidate.required')}}
              </span>
                <span class="md-error" v-else-if="!$v.form.title.diyMaxLen">The title is diyMaxLen</span>
              </md-field>
            </div>
           <div class="md-layout-item md-size-50">
            <md-field :class="getValidationClass('categoryId')">
              <label for="category">{{$t('article.create.category')}}</label>
              <md-select v-model="form.categoryId" name="categoryId" id="category">
                <md-option :value="item.id" v-for="item in categoryList.list" :key="item.id">{{item.name}}</md-option>
              </md-select>
              <span class="md-error" v-if="!$v.form.categoryId.required">
                {{$t('article.create.category')}}{{$t('public.vuelidate.required')}}
              </span>
            </md-field>
           </div>
           <div class="md-layout-item md-size-50">
            <md-field>
              <label for="tags">{{$t('article.create.tag')}}</label>
              <md-select v-model="form.tags" name="tags" id="tags" multiple>
                <md-option value="fight-club">Fight Club</md-option>
                <md-option value="godfather">Godfather</md-option>
                <md-option value="godfather-ii">Godfather II</md-option>
                <md-option value="godfather-iii">Godfather III</md-option>
                <md-option value="godfellas">Godfellas</md-option>
                <md-option value="pulp-fiction">Pulp Fiction</md-option>
                <md-option value="scarface">Scarface</md-option>
              </md-select>
            </md-field>
           </div>
           <div class="md-layout-item md-size-100">
            <md-field :class="getValidationClass('desc')">
              <label for="desc">{{$t('article.create.desc')}}</label>
              <md-input name="desc" id="desc" v-model="form.desc" :disabled="sending" />
              <span class="md-error" v-if="!$v.form.desc.diyMaxLen">The desc is diyMaxLen</span>
            </md-field>
           </div>
           <div class="md-layout-item md-size-100">
            <md-field :class="getValidationClass('content')">
              <label for="content">{{$t('article.create.content')}}</label>
              <mavon-editor style="margin-top:32px;height: 400px;" ref="md" v-model="mavonOption.mavonValue" ishljs @change="mavonChang" @save="mavonSave" :subfield="false" codeStyle="vs2015" :toolbars="mavonOption.toolbars" @imgAdd="mavonImgAdd" @imgDel="mavonImgDel"
                id="content" v-validate="'required'" />
              <!-- <span class="md-error" v-if="errors.has('content')"></span> -->
              <span class="md-error" v-if="!$v.form.content.required">
                {{$t('article.create.content')}}{{$t('public.vuelidate.required')}}
              </span>
            </md-field>
           </div>
          </div>
        </md-card-content>
        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">{{$t('article.create.submit')}}</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>
<script>
  import {
    validationMixin
  } from 'vuelidate'
  import {
    required
  } from 'vuelidate/lib/validators'
  export default {
    name: 'CreateOrUpdateArticle',
    mixins: [validationMixin],
    data () {
      return {
        sending: false,
        loading: false,
        form: {
          title: '',
          desc: '',
          categoryId: '',
          userId: 1,
          content: '',
          quill: '',
          tags: []
        },
        img_file: {},
        mavonOption: {
          mavonValue: '',
          toolbars: {
            bold: true, // 粗体
            italic: true, // 斜体
            header: true, // 标题
            underline: true, // 下划线
            strikethrough: true, // 中划线
            mark: true, // 标记
            superscript: true, // 上角标
            subscript: true, // 下角标
            quote: true, // 引用
            ol: true, // 有序列表
            ul: true, // 无序列表
            link: true, // 链接
            imagelink: true, // 图片链接
            code: true, // code
            table: true, // 表格
            fullscreen: true, // 全屏编辑
            readmodel: true, // 沉浸式阅读
            htmlcode: true, // 展示html源码
            help: true, // 帮助
            /* 1.3.5 */
            undo: true, // 上一步
            redo: true, // 下一步
            trash: true, // 清空
            // save: false, // 保存（触发events中的save事件）
            /* 1.4.2 */
            // navigation: true, // 导航目录
            /* 2.1.8 */
            alignleft: true, // 左对齐
            aligncenter: true, // 居中
            alignright: true, // 右对齐
            /* 2.2.1 */
            subfield: true, // 单双栏模式
            preview: true // 预览
          }
        },
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{
                'header': 1
              }, {
                'header': 2
              }],
              [{
                'list': 'ordered'
              }, {
                'list': 'bullet'
              }],
              [{
                'script': 'sub'
              }, {
                'script': 'super'
              }],
              [{
                'indent': '-1'
              }, {
                'indent': '+1'
              }],
              [{
                'direction': 'rtl'
              }],
              [{
                'size': ['small', false, 'large', 'huge']
              }],
              [{
                'header': [1, 2, 3, 4, 5, 6, false]
              }],
              [{
                'font': []
              }],
              [{
                'color': []
              }, {
                'background': []
              }],
              [{
                'align': []
              }],
              ['clean'],
              ['link', 'image', 'video']
            ],
            syntax: {
              highlight: text => this.$hljs.highlightAuto(text).value
            }
          },
          placeholder: '请输入...'
        }
      }
    },
    validations: {
      form: {
        title: {
          required,
          diyMaxLeng: (value) => {
            return value.length <= 50
          }
        },
        desc: {
          diyMaxLeng (value) {
            return value.length <= 100
          }
        },
        categoryId: {
          required
        },
        content: {
          required
        }
      }
    },
    computed: {
      // editor () {
      //   return this.$refs.myQuillEditor.quill
      // },
      contentCode () {
        return this.form.content
      },
      categoryList () {
        return this.$store.getters['category/categoryList']
      },
      detail () {
        return this.$store.getters['article/articleDetail']
      }
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]
        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      async mavonImgAdd (pos, file) {
        try {
          this.img_file[pos] = file
          // 第一步.将图片上传到服务器.
          var formdata = new FormData()
          formdata.append('file', file)
          const {
            data
          } = await this.$http.uploadFile(formdata)
          console.log(data)
          this.$refs.md.$img2Url(pos, data.url)
          this.form.content = this.form.content + ' '
        } catch (error) {
          console.error(error)
        }
      },
      mavonImgDel (pos) {
        delete this.img_file[pos]
      },
      mavonChang (value, render) {
        this.form.content = render
      },
      mavonSave (value, render) {
        console.log(value, render)
      },
      async getCategoryList () {
        try {
          await this.$store.dispatch('category/getCategoryList')
        } catch (error) {
          console.error(error)
        }
      },
      async submit () {
        this.sending = true
        console.log(this.$refs.md.d_render)
        this.sending = false
        this.$v.$touch()
        console.log(this.detail)
        if (this.$v.$invalid) return false
        if (!this.$route.params.id) return this.articleAdd()
        this.articleUpdate()
        // eslint-disable-next-line
      },
      async articleAdd () {
        try {
          await this.$store.dispatch('article/articleAdd', this.form)
          this.$message({
            showClose: true,
            message: this.$t('public.create.success'),
            type: 'success'
          })
          this.$router.push('/admin/article/list')
        } catch (error) {
          this.$message({
            showClose: true,
            message: this.$t('public.create.failure'),
            type: 'error'
          })
        }
      },
      async articleUpdate () {
        try {
          await this.$store.dispatch('article/articleUpdate', this.form)
          this.$message({
            showClose: true,
            message: this.$t('public.update.success'),
            type: 'success'
          })
          this.$router.push('/admin/article/list')
        } catch (error) {
          this.$message({
            showClose: true,
            message: this.$t('public.update.failure'),
            type: 'error'
          })
        }
      },
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
      }
    },
    async mounted () {
      await this.getCategoryList()
    },
    async created () {
      if (this.$route.params.id) {
        await this.getArticleDetail()
        Object.keys(this.form).forEach(key => {
          this.form[key] = this.detail[key]
        })
        this.form.categoryId = this.detail['category'].id
        this.form.userId = 1
        this.mavonOption.mavonValue = this.detail.content
        this.form.id = this.$route.params.id
      }
    }
  }
</script>
<style lang="scss">
.quill-code {
  border: none;
  height: auto;
  > code {
    width: 100%;
    margin: 0;
    padding: 1rem;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0;
    height: 10rem;
    overflow-y: auto;
    resize: vertical;
  }
}
</style>
