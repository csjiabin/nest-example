const langs = require.context('./lang', true, /\.js$/)
let locale = {}
langs.keys().forEach(key => {
  let lang = key.split(/(\.\/)|(\.js)/)[3]
  locale[lang] = require(`./lang/${lang}.js`).default
})

export default {
  ...locale,
  dateTimeFormats: {
    'en-US': {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }
    },
    'zh-CN': {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }
    }
  }
}
// var arr = [1, 2, 3, 4, 5, 6, 7, 8]
// var index = 0
// var length = arr.length
// setInterval(function () {
//   // 自增
//   console.log(arr[index++ % length])
//   // 自减
//   // console.log(arr[index=(index+length-1)%length]);
// }, 1000)
/*
// 性能测试
console.time('start')
for (var i = 0; i < 50000; i++) {
  // eslint-disable-next-line
  arr[index++ % length]
};
console.timeEnd('end') // 60ms左右
console.time('start')
// eslint-disable-next-line
for (var i = 0; i < 50000; i++) {
  if (++index >= length) {
    index = 0
  }
  // eslint-disable-next-line
  arr[index];
}
*/
