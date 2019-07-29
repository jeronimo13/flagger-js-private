import {isValidFlagConfig} from './core_validator'

describe.skip('skipping validation', () => {
  test('validate sampling for flag configs', () => {
    expect(isValidFlagConfig({'bitcoin-pay': {sample: 0.5}})).toEqual(true)
    expect(isValidFlagConfig({'bitcoin-pay': {sample: -0.5}})).toEqual(false)
    expect(isValidFlagConfig({'bitcoin-pay': {sample: 1.1}})).toEqual(false)
  })

  test('validate whitelist/blacklist for flag configs', () => {
    expect(
      isValidFlagConfig({'bitcoin-pay': {whitelist: [1, 2, 4, 5, 6, 7, 'foo']}})
    ).toEqual(true)
    expect(
      isValidFlagConfig({
        'bitcoin-pay': {whitelist: [1, 2, 4, 5, 6, 7, 'foo', true]}
      })
    ).toEqual(false)
    expect(
      isValidFlagConfig({
        'bitcoin-pay': {whitelist: [1, 2, 4, 5, 6, 7, 'foo', null]}
      })
    ).toEqual(false)
    expect(
      isValidFlagConfig({'bitcoin-pay': {blacklist: [1, 2, 4, 5, 6, 7, 'foo']}})
    ).toEqual(true)
    expect(
      isValidFlagConfig({
        'bitcoin-pay': {blacklist: [1, 2, 4, 5, 6, 7, 'foo', true]}
      })
    ).toEqual(false)
    expect(
      isValidFlagConfig({
        'bitcoin-pay': {blacklist: [1, 2, 4, 5, 6, 7, 'foo', null]}
      })
    ).toEqual(false)
  })

  test('validate population filter value max length', () => {
    let s = ''
    while (s.length <= 3000) {
      s += Math.random()
        .toString(36)
        .substring(7)
    }
    expect(
      isValidFlagConfig({
        'bitcoin-pay': {
          population: [{attribute: 'desc', operator: 'is', value: s}]
        }
      })
    ).toEqual(false)
    expect(
      isValidFlagConfig({
        'bitcoin-pay': {
          population: [
            {attribute: 'desc', operator: 'is', value: s.substring(0, 3000)}
          ]
        }
      })
    ).toEqual(true)
  })

  test('validate valid flagConfig', () => {
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
        ]
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
        blacklist: [43, 35, 65]
      }
    }
    expect(isValidFlagConfig(flagConfig)).toEqual(true)
  })
})
