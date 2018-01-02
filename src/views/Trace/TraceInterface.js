import React, { Component } from 'react';
import './TraceInterface.less';

import traceAPI from '../../api/trace';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';

class TraceInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateApis: []
    };
    this.dateCols = {
      total: { alias: '次数' },
      date: { alias: '日期' }
    };
  }

  async componentDidMount() {
    try {
      const dateApis = await traceAPI.countInterfaceByDates();
      this.setState({
        dateApis
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { dateApis } = this.state;
    const dateApisHTML = dateApis.map((item) => 
      <div key={item.date} >{ item.date } - { item.total }</div>
    );
    return (
      <div className="authority-module module-content">
        {/* <Chart forceFit={true} height={400} data={dateApis} scale={this.dateCols}>
          <Axis name="date"></Axis>
          <Axis name="total"></Axis>
          <Legend position="top" dy={-20} />
          <Tooltip />
          <Geom type="interval" position="date*total" />
        </Chart> */}
        { dateApisHTML }
      </div>
    );
  }
}

export default TraceInterface;