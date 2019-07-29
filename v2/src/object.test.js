import AirshipObject from './object'

describe.skip('validation tests are skipped', () => {
  test('object with only int id is valid', () => {
    const o = {id: 1}
    expect(AirshipObject.isValidObject(o)).toEqual(true)
  })

  test('object with only string id is valid', () => {
    const o = {id: '1'}
    expect(AirshipObject.isValidObject(o)).toEqual(true)
  })

  test('object with int id and string displayName is valid', () => {
    const o = {id: 1, displayName: '1'}
    expect(AirshipObject.isValidObject(o)).toEqual(true)
  })

  test('object with empty attributes is valid', () => {
    const o = {id: 1, displayName: '1', attributes: {}}
    expect(AirshipObject.isValidObject(o)).toEqual(true)
  })

  test('empty object is not valid', () => {
    const o = {}
    expect(AirshipObject.isValidObject(o)).toEqual(false)
  })

  test('object missing id is not valid', () => {
    const o = {displayName: '1'}
    expect(AirshipObject.isValidObject(o)).toEqual(false)
  })

  test('object with int displayName is not valid', () => {
    const o = {id: 1, displayName: 1}
    expect(AirshipObject.isValidObject(o)).toEqual(false)
  })

  test('object with unlisted property is not valid', () => {
    const o = {id: 1, anotherProperty: true}
    expect(AirshipObject.isValidObject(o)).toEqual(false)
  })

  test('group with only int id is valid', () => {
    const o = {id: 1, displayName: '1', group: {id: 2}}
    expect(AirshipObject.isValidObject(o)).toEqual(true)
  })

  test('group with only string id is valid', () => {
    const o = {id: 1, displayName: '1', group: {id: '2'}}
    expect(AirshipObject.isValidObject(o)).toEqual(true)
  })

  test('group with int id and string displayName is valid', () => {
    const o = {id: 1, displayName: '1', group: {id: 2, displayName: '2'}}
    expect(AirshipObject.isValidObject(o)).toEqual(true)
  })

  test('group with empty attributes is valid', () => {
    const o = {id: 1, displayName: '1', group: {id: 2, attributes: {}}}
    expect(AirshipObject.isValidObject(o)).toEqual(true)
  })

  test('empty group is not valid', () => {
    const o = {id: 1, displayName: '1', group: {}}
    expect(AirshipObject.isValidObject(o)).toEqual(false)
  })

  test('group missing id is not valid', () => {
    const o = {id: 1, displayName: '1', group: {displayName: '2'}}
    expect(AirshipObject.isValidObject(o)).toEqual(false)
  })

  test('group with int displayName is not valid', () => {
    const o = {id: 1, displayName: '1', group: {id: 2, displayName: 2}}
    expect(AirshipObject.isValidObject(o)).toEqual(false)
  })

  test('group with unlisted property is not valid', () => {
    const o = {id: 1, displayName: '1', group: {id: 2, anotherProperty: true}}
    expect(AirshipObject.isValidObject(o)).toEqual(false)
  })

  test('object validation works for valid attributes', () => {
    const o1 = {
      id: 1,
      attributes: {age: 18, height: 183.2, date: '2018-11-11', name: 'Chuck'}
    }
    expect(AirshipObject.isValidObject(o1)).toEqual(true)
  })

  test('object attribute cannot have space in its name', () => {
    const o = {id: 1, attributes: {'age now': 18}}
    expect(AirshipObject.isValidObject(o)).toEqual(false)
  })

  test('object attribute cannot have empty array as value', () => {
    const o = {id: 1, attributes: {arr: []}}
    expect(AirshipObject.isValidObject(o)).toEqual(false)
  })

  test('object attribute name cannot be more than 50 chars', () => {
    const o = {
      id: 1,
      attributes: {abcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdea: true}
    }
    expect(AirshipObject.isValidObject(o)).toEqual(false)
  })

  test('object attribute value cannot be null', () => {
    const o = {id: 1, attributes: {height: null}}
    expect(AirshipObject.isValidObject(o)).toEqual(false)
  })

  test('object attribute value cannot have more than 3000 chars', () => {
    let s = ''
    while (s.length <= 3000) {
      s += Math.random()
        .toString(36)
        .substring(7)
    }

    const o = {id: 1, attributes: {label: s}}
    expect(AirshipObject.isValidObject(o)).toEqual(false)
  })

  test('a group object should have explicit `isGroup: true`', () => {
    const o = {id: 1, type: 'UserGroup'}

    expect(AirshipObject.isValidObject(o)).toEqual(false)
  })

  test('object hashes should be same because int id gets cast into string', () => {
    const o1 = {id: 1}
    const o2 = {id: '1'}

    expect(new AirshipObject(o1).getHash()).toEqual(
      new AirshipObject(o2).getHash()
    )
  })

  test('object hashes should be same because displayName is the same as casted string id if omitted', () => {
    const o1 = {id: 1}
    const o2 = {id: 1, displayName: '1'}

    expect(new AirshipObject(o1).getHash()).toEqual(
      new AirshipObject(o2).getHash()
    )
  })

  test('object hashes should be same because empty attributes do not count', () => {
    const o1 = {id: 1}
    const o2 = {id: 1, attributes: {}}

    expect(new AirshipObject(o1).getHash()).toEqual(
      new AirshipObject(o2).getHash()
    )
  })

  test('object hashes should be same because isGroup is false by default', () => {
    const o1 = {id: 1}
    const o2 = {id: 1, isGroup: false}

    expect(new AirshipObject(o1).getHash()).toEqual(
      new AirshipObject(o2).getHash()
    )
  })

  test('object hashes should be different because one has a group', () => {
    const o1 = {id: 1}
    const o2 = {id: 1, group: {id: 2}}

    expect(new AirshipObject(o1).getHash()).not.toEqual(
      new AirshipObject(o2).getHash()
    )
  })

  test('group object hashes should be same because int id gets cast into string', () => {
    const o1 = {id: 1, group: {id: 2}}
    const o2 = {id: 1, group: {id: '2'}}

    expect(new AirshipObject(o1).getHash()).toEqual(
      new AirshipObject(o2).getHash()
    )
  })

  test('group object hashes should be same because displayName is the same as casted string id if omitted', () => {
    const o1 = {id: 1, group: {id: 2}}
    const o2 = {id: 1, group: {id: 2, displayName: '2'}}

    expect(new AirshipObject(o1).getHash()).toEqual(
      new AirshipObject(o2).getHash()
    )
  })

  test('group object hashes should be same because empty attributes do not count', () => {
    const o1 = {id: 1, group: {id: 2}}
    const o2 = {id: 1, group: {id: 2, attributes: {}}}

    expect(new AirshipObject(o1).getHash()).toEqual(
      new AirshipObject(o2).getHash()
    )
  })

  test('group object hashes should be same because isGroup for group is true by default', () => {
    const o1 = {id: 1, group: {id: 2}}
    const o2 = {id: 1, group: {id: 2, attributes: {}, isGroup: true}}

    expect(new AirshipObject(o1).getHash()).toEqual(
      new AirshipObject(o2).getHash()
    )
  })

  test('object hashes should be same because order of properties do not matter', () => {
    const o1 = {id: 1, attributes: {age: 18, height: 183.2}}
    const o2 = {id: '1', attributes: {height: 183.2, age: 18}}

    expect(new AirshipObject(o1).getHash()).toEqual(
      new AirshipObject(o2).getHash()
    )
  })

  test('object hashes should be different because ids are different', () => {
    const o1 = {id: 1}
    const o2 = {id: '1.0'}

    expect(new AirshipObject(o1).getHash()).not.toEqual(
      new AirshipObject(o2).getHash()
    )
  })

  test('object hashes should be different because one has a displayName (not equal to what would have been casted)', () => {
    const o1 = {id: 1}
    const o2 = {id: 1, displayName: 'a'}

    expect(new AirshipObject(o1).getHash()).not.toEqual(
      new AirshipObject(o2).getHash()
    )
  })
})
