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

//用户关注作者
function userDoFollow(aut_id) {
  return request({
    url: '/app/v1_0/user/followings',
    method: 'post',
    data: {
      target: aut_id
    }
  })
}
//用户取消关注
function userNofollow(aut_id) {
  return request({
    url: `/app/v1_0/user/followings/${aut_id}`,
    method: 'DELETE'
  })
}

// 点赞
function userDoLike(art_id) {
  return request({
    url: '/app/v1_0/article/likings',
    method: 'post',
    data: {
      target: art_id
    }
  })
}

//取消点赞
function userUnLike(art_id) {
  return request({
    url: `/app/v1_0/article/likings/${art_id}`,
    method: 'DELETE'
  })
}

//用户不喜欢
function userHate(art_id) {
  return request({
    url: '/app/v1_0/article/dislikes',
    method: 'post',
    data: {
      target: art_id
    }
  })
}
//取消不喜欢
function userUnHate(art_id) {
  return request({
    url: `/app/v1_0/article/dislikes/${art_id}`,
    method: 'DELETE'
  })
}

//获取用户自己的信息
function getUserInfo() {
  return request({
    url: '/app/v1_0/user',
    method: 'get'
  })
}

//获取用户个人信息
function userProfile() {
  return request({
    url: '/app/v1_0/user/profile',
    method: 'get'
  })
}

//暴露方法
export {
  userLogin,
  userDoFollow,
  userNofollow,
  userDoLike,
  userUnLike,
  userHate,
  userUnHate,
  getUserInfo,
  userProfile
}
