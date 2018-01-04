import React, { Component } from 'react';
import './CoffeeBeverageItem.less';

import { Icon, Popconfirm  } from 'antd';
class CoffeeBeverageItem extends Component {
  constructor(props) {
    super(props);
  }

  handleDeleteConfirm = () => {
    this.props.onDeleteClick();
  }

  handleEditClick = () => {
    this.props.onEditClick();
  }

  render() {
    const { coffeebeverage } = this.props;
    return (
      <section className="coffee-beverage-item list-item" >
        <Popconfirm placement="topRight" title="确定要删除该咖啡饮料信息?" onConfirm={this.handleDeleteConfirm} okText="确定" cancelText="取消">
          <Icon className="list-item-delete" type="close" />
        </Popconfirm>
        <Icon className="list-item-edit" type="edit" onClick={this.handleEditClick}/>
        { coffeebeverage.name_cn } - { coffeebeverage.name_en }
      </section>
    );
  }
}

export default CoffeeBeverageItem;