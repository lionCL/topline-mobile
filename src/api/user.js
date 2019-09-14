//封装所有用户相关的网络请求
import request from '@/utils/request'

//添加一个方法 登录
//对象的解构语法
function userLogin({ mobile, code }) {
  //axios请求返回的是一个promise对象
  return request({
    url: '/app/v1_0/authorizations',
    method: 'post',
    data: {
      mobile: mobile,
      code: code
    }
  })
}

//暴露方法
export { userLogin }
