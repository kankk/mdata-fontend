import React, { Component } from 'react';
import './Coffee.less';

import { Route, Link, Redirect } from 'react-router-dom';

import CoffeeBean from './CoffeeBean';
import CoffeeBeanDetail from './CoffeeBeanDetail';
import CoffeeBeverage from './CoffeeBeverage';

import { Layout, Menu } from 'antd';
const { Content, Sider } = Layout;


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
  
  handleLogoBack = () => {
    this.props.history.replace('/home');
  }

  render() {
    const MenuItemList = coffeeSidebarList.map((item) => 
      <Menu.Item key={item.path}>
        <Link to={`${this.props.match.url}${item.path}`}>
          <span>{ item.navName }</span>
        </Link>
      </Menu.Item>
    );

    const RouteList = coffeeSidebarList.map((item) =>
      <Route key={item.path} exact path={`${this.props.match.url}${item.path}`} component={item.component}></Route>
    );

    const pathnameArr = this.props.location.pathname.split('/')
    const defaultMenu = '/' + (pathnameArr[2] || 'bean');

    return (
      <Layout>
        <Sider className="module-sider">
          <div className="module-sider-logo">
            <img src={'../img/coffee.png'} alt="" onClick={this.handleLogoBack}/>
          </div>
          <Menu theme="dark" model="inline" defaultSelectedKeys={[defaultMenu]}>
            { MenuItemList }
          </Menu>
        </Sider>
        <Layout>
          <Content>
            { RouteList }
            <Route path={`${this.props.match.url}/bean/:id`} component={CoffeeBeanDetail}></Route>
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