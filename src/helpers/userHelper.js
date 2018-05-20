import {
  getLocalStorage,
  setLocalStorage
} from '../utils/storage'

// 用于Storage的key
const LOGIN_USERNAME = 'LOGIN_USERNAME'
export const getLocalUsername = () => {
  return getLocalStorage(LOGIN_USERNAME)
}
export const setLocalUsername = username => {
  setLocalStorage(LOGIN_USERNAME, username)
}
