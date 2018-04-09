import {
  Dialog,
  Form,
  FormItem,
  Button,
  Input,
  Message
} from 'element-ui'

export default function plugin (Vue, options) {
  Vue.prototype.$ELEMENT = { size: 'small' }

  Vue.use(Dialog)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Input)
  Vue.use(Button)
  Vue.use(Input)

  Vue.prototype.$message = Message
}
