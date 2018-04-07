import moment from 'moment'
moment.locale('zh-cn')

export default function plugin (Vue, options) {
  Vue.prototype.$moment = moment
}
