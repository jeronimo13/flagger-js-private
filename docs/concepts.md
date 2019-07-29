## Concepts

### Entities

Entities are generic objects that are targeted by feature flagging rules. These are most commonly `User`s but can be anything else.

They have three common attributes: `type`, `id`, and `displayName`

```javascript
var entity = {
  type: 'User',
  id: '1234',
  displayName: 'ironman@stark.com'
}
```

- `type` is a [Pascal cased](http://wiki.c2.com/?PascalCase) string like `'User'` or `'HomeListing'`.
- `id` must be a string or integer.
- `displayName` must be a string.

Only `id` is necessary

```javascript
var entity = {id: '1234'}
```

- `type` will default to `'User'` if not provided.
- `displayName` will default to `id` casted as a string if not provided.

#### Attributes

Entities can be associated with attributes, which allow for more complex targeting rules.

```javascript
var entity = {
  id: '1234',
  attributes: {
    tShirtSize: 'M',
    dateCreated: '2018-02-18',
    timeConverted: '2018-02-20T21:54:00.630815+00:00',
    ownsProperty: true,
    age: 39
  }
}
```

- Attribute values must be a string, number of boolean. `null` values are not accepted.
- Use an ISO8601 format string for a date or date time.

#### Group Entities

Entities can also be part of group entities, useful for inheriting flag states. Group entities are same in structure as individual entities. _Multiple levels of hierarchy are not supported. Group entities cannot have a parent group entity._

```javascript
var entity = {
  type: 'User',
  id: '1234',
  displayName: 'ironman@stark.com',
  attributes: {
    tShirtSize: 'M',
    dateCreated: '2018-02-18',
    timeConverted: '2018-02-20T21:54:00.630815+00:00',
    ownsProperty: true,
    age: 39
  },
  group: {
    type: 'Club',
    id: '5678',
    displayName: 'SF Homeowners Club',
    attributes: {
      founded: '2016-01-01',
      active: true
    }
  }
}
```

This is the order of precedence for determining whether a flag is enabled for an entity within a group:

- Off if individual entity is blacklisted.
- On if individual entity is whitelisted.
- Off if group entity is blacklisted.
- On if group entity is whitelisted.
- On if individual entity is sampled.
- On if group entity is sampled.
- Off

### Flagging Rules

There are two ways to provide the flagging rules targeting entities.

- **Flagger**: Locally provided rules for boolean flags
- **Airship**: Rules hosted on [**AirshipHQ**](airshiphq.com), featuring a dashboard to create and manage rules, supporting multivariate flags, A/B testing, flag payloads, and more.
