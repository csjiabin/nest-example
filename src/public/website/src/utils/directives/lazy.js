// Vue 图片懒加载
export default (Vue, options = {}) => {
  // 数组item remove方法

  if (!Array.prototype.remove) {
    Array.prototype.remove = function (item) {
      if (!this.length) return
      var index = this.indexOf(item)
      if (index > -1) {
        this.splice(index, 1)
        return this
      }
    }
  }
  var init = {
    default: 'https://gw.alicdn.com/tps/i1/TB147JCLFXXXXc1XVXXxGsw1VXX-112-168.png'
  }
  // 需要进行监听的图片列表，还没有加载过得
  var listenList = []
  // 已经加载过得图片缓存列表
  var imageCatcheList = []
  // 是否已经加载过了
  const isAlredyLoad = (imageSrc) => {

  }
  // 检测图片是否可以加载，如果可以则进行加载
  const isCanShow = (item) => {

  }
  // 添加监听事件scroll
  const onListenScroll = () => {

  }
  // Vue 指令最终的方法
  const addListener = (ele, binding) => {
    // 绑定的图片地址
    var imageSrc = binding.value
    // 如果已经加载过，则无需重新加载，直接将src赋值
    if (isAlredyLoad(imageSrc)) {
      ele.src = imageSrc
      return false
    }
    var item = {
      ele: ele,
      src: imageSrc
    }
    // 图片显示默认的图片
    ele.src = init.default
    // 再看看是否可以显示此图片
    if (isCanShow(item)) {
      return
    }
    // 否则将图片地址和元素均放入监听的lisenList里
    listenList.push(item)

    // 然后开始监听页面scroll事件
    onListenScroll()
  }

  Vue.directive('lazyload', {
    inserted: addListener,
    updated: addListener
  })
}
