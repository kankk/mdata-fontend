import React, { Component } from 'react';
import './ShoppingRecordInfo.less';

import { Modal, Form, Input, message } from 'antd';
import recordAPI from '../api/shoppingRecord';

class ShoppingRecordInfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      okLoading: false,
      currentShoppingRecord: {},
    };
    this.info = {
      title: '',
      ok: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    // 初始化
    this.state.currentShoppingRecord = Object.assign({
      name_cn: '',
      name_en: '',
      origin: '',
      mouthfeel: '',
    }, nextProps.record)
    if(!nextProps.record) {
      this.info.title = '新增消费记录'
    } else {
      this.info.title = '修改消费记录'
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
        if (this.state.currentShoppingRecord.id) {
          result = await recordAPI.updateShoppingRecord(Object.assign(values, {
            id: this.state.currentShoppingRecord.id
          }));
        } else {
          result = await recordAPI.addShoppingRecord(values);
        }
        this.setState({
          okLoading: false
        });
        if (result) {
          message.success('新增消费记录成功');
          this.props.form.resetFields();
          this.props.closeInfo(result);
        } else {
          message.error('新增消费记录失败');
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
    const { currentShoppingRecord } = this.state;
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
            initialValue: currentShoppingRecord.name_cn,
            rules: [{ required: true, message: '名称(CN)不能为空!' }],
          })(
            <Input />
          )}
        </Form.Item>
      </Modal>
    );
  } 
}

const ShoppingRecordInfo = Form.create()(ShoppingRecordInfoModal);

export default ShoppingRecordInfo;