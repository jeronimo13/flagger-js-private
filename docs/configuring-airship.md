# Configuring Airship\*

**\*Only for Airship customers**

Airship is a paid service that stores the rules that Flagger can use--it provides a UI for creating & managing feature flags, as well as infrastructure to deliver flag configurations in real-time without re-deploying your own code. By using Airship, you can easily de-couple code deployment and feature launches easily - without having to build or maintain your own feature flag service.

In addition, Airship delivers additional feature flagging capabilities, including:

- **Multivariate Flags** - Flags with multiple treatments (not just `on`/`off`)
- **User Groups** - Enable features for entire groups (not just individual users)
- **Non-User Entities** - Entities can also be other things (i.e., `Page`, `Team`, `App`, etc.)
- **Multiple Populations** - Sample percentages of multiple populations, not just one.
- **JSON Payloads** - Deliver a JSON payload with each treatment that can be dynamically modified through Airship.
- **Experiment Flags (w/ sticky allocations)** - Experiment Flags ensure A/B test result validity by persisting allocations.

## Connecting to Airship

[`Flagger.configure(options)`](api-reference.md#flaggerconfigureoptions) connects the library to Airship. To initiate the connection, find your **Environment Key** (aka `envKey`) in [Project & Environments Settings](https://app.airshiphq.com/settings/projects/).

```javascript
Flagger.configure({envKey: 'onz2150xjon6pkjr'})
// => Promise {<pending>}
```

**Note**: `Flagger.configure()` returns a `Promise`. Once it's resolved, gating functions are available to use.

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

That's it! `Flagger.configure()` only needs to be called once. When connected to Airship, Flagger receives real-time updates whenever flag configurations are tweaked.
