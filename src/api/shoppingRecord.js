import api from './api';
import request from './request';

export default {
  getShoppingRecords(fid) {
    return new Promise(async (resolve, reject) => {
      const resJson = await request(`${api.shoopingRecord.records}/${fid}`, {
        method: 'GET'
      });
      resolve(resJson.rows);
    });
  },
  addShoppingRecord(record) {
    return new Promise(async (resolve, reject) => {
      const resJson = await request(api.shoopingRecord.record, {
        method: 'POST',
        body: record
      });
      resolve(resJson);
    });
  },
  updateShoppingRecord(record) {
    return new Promise(async (resolve, reject) => {
      const resJson = await request(api.shoopingRecord.record, {
        method: 'PUT',
        body: record
      });
      resolve(resJson);
    });
  },
  deleteShoppingRecord(id) {
    return new Promise(async (resolve, reject) => {
      await request(`${api.shoopingRecord.record}/${id}`, {
        method: 'DELETE'
      });
      resolve(true);
    });
  }
}