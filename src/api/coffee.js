import api from './api';
import { res_result } from './network';

const get = url => fetch(url);

const post = (url, coffee) => fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(coffee)
});

const put = (url, coffee) => fetch(url, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(coffee)
});

const deleteMethod = (url, coffee) => fetch(url, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(coffee)
});

export default {
  getCoffeeBeans() {
    return new Promise(async(resolve, reject) => {
      try {
        const res = await get(api.coffee.allCoffeeBeans);
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
  addCoffeeBean(coffeebean) {
    return new Promise(async(resolve, reject) => {
      try {
        const res = await post(api.coffee.coffeeBean, coffeebean);
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
  updateCoffeeBean(coffeebean) {
    return new Promise(async(resolve, reject) => {
      try {
        const res = await put(api.coffee.coffeeBean, coffeebean);
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
  }
}