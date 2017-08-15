import React, { Component } from 'react';
import './App.css';
import { Kpi  } from '@gooddata/react-components'
import C from './catalog'

import SingleMeasure from './SingleMeasure'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <p>GoodData Javascript UI SDK</p>
        </div>
        <div className="gd-metric">
          <Kpi
            projectId="nrjs8u9m5y01o8b3584jrx8rosc0ynhw"
            measure={C['Total Revenue [SUM] Activewear']} />
        </div>
        <SingleMeasure/>
      </div>
    );
  }
}

export default App;
