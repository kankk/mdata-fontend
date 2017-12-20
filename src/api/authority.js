import api from './api';
import {res_result} from './network';

const get = url => fetch(url);

export default {
  getRegisterAuthority() {
    return new Promise(async(resolve, reject) => {
      try {
        const res = await get(api.authority.register);
        if (res.ok) {
          const resJson = await res.json();
          if (resJson.result === res_result.moduleOpen) {
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
  }
}