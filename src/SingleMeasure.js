import React, { Component } from 'react';
import { DataTable, SimpleExecutorAdapter } from '@gooddata/data-layer';
import * as sdk from 'gooddata';
import C from './catalog'

const afm = {
  measures: [
    {
      id: 'total_revenue',
      definition: {
        baseObject: {
          id: C['Total Revenue [SUM] Activewear']
        }
      }
    }
  ]
};

const transformation = {};

const adapter = new SimpleExecutorAdapter(sdk, 'nrjs8u9m5y01o8b3584jrx8rosc0ynhw');

const dataTable = new DataTable(adapter);



class SingleMeasure extends Component {
  constructor(props) {
    super(props)
    this.state = {data: "Loading..."}

    dataTable.execute(afm, transformation).then((data) => {
      console.log(data);
      this.setState({data: data})
    }).catch((err) => {
      console.error(err);
      this.setState({data: "ERROR: " + err})
    });
  }

  render() {
    return (
      <div>
        <p>{this.state.data}</p>
      </div>
    );
  }
}

export default SingleMeasure;