import axios from 'axios'
import config from '../config'

const codeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
}

axios.defaults.baseURL = config.API_HOST
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  const message = {}
  if (typeof error.response === 'undefined') {
    message.message = '网络繁忙, 请稍后再试!'
  } else {
    message.message = error.response.data.message || codeMessage[error.response.status]
  }
  return Promise.reject(message)
})

export const $http = function (url = '', data = {}, type = 'GET', _config = {}) {
  type = type.toUpperCase()
  const config = Object.assign(_config, {
    method: type,
    url: url
  })
  if (['DELETE', 'GET'].includes(type)) {
    config.params = data
  } else {
    config.data = data
  }
  return axios(config).then(response => {
    return response && response.data
  }).catch(error => {
    return Promise.reject(error)
  })
}

export default function plugin (Vue, options) {
  Vue.prototype.$http = axios
}
