(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@babel/runtime-corejs2/core-js/number/is-integer'), require('@babel/runtime-corejs2/core-js/object/assign'), require('md5'), require('fast-json-stable-stringify'), require('@babel/runtime-corejs2/core-js/parse-float'), require('@babel/runtime-corejs2/core-js/parse-int'), require('@babel/runtime-corejs2/core-js/object/values'), require('@babel/runtime-corejs2/regenerator'), require('@babel/runtime-corejs2/core-js/date/now'), require('@babel/runtime-corejs2/core-js/promise'), require('@babel/runtime-corejs2/core-js/array/is-array'), require('@babel/runtime-corejs2/core-js/json/stringify'), require('@babel/runtime-corejs2/core-js/array/from'), require('@babel/runtime-corejs2/core-js/set'), require('eventsource'), require('http'), require('https'), require('url'), require('@babel/runtime-corejs2/core-js/object/keys')) :
  typeof define === 'function' && define.amd ? define(['@babel/runtime-corejs2/core-js/number/is-integer', '@babel/runtime-corejs2/core-js/object/assign', 'md5', 'fast-json-stable-stringify', '@babel/runtime-corejs2/core-js/parse-float', '@babel/runtime-corejs2/core-js/parse-int', '@babel/runtime-corejs2/core-js/object/values', '@babel/runtime-corejs2/regenerator', '@babel/runtime-corejs2/core-js/date/now', '@babel/runtime-corejs2/core-js/promise', '@babel/runtime-corejs2/core-js/array/is-array', '@babel/runtime-corejs2/core-js/json/stringify', '@babel/runtime-corejs2/core-js/array/from', '@babel/runtime-corejs2/core-js/set', 'eventsource', 'http', 'https', 'url', '@babel/runtime-corejs2/core-js/object/keys'], factory) :
  (global.Flagger = factory(global._Number$isInteger,global._Object$assign,global.md5,global.stringify,global._parseFloat,global._parseInt,global._Object$values,global._regeneratorRuntime,global._Date$now,global._Promise,global._Array$isArray,global._JSON$stringify,global._Array$from,global._Set,global.EventSource,global.http,global.https,global.URL,global._Object$keys));
}(this, (function (_Number$isInteger,_Object$assign,md5,stringify,_parseFloat,_parseInt,_Object$values,_regeneratorRuntime,_Date$now,_Promise,_Array$isArray,_JSON$stringify,_Array$from,_Set,EventSource,http,https,URL,_Object$keys) { 'use strict';

  _Number$isInteger = _Number$isInteger && _Number$isInteger.hasOwnProperty('default') ? _Number$isInteger['default'] : _Number$isInteger;
  _Object$assign = _Object$assign && _Object$assign.hasOwnProperty('default') ? _Object$assign['default'] : _Object$assign;
  md5 = md5 && md5.hasOwnProperty('default') ? md5['default'] : md5;
  stringify = stringify && stringify.hasOwnProperty('default') ? stringify['default'] : stringify;
  _parseFloat = _parseFloat && _parseFloat.hasOwnProperty('default') ? _parseFloat['default'] : _parseFloat;
  _parseInt = _parseInt && _parseInt.hasOwnProperty('default') ? _parseInt['default'] : _parseInt;
  _Object$values = _Object$values && _Object$values.hasOwnProperty('default') ? _Object$values['default'] : _Object$values;
  _regeneratorRuntime = _regeneratorRuntime && _regeneratorRuntime.hasOwnProperty('default') ? _regeneratorRuntime['default'] : _regeneratorRuntime;
  _Date$now = _Date$now && _Date$now.hasOwnProperty('default') ? _Date$now['default'] : _Date$now;
  _Promise = _Promise && _Promise.hasOwnProperty('default') ? _Promise['default'] : _Promise;
  _Array$isArray = _Array$isArray && _Array$isArray.hasOwnProperty('default') ? _Array$isArray['default'] : _Array$isArray;
  _JSON$stringify = _JSON$stringify && _JSON$stringify.hasOwnProperty('default') ? _JSON$stringify['default'] : _JSON$stringify;
  _Array$from = _Array$from && _Array$from.hasOwnProperty('default') ? _Array$from['default'] : _Array$from;
  _Set = _Set && _Set.hasOwnProperty('default') ? _Set['default'] : _Set;
  EventSource = EventSource && EventSource.hasOwnProperty('default') ? EventSource['default'] : EventSource;
  _Object$keys = _Object$keys && _Object$keys.hasOwnProperty('default') ? _Object$keys['default'] : _Object$keys;

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

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

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(source, true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  var logger = function logger(x) {
    // eslint-disable-next-line no-console
    console.error(x);
  };
  function setLogger(fn) {
    logger = fn;
  }

  var validate = function validate() {
    return true;
  };

  var DEFAULT_ENTITY_TYPE = 'User';

  var AirshipObject =
  /*#__PURE__*/
  function () {
    function AirshipObject(obj) {
      _classCallCheck(this, AirshipObject);

      var isValid = AirshipObject.isValidObject(obj);

      if (!isValid) {
        this.object = null;
        return;
      }

      obj = AirshipObject._cloneObject(obj);
      isValid = AirshipObject._fillInFields(obj);

      if (!isValid) {
        this.object = null;
        return;
      }

      this.object = obj;
    }

    _createClass(AirshipObject, [{
      key: "getHash",
      value: function getHash() {
        return md5(stringify(_objectSpread2({}, this.object, {
          attributes: this.object.attributes || {},
          group: _objectSpread2({}, this.object.group, {
            attributes: this.object.group && this.object.group.attributes || {}
          })
        })));
      }
    }, {
      key: "getId",
      value: function getId() {
        var obj = this.object;
        return "".concat(obj.type, "_").concat(obj.id);
      }
    }, {
      key: "isValid",
      value: function isValid() {
        return this.object !== null;
      }
    }, {
      key: "getRawObject",
      value: function getRawObject() {
        return this.object;
      }
    }, {
      key: "getObject",
      value: function getObject() {
        var obj = this.object;

        var clone = _Object$assign({}, obj);

        delete clone.group;
        return new AirshipObject(clone);
      }
    }, {
      key: "getGroup",
      value: function getGroup() {
        var group = this.object.group || null;
        return group && new AirshipObject(group);
      }
    }], [{
      key: "isValidObject",
      value: function isValidObject(obj) {
        var isValid = validate(obj);

        if (!isValid) {
          logger(validate.errors.map(function (e) {
            return e.message;
          }));
        }

        if (isValid) {
          var isGroup = obj.isGroup !== undefined ? obj.isGroup : false;
          var type = obj.type !== undefined ? obj.type : DEFAULT_ENTITY_TYPE;
          var groupIndex = type.lastIndexOf('Group');

          if (groupIndex !== -1 && groupIndex === type.length - 'Group'.length && !isGroup) {
            logger("An entity's type that ends with `Group` must be a group entity and therefore has to have an explicit `isGroup: true` property");
            isValid = false;
          }
        }

        return isValid;
      }
    }, {
      key: "_cloneObject",
      value: function _cloneObject(obj) {
        var clone = _Object$assign({}, obj);

        if (obj.attributes !== undefined) {
          clone.attributes = _Object$assign({}, obj.attributes);
        }

        if (obj.group !== undefined) {
          clone.group = _Object$assign({}, obj.group);

          if (obj.group.attributes !== undefined) {
            clone.group.attributes = _Object$assign({}, obj.group.attributes);
          }
        }

        return clone;
      }
    }, {
      key: "_fillInFields",
      value: function _fillInFields(obj) {
        if (obj.type === undefined) {
          obj.type = DEFAULT_ENTITY_TYPE;
        }

        if (obj.displayName === undefined) {
          obj.displayName = '' + obj.id;
        }

        if (obj.isGroup === undefined) {
          obj.isGroup = false;
        }

        if (_Number$isInteger(obj.id)) {
          var idStr = '' + obj.id;

          if (idStr.length > 250) {
            logger('Integer id must have 250 digits or less');
            return false;
          }

          obj.id = idStr;
        }

        var group = null;

        if (obj.group !== undefined) {
          group = obj.group;
        }

        if (group !== null && group.displayName === undefined) {
          group.displayName = '' + group.id;
        }

        if (group !== null && group.type === undefined) {
          group.type = obj.type + 'Group';
        }

        if (group !== null) {
          group.isGroup = true;
        }

        if (group !== null) {
          if (_Number$isInteger(group.id)) {
            var _idStr = '' + group.id;

            if (_idStr.length > 250) {
              logger('Integer id must have 250 digits or less');
              return false;
            }

            group.id = _idStr;
          }
        }

        return true;
      }
    }]);

    return AirshipObject;
  }();

  var RULE_TYPE_STRING = 'string';
  var RULE_TYPE_INT = 'int';
  var RULE_TYPE_FLOAT = 'float';
  var RULE_TYPE_BOOLEAN = 'boolean';
  var RULE_TYPE_DATE = 'date';
  var RULE_TYPE_DATETIME = 'datetime';
  var RULE_OPERATOR_IS = 'is';
  var RULE_OPERATOR_IS_NOT = 'is_not';
  var RULE_OPERATOR_IN = 'in';
  var RULE_OPERATOR_NOT_IN = 'not_in';
  var RULE_OPERATOR_LT = 'lt';
  var RULE_OPERATOR_LTE = 'lte';
  var RULE_OPERATOR_GT = 'gt';
  var RULE_OPERATOR_GTE = 'gte';
  var RULE_OPERATOR_FROM = 'from';
  var RULE_OPERATOR_UNTIL = 'until';
  var RULE_OPERATOR_AFTER = 'after';
  var RULE_OPERATOR_BEFORE = 'before';
  var getHashedValue = function getHashedValue(s) {
    return _parseInt(md5(s), 16) * 1.0 / 340282366920938463463374607431768211455;
  };

  var Population =
  /*#__PURE__*/
  function () {
    function Population(population) {
      _classCallCheck(this, Population);

      this.population = population;
    }

    _createClass(Population, [{
      key: "_ruleMatches",
      value: function _ruleMatches(rule, obj) {
        var attributes = obj.attributes || {};

        if (!attributes.hasOwnProperty(rule.attributeName)) {
          return false;
        }

        var v = attributes[rule.attributeName];
        var attributeType = Population.categorizeValueType(v);
        var numberTypes = [RULE_TYPE_INT, RULE_TYPE_FLOAT];

        if (numberTypes.indexOf(attributeType) !== -1 && numberTypes.indexOf(rule.attributeType) !== -1) ; else if (attributeType !== rule.attributeType) {
          return false;
        }

        var targetVal = rule.value;
        var targetValList = rule.valueList;
        var op = rule.operator;

        if (attributeType === RULE_TYPE_STRING) {
          if (op === RULE_OPERATOR_IS) {
            return v === targetVal;
          } else if (op === RULE_OPERATOR_IS_NOT) {
            return v !== targetVal;
          } else if (op === RULE_OPERATOR_IN) {
            return targetValList.indexOf(v) !== -1;
          } else if (op === RULE_OPERATOR_NOT_IN) {
            return targetValList.indexOf(v) === -1;
          } else {
            logger('Invalid rule operator encountered');
            return false;
          }
        } else if (numberTypes.indexOf(attributeType) !== -1) {
          if (op === RULE_OPERATOR_IS) {
            return v === targetVal;
          } else if (op === RULE_OPERATOR_IS_NOT) {
            return v !== targetVal;
          } else if (op === RULE_OPERATOR_IN) {
            return targetValList.indexOf(v) !== -1;
          } else if (op === RULE_OPERATOR_NOT_IN) {
            return targetValList.indexOf(v) === -1;
          } else if (op === RULE_OPERATOR_LT) {
            return v < targetVal;
          } else if (op === RULE_OPERATOR_LTE) {
            return v <= targetVal;
          } else if (op === RULE_OPERATOR_GT) {
            return v > targetVal;
          } else if (op === RULE_OPERATOR_GTE) {
            return v >= targetVal;
          } else {
            logger('Invalid rule operator encountered');
            return false;
          }
        } else if (attributeType === RULE_TYPE_BOOLEAN) {
          if (op === RULE_OPERATOR_IS) {
            return v === targetVal;
          } else if (op === RULE_OPERATOR_IS_NOT) {
            return v !== targetVal;
          } else {
            logger('Invalid rule operator encountered');
            return false;
          }
        } else if (attributeType === RULE_TYPE_DATE || attributeType === RULE_TYPE_DATETIME) {
          var targetTime = targetVal && new Date(targetVal).getTime();
          var targetTimeList = targetValList && targetValList.map(function (tv) {
            return new Date(tv).getTime();
          });
          var vTime = new Date(v).getTime();

          if (op === RULE_OPERATOR_IS) {
            return vTime === targetTime;
          } else if (op === RULE_OPERATOR_IS_NOT) {
            return vTime !== targetTime;
          } else if (op === RULE_OPERATOR_IN) {
            return targetTimeList.indexOf(vTime) !== -1;
          } else if (op === RULE_OPERATOR_NOT_IN) {
            return targetTimeList.indexOf(vTime) === -1;
          } else if (op === RULE_OPERATOR_FROM) {
            return vTime >= targetTime;
          } else if (op === RULE_OPERATOR_UNTIL) {
            return vTime <= targetTime;
          } else if (op === RULE_OPERATOR_AFTER) {
            return vTime > targetTime;
          } else if (op === RULE_OPERATOR_BEFORE) {
            return vTime < targetTime;
          } else {
            logger('Invalid rule operator encountered');
            return false;
          }
        } else {
          logger('Invalid attribute type encountered');
          return false;
        }
      }
    }, {
      key: "getGateValues",
      value: function getGateValues(obj, env, flag, sticky) {
        var population = this.population;

        if (this.population.entityType !== obj.type) {
          return {
            eligible: false
          };
        }

        var rules = population.rules;
        var matches = true;

        for (var i = 0; i < rules.length; i++) {
          var r = rules[i];
          matches = matches && this._ruleMatches(r, obj);
        }

        if (matches) {
          var samplingHashKey = "SAMPLING:control_".concat(flag.hashKey, ":env_").concat(env.hashKey, ":rule_set_").concat(this.population.hashKey, ":client_object_").concat(obj.type, "_").concat(obj.id);
          var hashedPercentage = getHashedValue(samplingHashKey);

          if (hashedPercentage <= this.population.percentage && this.population.percentage > 0) {
            var splits = sticky ? this.population.universes[Math.max(Math.floor(hashedPercentage * 100) - 1, 0)] : flag.splits;
            var splitsMap = {};

            for (var _i = 0; _i < splits.length; _i++) {
              var split = splits[_i];
              splitsMap[split.treatmentId] = split;
            }

            var allocationHashKey = "DISTRIBUTION:control_".concat(flag.hashKey, ":env_").concat(env.hashKey, ":client_object_").concat(obj.type, "_").concat(obj.id);
            var allocationHashedPercentage = getHashedValue(allocationHashKey);
            var trailingSum = 0.0;
            var treatments = flag.treatments.filter(function (t) {
              return !t.isOffTreatment;
            });
            var treatment = null;

            for (var _i2 = 0; _i2 < treatments.length; _i2++) {
              var t = treatments[_i2];

              if (splitsMap.hasOwnProperty(t.treatmentId)) {
                trailingSum = _parseFloat((trailingSum + splitsMap[t.treatmentId].percentage).toFixed(3));

                if (allocationHashedPercentage <= trailingSum) {
                  treatment = t;
                  break;
                }
              }
            }

            return {
              treatment: treatment,
              eligible: true
            };
          } else {
            return {
              eligible: true
            };
          }
        } else {
          return {
            eligible: false
          };
        }
      }
    }], [{
      key: "categorizeValueType",
      value: function categorizeValueType(v) {
        if (v === true || v === false) {
          return 'boolean';
        } else if (typeof v === 'number') {
          if ((v + '').indexOf('.') >= 0) {
            return 'float';
          } else {
            return 'int';
          }
        } else if (typeof v === 'string') {
          var unixTimestamp = new Date(v).getTime();

          if (!isNaN(unixTimestamp)) {
            var isoFormat = new Date(v).toISOString();
            var timeIndex = isoFormat.lastIndexOf('T00:00:00.000Z');

            if (timeIndex !== -1 && isoFormat.length - 'T00:00:00.000Z'.length === timeIndex) {
              return 'date';
            } else {
              return 'datetime';
            }
          }

          return 'string';
        }

        logger('Unexpected attribute value type encountered');
        return null;
      }
    }]);

    return Population;
  }();

  var Stat =
  /*#__PURE__*/
  function () {
    _createClass(Stat, null, [{
      key: "compactStats",
      value: function compactStats(stats) {
        var groups = stats.reduce(function (groups, stat) {
          var key = [stat.name, stat.type].join(',');
          groups[key] = groups[key] || [];
          groups[key].push(stat);
          return groups;
        }, {});
        return _Object$values(groups).map(function (stats) {
          var newStat = new Stat(stats[0].name, stats[0].type);
          var totalDuration, totalCount;

          switch (newStat.type) {
            case Stat.TYPE_DURATION:
              totalDuration = stats.reduce(function (duration, stat) {
                return duration + stat.averageDuration * stat.count;
              }, 0);
              totalCount = stats.reduce(function (count, stat) {
                return count + stat.count;
              }, 0);
              newStat.setAverageDuration(totalDuration / totalCount);
              newStat.setCount(totalCount);
              break;

            case Stat.TYPE_COUNT:
              newStat.setCount(stats.reduce(function (count, stat) {
                return count + stat.count;
              }, 0));
              break;
          }

          return newStat;
        });
      }
    }]);

    function Stat(name, type) {
      _classCallCheck(this, Stat);

      var allowedTypes = [Stat.TYPE_DURATION, Stat.TYPE_COUNT];

      if (allowedTypes.indexOf(type) === -1) {
        throw 'Invalid stat type passed';
      }

      this.name = name;
      this.type = type;
      this.count = 0;
      this.startTime = null;
      this.averageDuration = 0;
    }

    _createClass(Stat, [{
      key: "start",
      value: function start() {
        // if (this.averageDuration !== 0) {
        //   throw 'Duration already calculated'
        // }
        // if (this.startTime !== null) {
        //   throw 'Stat start() already called'
        // }
        // this.startTime = process.hrtime()
        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        // if (this.averageDuration !== 0) {
        //   throw 'Duration already calculated'
        // }
        // if (this.startTime === null) {
        //   throw 'Stat start() has not been called'
        // }
        // const stopTime = process.hrtime(this.startTime)
        // this.averageDuration = stopTime[0] * NS_PER_SEC + stopTime[1]
        // this.count = 1
        return this;
      }
    }, {
      key: "setCount",
      value: function setCount(n) {
        this.count = n;
        return this;
      }
    }, {
      key: "setAverageDuration",
      value: function setAverageDuration(t) {
        this.averageDuration = t;
        return this;
      }
    }, {
      key: "getDuration",
      value: function getDuration() {
        return this.averageDuration;
      }
    }, {
      key: "getStatsObj",
      value: function getStatsObj() {
        var statsObj = {
          name: this.name
        };

        if (this.type === Stat.TYPE_DURATION) {
          if (this.averageDuration !== 0) {
            statsObj.duration = this.averageDuration;
            statsObj.unit = 'ns';
            statsObj.count = this.count;
            return statsObj;
          }
        } else if (this.type === Stat.TYPE_COUNT) {
          statsObj.count = this.count;
          return statsObj;
        }

        return null;
      }
    }]);

    return Stat;
  }();
  Stat.TYPE_DURATION = 'stat_type__duration';
  Stat.TYPE_COUNT = 'stat_type__count';

  var Flag =
  /*#__PURE__*/
  function () {
    function Flag(flag, delegate) {
      _classCallCheck(this, Flag);

      if (typeof flag === 'string') {
        this._isWild = true;
        this.flagName = flag;
      } else {
        // These along with flag.flagType and flag.flagStatus
        // should always be present
        this.hashKey = flag.hashKey;
        this.flag = flag;
        this.codename = flag.codename; // Pass through fields

        this.isPaused = flag.isPaused;
        this.offTreatment = flag.offTreatment;
        this.treatments = flag.treatments;
        this.treatmentsMap = flag.treatmentsMap;
        this.overrides = flag.overrides;
        this.populations = flag.populations;
        this.splits = flag.splits;
      }

      this.delegate = delegate;
    }

    _createClass(Flag, [{
      key: "isUncategorized",
      value: function isUncategorized() {
        return Boolean(this._isWild) || this.flag.flagType === 'uncategorized';
      }
    }, {
      key: "isWild",
      value: function isWild() {
        return Boolean(this._isWild);
      }
    }, {
      key: "isArchived",
      value: function isArchived() {
        return this.flag.flagStatus === 'archived';
      }
    }, {
      key: "setDelegate",
      value: function setDelegate(delegate) {
        this.delegate = delegate;
      }
    }, {
      key: "getType",
      value: function getType() {
        if (this._isWild) {
          logger("Encountered uncategorized flag \"".concat(this.flagName, "\". Visit Airship web app to convert it to a real flag"));
          return 'uncategorized';
        }

        var flagType = this.flag.flagType;

        switch (flagType) {
          case 'basic':
            return 'basic';

          case 'experiment':
            return 'experiment';

          case 'uncategorized':
            return 'uncategorized';

          default:
            logger('Unexpected flag type encountered');
            return null;
        }
      }
    }, {
      key: "getTreatment",
      value: function getTreatment(obj) {
        if (!this.delegate) {
          throw 'Delegate not provided to flag';
        }

        return this.delegate.getTreatment(this, obj);
      }
    }, {
      key: "getPayload",
      value: function getPayload(obj) {
        if (!this.delegate) {
          throw 'Delegate not provided to flag';
        }

        return this.delegate.getPayload(this, obj);
      }
    }, {
      key: "isEligible",
      value: function isEligible(obj) {
        if (!this.delegate) {
          throw 'Delegate not provided to flag';
        }

        return this.delegate.isEligible(this, obj);
      }
    }, {
      key: "isEnabled",
      value: function isEnabled(obj) {
        if (!this.delegate) {
          throw 'Delegate not provided to flag';
        }

        return this.delegate.isEnabled(this, obj);
      }
    }]);

    return Flag;
  }();

  var Environment =
  /*#__PURE__*/
  function () {
    function Environment() {
      _classCallCheck(this, Environment);
    }

    _createClass(Environment, [{
      key: "identify",
      value: function identify(obj) {
        this.object = obj;
      }
    }, {
      key: "maybeIngest",
      value: function () {
        var _maybeIngest = _asyncToGenerator(
        /*#__PURE__*/
        _regeneratorRuntime.mark(function _callee() {
          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function maybeIngest() {
          return _maybeIngest.apply(this, arguments);
        }

        return maybeIngest;
      }()
    }, {
      key: "_identifyObject",
      value: function _identifyObject(obj) {
        var airshipObj = obj instanceof AirshipObject ? obj : new AirshipObject(obj);
        return airshipObj;
      }
    }, {
      key: "_saveStat",
      value: function _saveStat() {}
    }, {
      key: "_saveExposure",
      value: function _saveExposure() {}
    }, {
      key: "publish",
      value: function () {
        var _publish = _asyncToGenerator(
        /*#__PURE__*/
        _regeneratorRuntime.mark(function _callee2(objs) {
          return _regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        function publish(_x) {
          return _publish.apply(this, arguments);
        }

        return publish;
      }() // eslint-disable-line no-unused-vars

    }, {
      key: "shutdown",
      value: function shutdown() {}
    }, {
      key: "flag",
      value: function flag(flagName) {
        var flag = this.router ? this.router.getFlag(flagName) : new Flag(flagName);
        flag.setDelegate(this);
        return flag;
      }
    }, {
      key: "_getAllocation",
      value: function _getAllocation(flag, airshipObj) {
        var offTreatment = flag.offTreatment;

        if (flag.isArchived()) {
          logger("The flag \"".concat(flag.codename, "\" has been archived"));
          return {
            treatment: offTreatment,
            eligible: false
          };
        }

        if (flag.isPaused) {
          return {
            treatment: offTreatment,
            eligible: false
          };
        } // If the airshipObj is not a valid obj,
        // then return the offTreatment/false


        if (!airshipObj) {
          return {
            treatment: offTreatment,
            eligible: false
          };
        }

        var id = airshipObj.getId();
        var override = flag.overrides[id];

        if (override) {
          var _treatment = flag.treatmentsMap[override.treatmentId];
          return {
            treatment: _treatment,
            eligible: !_treatment.isOffTreatment,
            fromOverride: true
          };
        }

        var obj = airshipObj.getRawObject();
        var useUniverses = flag.getType() === 'experiment';
        var populations = flag.populations;
        var treatment = null;
        var eligible = false;

        for (var i = 0; i < populations.length; i++) {
          var p = new Population(populations[i]);
          var gateValues = p.getGateValues(obj, this.router.getEnv(), flag, useUniverses);
          eligible = eligible || gateValues.eligible;

          if (gateValues.treatment) {
            treatment = gateValues.treatment;
            break;
          }
        }

        return {
          treatment: treatment || offTreatment,
          eligible: eligible
        };
      }
    }, {
      key: "_resolveAllocations",
      value: function _resolveAllocations(alloc1, alloc2) {
        if (alloc1.fromOverride) {
          return alloc1;
        }

        if (alloc2.fromOverride) {
          return alloc2;
        }

        if (!alloc1.treatment.isOffTreatment) {
          return alloc1;
        }

        if (!alloc2.treatment.isOffTreatment) {
          return alloc2;
        }

        return alloc1;
      }
    }, {
      key: "_getExposure",
      value: function _getExposure(flag, airshipObj, alloc, methodCalled) {
        var obj = airshipObj.getRawObject();
        return {
          flag: flag.codename,
          type: obj.type,
          id: obj.id,
          treatment: alloc.treatment.codename,
          methodCalled: methodCalled,
          eligible: alloc.eligible,
          timeExposed: new Date().toISOString()
        };
      }
    }, {
      key: "getTreatment",
      value: function getTreatment(flag, obj) {
        var stat = new Stat('duration__get_treatment', Stat.TYPE_DURATION);
        stat.start();
        obj = obj || this.object;

        var airshipObj = this._identifyObject(obj);

        if (!airshipObj.isValid() || flag.isUncategorized()) {
          return 'off';
        }

        var allocation = this._getAllocation(flag, airshipObj);

        var groupAllocation = this._getAllocation(flag, airshipObj.getGroup());

        var finalAllocation = this._resolveAllocations(allocation, groupAllocation);

        var expo = this._getExposure(flag, airshipObj, finalAllocation, 'get_treatment');

        this._saveExposure(expo);

        stat.stop();

        this._saveStat(stat);

        return finalAllocation.treatment.isGhost ? flag.offTreatment && flag.offTreatment.codename || 'off' : finalAllocation.treatment.codename;
      }
    }, {
      key: "getPayload",
      value: function getPayload(flag, obj) {
        var stat = new Stat('duration__get_payload', Stat.TYPE_DURATION);
        stat.start();
        obj = obj || this.object;

        var airshipObj = this._identifyObject(obj);

        if (!airshipObj.isValid() || flag.isUncategorized()) {
          return null;
        }

        var allocation = this._getAllocation(flag, airshipObj);

        var groupAllocation = this._getAllocation(flag, airshipObj.getGroup());

        var finalAllocation = this._resolveAllocations(allocation, groupAllocation);

        var expo = this._getExposure(flag, airshipObj, finalAllocation, 'get_payload');

        this._saveExposure(expo);

        stat.stop();

        this._saveStat(stat);

        return finalAllocation.treatment.isGhost ? flag.offTreatment && flag.offTreatment.payload || null : finalAllocation.treatment.payload;
      }
    }, {
      key: "isEligible",
      value: function isEligible(flag, obj) {
        var stat = new Stat('duration__is_eligible', Stat.TYPE_DURATION);
        stat.start();
        obj = obj || this.object;

        var airshipObj = this._identifyObject(obj);

        if (!airshipObj.isValid() || flag.isUncategorized()) {
          return false;
        }

        var allocation = this._getAllocation(flag, airshipObj);

        var groupAllocation = this._getAllocation(flag, airshipObj.getGroup());

        var finalAllocation = this._resolveAllocations(allocation, groupAllocation);

        var expo = this._getExposure(flag, airshipObj, finalAllocation, 'is_eligible');

        this._saveExposure(expo);

        stat.stop();

        this._saveStat(stat);

        return finalAllocation.eligible;
      }
    }, {
      key: "isEnabled",
      value: function isEnabled(flag, obj) {
        var stat = new Stat('duration__is_enabled', Stat.TYPE_DURATION);
        stat.start();
        obj = obj || this.object;

        var airshipObj = this._identifyObject(obj);

        if (!airshipObj.isValid() || flag.isUncategorized()) {
          return false;
        }

        var allocation = this._getAllocation(flag, airshipObj);

        var groupAllocation = this._getAllocation(flag, airshipObj.getGroup());

        var finalAllocation = this._resolveAllocations(allocation, groupAllocation);

        var expo = this._getExposure(flag, airshipObj, finalAllocation, 'is_enabled');

        this._saveExposure(expo);

        stat.stop();

        this._saveStat(stat);

        return !finalAllocation.treatment.isOffTreatment;
      }
    }]);

    return Environment;
  }();

  // Based on https://chrisrng.svbtle.com/lru-cache-in-javascript
  var LRUNode = function LRUNode(key, value) {
    _classCallCheck(this, LRUNode);

    if (typeof key === 'undefined' || key === null) {
      throw 'Cannot have an undefined or null key for a LRUNode';
    }

    if (typeof value === 'undefined' || value === null) {
      throw 'Cannot have an undefined or null value for a LRUNode';
    }

    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  };

  var LRU =
  /*#__PURE__*/
  function () {
    function LRU(limit) {
      _classCallCheck(this, LRU);

      this.size = 0;

      if (typeof limit === 'number') {
        this.limit = limit;
      } else {
        this.limit = 10;
      }

      this.map = {};
      this.head = null;
      this.tail = null;
    }

    _createClass(LRU, [{
      key: "setHead",
      value: function setHead(node) {
        node.next = this.head;
        node.prev = null;

        if (this.head !== null) {
          this.head.prev = node;
        }

        this.head = node;

        if (this.tail === null) {
          this.tail = node;
        }

        this.size++;
        this.map[node.key] = node;
      }
    }, {
      key: "set",
      value: function set(key, value) {
        var node = new LRUNode(key, value);

        if (this.map[key]) {
          this.map[key].value = node.value;
          this.remove(node.key);
        } else {
          if (this.size >= this.limit) {
            delete this.map[this.tail.key];
            this.size--;
            this.tail = this.tail.prev;
            this.tail.next = null;
          }
        }

        this.setHead(node);
      }
    }, {
      key: "get",
      value: function get(key) {
        if (this.map[key]) {
          var value = this.map[key].value;
          var node = new LRUNode(key, value);
          this.remove(key);
          this.setHead(node);
          return value;
        } else {
          // console.log('Key ' + key + ' does not exist in the cache.')
          return null; // Return null because null cannot be a LRUNode value
        }
      }
    }, {
      key: "remove",
      value: function remove(key) {
        var node = this.map[key];

        if (node.prev !== null) {
          node.prev.next = node.next;
        } else {
          this.head = node.next;
        }

        if (node.next !== null) {
          node.next.prev = node.prev;
        } else {
          this.tail = node.prev;
        }

        delete this.map[key];
        this.size--;
      }
    }, {
      key: "removeAll",
      value: function removeAll(limit) {
        this.size = 0;
        this.map = {};
        this.head = null;
        this.tail = null;

        if (typeof limit === 'number') {
          this.limit = limit;
        }
      }
    }, {
      key: "forEach",
      value: function forEach(callback) {
        var node = this.head;
        var i = 0;

        while (node) {
          callback(node, i);
          i++;
          node = node.next;
        }
      }
    }]);

    return LRU;
  }();

  var Router =
  /*#__PURE__*/
  function () {
    function Router(gatingInfo) {
      _classCallCheck(this, Router);

      this.gatingInfo = gatingInfo;
      this.gatingInfoMap = this._getGatingInfoMap(this.gatingInfo);
    }

    _createClass(Router, [{
      key: "_getGatingInfoMap",
      value: function _getGatingInfoMap(gatingInfo) {
        var map = {};
        var flags = gatingInfo.flags;

        for (var i = 0; i < flags.length; i++) {
          var flag = _Object$assign({}, flags[i]);

          if (flag.flagType === 'uncategorized' || flag.flagStatus === 'archived') {
            map[flag.codename] = new Flag(flag);
            continue;
          }

          var overrides = flag.overrides;
          var overridesMap = {};

          for (var j = 0; j < overrides.length; j++) {
            var override = overrides[j];
            overridesMap["".concat(override.entityType, "_").concat(override.entityId)] = override;
          }

          flag.overrides = overridesMap;
          var treatments = flag.treatments;
          var treatmentsMap = {};
          var offTreatment = null;

          for (var k = 0; k < treatments.length; k++) {
            var treatment = treatments[k];
            treatmentsMap[treatment.treatmentId] = treatment;

            if (treatment.isOffTreatment) {
              offTreatment = treatment;
            }
          }

          flag.treatments = treatments;
          flag.treatmentsMap = treatmentsMap;
          flag.offTreatment = offTreatment;
          map[flag.codename] = new Flag(flag);
        }

        return map;
      }
    }, {
      key: "getIngestionMaxItem",
      value: function getIngestionMaxItem() {
        var sdkInfo = this.gatingInfo.sdkInfo;

        if (sdkInfo) {
          return sdkInfo.SDK_INGESTION_MAX_ITEMS;
        }

        return null;
      }
    }, {
      key: "getBrowserIngestionMaxItems",
      value: function getBrowserIngestionMaxItems() {
        var sdkInfo = this.gatingInfo.sdkInfo;

        if (sdkInfo) {
          return sdkInfo.SDK_BROWSER_INGESTION_MAX_ITEMS;
        }

        return null;
      }
    }, {
      key: "getIngestionInterval",
      value: function getIngestionInterval() {
        var sdkInfo = this.gatingInfo.sdkInfo;

        if (sdkInfo) {
          return sdkInfo.SDK_INGESTION_INTERVAL * 1000;
        }

        return null;
      }
    }, {
      key: "getBrowserIngestionInterval",
      value: function getBrowserIngestionInterval() {
        var sdkInfo = this.gatingInfo.sdkInfo;

        if (sdkInfo) {
          return sdkInfo.SDK_BROWSER_INGESTION_INTERVAL * 1000;
        }

        return null;
      }
    }, {
      key: "getShouldIngestObjects",
      value: function getShouldIngestObjects() {
        var sdkInfo = this.gatingInfo.sdkInfo;

        if (sdkInfo && typeof sdkInfo.SDK_SHOULD_INGEST_OBJECTS === 'boolean') {
          return sdkInfo.SDK_SHOULD_INGEST_OBJECTS;
        }

        return null;
      }
    }, {
      key: "getShouldIngestStats",
      value: function getShouldIngestStats() {
        var sdkInfo = this.gatingInfo.sdkInfo;

        if (sdkInfo && typeof sdkInfo.SDK_SHOULD_INGEST_STATS === 'boolean') {
          return sdkInfo.SDK_SHOULD_INGEST_STATS;
        }

        return null;
      }
    }, {
      key: "getShouldIngestExposures",
      value: function getShouldIngestExposures() {
        var sdkInfo = this.gatingInfo.sdkInfo;

        if (sdkInfo && typeof sdkInfo.SDK_SHOULD_INGEST_EXPOSURES === 'boolean') {
          return sdkInfo.SDK_SHOULD_INGEST_EXPOSURES;
        }

        return null;
      }
    }, {
      key: "getShouldIngestFlags",
      value: function getShouldIngestFlags() {
        var sdkInfo = this.gatingInfo.sdkInfo;

        if (sdkInfo && typeof sdkInfo.SDK_SHOULD_INGEST_FLAGS === 'boolean') {
          return sdkInfo.SDK_SHOULD_INGEST_FLAGS;
        }

        return null;
      }
    }, {
      key: "getFlag",
      value: function getFlag(flagName) {
        return this.gatingInfoMap[flagName] || new Flag(flagName);
      }
    }, {
      key: "getEnv",
      value: function getEnv() {
        return this.gatingInfo.env;
      }
    }, {
      key: "isLocallyConfigured",
      value: function isLocallyConfigured() {
        return this.getEnv().envKey === null;
      }
    }]);

    return Router;
  }();

  var version = "2.0.4";

  var DEFAULT_API_DOMAIN = 'airshiphq.com'; // Primary API endpoints

  var IDENTIFY_ENDPOINT = "/v2/identify";
  var GATING_INFO_ENDPOINT = "/v2/gating-info"; // SSE API endpoints

  var SSE_GATING_INFO_ENDPOINT = "/v2/sse-events"; // Backup API URL & endpoint

  var BACKUP_URL = 'https://backup-api.airshiphq.com';
  var BACKUP_GATING_INFO_ENDPOINT = "".concat(BACKUP_URL, "/v2/gating-info");
  var REQUEST_TIMEOUT = 10 * 1000; // Default ingestion parameters

  var DEFAULT_INGESTION_INTERVAL = 30;
  var DEFAULT_BROWSER_INGESTION_INTERVAL = 15;
  var DEFAULT_INGESTION_MAX_ITEMS = 500;
  var DEFAULT_BROWSER_INGESTION_MAX_ITEMS = 5;

  var Airship =
  /*#__PURE__*/
  function (_Environment) {
    _inherits(Airship, _Environment);

    function Airship(gatingInfoListener) {
      var _this;

      _classCallCheck(this, Airship);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Airship).call(this));
      _this.gatingInfoListener = gatingInfoListener;

      _this.init();

      return _this;
    }

    _createClass(Airship, [{
      key: "init",
      value: function init() {
        this.ingestionMaxItems = DEFAULT_INGESTION_MAX_ITEMS;
        this.ingestionInterval = DEFAULT_INGESTION_INTERVAL * 1000; // eslint-disable-next-line no-undef

        {
          this.ingestionMaxItems = DEFAULT_BROWSER_INGESTION_MAX_ITEMS;
          this.ingestionInterval = DEFAULT_BROWSER_INGESTION_INTERVAL * 1000;
        }

        this.objects = [];
        this.stats = [];
        this.exposures = [];
        this.flags = new _Set();
        this.oldFlags = new _Set();
        this.objectLRUCache = new LRU(500);
        this.firstIngestion = true;
        this.shouldIngestObjects = true;
        this.shouldIngestStats = true;
        this.shouldIngestExposures = true;
        this.shouldIngestFlags = true; // this.restartIngestionWorker()
      }
    }, {
      key: "restartIngestionWorker",
      value: function restartIngestionWorker() {
        var _this2 = this;

        if (this.ingestionWorker) {
          clearInterval(this.ingestionWorker);
        }

        this.ingestionWorker = setInterval(function () {
          _this2.maybeIngest(true);
        }, this.ingestionInterval);
      }
    }, {
      key: "maybeIngest",
      value: function () {
        var _maybeIngest = _asyncToGenerator(
        /*#__PURE__*/
        _regeneratorRuntime.mark(function _callee() {
          var _this3 = this;

          var force,
              shouldIngest,
              objects,
              stats,
              exposures,
              flags,
              _args = arguments;
          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  force = _args.length > 0 && _args[0] !== undefined ? _args[0] : false;

                  if (!this.shouldIngestObjects) {
                    this.objects = [];
                  }

                  if (!this.shouldIngestStats) {
                    this.stats = [];
                  }

                  if (!this.shouldIngestExposures) {
                    this.exposures = [];
                  }

                  if (!this.shouldIngestFlags) {
                    this.flags = new _Set();
                  }

                  shouldIngest = force || this.objects.length >= this.ingestionMaxItems || this.stats.length >= this.ingestionMaxItems || this.exposures.length >= this.ingestionMaxItems || this.flags.size > 0;

                  if (this.firstIngestion) {
                    shouldIngest = shouldIngest || this.objects.length > 0;
                    this.firstIngestion = !shouldIngest;
                  }

                  if (this.objects.length === 0 && this.stats.length === 0 && this.exposures.length === 0 && this.flags.size === 0) {
                    shouldIngest = false;
                  }

                  if (!shouldIngest) {
                    _context.next = 20;
                    break;
                  }

                  objects = this.objects;
                  stats = this.stats;
                  exposures = this.exposures;
                  flags = _Array$from(this.flags);
                  flags.forEach(function (flagName) {
                    _this3.oldFlags.add(flagName);
                  });
                  this.objects = [];
                  this.stats = [];
                  this.exposures = [];
                  this.flags = new _Set();
                  _context.next = 20;
                  return this.postContent(this.primaryServerUrl + IDENTIFY_ENDPOINT + '/' + this.envKey, _JSON$stringify({
                    objects: objects,
                    stats: stats.map(function (s) {
                      return s.getStatsObj();
                    }).filter(function (so) {
                      return so !== null;
                    }),
                    exposures: exposures,
                    flags: flags,
                    sdkInfo: {
                      name: 'js',
                      version: version
                    }
                  })).catch(function (err) {
                    logger(err);
                  });

                case 20:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function maybeIngest() {
          return _maybeIngest.apply(this, arguments);
        }

        return maybeIngest;
      }()
    }, {
      key: "_identifyObject",
      value: function _identifyObject(obj) {
        var airshipObj = Environment.prototype._identifyObject.call(this, obj);

        if (!airshipObj.isValid()) {
          return airshipObj;
        }

        var id = airshipObj.getId();
        var hash = airshipObj.getHash();
        var storedHash = this.objectLRUCache.get(id);

        if (storedHash === null || hash !== storedHash) {
          this.objects.push(airshipObj.getRawObject());
        }

        this.objectLRUCache.set(id, hash);
        this.maybeIngest();
        return airshipObj;
      }
    }, {
      key: "_compactStats",
      value: function _compactStats() {
        this.stats = Stat.compactStats(this.stats);
      }
    }, {
      key: "_saveStat",
      value: function _saveStat(stat) {
        this.stats.push(stat);

        if (this.stats.length >= this.ingestionMaxItems) {
          this._compactStats();
        }

        this.maybeIngest();
      }
    }, {
      key: "_saveExposure",
      value: function _saveExposure(expo) {
        this.exposures.push(expo);
        this.maybeIngest();
      }
    }, {
      key: "publish",
      value: function () {
        var _publish = _asyncToGenerator(
        /*#__PURE__*/
        _regeneratorRuntime.mark(function _callee2(objs) {
          var _this4 = this;

          return _regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (_Array$isArray(objs)) {
                    _context2.next = 3;
                    break;
                  }

                  logger('The "publish" method takes an array of objects (aka entities).');
                  return _context2.abrupt("return");

                case 3:
                  objs.forEach(function (obj) {
                    _this4._identifyObject(obj);
                  });
                  _context2.next = 6;
                  return this.maybeIngest(true);

                case 6:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function publish(_x) {
          return _publish.apply(this, arguments);
        }

        return publish;
      }()
    }, {
      key: "getContent",
      value: function () {
        var _getContent = _asyncToGenerator(
        /*#__PURE__*/
        _regeneratorRuntime.mark(function _callee3(url) {
          var urlObj,
              lib,
              response,
              data;
          return _regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  // return new Promise((resolve, reject) => {
                  urlObj = URL.parse(url);
                  lib = urlObj.protocol === 'https:' ? https : http;
                  console.log("url: ", url);
                  _context3.next = 6;
                  return fetch(url);

                case 6:
                  response = _context3.sent;
                  console.log("response: ", response);
                  _context3.next = 10;
                  return response.json();

                case 10:
                  data = _context3.sent;
                  console.log("data: ", data);
                  return _context3.abrupt("return", data);

                case 13:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        function getContent(_x2) {
          return _getContent.apply(this, arguments);
        }

        return getContent;
      }()
    }, {
      key: "postContent",
      value: function postContent(url, data) {
        var contentType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'application/json';
        var timeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : REQUEST_TIMEOUT;
        return new _Promise(function (resolve, reject) {
          var urlObj = URL.parse(url);
          var lib = urlObj.protocol === 'https:' ? https : http;
          var options = {
            protocol: urlObj.protocol,
            hostname: urlObj.hostname,
            port: urlObj.port,
            path: urlObj.path,
            method: 'POST',
            headers: {
              'Content-Type': contentType,
              'Content-Length': Buffer.byteLength(data)
            }
          };
          var request = lib.request(options, function (response) {
            if (response.statusCode < 200 || response.statusCode > 299) {
              reject('Failed to post to url, status code: ' + response.statusCode);
            }

            var body = [];
            response.on('data', function (chunk) {
              return body.push(chunk);
            });
            response.on('end', function () {
              return resolve(body.join(''));
            });
          });
          request.on('error', function (err) {
            reject(err);
          });
          request.setTimeout(timeout, function () {
            request.abort();
            reject('Request timed out');
          });
          request.write(data);
          request.end();
        });
      }
    }, {
      key: "_getGatingInfo",
      value: function () {
        var _getGatingInfo2 = _asyncToGenerator(
        /*#__PURE__*/
        _regeneratorRuntime.mark(function _callee4() {
          var body;
          return _regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return this.getContent("".concat(this.primaryServerUrl).concat(GATING_INFO_ENDPOINT, "/").concat(this.envKey, "?casing=camel"));

                case 2:
                  body = _context4.sent;
                  return _context4.abrupt("return", body);

                case 4:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function _getGatingInfo() {
          return _getGatingInfo2.apply(this, arguments);
        }

        return _getGatingInfo;
      }()
    }, {
      key: "_getBackupGatingInfo",
      value: function () {
        var _getBackupGatingInfo2 = _asyncToGenerator(
        /*#__PURE__*/
        _regeneratorRuntime.mark(function _callee5() {
          var body;
          return _regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return this.getContent("".concat(BACKUP_GATING_INFO_ENDPOINT, "/").concat(this.envKey, "-camel"));

                case 2:
                  body = _context5.sent;
                  return _context5.abrupt("return", body);

                case 4:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }));

        function _getBackupGatingInfo() {
          return _getBackupGatingInfo2.apply(this, arguments);
        }

        return _getBackupGatingInfo;
      }()
    }, {
      key: "updateSDK",
      value: function updateSDK() {
        var ingestionMaxItems = this.router.getIngestionMaxItem();
        var browserIngestionMaxItems = this.router.getBrowserIngestionMaxItems();
        var ingestionInterval = this.router.getIngestionInterval();
        var browserIngestionInterval = this.router.getBrowserIngestionInterval();
        var shouldIngestObjects = this.router.getShouldIngestObjects();
        var shouldIngestStats = this.router.getShouldIngestStats();
        var shouldIngestExposures = this.router.getShouldIngestExposures();
        var shouldIngestFlags = this.router.getShouldIngestFlags(); // eslint-disable-next-line no-undef

        {
          // Use SDK info's browserIngestionMaxItems threshold instead (if it exists)
          if (typeof browserIngestionMaxItems === 'number' && browserIngestionMaxItems > 0) {
            this.ingestionMaxItems = browserIngestionMaxItems;
            this.restartIngestionWorker();
          } // Use SDK info's ingestionInterval instead (if it exists)


          if (typeof browserIngestionInterval === 'number' && browserIngestionInterval > 0 && browserIngestionInterval != this.ingestionInterval) {
            this.ingestionInterval = browserIngestionInterval;
            this.restartIngestionWorker();
          }
        } // Check if SDK info directs SDK to ingest entities


        if (typeof shouldIngestObjects === 'boolean') {
          this.shouldIngestObjects = shouldIngestObjects;
        } // Check if SDK info directs SDK to ingest stats


        if (typeof shouldIngestStats === 'boolean') {
          this.shouldIngestStats = shouldIngestStats;
        } // Check if SDK info directs SDK to ingest exposures


        if (typeof shouldIngestExposures === 'boolean') {
          this.shouldIngestExposures = shouldIngestExposures;
        } // Check if SDK info directs SDK to ingest flags


        if (typeof shouldIngestFlags === 'boolean') {
          this.shouldIngestFlags = shouldIngestFlags;
        }
      }
    }, {
      key: "updateGatingInfo",
      value: function () {
        var _updateGatingInfo = _asyncToGenerator(
        /*#__PURE__*/
        _regeneratorRuntime.mark(function _callee6(statName, fetchFn) {
          var stat, result, gatingInfo;
          return _regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.prev = 0;
                  stat = new Stat(statName, Stat.TYPE_DURATION);
                  stat.start();
                  _context6.next = 5;
                  return fetchFn();

                case 5:
                  result = _context6.sent;
                  gatingInfo = result;
                  this.router = new Router(gatingInfo);
                  this.updateSDK();

                  if (this.gatingInfoListener) {
                    this.gatingInfoListener(gatingInfo);
                  }

                  stat.stop();

                  this._saveStat(stat);

                  _context6.next = 19;
                  break;

                case 14:
                  _context6.prev = 14;
                  _context6.t0 = _context6["catch"](0);
                  console.log(_context6.t0);
                  logger(_context6.t0);
                  return _context6.abrupt("return", false);

                case 19:
                  return _context6.abrupt("return", true);

                case 20:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6, this, [[0, 14]]);
        }));

        function updateGatingInfo(_x3, _x4) {
          return _updateGatingInfo.apply(this, arguments);
        }

        return updateGatingInfo;
      }()
    }, {
      key: "configure",
      value: function () {
        var _configure = _asyncToGenerator(
        /*#__PURE__*/
        _regeneratorRuntime.mark(function _callee7(envKey) {
          var subscribeToUpdates,
              apiDomain,
              envKeyRegex,
              _args7 = arguments;
          return _regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  subscribeToUpdates = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : true;
                  apiDomain = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : DEFAULT_API_DOMAIN;
                  envKeyRegex = /^[a-z0-9]{16}$/;

                  if (envKey.match(envKeyRegex)) {
                    _context7.next = 5;
                    break;
                  }

                  throw 'options["envKey"] should be a string of lowercase characters and digits. Double check on the Airship web app.';

                case 5:
                  this.envKey = envKey;
                  this.subscribeToUpdates = subscribeToUpdates;
                  this.primaryServerUrl = "https://api.".concat(apiDomain);
                  this.sseServerUrl = "https://sse.".concat(apiDomain);
                  this.init();
                  this.failed = false;
                  console.log('primaryServerUrl: ', this.primaryServerUrl); // First try the Airship server

                  _context7.next = 14;
                  return this.updateGatingInfo('duration__gating_info', this._getGatingInfo.bind(this));

                case 14:
                  if (_context7.sent) {
                    _context7.next = 18;
                    break;
                  }

                  _context7.next = 17;
                  return this.updateGatingInfo('duration__cloudfront_gating_info', this._getBackupGatingInfo.bind(this));

                case 17:
                  this.failed = !_context7.sent;

                case 18:
                  if (!this.failed) {
                    _context7.next = 20;
                    break;
                  }

                  throw 'Failed to retrieve initial gating information';

                case 20:
                  if (subscribeToUpdates) {
                    this._subscribeToUpdates();

                    this._policeSSE();
                  }

                case 21:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7, this);
        }));

        function configure(_x5) {
          return _configure.apply(this, arguments);
        }

        return configure;
      }()
    }, {
      key: "shutdown",
      value: function () {
        var _shutdown = _asyncToGenerator(
        /*#__PURE__*/
        _regeneratorRuntime.mark(function _callee8() {
          return _regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  if (this.ingestionWorker) {
                    clearInterval(this.ingestionWorker);
                  }

                  this._unpoliceSSE();

                  this._unsubscribeFromUpdates();

                  _context8.next = 5;
                  return this.maybeIngest(true);

                case 5:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee8, this);
        }));

        function shutdown() {
          return _shutdown.apply(this, arguments);
        }

        return shutdown;
      }()
    }, {
      key: "flag",
      value: function flag(flagName) {
        var flag = Environment.prototype.flag.call(this, flagName);

        if (flag.isWild()) {
          // Register the new uncategorized flag
          if (!this.oldFlags.has(flagName)) {
            this.flags.add(flagName);
            this.maybeIngest();
          }
        }

        return flag;
      }
    }, {
      key: "_policeSSE",
      value: function _policeSSE() {
        var _this5 = this;

        this._unpoliceSSE();

        this.policeSSEInterval = setInterval(function () {
          var now = _Date$now();

          var then = _this5.lastSSEConnectTimestamp || 0;

          if ((now - then) / 1000 > 30) {
            logger('Did not receive a keepalive for more than 30 seconds. Reconnecting.');

            _this5._subscribeToUpdates();
          }
        }, 5 * 1000);
        this.pollGatingInfoInterval = setInterval(function () {
          var now = _Date$now();

          var then = _this5.lastSSEConnectTimestamp || 0;

          if ((now - then) / 1000 > 60) {
            logger('Did not receive a keepalive for more than 30 seconds. Polling gating info.');

            _this5.updateGatingInfo('duration__cloudfront_gating_info', _this5._getBackupGatingInfo.bind(_this5)).then(function () {
              return logger('Polled gating info from CloudFront');
            }, function () {
              return logger('Failed polling gating info from CloudFront');
            });
          }
        }, 60 * 1000);
      }
    }, {
      key: "_unpoliceSSE",
      value: function _unpoliceSSE() {
        if (this.policeSSEInterval) {
          clearInterval(this.policeSSEInterval);
          delete this.policeSSEInterval;

          if (this.lastSSEConnectTimestamp) {
            delete this.lastSSEConnectTimestamp;
          }
        }

        if (this.pollGatingInfoInterval) {
          clearInterval(this.pollGatingInfoInterval);
          delete this.pollGatingInfoInterval;
        }
      }
    }, {
      key: "_subscribeToUpdates",
      value: function _subscribeToUpdates() {
        var _this6 = this;

        this._unsubscribeFromUpdates();

        this.eventSource = new EventSource("".concat(this.sseServerUrl).concat(SSE_GATING_INFO_ENDPOINT, "?envkey=").concat(this.envKey, "&casing=camel"));
        this.eventSource.addEventListener('gatingInfoUpdate', function (evt) {
          var gatingInfo = JSON.parse(evt.data);
          _this6.router = new Router(gatingInfo);

          _this6.updateSDK();

          if (_this6.gatingInfoListener) {
            _this6.gatingInfoListener(gatingInfo);
          }

          _this6.lastSSEConnectTimestamp = _Date$now();
        });
        this.eventSource.addEventListener('keepalive', function () {
          _this6.lastSSEConnectTimestamp = _Date$now();
        });
      }
    }, {
      key: "_unsubscribeFromUpdates",
      value: function _unsubscribeFromUpdates() {
        if (this.eventSource) {
          this.eventSource.close();
          delete this.eventSource;
        }
      }
    }]);

    return Airship;
  }(Environment);

  var validate$1 = function validate() {
    return true;
  };

  var isValidFlagConfig = function isValidFlagConfig(flagConfig) {
    var isValid = validate$1(flagConfig);

    return isValid;
  };

  var _RULE_TYPE_TO_ALLOWED;
  var RULE_TYPE_TO_ALLOWED_OPERATORS = (_RULE_TYPE_TO_ALLOWED = {}, _defineProperty(_RULE_TYPE_TO_ALLOWED, RULE_TYPE_STRING, new _Set([RULE_OPERATOR_IS, RULE_OPERATOR_IS_NOT, RULE_OPERATOR_IN, RULE_OPERATOR_NOT_IN])), _defineProperty(_RULE_TYPE_TO_ALLOWED, RULE_TYPE_INT, new _Set([RULE_OPERATOR_IS, RULE_OPERATOR_IS_NOT, RULE_OPERATOR_IN, RULE_OPERATOR_NOT_IN, RULE_OPERATOR_LT, RULE_OPERATOR_LTE, RULE_OPERATOR_GT, RULE_OPERATOR_GTE])), _defineProperty(_RULE_TYPE_TO_ALLOWED, RULE_TYPE_FLOAT, new _Set([RULE_OPERATOR_IS, RULE_OPERATOR_IS_NOT, RULE_OPERATOR_IN, RULE_OPERATOR_NOT_IN, RULE_OPERATOR_LT, RULE_OPERATOR_LTE, RULE_OPERATOR_GT, RULE_OPERATOR_GTE])), _defineProperty(_RULE_TYPE_TO_ALLOWED, RULE_TYPE_BOOLEAN, new _Set([RULE_OPERATOR_IS, RULE_OPERATOR_IS_NOT])), _defineProperty(_RULE_TYPE_TO_ALLOWED, RULE_TYPE_DATE, new _Set([RULE_OPERATOR_IS, RULE_OPERATOR_IS_NOT, RULE_OPERATOR_IN, RULE_OPERATOR_NOT_IN, RULE_OPERATOR_FROM, RULE_OPERATOR_UNTIL, RULE_OPERATOR_AFTER, RULE_OPERATOR_BEFORE])), _defineProperty(_RULE_TYPE_TO_ALLOWED, RULE_TYPE_DATETIME, new _Set([RULE_OPERATOR_IS, RULE_OPERATOR_IS_NOT, RULE_OPERATOR_IN, RULE_OPERATOR_NOT_IN, RULE_OPERATOR_FROM, RULE_OPERATOR_UNTIL, RULE_OPERATOR_AFTER, RULE_OPERATOR_BEFORE])), _RULE_TYPE_TO_ALLOWED);
  var transformFlagConfig = function transformFlagConfig(flagConfig) {
    if (!isValidFlagConfig(flagConfig)) {
      return null;
    }

    var flags = [];

    var keys = _Object$keys(flagConfig);

    var _loop = function _loop(i) {
      var key = keys[i];
      var config = flagConfig[key];
      var active = config.active !== undefined ? config.active : true;
      var flagInfo = {
        flagType: 'basic',
        hashKey: key,
        isPaused: !active,
        isWebAccessible: true,
        // eslint-disable-line no-undef
        codename: key,
        flagStatus: 'operational'
      };
      var whitelist = config.whitelist || [];
      var blacklist = config.blacklist || [];
      var blacklistSet = new _Set(blacklist);
      var filteredWhitelist = whitelist.filter(function (i) {
        return !blacklistSet.has(i);
      });
      flagInfo.treatments = [{
        treatmentId: 'off-treatment',
        codename: 'off',
        isControl: false,
        isOffTreatment: true
      }, {
        treatmentId: 'on-treatment',
        codename: 'on',
        isControl: false,
        isOffTreatment: false
      }];
      flagInfo.overrides = [];
      flagInfo.overrides = flagInfo.overrides.concat(filteredWhitelist.map(function (i) {
        return {
          treatmentId: 'on-treatment',
          entityType: 'User',
          entityId: i.toString()
        };
      }));
      flagInfo.overrides = flagInfo.overrides.concat(blacklist.map(function (i) {
        return {
          treatmentId: 'off-treatment',
          entityType: 'User',
          entityId: i.toString()
        };
      }));
      flagInfo.splits = [{
        treatmentId: 'on-treatment',
        percentage: 1
      }];

      if (config.population) {
        var rules = config.population || [];
        var ruleInfos = [];

        for (var j = 0; j < rules.length; j++) {
          var r = rules[j];
          var type = void 0;

          if (_Array$isArray(r.value)) {
            var types = new _Set(r.value.map(function (v) {
              return Population.categorizeValueType(v);
            }));

            if (types.size != 1) {
              logger("Population's filter criteria each should have a singular value type. In other words, do not mix strings with numbers in the same array, for example.");
              return {
                v: null
              };
            }

            type = _Array$from(types)[0];
          } else {
            type = Population.categorizeValueType(r.value);
          }

          var rInfo = {
            attributeName: r.attribute,
            attributeType: type,
            operator: r.operator,
            value: !_Array$isArray(r.value) ? r.value : null,
            valueList: !_Array$isArray(r.value) ? null : r.value
          };

          if (!RULE_TYPE_TO_ALLOWED_OPERATORS[type].has(r.operator)) {
            logger("Population's filter operator `".concat(r.operator, "` is not allowed for filter type `").concat(type, "`"));
            return {
              v: null
            };
          }

          if (rInfo.valueList) {
            if (rInfo.operator !== RULE_OPERATOR_IN && rInfo.operator !== RULE_OPERATOR_NOT_IN) {
              logger("Population's filter operator must be `in` or `not_in` if the value is an array.");
              return {
                v: null
              };
            }
          } else {
            if (rInfo.operator === RULE_OPERATOR_IN && rInfo.operator === RULE_OPERATOR_NOT_IN) {
              logger("Population's filter operator must not be `in` or `not_in` if the value is a number, boolean or string.");
              return {
                v: null
              };
            }
          }

          ruleInfos.push(rInfo);
        }

        flagInfo.populations = [{
          hashKey: 'population-1',
          entityType: 'User',
          percentage: config.sample || 0.0,
          rules: ruleInfos,
          universes: []
        }];
      } else {
        flagInfo.populations = [{
          hashKey: 'population-1',
          entityType: 'User',
          percentage: config.sample || 0.0,
          rules: [],
          universes: []
        }];
      }

      flags.push(flagInfo);
    };

    for (var i = 0; i < keys.length; i++) {
      var _ret = _loop(i);

      if (_typeof(_ret) === "object") return _ret.v;
    }

    return {
      flags: flags,
      env: {
        hashKey: 'env-1',
        envKey: null
      }
    };
  };

  var Core =
  /*#__PURE__*/
  function (_Environment) {
    _inherits(Core, _Environment);

    function Core() {
      _classCallCheck(this, Core);

      return _possibleConstructorReturn(this, _getPrototypeOf(Core).apply(this, arguments));
    }

    _createClass(Core, [{
      key: "configure",
      value: function () {
        var _configure = _asyncToGenerator(
        /*#__PURE__*/
        _regeneratorRuntime.mark(function _callee(flagConfig) {
          var gatingInfo;
          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  gatingInfo = transformFlagConfig(flagConfig);

                  if (!(gatingInfo === null)) {
                    _context.next = 3;
                    break;
                  }

                  throw 'Failed to transform flagConfig into initial gating information';

                case 3:
                  this.router = new Router(gatingInfo);

                case 4:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function configure(_x) {
          return _configure.apply(this, arguments);
        }

        return configure;
      }()
    }]);

    return Core;
  }(Environment);

  var defaultEnv = new Core();
  defaultEnv.configure({});
  var FlaggerBase =
  /*#__PURE__*/
  function () {
    function FlaggerBase() {
      _classCallCheck(this, FlaggerBase);

      this.gatingInfoListeners = [];
    }

    _createClass(FlaggerBase, [{
      key: "publish",
      value: function () {
        var _publish = _asyncToGenerator(
        /*#__PURE__*/
        _regeneratorRuntime.mark(function _callee(objs) {
          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!this.environment) {
                    _context.next = 5;
                    break;
                  }

                  _context.next = 3;
                  return this.environment.publish(objs);

                case 3:
                  _context.next = 6;
                  break;

                case 5:
                  throw 'Airship must be configured first before `publish` can be called';

                case 6:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function publish(_x) {
          return _publish.apply(this, arguments);
        }

        return publish;
      }() // This will allow for async/await

    }, {
      key: "configure",
      value: function () {
        var _configure = _asyncToGenerator(
        /*#__PURE__*/
        _regeneratorRuntime.mark(function _callee2(options) {
          var envKey, flagConfig, subscribeToUpdates, promise;
          return _regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (FlaggerBase._isDict(options)) {
                    _context2.next = 2;
                    break;
                  }

                  throw '<options> must be dictionary';

                case 2:
                  envKey = options.envKey;
                  flagConfig = options.flagConfig;

                  if (!(!envKey && !flagConfig)) {
                    _context2.next = 6;
                    break;
                  }

                  throw '<options> must contain envKey corresponding to an environment key or a flagConfig dictionary to configure locally';

                case 6:
                  subscribeToUpdates = options.subscribeToUpdates === false ? false : true;

                  if (!envKey) {
                    _context2.next = 23;
                    break;
                  }

                  if (!(this.environment && this.environment.envKey === envKey && this.environment.subscribeToUpdates === subscribeToUpdates && this.environment.environmentPromise && !this.environment.failed)) {
                    _context2.next = 13;
                    break;
                  }

                  _context2.next = 11;
                  return this.environment.environmentPromise;

                case 11:
                  _context2.next = 21;
                  break;

                case 13:
                  if (!this.environment) {
                    _context2.next = 16;
                    break;
                  }

                  _context2.next = 16;
                  return this.environment.shutdown();

                case 16:
                  this.environment = new Airship(this.handleGatingInfoUpdate.bind(this));
                  promise = this.environment.configure(envKey, options.subscribeToUpdates, options.apiDomain);
                  this.environment.environmentPromise = promise;
                  _context2.next = 21;
                  return promise;

                case 21:
                  _context2.next = 29;
                  break;

                case 23:
                  if (!this.environment) {
                    _context2.next = 26;
                    break;
                  }

                  _context2.next = 26;
                  return this.environment.shutdown();

                case 26:
                  this.environment = new Core();
                  _context2.next = 29;
                  return this.environment.configure(flagConfig);

                case 29:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function configure(_x2) {
          return _configure.apply(this, arguments);
        }

        return configure;
      }()
    }, {
      key: "shutdown",
      value: function () {
        var _shutdown = _asyncToGenerator(
        /*#__PURE__*/
        _regeneratorRuntime.mark(function _callee3() {
          return _regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (!this.environment) {
                    _context3.next = 6;
                    break;
                  }

                  _context3.next = 3;
                  return this.environment.shutdown();

                case 3:
                  delete this.environment;
                  _context3.next = 7;
                  break;

                case 6:
                  throw 'Airship must be configured first before `shutdown` can be called';

                case 7:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function shutdown() {
          return _shutdown.apply(this, arguments);
        }

        return shutdown;
      }()
    }, {
      key: "flag",
      value: function flag(flagName) {
        return (this.environment || defaultEnv).flag(flagName);
      }
    }, {
      key: "setErrorListener",
      value: function setErrorListener(fn) {
        setLogger(fn);
      }
    }, {
      key: "handleGatingInfoUpdate",
      value: function handleGatingInfoUpdate(gatingInfo) {
        this.gatingInfoListeners.forEach(function (listener) {
          return listener(gatingInfo);
        });
      }
    }, {
      key: "addGatingInfoListener",
      value: function addGatingInfoListener(listener) {
        this.gatingInfoListeners.push(listener);
      }
    }, {
      key: "removeGatingInfoListener",
      value: function removeGatingInfoListener(listener) {
        this.gatingInfoListeners = this.gatingInfoListeners.filter(function (l) {
          return l !== listener;
        });
      }
    }, {
      key: "identify",
      value: function identify(obj) {
        if (this.environment) {
          this.environment.identify(obj);

          this.environment._identifyObject(obj);

          this.environment.maybeIngest(true);
        } else {
          throw 'Airship must be configured first before `identify` can be called';
        }
      }
    }], [{
      key: "_isDict",
      value: function _isDict(obj) {
        return obj !== undefined && obj !== null && obj.constructor === Object;
      }
    }]);

    return FlaggerBase;
  }();
  var Flagger = new FlaggerBase();

  _Object$assign(Flagger, {
    FlaggerBase: FlaggerBase
  });

  return Flagger;

})));
//# sourceMappingURL=flagger.js.map
