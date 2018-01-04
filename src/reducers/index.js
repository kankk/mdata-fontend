import { combineReducers } from 'redux';
import user from './user';
import { aModule } from './authority';

const mReducers = combineReducers({
  user,
  aModule
});

export default mReducers;