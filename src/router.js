import Flag from './flag'

export default class Router {
  constructor(gatingInfo) {
    this.gatingInfo = gatingInfo
    this.gatingInfoMap = this._getGatingInfoMap(this.gatingInfo)
  }

  _getGatingInfoMap(gatingInfo) {
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

  getIngestionMaxItem() {
    const sdkInfo = this.gatingInfo.sdkInfo
    if (sdkInfo) {
      return sdkInfo.SDK_INGESTION_MAX_ITEMS
    }
    return null
  }

  getBrowserIngestionMaxItems() {
    const sdkInfo = this.gatingInfo.sdkInfo
    if (sdkInfo) {
      return sdkInfo.SDK_BROWSER_INGESTION_MAX_ITEMS
    }
    return null
  }

  getIngestionInterval() {
    const sdkInfo = this.gatingInfo.sdkInfo
    if (sdkInfo) {
      return sdkInfo.SDK_INGESTION_INTERVAL * 1000
    }
    return null
  }

  getBrowserIngestionInterval() {
    const sdkInfo = this.gatingInfo.sdkInfo
    if (sdkInfo) {
      return sdkInfo.SDK_BROWSER_INGESTION_INTERVAL * 1000
    }
    return null
  }

  getShouldIngestObjects() {
    const sdkInfo = this.gatingInfo.sdkInfo
    if (sdkInfo && typeof sdkInfo.SDK_SHOULD_INGEST_OBJECTS === 'boolean') {
      return sdkInfo.SDK_SHOULD_INGEST_OBJECTS
    }
    return null
  }

  getShouldIngestStats() {
    const sdkInfo = this.gatingInfo.sdkInfo
    if (sdkInfo && typeof sdkInfo.SDK_SHOULD_INGEST_STATS === 'boolean') {
      return sdkInfo.SDK_SHOULD_INGEST_STATS
    }
    return null
  }

  getShouldIngestExposures() {
    const sdkInfo = this.gatingInfo.sdkInfo
    if (sdkInfo && typeof sdkInfo.SDK_SHOULD_INGEST_EXPOSURES === 'boolean') {
      return sdkInfo.SDK_SHOULD_INGEST_EXPOSURES
    }
    return null
  }

  getShouldIngestFlags() {
    const sdkInfo = this.gatingInfo.sdkInfo
    if (sdkInfo && typeof sdkInfo.SDK_SHOULD_INGEST_FLAGS === 'boolean') {
      return sdkInfo.SDK_SHOULD_INGEST_FLAGS
    }
    return null
  }

  getFlag(flagName) {
    return this.gatingInfoMap[flagName] || new Flag(flagName)
  }

  getEnv() {
    return this.gatingInfo.env
  }

  isLocallyConfigured() {
    return this.getEnv().envKey === null
  }
}
