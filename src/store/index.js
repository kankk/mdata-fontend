import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import pictures from './modules/pictures'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    user,
    pictures
  },
  strict: debug
})

export default store
