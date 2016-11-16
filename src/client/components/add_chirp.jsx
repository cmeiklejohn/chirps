import * as React from 'react';


function avatar() {
  // Get some random avatar 
  // TODO probably better to use local images for demo?
  //return 'https://robohash.org/' + Math.random() + '?size=52x52';
  return `https://api.adorable.io/avatars/52/${Math.random()}.png`;
}

export class AddChirp extends React.Component {
  constructor() {
    super();
    this.state = {
      chirp: {
        avatar: avatar(),
        message: "",
      },
      saving: false
    };
  }
  onInputChange(ev) {
    let message = ev.target.value;
    this.state.chirp.message = message;
  }
  async save() {
    try {
      this.setState({saving: true, error: undefined})
      var chirp = this.state.chirp;
      await this.props.onChirpAdded(chirp);
      this.setState({saving: false})
    } catch (e) {
      console.log("add_chirps error", e)
      this.setState({
        saving: false,
        error: "Could not store Chirp!"
      })
    }
  }
  render() {
    let errorMessage = (this.state.error) 
      ? <div className="error">{this.state.error}</div> 
      : undefined;

    let saveBtn = (this.state.saving)
      ? <div className='button post'>Saving ...</div>
      : <a className='button post' onClick={this.save.bind(this)}>POST!</a>
      

    return (
      <div className='add-chirp-form'>
        {errorMessage}
        <input type='text' className='message' onChange={this.onInputChange.bind(this)} />
        {saveBtn}
      </div>
    );
  }
}
