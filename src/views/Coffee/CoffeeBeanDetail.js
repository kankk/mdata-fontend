import React, { Component } from 'react';
import './CoffeeBeanDetail.less';

import coffeeAPI from '../../api/coffee';
import { res_result } from '../../api/network';

import { message, Spin, Breadcrumb } from 'antd';

const defaultCoffeebean = {
  name_cn: '',
  name_en: '',
  origin: '',
  mouthfeel: ''
}

class CoffeeBeanDetail extends Component {
  constructor(props) {
    super(props);
    this.id = '';
    this.state = {
      coffeebean: Object.assign({}, defaultCoffeebean),
      isLoadingMain: false,
    };
  }

  handleToLastPage = () => {
    this.props.history.goBack();
  }

  componentDidMount() {
    this.id = this.props.match.params.id;
    try {
      this.setState({
        isLoadingMain: true
      }, async () => {
        const result = await coffeeAPI.getCoffeeBean(this.id);
        const updateObj = {
          isLoadingMain: false
        };
        if (result) {
          Object.assign(updateObj, {
            coffeebean: result
          });
        } else {
          message.warn('获取咖啡豆详细失败');
        }
        this.setState(updateObj);
      })
    } catch (err) {
      message.error(res_result.globalServerError);
    }
  }

  render() {
    const { isLoadingMain, coffeebean } = this.state;
    return (
      <div className="coffee-bean-detail module-content">
        <div >
          <Breadcrumb>
            <Breadcrumb.Item><a onClick={this.handleToLastPage}>咖啡豆</a></Breadcrumb.Item>
            <Breadcrumb.Item>{ coffeebean.name_cn }</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="coffee-bean-detail-main">
          <Spin spinning={isLoadingMain}>
            <div style={{ marginTop: 24, marginBottom: 24 }}>
              <p className="main-title">{ coffeebean.name_cn}<span className="sub-title"> ( { coffeebean.name_en} )</span></p>
            </div>
          </Spin>
        </div>
      </div>
    );
  }
}

export default CoffeeBeanDetail;