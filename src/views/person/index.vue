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
                is-link
                @click="nickName" />
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
          @changeMyIcon='changeIcon' />

    <!-- 弹出层:昵称 -->
    <van-popup v-model="nicknameshow"
               :style="{ height: '20%' }"
               position="bottom"
               closeable
               close-icon-position="top-left">
      <van-cell>
        <template slot="title">
          <h3>设置用户昵称</h3>
          <van-field class="nickname"
                     v-model="userProfileInfo.name"
                     placeholder="请修改昵称"
                     left-icon='contact' />
        </template>
      </van-cell>
    </van-popup>
  </div>
</template>

<script>
//导入用户请求api
import { userProfile, userInfoUpdate } from '@/api/user.js'
//导入头像弹出层组件
import icon from '@/views/person/components/icon.vue'
export default {
  name: 'person',
  data() {
    return {
      //用户信息
      userProfileInfo: {},
      //头像弹出层是否展示
      showIcon: false,
      //显示昵称修改弹出层
      nicknameshow: false
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
    async onSave() {
      try {
        let res = await userInfoUpdate({
          name: this.userProfileInfo.name,
          gender: this.userProfileInfo.gender,
          birthday: this.userProfileInfo.birthday
        })
        this.$toast.success('数据保存成功')
      } catch (error) {
        this.$toast.fail(error.message)
      }
    },
    //更换头像弹出层
    changeImg() {
      this.showIcon = true
    },
    //昵称弹出框
    nickName() {
      this.nicknameshow = true
    },
    //修改用户头像
    changeIcon(obj) {
      // console.log(obj)
      this.userProfileInfo.photo = obj.photo
      // console.log(this.userProfileInfo.photo)
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