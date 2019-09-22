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
                        size="small">发送</van-button>
          </div>
          <!-- 收藏 -->
          <van-icon name="star-o" />
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'message',
  data() {
    return {
      message: ''
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