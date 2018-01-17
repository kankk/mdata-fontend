export default {
  authority: {
    module: '/api/authority/module',
    modules: '/api/authority/modules'
  },
  user: {
    status: '/api/user/status',
    login: '/api/user/login',
    logout: '/api/user/logout',
    register: '/api/user/register',
    list: '/api/user/list'
  },
  coffee: {
    allCoffeeBeans: '/api/coffee/beans',
    coffeeBean: '/api/coffee/bean',
    allCoffeeBeverages: '/api/coffee/beverages',
    coffeeBeverage: '/api/coffee/beverage',
    allCoffeeInfos: '/api/coffee/infos',
    coffeeInfo: '/api/coffee/info',
  },
  shoopingRecord: {
    records: '/api/shoppingrecord/records',
    record: '/api/shoppingrecord/record'
  },
  trace: {
    count: '/api/trace/count',
    dates: '/api/trace/dates'
  }
}