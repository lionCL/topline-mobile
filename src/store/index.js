import Vue from 'vue'
import Vuex from 'vuex'

//引入token操作封装文件
import * as author from '@/utils/author'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: author.getAuthor()
  },
  mutations: {
    //设置用户信息
    setUserInfo(state, userInfo) {
      author.setAuthor(userInfo)
    }
  },
  actions: {}
})

export default store
