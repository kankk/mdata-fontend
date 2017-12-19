import React, { Component } from 'react';

import { Form, Icon, Input, Modal } from 'antd';
const FormItem = Form.Item;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      username: '',
      password: '',
      repassword: ''
    };
  }

  static defaultProps = {
    visible: false
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
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

  handleOk = () => {
    this.setState({
      visible: false
    }, () => {
      this.props.onRegisterSuccess({
        username: this.state.username,
        password: this.state.password
      });
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false
    }, () => {
      this.props.onRegisterSuccess();
    });
  }

  render() {
    const { visible, username, password, repassword } = this.state;
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