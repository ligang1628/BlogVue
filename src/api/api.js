import request from '@/utils/request'

export const getArticleList = params => {
  return request({
    url: '/api/article/GetNewArticleList',
    method: 'get',
    params
  })
}

export const getArticleInfo = params => {
  return request({
    url: '/api/article/getArticleInfo',
    method: 'get',
    params
  })
}
