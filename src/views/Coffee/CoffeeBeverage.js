import React, { Component } from 'react';
import './CoffeeBeverage.less';

import coffeeAPI from '../../api/coffee';

import { Spin, List, Button, Icon, message } from 'antd';
import CoffeeBeverageInfo from './CoffeeBeverageInfo';
import CoffeeBeverageItem from './CoffeeBeverageItem';

class CoffeeBeverage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      visibleInfo: false,
      coffeebeverages: []
    };
    this.selectCoffeeBeverage = null;
  }

  componentDidMount() {
    try {
      this.setState({
        isLoading: true
      }, async () => {
        const coffeebeverages = await coffeeAPI.getCoffeeBeverages();
        this.setState({
          isLoading: false,
          coffeebeverages
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  handleShowInfo = () => {
    this.selectCoffeeBeverage = null;
    this.setState({
      visibleInfo: true
    });
  }

  handleListItemEdit = (item) => {
    this.selectCoffeeBeverage = item;
    this.setState({
      visibleInfo: true
    });
  }

  handleListItemDelete = async (item) => {
    try {
      this.setState({
        isLoading: true
      }, async () => {
        const result = await coffeeAPI.deleteCoffeeBeverage(item.id);
        this.setState({
          isLoading: false
        }, () => {
          if (result) {
            const _coffeebeverages = this.state.coffeebeverages;
            const _index = _coffeebeverages.findIndex(function(coffeebeverage, index, arr) {
              return coffeebeverage.id === item.id;
            });
            _coffeebeverages.splice(_index, 1);
            this.setState({
              coffeebeverages: _coffeebeverages
            });
            message.success('删除成功');
          } else {
            message.warn('删除失败');
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  closeInfo = (coffeebeverage) => {
    const updateState = {
      visibleInfo: false
    };
    if (!!coffeebeverage) {
      const coffeebeverages = this.state.coffeebeverages;
      let updateFlag = false;
      for (let item of coffeebeverages) {
        if (item.id === coffeebeverage.id) {
          updateFlag = true;
          Object.assign(item, coffeebeverage);
          break;
        }
      }
      if (!updateFlag) {
        coffeebeverages.push(coffeebeverage);
      }
      Object.assign(updateState, {
        coffeebeverages
      });
    }
    this.setState(updateState);
  }

  render() {
    const { isLoading, visibleInfo, coffeebeverages } = this.state;

    const listItemHTML = coffeebeverages.map(item => 
      <CoffeeBeverageItem key={item.id} onEditClick={() => this.handleListItemEdit(item)} onDeleteClick={() => this.handleListItemDelete(item)} coffeebeverage={item}></CoffeeBeverageItem>
    );

    return (
      <div className="coffee-beverage module-content">
        <div className="coffee-beverage-search"></div>
        <div>
          <Button type="dashed" style={{ width: '100%' }} onClick={this.handleShowInfo}><Icon type="plus" />新增咖啡饮料</Button>
        </div>
        <Spin spinning={isLoading}>
          { listItemHTML }
        </Spin>
        <CoffeeBeverageInfo visible={visibleInfo} closeInfo={this.closeInfo} coffeebeverage={this.selectCoffeeBeverage}/>
      </div>
    );
  }
}

export default CoffeeBeverage;