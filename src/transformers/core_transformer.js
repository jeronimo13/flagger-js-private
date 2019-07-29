import {logger} from '../logger'
import {isValidFlagConfig} from '../validators/core_validator'
import Population, {
  RULE_TYPE_STRING,
  RULE_TYPE_INT,
  RULE_TYPE_FLOAT,
  RULE_TYPE_BOOLEAN,
  RULE_TYPE_DATE,
  RULE_TYPE_DATETIME,
  RULE_OPERATOR_IS,
  RULE_OPERATOR_IS_NOT,
  RULE_OPERATOR_IN,
  RULE_OPERATOR_NOT_IN,
  RULE_OPERATOR_LT,
  RULE_OPERATOR_LTE,
  RULE_OPERATOR_GT,
  RULE_OPERATOR_GTE,
  RULE_OPERATOR_FROM,
  RULE_OPERATOR_UNTIL,
  RULE_OPERATOR_AFTER,
  RULE_OPERATOR_BEFORE
} from '../population'

const RULE_TYPE_TO_ALLOWED_OPERATORS = {
  [RULE_TYPE_STRING]: new Set([
    RULE_OPERATOR_IS,
    RULE_OPERATOR_IS_NOT,
    RULE_OPERATOR_IN,
    RULE_OPERATOR_NOT_IN
  ]),
  [RULE_TYPE_INT]: new Set([
    RULE_OPERATOR_IS,
    RULE_OPERATOR_IS_NOT,
    RULE_OPERATOR_IN,
    RULE_OPERATOR_NOT_IN,
    RULE_OPERATOR_LT,
    RULE_OPERATOR_LTE,
    RULE_OPERATOR_GT,
    RULE_OPERATOR_GTE
  ]),
  [RULE_TYPE_FLOAT]: new Set([
    RULE_OPERATOR_IS,
    RULE_OPERATOR_IS_NOT,
    RULE_OPERATOR_IN,
    RULE_OPERATOR_NOT_IN,
    RULE_OPERATOR_LT,
    RULE_OPERATOR_LTE,
    RULE_OPERATOR_GT,
    RULE_OPERATOR_GTE
  ]),
  [RULE_TYPE_BOOLEAN]: new Set([RULE_OPERATOR_IS, RULE_OPERATOR_IS_NOT]),
  [RULE_TYPE_DATE]: new Set([
    RULE_OPERATOR_IS,
    RULE_OPERATOR_IS_NOT,
    RULE_OPERATOR_IN,
    RULE_OPERATOR_NOT_IN,
    RULE_OPERATOR_FROM,
    RULE_OPERATOR_UNTIL,
    RULE_OPERATOR_AFTER,
    RULE_OPERATOR_BEFORE
  ]),
  [RULE_TYPE_DATETIME]: new Set([
    RULE_OPERATOR_IS,
    RULE_OPERATOR_IS_NOT,
    RULE_OPERATOR_IN,
    RULE_OPERATOR_NOT_IN,
    RULE_OPERATOR_FROM,
    RULE_OPERATOR_UNTIL,
    RULE_OPERATOR_AFTER,
    RULE_OPERATOR_BEFORE
  ])
}

export const transformFlagConfig = flagConfig => {
  if (!isValidFlagConfig(flagConfig)) {
    return null
  }

  const flags = []
  const keys = Object.keys(flagConfig)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const config = flagConfig[key]
    const active = config.active !== undefined ? config.active : true
    const flagInfo = {
      flagType: 'basic',
      hashKey: key,
      isPaused: !active,
      isWebAccessible: __BROWSER__, // eslint-disable-line no-undef
      codename: key,
      flagStatus: 'operational'
    }
    const whitelist = config.whitelist || []
    const blacklist = config.blacklist || []
    const blacklistSet = new Set(blacklist)
    const filteredWhitelist = whitelist.filter(i => !blacklistSet.has(i))

    flagInfo.treatments = [
      {
        treatmentId: 'off-treatment',
        codename: 'off',
        isControl: false,
        isOffTreatment: true
      },
      {
        treatmentId: 'on-treatment',
        codename: 'on',
        isControl: false,
        isOffTreatment: false
      }
    ]

    flagInfo.overrides = []

    flagInfo.overrides = flagInfo.overrides.concat(
      filteredWhitelist.map(i => ({
        treatmentId: 'on-treatment',
        entityType: 'User',
        entityId: i.toString()
      }))
    )

    flagInfo.overrides = flagInfo.overrides.concat(
      blacklist.map(i => ({
        treatmentId: 'off-treatment',
        entityType: 'User',
        entityId: i.toString()
      }))
    )

    flagInfo.splits = [{treatmentId: 'on-treatment', percentage: 1}]

    if (config.population) {
      const rules = config.population || []
      const ruleInfos = []

      for (let j = 0; j < rules.length; j++) {
        const r = rules[j]
        let type
        if (Array.isArray(r.value)) {
          const types = new Set(
            r.value.map(v => Population.categorizeValueType(v))
          )

          if (types.size != 1) {
            logger(
              "Population's filter criteria each should have a singular value type. In other words, do not mix strings with numbers in the same array, for example."
            )
            return null
          }

          type = Array.from(types)[0]
        } else {
          type = Population.categorizeValueType(r.value)
        }

        const rInfo = {
          attributeName: r.attribute,
          attributeType: type,
          operator: r.operator,
          value: !Array.isArray(r.value) ? r.value : null,
          valueList: !Array.isArray(r.value) ? null : r.value
        }

        if (!RULE_TYPE_TO_ALLOWED_OPERATORS[type].has(r.operator)) {
          logger(
            `Population's filter operator \`${
              r.operator
            }\` is not allowed for filter type \`${type}\``
          )
          return null
        }

        if (rInfo.valueList) {
          if (
            rInfo.operator !== RULE_OPERATOR_IN &&
            rInfo.operator !== RULE_OPERATOR_NOT_IN
          ) {
            logger(
              "Population's filter operator must be `in` or `not_in` if the value is an array."
            )
            return null
          }
        } else {
          if (
            rInfo.operator === RULE_OPERATOR_IN &&
            rInfo.operator === RULE_OPERATOR_NOT_IN
          ) {
            logger(
              "Population's filter operator must not be `in` or `not_in` if the value is a number, boolean or string."
            )
            return null
          }
        }

        ruleInfos.push(rInfo)
      }

      flagInfo.populations = [
        {
          hashKey: 'population-1',
          entityType: 'User',
          percentage: config.sample || 0.0,
          rules: ruleInfos,
          universes: []
        }
      ]
    } else {
      flagInfo.populations = [
        {
          hashKey: 'population-1',
          entityType: 'User',
          percentage: config.sample || 0.0,
          rules: [],
          universes: []
        }
      ]
    }

    flags.push(flagInfo)
  }

  return {
    flags: flags,
    env: {
      hashKey: 'env-1',
      envKey: null
    }
  }
}
