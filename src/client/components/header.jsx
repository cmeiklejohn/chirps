import * as React from 'react';
import { AddChirp } from './add_chirp';


export class Header extends React.Component {

  constructor() {
    super();
    this.state = {
      addChirpShown: false
    };
  }

  showAddChirp() {
    this.setState({ addChirpShown: true });
  }

  async onChirpAdded(chirp) {
    await this.props.onChirpAdded(chirp);
    this.setState({ addChirpShown: false });
  }

  render() {
    let addChirp = undefined;

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
