// Builtins and externals
import Ajv from 'ajv'
import ajvErrors from 'ajv-errors'
import stringify from 'fast-json-stable-stringify'
import util from 'util'

// Internals
import logger from '../logger'

const DEFAULT_ENTITY_TYPE = 'User'

const createSchema = ({group = false} = {}) => {
  const schemaType = group ? 'Group' : 'Entity'

  return {
    type: 'object',
    required: ['id'],
    additionalProperties: false,
    errorMessage: {
      type: `Each ${schemaType.toLowerCase()} is represented using a dictionary`,
      required: `Each ${schemaType.toLowerCase()} must have an "id" field`,
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
          type: `${schemaType} "id" must be a string or integer. An integer will be cast into a string`,
          maxLength: `${schemaType} "id" must be a non-empty string of 250 characters or less`,
          minLength: `${schemaType} "id" must be a non-empty string of 250 characters or less`
        }
      },
      displayName: {
        type: 'string',
        maxLength: 250,
        minLength: 1,
        errorMessage: {
          type: `${schemaType} "displayName" must be a string`,
          maxLength: `${schemaType} "displayName" must be a non-empty string of 250 characters or less`,
          minLength: `${schemaType} "displayName" must be a non-empty string of 250 characters or less`
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
                  type: `${schemaType} attribute values must be a string, boolean, or number`,
                  maxLength: `${schemaType} string attributes must be 3000 characters or less`
                }
              },
              {
                type: 'boolean',
                errorMessage: {
                  type: `${schemaType} attribute values must be a string, boolean, or number`
                }
              },
              {
                type: 'number',
                errorMessage: {
                  type: `${schemaType} attribute values must be a string, boolean, or number`
                }
              }
            ],
            errorMessage: {
              oneOf: `${schemaType} attribute values must be a string, boolean, or number`
            }
          }
        },
        maxProperties: 100,
        additionalProperties: false,
        errorMessage: {
          maxProperties: `There can only be up to 100 attributes for an ${schemaType.toLowerCase()}`,
          additionalProperties:
            'Each attribute name must begin and end with an alphabet letter (a-z, A-Z) and be less than 50 characters. Allowed characters are a-z, A-Z, and "_". For example: isStudent or is_student. Preceding or trailing underscore is not allowed (i.e., _is_student or is_student_). Each attribute value must be a number, string or boolean.'
        }
      }
    }
  }
}

const baseSchema = createSchema()

const SCHEMA = {
  ...baseSchema,
  properties: {
    ...baseSchema.properties,
    group: createSchema({group: true})
  }
}

const ajv = new Ajv({allErrors: true, jsonPointers: true})
ajvErrors(ajv)
const validate = ajv.compile(SCHEMA)

export default class Entity {
  constructor(input) {
    this.entity = null

    Entity.hydrateInput(input)

    if (Entity.isValidInput(input)) {
      // Lastly, check `isGroup` and `group` property consistency
      if (input.isGroup === true && input.group !== undefined) {
        logger.warn(
          'Entity format is invalid. Group entity cannot be child of another group entity.'
        )
        return
      } else {
        this.entity = input
      }
    } else {
      return
    }
  }

  static isValidInput(input) {
    const isValid = validate(input)

    if (!isValid) {
      logger.warn(
        `Entity format is invalid. Issues detected:${validate.errors.map(
          (e, i) => ` (${i + 1}) ${e.message}`
        )} | Provided: ${JSON.stringify(input)}`
      )
    }

    return isValid
  }

  static hydrateInput(input) {
    // If input has no ID, no chance of passing validation test next so return asap
    if (input.id === undefined) {
      return
    }

    // If group has no ID, no chance of passing validation so return asap
    if (input.group !== undefined && input.group.id === undefined) {
      return
    }

    // If attributes is empty, delete it from input
    if (
      input.attributes !== undefined &&
      Object.keys(input.attributes).length === 0
    ) {
      input.attributes = undefined
    }

    // If group is empty, delete it from input
    if (
      input.group !== undefined &&
      input.group.attributes !== undefined &&
      Object.keys(input.group.attributes).length === 0
    ) {
      input.group.attributes = undefined
    }

    // If group attributes are empty, delete it from input

    // If entity has no type, assign default type
    if (input.type === undefined) {
      input.type = DEFAULT_ENTITY_TYPE
    }

    // If entity ID is integer, cast to string
    if (Number.isInteger(input.id)) {
      const idString = '' + input.id
      input.id = idString
    }

    // If entity has no display name, assign default display name
    if (input.displayName === undefined) {
      input.displayName = `${input.type}-${input.id}`
    }

    // Set default `isGroup` (false) if doesn't exist
    if (input.isGroup === undefined) {
      input.isGroup = false
    }

    if (input.group !== undefined) {
      const group = input.group

      // If group has no type, assign default type
      if (group.type === undefined) {
        group.type = input.type + 'Group'
      }

      // If group ID is integer, case to string
      if (Number.isInteger(group.id)) {
        const idString = '' + group.id
        group.id = idString
      }

      // If group has no display name, assign default display name
      if (group.displayName === undefined) {
        group.displayName = `${group.type}-${group.id}`
      }
    }
  }

  getEntity() {
    return this.entity
  }

  isValid() {
    return this.entity !== null
  }

  getGroup() {
    return this.object.group ? new Entity(this.object.group) : null
  }
}
