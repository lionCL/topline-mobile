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
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'meg',
  data() {
    return {
      message: ''
    }
  },
  methods: {
    //发送消息
    sendMsg() {
      //获取输入消息发送到父组件
      this.$emit('sendMessaage', this.message)
      this.message = ''
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
  }
}
</style>