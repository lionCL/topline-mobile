<template>
  <div>
    <van-cell>
      <template slot="title">
        <van-button @click="doDislike"
                    type="danger"
                    plain
                    size="small"
                    icon="star"
                    v-if="articleDetailList.attitude === 1">取消点赞</van-button>
        <van-button @click="doLike"
                    type="danger"
                    size="small"
                    icon="star-o"
                    v-else>点赞</van-button>
        <van-button @click="daDisHate"
                    type="danger"
                    plain
                    size="small"
                    icon="like"
                    v-if="articleDetailList.attitude === 0">取消不喜欢</van-button>
        <van-button @click="daHate"
                    type="danger"
                    size="small"
                    icon="like-o"
                    v-else>不喜欢</van-button>
      </template>
    </van-cell>
  </div>
</template>

<script>
//导入点赞/取消点赞   不喜欢 取消不喜欢 api
import { userDoLike, userUnLike, userHate, userUnHate } from '@/api/user'
export default {
  name: 'likebtn',
  props: ['articleDetailList'],
  methods: {
    //取消点赞
    async doDislike() {
      try {
        await userUnLike(this.articleDetailList.art_id)
        this.articleDetailList.attitude = -1
        this.$toast.success('取消点赞成功')
      } catch (error) {
        this.$toast.fail(error.message)
      }
    },
    //点赞
    async doLike() {
      try {
        await userDoLike(this.articleDetailList.art_id)
        this.articleDetailList.attitude = 1
        this.$toast.success('点赞成功')
      } catch (error) {
        this.$toast.fail(error.message)
      }
    },
    //不喜欢
    async daHate() {
      try {
        await userHate(this.articleDetailList.art_id)
        this.articleDetailList.attitude = 0
        this.$toast.success('已通知作者')
      } catch (error) {
        this.$toast.fail(error.message)
      }
    },
    //取消不喜欢
    async daDisHate() {
      try {
        await userUnHate(this.articleDetailList.art_id)
        this.articleDetailList.attitude = -1
        this.$toast.success('欢迎回来')
      } catch (error) {
        this.$toast.fail(error.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-cell {
  text-align: center;
  .van-button {
    margin: 0 15px;
  }
}
</style>