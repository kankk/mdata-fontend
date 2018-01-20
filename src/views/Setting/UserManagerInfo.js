import React, { Component } from 'react';
import './UserManager.less';

import userAPI from '../../api/user';
import { Modal, Form, Input, message } from 'antd';

class UserManagerInfoModal extends Component {
  handleOk = () => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({
          okLoading: true
        });
        // 表单验证通过
        if (values.password !== values.rePassword) {
          message.warn('密码和确认密码必须一样');
          this.props.form.resetFields();
          this.setState({
            okLoading: false
          });
          return;
        }
        const { user } = this.props;
        let result;
        if (user.id) {
          result = await userAPI.changePassword(Object.assign(values, {
            id: user.id,
            username: user.username
          }));
        }
        this.setState({
          okLoading: false
        });
        if (result) {
          message.success('修改密码成功');
          this.props.form.resetFields();
          this.props.closeInfo();
        } else {
          message.error('修改密码失败');
        }
      }
    });
  }

  handleCancel = () => {
    this.props.form.resetFields();
    this.props.closeInfo();
  }

  render() {
    const { visible } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    return(
      <Modal title={'修改密码'} visible={visible} onOk={this.handleOk} onCancel={this.handleCancel}>
        <Form.Item {...formItemLayout} label="密码">
          {getFieldDecorator('password', {
            initialValue: '',
            rules: [{ required: true, message: '密码不能为空!' }],
          })(
            <Input type="password" placeholder="大于6位且小于15位字符"/>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="确认密码">
          {getFieldDecorator('rePassword', {
            initialValue: '',
            rules: [{ required: true, message: '确认密码不能为空!' }],
          })(
            <Input type="password" placeholder="大于6位且小于15位字符"/>
          )}
        </Form.Item>
      </Modal>
    );
  }
}

const UserManagerInfo = Form.create()(UserManagerInfoModal);

export default UserManagerInfo;