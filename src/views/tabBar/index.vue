<template>
  <div>
    <!-- tabbar子组件显示区域 -->
    <router-view></router-view>
    <!-- tabBar标签栏 -->
    <van-tabbar v-model="tabActive"
                route>
      <van-tabbar-item icon="home-o"
                       to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o"
                       to="/login">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o"
                       to="/search">视频</van-tabbar-item>
      <van-tabbar-item icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'tabBar',
  data() {
    return {
      tabActive: 0
    }
  }
}
</script>

<style>
</style>