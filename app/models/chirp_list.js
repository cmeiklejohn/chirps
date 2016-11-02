import { RestModelList as RestModelList } from "./rest_model_list.js";;
import { Chirp as Chirp } from './chirp.js';;

exports.ChirpList = class ChirpList extends RestModelList {

  constructor(user) {
    super();

    this.model = Chirp;
    this.root = '/api/timeline/';
    if (user) {
      this.root += user;
    }
  }

}
