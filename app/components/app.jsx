let React = require('react');
let CweepList = require("./../models/cweep_list.js").CweepList;
let Header = require('./header.jsx').Header;
let Cweeps = require('./cweeps.jsx').Cweeps;
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