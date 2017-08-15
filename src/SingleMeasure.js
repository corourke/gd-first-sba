import React, { Component } from 'react';
import { DataTable, SimpleExecutorAdapter } from '@gooddata/data-layer';
import * as sdk from 'gooddata';
import C from './catalog'
import GD from './gooddataConfig'

const afm = {
  measures: [
    {
      id: 'total_revenue',
      definition: {
        baseObject: {
          id: C['_Close [BOP]']
        }
      }
    }
  ]
};

// All this seems to do is include the title and format in the result headers
const transformation = {
  measures: [
    {
      id: 'total_revenue',
      title: 'Revenue',
      format: '#,##0.00'
    }
  ]
};

const adapter = new SimpleExecutorAdapter(sdk, GD.workspace);

const dataTable = new DataTable(adapter);



class SingleMeasure extends Component {
  constructor(props) {
    super(props)
    this.state = {data: {isLoaded: false}}

    dataTable.execute(afm, transformation).then((data) => {
      console.log(data);
      this.setState({data: data})
    }).catch((err) => {
      console.error(err);
      this.setState({data: "ERROR: " + err})
    });
  }

  render() {
    let data = this.state.data
    let content = <div><p>Loading...</p></div>
    if(data.isLoaded) content = (
      <div>
        <p className="gd-metric-name">
          {data.headers[0].title ? data.headers[0].title : data.headers[0].id}
        </p>
        <p className="gd-metric-value">{data.rawData[0]}</p>
      </div>
    )

    return (
      <div className="gd-metric">
        {content}
      </div>
    );
  }
}

export default SingleMeasure;