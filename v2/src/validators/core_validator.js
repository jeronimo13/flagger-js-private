import {logger} from '../logger'
import Ajv from 'ajv'
import ajvErrors from 'ajv-errors'

const SCHEMA = {
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
              type:
                'An ID can be a string or integer. Integer ID will be cast into a string.'
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
              type:
                'An ID can be a string or integer. Integer ID will be cast into a string.'
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
                  type:
                    'A population\'s filter attribute must be a string of 50 characters or less. E.g., "age", "height", "birthDate", etc.',
                  maxLength:
                    'A population\'s filter attribute must be a string of 50 characters or less. E.g., "age", "height", "birthDate", etc.'
                }
              },
              operator: {
                type: 'string',
                enum: [
                  'is',
                  'is_not',
                  'in',
                  'not_in',
                  'lt',
                  'lte',
                  'gt',
                  'gte',
                  'from',
                  'until',
                  'after',
                  'before'
                ],
                errorMessage: {
                  type:
                    'A population\'s filter operator must be a string and must be one of: ["is", "is_not", "in", "not_in", "lt", "lte", "gt", "gte", "from", "until", "after", "before"]',
                  enum:
                    'A population\'s filter operator must be a string and must be one of: ["is", "is_not", "in", "not_in", "lt", "lte", "gt", "gte", "from", "until", "after", "before"]'
                }
              },
              value: {
                type: ['number', 'string', 'boolean', 'array'],
                maxLength: 3000,
                items: {
                  oneOf: [
                    {
                      type: 'number',
                      errorMessage: {
                        type:
                          "A population's filter valueList must contain numbers or strings."
                      }
                    },
                    {
                      type: 'string',
                      maxLength: 3000,
                      errorMessage: {
                        maxLength:
                          'A string value for a population filter must be 3000 characters or less'
                      }
                    }
                  ]
                },
                minItems: 1,
                errorMessage: {
                  type:
                    "A population's filter value is a number, string, or boolean or an array of numbers or strings.",
                  maxLength:
                    'A string value for a population filter must be 3000 characters or less',
                  minItems:
                    "A population's filter value must have at least one item if it is an array."
                }
              }
            },
            errorMessage: {
              type:
                'Each filter within a population is represented by an object of the form: {attribute: <attribute>, operator: <operator>, value/valueList: <value>/<valueList>}'
            }
          },
          errorMessage: {
            type:
              '`population` must be an array of filters, each of the form: {attribute: <attribute>, operator: <operator>, value/valueList: <value>/<valueList>}'
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
        type:
          'flagConfig must be a dictionary of flag name keys to flag configuration values',
        additionalProperties:
          'Unexpected config option found. Please refer to the documentation.'
      }
    }
  },
  errorMessage: {
    patternProperties: 'Flag name must be strings of up to 150 characters.'
  }
}

const ajv = Ajv({allErrors: true, jsonPointers: true})
ajvErrors(ajv)
const validate = ajv.compile(SCHEMA)

export const isValidFlagConfig = flagConfig => {
  const isValid = validate(flagConfig)
  if (!isValid) {
    logger(validate.errors.map(e => e.message))
  }
  return isValid
}
