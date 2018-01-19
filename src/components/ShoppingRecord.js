import React, { Component } from 'react';
import './ShoppingRecord.less';

import ShoppingRecordInfo from './ShoppingRecordInfo';
import ShoppingRecordItem from './ShoppingRecordItem';
import sRecordAPI from '../api/shoppingRecord';
import storeHelpter from '../helper/storeHelper';

import { Spin, Button, Icon, message, Timeline } from 'antd';

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
    this.selectRecord = {
      uid: storeHelpter.getUserInfo().id,
      fid: this.props.fid
    };
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
    try {
      this.setState({
        isLoading: true
      }, async () => {
        const records = await sRecordAPI.getShoppingRecords(this.props.fid);
        this.setState({
          isLoading: false,
          records
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { isLoading, visibleInfo, records } = this.state;

    const shoppingRecordList = records.map((record) => 
      <ShoppingRecordItem key ={record.id} record={record}></ShoppingRecordItem>
    );

    return (
      <div className="shopping-record">
        <div>
          <Button type="dashed" style={{ width: '100%' }} onClick={this.handleShowInfo}><Icon type="plus" />新增购买记录</Button>
        </div>
        <Spin spinning={isLoading}>
          <Timeline style={{ marginTop: 20 }}>
            { shoppingRecordList }
          </Timeline>
        </Spin>
        <ShoppingRecordInfo visible={visibleInfo} closeInfo={this.closeInfo} record={this.selectRecord}/>
      </div>
    );
  }
}

export default ShoppingRecord