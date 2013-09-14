var $__getDescriptors = function(object) {
  var descriptors = {}, name, names = Object.getOwnPropertyNames(object);
  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    descriptors[name] = Object.getOwnPropertyDescriptor(object, name);
  }
  return descriptors;
}, $__createClassNoExtends = function(object, staticObject) {
  var ctor = object.constructor;
  Object.defineProperty(object, 'constructor', {enumerable: false});
  ctor.prototype = object;
  Object.defineProperties(ctor, $__getDescriptors(staticObject));
  return ctor;
};
var CweepyApp = function() {
  var $CweepyApp = ($__createClassNoExtends)({
    constructor: function() {
      this.cweepList = new CweepList();
    },
    get views() {
      return {cweeps: {type: CweepListView}};
    },
    render: function() {
      React.renderComponent(Header(null), document.getElementById('content'));
      return this;
    },
    showCweeps: function() {
      this.cweepList.load((function() {
        console.log(this.cweepList.items);
      }).bind(this));
    }
  }, {});
  return $CweepyApp;
}();
