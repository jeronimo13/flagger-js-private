'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var axios = _interopDefault(require('axios'));

class Store {
  constructor() {
    // do stuff
    console.log('stuff done'); // Empty store

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
  }

  configure(flagConfig) {// Set this in store
  }

  flag(flagName) {// returns a flag
  }

  shutdown() {}

  publish(entities) {}

  identify(entity) {}

}

const LEVELS = ['debug', 'log', 'info', 'error'];
class Logger {}
LEVELS.forEach(level => {
  Logger.prototype[level] = logCallArgs => {
    console.log.apply(null, logCallArgs);
  };
});

// Builtins and externals
const logger = new Logger();
class Flagger$1 extends Flagger {
  // Public API
  constructor() {
    super();
    console.log('inited');
    logger.log('inited with logger');
    axios.get('/').then(response => {
      console.log('response');
    }).catch(error => {
      console.log('error');
    }); // subscribes to configuration complete signal / set configured compelte bool to true
  }

  echo(phrase) {
    console.log(phrase);
  }

  configure(options) {// SEND_SIGNAL: Start configuration...
  }

  flag(flagName) {// returns a flag
  }

  shutdown() {}

  publish(entities) {}

  identify(entity) {}

}

const _flagger = new Flagger$1();

module.exports = _flagger;
//# sourceMappingURL=flagger.cjs.js.map
