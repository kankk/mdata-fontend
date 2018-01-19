import api from './api';
import request from './request';

export default {
  countInterfaceByDates() {
    return new Promise(async(resolve, reject) => {
      const resJson = await request(api.trace.dates, {
        method: 'GET'
      });
      resolve(resJson.rows);
    });
  }
}