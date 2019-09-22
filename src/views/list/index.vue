<template>
  <div>
    <!-- 顶部 -->
    <van-nav-bar fixed
                 title="文章列表"
                 left-arrow
                 @click-left="$router.back()" />
    <!-- 列表展示区 -->
    <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="getDataList">
      <van-cell-group>
        <van-cell :title="item.aut_name"
                  v-for="(item, index) in searchList"
                  :key="index">
          <template slot="label">
            <!-- 文章正文 -->
            <span @click="toDetail(item.art_id)">{{item.title}}</span>
            <!-- 图片 -->
            <van-grid :border="false"
                      :column-num="3"
                      v-if="item.cover.images.length">
              <van-grid-item v-for="(imgItem, imgIndex) in item.cover.images"
                             :key="imgIndex">
                <van-image :src="imgItem"
                           lazy-load />
              </van-grid-item>
            </van-grid>
            <!-- 功能按钮 -->
            <van-grid :border="false"
                      :column-num="3"
                      clickable>
              <van-grid-item>
                <div class="myicon">
                  <van-icon name="comment-o" />
                  <span @click="comment">评论</span>
                </div>
              </van-grid-item>
              <van-grid-item>
                <div class="myicon">
                  <van-icon name="good-job-o" />
                  <span>点赞</span>
                </div>
              </van-grid-item>
              <van-grid-item>
                <div class="myicon">
                  <van-icon name="like-o" />
                  <span>收藏</span>
                </div>
              </van-grid-item>
            </van-grid>

          </template>
        </van-cell>
      </van-cell-group>
    </van-list>

  </div>
</template>

<script>
import { getSearchPage } from '@/api/article'
export default {
  name: 'list',
  data() {
    return {
      //关键字
      keyword: this.$route.params.keyword,
      //默认显示的数据:
      page: 0,
      //页容量
      per_page: 10,
      //搜索的数据集合
      searchList: [],
      //list列表
      loading: false,
      finished: false
    }
  },
  methods: {
    //返回按钮
    // onClickLeft() {
    //   this.$router.back()
    // },
    //获取搜索数据
    async getDataList() {
      this.page++
      // 发送请求
      let res = await getSearchPage({
        page: this.page,
        per_page: this.per_page,
        keyword: this.keyword
      })
      //动态添加
      this.searchList = [...this.searchList, ...res.results]

      // console.log(this.searchList)
      //是否全部加载完毕
      if (this.searchList.length === res.total_count) {
        this.finished = true
      }
      //修改loading状态
      this.loading = false
    },
    //评论事件
    comment() {
      // 判断用户是否登录
      this.$login()
    },
    //跳转到页面详情
    toDetail(art_id) {
      this.$router.push(`/detail/${art_id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.van-icon-arrow-left {
  color: #fff;
}
.van-cell {
  border-bottom: 10px solid #eee;
}
.van-list {
  margin-top: 46px;
}
.myicon {
  display: flex;
  line-height: 14px;
  justify-content: center;

  .van-icon {
    font-size: 14px;
    margin-right: 5px;
  }
}
</style>