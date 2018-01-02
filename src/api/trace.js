import api from './api';
import { res_result } from './network';

const get = url => fetch(url);

export default {
  countInterfaceByDates() {
    return new Promise(async(resolve, reject) => {
      try {
        const res = await get(api.trace.dates);
        if (res.ok) {
          const resJson = await res.json();
          if (resJson.result === res_result.getSuccess) {
            resolve(resJson.rows);
          } else {
            resolve([]);
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