import Environment from './environment'
import Router from './router'
import {transformFlagConfig} from './transformers/core_transformer'

export default class Core extends Environment {
  async configure(flagConfig) {
    const gatingInfo = transformFlagConfig(flagConfig)
    if (gatingInfo === null) {
      throw 'Failed to transform flagConfig into initial gating information'
    }
    this.router = new Router(gatingInfo)
  }
}
