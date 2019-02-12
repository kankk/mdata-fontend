import {
  Container,
  Aside,
  Main,
  Menu,
  MenuItem,
  Submenu,
  Dialog,
  Table,
  TableColumn,
  Form,
  FormItem,
  Button,
  Input,
  Select,
  Option,
  Switch,
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
  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Input)
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(Switch)
  Vue.use(Button)
  Vue.use(Input)
  Vue.use(Upload)

  Vue.prototype.$msgbox = MessageBox
  Vue.prototype.$alert = MessageBox.alert
  Vue.prototype.$confirm = MessageBox.confirm
  Vue.prototype.$message = Message
}
