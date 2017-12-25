import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route {...rest} render={props => (
    router.logined ? (<Component {...props}/>) : (<Redirect to={{
      pathname: '/',
      state: { from: props.location }
    }}/>)
  )}/>
);

const router = {
  logined: false,
  PrivateRoute
}

export default router;