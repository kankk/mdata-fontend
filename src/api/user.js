import api from './api';
import { res_result } from './network';
import md5 from 'md5';

const get = url => fetch(url);

const post = (url, user) => fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(user)
});

export default {
  login(user) {
    return new Promise(async (resolve, reject) => {
      try {
        const username = user.username;
        const password = user.password;
        const enPassword = md5(username + password);
        const loginUser = {
          username,
          password: enPassword
        };
        const res = await post(api.user.login, loginUser);
        if (res.ok) {
          const resJson = await res.json();
          if (resJson.result === res_result.userLoginSuccess) {
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
  }
}