import {logger} from './logger'

export default class Flag {
  constructor(flag, delegate) {
    if (typeof flag === 'string') {
      this._isWild = true
      this.flagName = flag
    } else {
      // These along with flag.flagType and flag.flagStatus
      // should always be present
      this.hashKey = flag.hashKey
      this.flag = flag
      this.codename = flag.codename

      // Pass through fields
      this.isPaused = flag.isPaused
      this.offTreatment = flag.offTreatment
      this.treatments = flag.treatments
      this.treatmentsMap = flag.treatmentsMap
      this.overrides = flag.overrides
      this.populations = flag.populations
      this.splits = flag.splits
    }
    this.delegate = delegate
  }

  isUncategorized() {
    return Boolean(this._isWild) || this.flag.flagType === 'uncategorized'
  }

  isWild() {
    return Boolean(this._isWild)
  }

  isArchived() {
    return this.flag.flagStatus === 'archived'
  }

  setDelegate(delegate) {
    this.delegate = delegate
  }

  getType() {
    if (this._isWild) {
      logger(
        `Encountered uncategorized flag "${
          this.flagName
        }". Visit Airship web app to convert it to a real flag`
      )
      return 'uncategorized'
    }

    const flagType = this.flag.flagType

    switch (flagType) {
      case 'basic':
        return 'basic'
      case 'experiment':
        return 'experiment'
      case 'uncategorized':
        return 'uncategorized'
      default:
        logger('Unexpected flag type encountered')
        return null
    }
  }

  getTreatment(obj) {
    if (!this.delegate) {
      throw 'Delegate not provided to flag'
    }
    return this.delegate.getTreatment(this, obj)
  }

  getPayload(obj) {
    if (!this.delegate) {
      throw 'Delegate not provided to flag'
    }
    return this.delegate.getPayload(this, obj)
  }

  isEligible(obj) {
    if (!this.delegate) {
      throw 'Delegate not provided to flag'
    }
    return this.delegate.isEligible(this, obj)
  }

  isEnabled(obj) {
    if (!this.delegate) {
      throw 'Delegate not provided to flag'
    }
    return this.delegate.isEnabled(this, obj)
  }
}
