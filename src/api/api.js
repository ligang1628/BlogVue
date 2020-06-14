import request from '@/utils/request'
import axios from 'axios'

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

// 通过类型id查看文章列表
export const getArticleByCId = params => {
  return request({
    url: '/api/article/getarticlelistbycid',
    method: 'get',
    params
  })
}

// 通过日期查看文章列表
export const getArticleByTime = params => {
  return request({
    url: '/api/article/getArticlelistByTime',
    method: 'get',
    params
  })
}

// 查看文章
export const getArticleInfo = params => {
  return request({
    url: '/api/article/GetArticleComment',
    method: 'get',
    params
  })
}

// 回复评论
export const rePlyComment = (data, params) => {
  return request({
    url: '/api/comment/ReplyComment' + data,
    method: 'post',
    data: params
  })
}

export const replyMessage = (data, params) => {
  return request({
    url: '/api/message/ReplyMessage' + data,
    method: 'post',
    data: params
  })
}

export const getAddress = params => {
  return axios({
    // 高德
    url: 'https://restapi.amap.com/v3/ip?output=json&key=1f60e54f26b4986f6d9c5c7b41535738',
    method: 'get'
  })
}

// export const GetQQToken = params => {
//   return request({
//     url: '/api/OAuth/GetQQToken',
//     method: 'get',
//     params
//   })
// }

// export const getState = params => {
//   return request({
//     url: '/api/OAuth/getloginstate',
//     method: 'get',
//     params
//   })
// }
