import Ajv from 'ajv'
import ajvErrors from 'ajv-errors'
import md5 from 'md5'
import {logger} from './logger'
import stringify from 'fast-json-stable-stringify'

const SCHEMA = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      pattern: '^([A-Z][a-zA-Z]*)+$',
      maxLength: 50,
      minLength: 1,
      errorMessage: {
        type:
          'Entity type must be a string that starts with a capital letter like [C]ar or [U]ser',
        maxLength:
          'Entity type must be a non-empty string of 50 characters or less',
        minLength:
          'Entity type must be a non-empty string of 50 characters or less'
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
        type:
          "An entity's `id` must be a string or integer. An integer `id` will be cast into a string.",
        maxLength:
          "An entity's `id` must be a non-empty string of 250 characters or less.",
        minLength:
          "An entity's `id` must be a non-empty string of 250 characters or less."
      }
    },
    displayName: {
      type: 'string',
      maxLength: 250,
      minLength: 1,
      errorMessage: {
        type: "An entity's `displayName` must be a string",
        maxLength:
          "An entity's `displayName` must be a non-empty string of 250 characters or less.",
        minLength:
          "An entity's `displayName` must be a non-empty string of 250 characters or less."
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
                type:
                  "An entity's attribute value must be a string, boolean, or number.",
                maxLength:
                  "An entity's string attribute must be 3000 characters or less."
              }
            },
            {
              type: 'boolean',
              errorMessage: {
                type:
                  "An entity's attribute value must be a string, boolean, or number."
              }
            },
            {
              type: 'number',
              errorMessage: {
                type:
                  "An entity's attribute value must be a string, boolean, or number."
              }
            }
          ],
          errorMessage: {
            oneOf:
              "An entity's attribute value must be a string, boolean, or number."
          }
        }
      },
      maxProperties: 100,
      additionalProperties: false,
      errorMessage: {
        maxProperties: 'There can only be up to 100 attributes for an entity.',
        additionalProperties:
          'Each attribute must begin and end with an alphabet letter (a-z, A-Z). In between, allowed characters are a-z, A-Z, and "_". For example: isStudent or is_student. Preceding or trailing underscore is not allowed (i.e., _is_student or is_student_). Each attribute value must be a number, string or boolean.'
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
            type:
              'Group type must be a string that starts with a capital letter like [C]arGroup or [U]serGroup. Camel casing is used to separate words.',
            maxLength:
              'Group type must be a non-empty string of 50 characters or less',
            minLength:
              'Group type must be a non-empty string of 50 characters or less'
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
            type:
              "A group's `id` must be a string or integer. An integer `id` will be cast into a string.",
            maxLength:
              "A group's `id` must be a non-empty string of 250 characters or less.",
            minLength:
              "A group's `id` must be a non-empty string of 250 characters or less."
          }
        },
        displayName: {
          type: 'string',
          maxLength: 250,
          minLength: 1,
          errorMessage: {
            type: "A group's `displayName` must be a string",
            maxLength:
              "A group's `displayName` must be a non-empty string of 250 characters or less.",
            minLength:
              "A group's `displayName` must be a non-empty string of 250 characters or less."
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
                    type:
                      "A group's attribute value must be a string, boolean, or number.",
                    maxLength:
                      "A group's string attribute must be 3000 characters or less."
                  }
                },
                {
                  type: 'boolean',
                  errorMessage: {
                    type:
                      "A group's attribute value must be a string, boolean, or number."
                  }
                },
                {
                  type: 'number',
                  errorMessage: {
                    type:
                      "A group's attribute value must be a string, boolean, or number."
                  }
                }
              ],
              errorMessage: {
                oneOf:
                  "A group's attribute value must be a string, boolean, or number."
              }
            }
          },
          maxProperties: 100,
          additionalProperties: false,
          errorMessage: {
            additionalProperties:
              'Each attribute must begin and end with an alphabet letter (a-z, A-Z). In between, allowed characters are a-z, A-Z, and "_". For example: isStudent or is_student. Preceding or trailing underscore is not allowed (i.e., _is_student or is_student_). Each attribute value must be a number, string or boolean.'
          }
        }
      },
      required: ['id'],
      additionalProperties: false,
      errorMessage: {
        required: 'Each group must have an `id` field.',
        additionalProperties:
          'Allowed properties for a group are: `type`, `id`, `displayName`, `attributes`, and `isGroup`. `id` is required, rest are optional.'
      }
    }
  },
  required: ['id'],
  additionalProperties: false,
  errorMessage: {
    type: 'An entity is represented using a dictionary',
    required: 'Each entity must have an `id` field.',
    additionalProperties:
      'Allowed properties for an entity are: `type`, `id`, `displayName`, `attributes`, `group`, and `isGroup`. `id` is required, rest are optional.'
  }
}

const ajv = Ajv({allErrors: true, jsonPointers: true})
ajvErrors(ajv)
const validate = ajv.compile(SCHEMA)

export const DEFAULT_ENTITY_TYPE = 'User'

export default class AirshipObject {
  constructor(obj) {
    let isValid = AirshipObject.isValidObject(obj)

    if (!isValid) {
      this.object = null
      return
    }

    obj = AirshipObject._cloneObject(obj)
    isValid = AirshipObject._fillInFields(obj)

    if (!isValid) {
      this.object = null
      return
    }

    this.object = obj
  }

  static isValidObject(obj) {
    let isValid = validate(obj)
    if (!isValid) {
      logger(validate.errors.map(e => e.message))
    }

    if (isValid) {
      const isGroup = obj.isGroup !== undefined ? obj.isGroup : false
      const type = obj.type !== undefined ? obj.type : DEFAULT_ENTITY_TYPE

      const groupIndex = type.lastIndexOf('Group')
      if (
        groupIndex !== -1 &&
        groupIndex === type.length - 'Group'.length &&
        !isGroup
      ) {
        logger(
          "An entity's type that ends with `Group` must be a group entity and therefore has to have an explicit `isGroup: true` property"
        )
        isValid = false
      }
    }

    return isValid
  }

  static _cloneObject(obj) {
    const clone = Object.assign({}, obj)

    if (obj.attributes !== undefined) {
      clone.attributes = Object.assign({}, obj.attributes)
    }

    if (obj.group !== undefined) {
      clone.group = Object.assign({}, obj.group)

      if (obj.group.attributes !== undefined) {
        clone.group.attributes = Object.assign({}, obj.group.attributes)
      }
    }

    return clone
  }

  static _fillInFields(obj) {
    if (obj.type === undefined) {
      obj.type = DEFAULT_ENTITY_TYPE
    }

    if (obj.displayName === undefined) {
      obj.displayName = '' + obj.id
    }

    if (obj.isGroup === undefined) {
      obj.isGroup = false
    }

    if (Number.isInteger(obj.id)) {
      const idStr = '' + obj.id
      if (idStr.length > 250) {
        logger('Integer id must have 250 digits or less')
        return false
      }
      obj.id = idStr
    }

    let group = null
    if (obj.group !== undefined) {
      group = obj.group
    }

    if (group !== null && group.displayName === undefined) {
      group.displayName = '' + group.id
    }

    if (group !== null && group.type === undefined) {
      group.type = obj.type + 'Group'
    }

    if (group !== null) {
      group.isGroup = true
    }

    if (group !== null) {
      if (Number.isInteger(group.id)) {
        const idStr = '' + group.id
        if (idStr.length > 250) {
          logger('Integer id must have 250 digits or less')
          return false
        }
        group.id = idStr
      }
    }

    return true
  }

  getHash() {
    return md5(
      stringify({
        ...this.object,
        attributes: this.object.attributes || {},
        group: {
          ...this.object.group,
          attributes: (this.object.group && this.object.group.attributes) || {}
        }
      })
    )
  }

  getId() {
    const obj = this.object
    return `${obj.type}_${obj.id}`
  }

  isValid() {
    return this.object !== null
  }

  getRawObject() {
    return this.object
  }

  getObject() {
    const obj = this.object
    const clone = Object.assign({}, obj)
    delete clone.group
    return new AirshipObject(clone)
  }

  getGroup() {
    const group = this.object.group || null
    return group && new AirshipObject(group)
  }
}
