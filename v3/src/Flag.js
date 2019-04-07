// Builtins and externals
import axios from 'axios'

// Internals
import FlagCore from './core/Flag'

export default class Flag extends FlagCore {
  // Public API

  constructor() {
    super()
  }

  getTreatment(entity) {
    // track stats

    const treatment = super.getTreatment(entity)

    // end track stats
  }
}
