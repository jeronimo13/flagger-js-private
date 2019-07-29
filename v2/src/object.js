import md5 from 'md5'
import {logger} from './logger'
import stringify from 'fast-json-stable-stringify'

const validate = obj => {
  if (!obj) {
    return false
  }
  return true
}

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
      // logger(validate.errors.map(e => e.message))
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
