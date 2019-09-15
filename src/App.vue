<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
//头部导航公共样式
.van-nav-bar {
  background-color: #1989fa !important;
  .van-nav-bar__title {
    color: #fff;
    font-size: 18px;
  }
}
</style>
