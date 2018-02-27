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
  },
  countWebsitesByLink() {
    return new Promise(async(resolve, reject) => {
      const resJson = await request(api.trace.websites, {
        method: 'GET'
      });
      resolve(resJson.rows);
    });
  }
}