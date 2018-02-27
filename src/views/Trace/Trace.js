import React, { Component } from 'react';
import './Trace.less';

import { Route, Link, Redirect } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import TraceWebsite from './TraceWebsite';
import TraceInterface from './TraceInterface';
const { Content, Sider } = Layout;

const traceSidebarList = [
  {
    path: '/interface',
    component: TraceInterface,
    navName: '接口统计'
  },
  {
    path: '/website',
    component: TraceWebsite,
    navName: '导航统计'
  }
];

class Trace extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogoBack = () => {
    this.props.history.replace('/home');
  }

  render() {
    const MenuItemList = traceSidebarList.map((item) => 
      <Menu.Item key={item.path}>
        <Link to={`${this.props.match.url}${item.path}`}>
          <span>{ item.navName }</span>
        </Link>
      </Menu.Item>
    );

    const RouteList = traceSidebarList.map((item) =>
      <Route key={item.path} path={`${this.props.match.url}${item.path}`} component={item.component}></Route>
    );

    const pathnameArr = this.props.location.pathname.split('/')
    const defaultMenu = '/' + (pathnameArr[2] || 'interface');

    return (
      <Layout>
        <Sider className="module-sider">
          <div className="module-sider-logo">
            <img src={'../img/trace.png'} alt="" onClick={this.handleLogoBack}/>
          </div>
          <Menu theme="dark" model="inline" defaultSelectedKeys={[defaultMenu]}>
            { MenuItemList }
          </Menu>
        </Sider>
        <Layout>
          <Content>
            { RouteList }
            <Route exact path={this.props.match.url} render={() => (
              <Redirect to={`${this.props.match.url}/interface`} />
            )} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Trace;