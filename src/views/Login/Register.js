import React, { Component } from 'react';

import userAPI from './../../api/user';

import { Form, Icon, Input, Modal, message } from 'antd';
const FormItem = Form.Item;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      repassword: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      username: '',
      password: '',
      repassword: ''
    });
  }

  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value
    });
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  handleRepasswordChange = (e) => {
    this.setState({
      repassword: e.target.value
    });
  }

  handleOk = async () => {
    if (this.state.password === this.state.repassword) {
      const loading = message.loading('注册中...', 0);
      const user = {
        username: this.state.username,
        password: this.state.password
      };
      const result = await userAPI.register(user);
      setTimeout(loading, 0);
      if (result) {
        message.success('注册成功');
        this.props.onRegisterSuccess({
          username: this.state.username,
          password: this.state.password
        });
      } else {
        message.warn('用户名已存在');
      }
    } else {
      message.warn('密码与确认密码不相同');
    }
  }

  handleCancel = () => {
    this.props.onRegisterSuccess();
  }

  render() {
    const { username, password, repassword } = this.state;
    const { visible } = this.props;
    return (
      <Modal 
        visible={visible}
        title="注册"
        okText="注册"
        cancelText="取消"
        onCancel={this.handleCancel}
        onOk={this.handleOk}>
        <Form onSubmit={this.handleSubmit} className="login-box-form">
            <FormItem>
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />} value={username} onChange={this.handleUsernameChange} placeholder="用户名"/>
            </FormItem>
            <FormItem>
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)'}} />} value={password} onChange={this.handlePasswordChange} type="password" placeholder="密码"/>
            </FormItem>
            <FormItem>
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)'}} />} value={repassword} onChange={this.handleRepasswordChange} type="password" placeholder="确认密码"/>
            </FormItem>
          </Form>
      </Modal>
    );
  }
}

export default Register;