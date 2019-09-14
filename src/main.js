import Vue from 'vue'
import App from './App.vue'

//导入抽离路由文件
import router from '@/router'

//导入vuex文件
import store from '@/store'

//导入vant组件
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

//导入validate验证插件 / 语法模块
import VeeValidate, { Validator } from 'vee-validate'
//导入validate语言包
import zh_CN from 'vee-validate/dist/locale/zh_CN'
//使用语音包
Validator.localize('zh_CN', zh_CN)
//使用validate
Vue.use(VeeValidate, {
  events: '' //自定义校验事件,禁用默认的
})

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  //挂在路由
  router,
  //挂在vuex
  store
}).$mount('#app')
