import request from '@/utils/request'

//封装获取文章的方法
function getArticle({ channel_id, timestamp, with_top }) {
  return request({
    url: '/app/v1_1/articles',
    method: 'GET',
    params: {
      channel_id,
      timestamp,
      with_top
    }
  })
}

export { getArticle }
