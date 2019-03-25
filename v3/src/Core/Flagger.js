import Store from './Store'

export default class Flagger {
  // Public API

  constructor() {
    // Variable holding whether configuration is done
    this.configurationComplete = false

    // Instantiate an instance of Store
    this.store = new Store()
  }

  configure(flagConfig) {
    // Set this in store

  }

  flag(flagName) {
    // returns a flag
  }

  shutdown() {

  }

  publish(entities) {

  }

  identify(entity) {

  }
}
