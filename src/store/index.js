import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: ''
  },
  mutations: {
    //设置用户信息
    setUserInfo(state, userInfo) {}
  },
  actions: {}
})

export default store
