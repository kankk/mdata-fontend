import React, { Component } from 'react';
import './App.less';

import { Route, Switch } from 'react-router-dom';
import Login from '../Login/Login';
import Home from '../Home/Home';
import Coffee from '../Coffee/Coffee';
import Trace from '../Trace/Trace';
import Setting from '../Setting/Setting';

import Error404 from '../Error/Error404';

import router from './../router';
const PrivateRoute = router.PrivateRoute;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute path="/coffee" component={Coffee} />
          <PrivateRoute path="/trace" component={Trace} />
          <PrivateRoute path="/setting" component={Setting} />
          <Route component={Error404} />
        </Switch>
      </div>
    );
  }
}

export default App;
