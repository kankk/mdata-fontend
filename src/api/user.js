import api from './api';
import { res_result } from './network';
import { store } from '../index';
import { login as aLogin, logout as aLogout } from '../actions/user';
import md5 from 'md5';

const get = url => fetch(url);

const post = (url, user) => fetch(url, {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(user)
});

export default {
  checkUserStatus(){
    return new Promise(async (resolve, reject) => {
      try {
        const res = await post(api.user.status);
        if (res.ok) {
          const resJson = await res.json();
          if (resJson.result === res_result.userLogined) {
            store.dispatch(aLogin(resJson.user));
            resolve(true);
          } else {
            resolve(false);
          }
        } else {
          resolve(false);
        }
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  },
  login(user, isLogin) {
    return new Promise(async (resolve, reject) => {
      try {
        const username = user.username;
        const password = user.password;
        const enPassword = md5(username + password);
        const loginUser = {
          username,
          password: enPassword,
          isLogin,
        };
        const res = await post(api.user.login, loginUser);
        if (res.ok) {
          const resJson = await res.json();
          if (resJson.result === res_result.userLoginSuccess) {
            store.dispatch(aLogin(resJson.user));
            resolve(true);
          } else {
            resolve(false);
          }
        } else {
          reject();
        }
      } catch (err) {
        reject(err);
      }
    });
  },
  register(user) {
    return new Promise(async(resolve, reject) => {
      try {
        const username = user.username;
        const password = user.password;
        const enPassword = md5(username + password);
        const registerUser = {
          username,
          password,
          enPassword
        };
        const res = await post(api.user.register, registerUser);
        if (res.ok) {
          const resJson = await res.json();
          resolve(resJson.result);
        } else {
          reject();
        }
      } catch (err) {
        reject(err);
      }
    });
  },
  logout() {
    return new Promise(async(resolve, reject) => {
      try {
        const res = await post(api.user.logout);
        if (res.ok) {
          const resJson = await res.json();
          if (resJson.result === res_result.userLogoutSuccess) {
            store.dispatch(aLogout());
            resolve(true);
          } else {
            resolve(false);
          }
        } else {
          resolve(false);
        }
      } catch (err) {
        reject(err);
      }
    });
  }
}