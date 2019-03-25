const LEVELS = ['debug', 'info', 'warn', 'error'] // default is 'log'

class Logger {
  constructor() {
    this.validLevels = LEVELS
  }

  setLogLevel(level = 'error') {
    if (LEVELS.indexOf(level) >= 0) {
      this.validLevels = LEVELS.slice(LEVELS.indexOf(level), LEVELS.length)
    }
  }

  debug(x) {
    if (this.validLevels.includes('debug')) {
      // eslint-disable-next-line no-console
      console.debug(x)
    }
  }

  info(x) {
    if (this.validLevels.includes('info')) {
      // eslint-disable-next-line no-console
      console.info(x)
    }
  }

  warn(x) {
    if (this.validLevels.includes('warn')) {
      // eslint-disable-next-line no-console
      console.warn(x)
    }
  }

  error(x) {
    // eslint-disable-next-line no-console
    console.error(x) // Always permit error logging
  }

  log(x) {
    this.info(x)
  }
}

const _instance = new Logger()

export default _instance
