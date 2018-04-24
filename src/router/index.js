import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login'
import Home from '../views/home'
import userApi from '../server/user'

import {
  USER_LOGIN
} from '../store/mutation-types'

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
        path: 'pictures',
        name: 'pictures',
        component: resolve => require(['@/views/pictures'], resolve)
      }, {
        path: 'blog',
        name: 'blog-wrap',
        component: resolve => require(['@/views/blog'], resolve),
        children: [{
          path: 'articles',
          name: 'articles',
          component: resolve => require(['@/views/blog/articles'], resolve)
        }, {
          path: 'classification',
          name: 'classification',
          component: resolve => require(['@/views/blog/classification'], resolve)
        }]
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
      store.commit(USER_LOGIN, res.user)
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
