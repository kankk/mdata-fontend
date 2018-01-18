import api from './api';
import request from './request';
import { store } from '../index';
import { login as aLogin, logout as aLogout } from '../actions/user';
import md5 from 'md5';

export default {
  checkUserStatus() {
    return new Promise(async (resolve, reject) => {
      const resJson = await request(api.user.status, {
        method: "POST"
      });
      if (resJson.result) {
        store.dispatch(aLogin(resJson.user));
        resolve(true);
      } else {
        resolve(false);
      }
    });
  },
  login(user, isLogin) {
    return new Promise(async (resolve, reject) => {
      const username = user.username;
      const password = user.password;
      const enPassword = md5(username + password);
      const loginUser = {
        username,
        password: enPassword,
        isLogin,
      };
      const resJson = await request(api.user.login, {
        method: 'POST',
        body: loginUser
      });
      if (resJson.result) {
        store.dispatch(aLogin(resJson.user));
        resolve(true);
      } else {
        resolve(false);
      }
    });
  },
  register(user) {
    return new Promise(async (resolve, reject) => {
      const username = user.username;
      const password = user.password;
      const enPassword = md5(username + password);
      const registerUser = {
        username,
        password,
        enPassword
      };
      const resJson = await request(api.user.register, {
        method: 'POST',
        body: registerUser
      });
      resolve(resJson.result);
    });
  },
  logout() {
    return new Promise(async (resolve, reject) => {
      const resJson = await request(api.user.logout, {
        method: 'POST'
      });
      if (resJson.result) {
        store.dispatch(aLogout());
        resolve(true);
      } else {
        resolve(false);
      }
    });
  },
  getAllUsers() {
    return new Promise(async (resolve, reject) => {
      const res = await request(api.user.list, {
        method: 'POST'
      });
      const resJson = await res.json();
      resolve(resJson.rows);
    });
  }
}