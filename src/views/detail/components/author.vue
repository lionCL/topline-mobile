<template>
  <div>
    <van-cell>
      <template slot="title">
        <div class="authorInfo">
          <!-- 作者头像 -->
          <div class="autIcon">
            <van-image :src='articleDetailList.aut_photo'
                       round
                       width="40"
                       height="40"
                       fit="cover"></van-image>
          </div>
          <!-- 作者信息 -->
          <div class="autMessage">
            <van-cell>
              <template slot="title">
                {{articleDetailList.aut_name}}
              </template>
              <template slot="label">
                <span>{{articleDetailList.pubdate | formDayDate}}</span>
              </template>
            </van-cell>
          </div>
          <!-- 关注按钮 -->
          <van-button v-if="articleDetailList.is_followed ===false"
                      type="danger"
                      size="small"
                      @click="doFollow">关注</van-button>
          <van-button v-else
                      type="info"
                      plain
                      size="small"
                      @click="unFollow">取消关注</van-button>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
//导入关注 /取关api
import { userDoFollow, userNofollow } from '@/api/user'
export default {
  name: 'author',
  props: ['articleDetailList'],
  methods: {
    //点击关注
    async doFollow() {
      try {
        //关注作者
        await userDoFollow(this.articleDetailList.aut_id)
        //修改 文章详情中的关注状态
        this.articleDetailList.is_followed = true
        this.$toast.success('关注成功')
      } catch (error) {
        this.$toast.fail(error.message)
      }
    },
    //取消关注
    async unFollow() {
      try {
        await userNofollow(this.articleDetailList.aut_id)
        this.articleDetailList.is_followed = false
        this.$toast.success('取消关注成功')
      } catch (error) {
        this.$toast.fail(error.message)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.authorInfo {
  display: flex;
  align-items: center;
  .autMessage {
    flex: 1;
  }
}
</style>