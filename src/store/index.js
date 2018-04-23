import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import pictures from './modules/pictures'
import blog from './modules/blog'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    user,
    pictures,
    blog
  },
  strict: debug
})

export default store
