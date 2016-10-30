import React from 'react';
import { CweepList as CweepList } from "./../models/cweep_list.js";;
import { Header as Header } from './header.jsx';;
import { Cweeps as Cweeps } from './cweeps.jsx';;
import { Home } from './home.jsx'
import { UserTimeline } from './userTimeline.jsx'
import { Router, Route, Link, browserHistory } from 'react-router'

exports.app = React.createClass({
  getInitialState: function () {
    return {
      page: 'home'
    };
  },
  render: function () {
    var cweepList = new CweepList();

    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home} />
        <Route path="/timeline/:userId" component={UserTimeline} />
      </Router>
    );
  }
});