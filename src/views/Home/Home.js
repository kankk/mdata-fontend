import React, { Component } from 'react';
import './Home.less';

import { Button } from 'antd';

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleClickCoffee = () => {
    this.props.history.push('/coffee');
  }

  render() {
    return (
      <div className="home">
        <Button onClick={this.handleClickCoffee}>Coffee</Button>
      </div>
    );
  }
}

export default Home;