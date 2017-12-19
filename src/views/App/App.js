import React, { Component } from 'react';
import './App.less';

import { Route } from 'react-router-dom';

import Login from '../Login/Login';
import Home from '../Home/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route path="/home" component={Home} />
      </div>
    );
  }
}

export default App;
