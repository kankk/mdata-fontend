// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Http from './server/$http.service'
import Moment from './server/$moment.service'
import ElementUI from './server/$element.service'

Vue.config.productionTip = false

Vue.use(Http)
Vue.use(Moment)
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
