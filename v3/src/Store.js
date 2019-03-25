// Builtins and externals
import axios from 'axios'

// Internals
import StoreCore from './core/Store'
import logger from './logger'

export default class Flag extends StoreCore {

  // Public API

  constructor() {
    super()
    logger.log('inited')
  }

}
