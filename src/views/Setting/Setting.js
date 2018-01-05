import React, { Component } from 'react';
import './Setting.less';

import AuthorityModule from './AuthorityModule';
import UserManager from './UserManager';

import { Route, Link, Redirect } from 'react-router-dom';

import { Layout, Menu } from 'antd';
const { Content, Sider } = Layout;

const settingSidebarList = [
  {
    path: '/authoritymodule',
    component: AuthorityModule,
    navName: '模块权限'
  }, {
    path: '/usermanager',
    component: UserManager,
    navName: '用户管理'
  }
];

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogoBack = () => {
    this.props.history.replace('/home');
  }

  render() {
    const MenuItemList = settingSidebarList.map((item) => 
      <Menu.Item key={item.path}>
        <Link to={`${this.props.match.url}${item.path}`}>
          <span>{ item.navName }</span>
        </Link>
      </Menu.Item>
    );

    const RouteList = settingSidebarList.map((item) =>
      <Route key={item.path} path={`${this.props.match.url}${item.path}`} component={item.component}></Route>
    );

    return (
      <Layout>
        <Sider className="module-sider">
          <div className="module-sider-logo">
            <img src={'../img/setting.png'} alt="" onClick={this.handleLogoBack}/>
          </div>
          <Menu theme="dark" model="inline" defaultSelectedKeys={['/authoritymodule']}>
            { MenuItemList }
          </Menu>
        </Sider>
        <Layout>
          <Content>
            { RouteList }
            <Route exact path={this.props.match.url} render={() => (
              <Redirect to={`${this.props.match.url}/authoritymodule`} />
            )} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Setting;