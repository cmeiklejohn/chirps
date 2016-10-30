import React from 'react';
import { CweepList as CweepList } from "./../models/cweep_list.js";;
import { Header as Header } from './header.jsx';;
import { Cweeps as Cweeps } from './cweeps.jsx';;

exports.Home = React.createClass({
  render: function () {
    var cweepList = new CweepList();
    return (
        <div className='app'>
          <Header modelList={cweepList} />
          <Cweeps modelList={cweepList} />
        </div>
    );
  }
});