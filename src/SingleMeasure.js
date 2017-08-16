import React, { Component } from 'react';
import { DataTable, SimpleExecutorAdapter } from '@gooddata/data-layer';
import * as sdk from 'gooddata';
import C from './catalog'
import GD from './gooddataConfig'
import './App.css';

const adapter = new SimpleExecutorAdapter(sdk, GD.workspace);

const dataTable = new DataTable(adapter);

class SingleMeasure extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      afm: {
        measures: [
          {
            id: 'single-measure',
            definition: {
              baseObject: {
                id: C[props.measure]
              }
            }
          }
        ]
      },
      transformation: {
        measures: [
          {
            id: 'single-measure',
            title: props.title,
            format: "#,##0.00"
          }
        ]
      }
    };

    dataTable.execute(this.state.afm, this.state.transformation).then((data) => {
      console.log(data);
      this.setState({data: data})
    }).catch((err) => {
      console.error(err);
      this.setState({data: err})
    });

  }

  render() {
    let data = this.state.data

    return (
      !data.isLoaded ?
      <div className="gd-metric">Loading...</div>
      :
      <div className="gd-metric">
        <div className="gd-metric-name">{data.headers[0].title}</div>
        <div className="gd-metric-value">{data.rawData[0]}</div>
      </div>
    );
  }
}

export default SingleMeasure;