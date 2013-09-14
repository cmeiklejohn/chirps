class Eventable {

  on(evt, handler) {
    this._handlers = this._handlers || {};
    this._handlers[evt] = this._handlers[evt] || [];
    this._handlers[evt].push(handler);
  }

  fire(evt) {
    var handlers = this._handlers && this._handlers[evt];

    if (handlers) {
      for (var i = 0; i < handlers.length; i++) {
        handlers[i]();
      }
    }
  }

}
