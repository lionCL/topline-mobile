<template>
  <div>
    <!-- nav导航 -->
    <van-nav-bar title="登录" />
    <!-- Field 输入框 -->
    <van-cell-group>
      <van-field v-model="mobile"
                 left-icon='phone-o'
                 required
                 clearable
                 label="手机号码:"
                 placeholder="请输入手机号" />
      <van-field v-model="code"
                 type="text"
                 left-icon='browsing-history-o'
                 label="验证码:"
                 placeholder="请输入验证码"
                 required />
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="mybtn">
      <van-button type="info"
                  size="large">登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      mobile: '188888888888',
      code: '246810'
    }
  }
}
</script>

<style lang='less' scoped>
.van-nav-bar {
  background-color: #1989fa;
  .van-nav-bar__title {
    color: #fff;
    font-size: 18px;
  }
}
.mybtn {
  padding: 10px;
  .van-button {
    border-radius: 5px;
  }
}
</style>