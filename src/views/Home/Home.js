import React, { Component } from 'react';
import './Home.less';

import { Layout, Card, Icon } from 'antd';
const { Header, Content, Footer } = Layout;
// const { Meta } = Card;

const cardItems = [
  {
    name: 'coffee',
    path: '/coffee',
    title: '咖啡',
    description: '关于咖啡的内容'
  }
]

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleCardClick = (path) => {
    this.props.history.push(path);
  }

  handleSettingClick = () => {
    this.props.history.push('/setting');
  }

  render() {
    const contentStyle = {
      margin: '16px 16px 0px 16px',
      padding: '24px',
      background: '#fff'
    };

    const cardStyle = {
      width: '200px'
    };
    const cardsHTML = cardItems.map((item) => 
      <Card key={item.name} hoverable style={cardStyle} title={item.title} onClick={this.handleCardClick.bind(this, item.path)}>
        <p>{ item.description }</p>
      </Card>
    );

    return (
      <Layout className="home">
        <Header className="home-header">
          <div className="home-header-item home-header-left"></div>
          <div className="home-header-item home-header-center">模块库</div>
          <div className="home-header-item home-header-right">
            <Icon className="icon-clickable" type="setting" onClick={this.handleSettingClick}/>
          </div>
        </Header>
        <Content style={contentStyle}>
          { cardsHTML }
        </Content>
        <Footer style={{ textAlign: 'center', padding: '16px'}}>
          KanKK Design ©2017 Created by KanKK (286454796@qq.com)
        </Footer>
      </Layout>
    );
  }
}

export default Home;