let React = require('react');
let Cweep = require('../models/cweep.js').Cweep;

function avatar() {
  return 'https://robohash.org/' + Math.random();
}

exports.AddCweep = React.createClass({
  getInitialState: function () {
    return {
      cweep: new Cweep({ avatar: avatar() })
    };
  },
  onInputChange: function (ev) {
    this.state.cweep.message = ev.target.value;
  },
  save: function () {
    var cweep = this.state.cweep;

    this.props.modelList.add(cweep);
    cweep.save();
  },
  render: function () {
    return (
      <div class='add-cweep-form'>
        <input type='text' class='message' onChange={this.onInputChange}/>
        <a class='button post' onClick={this.save}>POST!</a>
      </div>
    );
  }
});
