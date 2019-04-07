import Store from './Store'

export default class Flagger {
  // Public API

  constructor() {
    // Instantiate an instance of Store
    this.store = new Store()
  }

  configure({
    gatingInfo,
    debug = false,
    gatingInfoUrl = '',
    backupInofIrl = ''
  }) {
    this.store.setGatingInfo(gatingInfo)
  }

  flag(flagName) {
    return this.store.getFlag(flagName)
  }

  // shutdown() {

  // }

  // publish(entities) {

  // }

  // identify(entity) {

  // }
}
