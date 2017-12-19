import React, { Component } from 'react';
import './Login.less';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class Login extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="login">
        <div className="login-box">
          <Form onSubmit={this.handleLogin} className="login-box-form">
            <FormItem>
              <Input />
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;