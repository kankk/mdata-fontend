import {
  Dialog,
  Button,
  Input,
  Message
} from 'element-ui'

export default function plugin (Vue, options) {
  Vue.use(Dialog)
  Vue.use(Input)
  Vue.use(Button)
  Vue.use(Input)

  Vue.prototype.$message = Message
}
