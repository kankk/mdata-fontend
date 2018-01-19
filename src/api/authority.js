import api from './api';
import request from './request';
import { store } from '../index';
import { initModules } from '../actions/authority';

export default {
  getAllModules() {
    return new Promise(async (resolve, reject) => {
      const resJson = await request(api.authority.modules, {
        method: 'GET'
      });
      for (let row of resJson.rows) {
        if (row.status == 1) {
          row.status = true;
        } else {
          row.status = false;
        }
      }
      store.dispatch(initModules(resJson.rows));
      resolve(true);
    });
  },
  updateAuthorityModule(aModule) {
    return new Promise(async (resolve, reject) => {
      const _aModule = {
        name: aModule.name,
        status: aModule.status ? '1' : '0'
      }
      const resJson = await request(api.authority.module, {
        method: 'PUT',
        body: _aModule
      });
      resolve(true);
    });
  }
}