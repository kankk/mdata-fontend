import React, { Component } from 'react';
import './CoffeeBean.less';

import coffeeAPI from '../../api/coffee';

import { Spin, List, Button, Icon } from 'antd';
import CoffeeBeanInfo from './CoffeeBeanInfo';

class CoffeeBean extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      visibleInfo: false,
      originCoffeebeans: [],
      coffeebeans: []
    };
    this.selectCoffeeBean = null;
  }

  componentDidMount() {
    try {
      this.setState({
        isLoading: true
      }, async () => {
        const coffeebeans = await coffeeAPI.getCoffeeBeans();
        this.setState({
          isLoading: false,
          originCoffeebeans: coffeebeans,
          coffeebeans
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  handleShowInfo = () => {
    this.selectCoffeeBean = null;
    this.setState({
      visibleInfo: true
    });
  }

  handleListItemClick = (item) => {
    this.selectCoffeeBean = null;
    this.selectCoffeeBean = item;
    this.setState({
      visibleInfo: true
    });
  }

  closeInfo = (coffeebean) => {
    const updateState = {
      visibleInfo: false
    };
    if (!!coffeebean) {
      const coffeebeans = this.state.coffeebeans;
      let updateFlag = false;
      for (let item of coffeebeans) {
        if (item.id === coffeebean.id) {
          updateFlag = true;
          Object.assign(item, coffeebean);
          break;
        }
      }
      if (!updateFlag) {
        coffeebeans.push(coffeebean);
      }
      Object.assign(updateState, {
        coffeebeans,
        originCoffeebeans: coffeebeans
      });
    }
    this.setState(updateState);
  }

  render() {
    const { isLoading, visibleInfo, coffeebeans } = this.state;

    const listItemHTML = coffeebeans.map(item => 
      <div key={item.id} onClick={() => this.handleListItemClick(item)}>{ item.name_cn} - { item.name_en }</div>
    );

    return (
      <div className="coffee-bean module-content">
        <div className="coffee-bean-search"></div>
        <div>
          <Button type="dashed" style={{ width: '100%' }} onClick={this.handleShowInfo}><Icon type="plus" />新增咖啡豆</Button>
        </div>
        <Spin spinning={isLoading}>
          { listItemHTML }
        </Spin>
        <CoffeeBeanInfo visible={visibleInfo} closeInfo={this.closeInfo} coffeebean={this.selectCoffeeBean}/>
      </div>
    );
  }
}

export default CoffeeBean;