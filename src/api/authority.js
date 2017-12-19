import api from './api';
import { res_result } from './network';

const get = url => fetch(url);

export default {
  getRegisterAuthority() {
    return new Promise(async(resolve, reject) => {
      try {
        const res = await get(api.authority.register);
        const resJson = await res.json();
        if (resJson.result === res_result.moduleOpen) {
          resolve(true);
        } else {
          resolve(false);
        }
      } catch (err) {
        reject(err);
      }
    });
  }
}