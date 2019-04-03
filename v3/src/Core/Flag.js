// Builtins and externals

// Internals
import logger from '../logger'

export default class Flag {
  constructor(flag) {
    if (typeof flag === 'string') {
      this._newlyDetected = true
      this.codename = flag

      logger.warn(`Detected a previously unseen flag called: ${this.codename}`)
    } else {
      this.codename = flag.codename

      this._flagStatus = flag.flagStatus
      this._flagType = flag.flagType

      this._hashKey = flag.hashKey

      this._treatments = flag.treatmentsMap
      this._overrides = flag.overrides
      this._populations = flag.populations
      this._splits = flag.splits
      this._isPaused = flag.isPaused
    }
  }

  isUncategorized() {
    return Boolean(this._newlyDetected) || this._flagType === 'uncategorized'
  }

  isWild() {
    return Boolean(this._newlyDetected)
  }

  isArchived() {
    return this._flagStatus === 'archived'
  }

  getType() {
    if (this._newlyDetected) {
      return 'uncategorized'
    }

    const flagType = this._flagType

    switch (flagType) {
      case 'basic':
        return 'basic'
      case 'experiment':
        return 'experiment'
      case 'uncategorized':
        return 'uncategorized'
      default:
        logger.warn(
          `Flag <${this.codename}> | Unexpected flag type encountered`
        )
        return null
    }
  }

  getTreatment(entity) {
    logger.debug(
      `Flag <${this.codename}> | getTreatment() called for Entity <${entity}>`
    )
  }

  getPayload(entity) {
    logger.debug(
      `Flag <${this.codename}> | getPayload() called for Entity <${entity}>`
    )
  }

  isEnabled(entity) {
    logger.debug(
      `Flag <${this.codename}> | isEnabled() called for Entity <${entity}>`
    )
  }

  isEligible(entity) {
    logger.debug(
      `Flag <${this.codename}> | isEligible() called for Entity <${entity}>`
    )
  }
}
