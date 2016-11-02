import React from 'react';
import { AddChirp as AddChirp } from './add_chirp.jsx';;

exports.Header = React.createClass({
  componentWillMount: function () {
    this.props.modelList.on('add', function () {
      this.setState({ addChirpShown: false });
    }.bind(this));
  },
  getInitialState: function () {
    return {
      addChirpShown: false
    };
  },
  showAddChirp: function () {
    this.setState({ addChirpShown: true });
  },
  render: function () {
    var addChirp;

    if (this.state.addChirpShown) {
      addChirp = <AddChirp modelList={this.props.modelList}/>;
    }

    return (
      <header>
        <div className='header'>
          <h1>Chirps</h1>
          <div className='add-chirp' onClick={this.showAddChirp}>+</div>
        </div>
        {addChirp}
      </header>
    );
  }
});
