import api from './api';
import { res_result } from './network';

const get = url => fetch(url);

const post = (url, coffee) => fetch(url, {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(coffee)
});

const put = (url, coffee) => fetch(url, {
  method: 'PUT',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(coffee)
});

const deleteMethod = (url, coffee) => fetch(url, {
  method: 'DELETE',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(coffee)
});

export default {
  getShoppingRecords(fid) {
    return new Promise(async(resolve, reject) => {
      try {
        const res = await get(`${api.shoopingRecord.records}/${fid}`);
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
  },
  addShoppingRecord(record) {
    return new Promise(async(resolve, reject) => {
      try {
        const res = await post(api.shoopingRecord.record, record);
        if (res.ok) {
          const resJson = await res.json();
          if (resJson.result === res_result.postSuccess) {
            resolve(resJson.rows[0]);
          } else {
            reject();
          }
        } else {
          reject();
        }
      } catch (err) {
        reject(err);
      }
    });
  },
  updateShoppingRecord(record) {
    return new Promise(async(resolve, reject) => {
      try {
        const res = await put(api.shoopingRecord.record, record);
        if (res.ok) {
          const resJson = await res.json();
          if (resJson.result === res_result.putSuccess) {
            resolve(resJson.rows[0]);
          } else {
            reject();
          }
        } else {
          reject();
        }
      } catch (err) {
        reject(err);
      }
    });
  },
  deleteShoppingRecord(id) {
    return new Promise(async(resolve, reject) => {
      try {
        const res = await deleteMethod(api.shoopingRecord.record, {id: id});
        if (res.ok) {
          const resJson = await res.json();
          if (resJson.result === res_result.deleteSuccess) {
            resolve(true)
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