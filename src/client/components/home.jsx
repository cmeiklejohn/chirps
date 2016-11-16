import * as React from 'react';
import { Header } from './header';
import { Chirps } from './chirps';
import * as api from '../models/chirps'


export class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      status: 'loading',
      chirps: [],
      newChirps: []
    }
    this.loadChirps()
  }

  async loadChirps() {
    try {
      let chirps = await api.getTimeline();
      this.setState({
        status: 'ready',
        chirps: chirps
      })
    } catch (e) {
      this.setState({
        status: 'failed'
      })
    }
  }

  async addChirp(chirp) {
    await api.saveChirp(chirp);
    // add chirp to current list of chirps
    this.setState({
      newChirps: [chirp].concat(this.state.newChirps)
    })
  }

  render() {
    let body;
    if (this.state.status == 'ready') {
      let chirps = this.state.newChirps.concat(this.state.chirps);
      body = <Chirps chirps={chirps} />
    } else if (this.state.status == 'loading') {
      body = <div>Loading ...</div>;
    } else if (this.state.status == 'failed') {
      body = <div>Could not load messages</div>;
    } else {
      throw new Error();
    }
    

    return (
      <div className='app'>
        <Header onChirpAdded={this.addChirp.bind(this)} />
        {body}
      </div>
    );
  }
}
