import api from './api';
import {res_result} from './network';
import { store } from '../index';
import { initModules } from '../actions/authority';

const get = url => fetch(url);

const put = (url, aModule) => fetch(url, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(aModule)
});

export default {
  getRegisterAuthority() {
    return new Promise(async (resolve, reject) => {
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
  },
  getVisitorAuthority() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await get(api.authority.visitor);
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
  },
  getAllModules() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await get(api.authority.modules);
        if (res.ok) {
          const resJson = await res.json();
          if (resJson.result === res_result.getSuccess) {
            for (let row of resJson.rows) {
              if (row.status == 1) {
                row.status = true;
              } else {
                row.status = false;
              }
            }
            store.dispatch(initModules(resJson.rows));
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
  updateAuthorityModule(aModule) {
    return new Promise(async (resolve, reject) => {
      try {
        const _aModule = {
          name: aModule.name,
          status: aModule.status ? '1' : '0'
        }
        const res = await put(api.authority.module, _aModule);
        if (res.ok) {
          const resJson = await res.json();
          if (resJson.result === res_result.putSuccess) {
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