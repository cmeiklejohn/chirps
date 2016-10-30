import React from 'react';
import { CweepItem as CweepItem } from './cweep_item.jsx';;

exports.Cweeps = React.createClass({
  componentWillMount: function () {
    var modelList = this.props.modelList;

    modelList.on('load', this.setModelListState);
    modelList.on('add', this.setModelListState);
  },
  componentDidMount: function () {
    this.props.modelList.load();
  },
  setModelListState: function () {
    this.setState({ cweeps: this.props.modelList.toArray() });
  },
  getInitialState: function () {
    return { cweeps: [] };
  },
  render: function () {
    var cweeps = this.state.cweeps.map(function (cwp, i) {
      return <CweepItem key={i} cweep={cwp}/>
    });
    return (
      <ul className='cweep-list' >{cweeps}</ul>
    );
  }
});
