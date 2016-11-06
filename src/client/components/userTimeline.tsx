import * as React from 'react';
import { Header } from './header';
import { Chirps } from './chirps';
import { Chirp, UserId } from '../../shared/chirp';
import * as api from '../models/chirps'

export interface Props {
  userId: UserId
}

export interface State {
  chirps: Chirp[] | 'loading';
}

export class UserTimeline extends React.Component<Props, State> {

  constructor() {
    super();
    this.state = {
      chirps: 'loading'
    }
    this.loadChirps()
  }

  async loadChirps() {
    let chirps = await api.getTimelineForUser(this.props.userId);
    this.setState({
      chirps: chirps
    })
  }

  async addChirp(chirp: Chirp) {
    // TODO
  }

  render() {
    return (
      <div className='app'>
        <Header onChirpAdded={this.addChirp.bind(this)} />
        <Chirps chirps={this.state.chirps} />
      </div>
    );
  }
}
