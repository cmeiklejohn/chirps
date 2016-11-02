import React from 'react';
import { ChirpList as ChirpList } from "./../models/chirp_list.js";;
import { Header as Header } from './header.jsx';;
import { Chirps as Chirps } from './chirps.jsx';;

exports.Home = React.createClass({
  render: function () {
    var chirpList = new ChirpList();
    return (
        <div className='app'>
          <Header modelList={chirpList} />
          <Chirps modelList={chirpList} />
        </div>
    );
  }
});
