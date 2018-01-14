import React, { Component } from 'react';
import './ShoppingRecord.less';

import ShoppingRecordInfo from './ShoppingRecordInfo';

import { Spin, Button, Icon, message } from 'antd';

class ShoppingRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      visibleInfo: false,
      records: []
    };
    this.selectRecord = null;
  }

  handleShowInfo = () => {
    this.selectRecord = null;
    this.setState({
      visibleInfo: true
    });
  }

  handleListItemEdit = (item) => {
    this.selectRecord = item;
    this.setState({
      visibleInfo: true
    });
  }

  closeInfo = (record) => {
    const updateState = {
      visibleInfo: false
    };
    if (!!record) {
      const records = this.state.records;
      let updateFlag = false;
      for (let item of records) {
        if (item.id === record.id) {
          updateFlag = true;
          Object.assign(item, record);
          break;
        }
      }
      if (!updateFlag) {
        records.push(record);
      }
      Object.assign(updateState, {
        records
      });
    }
    this.setState(updateState);
  }

  componentDidMount() {

  }

  render() {
    const { isLoading, visibleInfo } = this.state;
    return (
      <div className="shopping-record">
        <div>
          <Button type="dashed" style={{ width: '100%' }} onClick={this.handleShowInfo}><Icon type="plus" />新增购买记录</Button>
        </div>
        <Spin spinning={isLoading}>
        </Spin>
        <ShoppingRecordInfo visible={visibleInfo} closeInfo={this.closeInfo} coffeebean={this.selectCoffeeBean}/>
      </div>
    );
  }
}

export default ShoppingRecord