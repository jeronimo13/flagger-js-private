function _typeof(obj) {
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function(obj) {
      return typeof obj
    }
  } else {
    _typeof = function(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj
    }
  }

  return _typeof(obj)
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  return Constructor
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function')
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  })
  if (superClass) _setPrototypeOf(subClass, superClass)
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o)
      }
  return _getPrototypeOf(o)
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p
      return o
    }

  return _setPrototypeOf(o, p)
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  }

  return self
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === 'object' || typeof call === 'function')) {
    return call
  }

  return _assertThisInitialized(self)
}

var global$1 =
  typeof global !== 'undefined'
    ? global
    : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
        ? window
        : {}

if (typeof global$1.setTimeout === 'function');

if (typeof global$1.clearTimeout === 'function');

var performance = global$1.performance || {}

var performanceNow =
  performance.now ||
  performance.mozNow ||
  performance.msNow ||
  performance.oNow ||
  performance.webkitNow ||
  function() {
    return new Date().getTime()
  } // generate timestamp or delta

function createCommonjsModule(fn, module) {
  return (module = {exports: {}}), fn(module, module.exports), module.exports
}

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function(it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it)
  return it
}

// 7.1.13 ToObject(argument)

var _toObject = function(it) {
  return Object(_defined(it))
}

var hasOwnProperty = {}.hasOwnProperty
var _has = function(it, key) {
  return hasOwnProperty.call(it, key)
}

var toString = {}.toString

var _cof = function(it) {
  return toString.call(it).slice(8, -1)
}

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0)
  ? Object
  : function(it) {
      return _cof(it) == 'String' ? it.split('') : Object(it)
    }

// to indexed object, toObject with fallback for non-array-like ES3 strings

var _toIobject = function(it) {
  return _iobject(_defined(it))
}

// 7.1.4 ToInteger
var ceil = Math.ceil
var floor = Math.floor
var _toInteger = function(it) {
  return isNaN((it = +it)) ? 0 : (it > 0 ? floor : ceil)(it)
}

// 7.1.15 ToLength

var min = Math.min
var _toLength = function(it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0 // pow(2, 53) - 1 == 9007199254740991
}

var max = Math.max
var min$1 = Math.min
var _toAbsoluteIndex = function(index, length) {
  index = _toInteger(index)
  return index < 0 ? max(index + length, 0) : min$1(index, length)
}

// false -> Array#indexOf
// true  -> Array#includes

var _arrayIncludes = function(IS_INCLUDES) {
  return function($this, el, fromIndex) {
    var O = _toIobject($this)
    var length = _toLength(O.length)
    var index = _toAbsoluteIndex(fromIndex, length)
    var value
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el)
      while (length > index) {
        value = O[index++]
        // eslint-disable-next-line no-self-compare
        if (value != value) return true
        // Array#indexOf ignores holes, Array#includes - not
      }
    else
      for (; length > index; index++)
        if (IS_INCLUDES || index in O) {
          if (O[index] === el) return IS_INCLUDES || index || 0
        }
    return !IS_INCLUDES && -1
  }
}

var _core = createCommonjsModule(function(module) {
  var core = (module.exports = {version: '2.6.5'})
  if (typeof __e == 'number') __e = core // eslint-disable-line no-undef
})
var _core_1 = _core.version

var _global = createCommonjsModule(function(module) {
  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global = (module.exports =
    typeof window != 'undefined' && window.Math == Math
      ? window
      : typeof self != 'undefined' && self.Math == Math
        ? self
        : // eslint-disable-next-line no-new-func
          Function('return this')())
  if (typeof __g == 'number') __g = global // eslint-disable-line no-undef
})

var _library = true

var _shared = createCommonjsModule(function(module) {
  var SHARED = '__core-js_shared__'
  var store = _global[SHARED] || (_global[SHARED] = {})

  ;(module.exports = function(key, value) {
    return store[key] || (store[key] = value !== undefined ? value : {})
  })('versions', []).push({
    version: _core.version,
    mode: 'pure',
    copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
  })
})

var id = 0
var px = Math.random()
var _uid = function(key) {
  return 'Symbol('.concat(
    key === undefined ? '' : key,
    ')_',
    (++id + px).toString(36)
  )
}

var shared = _shared('keys')

var _sharedKey = function(key) {
  return shared[key] || (shared[key] = _uid(key))
}

var arrayIndexOf = _arrayIncludes(false)
var IE_PROTO = _sharedKey('IE_PROTO')

var _objectKeysInternal = function(object, names) {
  var O = _toIobject(object)
  var i = 0
  var result = []
  var key
  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key)
  // Don't enum bug & hidden keys
  while (names.length > i)
    if (_has(O, (key = names[i++]))) {
      ~arrayIndexOf(result, key) || result.push(key)
    }
  return result
}

// IE 8- don't enum bug keys
var _enumBugKeys = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(
  ','
)

// 19.1.2.14 / 15.2.3.14 Object.keys(O)

var _objectKeys =
  Object.keys ||
  function keys(O) {
    return _objectKeysInternal(O, _enumBugKeys)
  }

var _aFunction = function(it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!')
  return it
}

// optional / simple context binding

var _ctx = function(fn, that, length) {
  _aFunction(fn)
  if (that === undefined) return fn
  switch (length) {
    case 1:
      return function(a) {
        return fn.call(that, a)
      }
    case 2:
      return function(a, b) {
        return fn.call(that, a, b)
      }
    case 3:
      return function(a, b, c) {
        return fn.call(that, a, b, c)
      }
  }
  return function(/* ...args */) {
    return fn.apply(that, arguments)
  }
}

var _isObject = function(it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function'
}

var _anObject = function(it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!')
  return it
}

var _fails = function(exec) {
  try {
    return !!exec()
  } catch (e) {
    return true
  }
}

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function() {
  return (
    Object.defineProperty({}, 'a', {
      get: function() {
        return 7
      }
    }).a != 7
  )
})

var document = _global.document
// typeof document.createElement is 'object' in old IE
var is = _isObject(document) && _isObject(document.createElement)
var _domCreate = function(it) {
  return is ? document.createElement(it) : {}
}

var _ie8DomDefine =
  !_descriptors &&
  !_fails(function() {
    return (
      Object.defineProperty(_domCreate('div'), 'a', {
        get: function() {
          return 7
        }
      }).a != 7
    )
  })

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function(it, S) {
  if (!_isObject(it)) return it
  var fn, val
  if (
    S &&
    typeof (fn = it.toString) == 'function' &&
    !_isObject((val = fn.call(it)))
  )
    return val
  if (typeof (fn = it.valueOf) == 'function' && !_isObject((val = fn.call(it))))
    return val
  if (
    !S &&
    typeof (fn = it.toString) == 'function' &&
    !_isObject((val = fn.call(it)))
  )
    return val
  throw TypeError("Can't convert object to primitive value")
}

var dP = Object.defineProperty

var f = _descriptors
  ? Object.defineProperty
  : function defineProperty(O, P, Attributes) {
      _anObject(O)
      P = _toPrimitive(P, true)
      _anObject(Attributes)
      if (_ie8DomDefine)
        try {
          return dP(O, P, Attributes)
        } catch (e) {
          /* empty */
        }
      if ('get' in Attributes || 'set' in Attributes)
        throw TypeError('Accessors not supported!')
      if ('value' in Attributes) O[P] = Attributes.value
      return O
    }

var _objectDp = {
  f: f
}

var _propertyDesc = function(bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  }
}

var _hide = _descriptors
  ? function(object, key, value) {
      return _objectDp.f(object, key, _propertyDesc(1, value))
    }
  : function(object, key, value) {
      object[key] = value
      return object
    }

var PROTOTYPE = 'prototype'

var $export = function(type, name, source) {
  var IS_FORCED = type & $export.F
  var IS_GLOBAL = type & $export.G
  var IS_STATIC = type & $export.S
  var IS_PROTO = type & $export.P
  var IS_BIND = type & $export.B
  var IS_WRAP = type & $export.W
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {})
  var expProto = exports[PROTOTYPE]
  var target = IS_GLOBAL
    ? _global
    : IS_STATIC
      ? _global[name]
      : (_global[name] || {})[PROTOTYPE]
  var key, own, out
  if (IS_GLOBAL) source = name
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined
    if (own && _has(exports, key)) continue
    // export native or passed
    out = own ? target[key] : source[key]
    // prevent global pollution for namespaces
    exports[key] =
      IS_GLOBAL && typeof target[key] != 'function'
        ? source[key]
        : // bind timers to global for call from export context
          IS_BIND && own
          ? _ctx(out, _global)
          : // wrap global constructors for prevent change them in library
            IS_WRAP && target[key] == out
            ? (function(C) {
                var F = function(a, b, c) {
                  if (this instanceof C) {
                    switch (arguments.length) {
                      case 0:
                        return new C()
                      case 1:
                        return new C(a)
                      case 2:
                        return new C(a, b)
                    }
                    return new C(a, b, c)
                  }
                  return C.apply(this, arguments)
                }
                F[PROTOTYPE] = C[PROTOTYPE]
                return F
                // make static versions for prototype methods
              })(out)
            : IS_PROTO && typeof out == 'function'
              ? _ctx(Function.call, out)
              : out
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      ;(exports.virtual || (exports.virtual = {}))[key] = out
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key])
        _hide(expProto, key, out)
    }
  }
}
// type bitmap
$export.F = 1 // forced
$export.G = 2 // global
$export.S = 4 // static
$export.P = 8 // proto
$export.B = 16 // bind
$export.W = 32 // wrap
$export.U = 64 // safe
$export.R = 128 // real proto method for `library`
var _export = $export

// most Object methods by ES6 should accept primitives

var _objectSap = function(KEY, exec) {
  var fn = (_core.Object || {})[KEY] || Object[KEY]
  var exp = {}
  exp[KEY] = exec(fn)
  _export(
    _export.S +
      _export.F *
        _fails(function() {
          fn(1)
        }),
    'Object',
    exp
  )
}

// 19.1.2.14 Object.keys(O)

_objectSap('keys', function() {
  return function keys(it) {
    return _objectKeys(_toObject(it))
  }
})

var keys = _core.Object.keys

var keys$1 = keys

// 7.2.2 IsArray(argument)

var _isArray =
  Array.isArray ||
  function isArray(arg) {
    return _cof(arg) == 'Array'
  }

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)

_export(_export.S, 'Array', {isArray: _isArray})

var isArray = _core.Array.isArray

var isArray$1 = isArray

// true  -> String#at
// false -> String#codePointAt
var _stringAt = function(TO_STRING) {
  return function(that, pos) {
    var s = String(_defined(that))
    var i = _toInteger(pos)
    var l = s.length
    var a, b
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined
    a = s.charCodeAt(i)
    return a < 0xd800 ||
      a > 0xdbff ||
      i + 1 === l ||
      (b = s.charCodeAt(i + 1)) < 0xdc00 ||
      b > 0xdfff
      ? TO_STRING
        ? s.charAt(i)
        : a
      : TO_STRING
        ? s.slice(i, i + 2)
        : ((a - 0xd800) << 10) + (b - 0xdc00) + 0x10000
  }
}

var _redefine = _hide

var _objectDps = _descriptors
  ? Object.defineProperties
  : function defineProperties(O, Properties) {
      _anObject(O)
      var keys = _objectKeys(Properties)
      var length = keys.length
      var i = 0
      var P
      while (length > i) _objectDp.f(O, (P = keys[i++]), Properties[P])
      return O
    }

var document$1 = _global.document
var _html = document$1 && document$1.documentElement

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])

var IE_PROTO$1 = _sharedKey('IE_PROTO')
var Empty = function() {
  /* empty */
}
var PROTOTYPE$1 = 'prototype'

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function() {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe')
  var i = _enumBugKeys.length
  var lt = '<'
  var gt = '>'
  var iframeDocument
  iframe.style.display = 'none'
  _html.appendChild(iframe)
  iframe.src = 'javascript:' // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document
  iframeDocument.open()
  iframeDocument.write(
    lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt
  )
  iframeDocument.close()
  createDict = iframeDocument.F
  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]]
  return createDict()
}

var _objectCreate =
  Object.create ||
  function create(O, Properties) {
    var result
    if (O !== null) {
      Empty[PROTOTYPE$1] = _anObject(O)
      result = new Empty()
      Empty[PROTOTYPE$1] = null
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O
    } else result = createDict()
    return Properties === undefined ? result : _objectDps(result, Properties)
  }

var _wks = createCommonjsModule(function(module) {
  var store = _shared('wks')

  var Symbol = _global.Symbol
  var USE_SYMBOL = typeof Symbol == 'function'

  var $exports = (module.exports = function(name) {
    return (
      store[name] ||
      (store[name] =
        (USE_SYMBOL && Symbol[name]) ||
        (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name))
    )
  })

  $exports.store = store
})

var def = _objectDp.f

var TAG = _wks('toStringTag')

var _setToStringTag = function(it, tag, stat) {
  if (it && !_has((it = stat ? it : it.prototype), TAG))
    def(it, TAG, {configurable: true, value: tag})
}

var IteratorPrototype = {}

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function() {
  return this
})

var _iterCreate = function(Constructor, NAME, next) {
  Constructor.prototype = _objectCreate(IteratorPrototype, {
    next: _propertyDesc(1, next)
  })
  _setToStringTag(Constructor, NAME + ' Iterator')
}

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)

var IE_PROTO$2 = _sharedKey('IE_PROTO')
var ObjectProto = Object.prototype

var _objectGpo =
  Object.getPrototypeOf ||
  function(O) {
    O = _toObject(O)
    if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2]
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype
    }
    return O instanceof Object ? ObjectProto : null
  }

var ITERATOR = _wks('iterator')
var BUGGY = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator'
var KEYS = 'keys'
var VALUES = 'values'

var _iterDefine = function(
  Base,
  NAME,
  Constructor,
  next,
  DEFAULT,
  IS_SET,
  FORCED
) {
  _iterCreate(Constructor, NAME, next)
  var getMethod = function(kind) {
    if (!BUGGY && kind in proto) return proto[kind]
    switch (kind) {
      case KEYS:
        return function keys() {
          return new Constructor(this, kind)
        }
      case VALUES:
        return function values() {
          return new Constructor(this, kind)
        }
    }
    return function entries() {
      return new Constructor(this, kind)
    }
  }
  var TAG = NAME + ' Iterator'
  var DEF_VALUES = DEFAULT == VALUES
  var VALUES_BUG = false
  var proto = Base.prototype
  var $native =
    proto[ITERATOR] || proto[FF_ITERATOR] || (DEFAULT && proto[DEFAULT])
  var $default = $native || getMethod(DEFAULT)
  var $entries = DEFAULT
    ? !DEF_VALUES
      ? $default
      : getMethod('entries')
    : undefined
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native
  var methods, key, IteratorPrototype
  // Fix native
  if ($anyNative) {
    IteratorPrototype = _objectGpo($anyNative.call(new Base()))
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      _setToStringTag(IteratorPrototype, TAG, true)
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true
    $default = function values() {
      return $native.call(this)
    }
  }
  // Define iterator
  if (FORCED && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    _hide(proto, ITERATOR, $default)
  }
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    }
    if (FORCED)
      for (key in methods) {
        if (!(key in proto)) _redefine(proto, key, methods[key])
      }
    else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods)
  }
  return methods
}

var $at = _stringAt(true)

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(
  String,
  'String',
  function(iterated) {
    this._t = String(iterated) // target
    this._i = 0 // next index
    // 21.1.5.2.1 %StringIteratorPrototype%.next()
  },
  function() {
    var O = this._t
    var index = this._i
    var point
    if (index >= O.length) return {value: undefined, done: true}
    point = $at(O, index)
    this._i += point.length
    return {value: point, done: false}
  }
)

var _iterStep = function(done, value) {
  return {value: value, done: !!done}
}

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(
  Array,
  'Array',
  function(iterated, kind) {
    this._t = _toIobject(iterated) // target
    this._i = 0 // next index
    this._k = kind // kind
    // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
  },
  function() {
    var O = this._t
    var kind = this._k
    var index = this._i++
    if (!O || index >= O.length) {
      this._t = undefined
      return _iterStep(1)
    }
    if (kind == 'keys') return _iterStep(0, index)
    if (kind == 'values') return _iterStep(0, O[index])
    return _iterStep(0, [index, O[index]])
  },
  'values'
)

var TO_STRING_TAG = _wks('toStringTag')

var DOMIterables = (
  'CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList'
).split(',')

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i]
  var Collection = _global[NAME]
  var proto = Collection && Collection.prototype
  if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME)
}

var f$1 = _wks

var _wksExt = {
  f: f$1
}

var iterator = _wksExt.f('iterator')

var iterator$1 = iterator

var _meta = createCommonjsModule(function(module) {
  var META = _uid('meta')

  var setDesc = _objectDp.f
  var id = 0
  var isExtensible =
    Object.isExtensible ||
    function() {
      return true
    }
  var FREEZE = !_fails(function() {
    return isExtensible(Object.preventExtensions({}))
  })
  var setMeta = function(it) {
    setDesc(it, META, {
      value: {
        i: 'O' + ++id, // object ID
        w: {} // weak collections IDs
      }
    })
  }
  var fastKey = function(it, create) {
    // return primitive with prefix
    if (!_isObject(it))
      return typeof it == 'symbol'
        ? it
        : (typeof it == 'string' ? 'S' : 'P') + it
    if (!_has(it, META)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return 'F'
      // not necessary to add metadata
      if (!create) return 'E'
      // add missing metadata
      setMeta(it)
      // return object ID
    }
    return it[META].i
  }
  var getWeak = function(it, create) {
    if (!_has(it, META)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return true
      // not necessary to add metadata
      if (!create) return false
      // add missing metadata
      setMeta(it)
      // return hash weak collections IDs
    }
    return it[META].w
  }
  // add metadata on freeze-family methods calling
  var onFreeze = function(it) {
    if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it)
    return it
  }
  var meta = (module.exports = {
    KEY: META,
    NEED: false,
    fastKey: fastKey,
    getWeak: getWeak,
    onFreeze: onFreeze
  })
})
var _meta_1 = _meta.KEY
var _meta_2 = _meta.NEED
var _meta_3 = _meta.fastKey
var _meta_4 = _meta.getWeak
var _meta_5 = _meta.onFreeze

var defineProperty = _objectDp.f
var _wksDefine = function(name) {
  var $Symbol = _core.Symbol || (_core.Symbol = {})
  if (name.charAt(0) != '_' && !(name in $Symbol))
    defineProperty($Symbol, name, {value: _wksExt.f(name)})
}

var f$2 = Object.getOwnPropertySymbols

var _objectGops = {
  f: f$2
}

var f$3 = {}.propertyIsEnumerable

var _objectPie = {
  f: f$3
}

// all enumerable object keys, includes symbols

var _enumKeys = function(it) {
  var result = _objectKeys(it)
  var getSymbols = _objectGops.f
  if (getSymbols) {
    var symbols = getSymbols(it)
    var isEnum = _objectPie.f
    var i = 0
    var key
    while (symbols.length > i)
      if (isEnum.call(it, (key = symbols[i++]))) result.push(key)
  }
  return result
}

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

var hiddenKeys = _enumBugKeys.concat('length', 'prototype')

var f$4 =
  Object.getOwnPropertyNames ||
  function getOwnPropertyNames(O) {
    return _objectKeysInternal(O, hiddenKeys)
  }

var _objectGopn = {
  f: f$4
}

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

var gOPN = _objectGopn.f
var toString$1 = {}.toString

var windowNames =
  typeof window == 'object' && window && Object.getOwnPropertyNames
    ? Object.getOwnPropertyNames(window)
    : []

var getWindowNames = function(it) {
  try {
    return gOPN(it)
  } catch (e) {
    return windowNames.slice()
  }
}

var f$5 = function getOwnPropertyNames(it) {
  return windowNames && toString$1.call(it) == '[object Window]'
    ? getWindowNames(it)
    : gOPN(_toIobject(it))
}

var _objectGopnExt = {
  f: f$5
}

var gOPD = Object.getOwnPropertyDescriptor

var f$6 = _descriptors
  ? gOPD
  : function getOwnPropertyDescriptor(O, P) {
      O = _toIobject(O)
      P = _toPrimitive(P, true)
      if (_ie8DomDefine)
        try {
          return gOPD(O, P)
        } catch (e) {
          /* empty */
        }
      if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P])
    }

var _objectGopd = {
  f: f$6
}

// ECMAScript 6 symbols shim

var META = _meta.KEY

var gOPD$1 = _objectGopd.f
var dP$1 = _objectDp.f
var gOPN$1 = _objectGopnExt.f
var $Symbol = _global.Symbol
var $JSON = _global.JSON
var _stringify = $JSON && $JSON.stringify
var PROTOTYPE$2 = 'prototype'
var HIDDEN = _wks('_hidden')
var TO_PRIMITIVE = _wks('toPrimitive')
var isEnum = {}.propertyIsEnumerable
var SymbolRegistry = _shared('symbol-registry')
var AllSymbols = _shared('symbols')
var OPSymbols = _shared('op-symbols')
var ObjectProto$1 = Object[PROTOTYPE$2]
var USE_NATIVE = typeof $Symbol == 'function'
var QObject = _global.QObject
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter =
  !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc =
  _descriptors &&
  _fails(function() {
    return (
      _objectCreate(
        dP$1({}, 'a', {
          get: function() {
            return dP$1(this, 'a', {value: 7}).a
          }
        })
      ).a != 7
    )
  })
    ? function(it, key, D) {
        var protoDesc = gOPD$1(ObjectProto$1, key)
        if (protoDesc) delete ObjectProto$1[key]
        dP$1(it, key, D)
        if (protoDesc && it !== ObjectProto$1)
          dP$1(ObjectProto$1, key, protoDesc)
      }
    : dP$1

var wrap = function(tag) {
  var sym = (AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]))
  sym._k = tag
  return sym
}

var isSymbol =
  USE_NATIVE && typeof $Symbol.iterator == 'symbol'
    ? function(it) {
        return typeof it == 'symbol'
      }
    : function(it) {
        return it instanceof $Symbol
      }

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto$1) $defineProperty(OPSymbols, key, D)
  _anObject(it)
  key = _toPrimitive(key, true)
  _anObject(D)
  if (_has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}))
      it[HIDDEN][key] = true
    } else {
      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false
      D = _objectCreate(D, {enumerable: _propertyDesc(0, false)})
    }
    return setSymbolDesc(it, key, D)
  }
  return dP$1(it, key, D)
}
var $defineProperties = function defineProperties(it, P) {
  _anObject(it)
  var keys = _enumKeys((P = _toIobject(P)))
  var i = 0
  var l = keys.length
  var key
  while (l > i) $defineProperty(it, (key = keys[i++]), P[key])
  return it
}
var $create = function create(it, P) {
  return P === undefined
    ? _objectCreate(it)
    : $defineProperties(_objectCreate(it), P)
}
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, (key = _toPrimitive(key, true)))
  if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key))
    return false
  return E ||
    !_has(this, key) ||
    !_has(AllSymbols, key) ||
    (_has(this, HIDDEN) && this[HIDDEN][key])
    ? E
    : true
}
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = _toIobject(it)
  key = _toPrimitive(key, true)
  if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key))
    return
  var D = gOPD$1(it, key)
  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key]))
    D.enumerable = true
  return D
}
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN$1(_toIobject(it))
  var result = []
  var i = 0
  var key
  while (names.length > i) {
    if (!_has(AllSymbols, (key = names[i++])) && key != HIDDEN && key != META)
      result.push(key)
  }
  return result
}
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto$1
  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it))
  var result = []
  var i = 0
  var key
  while (names.length > i) {
    if (
      _has(AllSymbols, (key = names[i++])) &&
      (IS_OP ? _has(ObjectProto$1, key) : true)
    )
      result.push(AllSymbols[key])
  }
  return result
}

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!')
    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined)
    var $set = function(value) {
      if (this === ObjectProto$1) $set.call(OPSymbols, value)
      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag))
        this[HIDDEN][tag] = false
      setSymbolDesc(this, tag, _propertyDesc(1, value))
    }
    if (_descriptors && setter)
      setSymbolDesc(ObjectProto$1, tag, {configurable: true, set: $set})
    return wrap(tag)
  }
  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
    return this._k
  })

  _objectGopd.f = $getOwnPropertyDescriptor
  _objectDp.f = $defineProperty
  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames
  _objectPie.f = $propertyIsEnumerable
  _objectGops.f = $getOwnPropertySymbols

  if (_descriptors && !_library) {
    _redefine(
      ObjectProto$1,
      'propertyIsEnumerable',
      $propertyIsEnumerable,
      true
    )
  }

  _wksExt.f = function(name) {
    return wrap(_wks(name))
  }
}

_export(_export.G + _export.W + _export.F * !USE_NATIVE, {Symbol: $Symbol})

for (
  var es6Symbols = // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
    'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(
      ','
    ),
    j = 0;
  es6Symbols.length > j;

)
  _wks(es6Symbols[j++])

for (
  var wellKnownSymbols = _objectKeys(_wks.store), k = 0;
  wellKnownSymbols.length > k;

)
  _wksDefine(wellKnownSymbols[k++])

_export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  for: function(key) {
    return _has(SymbolRegistry, (key += ''))
      ? SymbolRegistry[key]
      : (SymbolRegistry[key] = $Symbol(key))
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!')
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key
  },
  useSetter: function() {
    setter = true
  },
  useSimple: function() {
    setter = false
  }
})

_export(_export.S + _export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
})

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON &&
  _export(
    _export.S +
      _export.F *
        (!USE_NATIVE ||
          _fails(function() {
            var S = $Symbol()
            // MS Edge converts symbol values to JSON as {}
            // WebKit converts symbol values to JSON as null
            // V8 throws on boxed symbols
            return (
              _stringify([S]) != '[null]' ||
              _stringify({a: S}) != '{}' ||
              _stringify(Object(S)) != '{}'
            )
          })),
    'JSON',
    {
      stringify: function stringify(it) {
        var args = [it]
        var i = 1
        var replacer, $replacer
        while (arguments.length > i) args.push(arguments[i++])
        $replacer = replacer = args[1]
        if ((!_isObject(replacer) && it === undefined) || isSymbol(it)) return // IE8 returns string on undefined
        if (!_isArray(replacer))
          replacer = function(key, value) {
            if (typeof $replacer == 'function')
              value = $replacer.call(this, key, value)
            if (!isSymbol(value)) return value
          }
        args[1] = replacer
        return _stringify.apply($JSON, args)
      }
    }
  )

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE$2][TO_PRIMITIVE] ||
  _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf)
// 19.4.3.5 Symbol.prototype[@@toStringTag]
_setToStringTag($Symbol, 'Symbol')
// 20.2.1.9 Math[@@toStringTag]
_setToStringTag(Math, 'Math', true)
// 24.3.3 JSON[@@toStringTag]
_setToStringTag(_global.JSON, 'JSON', true)

var _for = _core.Symbol['for']

var _for$1 = _for

_wksDefine('asyncIterator')

_wksDefine('observable')

var symbol = _core.Symbol

var symbol$1 = symbol

// 19.1.2.7 Object.getOwnPropertyNames(O)
_objectSap('getOwnPropertyNames', function() {
  return _objectGopnExt.f
})

var $Object = _core.Object
var getOwnPropertyNames = function getOwnPropertyNames(it) {
  return $Object.getOwnPropertyNames(it)
}

var getOwnPropertyNames$1 = getOwnPropertyNames

// 19.1.2.1 Object.assign(target, source, ...)

var $assign = Object.assign

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign =
  !$assign ||
  _fails(function() {
    var A = {}
    var B = {}
    // eslint-disable-next-line no-undef
    var S = Symbol()
    var K = 'abcdefghijklmnopqrst'
    A[S] = 7
    K.split('').forEach(function(k) {
      B[k] = k
    })
    return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K
  })
    ? function assign(target, source) {
        // eslint-disable-line no-unused-vars
        var T = _toObject(target)
        var aLen = arguments.length
        var index = 1
        var getSymbols = _objectGops.f
        var isEnum = _objectPie.f
        while (aLen > index) {
          var S = _iobject(arguments[index++])
          var keys = getSymbols
            ? _objectKeys(S).concat(getSymbols(S))
            : _objectKeys(S)
          var length = keys.length
          var j = 0
          var key
          while (length > j)
            if (isEnum.call(S, (key = keys[j++]))) T[key] = S[key]
        }
        return T
      }
    : $assign

// 19.1.3.1 Object.assign(target, source)

_export(_export.S + _export.F, 'Object', {assign: _objectAssign})

var assign = _core.Object.assign

var assign$1 = assign

var getOwnPropertySymbols = _core.Object.getOwnPropertySymbols

var getOwnPropertySymbols$1 = getOwnPropertySymbols

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var getOwnPropertySymbols$2 = getOwnPropertySymbols$1
var hasOwnProperty$1 = Object.prototype.hasOwnProperty
var propIsEnumerable = Object.prototype.propertyIsEnumerable

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined')
  }

  return Object(val)
}

function shouldUseNative() {
  try {
    if (!assign$1) {
      return false
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118

    var test1 = new String('abc') // eslint-disable-line no-new-wrappers

    test1[5] = 'de'

    if (getOwnPropertyNames$1(test1)[0] === '5') {
      return false
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056

    var test2 = {}

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i
    }

    var order2 = getOwnPropertyNames$1(test2).map(function(n) {
      return test2[n]
    })

    if (order2.join('') !== '0123456789') {
      return false
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056

    var test3 = {}
    'abcdefghijklmnopqrst'.split('').forEach(function(letter) {
      test3[letter] = letter
    })

    if (keys$1(assign$1({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false
    }

    return true
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false
  }
}

var objectAssign = shouldUseNative()
  ? assign$1
  : function(target, source) {
      var from
      var to = toObject(target)
      var symbols

      for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s])

        for (var key in from) {
          if (hasOwnProperty$1.call(from, key)) {
            to[key] = from[key]
          }
        }

        if (getOwnPropertySymbols$2) {
          symbols = getOwnPropertySymbols$2(from)

          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
              to[symbols[i]] = from[symbols[i]]
            }
          }
        }
      }

      return to
    }

var n = 'function' === typeof symbol$1 && _for$1,
  p = n ? _for$1('react.element') : 60103,
  q = n ? _for$1('react.portal') : 60106,
  r = n ? _for$1('react.fragment') : 60107,
  t = n ? _for$1('react.strict_mode') : 60108,
  u = n ? _for$1('react.profiler') : 60114,
  v = n ? _for$1('react.provider') : 60109,
  w = n ? _for$1('react.context') : 60110,
  x = n ? _for$1('react.concurrent_mode') : 60111,
  y = n ? _for$1('react.forward_ref') : 60112,
  z = n ? _for$1('react.suspense') : 60113,
  aa = n ? _for$1('react.memo') : 60115,
  ba = n ? _for$1('react.lazy') : 60116

function ca(a, b, d, c, e, g, h, f) {
  if (!a) {
    a = void 0
    if (void 0 === b)
      a = Error(
        'Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.'
      )
    else {
      var l = [d, c, e, g, h, f],
        m = 0
      a = Error(
        b.replace(/%s/g, function() {
          return l[m++]
        })
      )
      a.name = 'Invariant Violation'
    }
    a.framesToPop = 1
    throw a
  }
}

function B(a) {
  for (
    var b = arguments.length - 1,
      d = 'https://reactjs.org/docs/error-decoder.html?invariant=' + a,
      c = 0;
    c < b;
    c++
  ) {
    d += '&args[]=' + encodeURIComponent(arguments[c + 1])
  }

  ca(
    !1,
    'Minified React error #' +
      a +
      '; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ',
    d
  )
}

var C = {
    isMounted: function isMounted() {
      return !1
    },
    enqueueForceUpdate: function enqueueForceUpdate() {},
    enqueueReplaceState: function enqueueReplaceState() {},
    enqueueSetState: function enqueueSetState() {}
  },
  D = {}

function E(a, b, d) {
  this.props = a
  this.context = b
  this.refs = D
  this.updater = d || C
}

E.prototype.isReactComponent = {}

E.prototype.setState = function(a, b) {
  'object' !== _typeof(a) && 'function' !== typeof a && null != a
    ? B('85')
    : void 0
  this.updater.enqueueSetState(this, a, b, 'setState')
}

E.prototype.forceUpdate = function(a) {
  this.updater.enqueueForceUpdate(this, a, 'forceUpdate')
}

function F() {}

F.prototype = E.prototype

function G(a, b, d) {
  this.props = a
  this.context = b
  this.refs = D
  this.updater = d || C
}

var H = (G.prototype = new F())
H.constructor = G
objectAssign(H, E.prototype)
H.isPureReactComponent = !0

// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
_export(_export.S + _export.F * !_descriptors, 'Object', {
  defineProperties: _objectDps
})

var $Object$1 = _core.Object
var defineProperties = function defineProperties(T, D) {
  return $Object$1.defineProperties(T, D)
}

var defineProperties$1 = defineProperties

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)

var $getOwnPropertyDescriptor$1 = _objectGopd.f

_objectSap('getOwnPropertyDescriptor', function() {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor$1(_toIobject(it), key)
  }
})

var $Object$2 = _core.Object
var getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  return $Object$2.getOwnPropertyDescriptor(it, key)
}

var getOwnPropertyDescriptor$1 = getOwnPropertyDescriptor

// 19.1.2.17 Object.seal(O)

var meta = _meta.onFreeze

_objectSap('seal', function($seal) {
  return function seal(it) {
    return $seal && _isObject(it) ? $seal(meta(it)) : it
  }
})

var seal = _core.Object.seal

var seal$1 = seal

// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
_export(_export.S + _export.F * !_descriptors, 'Object', {
  defineProperty: _objectDp.f
})

var $Object$3 = _core.Object
var defineProperty$1 = function defineProperty(it, key, desc) {
  return $Object$3.defineProperty(it, key, desc)
}

var defineProperty$2 = defineProperty$1

// 19.1.2.5 Object.freeze(O)

var meta$1 = _meta.onFreeze

_objectSap('freeze', function($freeze) {
  return function freeze(it) {
    return $freeze && _isObject(it) ? $freeze(meta$1(it)) : it
  }
})

var freeze = _core.Object.freeze

var freeze$1 = freeze

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED'
var ReactPropTypesSecret_1 = ReactPropTypesSecret

var printWarning = function printWarning() {}

{
  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1
  var loggedTypeFailures = {}
  var has = Function.call.bind(Object.prototype.hasOwnProperty)

  printWarning = function printWarning(text) {
    var message = 'Warning: ' + text

    if (typeof console !== 'undefined') {
      console.error(message)
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message)
    } catch (x) {}
  }
}
/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */

function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.

        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') +
                ': ' +
                location +
                ' type `' +
                typeSpecName +
                '` is invalid; ' +
                'it must be a function, usually from the `prop-types` package, but received `' +
                _typeof(typeSpecs[typeSpecName]) +
                '`.'
            )
            err.name = 'Invariant Violation'
            throw err
          }

          error = typeSpecs[typeSpecName](
            values,
            typeSpecName,
            componentName,
            location,
            null,
            ReactPropTypesSecret$1
          )
        } catch (ex) {
          error = ex
        }

        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') +
              ': type specification of ' +
              location +
              ' `' +
              typeSpecName +
              '` is invalid; the type checker ' +
              'function must return `null` or an `Error` but returned a ' +
              _typeof(error) +
              '. ' +
              'You may have forgotten to pass an argument to the type checker ' +
              'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
              'shape all require an argument).'
          )
        }

        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true
          var stack = getStack ? getStack() : ''
          printWarning(
            'Failed ' +
              location +
              ' type: ' +
              error.message +
              (stack != null ? stack : '')
          )
        }
      }
    }
  }
}
/**
 * Resets warning cache when testing.
 *
 * @private
 */

checkPropTypes.resetWarningCache = function() {
  {
    loggedTypeFailures = {}
  }
}

var checkPropTypes_1 = checkPropTypes

var react_development = createCommonjsModule(function(module) {
  {
    ;(function() {
      var _assign = objectAssign
      var checkPropTypes = checkPropTypes_1 // TODO: this is special because it gets imported during build.

      var ReactVersion = '16.8.5' // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
      // nor polyfill, then a plain number is used for performance.

      var hasSymbol = typeof symbol$1 === 'function' && _for$1
      var REACT_ELEMENT_TYPE = hasSymbol ? _for$1('react.element') : 0xeac7
      var REACT_PORTAL_TYPE = hasSymbol ? _for$1('react.portal') : 0xeaca
      var REACT_FRAGMENT_TYPE = hasSymbol ? _for$1('react.fragment') : 0xeacb
      var REACT_STRICT_MODE_TYPE = hasSymbol
        ? _for$1('react.strict_mode')
        : 0xeacc
      var REACT_PROFILER_TYPE = hasSymbol ? _for$1('react.profiler') : 0xead2
      var REACT_PROVIDER_TYPE = hasSymbol ? _for$1('react.provider') : 0xeacd
      var REACT_CONTEXT_TYPE = hasSymbol ? _for$1('react.context') : 0xeace
      var REACT_CONCURRENT_MODE_TYPE = hasSymbol
        ? _for$1('react.concurrent_mode')
        : 0xeacf
      var REACT_FORWARD_REF_TYPE = hasSymbol
        ? _for$1('react.forward_ref')
        : 0xead0
      var REACT_SUSPENSE_TYPE = hasSymbol ? _for$1('react.suspense') : 0xead1
      var REACT_MEMO_TYPE = hasSymbol ? _for$1('react.memo') : 0xead3
      var REACT_LAZY_TYPE = hasSymbol ? _for$1('react.lazy') : 0xead4
      var MAYBE_ITERATOR_SYMBOL = typeof symbol$1 === 'function' && iterator$1
      var FAUX_ITERATOR_SYMBOL = '@@iterator'

      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || _typeof(maybeIterable) !== 'object') {
          return null
        }

        var maybeIterator =
          (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
          maybeIterable[FAUX_ITERATOR_SYMBOL]

        if (typeof maybeIterator === 'function') {
          return maybeIterator
        }

        return null
      }
      /**
       * Use invariant() to assert state which your program assumes to be true.
       *
       * Provide sprintf-style format (only %s is supported) and arguments
       * to provide information about what broke and what you were
       * expecting.
       *
       * The invariant message will be stripped in production, but the invariant
       * will remain to ensure logic does not differ in production.
       */

      var validateFormat = function validateFormat() {}

      {
        validateFormat = function validateFormat(format) {
          if (format === undefined) {
            throw new Error('invariant requires an error message argument')
          }
        }
      }

      function invariant(condition, format, a, b, c, d, e, f) {
        validateFormat(format)

        if (!condition) {
          var error = void 0

          if (format === undefined) {
            error = new Error(
              'Minified exception occurred; use the non-minified dev environment ' +
                'for the full error message and additional helpful warnings.'
            )
          } else {
            var args = [a, b, c, d, e, f]
            var argIndex = 0
            error = new Error(
              format.replace(/%s/g, function() {
                return args[argIndex++]
              })
            )
            error.name = 'Invariant Violation'
          }

          error.framesToPop = 1 // we don't care about invariant's own frame

          throw error
        }
      } // Relying on the `invariant()` implementation lets us
      // preserve the format and params in the www builds.

      /**
       * Forked from fbjs/warning:
       * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
       *
       * Only change is we use console.warn instead of console.error,
       * and do nothing when 'console' is not supported.
       * This really simplifies the code.
       * ---
       * Similar to invariant but only logs a warning if the condition is not met.
       * This can be used to log issues in development environments in critical
       * paths. Removing the logging code for production environments will keep the
       * same logic and follow the same code paths.
       */

      var lowPriorityWarning = function lowPriorityWarning() {}

      {
        var printWarning = function printWarning(format) {
          for (
            var _len = arguments.length,
              args = Array(_len > 1 ? _len - 1 : 0),
              _key = 1;
            _key < _len;
            _key++
          ) {
            args[_key - 1] = arguments[_key]
          }

          var argIndex = 0
          var message =
            'Warning: ' +
            format.replace(/%s/g, function() {
              return args[argIndex++]
            })

          if (typeof console !== 'undefined') {
            console.warn(message)
          }

          try {
            // --- Welcome to debugging React ---
            // This error was thrown as a convenience so that you can use this stack
            // to find the callsite that caused this warning to fire.
            throw new Error(message)
          } catch (x) {}
        }

        lowPriorityWarning = function lowPriorityWarning(condition, format) {
          if (format === undefined) {
            throw new Error(
              '`lowPriorityWarning(condition, format, ...args)` requires a warning ' +
                'message argument'
            )
          }

          if (!condition) {
            for (
              var _len2 = arguments.length,
                args = Array(_len2 > 2 ? _len2 - 2 : 0),
                _key2 = 2;
              _key2 < _len2;
              _key2++
            ) {
              args[_key2 - 2] = arguments[_key2]
            }

            printWarning.apply(undefined, [format].concat(args))
          }
        }
      }
      var lowPriorityWarning$1 = lowPriorityWarning
      /**
       * Similar to invariant but only logs a warning if the condition is not met.
       * This can be used to log issues in development environments in critical
       * paths. Removing the logging code for production environments will keep the
       * same logic and follow the same code paths.
       */

      var warningWithoutStack = function warningWithoutStack() {}

      {
        warningWithoutStack = function warningWithoutStack(condition, format) {
          for (
            var _len = arguments.length,
              args = Array(_len > 2 ? _len - 2 : 0),
              _key = 2;
            _key < _len;
            _key++
          ) {
            args[_key - 2] = arguments[_key]
          }

          if (format === undefined) {
            throw new Error(
              '`warningWithoutStack(condition, format, ...args)` requires a warning ' +
                'message argument'
            )
          }

          if (args.length > 8) {
            // Check before the condition to catch violations early.
            throw new Error(
              'warningWithoutStack() currently supports at most 8 arguments.'
            )
          }

          if (condition) {
            return
          }

          if (typeof console !== 'undefined') {
            var argsWithFormat = args.map(function(item) {
              return '' + item
            })
            argsWithFormat.unshift('Warning: ' + format) // We intentionally don't use spread (or .apply) directly because it
            // breaks IE9: https://github.com/facebook/react/issues/13610

            Function.prototype.apply.call(
              console.error,
              console,
              argsWithFormat
            )
          }

          try {
            // --- Welcome to debugging React ---
            // This error was thrown as a convenience so that you can use this stack
            // to find the callsite that caused this warning to fire.
            var argIndex = 0
            var message =
              'Warning: ' +
              format.replace(/%s/g, function() {
                return args[argIndex++]
              })
            throw new Error(message)
          } catch (x) {}
        }
      }
      var warningWithoutStack$1 = warningWithoutStack
      var didWarnStateUpdateForUnmountedComponent = {}

      function warnNoop(publicInstance, callerName) {
        {
          var _constructor = publicInstance.constructor
          var componentName =
            (_constructor && (_constructor.displayName || _constructor.name)) ||
            'ReactClass'
          var warningKey = componentName + '.' + callerName

          if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
            return
          }

          warningWithoutStack$1(
            false,
            "Can't call %s on a component that is not yet mounted. " +
              'This is a no-op, but it might indicate a bug in your application. ' +
              'Instead, assign to `this.state` directly or define a `state = {};` ' +
              'class property with the desired state in the %s component.',
            callerName,
            componentName
          )
          didWarnStateUpdateForUnmountedComponent[warningKey] = true
        }
      }
      /**
       * This is the abstract API for an update queue.
       */

      var ReactNoopUpdateQueue = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function isMounted(publicInstance) {
          return false
        },

        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueForceUpdate: function enqueueForceUpdate(
          publicInstance,
          callback,
          callerName
        ) {
          warnNoop(publicInstance, 'forceUpdate')
        },

        /**
         * Replaces all of the state. Always use this or `setState` to mutate state.
         * You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} completeState Next state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueReplaceState: function enqueueReplaceState(
          publicInstance,
          completeState,
          callback,
          callerName
        ) {
          warnNoop(publicInstance, 'replaceState')
        },

        /**
         * Sets a subset of the state. This only exists because _pendingState is
         * internal. This provides a merging strategy that is not available to deep
         * properties which is confusing. TODO: Expose pendingState or don't use it
         * during the merge.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} partialState Next partial state to be merged with state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} Name of the calling function in the public API.
         * @internal
         */
        enqueueSetState: function enqueueSetState(
          publicInstance,
          partialState,
          callback,
          callerName
        ) {
          warnNoop(publicInstance, 'setState')
        }
      }
      var emptyObject = {}
      {
        freeze$1(emptyObject)
      }
      /**
       * Base class helpers for the updating state of a component.
       */

      function Component(props, context, updater) {
        this.props = props
        this.context = context // If a component has string refs, we will assign a different object later.

        this.refs = emptyObject // We initialize the default updater but the real one gets injected by the
        // renderer.

        this.updater = updater || ReactNoopUpdateQueue
      }

      Component.prototype.isReactComponent = {}
      /**
       * Sets a subset of the state. Always use this to mutate
       * state. You should treat `this.state` as immutable.
       *
       * There is no guarantee that `this.state` will be immediately updated, so
       * accessing `this.state` after calling this method may return the old value.
       *
       * There is no guarantee that calls to `setState` will run synchronously,
       * as they may eventually be batched together.  You can provide an optional
       * callback that will be executed when the call to setState is actually
       * completed.
       *
       * When a function is provided to setState, it will be called at some point in
       * the future (not synchronously). It will be called with the up to date
       * component arguments (state, props, context). These values can be different
       * from this.* because your function may be called after receiveProps but before
       * shouldComponentUpdate, and this new state, props, and context will not yet be
       * assigned to this.
       *
       * @param {object|function} partialState Next partial state or function to
       *        produce next partial state to be merged with current state.
       * @param {?function} callback Called after state is updated.
       * @final
       * @protected
       */

      Component.prototype.setState = function(partialState, callback) {
        !(
          _typeof(partialState) === 'object' ||
          typeof partialState === 'function' ||
          partialState == null
        )
          ? invariant(
              false,
              'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
            )
          : void 0
        this.updater.enqueueSetState(this, partialState, callback, 'setState')
      }
      /**
       * Forces an update. This should only be invoked when it is known with
       * certainty that we are **not** in a DOM transaction.
       *
       * You may want to call this when you know that some deeper aspect of the
       * component's state has changed but `setState` was not called.
       *
       * This will not invoke `shouldComponentUpdate`, but it will invoke
       * `componentWillUpdate` and `componentDidUpdate`.
       *
       * @param {?function} callback Called after update is complete.
       * @final
       * @protected
       */

      Component.prototype.forceUpdate = function(callback) {
        this.updater.enqueueForceUpdate(this, callback, 'forceUpdate')
      }
      /**
       * Deprecated APIs. These APIs used to exist on classic React classes but since
       * we would like to deprecate them, we're not going to move them over to this
       * modern base class. Instead, we define a getter that warns if it's accessed.
       */

      {
        var deprecatedAPIs = {
          isMounted: [
            'isMounted',
            'Instead, make sure to clean up subscriptions and pending requests in ' +
              'componentWillUnmount to prevent memory leaks.'
          ],
          replaceState: [
            'replaceState',
            'Refactor your code to use setState instead (see ' +
              'https://github.com/facebook/react/issues/3236).'
          ]
        }

        var defineDeprecationWarning = function defineDeprecationWarning(
          methodName,
          info
        ) {
          defineProperty$2(Component.prototype, methodName, {
            get: function get() {
              lowPriorityWarning$1(
                false,
                '%s(...) is deprecated in plain JavaScript React classes. %s',
                info[0],
                info[1]
              )
              return undefined
            }
          })
        }

        for (var fnName in deprecatedAPIs) {
          if (deprecatedAPIs.hasOwnProperty(fnName)) {
            defineDeprecationWarning(fnName, deprecatedAPIs[fnName])
          }
        }
      }

      function ComponentDummy() {}

      ComponentDummy.prototype = Component.prototype
      /**
       * Convenience component with default shallow equality check for sCU.
       */

      function PureComponent(props, context, updater) {
        this.props = props
        this.context = context // If a component has string refs, we will assign a different object later.

        this.refs = emptyObject
        this.updater = updater || ReactNoopUpdateQueue
      }

      var pureComponentPrototype = (PureComponent.prototype = new ComponentDummy())
      pureComponentPrototype.constructor = PureComponent // Avoid an extra prototype jump for these methods.

      _assign(pureComponentPrototype, Component.prototype)

      pureComponentPrototype.isPureReactComponent = true // an immutable object with a single mutable value

      function createRef() {
        var refObject = {
          current: null
        }
        {
          seal$1(refObject)
        }
        return refObject
      }
      /**
       * Keeps track of the current dispatcher.
       */

      var ReactCurrentDispatcher = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }
      /**
       * Keeps track of the current owner.
       *
       * The current owner is the component who should own any components that are
       * currently being constructed.
       */

      var ReactCurrentOwner = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }
      var BEFORE_SLASH_RE = /^(.*)[\\\/]/

      var describeComponentFrame = function describeComponentFrame(
        name,
        source,
        ownerName
      ) {
        var sourceInfo = ''

        if (source) {
          var path = source.fileName
          var fileName = path.replace(BEFORE_SLASH_RE, '')
          {
            // In DEV, include code for a common special case:
            // prefer "folder/index.js" instead of just "index.js".
            if (/^index\./.test(fileName)) {
              var match = path.match(BEFORE_SLASH_RE)

              if (match) {
                var pathBeforeSlash = match[1]

                if (pathBeforeSlash) {
                  var folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, '')
                  fileName = folderName + '/' + fileName
                }
              }
            }
          }
          sourceInfo = ' (at ' + fileName + ':' + source.lineNumber + ')'
        } else if (ownerName) {
          sourceInfo = ' (created by ' + ownerName + ')'
        }

        return '\n    in ' + (name || 'Unknown') + sourceInfo
      }

      var Resolved = 1

      function refineResolvedLazyComponent(lazyComponent) {
        return lazyComponent._status === Resolved ? lazyComponent._result : null
      }

      function getWrappedName(outerType, innerType, wrapperName) {
        var functionName = innerType.displayName || innerType.name || ''
        return (
          outerType.displayName ||
          (functionName !== ''
            ? wrapperName + '(' + functionName + ')'
            : wrapperName)
        )
      }

      function getComponentName(type) {
        if (type == null) {
          // Host root, text node or just invalid type.
          return null
        }

        {
          if (typeof type.tag === 'number') {
            warningWithoutStack$1(
              false,
              'Received an unexpected object in getComponentName(). ' +
                'This is likely a bug in React. Please file an issue.'
            )
          }
        }

        if (typeof type === 'function') {
          return type.displayName || type.name || null
        }

        if (typeof type === 'string') {
          return type
        }

        switch (type) {
          case REACT_CONCURRENT_MODE_TYPE:
            return 'ConcurrentMode'

          case REACT_FRAGMENT_TYPE:
            return 'Fragment'

          case REACT_PORTAL_TYPE:
            return 'Portal'

          case REACT_PROFILER_TYPE:
            return 'Profiler'

          case REACT_STRICT_MODE_TYPE:
            return 'StrictMode'

          case REACT_SUSPENSE_TYPE:
            return 'Suspense'
        }

        if (_typeof(type) === 'object') {
          switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
              return 'Context.Consumer'

            case REACT_PROVIDER_TYPE:
              return 'Context.Provider'

            case REACT_FORWARD_REF_TYPE:
              return getWrappedName(type, type.render, 'ForwardRef')

            case REACT_MEMO_TYPE:
              return getComponentName(type.type)

            case REACT_LAZY_TYPE: {
              var thenable = type
              var resolvedThenable = refineResolvedLazyComponent(thenable)

              if (resolvedThenable) {
                return getComponentName(resolvedThenable)
              }
            }
          }
        }

        return null
      }

      var ReactDebugCurrentFrame = {}
      var currentlyValidatingElement = null

      function setCurrentlyValidatingElement(element) {
        {
          currentlyValidatingElement = element
        }
      }

      {
        // Stack implementation injected by the current renderer.
        ReactDebugCurrentFrame.getCurrentStack = null

        ReactDebugCurrentFrame.getStackAddendum = function() {
          var stack = '' // Add an extra top frame while an element is being validated

          if (currentlyValidatingElement) {
            var name = getComponentName(currentlyValidatingElement.type)
            var owner = currentlyValidatingElement._owner
            stack += describeComponentFrame(
              name,
              currentlyValidatingElement._source,
              owner && getComponentName(owner.type)
            )
          } // Delegate to the injected renderer-specific implementation

          var impl = ReactDebugCurrentFrame.getCurrentStack

          if (impl) {
            stack += impl() || ''
          }

          return stack
        }
      }
      var ReactSharedInternals = {
        ReactCurrentDispatcher: ReactCurrentDispatcher,
        ReactCurrentOwner: ReactCurrentOwner,
        // Used by renderers to avoid bundling object-assign twice in UMD bundles:
        assign: _assign
      }
      {
        _assign(ReactSharedInternals, {
          // These should not be included in production.
          ReactDebugCurrentFrame: ReactDebugCurrentFrame,
          // Shim for React DOM 16.0.0 which still destructured (but not used) this.
          // TODO: remove in React 17.0.
          ReactComponentTreeHook: {}
        })
      }
      /**
       * Similar to invariant but only logs a warning if the condition is not met.
       * This can be used to log issues in development environments in critical
       * paths. Removing the logging code for production environments will keep the
       * same logic and follow the same code paths.
       */

      var warning = warningWithoutStack$1
      {
        warning = function warning(condition, format) {
          if (condition) {
            return
          }

          var ReactDebugCurrentFrame =
            ReactSharedInternals.ReactDebugCurrentFrame
          var stack = ReactDebugCurrentFrame.getStackAddendum() // eslint-disable-next-line react-internal/warning-and-invariant-args

          for (
            var _len = arguments.length,
              args = Array(_len > 2 ? _len - 2 : 0),
              _key = 2;
            _key < _len;
            _key++
          ) {
            args[_key - 2] = arguments[_key]
          }

          warningWithoutStack$1.apply(
            undefined,
            [false, format + '%s'].concat(args, [stack])
          )
        }
      }
      var warning$1 = warning
      var hasOwnProperty = Object.prototype.hasOwnProperty
      var RESERVED_PROPS = {
        key: true,
        ref: true,
        __self: true,
        __source: true
      }
      var specialPropKeyWarningShown = void 0
      var specialPropRefWarningShown = void 0

      function hasValidRef(config) {
        {
          if (hasOwnProperty.call(config, 'ref')) {
            var getter = getOwnPropertyDescriptor$1(config, 'ref').get

            if (getter && getter.isReactWarning) {
              return false
            }
          }
        }
        return config.ref !== undefined
      }

      function hasValidKey(config) {
        {
          if (hasOwnProperty.call(config, 'key')) {
            var getter = getOwnPropertyDescriptor$1(config, 'key').get

            if (getter && getter.isReactWarning) {
              return false
            }
          }
        }
        return config.key !== undefined
      }

      function defineKeyPropWarningGetter(props, displayName) {
        var warnAboutAccessingKey = function warnAboutAccessingKey() {
          if (!specialPropKeyWarningShown) {
            specialPropKeyWarningShown = true
            warningWithoutStack$1(
              false,
              '%s: `key` is not a prop. Trying to access it will result ' +
                'in `undefined` being returned. If you need to access the same ' +
                'value within the child component, you should pass it as a different ' +
                'prop. (https://fb.me/react-special-props)',
              displayName
            )
          }
        }

        warnAboutAccessingKey.isReactWarning = true

        defineProperty$2(props, 'key', {
          get: warnAboutAccessingKey,
          configurable: true
        })
      }

      function defineRefPropWarningGetter(props, displayName) {
        var warnAboutAccessingRef = function warnAboutAccessingRef() {
          if (!specialPropRefWarningShown) {
            specialPropRefWarningShown = true
            warningWithoutStack$1(
              false,
              '%s: `ref` is not a prop. Trying to access it will result ' +
                'in `undefined` being returned. If you need to access the same ' +
                'value within the child component, you should pass it as a different ' +
                'prop. (https://fb.me/react-special-props)',
              displayName
            )
          }
        }

        warnAboutAccessingRef.isReactWarning = true

        defineProperty$2(props, 'ref', {
          get: warnAboutAccessingRef,
          configurable: true
        })
      }
      /**
       * Factory method to create a new React element. This no longer adheres to
       * the class pattern, so do not use new to call it. Also, no instanceof check
       * will work. Instead test $$typeof field against Symbol.for('react.element') to check
       * if something is a React Element.
       *
       * @param {*} type
       * @param {*} key
       * @param {string|object} ref
       * @param {*} self A *temporary* helper to detect places where `this` is
       * different from the `owner` when React.createElement is called, so that we
       * can warn. We want to get rid of owner and replace string `ref`s with arrow
       * functions, and as long as `this` and owner are the same, there will be no
       * change in behavior.
       * @param {*} source An annotation object (added by a transpiler or otherwise)
       * indicating filename, line number, and/or other information.
       * @param {*} owner
       * @param {*} props
       * @internal
       */

      var ReactElement = function ReactElement(
        type,
        key,
        ref,
        self,
        source,
        owner,
        props
      ) {
        var element = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: REACT_ELEMENT_TYPE,
          // Built-in properties that belong on the element
          type: type,
          key: key,
          ref: ref,
          props: props,
          // Record the component responsible for creating this element.
          _owner: owner
        }
        {
          // The validation flag is currently mutative. We put it on
          // an external backing store so that we can freeze the whole object.
          // This can be replaced with a WeakMap once they are implemented in
          // commonly used development environments.
          element._store = {} // To make comparing ReactElements easier for testing purposes, we make
          // the validation flag non-enumerable (where possible, which should
          // include every environment we run tests in), so the test framework
          // ignores it.

          defineProperty$2(element._store, 'validated', {
            configurable: false,
            enumerable: false,
            writable: true,
            value: false
          }) // self and source are DEV only properties.

          defineProperty$2(element, '_self', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: self
          }) // Two elements created in two different places should be considered
          // equal for testing purposes and therefore we hide it from enumeration.

          defineProperty$2(element, '_source', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: source
          })

          if (freeze$1) {
            freeze$1(element.props)

            freeze$1(element)
          }
        }
        return element
      }
      /**
       * Create and return a new ReactElement of the given type.
       * See https://reactjs.org/docs/react-api.html#createelement
       */

      function createElement(type, config, children) {
        var propName = void 0 // Reserved names are extracted

        var props = {}
        var key = null
        var ref = null
        var self = null
        var source = null

        if (config != null) {
          if (hasValidRef(config)) {
            ref = config.ref
          }

          if (hasValidKey(config)) {
            key = '' + config.key
          }

          self = config.__self === undefined ? null : config.__self
          source = config.__source === undefined ? null : config.__source // Remaining properties are added to a new props object

          for (propName in config) {
            if (
              hasOwnProperty.call(config, propName) &&
              !RESERVED_PROPS.hasOwnProperty(propName)
            ) {
              props[propName] = config[propName]
            }
          }
        } // Children can be more than one argument, and those are transferred onto
        // the newly allocated props object.

        var childrenLength = arguments.length - 2

        if (childrenLength === 1) {
          props.children = children
        } else if (childrenLength > 1) {
          var childArray = Array(childrenLength)

          for (var i = 0; i < childrenLength; i++) {
            childArray[i] = arguments[i + 2]
          }

          {
            if (freeze$1) {
              freeze$1(childArray)
            }
          }
          props.children = childArray
        } // Resolve default props

        if (type && type.defaultProps) {
          var defaultProps = type.defaultProps

          for (propName in defaultProps) {
            if (props[propName] === undefined) {
              props[propName] = defaultProps[propName]
            }
          }
        }

        {
          if (key || ref) {
            var displayName =
              typeof type === 'function'
                ? type.displayName || type.name || 'Unknown'
                : type

            if (key) {
              defineKeyPropWarningGetter(props, displayName)
            }

            if (ref) {
              defineRefPropWarningGetter(props, displayName)
            }
          }
        }
        return ReactElement(
          type,
          key,
          ref,
          self,
          source,
          ReactCurrentOwner.current,
          props
        )
      }
      /**
       * Return a function that produces ReactElements of a given type.
       * See https://reactjs.org/docs/react-api.html#createfactory
       */

      function cloneAndReplaceKey(oldElement, newKey) {
        var newElement = ReactElement(
          oldElement.type,
          newKey,
          oldElement.ref,
          oldElement._self,
          oldElement._source,
          oldElement._owner,
          oldElement.props
        )
        return newElement
      }
      /**
       * Clone and return a new ReactElement using element as the starting point.
       * See https://reactjs.org/docs/react-api.html#cloneelement
       */

      function cloneElement(element, config, children) {
        !!(element === null || element === undefined)
          ? invariant(
              false,
              'React.cloneElement(...): The argument must be a React element, but you passed %s.',
              element
            )
          : void 0
        var propName = void 0 // Original props are copied

        var props = _assign({}, element.props) // Reserved names are extracted

        var key = element.key
        var ref = element.ref // Self is preserved since the owner is preserved.

        var self = element._self // Source is preserved since cloneElement is unlikely to be targeted by a
        // transpiler, and the original source is probably a better indicator of the
        // true owner.

        var source = element._source // Owner will be preserved, unless ref is overridden

        var owner = element._owner

        if (config != null) {
          if (hasValidRef(config)) {
            // Silently steal the ref from the parent.
            ref = config.ref
            owner = ReactCurrentOwner.current
          }

          if (hasValidKey(config)) {
            key = '' + config.key
          } // Remaining properties override existing props

          var defaultProps = void 0

          if (element.type && element.type.defaultProps) {
            defaultProps = element.type.defaultProps
          }

          for (propName in config) {
            if (
              hasOwnProperty.call(config, propName) &&
              !RESERVED_PROPS.hasOwnProperty(propName)
            ) {
              if (
                config[propName] === undefined &&
                defaultProps !== undefined
              ) {
                // Resolve default props
                props[propName] = defaultProps[propName]
              } else {
                props[propName] = config[propName]
              }
            }
          }
        } // Children can be more than one argument, and those are transferred onto
        // the newly allocated props object.

        var childrenLength = arguments.length - 2

        if (childrenLength === 1) {
          props.children = children
        } else if (childrenLength > 1) {
          var childArray = Array(childrenLength)

          for (var i = 0; i < childrenLength; i++) {
            childArray[i] = arguments[i + 2]
          }

          props.children = childArray
        }

        return ReactElement(element.type, key, ref, self, source, owner, props)
      }
      /**
       * Verifies the object is a ReactElement.
       * See https://reactjs.org/docs/react-api.html#isvalidelement
       * @param {?object} object
       * @return {boolean} True if `object` is a ReactElement.
       * @final
       */

      function isValidElement(object) {
        return (
          _typeof(object) === 'object' &&
          object !== null &&
          object.$$typeof === REACT_ELEMENT_TYPE
        )
      }

      var SEPARATOR = '.'
      var SUBSEPARATOR = ':'
      /**
       * Escape and wrap key so it is safe to use as a reactid
       *
       * @param {string} key to be escaped.
       * @return {string} the escaped key.
       */

      function escape(key) {
        var escapeRegex = /[=:]/g
        var escaperLookup = {
          '=': '=0',
          ':': '=2'
        }
        var escapedString = ('' + key).replace(escapeRegex, function(match) {
          return escaperLookup[match]
        })
        return '$' + escapedString
      }
      /**
       * TODO: Test that a single child and an array with one item have the same key
       * pattern.
       */

      var didWarnAboutMaps = false
      var userProvidedKeyEscapeRegex = /\/+/g

      function escapeUserProvidedKey(text) {
        return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/')
      }

      var POOL_SIZE = 10
      var traverseContextPool = []

      function getPooledTraverseContext(
        mapResult,
        keyPrefix,
        mapFunction,
        mapContext
      ) {
        if (traverseContextPool.length) {
          var traverseContext = traverseContextPool.pop()
          traverseContext.result = mapResult
          traverseContext.keyPrefix = keyPrefix
          traverseContext.func = mapFunction
          traverseContext.context = mapContext
          traverseContext.count = 0
          return traverseContext
        } else {
          return {
            result: mapResult,
            keyPrefix: keyPrefix,
            func: mapFunction,
            context: mapContext,
            count: 0
          }
        }
      }

      function releaseTraverseContext(traverseContext) {
        traverseContext.result = null
        traverseContext.keyPrefix = null
        traverseContext.func = null
        traverseContext.context = null
        traverseContext.count = 0

        if (traverseContextPool.length < POOL_SIZE) {
          traverseContextPool.push(traverseContext)
        }
      }
      /**
       * @param {?*} children Children tree container.
       * @param {!string} nameSoFar Name of the key path so far.
       * @param {!function} callback Callback to invoke with each child found.
       * @param {?*} traverseContext Used to pass information throughout the traversal
       * process.
       * @return {!number} The number of children in this subtree.
       */

      function traverseAllChildrenImpl(
        children,
        nameSoFar,
        callback,
        traverseContext
      ) {
        var type = _typeof(children)

        if (type === 'undefined' || type === 'boolean') {
          // All of the above are perceived as null.
          children = null
        }

        var invokeCallback = false

        if (children === null) {
          invokeCallback = true
        } else {
          switch (type) {
            case 'string':
            case 'number':
              invokeCallback = true
              break

            case 'object':
              switch (children.$$typeof) {
                case REACT_ELEMENT_TYPE:
                case REACT_PORTAL_TYPE:
                  invokeCallback = true
              }
          }
        }

        if (invokeCallback) {
          callback(
            traverseContext,
            children, // If it's the only child, treat the name as if it was wrapped in an array
            // so that it's consistent if the number of children grows.
            nameSoFar === ''
              ? SEPARATOR + getComponentKey(children, 0)
              : nameSoFar
          )
          return 1
        }

        var child = void 0
        var nextName = void 0
        var subtreeCount = 0 // Count of children found in the current subtree.

        var nextNamePrefix =
          nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR

        if (isArray$1(children)) {
          for (var i = 0; i < children.length; i++) {
            child = children[i]
            nextName = nextNamePrefix + getComponentKey(child, i)
            subtreeCount += traverseAllChildrenImpl(
              child,
              nextName,
              callback,
              traverseContext
            )
          }
        } else {
          var iteratorFn = getIteratorFn(children)

          if (typeof iteratorFn === 'function') {
            {
              // Warn about using Maps as children
              if (iteratorFn === children.entries) {
                !didWarnAboutMaps
                  ? warning$1(
                      false,
                      'Using Maps as children is unsupported and will likely yield ' +
                        'unexpected results. Convert it to a sequence/iterable of keyed ' +
                        'ReactElements instead.'
                    )
                  : void 0
                didWarnAboutMaps = true
              }
            }
            var iterator = iteratorFn.call(children)
            var step = void 0
            var ii = 0

            while (!(step = iterator.next()).done) {
              child = step.value
              nextName = nextNamePrefix + getComponentKey(child, ii++)
              subtreeCount += traverseAllChildrenImpl(
                child,
                nextName,
                callback,
                traverseContext
              )
            }
          } else if (type === 'object') {
            var addendum = ''
            {
              addendum =
                ' If you meant to render a collection of children, use an array ' +
                'instead.' +
                ReactDebugCurrentFrame.getStackAddendum()
            }
            var childrenString = '' + children
            invariant(
              false,
              'Objects are not valid as a React child (found: %s).%s',
              childrenString === '[object Object]'
                ? 'object with keys {' + keys$1(children).join(', ') + '}'
                : childrenString,
              addendum
            )
          }
        }

        return subtreeCount
      }
      /**
       * Traverses children that are typically specified as `props.children`, but
       * might also be specified through attributes:
       *
       * - `traverseAllChildren(this.props.children, ...)`
       * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
       *
       * The `traverseContext` is an optional argument that is passed through the
       * entire traversal. It can be used to store accumulations or anything else that
       * the callback might find relevant.
       *
       * @param {?*} children Children tree object.
       * @param {!function} callback To invoke upon traversing each child.
       * @param {?*} traverseContext Context for traversal.
       * @return {!number} The number of children in this subtree.
       */

      function traverseAllChildren(children, callback, traverseContext) {
        if (children == null) {
          return 0
        }

        return traverseAllChildrenImpl(children, '', callback, traverseContext)
      }
      /**
       * Generate a key string that identifies a component within a set.
       *
       * @param {*} component A component that could contain a manual key.
       * @param {number} index Index that is used if a manual key is not provided.
       * @return {string}
       */

      function getComponentKey(component, index) {
        // Do some typechecking here since we call this blindly. We want to ensure
        // that we don't block potential future ES APIs.
        if (
          _typeof(component) === 'object' &&
          component !== null &&
          component.key != null
        ) {
          // Explicit key
          return escape(component.key)
        } // Implicit key determined by the index in the set

        return index.toString(36)
      }

      function forEachSingleChild(bookKeeping, child, name) {
        var func = bookKeeping.func,
          context = bookKeeping.context
        func.call(context, child, bookKeeping.count++)
      }
      /**
       * Iterates through children that are typically specified as `props.children`.
       *
       * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
       *
       * The provided forEachFunc(child, index) will be called for each
       * leaf child.
       *
       * @param {?*} children Children tree container.
       * @param {function(*, int)} forEachFunc
       * @param {*} forEachContext Context for forEachContext.
       */

      function forEachChildren(children, forEachFunc, forEachContext) {
        if (children == null) {
          return children
        }

        var traverseContext = getPooledTraverseContext(
          null,
          null,
          forEachFunc,
          forEachContext
        )
        traverseAllChildren(children, forEachSingleChild, traverseContext)
        releaseTraverseContext(traverseContext)
      }

      function mapSingleChildIntoContext(bookKeeping, child, childKey) {
        var result = bookKeeping.result,
          keyPrefix = bookKeeping.keyPrefix,
          func = bookKeeping.func,
          context = bookKeeping.context
        var mappedChild = func.call(context, child, bookKeeping.count++)

        if (isArray$1(mappedChild)) {
          mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, function(
            c
          ) {
            return c
          })
        } else if (mappedChild != null) {
          if (isValidElement(mappedChild)) {
            mappedChild = cloneAndReplaceKey(
              mappedChild, // Keep both the (mapped) and old keys if they differ, just as
              // traverseAllChildren used to do for objects as children
              keyPrefix +
                (mappedChild.key && (!child || child.key !== mappedChild.key)
                  ? escapeUserProvidedKey(mappedChild.key) + '/'
                  : '') +
                childKey
            )
          }

          result.push(mappedChild)
        }
      }

      function mapIntoWithKeyPrefixInternal(
        children,
        array,
        prefix,
        func,
        context
      ) {
        var escapedPrefix = ''

        if (prefix != null) {
          escapedPrefix = escapeUserProvidedKey(prefix) + '/'
        }

        var traverseContext = getPooledTraverseContext(
          array,
          escapedPrefix,
          func,
          context
        )
        traverseAllChildren(
          children,
          mapSingleChildIntoContext,
          traverseContext
        )
        releaseTraverseContext(traverseContext)
      }
      /**
       * Maps children that are typically specified as `props.children`.
       *
       * See https://reactjs.org/docs/react-api.html#reactchildrenmap
       *
       * The provided mapFunction(child, key, index) will be called for each
       * leaf child.
       *
       * @param {?*} children Children tree container.
       * @param {function(*, int)} func The map function.
       * @param {*} context Context for mapFunction.
       * @return {object} Object containing the ordered map of results.
       */

      function mapChildren(children, func, context) {
        if (children == null) {
          return children
        }

        var result = []
        mapIntoWithKeyPrefixInternal(children, result, null, func, context)
        return result
      }
      /**
       * Count the number of children that are typically specified as
       * `props.children`.
       *
       * See https://reactjs.org/docs/react-api.html#reactchildrencount
       *
       * @param {?*} children Children tree container.
       * @return {number} The number of children.
       */

      function countChildren(children) {
        return traverseAllChildren(
          children,
          function() {
            return null
          },
          null
        )
      }
      /**
       * Flatten a children object (typically specified as `props.children`) and
       * return an array with appropriately re-keyed children.
       *
       * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
       */

      function toArray(children) {
        var result = []
        mapIntoWithKeyPrefixInternal(children, result, null, function(child) {
          return child
        })
        return result
      }
      /**
       * Returns the first child in a collection of children and verifies that there
       * is only one child in the collection.
       *
       * See https://reactjs.org/docs/react-api.html#reactchildrenonly
       *
       * The current implementation of this function assumes that a single child gets
       * passed without a wrapper, but the purpose of this helper function is to
       * abstract away the particular structure of children.
       *
       * @param {?object} children Child collection structure.
       * @return {ReactElement} The first and only `ReactElement` contained in the
       * structure.
       */

      function onlyChild(children) {
        !isValidElement(children)
          ? invariant(
              false,
              'React.Children.only expected to receive a single React element child.'
            )
          : void 0
        return children
      }

      function createContext(defaultValue, calculateChangedBits) {
        if (calculateChangedBits === undefined) {
          calculateChangedBits = null
        } else {
          {
            !(
              calculateChangedBits === null ||
              typeof calculateChangedBits === 'function'
            )
              ? warningWithoutStack$1(
                  false,
                  'createContext: Expected the optional second argument to be a ' +
                    'function. Instead received: %s',
                  calculateChangedBits
                )
              : void 0
          }
        }

        var context = {
          $$typeof: REACT_CONTEXT_TYPE,
          _calculateChangedBits: calculateChangedBits,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: defaultValue,
          _currentValue2: defaultValue,
          // Used to track how many concurrent renderers this context currently
          // supports within in a single renderer. Such as parallel server rendering.
          _threadCount: 0,
          // These are circular
          Provider: null,
          Consumer: null
        }
        context.Provider = {
          $$typeof: REACT_PROVIDER_TYPE,
          _context: context
        }
        var hasWarnedAboutUsingNestedContextConsumers = false
        var hasWarnedAboutUsingConsumerProvider = false
        {
          // A separate object, but proxies back to the original context object for
          // backwards compatibility. It has a different $$typeof, so we can properly
          // warn for the incorrect usage of Context as a Consumer.
          var Consumer = {
            $$typeof: REACT_CONTEXT_TYPE,
            _context: context,
            _calculateChangedBits: context._calculateChangedBits
          } // $FlowFixMe: Flow complains about not setting a value, which is intentional here

          defineProperties$1(Consumer, {
            Provider: {
              get: function get() {
                if (!hasWarnedAboutUsingConsumerProvider) {
                  hasWarnedAboutUsingConsumerProvider = true
                  warning$1(
                    false,
                    'Rendering <Context.Consumer.Provider> is not supported and will be removed in ' +
                      'a future major release. Did you mean to render <Context.Provider> instead?'
                  )
                }

                return context.Provider
              },
              set: function set(_Provider) {
                context.Provider = _Provider
              }
            },
            _currentValue: {
              get: function get() {
                return context._currentValue
              },
              set: function set(_currentValue) {
                context._currentValue = _currentValue
              }
            },
            _currentValue2: {
              get: function get() {
                return context._currentValue2
              },
              set: function set(_currentValue2) {
                context._currentValue2 = _currentValue2
              }
            },
            _threadCount: {
              get: function get() {
                return context._threadCount
              },
              set: function set(_threadCount) {
                context._threadCount = _threadCount
              }
            },
            Consumer: {
              get: function get() {
                if (!hasWarnedAboutUsingNestedContextConsumers) {
                  hasWarnedAboutUsingNestedContextConsumers = true
                  warning$1(
                    false,
                    'Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' +
                      'a future major release. Did you mean to render <Context.Consumer> instead?'
                  )
                }

                return context.Consumer
              }
            }
          }) // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty

          context.Consumer = Consumer
        }
        {
          context._currentRenderer = null
          context._currentRenderer2 = null
        }
        return context
      }

      function lazy(ctor) {
        var lazyType = {
          $$typeof: REACT_LAZY_TYPE,
          _ctor: ctor,
          // React uses these fields to store the result.
          _status: -1,
          _result: null
        }
        {
          // In production, this would just set it on the object.
          var defaultProps = void 0
          var propTypes = void 0

          defineProperties$1(lazyType, {
            defaultProps: {
              configurable: true,
              get: function get() {
                return defaultProps
              },
              set: function set(newDefaultProps) {
                warning$1(
                  false,
                  'React.lazy(...): It is not supported to assign `defaultProps` to ' +
                    'a lazy component import. Either specify them where the component ' +
                    'is defined, or create a wrapping component around it.'
                )
                defaultProps = newDefaultProps // Match production behavior more closely:

                defineProperty$2(lazyType, 'defaultProps', {
                  enumerable: true
                })
              }
            },
            propTypes: {
              configurable: true,
              get: function get() {
                return propTypes
              },
              set: function set(newPropTypes) {
                warning$1(
                  false,
                  'React.lazy(...): It is not supported to assign `propTypes` to ' +
                    'a lazy component import. Either specify them where the component ' +
                    'is defined, or create a wrapping component around it.'
                )
                propTypes = newPropTypes // Match production behavior more closely:

                defineProperty$2(lazyType, 'propTypes', {
                  enumerable: true
                })
              }
            }
          })
        }
        return lazyType
      }

      function forwardRef(render) {
        {
          if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
            warningWithoutStack$1(
              false,
              'forwardRef requires a render function but received a `memo` ' +
                'component. Instead of forwardRef(memo(...)), use ' +
                'memo(forwardRef(...)).'
            )
          } else if (typeof render !== 'function') {
            warningWithoutStack$1(
              false,
              'forwardRef requires a render function but was given %s.',
              render === null ? 'null' : _typeof(render)
            )
          } else {
            !// Do not warn for 0 arguments because it could be due to usage of the 'arguments' object
            (render.length === 0 || render.length === 2)
              ? warningWithoutStack$1(
                  false,
                  'forwardRef render functions accept exactly two parameters: props and ref. %s',
                  render.length === 1
                    ? 'Did you forget to use the ref parameter?'
                    : 'Any additional parameter will be undefined.'
                )
              : void 0
          }

          if (render != null) {
            !(render.defaultProps == null && render.propTypes == null)
              ? warningWithoutStack$1(
                  false,
                  'forwardRef render functions do not support propTypes or defaultProps. ' +
                    'Did you accidentally pass a React component?'
                )
              : void 0
          }
        }
        return {
          $$typeof: REACT_FORWARD_REF_TYPE,
          render: render
        }
      }

      function isValidElementType(type) {
        return (
          typeof type === 'string' ||
          typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
          type === REACT_FRAGMENT_TYPE ||
          type === REACT_CONCURRENT_MODE_TYPE ||
          type === REACT_PROFILER_TYPE ||
          type === REACT_STRICT_MODE_TYPE ||
          type === REACT_SUSPENSE_TYPE ||
          (_typeof(type) === 'object' &&
            type !== null &&
            (type.$$typeof === REACT_LAZY_TYPE ||
              type.$$typeof === REACT_MEMO_TYPE ||
              type.$$typeof === REACT_PROVIDER_TYPE ||
              type.$$typeof === REACT_CONTEXT_TYPE ||
              type.$$typeof === REACT_FORWARD_REF_TYPE))
        )
      }

      function memo(type, compare) {
        {
          if (!isValidElementType(type)) {
            warningWithoutStack$1(
              false,
              'memo: The first argument must be a component. Instead ' +
                'received: %s',
              type === null ? 'null' : _typeof(type)
            )
          }
        }
        return {
          $$typeof: REACT_MEMO_TYPE,
          type: type,
          compare: compare === undefined ? null : compare
        }
      }

      function resolveDispatcher() {
        var dispatcher = ReactCurrentDispatcher.current
        !(dispatcher !== null)
          ? invariant(
              false,
              'Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.'
            )
          : void 0
        return dispatcher
      }

      function useContext(Context, unstable_observedBits) {
        var dispatcher = resolveDispatcher()
        {
          !(unstable_observedBits === undefined)
            ? warning$1(
                false,
                'useContext() second argument is reserved for future ' +
                  'use in React. Passing it is not supported. ' +
                  'You passed: %s.%s',
                unstable_observedBits,
                typeof unstable_observedBits === 'number' &&
                isArray$1(arguments[2])
                  ? '\n\nDid you call array.map(useContext)? ' +
                    'Calling Hooks inside a loop is not supported. ' +
                    'Learn more at https://fb.me/rules-of-hooks'
                  : ''
              )
            : void 0 // TODO: add a more generic warning for invalid values.

          if (Context._context !== undefined) {
            var realContext = Context._context // Don't deduplicate because this legitimately causes bugs
            // and nobody should be using this in existing code.

            if (realContext.Consumer === Context) {
              warning$1(
                false,
                'Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' +
                  'removed in a future major release. Did you mean to call useContext(Context) instead?'
              )
            } else if (realContext.Provider === Context) {
              warning$1(
                false,
                'Calling useContext(Context.Provider) is not supported. ' +
                  'Did you mean to call useContext(Context) instead?'
              )
            }
          }
        }
        return dispatcher.useContext(Context, unstable_observedBits)
      }

      function useState(initialState) {
        var dispatcher = resolveDispatcher()
        return dispatcher.useState(initialState)
      }

      function useReducer(reducer, initialArg, init) {
        var dispatcher = resolveDispatcher()
        return dispatcher.useReducer(reducer, initialArg, init)
      }

      function useRef(initialValue) {
        var dispatcher = resolveDispatcher()
        return dispatcher.useRef(initialValue)
      }

      function useEffect(create, inputs) {
        var dispatcher = resolveDispatcher()
        return dispatcher.useEffect(create, inputs)
      }

      function useLayoutEffect(create, inputs) {
        var dispatcher = resolveDispatcher()
        return dispatcher.useLayoutEffect(create, inputs)
      }

      function useCallback(callback, inputs) {
        var dispatcher = resolveDispatcher()
        return dispatcher.useCallback(callback, inputs)
      }

      function useMemo(create, inputs) {
        var dispatcher = resolveDispatcher()
        return dispatcher.useMemo(create, inputs)
      }

      function useImperativeHandle(ref, create, inputs) {
        var dispatcher = resolveDispatcher()
        return dispatcher.useImperativeHandle(ref, create, inputs)
      }

      function useDebugValue(value, formatterFn) {
        {
          var dispatcher = resolveDispatcher()
          return dispatcher.useDebugValue(value, formatterFn)
        }
      }
      /**
       * ReactElementValidator provides a wrapper around a element factory
       * which validates the props passed to the element. This is intended to be
       * used only in DEV and could be replaced by a static type checker for languages
       * that support it.
       */

      var propTypesMisspellWarningShown = void 0
      {
        propTypesMisspellWarningShown = false
      }

      function getDeclarationErrorAddendum() {
        if (ReactCurrentOwner.current) {
          var name = getComponentName(ReactCurrentOwner.current.type)

          if (name) {
            return '\n\nCheck the render method of `' + name + '`.'
          }
        }

        return ''
      }

      function getSourceInfoErrorAddendum(elementProps) {
        if (
          elementProps !== null &&
          elementProps !== undefined &&
          elementProps.__source !== undefined
        ) {
          var source = elementProps.__source
          var fileName = source.fileName.replace(/^.*[\\\/]/, '')
          var lineNumber = source.lineNumber
          return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.'
        }

        return ''
      }
      /**
       * Warn if there's no key explicitly set on dynamic arrays of children or
       * object keys are not valid. This allows us to keep track of children between
       * updates.
       */

      var ownerHasKeyUseWarning = {}

      function getCurrentComponentErrorInfo(parentType) {
        var info = getDeclarationErrorAddendum()

        if (!info) {
          var parentName =
            typeof parentType === 'string'
              ? parentType
              : parentType.displayName || parentType.name

          if (parentName) {
            info =
              '\n\nCheck the top-level render call using <' + parentName + '>.'
          }
        }

        return info
      }
      /**
       * Warn if the element doesn't have an explicit key assigned to it.
       * This element is in an array. The array could grow and shrink or be
       * reordered. All children that haven't already been validated are required to
       * have a "key" property assigned to it. Error statuses are cached so a warning
       * will only be shown once.
       *
       * @internal
       * @param {ReactElement} element Element that requires a key.
       * @param {*} parentType element's parent's type.
       */

      function validateExplicitKey(element, parentType) {
        if (
          !element._store ||
          element._store.validated ||
          element.key != null
        ) {
          return
        }

        element._store.validated = true
        var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType)

        if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
          return
        }

        ownerHasKeyUseWarning[currentComponentErrorInfo] = true // Usually the current owner is the offender, but if it accepts children as a
        // property, it may be the creator of the child that's responsible for
        // assigning it a key.

        var childOwner = ''

        if (
          element &&
          element._owner &&
          element._owner !== ReactCurrentOwner.current
        ) {
          // Give the component that originally created this child.
          childOwner =
            ' It was passed a child from ' +
            getComponentName(element._owner.type) +
            '.'
        }

        setCurrentlyValidatingElement(element)
        {
          warning$1(
            false,
            'Each child in a list should have a unique "key" prop.' +
              '%s%s See https://fb.me/react-warning-keys for more information.',
            currentComponentErrorInfo,
            childOwner
          )
        }
        setCurrentlyValidatingElement(null)
      }
      /**
       * Ensure that every element either is passed in a static location, in an
       * array with an explicit keys property defined, or in an object literal
       * with valid key property.
       *
       * @internal
       * @param {ReactNode} node Statically passed child of any type.
       * @param {*} parentType node's parent's type.
       */

      function validateChildKeys(node, parentType) {
        if (_typeof(node) !== 'object') {
          return
        }

        if (isArray$1(node)) {
          for (var i = 0; i < node.length; i++) {
            var child = node[i]

            if (isValidElement(child)) {
              validateExplicitKey(child, parentType)
            }
          }
        } else if (isValidElement(node)) {
          // This element was passed in a valid location.
          if (node._store) {
            node._store.validated = true
          }
        } else if (node) {
          var iteratorFn = getIteratorFn(node)

          if (typeof iteratorFn === 'function') {
            // Entry iterators used to provide implicit keys,
            // but now we print a separate warning for them later.
            if (iteratorFn !== node.entries) {
              var iterator = iteratorFn.call(node)
              var step = void 0

              while (!(step = iterator.next()).done) {
                if (isValidElement(step.value)) {
                  validateExplicitKey(step.value, parentType)
                }
              }
            }
          }
        }
      }
      /**
       * Given an element, validate that its props follow the propTypes definition,
       * provided by the type.
       *
       * @param {ReactElement} element
       */

      function validatePropTypes(element) {
        var type = element.type

        if (type === null || type === undefined || typeof type === 'string') {
          return
        }

        var name = getComponentName(type)
        var propTypes = void 0

        if (typeof type === 'function') {
          propTypes = type.propTypes
        } else if (
          _typeof(type) === 'object' &&
          (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
            // Inner props are checked in the reconciler.
            type.$$typeof === REACT_MEMO_TYPE)
        ) {
          propTypes = type.propTypes
        } else {
          return
        }

        if (propTypes) {
          setCurrentlyValidatingElement(element)
          checkPropTypes(
            propTypes,
            element.props,
            'prop',
            name,
            ReactDebugCurrentFrame.getStackAddendum
          )
          setCurrentlyValidatingElement(null)
        } else if (
          type.PropTypes !== undefined &&
          !propTypesMisspellWarningShown
        ) {
          propTypesMisspellWarningShown = true
          warningWithoutStack$1(
            false,
            'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?',
            name || 'Unknown'
          )
        }

        if (typeof type.getDefaultProps === 'function') {
          !type.getDefaultProps.isReactClassApproved
            ? warningWithoutStack$1(
                false,
                'getDefaultProps is only used on classic React.createClass ' +
                  'definitions. Use a static property named `defaultProps` instead.'
              )
            : void 0
        }
      }
      /**
       * Given a fragment, validate that it can only be provided with fragment props
       * @param {ReactElement} fragment
       */

      function validateFragmentProps(fragment) {
        setCurrentlyValidatingElement(fragment)

        var keys = keys$1(fragment.props)

        for (var i = 0; i < keys.length; i++) {
          var key = keys[i]

          if (key !== 'children' && key !== 'key') {
            warning$1(
              false,
              'Invalid prop `%s` supplied to `React.Fragment`. ' +
                'React.Fragment can only have `key` and `children` props.',
              key
            )
            break
          }
        }

        if (fragment.ref !== null) {
          warning$1(
            false,
            'Invalid attribute `ref` supplied to `React.Fragment`.'
          )
        }

        setCurrentlyValidatingElement(null)
      }

      function createElementWithValidation(type, props, children) {
        var validType = isValidElementType(type) // We warn in this case but don't throw. We expect the element creation to
        // succeed and there will likely be errors in render.

        if (!validType) {
          var info = ''

          if (
            type === undefined ||
            (_typeof(type) === 'object' &&
              type !== null &&
              keys$1(type).length === 0)
          ) {
            info +=
              ' You likely forgot to export your component from the file ' +
              "it's defined in, or you might have mixed up default and named imports."
          }

          var sourceInfo = getSourceInfoErrorAddendum(props)

          if (sourceInfo) {
            info += sourceInfo
          } else {
            info += getDeclarationErrorAddendum()
          }

          var typeString = void 0

          if (type === null) {
            typeString = 'null'
          } else if (isArray$1(type)) {
            typeString = 'array'
          } else if (
            type !== undefined &&
            type.$$typeof === REACT_ELEMENT_TYPE
          ) {
            typeString =
              '<' + (getComponentName(type.type) || 'Unknown') + ' />'
            info =
              ' Did you accidentally export a JSX literal instead of a component?'
          } else {
            typeString = _typeof(type)
          }

          warning$1(
            false,
            'React.createElement: type is invalid -- expected a string (for ' +
              'built-in components) or a class/function (for composite ' +
              'components) but got: %s.%s',
            typeString,
            info
          )
        }

        var element = createElement.apply(this, arguments) // The result can be nullish if a mock or a custom function is used.
        // TODO: Drop this when these are no longer allowed as the type argument.

        if (element == null) {
          return element
        } // Skip key warning if the type isn't valid since our key validation logic
        // doesn't expect a non-string/function type and can throw confusing errors.
        // We don't want exception behavior to differ between dev and prod.
        // (Rendering will throw with a helpful message and as soon as the type is
        // fixed, the key warnings will appear.)

        if (validType) {
          for (var i = 2; i < arguments.length; i++) {
            validateChildKeys(arguments[i], type)
          }
        }

        if (type === REACT_FRAGMENT_TYPE) {
          validateFragmentProps(element)
        } else {
          validatePropTypes(element)
        }

        return element
      }

      function createFactoryWithValidation(type) {
        var validatedFactory = createElementWithValidation.bind(null, type)
        validatedFactory.type = type // Legacy hook: remove it

        {
          defineProperty$2(validatedFactory, 'type', {
            enumerable: false,
            get: function get() {
              lowPriorityWarning$1(
                false,
                'Factory.type is deprecated. Access the class directly ' +
                  'before passing it to createFactory.'
              )

              defineProperty$2(this, 'type', {
                value: type
              })

              return type
            }
          })
        }
        return validatedFactory
      }

      function cloneElementWithValidation(element, props, children) {
        var newElement = cloneElement.apply(this, arguments)

        for (var i = 2; i < arguments.length; i++) {
          validateChildKeys(arguments[i], newElement.type)
        }

        validatePropTypes(newElement)
        return newElement
      } // Helps identify side effects in begin-phase lifecycle hooks and setState reducers:
      var React = {
        Children: {
          map: mapChildren,
          forEach: forEachChildren,
          count: countChildren,
          toArray: toArray,
          only: onlyChild
        },
        createRef: createRef,
        Component: Component,
        PureComponent: PureComponent,
        createContext: createContext,
        forwardRef: forwardRef,
        lazy: lazy,
        memo: memo,
        useCallback: useCallback,
        useContext: useContext,
        useEffect: useEffect,
        useImperativeHandle: useImperativeHandle,
        useDebugValue: useDebugValue,
        useLayoutEffect: useLayoutEffect,
        useMemo: useMemo,
        useReducer: useReducer,
        useRef: useRef,
        useState: useState,
        Fragment: REACT_FRAGMENT_TYPE,
        StrictMode: REACT_STRICT_MODE_TYPE,
        Suspense: REACT_SUSPENSE_TYPE,
        createElement: createElementWithValidation,
        cloneElement: cloneElementWithValidation,
        createFactory: createFactoryWithValidation,
        isValidElement: isValidElement,
        version: ReactVersion,
        unstable_ConcurrentMode: REACT_CONCURRENT_MODE_TYPE,
        unstable_Profiler: REACT_PROFILER_TYPE,
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals
      } // Note: some APIs are added with feature flags.

      var React$2 = freeze$1({
        default: React
      })

      var React$3 = (React$2 && React) || React$2 // TODO: decide on the top-level export form.
      // This is hacky but makes it work with both Rollup and Jest.

      var react = React$3.default || React$3
      module.exports = react
    })()
  }
})

var react = createCommonjsModule(function(module) {
  {
    module.exports = react_development
  }
})

var FlagProvider =
  /*#__PURE__*/
  (function(_React$Component) {
    _inherits(FlagProvider, _React$Component)

    function FlagProvider() {
      _classCallCheck(this, FlagProvider)

      return _possibleConstructorReturn(
        this,
        _getPrototypeOf(FlagProvider).apply(this, arguments)
      )
    }

    _createClass(FlagProvider, [
      {
        key: 'render',
        value: function render() {
          return react.createElement('div', null, 'Test React Component')
        }
      }
    ])

    return FlagProvider
  })(react.Component)

export {FlagProvider}
//# sourceMappingURL=flagger.react.esm.browser.js.map
