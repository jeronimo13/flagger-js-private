'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Ajv = _interopDefault(require('ajv'));
var ajvErrors = _interopDefault(require('ajv-errors'));
var md5 = _interopDefault(require('md5'));
var stringify = _interopDefault(require('fast-json-stable-stringify'));
var EventSource = _interopDefault(require('eventsource'));
var http = require('http');
var https = require('https');
var URL = require('url');

let logger = x => {
  // eslint-disable-next-line no-console
  console.error(x);
};
function setLogger(fn) {
  logger = fn;
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

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

const SCHEMA = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      pattern: '^([A-Z][a-zA-Z]*)+$',
      maxLength: 50,
      minLength: 1,
      errorMessage: {
        type: 'Entity type must be a string that starts with a capital letter like [C]ar or [U]ser',
        maxLength: 'Entity type must be a non-empty string of 50 characters or less',
        minLength: 'Entity type must be a non-empty string of 50 characters or less'
      }
    },
    isGroup: {
      type: 'boolean',
      errorMessage: {
        type: '`isGroup` must be a boolean'
      }
    },
    id: {
      type: ['string', 'integer'],
      pattern: '^[ -~]+$',
      maxLength: 250,
      minLength: 1,
      errorMessage: {
        type: "An entity's `id` must be a string or integer. An integer `id` will be cast into a string.",
        maxLength: "An entity's `id` must be a non-empty string of 250 characters or less.",
        minLength: "An entity's `id` must be a non-empty string of 250 characters or less."
      }
    },
    displayName: {
      type: 'string',
      maxLength: 250,
      minLength: 1,
      errorMessage: {
        type: "An entity's `displayName` must be a string",
        maxLength: "An entity's `displayName` must be a non-empty string of 250 characters or less.",
        minLength: "An entity's `displayName` must be a non-empty string of 250 characters or less."
      }
    },
    attributes: {
      type: 'object',
      patternProperties: {
        '^[a-zA-Z]$|^[a-zA-Z_]{0,48}[a-zA-Z]$': {
          oneOf: [{
            type: 'string',
            maxLength: 3000,
            errorMessage: {
              type: "An entity's attribute value must be a string, boolean, or number.",
              maxLength: "An entity's string attribute must be 3000 characters or less."
            }
          }, {
            type: 'boolean',
            errorMessage: {
              type: "An entity's attribute value must be a string, boolean, or number."
            }
          }, {
            type: 'number',
            errorMessage: {
              type: "An entity's attribute value must be a string, boolean, or number."
            }
          }],
          errorMessage: {
            oneOf: "An entity's attribute value must be a string, boolean, or number."
          }
        }
      },
      maxProperties: 100,
      additionalProperties: false,
      errorMessage: {
        maxProperties: 'There can only be up to 100 attributes for an entity.',
        additionalProperties: 'Each attribute must begin and end with an alphabet letter (a-z, A-Z). In between, allowed characters are a-z, A-Z, and "_". For example: isStudent or is_student. Preceding or trailing underscore is not allowed (i.e., _is_student or is_student_). Each attribute value must be a number, string or boolean.'
      }
    },
    group: {
      type: ['object', 'null'],
      properties: {
        type: {
          type: 'string',
          pattern: '^([A-Z][a-zA-Z]*)+$',
          maxLength: 50,
          minLength: 1,
          errorMessage: {
            type: 'Group type must be a string that starts with a capital letter like [C]arGroup or [U]serGroup. Camel casing is used to separate words.',
            maxLength: 'Group type must be a non-empty string of 50 characters or less',
            minLength: 'Group type must be a non-empty string of 50 characters or less'
          }
        },
        isGroup: {
          type: 'boolean',
          enum: [true],
          errorMessage: {
            type: '`isGroup` must be a boolean',
            enum: '`isGroup` must always be true for an group'
          }
        },
        id: {
          type: ['string', 'integer'],
          pattern: '^[ -~]+$',
          maxLength: 250,
          minLength: 1,
          errorMessage: {
            type: "A group's `id` must be a string or integer. An integer `id` will be cast into a string.",
            maxLength: "A group's `id` must be a non-empty string of 250 characters or less.",
            minLength: "A group's `id` must be a non-empty string of 250 characters or less."
          }
        },
        displayName: {
          type: 'string',
          maxLength: 250,
          minLength: 1,
          errorMessage: {
            type: "A group's `displayName` must be a string",
            maxLength: "A group's `displayName` must be a non-empty string of 250 characters or less.",
            minLength: "A group's `displayName` must be a non-empty string of 250 characters or less."
          }
        },
        attributes: {
          type: 'object',
          patternProperties: {
            '^[a-zA-Z]$|^[a-zA-Z_]{0,48}[a-zA-Z]$': {
              oneOf: [{
                type: 'string',
                maxLength: 3000,
                errorMessage: {
                  type: "A group's attribute value must be a string, boolean, or number.",
                  maxLength: "A group's string attribute must be 3000 characters or less."
                }
              }, {
                type: 'boolean',
                errorMessage: {
                  type: "A group's attribute value must be a string, boolean, or number."
                }
              }, {
                type: 'number',
                errorMessage: {
                  type: "A group's attribute value must be a string, boolean, or number."
                }
              }],
              errorMessage: {
                oneOf: "A group's attribute value must be a string, boolean, or number."
              }
            }
          },
          maxProperties: 100,
          additionalProperties: false,
          errorMessage: {
            additionalProperties: 'Each attribute must begin and end with an alphabet letter (a-z, A-Z). In between, allowed characters are a-z, A-Z, and "_". For example: isStudent or is_student. Preceding or trailing underscore is not allowed (i.e., _is_student or is_student_). Each attribute value must be a number, string or boolean.'
          }
        }
      },
      required: ['id'],
      additionalProperties: false,
      errorMessage: {
        required: 'Each group must have an `id` field.',
        additionalProperties: 'Allowed properties for a group are: `type`, `id`, `displayName`, `attributes`, and `isGroup`. `id` is required, rest are optional.'
      }
    }
  },
  required: ['id'],
  additionalProperties: false,
  errorMessage: {
    type: 'An entity is represented using a dictionary',
    required: 'Each entity must have an `id` field.',
    additionalProperties: 'Allowed properties for an entity are: `type`, `id`, `displayName`, `attributes`, `group`, and `isGroup`. `id` is required, rest are optional.'
  }
};
const ajv = Ajv({
  allErrors: true,
  jsonPointers: true
});
ajvErrors(ajv);
const validate = ajv.compile(SCHEMA);
const DEFAULT_ENTITY_TYPE = 'User';
class AirshipObject {
  constructor(obj) {
    let isValid = AirshipObject.isValidObject(obj);

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

  static isValidObject(obj) {
    let isValid = validate(obj);

    if (!isValid) {
      logger(validate.errors.map(e => e.message));
    }

    if (isValid) {
      const isGroup = obj.isGroup !== undefined ? obj.isGroup : false;
      const type = obj.type !== undefined ? obj.type : DEFAULT_ENTITY_TYPE;
      const groupIndex = type.lastIndexOf('Group');

      if (groupIndex !== -1 && groupIndex === type.length - 'Group'.length && !isGroup) {
        logger("An entity's type that ends with `Group` must be a group entity and therefore has to have an explicit `isGroup: true` property");
        isValid = false;
      }
    }

    return isValid;
  }

  static _cloneObject(obj) {
    const clone = Object.assign({}, obj);

    if (obj.attributes !== undefined) {
      clone.attributes = Object.assign({}, obj.attributes);
    }

    if (obj.group !== undefined) {
      clone.group = Object.assign({}, obj.group);

      if (obj.group.attributes !== undefined) {
        clone.group.attributes = Object.assign({}, obj.group.attributes);
      }
    }

    return clone;
  }

  static _fillInFields(obj) {
    if (obj.type === undefined) {
      obj.type = DEFAULT_ENTITY_TYPE;
    }

    if (obj.displayName === undefined) {
      obj.displayName = '' + obj.id;
    }

    if (obj.isGroup === undefined) {
      obj.isGroup = false;
    }

    if (Number.isInteger(obj.id)) {
      const idStr = '' + obj.id;

      if (idStr.length > 250) {
        logger('Integer id must have 250 digits or less');
        return false;
      }

      obj.id = idStr;
    }

    let group = null;

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
      if (Number.isInteger(group.id)) {
        const idStr = '' + group.id;

        if (idStr.length > 250) {
          logger('Integer id must have 250 digits or less');
          return false;
        }

        group.id = idStr;
      }
    }

    return true;
  }

  getHash() {
    return md5(stringify(_objectSpread({}, this.object, {
      attributes: this.object.attributes || {},
      group: _objectSpread({}, this.object.group, {
        attributes: this.object.group && this.object.group.attributes || {}
      })
    })));
  }

  getId() {
    const obj = this.object;
    return `${obj.type}_${obj.id}`;
  }

  isValid() {
    return this.object !== null;
  }

  getRawObject() {
    return this.object;
  }

  getObject() {
    const obj = this.object;
    const clone = Object.assign({}, obj);
    delete clone.group;
    return new AirshipObject(clone);
  }

  getGroup() {
    const group = this.object.group || null;
    return group && new AirshipObject(group);
  }

}

const RULE_TYPE_STRING = 'string';
const RULE_TYPE_INT = 'int';
const RULE_TYPE_FLOAT = 'float';
const RULE_TYPE_BOOLEAN = 'boolean';
const RULE_TYPE_DATE = 'date';
const RULE_TYPE_DATETIME = 'datetime';
const RULE_OPERATOR_IS = 'is';
const RULE_OPERATOR_IS_NOT = 'is_not';
const RULE_OPERATOR_IN = 'in';
const RULE_OPERATOR_NOT_IN = 'not_in';
const RULE_OPERATOR_LT = 'lt';
const RULE_OPERATOR_LTE = 'lte';
const RULE_OPERATOR_GT = 'gt';
const RULE_OPERATOR_GTE = 'gte';
const RULE_OPERATOR_FROM = 'from';
const RULE_OPERATOR_UNTIL = 'until';
const RULE_OPERATOR_AFTER = 'after';
const RULE_OPERATOR_BEFORE = 'before';
const getHashedValue = s => {
  return parseInt(md5(s), 16) * 1.0 / 340282366920938463463374607431768211455;
};
class Population {
  constructor(population) {
    this.population = population;
  }

  static categorizeValueType(v) {
    if (v === true || v === false) {
      return 'boolean';
    } else if (typeof v === 'number') {
      if ((v + '').indexOf('.') >= 0) {
        return 'float';
      } else {
        return 'int';
      }
    } else if (typeof v === 'string') {
      const unixTimestamp = new Date(v).getTime();

      if (!isNaN(unixTimestamp)) {
        const isoFormat = new Date(v).toISOString();
        const timeIndex = isoFormat.lastIndexOf('T00:00:00.000Z');

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

  _ruleMatches(rule, obj) {
    const attributes = obj.attributes || {};

    if (!attributes.hasOwnProperty(rule.attributeName)) {
      return false;
    }

    const v = attributes[rule.attributeName];
    const attributeType = Population.categorizeValueType(v);
    const numberTypes = [RULE_TYPE_INT, RULE_TYPE_FLOAT];

    if (numberTypes.indexOf(attributeType) !== -1 && numberTypes.indexOf(rule.attributeType) !== -1) ; else if (attributeType !== rule.attributeType) {
      return false;
    }

    const targetVal = rule.value;
    const targetValList = rule.valueList;
    const op = rule.operator;

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
      const targetTime = targetVal && new Date(targetVal).getTime();
      const targetTimeList = targetValList && targetValList.map(tv => new Date(tv).getTime());
      const vTime = new Date(v).getTime();

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

  getGateValues(obj, env, flag, sticky) {
    const population = this.population;

    if (this.population.entityType !== obj.type) {
      return {
        eligible: false
      };
    }

    const rules = population.rules;
    let matches = true;

    for (let i = 0; i < rules.length; i++) {
      const r = rules[i];
      matches = matches && this._ruleMatches(r, obj);
    }

    if (matches) {
      const samplingHashKey = `SAMPLING:control_${flag.hashKey}:env_${env.hashKey}:rule_set_${this.population.hashKey}:client_object_${obj.type}_${obj.id}`;
      const hashedPercentage = getHashedValue(samplingHashKey);

      if (hashedPercentage <= this.population.percentage && this.population.percentage > 0) {
        const splits = sticky ? this.population.universes[Math.max(Math.floor(hashedPercentage * 100) - 1, 0)] : flag.splits;
        const splitsMap = {};

        for (let i = 0; i < splits.length; i++) {
          const split = splits[i];
          splitsMap[split.treatmentId] = split;
        }

        const allocationHashKey = `DISTRIBUTION:control_${flag.hashKey}:env_${env.hashKey}:client_object_${obj.type}_${obj.id}`;
        const allocationHashedPercentage = getHashedValue(allocationHashKey);
        let trailingSum = 0.0;
        const treatments = flag.treatments.filter(t => !t.isOffTreatment);
        let treatment = null;

        for (let i = 0; i < treatments.length; i++) {
          const t = treatments[i];

          if (splitsMap.hasOwnProperty(t.treatmentId)) {
            trailingSum = parseFloat((trailingSum + splitsMap[t.treatmentId].percentage).toFixed(3));

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

}

const NS_PER_SEC = 1e9;
class Stat {
  static compactStats(stats) {
    const groups = stats.reduce((groups, stat) => {
      const key = [stat.name, stat.type].join(',');
      groups[key] = groups[key] || [];
      groups[key].push(stat);
      return groups;
    }, {});
    return Object.values(groups).map(stats => {
      const newStat = new Stat(stats[0].name, stats[0].type);
      let totalDuration, totalCount;

      switch (newStat.type) {
        case Stat.TYPE_DURATION:
          totalDuration = stats.reduce((duration, stat) => duration + stat.averageDuration * stat.count, 0);
          totalCount = stats.reduce((count, stat) => count + stat.count, 0);
          newStat.setAverageDuration(totalDuration / totalCount);
          newStat.setCount(totalCount);
          break;

        case Stat.TYPE_COUNT:
          newStat.setCount(stats.reduce((count, stat) => count + stat.count, 0));
          break;
      }

      return newStat;
    });
  }

  constructor(name, type) {
    const allowedTypes = [Stat.TYPE_DURATION, Stat.TYPE_COUNT];

    if (allowedTypes.indexOf(type) === -1) {
      throw 'Invalid stat type passed';
    }

    this.name = name;
    this.type = type;
    this.count = 0;
    this.startTime = null;
    this.averageDuration = 0;
  }

  start() {
    if (this.averageDuration !== 0) {
      throw 'Duration already calculated';
    }

    if (this.startTime !== null) {
      throw 'Stat start() already called';
    }

    this.startTime = process.hrtime();
    return this;
  }

  stop() {
    if (this.averageDuration !== 0) {
      throw 'Duration already calculated';
    }

    if (this.startTime === null) {
      throw 'Stat start() has not been called';
    }

    const stopTime = process.hrtime(this.startTime);
    this.averageDuration = stopTime[0] * NS_PER_SEC + stopTime[1];
    this.count = 1;
    return this;
  }

  setCount(n) {
    this.count = n;
    return this;
  }

  setAverageDuration(t) {
    this.averageDuration = t;
    return this;
  }

  getDuration() {
    return this.averageDuration;
  }

  getStatsObj() {
    const statsObj = {
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

}
Stat.TYPE_DURATION = 'stat_type__duration';
Stat.TYPE_COUNT = 'stat_type__count';

class Flag {
  constructor(flag, delegate) {
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

  isUncategorized() {
    return Boolean(this._isWild) || this.flag.flagType === 'uncategorized';
  }

  isWild() {
    return Boolean(this._isWild);
  }

  isArchived() {
    return this.flag.flagStatus === 'archived';
  }

  setDelegate(delegate) {
    this.delegate = delegate;
  }

  getType() {
    if (this._isWild) {
      logger(`Encountered uncategorized flag "${this.flagName}". Visit Airship web app to convert it to a real flag`);
      return 'uncategorized';
    }

    const flagType = this.flag.flagType;

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

  getTreatment(obj) {
    if (!this.delegate) {
      throw 'Delegate not provided to flag';
    }

    return this.delegate.getTreatment(this, obj);
  }

  getPayload(obj) {
    if (!this.delegate) {
      throw 'Delegate not provided to flag';
    }

    return this.delegate.getPayload(this, obj);
  }

  isEligible(obj) {
    if (!this.delegate) {
      throw 'Delegate not provided to flag';
    }

    return this.delegate.isEligible(this, obj);
  }

  isEnabled(obj) {
    if (!this.delegate) {
      throw 'Delegate not provided to flag';
    }

    return this.delegate.isEnabled(this, obj);
  }

}

class Environment {
  identify(obj) {
    this.object = obj;
  }

  async maybeIngest() {}

  _identifyObject(obj) {
    const airshipObj = obj instanceof AirshipObject ? obj : new AirshipObject(obj);
    return airshipObj;
  }

  _saveStat() {}

  _saveExposure() {}

  async publish(objs) {} // eslint-disable-line no-unused-vars


  shutdown() {}

  flag(flagName) {
    const flag = this.router ? this.router.getFlag(flagName) : new Flag(flagName);
    flag.setDelegate(this);
    return flag;
  }

  _getAllocation(flag, airshipObj) {
    const offTreatment = flag.offTreatment;

    if (flag.isArchived()) {
      logger(`The flag "${flag.codename}" has been archived`);
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

    const id = airshipObj.getId();
    const override = flag.overrides[id];

    if (override) {
      const treatment = flag.treatmentsMap[override.treatmentId];
      return {
        treatment: treatment,
        eligible: !treatment.isOffTreatment,
        fromOverride: true
      };
    }

    const obj = airshipObj.getRawObject();
    const useUniverses = flag.getType() === 'experiment';
    const populations = flag.populations;
    let treatment = null;
    let eligible = false;

    for (let i = 0; i < populations.length; i++) {
      const p = new Population(populations[i]);
      const gateValues = p.getGateValues(obj, this.router.getEnv(), flag, useUniverses);
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

  _resolveAllocations(alloc1, alloc2) {
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

  _getExposure(flag, airshipObj, alloc, methodCalled) {
    const obj = airshipObj.getRawObject();
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

  getTreatment(flag, obj) {
    const stat = new Stat('duration__get_treatment', Stat.TYPE_DURATION);
    stat.start();
    obj = obj || this.object;

    const airshipObj = this._identifyObject(obj);

    if (!airshipObj.isValid() || flag.isUncategorized()) {
      return 'off';
    }

    const allocation = this._getAllocation(flag, airshipObj);

    const groupAllocation = this._getAllocation(flag, airshipObj.getGroup());

    const finalAllocation = this._resolveAllocations(allocation, groupAllocation);

    const expo = this._getExposure(flag, airshipObj, finalAllocation, 'get_treatment');

    this._saveExposure(expo);

    stat.stop();

    this._saveStat(stat);

    return finalAllocation.treatment.isGhost ? flag.offTreatment && flag.offTreatment.codename || 'off' : finalAllocation.treatment.codename;
  }

  getPayload(flag, obj) {
    const stat = new Stat('duration__get_payload', Stat.TYPE_DURATION);
    stat.start();
    obj = obj || this.object;

    const airshipObj = this._identifyObject(obj);

    if (!airshipObj.isValid() || flag.isUncategorized()) {
      return null;
    }

    const allocation = this._getAllocation(flag, airshipObj);

    const groupAllocation = this._getAllocation(flag, airshipObj.getGroup());

    const finalAllocation = this._resolveAllocations(allocation, groupAllocation);

    const expo = this._getExposure(flag, airshipObj, finalAllocation, 'get_payload');

    this._saveExposure(expo);

    stat.stop();

    this._saveStat(stat);

    return finalAllocation.treatment.isGhost ? flag.offTreatment && flag.offTreatment.payload || null : finalAllocation.treatment.payload;
  }

  isEligible(flag, obj) {
    const stat = new Stat('duration__is_eligible', Stat.TYPE_DURATION);
    stat.start();
    obj = obj || this.object;

    const airshipObj = this._identifyObject(obj);

    if (!airshipObj.isValid() || flag.isUncategorized()) {
      return false;
    }

    const allocation = this._getAllocation(flag, airshipObj);

    const groupAllocation = this._getAllocation(flag, airshipObj.getGroup());

    const finalAllocation = this._resolveAllocations(allocation, groupAllocation);

    const expo = this._getExposure(flag, airshipObj, finalAllocation, 'is_eligible');

    this._saveExposure(expo);

    stat.stop();

    this._saveStat(stat);

    return finalAllocation.eligible;
  }

  isEnabled(flag, obj) {
    const stat = new Stat('duration__is_enabled', Stat.TYPE_DURATION);
    stat.start();
    obj = obj || this.object;

    const airshipObj = this._identifyObject(obj);

    if (!airshipObj.isValid() || flag.isUncategorized()) {
      return false;
    }

    const allocation = this._getAllocation(flag, airshipObj);

    const groupAllocation = this._getAllocation(flag, airshipObj.getGroup());

    const finalAllocation = this._resolveAllocations(allocation, groupAllocation);

    const expo = this._getExposure(flag, airshipObj, finalAllocation, 'is_enabled');

    this._saveExposure(expo);

    stat.stop();

    this._saveStat(stat);

    return !finalAllocation.treatment.isOffTreatment;
  }

}

// Based on https://chrisrng.svbtle.com/lru-cache-in-javascript
class LRUNode {
  constructor(key, value) {
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
  }

}

class LRU {
  constructor(limit) {
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

  setHead(node) {
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

  set(key, value) {
    const node = new LRUNode(key, value);

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

  get(key) {
    if (this.map[key]) {
      const value = this.map[key].value;
      const node = new LRUNode(key, value);
      this.remove(key);
      this.setHead(node);
      return value;
    } else {
      // console.log('Key ' + key + ' does not exist in the cache.')
      return null; // Return null because null cannot be a LRUNode value
    }
  }

  remove(key) {
    const node = this.map[key];

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

  removeAll(limit) {
    this.size = 0;
    this.map = {};
    this.head = null;
    this.tail = null;

    if (typeof limit === 'number') {
      this.limit = limit;
    }
  }

  forEach(callback) {
    let node = this.head;
    let i = 0;

    while (node) {
      callback(node, i);
      i++;
      node = node.next;
    }
  }

}

class Router {
  constructor(gatingInfo) {
    this.gatingInfo = gatingInfo;
    this.gatingInfoMap = this._getGatingInfoMap(this.gatingInfo);
  }

  _getGatingInfoMap(gatingInfo) {
    const map = {};
    const flags = gatingInfo.flags;

    for (let i = 0; i < flags.length; i++) {
      const flag = Object.assign({}, flags[i]);

      if (flag.flagType === 'uncategorized' || flag.flagStatus === 'archived') {
        map[flag.codename] = new Flag(flag);
        continue;
      }

      const overrides = flag.overrides;
      const overridesMap = {};

      for (let j = 0; j < overrides.length; j++) {
        const override = overrides[j];
        overridesMap[`${override.entityType}_${override.entityId}`] = override;
      }

      flag.overrides = overridesMap;
      const treatments = flag.treatments;
      const treatmentsMap = {};
      let offTreatment = null;

      for (let k = 0; k < treatments.length; k++) {
        const treatment = treatments[k];
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

  getIngestionMaxItem() {
    const sdkInfo = this.gatingInfo.sdkInfo;

    if (sdkInfo) {
      return sdkInfo.SDK_INGESTION_MAX_ITEMS;
    }

    return null;
  }

  getBrowserIngestionMaxItems() {
    const sdkInfo = this.gatingInfo.sdkInfo;

    if (sdkInfo) {
      return sdkInfo.SDK_BROWSER_INGESTION_MAX_ITEMS;
    }

    return null;
  }

  getIngestionInterval() {
    const sdkInfo = this.gatingInfo.sdkInfo;

    if (sdkInfo) {
      return sdkInfo.SDK_INGESTION_INTERVAL * 1000;
    }

    return null;
  }

  getBrowserIngestionInterval() {
    const sdkInfo = this.gatingInfo.sdkInfo;

    if (sdkInfo) {
      return sdkInfo.SDK_BROWSER_INGESTION_INTERVAL * 1000;
    }

    return null;
  }

  getShouldIngestObjects() {
    const sdkInfo = this.gatingInfo.sdkInfo;

    if (sdkInfo && typeof sdkInfo.SDK_SHOULD_INGEST_OBJECTS === 'boolean') {
      return sdkInfo.SDK_SHOULD_INGEST_OBJECTS;
    }

    return null;
  }

  getShouldIngestStats() {
    const sdkInfo = this.gatingInfo.sdkInfo;

    if (sdkInfo && typeof sdkInfo.SDK_SHOULD_INGEST_STATS === 'boolean') {
      return sdkInfo.SDK_SHOULD_INGEST_STATS;
    }

    return null;
  }

  getShouldIngestExposures() {
    const sdkInfo = this.gatingInfo.sdkInfo;

    if (sdkInfo && typeof sdkInfo.SDK_SHOULD_INGEST_EXPOSURES === 'boolean') {
      return sdkInfo.SDK_SHOULD_INGEST_EXPOSURES;
    }

    return null;
  }

  getShouldIngestFlags() {
    const sdkInfo = this.gatingInfo.sdkInfo;

    if (sdkInfo && typeof sdkInfo.SDK_SHOULD_INGEST_FLAGS === 'boolean') {
      return sdkInfo.SDK_SHOULD_INGEST_FLAGS;
    }

    return null;
  }

  getFlag(flagName) {
    return this.gatingInfoMap[flagName] || new Flag(flagName);
  }

  getEnv() {
    return this.gatingInfo.env;
  }

  isLocallyConfigured() {
    return this.getEnv().envKey === null;
  }

}

var version = "2.0.4";

const DEFAULT_API_DOMAIN = 'airshiphq.com'; // Primary API endpoints

const IDENTIFY_ENDPOINT = `/v2/identify`;
const GATING_INFO_ENDPOINT = `/v2/gating-info`; // SSE API endpoints

const SSE_GATING_INFO_ENDPOINT = `/v2/sse-events`; // Backup API URL & endpoint

const BACKUP_URL = 'https://backup-api.airshiphq.com';
const BACKUP_GATING_INFO_ENDPOINT = `${BACKUP_URL}/v2/gating-info`;
const REQUEST_TIMEOUT = 10 * 1000; // Default ingestion parameters

const DEFAULT_INGESTION_INTERVAL = 30;
const DEFAULT_INGESTION_MAX_ITEMS = 500;
class Airship extends Environment {
  constructor(gatingInfoListener) {
    super();
    this.gatingInfoListener = gatingInfoListener;
    this.init();
  }

  init() {
    this.ingestionMaxItems = DEFAULT_INGESTION_MAX_ITEMS;
    this.ingestionInterval = DEFAULT_INGESTION_INTERVAL * 1000; // eslint-disable-next-line no-undef

    this.objects = [];
    this.stats = [];
    this.exposures = [];
    this.flags = new Set();
    this.oldFlags = new Set();
    this.objectLRUCache = new LRU(500);
    this.firstIngestion = true;
    this.shouldIngestObjects = true;
    this.shouldIngestStats = true;
    this.shouldIngestExposures = true;
    this.shouldIngestFlags = true;
    this.restartIngestionWorker();
  }

  restartIngestionWorker() {
    if (this.ingestionWorker) {
      clearInterval(this.ingestionWorker);
    }

    this.ingestionWorker = setInterval(() => {
      this.maybeIngest(true);
    }, this.ingestionInterval);
  }

  async maybeIngest(force = false) {
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
      this.flags = new Set();
    }

    let shouldIngest = force || this.objects.length >= this.ingestionMaxItems || this.stats.length >= this.ingestionMaxItems || this.exposures.length >= this.ingestionMaxItems || this.flags.size > 0;

    if (this.firstIngestion) {
      shouldIngest = shouldIngest || this.objects.length > 0;
      this.firstIngestion = !shouldIngest;
    }

    if (this.objects.length === 0 && this.stats.length === 0 && this.exposures.length === 0 && this.flags.size === 0) {
      shouldIngest = false;
    }

    if (shouldIngest) {
      const objects = this.objects;
      const stats = this.stats;
      const exposures = this.exposures;
      const flags = Array.from(this.flags);
      flags.forEach(flagName => {
        this.oldFlags.add(flagName);
      });
      this.objects = [];
      this.stats = [];
      this.exposures = [];
      this.flags = new Set();
      await this.postContent(this.primaryServerUrl + IDENTIFY_ENDPOINT + '/' + this.envKey, JSON.stringify({
        objects: objects,
        stats: stats.map(s => s.getStatsObj()).filter(so => so !== null),
        exposures: exposures,
        flags: flags,
        sdkInfo: {
          name: 'nodejs-v1',
          version: version
        }
      })).catch(err => {
        logger(err);
      });
    }
  }

  _identifyObject(obj) {
    const airshipObj = Environment.prototype._identifyObject.call(this, obj);

    if (!airshipObj.isValid()) {
      return airshipObj;
    }

    const id = airshipObj.getId();
    const hash = airshipObj.getHash();
    const storedHash = this.objectLRUCache.get(id);

    if (storedHash === null || hash !== storedHash) {
      this.objects.push(airshipObj.getRawObject());
    }

    this.objectLRUCache.set(id, hash);
    this.maybeIngest();
    return airshipObj;
  }

  _compactStats() {
    this.stats = Stat.compactStats(this.stats);
  }

  _saveStat(stat) {
    this.stats.push(stat);

    if (this.stats.length >= this.ingestionMaxItems) {
      this._compactStats();
    }

    this.maybeIngest();
  }

  _saveExposure(expo) {
    this.exposures.push(expo);
    this.maybeIngest();
  }

  async publish(objs) {
    if (!Array.isArray(objs)) {
      logger('The "publish" method takes an array of objects (aka entities).');
      return;
    }

    objs.forEach(obj => {
      this._identifyObject(obj);
    });
    await this.maybeIngest(true);
  }

  getContent(url, timeout = REQUEST_TIMEOUT) {
    return new Promise((resolve, reject) => {
      const urlObj = URL.parse(url);
      const lib = urlObj.protocol === 'https:' ? https : http;
      const request = lib.get(url, response => {
        if (response.statusCode < 200 || response.statusCode > 299) {
          reject('Failed to load page, status code: ' + response.statusCode);
        }

        const body = [];
        response.on('data', chunk => body.push(chunk));
        response.on('end', () => {
          resolve(body.join(''));
        });
      });
      request.on('error', err => reject(err));
      request.setTimeout(timeout, () => {
        request.abort();
        reject('Request timed out');
      });
    });
  }

  postContent(url, data, contentType = 'application/json', timeout = REQUEST_TIMEOUT) {
    return new Promise((resolve, reject) => {
      const urlObj = URL.parse(url);
      const lib = urlObj.protocol === 'https:' ? https : http;
      const options = {
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
      const request = lib.request(options, response => {
        if (response.statusCode < 200 || response.statusCode > 299) {
          reject('Failed to post to url, status code: ' + response.statusCode);
        }

        const body = [];
        response.on('data', chunk => body.push(chunk));
        response.on('end', () => resolve(body.join('')));
      });
      request.on('error', err => {
        reject(err);
      });
      request.setTimeout(timeout, () => {
        request.abort();
        reject('Request timed out');
      });
      request.write(data);
      request.end();
    });
  }

  async _getGatingInfo() {
    const body = await this.getContent(`${this.primaryServerUrl}${GATING_INFO_ENDPOINT}/${this.envKey}?casing=camel`);
    return JSON.parse(body);
  }

  async _getBackupGatingInfo() {
    const body = await this.getContent(`${BACKUP_GATING_INFO_ENDPOINT}/${this.envKey}-camel`);
    return JSON.parse(body);
  }

  updateSDK() {
    const ingestionMaxItems = this.router.getIngestionMaxItem();
    const browserIngestionMaxItems = this.router.getBrowserIngestionMaxItems();
    const ingestionInterval = this.router.getIngestionInterval();
    const browserIngestionInterval = this.router.getBrowserIngestionInterval();
    const shouldIngestObjects = this.router.getShouldIngestObjects();
    const shouldIngestStats = this.router.getShouldIngestStats();
    const shouldIngestExposures = this.router.getShouldIngestExposures();
    const shouldIngestFlags = this.router.getShouldIngestFlags(); // eslint-disable-next-line no-undef

    {
      // Use SDK info's ingestionMaxItem threshold instead (if it exists)
      if (typeof ingestionMaxItems === 'number' && ingestionMaxItems > 0) {
        this.ingestionMaxItems = ingestionMaxItems;
        this.restartIngestionWorker();
      } // Use SDK info's ingestionInterval instead (if it exists)


      if (typeof ingestionInterval === 'number' && ingestionInterval > 0 && ingestionInterval != this.ingestionInterval) {
        this.ingestionInterval = ingestionInterval;
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

  async updateGatingInfo(statName, fetchFn) {
    try {
      const stat = new Stat(statName, Stat.TYPE_DURATION);
      stat.start();
      const result = await fetchFn();
      const gatingInfo = result;
      this.router = new Router(gatingInfo);
      this.updateSDK();

      if (this.gatingInfoListener) {
        this.gatingInfoListener(gatingInfo);
      }

      stat.stop();

      this._saveStat(stat);
    } catch (err) {
      logger(err);
      return false;
    }

    return true;
  }

  async configure(envKey, subscribeToUpdates = true, apiDomain = DEFAULT_API_DOMAIN) {
    const envKeyRegex = /^[a-z0-9]{16}$/;

    if (!envKey.match(envKeyRegex)) {
      throw 'options["envKey"] should be a string of lowercase characters and digits. Double check on the Airship web app.';
    }

    this.envKey = envKey;
    this.subscribeToUpdates = subscribeToUpdates;
    this.primaryServerUrl = `https://api.${apiDomain}`;
    this.sseServerUrl = `https://sse.${apiDomain}`;
    this.init();
    this.failed = false; // First try the Airship server

    if (!(await this.updateGatingInfo('duration__gating_info', this._getGatingInfo.bind(this)))) {
      // Then try the Airship CloudFront distribution
      this.failed = !(await this.updateGatingInfo('duration__cloudfront_gating_info', this._getBackupGatingInfo.bind(this)));
    }

    if (this.failed) {
      throw 'Failed to retrieve initial gating information';
    }

    if (subscribeToUpdates) {
      this._subscribeToUpdates();

      this._policeSSE();
    }
  }

  async shutdown() {
    if (this.ingestionWorker) {
      clearInterval(this.ingestionWorker);
    }

    this._unpoliceSSE();

    this._unsubscribeFromUpdates();

    await this.maybeIngest(true);
  }

  flag(flagName) {
    const flag = Environment.prototype.flag.call(this, flagName);

    if (flag.isWild()) {
      // Register the new uncategorized flag
      if (!this.oldFlags.has(flagName)) {
        this.flags.add(flagName);
        this.maybeIngest();
      }
    }

    return flag;
  }

  _policeSSE() {
    this._unpoliceSSE();

    this.policeSSEInterval = setInterval(() => {
      const now = Date.now();
      const then = this.lastSSEConnectTimestamp || 0;

      if ((now - then) / 1000 > 30) {
        logger('Did not receive a keepalive for more than 30 seconds. Reconnecting.');

        this._subscribeToUpdates();
      }
    }, 5 * 1000);
    this.pollGatingInfoInterval = setInterval(() => {
      const now = Date.now();
      const then = this.lastSSEConnectTimestamp || 0;

      if ((now - then) / 1000 > 60) {
        logger('Did not receive a keepalive for more than 30 seconds. Polling gating info.');
        this.updateGatingInfo('duration__cloudfront_gating_info', this._getBackupGatingInfo.bind(this)).then(() => logger('Polled gating info from CloudFront'), () => logger('Failed polling gating info from CloudFront'));
      }
    }, 60 * 1000);
  }

  _unpoliceSSE() {
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

  _subscribeToUpdates() {
    this._unsubscribeFromUpdates();

    this.eventSource = new EventSource(`${this.sseServerUrl}${SSE_GATING_INFO_ENDPOINT}?envkey=${this.envKey}&casing=camel`);
    this.eventSource.addEventListener('gatingInfoUpdate', evt => {
      const gatingInfo = JSON.parse(evt.data);
      this.router = new Router(gatingInfo);
      this.updateSDK();

      if (this.gatingInfoListener) {
        this.gatingInfoListener(gatingInfo);
      }

      this.lastSSEConnectTimestamp = Date.now();
    });
    this.eventSource.addEventListener('keepalive', () => {
      this.lastSSEConnectTimestamp = Date.now();
    });
  }

  _unsubscribeFromUpdates() {
    if (this.eventSource) {
      this.eventSource.close();
      delete this.eventSource;
    }
  }

}

const SCHEMA$1 = {
  type: 'object',
  patternProperties: {
    '^.{1,150}$': {
      type: 'object',
      properties: {
        whitelist: {
          type: 'array',
          items: {
            type: ['integer', 'string'],
            errorMessage: {
              type: 'An ID can be a string or integer. Integer ID will be cast into a string.'
            }
          },
          errorMessage: {
            type: '`whitelist` must be an array of IDs (string|integer)'
          }
        },
        blacklist: {
          type: 'array',
          items: {
            type: ['integer', 'string'],
            errorMessage: {
              type: 'An ID can be a string or integer. Integer ID will be cast into a string.'
            }
          },
          errorMessage: {
            type: '`blacklist` must be an array of IDs (string|integer)'
          }
        },
        population: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              attribute: {
                type: 'string',
                maxLength: 50,
                errorMessage: {
                  type: 'A population\'s filter attribute must be a string of 50 characters or less. E.g., "age", "height", "birthDate", etc.',
                  maxLength: 'A population\'s filter attribute must be a string of 50 characters or less. E.g., "age", "height", "birthDate", etc.'
                }
              },
              operator: {
                type: 'string',
                enum: ['is', 'is_not', 'in', 'not_in', 'lt', 'lte', 'gt', 'gte', 'from', 'until', 'after', 'before'],
                errorMessage: {
                  type: 'A population\'s filter operator must be a string and must be one of: ["is", "is_not", "in", "not_in", "lt", "lte", "gt", "gte", "from", "until", "after", "before"]',
                  enum: 'A population\'s filter operator must be a string and must be one of: ["is", "is_not", "in", "not_in", "lt", "lte", "gt", "gte", "from", "until", "after", "before"]'
                }
              },
              value: {
                type: ['number', 'string', 'boolean', 'array'],
                maxLength: 3000,
                items: {
                  oneOf: [{
                    type: 'number',
                    errorMessage: {
                      type: "A population's filter valueList must contain numbers or strings."
                    }
                  }, {
                    type: 'string',
                    maxLength: 3000,
                    errorMessage: {
                      maxLength: 'A string value for a population filter must be 3000 characters or less'
                    }
                  }]
                },
                minItems: 1,
                errorMessage: {
                  type: "A population's filter value is a number, string, or boolean or an array of numbers or strings.",
                  maxLength: 'A string value for a population filter must be 3000 characters or less',
                  minItems: "A population's filter value must have at least one item if it is an array."
                }
              }
            },
            errorMessage: {
              type: 'Each filter within a population is represented by an object of the form: {attribute: <attribute>, operator: <operator>, value/valueList: <value>/<valueList>}'
            }
          },
          errorMessage: {
            type: '`population` must be an array of filters, each of the form: {attribute: <attribute>, operator: <operator>, value/valueList: <value>/<valueList>}'
          }
        },
        sample: {
          type: 'number',
          minimum: 0.0,
          maximum: 1.0,
          errorMessage: {
            type: '`sample` must be a float between 0.0 and 1.0, inclusive',
            minimum: '`sample` must be between 0.0 and 1.0, inclusive',
            maximum: '`sample` must be between 0.0 and 1.0, inclusive'
          }
        },
        active: {
          type: 'boolean',
          errorMessage: {
            type: '`active` must be a boolean'
          }
        }
      },
      additionalProperties: false,
      errorMessage: {
        type: 'flagConfig must be a dictionary of flag name keys to flag configuration values',
        additionalProperties: 'Unexpected config option found. Please refer to the documentation.'
      }
    }
  },
  errorMessage: {
    patternProperties: 'Flag name must be strings of up to 150 characters.'
  }
};
const ajv$1 = Ajv({
  allErrors: true,
  jsonPointers: true
});
ajvErrors(ajv$1);
const validate$1 = ajv$1.compile(SCHEMA$1);
const isValidFlagConfig = flagConfig => {
  const isValid = validate$1(flagConfig);

  if (!isValid) {
    logger(validate$1.errors.map(e => e.message));
  }

  return isValid;
};

const RULE_TYPE_TO_ALLOWED_OPERATORS = {
  [RULE_TYPE_STRING]: new Set([RULE_OPERATOR_IS, RULE_OPERATOR_IS_NOT, RULE_OPERATOR_IN, RULE_OPERATOR_NOT_IN]),
  [RULE_TYPE_INT]: new Set([RULE_OPERATOR_IS, RULE_OPERATOR_IS_NOT, RULE_OPERATOR_IN, RULE_OPERATOR_NOT_IN, RULE_OPERATOR_LT, RULE_OPERATOR_LTE, RULE_OPERATOR_GT, RULE_OPERATOR_GTE]),
  [RULE_TYPE_FLOAT]: new Set([RULE_OPERATOR_IS, RULE_OPERATOR_IS_NOT, RULE_OPERATOR_IN, RULE_OPERATOR_NOT_IN, RULE_OPERATOR_LT, RULE_OPERATOR_LTE, RULE_OPERATOR_GT, RULE_OPERATOR_GTE]),
  [RULE_TYPE_BOOLEAN]: new Set([RULE_OPERATOR_IS, RULE_OPERATOR_IS_NOT]),
  [RULE_TYPE_DATE]: new Set([RULE_OPERATOR_IS, RULE_OPERATOR_IS_NOT, RULE_OPERATOR_IN, RULE_OPERATOR_NOT_IN, RULE_OPERATOR_FROM, RULE_OPERATOR_UNTIL, RULE_OPERATOR_AFTER, RULE_OPERATOR_BEFORE]),
  [RULE_TYPE_DATETIME]: new Set([RULE_OPERATOR_IS, RULE_OPERATOR_IS_NOT, RULE_OPERATOR_IN, RULE_OPERATOR_NOT_IN, RULE_OPERATOR_FROM, RULE_OPERATOR_UNTIL, RULE_OPERATOR_AFTER, RULE_OPERATOR_BEFORE])
};
const transformFlagConfig = flagConfig => {
  if (!isValidFlagConfig(flagConfig)) {
    return null;
  }

  const flags = [];
  const keys = Object.keys(flagConfig);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const config = flagConfig[key];
    const active = config.active !== undefined ? config.active : true;
    const flagInfo = {
      flagType: 'basic',
      hashKey: key,
      isPaused: !active,
      isWebAccessible: false,
      // eslint-disable-line no-undef
      codename: key,
      flagStatus: 'operational'
    };
    const whitelist = config.whitelist || [];
    const blacklist = config.blacklist || [];
    const blacklistSet = new Set(blacklist);
    const filteredWhitelist = whitelist.filter(i => !blacklistSet.has(i));
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
    flagInfo.overrides = flagInfo.overrides.concat(filteredWhitelist.map(i => ({
      treatmentId: 'on-treatment',
      entityType: 'User',
      entityId: i.toString()
    })));
    flagInfo.overrides = flagInfo.overrides.concat(blacklist.map(i => ({
      treatmentId: 'off-treatment',
      entityType: 'User',
      entityId: i.toString()
    })));
    flagInfo.splits = [{
      treatmentId: 'on-treatment',
      percentage: 1
    }];

    if (config.population) {
      const rules = config.population || [];
      const ruleInfos = [];

      for (let j = 0; j < rules.length; j++) {
        const r = rules[j];
        let type;

        if (Array.isArray(r.value)) {
          const types = new Set(r.value.map(v => Population.categorizeValueType(v)));

          if (types.size != 1) {
            logger("Population's filter criteria each should have a singular value type. In other words, do not mix strings with numbers in the same array, for example.");
            return null;
          }

          type = Array.from(types)[0];
        } else {
          type = Population.categorizeValueType(r.value);
        }

        const rInfo = {
          attributeName: r.attribute,
          attributeType: type,
          operator: r.operator,
          value: !Array.isArray(r.value) ? r.value : null,
          valueList: !Array.isArray(r.value) ? null : r.value
        };

        if (!RULE_TYPE_TO_ALLOWED_OPERATORS[type].has(r.operator)) {
          logger(`Population's filter operator \`${r.operator}\` is not allowed for filter type \`${type}\``);
          return null;
        }

        if (rInfo.valueList) {
          if (rInfo.operator !== RULE_OPERATOR_IN && rInfo.operator !== RULE_OPERATOR_NOT_IN) {
            logger("Population's filter operator must be `in` or `not_in` if the value is an array.");
            return null;
          }
        } else {
          if (rInfo.operator === RULE_OPERATOR_IN && rInfo.operator === RULE_OPERATOR_NOT_IN) {
            logger("Population's filter operator must not be `in` or `not_in` if the value is a number, boolean or string.");
            return null;
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
  }

  return {
    flags: flags,
    env: {
      hashKey: 'env-1',
      envKey: null
    }
  };
};

class Core extends Environment {
  async configure(flagConfig) {
    const gatingInfo = transformFlagConfig(flagConfig);

    if (gatingInfo === null) {
      throw 'Failed to transform flagConfig into initial gating information';
    }

    this.router = new Router(gatingInfo);
  }

}

const defaultEnv = new Core();
defaultEnv.configure({});
class FlaggerBase {
  constructor() {
    this.gatingInfoListeners = [];
  }

  static _isDict(obj) {
    return obj !== undefined && obj !== null && obj.constructor === Object;
  }

  async publish(objs) {
    if (this.environment) {
      await this.environment.publish(objs);
    } else {
      throw 'Airship must be configured first before `publish` can be called';
    }
  } // This will allow for async/await


  async configure(options) {
    if (!FlaggerBase._isDict(options)) {
      throw '<options> must be dictionary';
    }

    const envKey = options.envKey;
    const flagConfig = options.flagConfig;

    if (!envKey && !flagConfig) {
      throw '<options> must contain envKey corresponding to an environment key or a flagConfig dictionary to configure locally';
    }

    const subscribeToUpdates = options.subscribeToUpdates === false ? false : true;

    if (envKey) {
      if (this.environment && this.environment.envKey === envKey && this.environment.subscribeToUpdates === subscribeToUpdates && this.environment.environmentPromise && !this.environment.failed) {
        await this.environment.environmentPromise;
      } else {
        if (this.environment) {
          await this.environment.shutdown();
        }

        this.environment = new Airship(this.handleGatingInfoUpdate.bind(this));
        const promise = this.environment.configure(envKey, options.subscribeToUpdates, options.apiDomain);
        this.environment.environmentPromise = promise;
        await promise;
      }
    } else {
      if (this.environment) {
        await this.environment.shutdown();
      }

      this.environment = new Core();
      await this.environment.configure(flagConfig);
    }
  }

  async shutdown() {
    if (this.environment) {
      await this.environment.shutdown();
      delete this.environment;
    } else {
      throw 'Airship must be configured first before `shutdown` can be called';
    }
  }

  flag(flagName) {
    return (this.environment || defaultEnv).flag(flagName);
  }

  setErrorListener(fn) {
    setLogger(fn);
  }

  handleGatingInfoUpdate(gatingInfo) {
    this.gatingInfoListeners.forEach(listener => listener(gatingInfo));
  }

  addGatingInfoListener(listener) {
    this.gatingInfoListeners.push(listener);
  }

  removeGatingInfoListener(listener) {
    this.gatingInfoListeners = this.gatingInfoListeners.filter(l => l !== listener);
  }

  identify(obj) {
    if (this.environment) {
      this.environment.identify(obj);

      this.environment._identifyObject(obj);

      this.environment.maybeIngest(true);
    } else {
      throw 'Airship must be configured first before `identify` can be called';
    }
  }

}

class AirshipLegacy {
  constructor(options) {
    this.envKey = options.envKey;
    this.airship = new FlaggerBase();
  }

  async init() {
    // eslint-disable-next-line no-console
    console.warn('This method is deprecated. Please refer to v2 documentation.');
    await this.airship.configure({
      envKey: this.envKey
    });
  }

  isEnabled(controlShortName, object) {
    // eslint-disable-next-line no-console
    console.warn('This method is deprecated. Please refer to v2 documentation.');
    return this.airship.flag(controlShortName).isEnabled(object);
  }

  getVariation(controlShortName, object) {
    // eslint-disable-next-line no-console
    console.warn('This method is deprecated. Please refer to v2 documentation.');
    return this.airship.flag(controlShortName).getTreatment(object);
  }

  isEligible(controlShortName, object) {
    // eslint-disable-next-line no-console
    console.warn('This method is deprecated. Please refer to v2 documentation.');
    return this.airship.flag(controlShortName).isEligible(object);
  }

} // eslint-disable-next-line no-undef

module.exports = AirshipLegacy;
//# sourceMappingURL=compat.js.map
