import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import App from './views/App/App';
import reducer from './reducers';

import './assets/styles/common.less';
import './assets/styles/global.less';
import 'antd/dist/antd.less';

import { BrowserRouter as Router } from 'react-router-dom';

export const store = createStore(reducer);

ReactDOM.render((
    <Router>
      <App />
    </Router>
), document.getElementById('root'));
