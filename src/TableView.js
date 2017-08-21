/* An attempt at using the Table component (incomplete, needs metadataSource */

import React, { Component } from 'react';
import { Table } from '@gooddata/react-components'
import sdk from 'gooddata'
import { SimpleExecutorAdapter } from '@gooddata/data-layer';
import C from './catalog'
import GD from './gooddataConfig'

class TableView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {isLoaded: false},
      metadataSource: null,
      dataSource: null,
      afm: {
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
      }
    }

    const adapter = new SimpleExecutorAdapter(sdk, GD.workspace)
    adapter.createDataSource({ afm: this.state.afm }).then(result => {
      this.setState({dataSource: result})
    });
  }

// <Table dataSource={} metadataSource={}
// locale={} height={} environment={} drillableItems={}
// stickyHeader={} onError={} onLoadingChanged={} afterRender={} pushData={}/>

  render() {

   return <div>
       <Table dataSource={this.state.datasource} metadataSource={this.state.metadataSource} />
      </div>
  }
}

export default TableView;