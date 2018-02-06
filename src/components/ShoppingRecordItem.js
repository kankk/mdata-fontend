import React, { Component } from 'react';
import './ShoppingRecordInfo.less';

import moment from 'moment';
import { Timeline, Row, Col, Icon, Popconfirm } from 'antd';

class ShoppingRecordItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { record } = this.props;
    return (
      <Timeline.Item>
        <Row type="flex" justify="space-between" align="middle">
          <Col>{ moment(record.buy_date).format('ll') }</Col>
          <Col>
            <Icon type="edit" className="icon-edit" onClick={() => this.props.onEditClick()}/>
            <Popconfirm placement="topRight" title="确定要删除该消费记录?" onConfirm={() => this.props.onDeleteClick()} okText="确定" cancelText="取消">
              <Icon type="delete" className="icon-delete" />
            </Popconfirm>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>标题: { record.title }</Col >
        </Row>
      </Timeline.Item>
    );
  }
}

export default ShoppingRecordItem;