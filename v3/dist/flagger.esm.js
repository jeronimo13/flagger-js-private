import axios from 'axios';

// Builtins and externals
// Internals
class Store {
  constructor() {
    // Empty store
    this.store = {};
  }

  get(key) {
    if (key in this.store) {
      return this.store[key];
    } else {
      throw new Error(`Key ${key} not in store`);
    }
  }

  setGatingInfo(gatingInfo) {
    const flagMap = this._getFlagMap(gatingInfo);

    this.store['flags'] = flagMap; // Send signal?
  } // PRIVATE API


  _getFlagMap(gatingInfo) {
    const map = {};
    const flags = gatingInfo.flags;

    for (let i = 0; i < flags.length; i++) {
      const flag = Object.assign({}, flags[i]);

      if (flag.flagType === 'uncategorized' || flag.flagStatus === 'archived') {
        map[flag.codename] = new Flag(flag);
        continue;
      }

      const overrides = flag.overrides;
      const overridesMap = {};

      for (let j = 0; j < overrides.length; j++) {
        const override = overrides[j];
        overridesMap[`${override.entityType}_${override.entityId}`] = override;
      }

      flag.overrides = overridesMap;
      const treatments = flag.treatments;
      const treatmentsMap = {};
      let offTreatment = null;

      for (let k = 0; k < treatments.length; k++) {
        const treatment = treatments[k];
        treatmentsMap[treatment.treatmentId] = treatment;

        if (treatment.isOffTreatment) {
          offTreatment = treatment;
        }
      }

      flag.treatments = treatments;
      flag.treatmentsMap = treatmentsMap;
      flag.offTreatment = offTreatment;
      map[flag.codename] = new Flag(flag);
    }

    return map;
  }

}

class Flagger {
  // Public API
  constructor() {
    // Variable holding whether configuration is done
    this.configurationComplete = false; // Instantiate an instance of Store

    this.store = new Store();
  } // configure(flagConfig) {
  //   // Set this in store
  // }
  // flag(flagName) {
  //   // returns a flag
  // }
  // shutdown() {
  // }
  // publish(entities) {
  // }
  // identify(entity) {
  // }


}

const LEVELS = ['debug', 'info', 'warn', 'error']; // default is 'log'

class Logger {
  constructor() {
    this.validLevels = LEVELS;
  }

  setLogLevel(level = 'error') {
    if (LEVELS.indexOf(level) >= 0) {
      this.validLevels = LEVELS.slice(LEVELS.indexOf(level), LEVELS.length);
    }
  }

  debug(x) {
    if (this.validLevels.includes('debug')) {
      // eslint-disable-next-line no-console
      console.debug(x);
    }
  }

  info(x) {
    if (this.validLevels.includes('info')) {
      // eslint-disable-next-line no-console
      console.info(x);
    }
  }

  warn(x) {
    if (this.validLevels.includes('warn')) {
      // eslint-disable-next-line no-console
      console.warn(x);
    }
  }

  error(x) {
    // eslint-disable-next-line no-console
    console.error(x); // Always permit error logging
  }

  log(x) {
    this.info(x);
  }

}

const _instance = new Logger();

// Builtins and externals
class Flagger$1 extends Flagger {
  // Public API
  constructor() {
    super();
    _instance.log('inited with logger');
    axios.get('/').then(response => {
      _instance.log(response);
    }).catch(error => {
      _instance.log(error);
    }); // subscribes to configuration complete signal / set configured compelte bool to true
  }

  echo(phrase) {
    _instance.log(phrase);
  } //   configure(options) {
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

const _flagger = new Flagger$1();

export default _flagger;
//# sourceMappingURL=flagger.esm.js.map
