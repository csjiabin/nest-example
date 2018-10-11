<template>
  <div class="page-box">
    <ul class="pagination">
      <li class="page-li page-prev" :class="{'no-prev':currentPage===1}">上一页</li>
      <li :class="{'page-active':currentPage===1}" class="page-li page-number" data-number=1 @click="switchPage(1)">1</li>
      <template v-if="totalPageCount - 2 > maxShowBtnCount">
          <li :class="`page-li number-ellipsis ellipsis-head`" style="display: none;">...</li>
          <template v-for="i in maxShowBtnCount+1">
            <li :key="i" :class="`page-li page-number ${i+1 === currentPage ? state.activeCName : ''}`" :data-number='i+1' @click="switchPage(i+1)">{{i+1}}</li>
          </template>
          <li :class="`page-li number-ellipsis ellipsis-tail`">...</li>
          <li :class="`page-li page-number ${totalPageCount === currentPage ? state.activeCName : ''}`" :data-number='`${totalPageCount}`' @click="switchPage(totalPageCount)">{{totalPageCount}}</li>
      </template>
      <template v-else>
        <template v-for="i in totalPageCount-1">
          <li :key="i" :class="`page-li page-number`" :data-number='i'>{{i}}</li>
        </template>
      </template>
      <li class="page-li page-next" :class="{'no-next':totalPageCount === 1 ||totalPageCount === currentPage}">下一页</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'page',
  data () {
    return {
      state: {
        // 页面元素的外部容器
        container: this.container,
        // 不包括开头和结尾的两个固定按钮外，中间最多展示几个数字页码按钮
        maxShowBtnCount: this.maxShowBtnCount,
        // 所有的页码元素，包括上一页、下一页
        pCName: 'page-li',
        // 当选中页码时添加的类名class
        activeCName: 'page-active',
        // 代表页码数字的属性
        dataNumberAttr: 'data-number',
        // 上一页 按钮的类名class
        prevCName: 'page-prev',
        // 下一页 按钮的类名class
        nextCName: 'page-next',
        // 禁用 上一页 按钮时给此按钮添加的类名class
        disbalePrevCName: 'no-prev',
        // 禁用 下一页 按钮时给此按钮添加的类名class
        disbaleNextCName: 'no-next',
        // 不包括 上一页 下一页 省略号 按钮的页码元素类名
        pageNumberCName: 'page-number',
        // 触发切换页面的事件
        swEvent: 'click',
        activePosition: 0
      },
      currentPage: 1
    }
  },
  props: {
    container: {
      type: String,
      default: 'page-box'
    },
    totalPageCount: Number,
    pageSize: {
      type: Number,
      default: 10
    },
    maxShowBtnCount: {
      type: Number,
      default: 5
    }
  },
  methods: {
    selectorEle (selector, all = false) {
      return all ? document.querySelectorAll(selector) : document.querySelector(selector)
    },
    switchPage (page) {
      this.currentPage = page
    }
  },
  mounted () {
    this.$nextTick(() => {
      // 当需要省略符号占位时，确定 active的位置
      this.totalPageCount > this.maxShowBtnCount + 2 &&
        (this.state.activePosition = Math.ceil(this.maxShowBtnCount / 2))
    })
  }
}
</script>
<style lang="scss">
@import "./page.scss";
</style>
