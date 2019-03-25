import EventEmitter from 'events'

// Internals
import logger from './logger'

class Sentinel extends EventEmitter {
  constructor() {
    super()
    logger.log('pass')
  }
}
