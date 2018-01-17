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
  getCoffeeBean(id) {
    return new Promise(async(resolve, reject) => {
      try {
        const res = await get(`${api.coffee.coffeeBean}/${id}`);
        if (res.ok) {
          const resJson = await res.json();
          if (resJson.result === res_result.getSuccess) {
            if (resJson.rows.length > 0) {
              resolve(resJson.rows[0]);
            } else {
              resolve();
            }
          } else {
            resolve();
          }
        } else {
          reject();
        }
      } catch (err) {
        reject(err);
      }
    });
  },
  getCoffeeBeans() {
    return new Promise(async(resolve, reject) => {
      try {
        const res = await get(api.coffee.allCoffeeBeans);
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
  addCoffeeBean(coffeebean) {
    return new Promise(async(resolve, reject) => {
      try {
        const res = await post(api.coffee.coffeeBean, coffeebean);
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
  updateCoffeeBean(coffeebean) {
    return new Promise(async(resolve, reject) => {
      try {
        const res = await put(api.coffee.coffeeBean, coffeebean);
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
  deleteCoffeeBean(id) {
    return new Promise(async(resolve, reject) => {
      try {
        const res = await deleteMethod(api.coffee.coffeeBean, {id: id});
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
  },
  getCoffeeBeverages() {
    return new Promise(async(resolve, reject) => {
      try {
        const res = await get(api.coffee.allCoffeeBeverages);
        if (res.ok) {
          const resJson = await res.json();
          if (resJson.result === res_result.getSuccess) {
            resolve(resJson.rows);
          } else {
            reject([]);
          }
        } else {
          reject();
        }
      } catch (err) {
        reject(err);
      }
    });
  },
  addCoffeeBeverage(coffeebeverage) {
    return new Promise(async(resolve, reject) => {
      try {
        const res = await post(api.coffee.coffeeBeverage, coffeebeverage);
        if (res.ok) {
          const resJson = await res.json();
          if (resJson.result === res_result.postSuccess) {
            resolve(resJson.rows[0]);
          } else {
            resolve();
          }
        } else {
          reject();
        }
      } catch (err) {
        reject(err);
      }
    });
  },
  updateCoffeeBeverage(coffeebeverage) {
    return new Promise(async(resolve, reject) => {
      try {
        const res = await put(api.coffee.coffeeBeverage, coffeebeverage);
        if (res.ok) {
          const resJson = await res.json();
          if (resJson.result === res_result.putSuccess) {
            resolve(resJson.rows[0]);
          } else {
            resolve();
          }
        } else {
          reject();
        }
      } catch (err) {
        reject(err);
      }
    });
  },
  deleteCoffeeBeverage(id) {
    return new Promise(async(resolve, reject) => {
      try {
        const res = await deleteMethod(api.coffee.coffeeBeverage, {id: id});
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
  },
  getCoffeeInfoByType(type) {
    return new Promise(async(resolve, reject) => {
      try {
        const res = await get(`${api.coffee.allCoffeeBeans}/${type}`);
        if (res.ok) {
          const resJson = await res.json();
          if (resJson.result === res_result.getSuccess) {
            if (resJson.rows.length > 0) {
              resolve(resJson.rows[0]);
            } else {
              resolve();
            }
          } else {
            resolve();
          }
        } else {
          reject();
        }
      } catch (err) {
        reject(err);
      }
    });
  },
  getCoffeeInfos() {
    return new Promise(async(resolve, reject) => {
      try {
        const res = await get(api.coffee.allCoffeeInfos);
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
  addCoffeeInfo(coffeeinfo) {
    return new Promise(async(resolve, reject) => {
      try {
        const res = await post(api.coffee.coffeeInfo, coffeeinfo);
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
  updateCoffeeInfo(coffeeinfo) {
    return new Promise(async(resolve, reject) => {
      try {
        const res = await put(api.coffee.coffeeInfo, coffeeinfo);
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
  deleteCoffeeInfo(id) {
    return new Promise(async(resolve, reject) => {
      try {
        const res = await deleteMethod(api.coffee.coffeeInfo, {id: id});
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
  },
}