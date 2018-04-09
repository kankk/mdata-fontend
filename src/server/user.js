import api from './api'
import md5 from 'md5'
import { $http } from '../services/$http.service'

export default {
  checkUserStatus () {
    return $http(api.user.status, null, 'POST')
  },
  login (user) {
    const username = user.username
    const password = user.password
    const enPassword = md5(username + password)
    const loginUser = {
      username,
      password: enPassword
    }
    return $http(api.user.login, loginUser, 'POST')
  }
}
