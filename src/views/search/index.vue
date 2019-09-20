<template>
  <div>
    <!-- 搜索框 -->
    <van-search placeholder="请输入搜索关键词"
                v-model="keyword"
                show-action
                @search="doSearch(keyword)"
                @cancel="doCancel" />
    <!-- 联想框 -->
    <van-cell-group v-if="thinkList.length !== 0">
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
    <!-- 历史记录 -->
    <van-cell-group v-else>
      <van-cell title="搜索历史">
        <!-- 插槽 -->
        <template slot="right-icon">
          <van-icon name="delete"
                    @click="isShow=true"
                    v-show="!isShow" />
          <div v-show="isShow">
            <span @click="delALL">全部删除 </span>
            <span @click="isShow=false"> 完成</span>
          </div>
        </template>
      </van-cell>
      <!-- 历史内容展示区域 -->
      <van-cell v-for="(item, index) in searhHistory"
                :key="index"
                :title="item"
                icon="search"
                clickable
                @click="doSearch(item)">
        <template slot="right-icon">
          <van-icon name="close"
                    v-show="isShow"
                    @click="doDel(index)" />
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
      timer: null,
      //是否显示删除按钮
      isShow: false,
      //历史记录.   从本地取不到就设置默认值为空
      searhHistory: JSON.parse(window.localStorage.getItem('search')) || []
    }
  },
  methods: {
    //点击完成时触发
    doSearch(key) {
      //获取关键字
      this.$router.push(`/list/${key}`)

      //将搜索的历史保存起来
      this.searhHistory.unshift(key)
      //去重
      this.searhHistory = [...new Set(this.searhHistory)]
      //将数据保存到本地
      window.localStorage.setItem('search', JSON.stringify(this.searhHistory))
    },
    //点击取消时候触发
    doCancel() {
      return
    },
    //删除搜索记录
    doDel(index) {
      this.searhHistory.splice(index, 1)
      //更新到本地
      window.localStorage.setItem('search', JSON.stringify(this.searhHistory))
    },
    //删除全部搜索记录
    delALL() {
      this.searhHistory = []
      window.localStorage.removeItem('search')
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
        // console.log(this.thinkList)
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