import React, { Component } from 'react';
import './Coffee.less';

import { Route, Link, Redirect } from 'react-router-dom';

import CoffeeBean from './CoffeeBean';
import CoffeeBeverage from './CoffeeBeverage';

import { Button, Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;


const coffeeSidebarList = [
  {
    path: '/bean',
    component: CoffeeBean,
    navName: '咖啡豆'
  }, {
    path: '/beverage',
    component: CoffeeBeverage,
    navName: '咖啡饮料'
  }
];

class Coffee extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClickCoffee = () => {
    this.props.history.goBack();
  }

  render() {
    const siderStyle = {
      // overflow: 'auto',
      height: '100vh',
      // position: 'fixed',
      // left: 0
    };

    const MenuItemList = coffeeSidebarList.map((item) => 
      <Menu.Item key={item.path}>
        <Link to={`${this.props.match.url}${item.path}`}>
          <span>{ item.navName }</span>
        </Link>
      </Menu.Item>
    );

    const RouteList = coffeeSidebarList.map((item) =>
      <Route key={item.path} path={`${this.props.match.url}${item.path}`} component={item.component}></Route>
    );

    return (
      <Layout>
        <Sider style={siderStyle}>
          <Menu theme="dark" model="inline" defaultSelectedKeys={'/bean'}>
            { MenuItemList }
          </Menu>
        </Sider>
        <Layout>
          <Content>
            { RouteList }
            <Route exact path={this.props.match.url} render={() => (
              <Redirect to={`${this.props.match.url}/bean`} />
            )} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Coffee;