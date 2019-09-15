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
                 placeholder="请输入手机号"
                 v-validate="'digits:11'"
                 name="mobile"
                 :error-message="errors.first('mobile')" />
      <van-field v-model="code"
                 type="text"
                 left-icon='browsing-history-o'
                 label="验证码:"
                 placeholder="请输入验证码"
                 required
                 v-validate="'required'"
                 name="code"
                 :error-message="errors.first('code')" />
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="mybtn">
      <van-button type="info"
                  size="large"
                  @click="doLogin"
                  :loading="isLoading"
                  loading-type="spinner">登录</van-button>
    </div>
  </div>
</template>

<script>
//导入用户登录api
import { userLogin } from '@/api/user'

export default {
  name: 'login',
  data() {
    return {
      mobile: '18888888888',
      code: '246810',
      isLoading: false
    }
  },
  methods: {
    //设置自己的验证规则
    setRules() {
      //验证对象
      const dict = {
        //自定义验证规则提示信息
        custom: {
          mobile: {
            digits: () => '请输入11位手机号码'
          },
          code: {
            required: () => '请输入验证码'
          }
        }
      }
      //使用校验规则
      this.$validator.localize('zh_CN', dict)
    },

    async doLogin() {
      //开启加载动画
      this.isLoading = true
      //所有校验成功后的逻辑代码
      let valid = await this.$validator.validate()
      if (valid) {
        //校验成功的逻辑
        try {
          let res = await userLogin({
            mobile: this.mobile,
            code: this.code
          })
          // console.log(res)
          //将用户信息保存到localstorage中
          this.$store.commit('setUserInfo', res)
          this.$router.push('/home')
        } catch (error) {
          // toast轻提示错误
          this.$toast('登录失败')
        }
      }
      //关闭加载动画
      this.isLoading = false
    }
  },

  mounted() {
    //使用规则
    this.setRules()
  }
}
</script>

<style lang='less' scoped>
.mybtn {
  padding: 10px;
  .van-button {
    border-radius: 5px;
  }
}
</style>