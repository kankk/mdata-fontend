import React, { Component } from 'react';
import './TraceWebsite.less';

import traceAPI from '../../api/trace';
// import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';

class TraceWebsite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counts: []
    };
    this.dateCols = {
      total: { alias: '次数' },
      date: { alias: '日期' }
    };
  }

  async componentDidMount() {
    try {
      const counts = await traceAPI.countWebsitesByLink();
      this.setState({
        counts
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { counts } = this.state;
    const countHTML = counts.map((item) => 
      <div key={item.date} >{ item.link } - { item.count }</div>
    );
    return (
      <div className="authority-module module-content">
        { countHTML }
      </div>
    );
  }
}

export default TraceWebsite;