import React, { Component } from 'react';
import './AuthorityModule.less';

import authorityAPI from '../../api/authority';
import { Spin, List, Button, Icon, message, Switch } from 'antd';

class AuthorityModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      aModules: []
    };
  }

  async componentDidMount() {
    try {
      this.setState({
        isLoading: true
      }, async () => {
        const aModules = await authorityAPI.getAllModules();
        this.setState({
          isLoading: false,
          aModules
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  handleSwitchChange = (status, index) => {
    const _aModules = this.state.aModules;
    _aModules[index].status = status;
    try {
      this.setState({
        isLoading: true
      }, async () => {
        const result = await authorityAPI.updateAuthorityModule(_aModules[index]);
        if (result) {
          message.success('修改成功');
        } else {
          message.warn('修改失败');
          _aModules[index].status = !status;
        }
        this.setState({
          isLoading: false,
          aModules: _aModules
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { isLoading, aModules } = this.state;
    const listItemHTML = aModules.map((item, index) => 
      <div className="authority-module-item" key={item.name}>{ item.name_cn } <Switch className="authority-module-item-switch" checked={item.status} onChange={(status) => this.handleSwitchChange(status, index)}/></div>
    );

    return (
      <div className="authority-module module-content">
        <Spin spinning={isLoading}>
          { listItemHTML }
        </Spin>
      </div>
    );
  }
}

export default AuthorityModule;