# Configuring Flagger

Flagger allows developers to define feature flag logic in a standard format (defined here). The feature flag rules themselves can be maintained anywhere ([some ideas here](#04-flagconfig-source)).

This document describes the standard format that [`Flagger.configure()`](api-reference.md#flaggerconfigureoptions) relies on.

- [01 Initializing & Updating Flags](#01-initializing--updating-flags)
- [02 `flagConfig` Format](#02-flagconfig-format)
- [03 Population Criteria](#03-population-criteria)
- [04 `flagConfig` Source](#04-flagconfig-source)
- [Additional Resources](#additional-resources)

## 01 Initializing & Updating Flags

[`Flagger.configure(options)`](api-reference.md#flaggerconfigureoptions) can be called at any time to update feature flag rules of the Flagger class singleton. To configure Flagger, a `flagConfig` object is included in `options`.

```js
Flagger.configure({flagConfig: {...}}) // The structure of flagConfig is described below
```

The `.configure()` method returns a Promise. Once resolved, flags will be set up and ready to be used.

## 02 `flagConfig` Format

`flagConfig` is a dictionary mapping string feature names to a set of rules the describe how Flagger should perform feature gating on users. Each key in the dictionary represents one of several strategies used to target users. Strategies can be mixed-and-matched.

| Strategy         | Description                                                                                                                                                                                                                                                                                                                                                 | Key          | Values                                                            | Default                   |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ----------------------------------------------------------------- | ------------------------- |
| **Whitelisting** | Enable a feature for a specific set of users                                                                                                                                                                                                                                                                                                                | `whitelist`  | Array of user IDs (strings or integers)                           | `[]`                      |
| **Blacklisting** | Explicitly ban certain users from a feature                                                                                                                                                                                                                                                                                                                 | `blacklist`  | Array of user IDs (strings or integers)                           | `[]`                      |
| **Population**   | Choose users who meet certain criteria, based on user attributes (e.g., location, browser, or customer attributes) by defining criteria. All the criteria are connected with the `AND` logical operator, meaning users must meet all criteria. _**Note:** The default population for any flag is all users._ See [Population Criteria](#populationcriteria) | `population` | Array of dictionaries that describe criteria (see examples below) | `[] // matches all users` |
| **Sampling %**   | A random sample of the current population (by default, a 0% sample of all users).                                                                                                                                                                                                                                                                           | `sample`     | Float representing percentage (0.0 - 1.0)                         | `0.0`                     |
| **Active**       | Basically a kill switch for the entire flag. If this is set to `false`, the flag will be turned off for all users.                                                                                                                                                                                                                                          | `active`     | Boolean                                                           | `true`                    |

All of these strategies can be combined together. Here's an example of a `flagConfig` object with 4 flags:

**Example**

```js
/* Flag config example */
const flagConfig = {
  // WHITELIST / BLACKLIST EXAMPLE
  // Whitelist and blacklist some users for a new feature called 'cool-new-feature'
  'cool-new-feature': {
    whitelist: [54, 64, 23],
    blacklist: [43, 34]
  },

  // POPULATION EXAMPLE
  // Only Canadian users under 15 can catch the rarest Pokémon. Feature name is 'super-rare-pokemon'.
  'super-rare-pokemon': {
    population: [
      {attribute: 'country', operation: 'IS', value: 'Canada'},
      {attribute: 'age', operation: 'LT', value: 15}
    ]
  },

  // SAMPLING EXAMPLE
  // Rollout a new dashboard called 'new-dashboard' to only 15% of all users
  'new-dashboard': {
    sample: 0.15
  },

  // MIX AND MATCH
  // Use them all. Feature name is 'more-ads'. More ads for 30% of all users in USA, Canada,
  // Dubai under the age of 40, as well as users with IDs 45, 34, 84. Exclude users
  // with IDs 43, 35, 65.
  'more-ads': {
    population: [
      {
        attribute: 'country',
        operation: 'IN',
        value: ['USA', 'CANADA', 'DUBAI']
      },
      {attribute: 'age', operation: 'LT', value: 40}
    ],
    sample: 0.3,
    whitelist: [45, 34, 84],
    blacklist: [43, 35, 65],
    active: true
  }
}
```

## 03 Population Criteria

A population consists of a list of criteria: each is a dictionary representing a filter. The dictionary must have:

| Key         | Description                                                              | Allowed Values                                                                               | Required |
| ----------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- | -------- |
| `attribute` | The attribute of an user object used in the filter                       | Any `string`                                                                                 | Yes      |
| `operator`  | The operator used to compare with the attribute value of the user object | `IS`, `IS_NOT`, `IN`, `NOT_IN`, `GT`, `GTE`, `LT`, `LTE`, `BEFORE`, `AFTER`, `FROM`, `UNTIL` | Yes      |
| `value`     | The value to compare the attribute of the user object with               | A `number`, `string`, `boolean`, or an array of `number`'s, `string`'s                       | Yes      |

The operators `GT`, `GTE`, `LT`, and `LTE` represent "greater than", "greater than or equal to", "less than", and "less than or equal to". `BEFORE`, `AFTER`, `FROM`, and `UNTIL` represent `<`, `>`, `>=`, and `<=` for dates and datetimes.

Every criteria is `AND`ed together, meaning only users that meet all the criteria will be considered part of the population.

## 04 `flagConfig` source

Flagger is not opinionated about where `flagConfig` is stored and maintained. But here are some ideas that work well in practice for managing feature flags.

- **Inline** - Configure feature flag rules inline when you call [`Flagger.configure()`](api-reference.md#flaggerconfigureoptions)
- **JSON File** - A flat `.json` file in your repo that manages feature configurations; import the file when initializing.
- **Custom UI** - Create a custom UI to manage feature flag rules. As long as it outputs feature flag rules in the standardized format, it can look any way you want and the gating functions will work seamlessly. Serve the rules from your own endpoint, and feed into `Flagger.configure()`.

## Additional Resources

Another option is to use Airship, a service hosted at [**AirshipHQ**](https://www.airshiphq.com) that generates, stores, and serves flag configurations to Flagger. Airship also generates more complex configurations, including:

- **Multivariate Flags** - Flags with multiple treatments (not just `on`/`off`)
- **User Groups** - Enable features for entire groups (not just individual users)
- **Non-User Entities** - Entities can also be other things (i.e., `Page`, `Team`, `App`, etc.)
- **Multiple Populations** - Sample percentages of multiple populations, not just one.
- **JSON Payloads** - Deliver a JSON payload with each treatment that can be dynamically modified through Airship.
- **Experiment Flags (w/ sticky allocations)** - Experiment Flags ensure A/B test result validity by persisting allocations.

Flagger configurations are also served in real-time - meaning updates are reflected without needing to call `Flagger.configure(options)` again or redeploying your code. See [Configuring Airship](configuring-airship.md) to learn more.
