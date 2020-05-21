import request from '@/utils/request'

// 文章列表
export const getArticleList = params => {
  return request({
    url: '/api/article/GetNewArticleList',
    method: 'get',
    params
  })
}

// 热门文章
export const getHotArticle = params => {
  return request({
    url: '/api/article/GetHotArticle',
    method: 'get',
    params
  })
}

// 最新更新
export const getRecentUpdate = params => {
  return request({
    url: '/api/article/GetNewUpdateArticle',
    method: 'get',
    params
  })
}

// 分类目录
export const getCategoryNum = params => {
  return request({
    url: '/api/article/GetCategoryNum',
    method: 'get',
    params
  })
}

// 文章归档
export const getArticleFiling = params => {
  return request({
    url: '/api/article/getArticleFiling',
    method: 'get',
    params
  })
}

// 查看文章
export const getArticleInfo = params => {
  return request({
    url: '/api/article/getArticleInfo',
    method: 'get',
    params
  })
}
