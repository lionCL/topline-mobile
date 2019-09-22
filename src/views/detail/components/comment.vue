<template>
  <div class="commentBox">
    <van-cell>
      <template slot="title">
        <div class="myComment">
          <!-- 头像 -->
          <div class="autIcon">
            <van-image :src='commentItem.aut_photo'
                       round
                       width="40"
                       height="40"
                       fit="cover"></van-image>
          </div>
          <!-- 评论内容和作者 -->
          <div class="content">
            <van-cell>
              <template slot="title">
                <div>{{commentItem.aut_name}}</div>
              </template>
            </van-cell>
          </div>
          <!-- 点赞 -->
          <div class="like">
            <van-icon name="good-job-o" /> {{commentItem.like_count}}
          </div>
        </div>
        <!-- 回复内容 -->
        <div class="myInfo">
          <div>{{commentItem.content}}</div>
          <div>
            <span class="time">{{commentItem.pubdate | formateData}}</span>
            <span class="replayCount"
                  @click="showPopup">回复({{commentItem.reply_count}})</span>
          </div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
//引入eventBus
import vueBus from '@/utils/eventBus'
export default {
  name: 'comment',
  props: ['commentItem'],
  methods: {
    showPopup() {
      vueBus.$emit('showPopup', {
        //控制面板的显示和隐藏
        show: true,
        //当前评论的数据源
        ...this.commentItem
      })
    }
  }
}
</script>

<style lang="less" scoped>
.myComment {
  display: flex;
  align-items: center;
  .content {
    flex: 1;
  }
}
.myInfo {
  margin-left: 56px;
  margin-top: -2px;
  .replayCount {
    margin-left: 10px;
    font-size: 12px;
  }
  .time {
    font-size: 12px;
  }
}
</style>