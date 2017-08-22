import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
            id: 'm1',
            definition: {
              baseObject: {
                id: C[props.measure]
              }
            }
          }
        ],
        attributes: [
          {
            id: C[props.dimension],
            type: 'attribute'
          }
        ]
      },
      transformation: {
        measures: [
          {
            id: 'm1',
            format: "#,##0.00"
          }
        ],
        sorting: [
          {
            column: 'm1',
            direction: 'desc'
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
      <div className="gd-table">Loading...</div>
      :
      <div className="gd-table">
        <table>
          <caption>{this.props.title}</caption>
          <tbody>
          { data.rawData.map( (item) => (
            <tr key={item[0].id}>
              <td>{item[0].name}</td>
              <td>{item[1]}</td>
            </tr>
            )
          )}
          </tbody>
        </table>
      </div>
    );
  }
}

SingleMeasure.propTypes = {
  measure: PropTypes.string.isRequired,     // The name of the measure to make values
  dimension: PropTypes.string.isRequired,   // The name of the dimension to make rows
  title: PropTypes.string                   // The caption for the table
}

export default SingleMeasure;