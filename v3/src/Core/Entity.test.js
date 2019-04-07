import Entity from './Entity'

test('entity with only int id is valid', () => {
  const entity = {id: 1}

  const entityObject = new Entity(entity)

  expect(entityObject.isValid()).toEqual(true)
})

test('entity with capitalized custom type is valid', () => {
  const entity = {id: 1, type: 'Customer'}

  const entityObject = new Entity(entity)

  console.log(entityObject)

  expect(entityObject.isValid()).toEqual(true)
})

test('entity with lowercased custom type is invalid', () => {
  const entity = {id: 1, type: 'customer'}

  const entityObject = new Entity(entity)

  console.log(entityObject)

  expect(entityObject.isValid()).toEqual(false)
})

test('entity with only string id is valid', () => {
  const entity = {id: '1'}

  const entityObject = new Entity(entity)

  expect(entityObject.isValid()).toEqual(true)
})

test('entity with int id and string displayName is valid', () => {
  const entity = {id: 1, displayName: '1'}

  const entityObject = new Entity(entity)

  expect(entityObject.isValid()).toEqual(true)
})

test('entity with empty attributes is valid', () => {
  const entity = {id: 1, displayName: '1', attributes: {}}

  const entityObject = new Entity(entity)

  expect(entityObject.isValid()).toEqual(true)
})

test('empty object is not valid', () => {
  const entity = {}

  const entityObject = new Entity(entity)

  expect(entityObject.isValid()).toEqual(false)
})

test('entity missing id is not valid', () => {
  const entity = {displayName: '1'}

  const entityObject = new Entity(entity)

  expect(entityObject.isValid()).toEqual(false)
})

test('entity with int displayName is not valid', () => {
  const entity = {id: 1, displayName: 1}

  const entityObject = new Entity(entity)

  expect(entityObject.isValid()).toEqual(false)
})

test('entity with unlisted property is not valid', () => {
  const entity = {id: 1, anotherProperty: true}

  const entityObject = new Entity(entity)

  expect(entityObject.isValid()).toEqual(false)
})

test('group with only int id is valid', () => {
  const entity = {id: 1, displayName: '1', group: {id: 2}}

  const entityObject = new Entity(entity)

  expect(entityObject.isValid()).toEqual(true)
})

test('group with only string id is valid', () => {
  const entity = {id: 1, displayName: '1', group: {id: '2'}}

  const entityObject = new Entity(entity)

  expect(entityObject.isValid()).toEqual(true)
})

test('group with int id and string displayName is valid', () => {
  const entity = {id: 1, displayName: '1', group: {id: 2, displayName: '2'}}

  const entityObject = new Entity(entity)

  expect(entityObject.isValid()).toEqual(true)
})

test('group with empty attributes is valid', () => {
  const entity = {id: 1, displayName: '1', group: {id: 2, attributes: {}}}

  const entityObject = new Entity(entity)

  expect(entityObject.isValid()).toEqual(true)
})

test('empty group is not valid', () => {
  const entity = {id: 1, displayName: '1', group: {}}

  const entityObject = new Entity(entity)

  expect(entityObject.isValid()).toEqual(false)
})

test('group missing id is not valid', () => {
  const entity = {id: 1, displayName: '1', group: {displayName: '2'}}

  const entityObject = new Entity(entity)

  expect(entityObject.isValid()).toEqual(false)
})

test('group with int displayName is not valid', () => {
  const entity = {id: 1, displayName: '1', group: {id: 2, displayName: 2}}

  const entityObject = new Entity(entity)

  expect(entityObject.isValid()).toEqual(false)
})

test('group with unlisted property is not valid', () => {
  const entity = {
    id: 1,
    displayName: '1',
    group: {id: 2, anotherProperty: true}
  }

  const entityObject = new Entity(entity)

  expect(entityObject.isValid()).toEqual(false)
})

test('group type is preserved', () => {
  const entity = {id: 1, displayName: '1', group: {id: 2, type: 'Club'}}

  const entityObject = new Entity(entity)

  expect(entityObject.getEntity().group.type).toEqual('Club')
})

test('entity validation works for valid attributes', () => {
  const entity = {
    id: 1,
    attributes: {age: 18, height: 183.2, date: '2018-11-11', name: 'Chuck'}
  }
  const entityObject = new Entity(entity)
  expect(entityObject.isValid()).toEqual(true)
})

test('entity attribute cannot have space in its name', () => {
  const entity = {id: 1, attributes: {'age now': 18}}

  const entityObject = new Entity(entity)

  expect(entityObject.isValid()).toEqual(false)
})

test('entity attribute cannot have empty array as value', () => {
  const entity = {id: 1, attributes: {arr: []}}

  const entityObject = new Entity(entity)

  expect(entityObject.isValid()).toEqual(false)
})

test('entity attribute name cannot be more than 50 chars', () => {
  const entity = {
    id: 1,
    attributes: {abcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdea: true}
  }

  const entityObject = new Entity(entity)

  expect(entityObject.isValid()).toEqual(false)
})

test('entity attribute value cannot be null', () => {
  const entity = {id: 1, attributes: {height: null}}

  const entityObject = new Entity(entity)

  expect(entityObject.isValid()).toEqual(false)
})

test('entity attribute value cannot have more than 3000 chars', () => {
  let s = ''
  while (s.length <= 3000) {
    s += Math.random()
      .toString(36)
      .substring(7)
  }

  const entity = {id: 1, attributes: {label: s}}

  const entityObject = new Entity(entity)

  expect(entityObject.isValid()).toEqual(false)
})

test('log warning if `isGroup` is true and entity also contains a group', () => {
  console.warn = jest.fn()

  const entity = {id: 1, isGroup: true, group: {id: 1}}

  const entityObject = new Entity(entity)

  expect(console.warn).toBeCalled()
  expect(entityObject.isValid()).toEqual(false)
})

test('default entity type is assigned when not specified', () => {
  const entity = {id: 1}

  const entityObject = new Entity(entity)

  expect(entityObject.getEntity().type).toEqual('User')
})

test('default group type is assigned when not specified', () => {
  const entity = {id: 1, group: {id: 1}}

  const entityObject = new Entity(entity)

  expect(entityObject.getEntity().group.type).toEqual('UserGroup')
})

test('default entity displayName is assigned when not specified', () => {
  const entity = {id: 1}

  const entityObject = new Entity(entity)

  expect(entityObject.getEntity().displayName).toEqual('User-1')
})

test('default group displayName is assigned when not specified', () => {
  const entity = {id: 1, group: {id: 1}}

  const entityObject = new Entity(entity)

  expect(entityObject.getEntity().group.displayName).toEqual('UserGroup-1')
})

test('empty attributes do not count', () => {
  const entity1 = {id: 1, group: {id: 2}}
  const entity2 = {id: 1, group: {id: 2, attributes: {}}}

  const entityObject1 = new Entity(entity1)
  const entityObject2 = new Entity(entity2)

  expect(entityObject1.getEntity()).toEqual(entityObject2.getEntity())
})
