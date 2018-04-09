import userApi from '../../server/user'
const state = {
  id: '',
  username: '',
  role: -1,
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
          commit('login', res.user)
        }
        resolve(res.result)
      } catch (err) {
        reject(err)
      }
    })
  },

  logout ({ commit }) {
    commit('logout')
  }
}

const mutations = {
  login (state, user) {
    state.id = user.id
    state.username = user.username
    state.role = user.role
    state.isLogin = true
  },

  logout (state) {
    state.isLogin = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
