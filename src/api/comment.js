//关于评论的api封装
import request from '@/utils/request'

/**
 * @description:
 * @param {type}:    a:对文章的评论 b:对评论的回复 必须
 * @param {source}  文章id或者评论id 必须
 * @param {offset}  不传表示从第一页开始读取数据 非必须
 * @param {limit}   页容量  非必须
 * @return:
 */

//获取服务器文章评论的API
function getComments({ type, source, offset, limit }) {
  return request({
    url: '/app/v1_0/comments',
    method: 'get',
    params: {
      type,
      source,
      offset: offset || null,
      limit: limit || null
    }
  })
}

//添加评论或添加评论的回复
function addComment({ targetId, content, art_id }) {
  return request({
    url: '/app/v1_0/comments',
    method: 'post',
    data: {
      target: targetId,
      content,
      art_id: art_id || null
    }
  })
}

//暴露方法
export { getComments, addComment }
