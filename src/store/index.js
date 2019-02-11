import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import pictures from './modules/pictures'
import blog from './modules/blog'
import autochess from './modules/autochess'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    user,
    pictures,
    blog,
    autochess
  },
  strict: debug
})

export default store
