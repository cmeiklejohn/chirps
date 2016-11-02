import React from 'react';
import { Chirp as Chirp } from '../models/chirp.js';;

function avatar() {
  // Get some random avatar 
  // TODO probably better to use local images for demo?
  //return 'https://robohash.org/' + Math.random() + '?size=52x52';
  return `https://api.adorable.io/avatars/52/${Math.random()}.png`;
}

exports.AddChirp = React.createClass({
  getInitialState: function () {
    return {
      chirp: new Chirp({ avatar: avatar() })
    };
  },
  onInputChange: function (ev) {
    this.state.chirp.message = ev.target.value;
  },
  save: function () {
    var chirp = this.state.chirp;

    this.props.modelList.add(chirp);
    chirp.save();
  },
  render: function () {
    return (
      <div className='add-chirp-form'>
        <input type='text' className='message' onChange={this.onInputChange} />
        <a className='button post' onClick={this.save}>POST!</a>
      </div>
    );
  }
});
