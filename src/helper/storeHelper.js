import {store} from '../index';

const storeHelpter = {};

storeHelpter.getLoginStatus = () => {
  return store.getState().user.logined;
}

storeHelpter.getUserInfo = () => {
  return store.getState().user;
}

storeHelpter.getAModuleByName = (name) => {
  const modules = store.getState().aModule;
  for(let m of modules) {
    if (m.name === name) {
      return m;
    }
  }
}

storeHelpter.getAllMoudles = () => {
  return store.getState().aModule;
}

export default storeHelpter;