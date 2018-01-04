import React, { Component } from 'react';
import './CoffeeBeverageInfo.less';

import coffeeAPI from '../../api/coffee';
import { Modal, Form, Input, message } from 'antd';

class CoffeeBeverageInfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      okLoading: false,
      currentCoffeeBeverage: {},
    };
    this.info = {
      title: '',
      ok: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    // 初始化
    this.state.currentCoffeeBeverage = Object.assign({
      name_cn: '',
      name_en: '',
      origin: ''
    }, nextProps.coffeebeverage)
    if(!nextProps.coffeebeverage) {
      this.info.title = '新增咖啡饮料'
    } else {
      this.info.title = '修改咖啡饮料'
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
        if (this.state.currentCoffeeBeverage.id) {
          result = await coffeeAPI.updateCoffeeBeverage(Object.assign(values, {
            id: this.state.currentCoffeeBeverage.id
          }));
        } else {
          result = await coffeeAPI.addCoffeeBeverage(values);
        }
        this.setState({
          okLoading: false
        });
        if (result) {
          message.success('新增咖啡饮料成功');
          this.props.form.resetFields();
          this.props.closeInfo(result);
        } else {
          message.error('新增咖啡饮料失败');
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
    const { currentCoffeeBeverage } = this.state;
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
            initialValue: this.state.currentCoffeeBeverage.name_cn,
            rules: [{ required: true, message: '名称(CN)不能为空!' }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="名称(EN)">
          {getFieldDecorator('name_en', {
            initialValue: this.state.currentCoffeeBeverage.name_en,
            rules: [{ required: false, message: '名称(EN)不能为空!' }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="产地">
          {getFieldDecorator('origin', {
            initialValue: this.state.currentCoffeeBeverage.origin,
            rules: [{ required: false, message: '产地不能为空!' }],
          })(
            <Input />
          )}
        </Form.Item>
      </Modal>
    );
  } 
}

const CoffeeBeverageInfo = Form.create()(CoffeeBeverageInfoModal);

export default CoffeeBeverageInfo;