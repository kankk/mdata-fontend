import React, { Component } from 'react';
import './ErrorStyle.less';

class Error404 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="error">
        <img src={'../img/404.png'} alt="" />
      </div>
    );
  }
}

export default Error404;