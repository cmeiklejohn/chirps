import React from 'react';
import { ChirpItem as ChirpItem } from './chirp_item.jsx';;

exports.Chirps = React.createClass({
  componentWillMount: function () {
    var modelList = this.props.modelList;

    modelList.on('load', this.setModelListState);
    modelList.on('add', this.setModelListState);
  },
  componentDidMount: function () {
    this.props.modelList.load();
  },
  setModelListState: function () {
    this.setState({ chirps: this.props.modelList.toArray() });
  },
  getInitialState: function () {
    return { chirps: [] };
  },
  render: function () {
    var chirps = this.state.chirps.map(function (cwp, i) {
      return <ChirpItem key={i} chirp={cwp}/>
    });
    return (
      <ul className='chirp-list' >{chirps}</ul>
    );
  }
});
