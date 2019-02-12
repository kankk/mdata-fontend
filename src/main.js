// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import Http from './services/$http.service'
// import Moment from './services/$moment.service'
import ElementUI from './plugins/element';
import Components from './components'

Vue.config.productionTip = false

Vue.use(Http)
// Vue.use(Moment)
Vue.use(ElementUI)
Vue.use(Components)

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
