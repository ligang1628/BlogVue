import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

// create an axios instance
const service = axios.create({
  // baseURL: 'http://www.ligang.info'
  // baseURL: 'http://127.0.0.1'
  baseURL: 'http://localhost:5000'
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers.Authorization = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    if (error.response.status === 401) {
      Message({
        message: '权限不足，请联系管理员',
        type: 'error',
        duration: 5 * 1000
      })
      removeToken()
      resetRouter()
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (response.status !== 200) {
      if (response.status === 401) {
        Message({
          message: res.msg || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
        removeToken()
        resetRouter()
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      // console.log(res)
      return res
    }
  },
  error => {
    if (error.response.status === 401) {
      const { data } = error.response
      Message({
        message: data.Value,
        type: 'error',
        duration: 5 * 1000
      })
      removeToken()
      resetRouter()
    } else if (error.response.status === 429) {
      Message({
        message: '请停下您的步伐，看看外面的世界'
      })
    } else if (error.response.status === 502) {
      Message({
        message: '请求接口暂未开放！请联系管理员！！！',
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
