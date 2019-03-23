# API Reference

### Flagger

Flagger is a singleton with the following set of methods:

- [Flagger](#flagger)
  - [.configure(options)](#flaggerconfigureoptions)
  - [.identify(entity)](#flaggeridentifyentity)
  - [.flag(flagName)](#flaggerflagflagname)
  - [.setErrorListener(listener)](#flaggerseterrorlistenerlistener)
  - [.shutdown()](#flaggershutdown)

### Flag

Calling `Flagger.flag` returns a `Flag` instance, which has following methods:

- [Flag](#flag)
  - [.getType()](#flaggettype)
  - [.isEnabled(entity)](#flagisenabledentity)
  - [.isEligible(entity)](#flagiseligibleentity)
  - [.getPayload(entity)](#flaggetpayloadentity)
  - [.getTreatment(entity)](#flaggettreatmententity)

---

## Flagger methods

#### `Flagger.configure(options)`

Configures the rules used for feature flagging.

Locally provided rules (aka **Flagger**):

```javascript
Flagger.configure({ flagConfig: {...} });
// => Promise {<resolved>: undefined}
```

The structure of the flagConfig object is documented [here](configuring-flagger.md)

Hosted rules (aka **Airship**):

```javascript
Flagger.configure({envKey: 'onz2150xjon6pkjr'})
// => Promise {<pending>}
```

`envKey` is a key that you can obtain by signing up at [**AirshipHQ**](https://airshiphq.com)

`Flagger.configure` returns a `Promise`. You will need to wait for the `Promise` to be resolved before being able to call `Flagger.flag`:

```javascript
// using await keyword
await Flagger.configure({envKey: 'onz2150xjon6pkjr'})
var entity = {id: 1}
var flag = Flagger.flag('bitcoin-pay')
console.log(
  'Bitcoin payments are',
  flag.isEnabled(entity) ? 'enabled' : 'disabled'
)
// => Bitcoin payments are enabled
```

```javascript
// using Promise.then
Flagger.configure({envKey: 'onz2150xjon6pkjr'}).then(function() {
  var entity = {id: 1}
  var flag = Flagger.flag('bitcoin-pay')
  console.log(
    'Bitcoin payments are',
    flag.isEnabled(entity) ? 'enabled' : 'disabled'
  )
  // => Bitcoin payments are enabled
})
```

An option you can pass to `Flagger.configure` is `subscribeToUpdates`, which defaults to `true`.

```javascript
await Flagger.configure({envKey: 'onz2150xjon6pkjr', subscribeToUpdates: false})
```

Subscribing to updates makes the SDK listen for real-time updates to hosted rules, so that your application reflects the latest rules. In general, we recommend subscribing to updates on the backend, and not doing so on the front-end, so that your users do not see disappearing or appearing portions of the application on front-end re-renders.

#### `Flagger.identify(entity)`

Identifies a default entity to be used when entity is omitted from flag methods.

```javascript
var user = {id: 1}
Flagger.identify(user)
var flag = Flagger.flag('bitcoin-pay')

flag.isEnabled()
// => true
flag.isEnabled(user)
// => true
```

This is most commonly used to identify the signed on user in a front-end application, so that subsequent method calls to `flag` objects can omit the `entity` argument. In other words, it sets the default `entity`.

#### `Flagger.publish(entities)`

Identifies an array of entities. **Available for Airship**

```javascript
var user1 = {id: 1}
var user2 = {id: 2}
Flagger.publish([user1, user2])
// => Promise {<pending>}
```

This is most commonly used to batch identify entities to the hosted service. Usually, entity information is identified and sent to the hosted service lazily on a periodic basis, but this will do so immediately. Recommended usage is to batch publish all the users (or entities) for a specific flag before you deploy the flag in code so that you have a bird's-eye view of the audience upfront. This method is not needed for most workflows.

#### `Flagger.flag(flagName)`

Returns a flag object associated with the given `flagName`.

```javascript
var flag = Flagger.flag('bitcoin-pay')
flag.isEnabled({id: 1})
// => true
```

#### `Flagger.setErrorListener(listener)`

Sets a function to receive error messages. By default, error messages are output using `console.error`.

```javascript
var errorMessages = []
function errorListener(errorMessage) {
  errorMessages.push(errorMessage)
}

Flagger.setErrorListener(errorListener)

// bad entity
Flagger.identify({displayName: 'Joe'})

errorMessages
// => ["Each entity must have an `id` field"]
```

#### `Flagger.shutdown()`

Cleans up resources allocated during `Flagger.configure`.

```javascript
await Flagger.shutdown()
```

## Flag methods

#### `flag.getType()`

Gets the type of flag.

```javascript
Flagger.flag('bitcoin-pay').getType()
// => "basic"

Flagger.flag('unknown-flag-with-no-rules').getType()
// => "uncategorized"
```

#### `flag.isEnabled(entity)`

Determines if flag is enabled for entity

```javascript
var flag = Flagger.flag('bitcoin-pay')
flag.isEnabled({id: 1})
// => true
```

**To test a group entity directly, make sure to set `isGroup: true` on the group entity object**

```javascript
var groupEntity = {id: 5, displayName: 'BitcoinExchangeUsers', isGroup: true}
var flag = Flagger.flag('bitcoin-pay')
flag.isEnabled(groupEntity)
```

#### `flag.isEligible(entity)`

Determines if entity is within the targeted populations. **Unavailable in Flagger (w/o Airship)**

```javascript
var flag = Flagger.flag('bitcoin-pay')
flag.isEligible({id: 1})
// => true
```

**To test a group entity directly, make sure to set `isGroup: true` on the group entity object**

```javascript
var groupEntity = {id: 5, displayName: 'BitcoinExchangeUsers', isGroup: true}
var flag = Flagger.flag('bitcoin-pay')
flag.isEligible(groupEntity)
```

#### `flag.getPayload(entity)`

Retrieves the payload associated with the treatment assigned to the entity. **Unavailable in Flagger (w/o Airship)**

```javascript
var flag = Flagger.flag('bitcoin-pay')
flag.getPayload({id: 1})
// => {"bitcoin-price": "$9001"}
```

**To test a group entity directly, make sure to set `isGroup: true` on the group entity object**

```javascript
var groupEntity = {id: 5, displayName: 'BitcoinExchangeUsers', isGroup: true}
var flag = Flagger.flag('bitcoin-pay')
flag.getPayload(groupEntity)
```

#### `flag.getTreatment(entity)`

Retrieves the treatment assigned to the entity in a multivariate flag. **Unavailable in Flagger (w/o Airship)**

```javascript
var flag = Flagger.flag('color-theme')
flag.getTreatment({id: 1})
// => "purple"
```

**To test a group entity directly, make sure to set `isGroup: true` on the group entity object**

```javascript
var groupEntity = {id: 9, displayName: 'LavenderLovers', isGroup: true}
var flag = Flagger.flag('color-theme')
flag.getTreatment(groupEntity)
```
