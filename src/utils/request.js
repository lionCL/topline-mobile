import axios from 'axios'
//创建一个axios实例对象

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

//设置请求拦截
instance.interceptors.request.use(
  config => {
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
