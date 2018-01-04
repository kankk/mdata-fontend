import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import storeHelper from '../helper/storeHelper';


const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route {...rest} render={props => (
    storeHelper.getLoginStatus() ? (<Component {...props}/>) : (<Redirect to={{
      pathname: '/',
      state: { from: props.location }
    }}/>)
  )}/>
);

const router = {
  PrivateRoute
}

export default router;