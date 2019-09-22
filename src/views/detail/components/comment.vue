<template>
  <div class="commentBox">
    <van-cell v-for="(item, index) in 4"
              :key="index">
      <template slot="title">
        <div class="myComment">
          <!-- 头像 -->
          <div class="autIcon">
            <van-image src='https://img.yzcdn.cn/vant/cat.jpeg'
                       round
                       width="40"
                       height="40"
                       fit="cover"></van-image>
          </div>
          <!-- 评论内容和作者 -->
          <div class="content">
            <van-cell>
              <template slot="title">
                <div>作者名</div>
              </template>
              <template slot="label">
                <div>评论内容</div>
              </template>
            </van-cell>
          </div>
          <!-- 点赞 -->
          <div class="like">
            <van-icon name="good-job-o" /> 666
          </div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'comment'
}
</script>

<style lang="less" scoped>
.commentBox {
  margin-bottom: 65px;
}
.myComment {
  display: flex;
  align-items: center;
  .content {
    flex: 1;
  }
}
</style>