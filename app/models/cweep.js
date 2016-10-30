let rm = require("./rest_model.js")

exports.Cweep = class Cweep extends rm.RestModel {

  constructor(props) {
    super(props);

    this.root = '/api/cweeps';
  }

  serialize() {
    return {
      message:  this.message,
      avatar:   this.avatar
    };
  }

}
