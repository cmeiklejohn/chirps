import rm from "./rest_model.js"

exports.Chirp = class Chirp extends rm.RestModel {

  constructor(props) {
    super(props);

    this.root = '/api/chirps';
  }

  serialize() {
    return {
      message:  this.message,
      avatar:   this.avatar
    };
  }

}
