import React, { Component } from 'react';
import './CoffeeBeanItem.less';

import { Icon, Popconfirm  } from 'antd';
class CoffeeBeanItem extends Component {
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
    const { coffeebean } = this.props;
    return (
      <section className="coffee-bean-item list-item" >
        <Popconfirm placement="topRight" title="确定要删除该咖啡豆信息?" onConfirm={this.handleDeleteConfirm} okText="确定" cancelText="取消">
          <Icon className="list-item-delete" type="close" />
        </Popconfirm>
        <Icon className="list-item-edit" type="edit" onClick={this.handleEditClick}/>
        { coffeebean.name_cn } - { coffeebean.name_en }
      </section>
    );
  }
}

export default CoffeeBeanItem;