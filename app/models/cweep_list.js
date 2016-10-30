import { RestModelList as RestModelList } from "./rest_model_list.js";;
import { Cweep as Cweep } from './cweep.js';;

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
