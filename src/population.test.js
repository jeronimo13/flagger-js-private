import {getHashedValue} from './population'

test('hashing consistency across platforms', () => {
  const s1 = 'foobarbaz123'
  const s2 = 'somethingelsehuh'
  const s3 = 'can'
  expect(getHashedValue(s1)).toEqual(0.4896716235571712)
  expect(getHashedValue(s2)).toEqual(0.29984751348147426)
  expect(getHashedValue(s3)).toEqual(0.173369169084706)
})
