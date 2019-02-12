import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login'
import Home from '../views/home'
import userApi from '../server/user'
import store from '../store'

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
        component: () => import(/* webpackChunkName: "overall" */ '@/views/overall')
      }, {
        path: 'pictures',
        name: 'pictures',
        component: () => import(/* webpackChunkName: "pictures" */ '@/views/pictures')
      }, {
        path: 'blog',
        name: 'blog-wrap',
        component: () => import(/* webpackChunkName: "blog" */ '@/views/blog'),
        children: [{
          path: 'articles',
          name: 'articles',
          component: () => import(/* webpackChunkName: "blog_articles" */ '@/views/blog/articles'),
        }, {
          path: 'article/:id',
          name: 'article-detail',
          component: () => import(/* webpackChunkName: "blog_articles_detail" */ '@/views/blog/articles/article-detail.vue'),
        }, {
          path: 'classification',
          name: 'classification',
          component: () => import(/* webpackChunkName: "blog_classification" */ '@/views/blog/classification'),
        }]
      }, {
        path: 'autochess',
        name: 'autochess',
        component: () => import(/* webpackChunkName: "autochess" */ '@/views/autochess'),
        children: [{
          path: 'hero',
          name: 'autochess-hero',
          component: () => import(/* webpackChunkName: "autochess_hero" */ '@/views/autochess/hero'),
        }]
      }, {
        path: 'setting',
        name: 'setting',
        component: () => import(/* webpackChunkName: "setting" */ '@/views/setting'),
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
  const isLogin = store.getters.loginStatus
  if (to.matched.some(record => record.meta.requiresAuth) && !isLogin) {
    try {
      const res = await userApi.checkUserStatus()
      if (res.result) {
        store.commit(USER_LOGIN, res.data)
        next()
      } else {
        next({
          path: '/login'
        })
      }
    } catch (err) {
      next({
        path: '/login'
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
