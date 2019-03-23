import Core from './core'

let environment

beforeAll(async () => {
  environment = new Core()
  await environment.configure({
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
  })
})

afterAll(async () => {
  await environment.shutdown()
})

test('gating should return false due to sampling being 0', () => {
  const flag = environment.flag('super-rare-pokemon')

  expect(flag.isEnabled({id: 1})).toEqual(false)
})

test('gating should return false because of population filter', () => {
  const flag = environment.flag('trix')

  expect(flag.isEnabled({id: 1})).toEqual(false)
})

test('gating should return false because of non-existant flag', () => {
  const flag = environment.flag('non-existant')

  expect(
    flag.isEnabled({id: 1, attributes: {birthDate: '2001-09-01'}})
  ).toEqual(false)
})

test('gating should return true because of satisfying filter', () => {
  const flag = environment.flag('modern-warfare-xxi')

  expect(
    flag.isEnabled({id: 54, attributes: {birthDate: '2001-09-01'}})
  ).toEqual(true)
})

test('gating should return false because of not satisfying filter', () => {
  const flag = environment.flag('modern-warfare-xxi')

  expect(
    flag.isEnabled({id: 43, attributes: {birthDate: '2001-09-01'}})
  ).toEqual(false)
})

test('off flag', () => {
  const flag = environment.flag('more-ads')
  expect(flag.isEnabled({id: 45})).toEqual(false)
})

test('locally configured Airship correctly knows that it is locally configured', () => {
  expect(environment.router.isLocallyConfigured()).toEqual(true)
})

test('.flag() should work before initialization', () => {
  const environment = new Core()
  expect(environment.flag('some-flag').isEnabled()).toBeFalsy()
})
