import React, { Component } from 'react';
import './App.less';

import { Route } from 'react-router-dom';
import Login from '../Login/Login';
import Home from '../Home/Home';
import Coffee from '../Coffee/Coffee';
import Setting from '../Setting/Setting';

import router from './../router';
const PrivateRoute = router.PrivateRoute;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/home" component={Home}/>
        <PrivateRoute path="/coffee" component={Coffee}/>
        <PrivateRoute path="/setting" component={Setting}/>
      </div>
    );
  }
}

export default App;
