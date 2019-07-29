import md5 from 'md5'
import {logger} from './logger'

export const RULE_TYPE_STRING = 'string'
export const RULE_TYPE_INT = 'int'
export const RULE_TYPE_FLOAT = 'float'
export const RULE_TYPE_BOOLEAN = 'boolean'
export const RULE_TYPE_DATE = 'date'
export const RULE_TYPE_DATETIME = 'datetime'

export const RULE_OPERATOR_IS = 'is'
export const RULE_OPERATOR_IS_NOT = 'is_not'
export const RULE_OPERATOR_IN = 'in'
export const RULE_OPERATOR_NOT_IN = 'not_in'
export const RULE_OPERATOR_LT = 'lt'
export const RULE_OPERATOR_LTE = 'lte'
export const RULE_OPERATOR_GT = 'gt'
export const RULE_OPERATOR_GTE = 'gte'
export const RULE_OPERATOR_FROM = 'from'
export const RULE_OPERATOR_UNTIL = 'until'
export const RULE_OPERATOR_AFTER = 'after'
export const RULE_OPERATOR_BEFORE = 'before'

export const getHashedValue = s => {
  return (parseInt(md5(s), 16) * 1.0) / 340282366920938463463374607431768211455
}

export default class Population {
  constructor(population) {
    this.population = population
  }

  static categorizeValueType(v) {
    if (v === true || v === false) {
      return 'boolean'
    } else if (typeof v === 'number') {
      if ((v + '').indexOf('.') >= 0) {
        return 'float'
      } else {
        return 'int'
      }
    } else if (typeof v === 'string') {
      const unixTimestamp = new Date(v).getTime()

      if (!isNaN(unixTimestamp)) {
        const isoFormat = new Date(v).toISOString()
        const timeIndex = isoFormat.lastIndexOf('T00:00:00.000Z')
        if (
          timeIndex !== -1 &&
          isoFormat.length - 'T00:00:00.000Z'.length === timeIndex
        ) {
          return 'date'
        } else {
          return 'datetime'
        }
      }

      return 'string'
    }
    logger('Unexpected attribute value type encountered')
    return null
  }

  _ruleMatches(rule, obj) {
    const attributes = obj.attributes || {}

    if (!attributes.hasOwnProperty(rule.attributeName)) {
      return false
    }

    const v = attributes[rule.attributeName]
    const attributeType = Population.categorizeValueType(v)

    const numberTypes = [RULE_TYPE_INT, RULE_TYPE_FLOAT]

    if (
      numberTypes.indexOf(attributeType) !== -1 &&
      numberTypes.indexOf(rule.attributeType) !== -1
    ) {
      // This is fine
    } else if (attributeType !== rule.attributeType) {
      return false
    }

    const targetVal = rule.value
    const targetValList = rule.valueList
    const op = rule.operator

    if (attributeType === RULE_TYPE_STRING) {
      if (op === RULE_OPERATOR_IS) {
        return v === targetVal
      } else if (op === RULE_OPERATOR_IS_NOT) {
        return v !== targetVal
      } else if (op === RULE_OPERATOR_IN) {
        return targetValList.indexOf(v) !== -1
      } else if (op === RULE_OPERATOR_NOT_IN) {
        return targetValList.indexOf(v) === -1
      } else {
        logger('Invalid rule operator encountered')
        return false
      }
    } else if (numberTypes.indexOf(attributeType) !== -1) {
      if (op === RULE_OPERATOR_IS) {
        return v === targetVal
      } else if (op === RULE_OPERATOR_IS_NOT) {
        return v !== targetVal
      } else if (op === RULE_OPERATOR_IN) {
        return targetValList.indexOf(v) !== -1
      } else if (op === RULE_OPERATOR_NOT_IN) {
        return targetValList.indexOf(v) === -1
      } else if (op === RULE_OPERATOR_LT) {
        return v < targetVal
      } else if (op === RULE_OPERATOR_LTE) {
        return v <= targetVal
      } else if (op === RULE_OPERATOR_GT) {
        return v > targetVal
      } else if (op === RULE_OPERATOR_GTE) {
        return v >= targetVal
      } else {
        logger('Invalid rule operator encountered')
        return false
      }
    } else if (attributeType === RULE_TYPE_BOOLEAN) {
      if (op === RULE_OPERATOR_IS) {
        return v === targetVal
      } else if (op === RULE_OPERATOR_IS_NOT) {
        return v !== targetVal
      } else {
        logger('Invalid rule operator encountered')
        return false
      }
    } else if (
      attributeType === RULE_TYPE_DATE ||
      attributeType === RULE_TYPE_DATETIME
    ) {
      const targetTime = targetVal && new Date(targetVal).getTime()
      const targetTimeList =
        targetValList && targetValList.map(tv => new Date(tv).getTime())
      const vTime = new Date(v).getTime()

      if (op === RULE_OPERATOR_IS) {
        return vTime === targetTime
      } else if (op === RULE_OPERATOR_IS_NOT) {
        return vTime !== targetTime
      } else if (op === RULE_OPERATOR_IN) {
        return targetTimeList.indexOf(vTime) !== -1
      } else if (op === RULE_OPERATOR_NOT_IN) {
        return targetTimeList.indexOf(vTime) === -1
      } else if (op === RULE_OPERATOR_FROM) {
        return vTime >= targetTime
      } else if (op === RULE_OPERATOR_UNTIL) {
        return vTime <= targetTime
      } else if (op === RULE_OPERATOR_AFTER) {
        return vTime > targetTime
      } else if (op === RULE_OPERATOR_BEFORE) {
        return vTime < targetTime
      } else {
        logger('Invalid rule operator encountered')
        return false
      }
    } else {
      logger('Invalid attribute type encountered')
      return false
    }
  }

  getGateValues(obj, env, flag, sticky) {
    const population = this.population
    if (this.population.entityType !== obj.type) {
      return {eligible: false}
    }

    const rules = population.rules

    let matches = true

    for (let i = 0; i < rules.length; i++) {
      const r = rules[i]
      matches = matches && this._ruleMatches(r, obj)
    }

    if (matches) {
      const samplingHashKey = `SAMPLING:control_${flag.hashKey}:env_${
        env.hashKey
      }:rule_set_${this.population.hashKey}:client_object_${obj.type}_${obj.id}`

      const hashedPercentage = getHashedValue(samplingHashKey)

      if (
        hashedPercentage <= this.population.percentage &&
        this.population.percentage > 0
      ) {
        const splits = sticky
          ? this.population.universes[
              Math.max(Math.floor(hashedPercentage * 100) - 1, 0)
            ]
          : flag.splits
        const splitsMap = {}
        for (let i = 0; i < splits.length; i++) {
          const split = splits[i]
          splitsMap[split.treatmentId] = split
        }

        const allocationHashKey = `DISTRIBUTION:control_${flag.hashKey}:env_${
          env.hashKey
        }:client_object_${obj.type}_${obj.id}`

        const allocationHashedPercentage = getHashedValue(allocationHashKey)

        let trailingSum = 0.0

        const treatments = flag.treatments.filter(t => !t.isOffTreatment)

        let treatment = null
        for (let i = 0; i < treatments.length; i++) {
          const t = treatments[i]
          if (splitsMap.hasOwnProperty(t.treatmentId)) {
            trailingSum = parseFloat(
              (trailingSum + splitsMap[t.treatmentId].percentage).toFixed(3)
            )

            if (allocationHashedPercentage <= trailingSum) {
              treatment = t
              break
            }
          }
        }

        return {treatment: treatment, eligible: true}
      } else {
        return {eligible: true}
      }
    } else {
      return {eligible: false}
    }
  }
}
