// Builtins and externals

// Internals

export default class Store {
  constructor() {
    // Empty store
    this.store = {}
  }

  getStore(key) {
    if (key in this.store) {
      return this.store[key]
    } else {
      throw new Error(`Key ${key} not in store`)
    }
  }

  setStore(key, value) {
    this.store[key] = value
  }

  setGatingInfo(gatingInfo) {
    const flagMap = this._getFlagMap(gatingInfo)
    this.store['flags'] = flagMap

    // Send signal?
  }

  // PRIVATE API

  _getFlagMap(gatingInfo) {
    const map = {}

    const flags = gatingInfo.flags

    for (let i = 0; i < flags.length; i++) {
      const flag = Object.assign({}, flags[i])
      if (flag.flagType === 'uncategorized' || flag.flagStatus === 'archived') {
        map[flag.codename] = new Flag(flag)
        continue
      }

      const overrides = flag.overrides
      const overridesMap = {}

      for (let j = 0; j < overrides.length; j++) {
        const override = overrides[j]

        overridesMap[`${override.entityType}_${override.entityId}`] = override
      }

      flag.overrides = overridesMap

      const treatments = flag.treatments
      const treatmentsMap = {}
      let offTreatment = null

      for (let k = 0; k < treatments.length; k++) {
        const treatment = treatments[k]

        treatmentsMap[treatment.treatmentId] = treatment

        if (treatment.isOffTreatment) {
          offTreatment = treatment
        }
      }

      flag.treatments = treatments
      flag.treatmentsMap = treatmentsMap
      flag.offTreatment = offTreatment

      map[flag.codename] = new Flag(flag)
    }

    return map
  }
}
