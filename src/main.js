import Vue from 'vue'
import App from './App.vue'

//导入抽离路由文件
import router from '@/router'

//导入vuex文件
import store from '@/store'

//导入vant组件
import Vant from 'vant'
import 'vant/lib/index.css'
//导入validate验证插件 / 语法模块
import VeeValidate, { Validator } from 'vee-validate'
//导入validate语言包
import zh_CN from 'vee-validate/dist/locale/zh_CN'
//使用语音包
Validator.localize('zh_CN', zh_CN)

//导入dayjs
import dayjs from 'dayjs'
// 导入插件
import relativeTime from 'dayjs/plugin/relativeTime'
//导入语言包
import 'dayjs/locale/zh-cn'

//使用validate
Vue.use(VeeValidate, {
  events: '' //自定义校验事件,禁用默认的
})

//使用vant
Vue.use(Vant)

//使用dayjs插件
dayjs.extend(relativeTime)
//使用语言包
dayjs.locale('zh-cn')

//注册全局过滤器
Vue.filter('formDayDate', value => {
  return dayjs().from(dayjs(value))
})

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  //挂在路由
  router,
  //挂在vuex
  store
}).$mount('#app')
