import Vue from 'vue'
import App from './App.vue'
//导入抽离路由文件
import router from '@/router'
//导入vuex文件
import store from '@/store'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //挂在路由
  router,
  //挂在vuex
  store
}).$mount('#app')
