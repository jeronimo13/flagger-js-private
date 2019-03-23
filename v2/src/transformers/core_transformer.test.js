import {transformFlagConfig} from './core_transformer'

test('cannot transform invalid flagConfig because top level keys are supposed to be flag names, and values are dictionaries', () => {
  expect(transformFlagConfig({sample: 1.0})).toEqual(null)
})

test('cannot transform invalid flagConfig because sample must be between 0.0 and 1.0 inclusive', () => {
  expect(transformFlagConfig({'bitcoin-pay': {sample: 1.1}})).toEqual(null)
})

test('can transform valid flagConfig because {} is valid', () => {
  expect(transformFlagConfig({})).toMatchSnapshot()
})

test('can transform valid flagConfig because given flagConfig is valid', () => {
  const flagConfig = {
    'super-rare-pokemon': {
      population: [
        {attribute: 'country', operator: 'is', value: 'Canada'},
        {attribute: 'age', operator: 'lt', value: 15}
      ],
      active: true
    },
    trix: {
      population: [
        {attribute: 'birthDate', operator: 'after', value: '2000-09-01'}
      ],
      sample: 1.0
    },
    'new-dashboard': {
      sample: 0.15
    },
    'modern-warfare-xxi': {
      whitelist: [54, 64, 23, 65, 59],
      blacklist: [43, 34]
    },
    'more-ads': {
      population: [
        {
          attribute: 'country',
          operator: 'in',
          value: ['USA', 'CANADA', 'DUBAI']
        },
        {attribute: 'age', operator: 'lt', value: 40}
      ],
      sample: 0.3,
      whitelist: [45, 34, 84],
      blacklist: [43, 35, 65],
      active: false
    }
  }
  expect(transformFlagConfig(flagConfig)).toMatchSnapshot()
})

test('cannot transform flagConfig because value is not compatible with operator', () => {
  const flagConfig = {
    'super-rare-pokemon': {
      population: [{attribute: 'country', operator: 'is', value: [1, 'Canada']}]
    }
  }
  expect(transformFlagConfig(flagConfig)).toEqual(null)
})

test('cannot transform flagConfig because of mixed value types', () => {
  const flagConfig = {
    'super-rare-pokemon': {
      population: [{attribute: 'country', operator: 'in', value: [1, 'Canada']}]
    }
  }
  expect(transformFlagConfig(flagConfig)).toEqual(null)
})

test('cannot transform flagConfig because of empty array', () => {
  const flagConfig = {
    'super-rare-pokemon': {
      population: [{attribute: 'country', operator: 'in', value: []}]
    }
  }
  expect(transformFlagConfig(flagConfig)).toEqual(null)
})

test('cannot transform flagConfig because of incompatible operator and type', () => {
  const flagConfig = {
    'robinhood-free': {
      population: [
        {attribute: 'dateSignedUp', operator: 'lte', value: '2018-01-01'}
      ]
    }
  }
  expect(transformFlagConfig(flagConfig)).toEqual(null)
})
