import Vue from 'vue'
// 导入 store
import store from '@/store'
// 导入 dailog
import { Dialog } from 'vant'
// 导入 router
import router from '@/router'

Vue.use(Dialog)

// 封装登录插件
let myPlugs = {}
//添加一个方法
myPlugs.install = function(Vue) {
  //c处理自己插件的逻辑
  Vue.prototype.$login = function() {
    let user = store.state.userInfo
    //如果有用户信息 而且有token值
    if (!user || !user.token) {
      //没有登录,直接跳转到登录页面,并提示用户
      Dialog.confirm({
        title: '注意',
        message: '要进行当前操作时需要登录'
      })
        .then(() => {
          router.push('/login')
        })
        .catch(() => {
          return
        })
    }
  }
}

//暴露对象
export default myPlugs
