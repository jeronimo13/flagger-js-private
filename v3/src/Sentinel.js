import EventEmitter from 'events'

class Sentinel extends EventEmitter {
  constructor() {
    super()
    console.log('pass')
  }
}
