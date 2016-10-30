import React from 'react';
import { CweepList as CweepList } from "./../models/cweep_list.js";;
import { Header as Header } from './header.jsx';;
import { Cweeps as Cweeps } from './cweeps.jsx';;

exports.UserTimeline = React.createClass({
  render: function () {
    let user = this.props.params.userId
    var cweepList = new CweepList(user);

    return (
        <div className='app'>
          <Header modelList={cweepList} />
          <Cweeps modelList={cweepList} />
        </div>
    );
  }
});