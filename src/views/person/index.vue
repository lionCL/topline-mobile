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
                center
                @click="changeImg">
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
    <!-- 弹出层:头像 -->
    <icon v-model="showIcon"
          @changeMyIcon='changeMyIcon'></icon>
  </div>
</template>

<script>
//导入用户请求api
import { userProfile } from '@/api/user.js'
//导入头像弹出层组件
import icon from '@/views/person/components/icon.vue'
export default {
  name: 'person',
  data() {
    return {
      userProfileInfo: {},
      //头像弹出层是否展示
      showIcon: false
    }
  },
  mounted() {
    this.loadProfile()
  },
  methods: {
    //加载用户个人资料
    async loadProfile() {
      let res = await userProfile()
      // console.log(res)
      this.userProfileInfo = res
    },
    //保存按钮功能
    onSave() {},
    //更换头像选项
    changeImg() {
      this.showIcon = true
    },
    //修改用户头像
    changeMyIcon(data) {
      this.userProfileInfo.photo = data.photo
    }
  },
  components: {
    icon
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