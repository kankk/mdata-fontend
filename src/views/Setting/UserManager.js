import React, { Component } from 'react';
import './UserManager.less';

import moment from 'moment';

import { Spin, Table } from 'antd';
import UserManagerInfo from './UserManagerInfo';
import userAPI from '../../api/user';

class UserManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: false,
      visbileUserInfo: false,
    };
    this.selectedUser = null;
    this.columns = [{
      title: '用户名',
      dataIndex: 'username',
      key: 'username'
    }, {
      title: '注册时间',
      dataIndex: 'create_stamp',
      key: 'create_stamp',
      render: text => <span>{ moment(text).format('ll') }</span>
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={() => this.handleEditPassword(record)}>修改密码</a>
        </span>
      )
    }];
  }

  handleEditPassword = (user) => {
    this.selectedUser = user;
    this.setState({
      visbileUserInfo: true
    });
  }

  closeInfo = () => {
    this.setState({
      visbileUserInfo: false
    });
  }

  async componentDidMount() {
    this.setState({
      isLoading: true
    }, async () => {
      try {
        const users = await userAPI.getAllUsers();
        this.setState({
          isLoading: false,
          users
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  render() {
    const { isLoading, visbileUserInfo, users } = this.state;
    // 为users对象添加key属性 => react的循环输出
    for(let user of users) {
      user.key = user.username;
    }
    return (
      <div className="user-manager module-content">
        <Spin spinning={isLoading}>
          <Table bordered columns={this.columns} dataSource={users} pagination={false}/>
        </Spin>
        <UserManagerInfo user={this.selectedUser} visible={visbileUserInfo} closeInfo={this.closeInfo}/>
      </div>
    );
  }
}

export default UserManager;