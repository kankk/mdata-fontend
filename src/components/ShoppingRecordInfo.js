import React, { Component } from 'react';
import './ShoppingRecordInfo.less';

import moment from 'moment';
import { Modal, Form, Input, message, DatePicker, Rate, InputNumber} from 'antd';
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
    this.setState({
      currentShoppingRecord: Object.assign({
        fid: '',
        uid: '',
        title: '',
        source: '',
        price: '',
        quantity: '',
        remark: '',
        rate: 0,
        buy_date: moment()
      }, nextProps.record)
    });
    if(!nextProps.record || !nextProps.record.id) {
      this.info.title = '新增消费记录'
    } else {
      this.info.title = '修改消费记录'
    }
  }

  handleOk = () => {
    this.props.form.validateFields(async(err, values) => {
      if (!err) {
        this.setState({
          okLoading: true
        }, async() => {
            // 表单验证通过
            let result;
            // 格式化日期
            values.buy_date = (new Date(values.buy_date)).toLocaleDateString();
            Object.assign(values, {
              uid: this.state.currentShoppingRecord.uid,
              fid: this.state.currentShoppingRecord.fid
            });
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
        });
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

    const modalStyle = {
      top: 20
    }

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
      <Modal title={this.info.title} visible={visible} onOk={this.handleOk} onCancel={this.handleCancel} style={modalStyle}>
        <Form.Item {...formItemLayout} label="日期">
          {getFieldDecorator('buy_date', {
            initialValue: moment(currentShoppingRecord.buy_date) || currentShoppingRecord.buy_date,
            rules: [{ required: true, message: '日期不能为空!' }],
          })(
            <DatePicker />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="标题">
          {getFieldDecorator('title', {
            initialValue: currentShoppingRecord.title,
            rules: [{ required: true, message: '标题不能为空!' }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="来源">
          {getFieldDecorator('source', {
            initialValue: currentShoppingRecord.source,
            rules: [{ required: true, message: '来源不能为空!' }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="价格">
          {getFieldDecorator('price', {
            initialValue: currentShoppingRecord.price || 0,
            rules: [{ required: true, message: '价格不能为空!' }],
          })(
            <InputNumber min={0} />
          )}
          <span style={{ marginLeft: 8 }}>元</span>
        </Form.Item>
        <Form.Item {...formItemLayout} label="数量">
          {getFieldDecorator('quantity', {
            initialValue: currentShoppingRecord.quantity,
            rules: [{ required: true, message: '来源不能为空!' }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="备注">
          {getFieldDecorator('remark', {
            initialValue: currentShoppingRecord.remark
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="评分">
          {getFieldDecorator('rate', {
            initialValue: currentShoppingRecord.rate
          })(
            <Rate count={10} />
          )}
        </Form.Item>
      </Modal>
    );
  } 
}

const ShoppingRecordInfo = Form.create()(ShoppingRecordInfoModal);

export default ShoppingRecordInfo;