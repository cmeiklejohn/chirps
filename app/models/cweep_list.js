let RestModelList = require("./rest_model_list.js").RestModelList;
let Cweep = require('./cweep.js').Cweep;

exports.CweepList = class CweepList extends RestModelList {

  constructor(user) {
    super();

    this.model = Cweep;
    this.root = '/api/timeline/';
    if (user) {
      this.root += user;
    }
  }

}
