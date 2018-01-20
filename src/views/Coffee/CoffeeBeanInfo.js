import React, { Component } from 'react';
import './CoffeeBeanInfo.less';

import coffeeAPI from '../../api/coffee';
import { Modal, Form, Input, message } from 'antd';

class CoffeeBeanInfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      okLoading: false,
      currentCoffeeBean: {},
    };
    this.info = {
      title: '',
      ok: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    // 初始化
    this.setState({
      currentCoffeeBean: Object.assign({
        name_cn: '',
        name_en: '',
        origin: '',
        mouthfeel: '',
      }, nextProps.coffeebean)
    })
    if (!nextProps.coffeebean) {
      this.info.title = '新增咖啡豆'
    } else {
      this.info.title = '修改咖啡豆'
    }
  }

  handleOk = () => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({
          okLoading: true
        });
        // 表单验证通过
        let result;
        if (this.state.currentCoffeeBean.id) {
          result = await coffeeAPI.updateCoffeeBean(Object.assign(values, {
            id: this.state.currentCoffeeBean.id
          }));
        } else {
          result = await coffeeAPI.addCoffeeBean(values);
        }
        this.setState({
          okLoading: false
        });
        if (result) {
          message.success('新增咖啡豆成功');
          this.props.form.resetFields();
          this.props.closeInfo(result);
        } else {
          message.error('新增咖啡豆失败');
        }
      }
    });
  }

  handleCancel = () => {
    this.props.closeInfo();
  }

  render(){
    const { visible } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { currentCoffeeBean } = this.state;
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
      <Modal title={this.info.title} visible={visible} onOk={this.handleOk} onCancel={this.handleCancel}>
        <Form.Item {...formItemLayout} label="名称(CN)">
          {getFieldDecorator('name_cn', {
            initialValue: currentCoffeeBean.name_cn,
            rules: [{ required: true, message: '名称(CN)不能为空!' }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="名称(EN)">
          {getFieldDecorator('name_en', {
            initialValue: currentCoffeeBean.name_en,
            rules: [{ required: false, message: '名称(EN)不能为空!' }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="产地">
          {getFieldDecorator('origin', {
            initialValue: currentCoffeeBean.origin,
            rules: [{ required: false, message: '产地不能为空!' }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="口感">
          {getFieldDecorator('mouthfeel', {
            initialValue: currentCoffeeBean.mouthfeel,
            rules: [{ required: false, message: '口感不能为空!' }],
          })(
            <Input />
          )}
        </Form.Item>
      </Modal>
    );
  } 
}

const CoffeeBeanInfo = Form.create()(CoffeeBeanInfoModal);

export default CoffeeBeanInfo;