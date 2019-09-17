import request from '@/utils/request'

//封装获取我的频道的方法
function getChannel() {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'get'
  })
}

//封装获取所有频道的方法
function getAllChannel() {
  return request({
    url: '/app/v1_0/channels',
    method: 'GET'
  })
}

//修改频道信息的方法
function changeChannelInfo({ channels }) {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'put',
    data: {
      channels: channels
    }
  })
}

//暴露方法
export { getChannel, getAllChannel, changeChannelInfo }
