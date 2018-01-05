import React, { Component } from 'react';
import './Home.less';

import {store} from '../../index';
import userAPI from '../../api/user';
import {res_result} from '../../api/network';

import { Layout, Card, Icon, Row, Col, Popconfirm, message } from 'antd';
const { Header, Content, Footer } = Layout;

const cardItems = [
  {
    name: 'coffee',
    path: '/coffee',
    title: '咖啡',
    description: '关于咖啡的模块'
  }, {
    name: 'trace',
    path: '/trace',
    title: '统计',
    description: '关于统计的模块'
  }
]

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleCardClick = (path) => {
    this.props.history.push(path);
  }

  handleSettingClick = () => {
    this.props.history.push('/setting');
  }

  handleLogoutClick = async () => {
    try {
      const result = await userAPI.logout();
      if (result) {
        
        this.props.history.replace('/');
      } else {
        message.warn('登出失败, 请重试');
      }
    } catch (err) {
      console.log(err);
      message.error(res_result.globalServerError);
    }
  }

  render() {
    const contentStyle = {
      margin: '16px 16px 0px 16px',
      padding: '24px',
      background: '#fff'
    };

    const iconStyle = {
      'marginLeft': '16px'
    }

    const cardsHTML = cardItems.map((item) => 
      <Col span={6} key={item.name}>
        <Card key={item.name} hoverable title={item.title} onClick={this.handleCardClick.bind(this, item.path)}>
          <p>{ item.description }</p>
        </Card>
      </Col>
    );

    return (
      <Layout className="home">
        <Header className="home-header">
          <div className="home-header-item home-header-left"></div>
          <div className="home-header-item home-header-center">模块库</div>
          <div className="home-header-item home-header-right">
            <Icon style={iconStyle} className="icon-clickable" type="setting" onClick={this.handleSettingClick}/>
            <Popconfirm placement="bottomRight" title={'是否确定登出?'} onConfirm={this.handleLogoutClick} okText="确定" cancelText="取消">
              <Icon style={iconStyle} className="icon-clickable" type="logout" />
            </Popconfirm>
          </div>
        </Header>
        <Content style={contentStyle}>
          <Row gutter={32}>
            { cardsHTML }
          </Row>
        </Content>
        <Footer style={{ textAlign: 'center', padding: '16px'}}>
          KanKK Design ©2017 Created by KanKK (286454796@qq.com)
        </Footer>
      </Layout>
    );
  }
}

export default Home;