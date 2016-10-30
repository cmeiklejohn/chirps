let Eventable = require('./eventable.js').Eventable;
let RestModel = require('./rest_model.js').RestModel;

exports.RestModelList = class RestModelList extends Eventable {

  constructor() {
    super();
    this.model = RestModel;
    this.items = [];
  }

  load(success) {
    reqwest({
      url: this.root,
      method: 'get',
      type: 'json',
      success: (resp) => {
        this.reset(resp);
        if (typeof success === 'function' ) {
          success();
        }

        this.fire('load');
      }
    });
  }

  reset(data = []) {
    this.items = data.map( d => new this.model(d) );
    this.fire('reset');
  }

  add(item) {
    this.items.unshift(item);
    this.fire('add');
  }

  toArray() {
    return this.items;
  }

}
