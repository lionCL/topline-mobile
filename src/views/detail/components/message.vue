<template>
  <div class="messageBox">
    <van-cell>
      <template slot="title">
        <div class="myMessage">
          <!-- 输入框 -->
          <div class="myinput">
            <van-field v-model="message"
                       placeholder="请写留言"
                       left-icon='edit' />
          </div>
          <!-- 发送按钮 -->
          <div class="pullBtn">
            <van-button type="danger"
                        size="small"
                        @click="sendMsg">发送</van-button>
          </div>
          <!-- 收藏 -->
          <van-icon name="star-o" />
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'message',
  props: ['artid'],
  data() {
    return {
      message: ''
    }
  },
  methods: {
    //给文章添加评论
    async sendMsg() {
      try {
        //验证用户是否登陆
        this.$login()
        //将评论信息提交到服务器
        let res = await addComment({
          targetId: this.artid,
          content: this.message
        })
        // console.log(res)
        // console.log(this)
        //清空输入框
        this.message = ''
        //将评论的信息提交到文章详情中
        this.$emit('setComment', res)
        this.$toast.success('评论成功')
      } catch (error) {
        this.$toast.fail(error.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.messageBox {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.myMessage {
  display: flex;
  align-items: center;
  .myinput {
    flex: 1;
    .van-field {
      background-color: #eee;
      border-radius: 20px;
    }
  }
  .pullBtn {
    margin: 0 15px;
  }
  .van-icon {
    font-size: 16px;
  }
}
</style>