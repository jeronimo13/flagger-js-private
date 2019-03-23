import {logger} from './logger'
import AirshipObject from './object'
import Population from './population'
import Stat from './stat'
import Flag from './flag'

export default class Environment {
  identify(obj) {
    this.object = obj
  }

  async maybeIngest() {}

  _identifyObject(obj) {
    const airshipObj =
      obj instanceof AirshipObject ? obj : new AirshipObject(obj)

    return airshipObj
  }

  _saveStat() {}

  _saveExposure() {}

  async publish(objs) {} // eslint-disable-line no-unused-vars

  shutdown() {}

  flag(flagName) {
    const flag = this.router
      ? this.router.getFlag(flagName)
      : new Flag(flagName)
    flag.setDelegate(this)
    return flag
  }

  _getAllocation(flag, airshipObj) {
    const offTreatment = flag.offTreatment

    if (flag.isArchived()) {
      logger(`The flag "${flag.codename}" has been archived`)
      return {
        treatment: offTreatment,
        eligible: false
      }
    }

    if (flag.isPaused) {
      return {
        treatment: offTreatment,
        eligible: false
      }
    }

    // If the airshipObj is not a valid obj,
    // then return the offTreatment/false
    if (!airshipObj) {
      return {
        treatment: offTreatment,
        eligible: false
      }
    }

    const id = airshipObj.getId()
    const override = flag.overrides[id]

    if (override) {
      const treatment = flag.treatmentsMap[override.treatmentId]
      return {
        treatment: treatment,
        eligible: !treatment.isOffTreatment,
        fromOverride: true
      }
    }

    const obj = airshipObj.getRawObject()
    const useUniverses = flag.getType() === 'experiment'
    const populations = flag.populations
    let treatment = null
    let eligible = false

    for (let i = 0; i < populations.length; i++) {
      const p = new Population(populations[i])
      const gateValues = p.getGateValues(
        obj,
        this.router.getEnv(),
        flag,
        useUniverses
      )
      eligible = eligible || gateValues.eligible
      if (gateValues.treatment) {
        treatment = gateValues.treatment
        break
      }
    }

    return {
      treatment: treatment || offTreatment,
      eligible: eligible
    }
  }

  _resolveAllocations(alloc1, alloc2) {
    if (alloc1.fromOverride) {
      return alloc1
    }

    if (alloc2.fromOverride) {
      return alloc2
    }

    if (!alloc1.treatment.isOffTreatment) {
      return alloc1
    }

    if (!alloc2.treatment.isOffTreatment) {
      return alloc2
    }

    return alloc1
  }

  _getExposure(flag, airshipObj, alloc, methodCalled) {
    const obj = airshipObj.getRawObject()
    return {
      flag: flag.codename,
      type: obj.type,
      id: obj.id,
      treatment: alloc.treatment.codename,
      methodCalled: methodCalled,
      eligible: alloc.eligible,
      timeExposed: new Date().toISOString()
    }
  }

  getTreatment(flag, obj) {
    const stat = new Stat('duration__get_treatment', Stat.TYPE_DURATION)
    stat.start()
    obj = obj || this.object

    const airshipObj = this._identifyObject(obj)
    if (!airshipObj.isValid() || flag.isUncategorized()) {
      return 'off'
    }

    const allocation = this._getAllocation(flag, airshipObj)
    const groupAllocation = this._getAllocation(flag, airshipObj.getGroup())

    const finalAllocation = this._resolveAllocations(
      allocation,
      groupAllocation
    )

    const expo = this._getExposure(
      flag,
      airshipObj,
      finalAllocation,
      'get_treatment'
    )
    this._saveExposure(expo)

    stat.stop()
    this._saveStat(stat)
    return finalAllocation.treatment.isGhost
      ? (flag.offTreatment && flag.offTreatment.codename) || 'off'
      : finalAllocation.treatment.codename
  }

  getPayload(flag, obj) {
    const stat = new Stat('duration__get_payload', Stat.TYPE_DURATION)
    stat.start()
    obj = obj || this.object
    const airshipObj = this._identifyObject(obj)
    if (!airshipObj.isValid() || flag.isUncategorized()) {
      return null
    }

    const allocation = this._getAllocation(flag, airshipObj)
    const groupAllocation = this._getAllocation(flag, airshipObj.getGroup())

    const finalAllocation = this._resolveAllocations(
      allocation,
      groupAllocation
    )

    const expo = this._getExposure(
      flag,
      airshipObj,
      finalAllocation,
      'get_payload'
    )
    this._saveExposure(expo)

    stat.stop()
    this._saveStat(stat)
    return finalAllocation.treatment.isGhost
      ? (flag.offTreatment && flag.offTreatment.payload) || null
      : finalAllocation.treatment.payload
  }

  isEligible(flag, obj) {
    const stat = new Stat('duration__is_eligible', Stat.TYPE_DURATION)
    stat.start()
    obj = obj || this.object

    const airshipObj = this._identifyObject(obj)
    if (!airshipObj.isValid() || flag.isUncategorized()) {
      return false
    }

    const allocation = this._getAllocation(flag, airshipObj)
    const groupAllocation = this._getAllocation(flag, airshipObj.getGroup())

    const finalAllocation = this._resolveAllocations(
      allocation,
      groupAllocation
    )

    const expo = this._getExposure(
      flag,
      airshipObj,
      finalAllocation,
      'is_eligible'
    )
    this._saveExposure(expo)

    stat.stop()
    this._saveStat(stat)
    return finalAllocation.eligible
  }

  isEnabled(flag, obj) {
    const stat = new Stat('duration__is_enabled', Stat.TYPE_DURATION)
    stat.start()
    obj = obj || this.object

    const airshipObj = this._identifyObject(obj)
    if (!airshipObj.isValid() || flag.isUncategorized()) {
      return false
    }

    const allocation = this._getAllocation(flag, airshipObj)
    const groupAllocation = this._getAllocation(flag, airshipObj.getGroup())

    const finalAllocation = this._resolveAllocations(
      allocation,
      groupAllocation
    )

    const expo = this._getExposure(
      flag,
      airshipObj,
      finalAllocation,
      'is_enabled'
    )
    this._saveExposure(expo)

    stat.stop()
    this._saveStat(stat)
    return !finalAllocation.treatment.isOffTreatment
  }
}
