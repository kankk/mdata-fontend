import userApi from '../../server/user'
import {
  USER_LOGIN,
  USER_LOGOUT
} from '../mutation-types'

import {
  setLocalUsername
} from '../../helpers/userHelper'

const state = {
  id: '',
  username: '',
  role: -1,
  token: '',
  isLogin: false
}

const getters = {
  loginStatus: state => state.isLogin
}

const actions = {
  login ({ commit }, user) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await userApi.login(user)
        if (res.result) {
          commit(USER_LOGIN, res.data)
          res.data.username && setLocalUsername(res.data.username)
        }
        resolve(res)
      } catch (err) {
        reject(err)
      }
    })
  },

  logout ({ commit }) {
    commit(USER_LOGOUT)
  }
}

const mutations = {
  [USER_LOGIN] (state, user) {
    state.id = user.id
    state.username = user.username
    state.role = user.role
    state.token = user.token
    state.isLogin = true
  },

  [USER_LOGOUT] (state) {
    state.isLogin = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
