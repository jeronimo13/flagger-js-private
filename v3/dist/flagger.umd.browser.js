(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Flagger = factory());
}(this, function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var Flagger =
  /*#__PURE__*/
  function () {
    function Flagger() {
      _classCallCheck(this, Flagger);
      console.log('inited');
    }

    _createClass(Flagger, [{
      key: "echo",
      value: function echo(phrase) {
        console.log(phrase);
      }
    }]);

    return Flagger;
  }();

  var _flagger = new Flagger();

  return _flagger;

}));
//# sourceMappingURL=flagger.umd.browser.js.map
