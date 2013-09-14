/** @jsx React.DOM */

var App = React.createClass({
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
