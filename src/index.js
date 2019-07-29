import {setLogger} from './logger'
import Airship from './airship'
import Core from './core'

const defaultEnv = new Core()
defaultEnv.configure({})

export class FlaggerBase {
  constructor() {
    this.gatingInfoListeners = []
  }

  static _isDict(obj) {
    return obj !== undefined && obj !== null && obj.constructor === Object
  }

  async publish(objs) {
    if (this.environment) {
      await this.environment.publish(objs)
    } else {
      throw 'Airship must be configured first before `publish` can be called'
    }
  }

  // This will allow for async/await
  async configure(options) {
    if (!FlaggerBase._isDict(options)) {
      throw '<options> must be dictionary'
    }

    const envKey = options.envKey
    const flagConfig = options.flagConfig

    if (!envKey && !flagConfig) {
      throw '<options> must contain envKey corresponding to an environment key or a flagConfig dictionary to configure locally'
    }

    const subscribeToUpdates =
      options.subscribeToUpdates === false ? false : true

    if (envKey) {
      if (
        this.environment &&
        this.environment.envKey === envKey &&
        this.environment.subscribeToUpdates === subscribeToUpdates &&
        this.environment.environmentPromise &&
        !this.environment.failed
      ) {
        await this.environment.environmentPromise
      } else {
        if (this.environment) {
          await this.environment.shutdown()
        }
        this.environment = new Airship(this.handleGatingInfoUpdate.bind(this))
        const promise = this.environment.configure(
          envKey,
          options.subscribeToUpdates,
          options.apiDomain
        )
        this.environment.environmentPromise = promise
        await promise
      }
    } else {
      if (this.environment) {
        await this.environment.shutdown()
      }
      this.environment = new Core()
      await this.environment.configure(flagConfig)
    }
  }

  async shutdown() {
    if (this.environment) {
      await this.environment.shutdown()
      delete this.environment
    } else {
      throw 'Airship must be configured first before `shutdown` can be called'
    }
  }

  flag(flagName) {
    return (this.environment || defaultEnv).flag(flagName)
  }

  setErrorListener(fn) {
    setLogger(fn)
  }

  handleGatingInfoUpdate(gatingInfo) {
    this.gatingInfoListeners.forEach(listener => listener(gatingInfo))
  }

  addGatingInfoListener(listener) {
    this.gatingInfoListeners.push(listener)
  }

  removeGatingInfoListener(listener) {
    this.gatingInfoListeners = this.gatingInfoListeners.filter(
      l => l !== listener
    )
  }

  identify(obj) {
    if (this.environment) {
      this.environment.identify(obj)
      this.environment._identifyObject(obj)
      this.environment.maybeIngest(true)
    } else {
      throw 'Airship must be configured first before `identify` can be called'
    }
  }
}

const Flagger = new FlaggerBase()

export default Flagger
