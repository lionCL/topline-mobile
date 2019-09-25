<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="个人详情"
                 left-arrow
                 @click-left="$router.back()"
                 @click-right="onSave">
      <template slot="right">
        <div class="right">
          保存
        </div>
      </template>
    </van-nav-bar>
    <!-- 信息展示选项 -->
    <van-cell-group>
      <van-cell title="头像"
                is-link
                center>
        <template slot="default">
          <van-image :src="userProfileInfo.photo"
                     width="40px"
                     height="40px"
                     round
                     fit="cover"></van-image>
        </template>
      </van-cell>
      <van-cell title="昵称"
                :value="userProfileInfo.name"
                is-link />
      <van-cell title="介绍"
                is-link />
      <van-cell title="性别"
                :value="userProfileInfo.gender===0?'男':'女'"
                is-link />
      <van-cell title="生日"
                :value="userProfileInfo.birthday===''? '待完善':userProfileInfo.birthday"
                is-link />
    </van-cell-group>
  </div>
</template>

<script>
//导入用户请求api
import { userProfile } from '@/api/user.js'
export default {
  name: 'person',
  data() {
    return {
      userProfileInfo: {}
    }
  },
  mounted() {
    this.loadProfile()
  },
  methods: {
    //加载用户个人资料
    async loadProfile() {
      let res = await userProfile()
      console.log(res)
      this.userProfileInfo = res
    },
    //保存按钮功能
    onSave() {}
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background: #1989fa;
  z-index: 99 !important;
  .van-nav-bar__title,
  .van-icon-arrow-left {
    color: #fff;
  }
  .right {
    color: #fff;
    font-size: 16px;
  }
}
</style>