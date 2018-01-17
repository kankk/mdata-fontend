import React, { Component } from 'react';
import './ShoppingRecordInfo.less';

import {Timeline } from 'antd';

class ShoppingRecordItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { record } = this.props;
    return (
      <Timeline.Item>
        { record.buy_date }
      </Timeline.Item>
    );
  }
}

export default ShoppingRecordItem;