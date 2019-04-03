// Builtins and externals
// Internals
import FlaggerCore from './core/Flagger'
import logger from './logger'
import Flag from './Flag'
import {httpsRequestPromise} from './utils'

const requiredOptionsKeys = ['envKey']
const optionsKeys = requiredOptionsKeys.concat([
  'primaryDomain',
  'secondaryDomain',
  'apiPath'
])

function Deferred() {
  this.promise = new Promise((resolve, reject) => {
    this.reject = reject
    this.resolve = resolve
  })
}

class Flagger extends FlaggerCore {
  // Public API

  constructor() {
    super()

    this.primaryDomain = 'api.airshiphq.com'
    this.secondaryDomain = 'backup-api.airshiphq.com'
    this.apiPath = '/v2/gating-info/'

    this.configurationDeferred = new Deferred()
    this.configuration = {}
  }

  echo(phrase) {
    logger.log(phrase)
  }

  _isValidOptions(options) {
    requiredOptionsKeys.forEach(key => {
      if (!options[key]) {
        return false
      }
    })
    return true
  }

  _initOptions(options) {
    optionsKeys.forEach(key => {
      if (options[key]) {
        this[key] = options[key]
      }
    })
  }

  _buildRequestOptions(
    domain = this.primaryDomain,
    path = this.apiPath + this.envKey
  ) {
    const result = {
      method: 'GET',
      hostname: domain,
      port: 443,
      path,
      headers: {
        'Content-Type': 'application/json'
      },
      data: ''
    }
    return result
  }

  /***
   * Check for data in primary and if fails in secondary origins. Tries to refetch data if fails
   */
  fetchDataWithRetry = async (tries = 5, wait = 1000) => {
    return new Promise(resolve => {
      httpsRequestPromise(this._buildRequestOptions())
        .then(primaryData => {
          resolve(primaryData)
        })
        .catch(err => {
          //primary server is unavailable, trying secondary
          httpsRequestPromise(this._buildRequestOptions(this.secondaryDomain))
            .then(secondaryData => {
              resolve(secondaryData)
            })
            .catch(err => {
              //both servers are unavailable
              if (tries !== 0) {
                //schedule a restart
                setTimeout(() => {
                  fetchDataWithRetry(tries - 1, wait).then(data => {
                    resolve(data)
                  })
                }, wait)
              } else {
                //severe error, rejecting
                reject(err)
              }
            })
        })
    })
  }

  configure(options) {
    if (!this._isValidOptions(options)) {
      throw 'Options are incomplete'
    }

    this._initOptions(options)

    this.fetchDataWithRetry(5).then(configuration => {
      this.configurationDeferred.resolve()
      this.configuration = configuration
    })
  }

  async flag(name) {
    return new Promise((resolve, reject) => {
      this.configurationDeferred.promise.then(_ => {
        resolve(new Flag({name}))
      })
    })
  }

  //   shutdown() {

  //   }

  //   publish(entities) {

  //   }

  //   identify(entity) {

  //   }
}

const _instance = new Flagger()

export default _instance
