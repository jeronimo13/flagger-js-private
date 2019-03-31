import Entity2 from './Entity2'

// First set of tests test for raw input to pass minimal validation
test('basic test', () => {
  const entity = {id: '54', type: 'Harry'}
  expect(Entity2.isValid(entity)).toEqual(true)
})

test('basic tes that fails', () => {
  const entity = {
    type: 'Harry',
    isGroup: 'yes'
  }
  expect(Entity2.isValid(entity)).toEqual(true)
})

// Second set of tests tests that infused entities pass final validation
