import React, { Component } from 'react';
import './Login.less';

import authority from '../../api/authority';

import Register from './Register';

import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      isAllowRegister: false,
      visibleRegister: false,
      username: '',
      password: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  handleChangeSpan = () => {
    this.setState({
      visibleRegister: true
    });
  }

  handleRegisterSuccess = (value) => {
    const updateState = {
      visibleRegister: false
    }
    if (value) {
      Object.assign(updateState, {
        username: value.username,
        password: value.password
      });
    }
    this.setState(updateState);
  }

  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value
    });
  }

  handlePasswrodChange = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  async componentWillMount() {
    try {
      const result = await authority.getRegisterAuthority();
      if (result) {
        this.setState({
          isAllowRegister: true
        })
      } else {
        this.setState({
          isAllowRegister: false
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { isAllowRegister, visibleRegister, username, password } = this.state;
    return (
      <div className="login">
        <div className="login-box">
          <h4>登录</h4>
          <Form onSubmit={this.handleSubmit} className="login-box-form">
            <FormItem>
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}}/>} value={username} onChange={this.handleUsernameChange} placeholder="用户名"/>
            </FormItem>
            <FormItem>
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)'}}/>} value={password} onChange={this.handlePasswrodChange} type="password" placeholder="密码"/>
            </FormItem>
            { isAllowRegister &&
              <FormItem>
                <span className="login-box-change" onClick={this.handleChangeSpan}>注册</span>
              </FormItem>
            }
            <FormItem>
              <Button type="primary" htmlType="submit">登录</Button>
            </FormItem>
          </Form>
          { isAllowRegister &&
            <Register visible={visibleRegister} onRegisterSuccess={this.handleRegisterSuccess}/>
          }
        </div>
      </div>
    );
  }
}

export default Login;