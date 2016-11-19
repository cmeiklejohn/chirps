import * as React from 'react';
import { Header } from './header';
import { Chirps } from './chirps';
import { Home } from './home'
import { UserTimeline } from './userTimeline'
import { Router, Route, Link, browserHistory } from 'react-router'

export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 'home'
    };
  }

  render() {

    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home} />
        <Route path="/timeline/:userId" component={UserTimeline} />
      </Router>
    );
  }
}
