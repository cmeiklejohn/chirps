let RestModelList = require("./rest_model_list.js").RestModelList;
let Cweep = require('./cweep.js').Cweep;

exports.CweepList = class CweepList extends RestModelList {

  constructor() {
    super();

    this.model = Cweep;
    this.root = '/cweeps';
  }

}
