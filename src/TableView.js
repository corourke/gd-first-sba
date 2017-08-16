import React, { Component } from 'react';
import { Table } from '@gooddata/react-components'
import sdk from 'gooddata'
import { SimpleExecutorAdapter } from '@gooddata/data-layer';
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


class TableView extends Component {
  constructor(props) {
    super(props)
    this.state = {data: {isLoaded: false}}

    const adapter = new SimpleExecutorAdapter(sdk, GD.workspace)
    adapter.createDataSource({ afm: afm }).then(result => {
      this.setState({dataSource: result})
    });
  }

// <Table dataSource={this.state.datasource} metadataSource={}
// locale={} height={} environment={} drillableItems={}
// stickyHeader={} onError={} onLoadingChanged={} afterRender={} pushData={}/>

  render() {

   return <div>
       <Table dataSource={this.state.datasource} />
      </div>
  }
}

export default TableView;