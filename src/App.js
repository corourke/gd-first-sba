import React, { Component } from 'react';
import './App.css';
import { Kpi, Visualization  } from '@gooddata/react-components'
import C from './catalog'

import SingleMeasure from './SingleMeasure'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <p>GoodData Javascript UI SDK</p>
        </div>
        <SingleMeasure/>
        <p>The total sales for this month is:&nbsp;
          <Kpi
            projectId="la84vcyhrq8jwbu4wpipw66q2sqeb923"
            measure={C['_Close [BOP]']}
            format="#,.0K" /> which is above target.
        </p>
        <div className="gd-viz">
        <Visualization
          uri="/gdc/md/la84vcyhrq8jwbu4wpipw66q2sqeb923/obj/344613"
          config={{
            colors: ['rgba(195, 49, 73, 1)', 'rgba(168, 194, 86, 1)'],
            legend: {
              enabled: true,
              position: 'bottom'
            }
          }}
        />
        </div>
      </div>
    );
  }
}

export default App;
