import React, { Component } from 'react';
import './Login.less';

import userAPI from './../../api/user';
import authorityAPI from '../../api/authority';
import { res_result } from './../../api/network';
import storeHelper from '../../helper/storeHelper';

import Register from './Register';

import { Redirect } from 'react-router-dom';

import { Form, Icon, Input, Button, message } from 'antd';
const FormItem = Form.Item;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAllowRegister: false,
      isAllowVisitor: false,
      visibleRegister: false,
      logining: false,
      username: '',
      password: ''
    };
  }

  handleSubmit = async (isLogin) => {
    const username = this.state.username;
    const password = this.state.password;
    if ((username !== '' && password !== '') || this.state.isAllowVisitor) {
      try {
        this.setState({
          logining: true
        });
        const result = await userAPI.login({
          username,
          password
        }, isLogin);
        this.setState({
          logining: false
        });
        if (result) {
          message.success('登录成功');
          this.setState({
            username: '',
            password: ''
          });
          this.props.history.replace('/home');
        } else {
          message.error('用户名或者密码错误');
        }
      } catch (err) {
        console.log(err);
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

  async componentDidMount() {
    try {
      const result = await authorityAPI.getAllModules();
      const resuult2 = await userAPI.checkUserStatus();
      if (result) {
        this.setState({
          isAllowRegister: storeHelper.getAModuleByName('register').status,
          isAllowVisitor: storeHelper.getAModuleByName('visitor').status
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/home'}};
    
    if(storeHelper.getLoginStatus()) {
      return (
        <Redirect to={from} />
      )
    }

    const { isAllowRegister, isAllowVisitor, visibleRegister, logining, username, password } = this.state;
    return (
      <div className="login">
        <div className="login-box">
          <h4>登录</h4>
          <Form className="login-box-form">
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
              <Button type="primary" htmlType="submit" loading={logining} onClick={() => this.handleSubmit(true)}>登录</Button>
            </FormItem>
            { isAllowVisitor &&
              <FormItem>
                <Button type="primary" htmlType="submit" loading={logining} onClick={() => this.handleSubmit(false)}>游客登录</Button>
              </FormItem>
            }
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