let React = require('react');
let CweepList = require("./../models/cweep_list.js").CweepList;
let Header = require('./header.jsx').Header;
let Cweeps = require('./cweeps.jsx').Cweeps;

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