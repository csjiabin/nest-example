import Home from '@view/Home'
import Article from '@view/Article'
import AdminMain from '@view/admin/AdminMain'
import CreateOrUpdateArticle from '@view/admin/CreateOrUpdateArticle'
import ArticleList from '@view/admin/ArticleList'
export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/article/:id',
    name: 'article-detail',
    component: Article
  },
  {
    path: '/admin',
    component: AdminMain,
    children: [
      {
        path: '/admin/article/create',
        name: 'article-create',
        component: CreateOrUpdateArticle
      }, {
        path: '/admin/article/list',
        name: 'article-list',
        component: ArticleList
      }, {
        path: '/admin/article/update/:id',
        name: 'article-update',
        component: CreateOrUpdateArticle
      }
    ]
  }
]
