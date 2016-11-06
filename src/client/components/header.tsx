import * as React from 'react';
import { AddChirp } from './add_chirp';
import { Chirp } from '../../shared/chirp';


export interface Props {
  onChirpAdded(chirp: Chirp): Promise<Chirp>;
}

export interface State {
  addChirpShown: boolean;
}

export class Header extends React.Component<Props, State> {

  constructor() {
    super();
    this.state = {
      addChirpShown: false
    };
  }

  showAddChirp() {
    this.setState({ addChirpShown: true });
  }

  async onChirpAdded(chirp: Chirp) {
    await this.props.onChirpAdded(chirp);
    this.setState({ addChirpShown: false });
  }

  render() {
    let addChirp: JSX.Element | undefined;

    if (this.state.addChirpShown) {
      addChirp = <AddChirp onChirpAdded={this.onChirpAdded.bind(this)} />;
    }

    return (
      <header>
        <div className='header'>
          <h1>Chirps</h1>
          <div className='add-chirp' onClick={this.showAddChirp.bind(this)}>+</div>
        </div>
        {addChirp}
      </header>
    );
  }
}
