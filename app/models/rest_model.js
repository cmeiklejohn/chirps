class RestModel extends Eventable {

  constructor(props = {}) {
    this.setProps(props);
  }

  load(success) {
    reqwest({
      url: this.root,
      method: 'get',
      type: 'json',
      success: (resp) => {
        this.setProps(resp);
        if (typeof success === 'function' ) {
          success();
        }
        this.fire('load');
      }
    });
  }

  save(success) {
    reqwest({
      url: this.root,
      method: this.isNew ? 'post' : 'put',
      type: 'json',
      data: this.serialize(),
      success: (resp) => {
        this.setProps(resp);
        if (typeof success === 'function' ) {
          success();
        }
        this.fire('save');
      }
    });
  }

  get isNew() {
    return !this.id;
  }

  serialize() {
    return {};
  }

  setProps(props) {
    // todo convert to for-of when traceur supports
    for (var prop in props) {
      if (props.hasOwnProperty(prop)) {
        this[prop] = props[prop];
      }
    }
  }

}
