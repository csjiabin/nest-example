import axios from 'axios'
import * as md5 from 'md5'
import Message from '@components/Message'
// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // axios.defaults.headers.common['signature'] = 'signature'
    let timestamp = Date.now()
    config.headers['signature'] = md5(JSON.stringify({ timestamp: timestamp + '', data: config.data || {} }))
    config.headers['timestamp'] = timestamp
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  })
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    const { status, data } = error.response
    if (error.response) {
      switch (status) {
        case 500:
          Message({
            showClose: true,
            message: '系统错误，请联系管理员!',
            type: 'error'
          })
          break
        case 502:
          Message({
            showClose: true,
            message: '系统正在重启...',
            type: 'error'
          })
          break
        case 504:
          Message({
            showClose: true,
            message: '页面请求超时！',
            type: 'error'
          })
          break
      }
    }
    return Promise.reject(
      error.response ? Object.assign({ status }, data) : { message: '页面请求超时！' }
    ) // 返回接口返回的错误信息
  }
)
const api = {
  tagList: params => axios.get(`/api/tag/list`, params),
  categoryList: params => axios.get(`/api/category/list`, params),
  articleList: params => axios.post(`/api/article/list`, params),
  articleAdd: params => axios.post(`/api/article/add`, params),
  articleDetail: id => axios.get(`/api/article/detail/${id}`),
  articleDelete: id => axios.delete(`/api/article/delete/${id}`),
  articleUpdate: params => axios.put(`/api/article/update/${params.id}`, params),
  uploadFile: (params, options) => axios.post(`/api/upload/file`, params, options || {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  uploadFiles: (params, options) => axios.post(`/api/upload/files`, params, options || {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  userDetail: params => axios.get(`/api/user/detail/${params.id}`, params)
}
export default {
  ...axios,
  ...api
}
