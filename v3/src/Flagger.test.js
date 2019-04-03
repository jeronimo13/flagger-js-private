import Flagger from './Flagger'
import Flag from './Flag'

const options = {
  envKey: 'ia6fvljhthybc7zy',
  primaryDomain: 'api.staging.airshiphq.com',
  secondaryDomain: 'api.staging.airshiphq.com'
}

test('init with default params', () => {
  Flagger.configure(options)

  expect(Flagger.envKey).toBe(options.envKey)
})

test('data is fetched', () => {
  Flagger.configure(options)

  return Flagger.configurationDeferred.promise.then(_ =>
    expect(Flagger.configuration).toHaveProperty('env')
  )
})

test('error on primary domain, but data is fetched from secondary', () => {
  options.primaryDomain = 'wrongurl.airshiphq.com'
  Flagger.configure(options)

  return Flagger.configurationDeferred.promise.then(_ =>
    expect(Flagger.configuration).toHaveProperty('env')
  )
})

test('check class of the returning flag', () => {
  Flagger.configure(options)

  return Flagger.flag('name').then(flag => expect(flag).toBeInstanceOf(Flag))
})
