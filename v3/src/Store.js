// Builtins and externals
import axios from 'axios'

// Internals
import StoreCore from './core/Store'

export default class Flag extends StoreCore {

  // Public API

  constructor() {
    super()
    console.log('inited')
  }

}
