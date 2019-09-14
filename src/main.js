import Vue from 'vue'
import App from './App.vue'
//导入抽离路由文件
import router from '@/router'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //挂在路由
  router
}).$mount('#app')
