// Builtins and externals
import Ajv from 'ajv'
import ajvErrors from 'ajv-errors'
import stringify from 'fast-json-stable-stringify'
import util from 'util'

// Internals
import logger from '../logger'

const DEFAULT_ENTITY_TYPE = 'User'

const createSchema = (group = false) => {
  const schemaType = group ? 'Group' : 'Entity'

  return {
    type: 'object',
    required: ['id'],
    additionalProperties: false,
    errorMessage: {
      type: `Each ${schemaType.toLowerCase()} is represented using a dictionary`,
      required: `Each ${schemaType.toLowerCase()} must have an "id" field.`,
      additionalProperties:
        'Allowed properties are: "type", "id", "displayName", "attributes", "group", and "isGroup". "id" is required, the rest are optional.'
    },
    properties: {
      type: {
        type: 'string',
        pattern: '^([A-Z][a-zA-Z]*)+$',
        maxLength: 50,
        minLength: 1,
        errorMessage: {
          type: `${schemaType} type must be a string that starts with a capital letter like [C]ar or [U]ser`,
          maxLength: `${schemaType} type must be a non-empty string of 50 characters or less`,
          minLength: `${schemaType} type must be a non-empty string of 50 characters or less`
        }
      },
      isGroup: {
        type: 'boolean',
        errorMessage: {
          type: '"isGroup" must be a boolean'
        }
      },
      id: {
        type: ['string', 'integer'],
        pattern: '^[ -~]+$',
        maxLength: 250,
        minLength: 1,
        errorMessage: {
          type: `${schemaType} "id" must be a string or integer. An integer will be cast into a string.`,
          maxLength: `${schemaType} "id" must be a non-empty string of 250 characters or less.`,
          minLength: `${schemaType} "id" must be a non-empty string of 250 characters or less.`
        }
      },
      displayName: {
        type: 'string',
        maxLength: 250,
        minLength: 1,
        errorMessage: {
          type: `${schemaType} "displayName" must be a string`,
          maxLength: `${schemaType} "displayName" must be a non-empty string of 250 characters or less.`,
          minLength: `${schemaType} "displayName" must be a non-empty string of 250 characters or less.`
        }
      },
      attributes: {
        type: 'object',
        patternProperties: {
          '^[a-zA-Z]$|^[a-zA-Z_]{0,48}[a-zA-Z]$': {
            oneOf: [
              {
                type: 'string',
                maxLength: 3000,
                errorMessage: {
                  type: `${schemaType} attribute values must be a string, boolean, or number.`,
                  maxLength: `${schemaType} string attributes must be 3000 characters or less.`
                }
              },
              {
                type: 'boolean',
                errorMessage: {
                  type: `${schemaType} attribute values must be a string, boolean, or number.`
                }
              },
              {
                type: 'number',
                errorMessage: {
                  type: `${schemaType} attribute values must be a string, boolean, or number.`
                }
              }
            ],
            errorMessage: {
              oneOf: `${schemaType} attribute values must be a string, boolean, or number.`
            }
          }
        },
        maxProperties: 100,
        additionalProperties: false,
        errorMessage: {
          maxProperties: `There can only be up to 100 attributes for an ${schemaType.toLowerCase()}.`,
          additionalProperties:
            'Each attribute must begin and end with an alphabet letter (a-z, A-Z). In between, allowed characters are a-z, A-Z, and "_". For example: isStudent or is_student. Preceding or trailing underscore is not allowed (i.e., _is_student or is_student_). Each attribute value must be a number, string or boolean.'
        }
      }
    }
  }
}

const baseSchema = createSchema(false)

const SCHEMA = {
  ...baseSchema,
  properties: {
    ...baseSchema.properties,
    group: createSchema(true)
  }
}

const ajv = new Ajv({allErrors: true, jsonPointers: true})
ajvErrors(ajv)
const validate = ajv.compile(SCHEMA)

export default class Entity {
  constructor(input) {
    this.entity = null

    if (Entity.isValid(input)) {
      this.entity = Entity.hydrateEntity(input)
    }

    // validate(input)
  }

  static isValid(input) {
    const isValid = validate(input)

    if (!isValid) {
      logger.warn(
        `Entity format is invalid. Issues detected:${validate.errors.map(
          (e, i) => ` (${i + 1}) ${e.message}`
        )}. Entity: ${JSON.stringify(input)}`
      )
    }

    return isValid
  }

  static hydrateEntity(input) {
    let errorMessages = []

    // If entity has no type, assign default type
    if (input.type === undefined) {
      input.type = DEFAULT_ENTITY_TYPE
    }

    // If entity ID is integer, cast to string
    if (Number.isInteger(input.id)) {
      const idString = '' + input.id
      if (idString.length > 250) {
        errorMessages.append('Integer "id" must be 250 digits or less.')
      } else {
        input.id = idString
      }
    }

    // If entity has no display name, assign default display name
    if (input.displayName === undefined) {
      input.displayName = input.type + input.id
    }

    // If entity isGroup is set to true, it cannot have a group property
    if (input.isGroup === undefined) {
      input.isGroup = false
    }

    // if (input.isGroup === true && )

    // if (input.group !== undefined) {
    //   input.isGroup = true
    // } else {
    //   input.isGroup = false
    // }
  }
}

// hydrating model does:
// - gives it a default entity type (if missing)
// - gives it a default display name (if missing)
// - populates isGroup (if missing)

// - if id is integer, cast to string

// - set group if exists
// - give group a displayname if missing
// - give group a type if type is missing
// - if there's a group after hydration, set isGroup
// - cast group ID to string if is integer
