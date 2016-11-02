import React from 'react';
import { ChirpList as ChirpList } from "./../models/chirp_list.js";;
import { Header as Header } from './header.jsx';;
import { Chirps as Chirps } from './chirps.jsx';;

exports.UserTimeline = React.createClass({
  render: function () {
    let user = this.props.params.userId
    var chirpList = new ChirpList(user);

    return (
        <div className='app'>
          <Header modelList={chirpList} />
          <Chirps modelList={chirpList} />
        </div>
    );
  }
});
