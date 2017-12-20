import React, { Component } from 'react';
import './Login.less';

import userAPI from './../../api/user';
import authorityAPI from '../../api/authority';
import { res_result } from './../../api/network';

import Register from './Register';

import { Form, Icon, Input, Button, message } from 'antd';
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

  handleSubmit = async (e) => {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    if (username !== '' && password !== '') {
      try {
        const loading = message.loading('注册中...', 0);
        const result = await userAPI.login({
          username,
          password
        });
        setTimeout(loading, 0);
        if (result) {
          message.success('登录成功');
        } else {
          message.error('用户名或者密码错误');
        }
      } catch (err) {
        message.error(res_result.globalServerError);
      }
    } else {
      message.warn('用户名或者密码不能为空')
    }
  }

  handleRegisterSpan = () => {
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

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  async componentWillMount() {
    try {
      const result = await authorityAPI.getRegisterAuthority();
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
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)'}}/>} value={password} onChange={this.handlePasswordChange} type="password" placeholder="密码"/>
            </FormItem>
            { isAllowRegister &&
              <FormItem>
                <span className="login-box-change" onClick={this.handleRegisterSpan}>注册</span>
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