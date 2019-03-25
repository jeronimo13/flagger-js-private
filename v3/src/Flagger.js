// Builtins and externals
import axios from 'axios'

// Internals
import FlaggerCore from './core/Flagger'
import Logger from './logger'

const logger = new Logger()

export default class Flagger extends FlaggerCore {

  // Public API

	constructor() {
    super()

		const initVar = 'test'
		console.log('inited')
    logger.log('inited with logger')

    axios.get('/')
      .then((response) => {
        console.log('response')
      })
      .catch((error) => {
        console.log('error')
      })

    // subscribes to configuration complete signal / set configured compelte bool to true
  }

	echo(phrase) {
		console.log(phrase)
	}

  configure(options) {
    // SEND_SIGNAL: Start configuration...
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
