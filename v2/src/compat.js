import {FlaggerBase} from './index'

export default class AirshipLegacy {
  constructor(options) {
    this.envKey = options.envKey
    this.airship = new FlaggerBase()
  }

  async init() {
    // eslint-disable-next-line no-console
    console.warn('This method is deprecated. Please refer to v2 documentation.')
    await this.airship.configure({envKey: this.envKey})
  }

  isEnabled(controlShortName, object) {
    // eslint-disable-next-line no-console
    console.warn('This method is deprecated. Please refer to v2 documentation.')
    return this.airship.flag(controlShortName).isEnabled(object)
  }

  getVariation(controlShortName, object) {
    // eslint-disable-next-line no-console
    console.warn('This method is deprecated. Please refer to v2 documentation.')
    return this.airship.flag(controlShortName).getTreatment(object)
  }

  isEligible(controlShortName, object) {
    // eslint-disable-next-line no-console
    console.warn('This method is deprecated. Please refer to v2 documentation.')
    return this.airship.flag(controlShortName).isEligible(object)
  }
}

// eslint-disable-next-line no-undef
if (__BROWSER__) {
  AirshipLegacy.prototype.identify = async function(object) {
    // eslint-disable-next-line no-console
    console.warn('This method is deprecated. Please refer to v2 documentation.')
    await this.init()
    this.airship.identify(object)
  }
}
