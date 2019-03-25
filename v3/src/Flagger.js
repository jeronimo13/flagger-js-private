// Builtins and externals
import axios from 'axios'

// Internals
import FlaggerCore from './core/Flagger'
import logger from './logger'

export default class Flagger extends FlaggerCore {

  // Public API

	constructor() {
    super()

    logger.log('inited with logger')

    axios.get('/')
      .then((response) => {
        logger.log(response)
      })
      .catch((error) => {
        logger.log(error)
      })

    // subscribes to configuration complete signal / set configured compelte bool to true
  }

	echo(phrase) {
		logger.log(phrase)
	}

//   configure(options) {
//     // SEND_SIGNAL: Start configuration...
//   }

//   flag(flagName) {
//     // returns a flag
//   }

//   shutdown() {

//   }

//   publish(entities) {

//   }

//   identify(entity) {

//   }
}
