import api from './api'
import md5 from 'md5'
import { $post } from '../services/$http.service'

export default {
  checkUserStatus () {
    return $post(api.user.status)
  },
  login (user) {
    const username = user.username
    const password = user.password
    const enPassword = md5(username + password)
    const loginUser = {
      username,
      password: enPassword
    }
    return $post(api.user.login, loginUser)
  }
}
