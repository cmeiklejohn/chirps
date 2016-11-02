import React from 'react';
import { ChirpList as ChirpList } from "./../models/chirp_list.js";;
import { Header as Header } from './header.jsx';;
import { Chirps as Chirps } from './chirps.jsx';;
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
    var chirpList = new ChirpList();

    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home} />
        <Route path="/timeline/:userId" component={UserTimeline} />
      </Router>
    );
  }
});
