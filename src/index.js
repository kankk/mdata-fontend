import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/App/App';

import './assets/styles/common.less';
import './assets/styles/global.less';
import 'antd/dist/antd.less';

import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render((
  <Router>
    <App />
  </Router>
), document.getElementById('root'));
