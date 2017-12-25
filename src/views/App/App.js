import React, { Component } from 'react';
import './App.less';

import { Route, Redirect } from 'react-router-dom';
import Login from '../Login/Login';
import Home from '../Home/Home';
import Coffee from '../Coffee/Coffee';

import router from './../router';
const PrivateRoute = router.PrivateRoute;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/home" component={Home}/>
        <PrivateRoute path="/coffee" component={Coffee}/>
      </div>
    );
  }
}

export default App;
