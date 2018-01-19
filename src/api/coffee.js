import api from './api';
import request from './request';

export default {
  getCoffeeBean(id) {
    return new Promise(async (resolve, reject) => {
      const resJson = await request(`${api.coffee.coffeeBean}/${id}`, {
        method: 'GET'
      });
      if (resJson.result) {
        resolve(resJson.row);
      } else {
        resolve();
      }
    });
  },
  getCoffeeBeans() {
    return new Promise(async (resolve, reject) => {
      const resJson = await request(api.coffee.coffeeBeans, {
        method: 'GET'
      });
      resolve(resJson.rows);
    });
  },
  addCoffeeBean(coffeebean) {
    return new Promise(async (resolve, reject) => {
      const resJson = await request(api.coffee.coffeeBean, {
        method: 'POST',
        body: coffeebean
      });
      resolve(resJson);
    });
  },
  updateCoffeeBean(coffeebean) {
    return new Promise(async (resolve, reject) => {
      const resJson = await request(api.coffee.coffeeBean, {
        method: 'PUT',
        body: coffeebean
      });
      resolve(resJson);
    });
  },
  deleteCoffeeBean(id) {
    return new Promise(async (resolve, reject) => {
      const resJson = await request(`${api.coffee.coffeeBean}/${id}`, {
        method: 'DELETE'
      });
      resolve(resJson);
    });
  },
  getCoffeeBeverages() {
    return new Promise(async (resolve, reject) => {
      const resJson = await request(api.coffee.coffeeBeverages, {
        method: 'GET'
      });
      resolve(resJson.rows);
    });
  },
  addCoffeeBeverage(coffeebeverage) {
    return new Promise(async (resolve, reject) => {
      const resJson = await request(api.coffee.coffeeBeverage, {
        method: 'POST',
        body: coffeebeverage
      });
      resolve(resJson);
    });
  },
  updateCoffeeBeverage(coffeebeverage) {
    return new Promise(async (resolve, reject) => {
      const resJson = await request(api.coffee.coffeeBeverage, {
        method: 'PUT',
        body: coffeebeverage
      });
      resolve(resJson);
    });
  },
  deleteCoffeeBeverage(id) {
    return new Promise(async (resolve, reject) => {
      const resJson = await request(`${api.coffee.coffeeBeverage}/${id}`, {
        method: 'DELETE'
      });
      resolve()
    });
  },
  getCoffeeInfoByType(type) {
    return new Promise(async (resolve, reject) => {
      const resJson = await request(`${api.coffee.coffeeBeans}/${type}`, {
        method: 'GET'
      });
      resolve(resJson.rows);
    });
  },
  getCoffeeInfos() {
    return new Promise(async (resolve, reject) => {
      const resJson = await request(api.coffee.coffeeInfos, {
        method: 'GET'
      });
      resolve(resJson.rows);
    });
  },
  addCoffeeInfo(coffeeinfo) {
    return new Promise(async (resolve, reject) => {
      const resJson = await request(api.coffee.coffeeInfo, {
        method: 'POST',
        body: coffeeinfo
      });
      resolve(resJson);
    });
  },
  updateCoffeeInfo(coffeeinfo) {
    return new Promise(async (resolve, reject) => {
      const resJson = await request(api.coffee.coffeeInfo, {
        method: 'PUT',
        body: coffeeinfo
      });
      resolve(resJson);
    });
  },
  deleteCoffeeInfo(id) {
    return new Promise(async (resolve, reject) => {
      const resJson = await request(`${api.coffee.coffeeInfo}/${id}`, {
        method: 'DELETE'
      });
      resolve()
    });
  },
}