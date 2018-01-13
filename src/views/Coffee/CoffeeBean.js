import React, { Component } from 'react';
import './CoffeeBean.less';

import coffeeAPI from '../../api/coffee';

import { Spin, Button, Icon, message } from 'antd';
import CoffeeBeanInfo from './CoffeeBeanInfo';
import CoffeeBeanItem from './CoffeeBeanItem';

class CoffeeBean extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      visibleInfo: false,
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
          coffeebeans
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  handleToDetail = (item) => {
    const currentPath = this.props.location.pathname;
    this.props.history.push(`${currentPath}/${item.id}`);
  }

  handleShowInfo = () => {
    this.selectCoffeeBean = null;
    this.setState({
      visibleInfo: true
    });
  }

  handleListItemEdit = (item) => {
    this.selectCoffeeBean = null;
    this.selectCoffeeBean = item;
    this.setState({
      visibleInfo: true
    });
  }

  handleListItemDelete = async (item) => {
    try {
      this.setState({
        isLoading: true
      }, async () => {
        const result = await coffeeAPI.deleteCoffeeBean(item.id);
        this.setState({
          isLoading: false
        }, () => {
          if (result) {
            const _coffeebeans = this.state.coffeebeans;
            const _index = _coffeebeans.findIndex(function(coffeebean, index, arr) {
              return coffeebean.id === item.id;
            });
            _coffeebeans.splice(_index, 1);
            this.setState({
              coffeebeans: _coffeebeans
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
        coffeebeans
      });
    }
    this.setState(updateState);
  }

  render() {
    const { isLoading, visibleInfo, coffeebeans } = this.state;

    const listItemHTML = coffeebeans.map(item => 
      <CoffeeBeanItem key={item.id} onClick={() => this.handleToDetail(item)} coffeebean={item}></CoffeeBeanItem>
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