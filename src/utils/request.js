import axios from 'axios'
//创建一个axios实例对象
import store from '@/store'
import { async } from 'q'

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})
//创建一个新axios实例,专门用来刷新token
const instance_token = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

//设置请求拦截
instance.interceptors.request.use(
  config => {
    //判断用户是否登录,是登录给请求添加一个token响应头
    let user = store.state.userInfo
    //如果有用户信息 而且有token值
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

//设置响应拦截
instance.interceptors.response.use(
  response => {
    //对相应内容进行过略只显示data数据
    return response.data.data || response.data
  },
  async error => {
    //接受到401证明 token过期已经实现 需要通过refresh_token来刷新token
    if (error.response.status == 401) {
      //获取refresh_token
      let refresh_token = store.state.userInfo.refresh_token

      //发送一个新请求
      let res = await instance_token({
        url: '/app/v1_0/authorizations',
        method: 'put',
        headers: {
          Authorization: `Bearer ${refresh_token}`
        }
      })
      //获取新token
      let token = res.data.data.token
      //保存token
      store.commit('setUserInfo', {
        token,
        refresh_token
      })
      //再次发送请求到服务器
      return instance(error.config)
    }

    return Promise.reject(error)
  }
)

export default instance
