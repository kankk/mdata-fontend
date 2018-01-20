import React, { Component } from 'react';
import './ShoppingRecordInfo.less';

import moment from 'moment';
import {Timeline } from 'antd';

class ShoppingRecordItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { record } = this.props;
    return (
      <Timeline.Item>
        { moment(record.buy_date).format('ll') }
      </Timeline.Item>
    );
  }
}

export default ShoppingRecordItem;