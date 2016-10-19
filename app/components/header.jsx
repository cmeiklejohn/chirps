let React = require('react');
let AddCweep = require('./add_cweep.jsx').AddCweep;

exports.Header = React.createClass({
  componentWillMount: function () {
    this.props.modelList.on('add', function () {
      this.setState({ addCweepShown: false });
    }.bind(this));
  },
  getInitialState: function () {
    return {
      addCweepShown: false
    };
  },
  showAddCweep: function () {
    this.setState({ addCweepShown: true });
  },
  render: function () {
    var addCweep;

    if (this.state.addCweepShown) {
      addCweep = <AddCweep modelList={this.props.modelList}/>;
    }

    return (
      <header>
        <div className='header'>
          <h1>Cweepy</h1>
          <div className='add-cweep' onClick={this.showAddCweep}>+</div>
        </div>
        {addCweep}
      </header>
    );
  }
});
