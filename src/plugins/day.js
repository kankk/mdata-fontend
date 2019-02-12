import day from 'dayjs'
import 'dayjs/locale/zh-cn'
day.locale('zh-cn')

export default function plugin (Vue, options) {
  Vue.prototype.$day = day
}
