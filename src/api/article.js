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

//隐藏文章的方法
function disLike(artId) {
  return request({
    url: '/app/v1_0/article/dislikes',
    method: 'post',
    data: {
      target: artId
    }
  })
}

//拉黑作者的方法
function setBlackList(aurId) {
  return request({
    url: '/app/v1_0/user/blacklists',
    method: 'post',
    data: {
      target: aurId
    }
  })
}

//举报文章的方法
function reportArticle({ artId, type }) {
  return request({
    url: '/app/v1_0/article/reports',
    method: 'post',
    data: {
      target: artId,
      type: type,
      remark: '涉嫌违规'
    }
  })
}

//搜索
function thinkArticle(key) {
  return request({
    url: '/app/v1_0/suggestion',
    method: 'get',
    params: {
      q: key
    }
  })
}

//根据关键字获取分页的数据
function getSearchPage({ page, per_page, keyword }) {
  return request({
    url: '/app/v1_0/search',
    method: 'get',
    params: {
      page,
      per_page,
      q: keyword
    }
  })
}

//获取文章详情
function getArticleDetail(article_id) {
  return request({
    url: `/app/v1_0/articles/${article_id}`,
    method: 'get'
  })
}

//暴露接口
export {
  getArticle,
  disLike,
  setBlackList,
  reportArticle,
  thinkArticle,
  getSearchPage,
  getArticleDetail
}
