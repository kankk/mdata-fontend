import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login'
import Home from '../views/home'
import userApi from '../server/user'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      },
      children: [{
        path: '',
        name: 'overall',
        component: resolve => require(['@/views/overall'], resolve)
      }, {
        path: 'picture',
        name: 'picture',
        component: resolve => require(['@/views/picture'], resolve)
      }, {
        path: 'blog',
        name: 'blog',
        component: resolve => require(['@/views/blog'], resolve)
      }, {
        path: 'setting',
        name: 'setting',
        component: resolve => require(['@/views/setting'], resolve)
      }]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  console.log(to, from)
  const store = this.a.app.$options.store
  const isLogin = store.getters.loginStatus
  if (to.matched.some(record => record.meta.requiresAuth) && !isLogin) {
    const res = await userApi.checkUserStatus()
    if (res.result) {
      store.commit('login', res.user)
      next()
    } else {
      next({
        path: '/login'
        // query: {
        //   redirect: to.fullPath
        // }
      })
    }
  } else if (to.name === 'Login' && isLogin) {
    next({
      path: '/'
    })
  } else {
    next()
  }
})

export default router
