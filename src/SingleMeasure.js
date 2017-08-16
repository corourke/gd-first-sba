import React, { Component } from 'react';
import { DataTable, SimpleExecutorAdapter } from '@gooddata/data-layer';
import * as sdk from 'gooddata';
import C from './catalog'

const adapter = new SimpleExecutorAdapter(sdk, 'nrjs8u9m5y01o8b3584jrx8rosc0ynhw');

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
      !data.headers ?
      <div>Loading...</div>
      :
      <div>
        <div>{data.headers[0].id}</div>
        <div>{data.rawData[0]}</div>
      </div>
    );
  }
}

export default SingleMeasure;