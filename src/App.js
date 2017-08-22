import React, { Component } from 'react';
import './App.css';
import { Kpi } from '@gooddata/react-components'
import C from './catalog'
import GD from './gooddataConfig'

import SingleMeasure from './SingleMeasure'
import SmallTable from './SmallTable'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <p>GoodData Javascript UI SDK</p>
        </div>

        <p>Using a KPI... The total sales for this month is:&nbsp;
          <Kpi
            projectId={GD.workspace}
            measure={C['Total Revenue [SUM] Activewear']}
            format="#,.0K" /> which is above target.
        </p>

        <SingleMeasure measure="Total Revenue [SUM] Activewear" title="Total Revenue"/>

        <SmallTable measure="Total Revenue [SUM]" dimension="Sub Category Description" title="Total Revenue" />

      </div>
    );
  }
}

export default App;
