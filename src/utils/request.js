import axios from 'axios'
//创建一个axios实例对象
import store from '@/store'

const instance = axios.create({
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
  error => {
    return Promise.reject(error)
  }
)

export default instance
