const LEVELS = ['debug', 'log', 'info', 'error'] // default is 'log'

class Logger {
  constructor(options) {
    this.validLevels = LEVELS

  }

  setLogLevel(level) {
    if (LEVELS.indexOf(level) > 0) {
      this.validLevels = LEVELS.slice(LEVELS.indexOf(level), LEVELS.length - 1)
    }
  }

  debug(x) {
    if (this.validLevels.includes('debug')) {
      console.debug(x)
    }
  }

  log(x) {
    if (this.validLevels.includes('log')) {
      console.log(x)
    }
  }

  info(x) {
    if (this.validLevels.includes('info')) {
      console.info(x)
    }
  }

  error(x) {
    if (this.validLevels.includes('error')) {
      console.error(x)
    }
  }

}

const _instance = new Logger()
Object.freeze(_instance)

export default _instance
