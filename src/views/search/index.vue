<template>
  <div>
    <!-- 搜索框 -->
    <van-search placeholder="请输入搜索关键词"
                v-model="keyword"
                show-action
                @search="doSearch(keyword)"
                @cancel="doCancel" />
    <!-- 联想框 -->
    <van-cell-group>
      <van-cell v-for="
                (item,index)
                in
                thinkList"
                :key="index"
                icon="search"
                @click="doSearch(item.item)">
        <!-- 内容title插槽 -->
        <template slot="title">
          <!-- 渲染联想的内容 -->
          <div v-html="item.newItem"></div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { thinkArticle } from '@/api/article'

export default {
  name: 'search',
  data() {
    return {
      keyword: '',
      //根据关键字联想的数据
      thinkList: [],
      //定时器处理抖动
      timer: null
    }
  },
  methods: {
    //点击完成时触发
    doSearch(key) {
      //获取关键字
      this.$router.push(`/list/${key}`)
    },
    //点击取消时候触发
    doCancel() {
      return
    }
  },
  watch: {
    keyword: function(newVal, oldVal) {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(async () => {
        //判断输入框是否为空
        if (!newVal.trim().length) {
          //清空联想数据
          this.thinkList = []
          return
        }

        //根据关键字发请求
        let res = await thinkArticle(newVal)
        this.thinkList = res.options

        //处理关键字高光
        this.thinkList = this.thinkList.map(item => {
          return {
            item,
            newItem: item
              .split(newVal)
              .join(`<span style="color:blue">${newVal}</span>`)
          }
        })
        console.log(this.thinkList)
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
.van-search {
  background-color: #3296fa !important;
  .van-search__action {
    font-size: 14px;
    color: #fff;
  }
}
</style>