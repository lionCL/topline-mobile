import request from '@/utils/request'

//封装获取频道的方法

function getChannel() {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'get'
  })
}

export { getChannel }
