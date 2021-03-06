// import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getInfo } from '@/api/api'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(res => {
        if (res.result === true) {
          commit('SET_TOKEN', res.data.token)
          setToken(res.data.token)
        }
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo({ token: state.token }).then(res => {
        if (res.result === true) {
          const { headImg, user } = res.data
          commit('SET_NAME', user)
          commit('SET_AVATAR', headImg)
          resolve(res)
        } else {
          console.log(res.msg)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // // user logout
  // logout({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     logout(state.token).then(() => {
  //       removeToken() // must remove  token  first
  //       resetRouter()
  //       commit('RESET_STATE')
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

