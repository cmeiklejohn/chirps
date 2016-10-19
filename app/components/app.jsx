let React = require('react');
let CweepList = require("./../models/cweep_list.js").CweepList;
let Header = require('./header.jsx').Header;
let Cweeps = require('./cweeps.jsx').Cweeps;

exports.app = React.createClass({
  render: function () {
    var cweepList = new CweepList();

    return (
      <div class='app'>
        <Header modelList={cweepList}/>
        <Cweeps modelList={cweepList}/>
      </div>
    );
  }
});