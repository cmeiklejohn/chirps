import * as React from 'react';
import { Header } from './header';
import { Chirps } from './chirps';
import { Chirp } from '../../shared/chirp';
import * as api from '../models/chirps'

export interface Props {

}

export interface State {
  status: 'loading' | 'ready' | 'failed';
  chirps: Chirp[];
  // chirps added in current session
  newChirps: Chirp[];
}

export class Home extends React.Component<Props, State> {

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
      } as State)
    } catch (e) {
      this.setState({
        status: 'failed'
      } as State)
    }
  }

  async addChirp(chirp: Chirp) {
    await api.saveChirp(chirp);
    // add chirp to current list of chirps
    this.setState({
      newChirps: [chirp].concat(this.state.newChirps)
    } as State)
  }

  render() {
    let body: JSX.Element;
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
