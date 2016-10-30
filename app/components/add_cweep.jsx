let React = require('react');
let Cweep = require('../models/cweep.js').Cweep;

function avatar() {
  // Get some random avatar 
  // TODO probably better to use local images for demo?
  //return 'https://robohash.org/' + Math.random() + '?size=52x52';
  return `https://api.adorable.io/avatars/52/${Math.random()}.png`;
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
      <div className='add-cweep-form'>
        <input type='text' className='message' onChange={this.onInputChange} />
        <a className='button post' onClick={this.save}>POST!</a>
      </div>
    );
  }
});
