import React, { Component } from 'react';
import './UserManager.less';


import { Spin, Button, Icon, message, Table, Divider } from 'antd';
import userAPI from '../../api/user';

const columns = [{
  title: '用户名',
  dataIndex: 'username',
  key: 'username'
}, {
  title: '注册时间',
  dataIndex: 'create_stamp',
  key: 'create_stamp',
  render: text => <span>{ new Date(text).toLocaleDateString() }</span>
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a>修改密码</a>
    </span>
  )
}];

class UserManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: false
    };
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
    const { isLoading, users } = this.state;
    // 为users对象添加key属性 => react的循环输出
    for(let user of users) {
      user.key = user.username;
    }
    return (
      <div className="user-manager module-content">
        <Spin spinning={isLoading}>
          <Table bordered columns={columns} dataSource={users} pagination={false}/>
        </Spin>
      </div>
    );
  }
}

export default UserManager;