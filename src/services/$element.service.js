import {
  Container,
  Aside,
  Main,
  Menu,
  MenuItem,
  Submenu,
  Dialog,
  Form,
  FormItem,
  Button,
  Input,
  Upload,
  MessageBox,
  Message
} from 'element-ui'

export default function plugin (Vue, options) {
  Vue.prototype.$ELEMENT = { size: 'small' }

  Vue.use(Container)
  Vue.use(Aside)
  Vue.use(Main)
  Vue.use(Menu)
  Vue.use(MenuItem)
  Vue.use(Submenu)
  Vue.use(Dialog)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Input)
  Vue.use(Button)
  Vue.use(Input)
  Vue.use(Upload)

  Vue.prototype.$msgbox = MessageBox
  Vue.prototype.$alert = MessageBox.alert
  Vue.prototype.$confirm = MessageBox.confirm
  Vue.prototype.$message = Message
}
