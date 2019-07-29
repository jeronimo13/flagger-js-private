<h1 align="center">Flagger</h1>

<p align="center">
    <strong>A feature flagging library for Node.js, React, and JavaScript</strong>
</p>

<p align="center">
    <a href="https://circleci.com/gh/airshiphq/flagger-js"><img src="https://circleci.com/gh/airshiphq/flagger-js.svg?style=svg" alt="CircleCI Build Status" /></a>
    <a href="https://codecov.io/gh/airshiphq/flagger-js"><img src="https://codecov.io/gh/airshiphq/flagger-js/branch/master/graph/badge.svg" alt="Coverage Status" /></a>
    <a href="https://david-dm.org/airshiphq/flagger-js"><img src="https://david-dm.org/airshiphq/flagger-js/status.svg" alt="David" /></a>
    <a href="https://david-dm.org/airshiphq/flagger-js"><img src="https://david-dm.org/airshiphq/flagger-js/dev-status.svg" alt="David" /></a>
</p>

Flagger is an open-source feature flagging library. Feature flags allows developers to deliver features quickly and safely with fine-grained control over who sees each feature. Flagger can be configured locally without setting up new services or making network requests.

This library aims to make feature flagging easy to set up by being:

- **Declarative**: The logic of who sees what feature is declared and managed in one centralized place (instead of scattered throughout code) to make feature flags simpler to predict and debug.
- **Performant**: Feature flags are resolved locally at runtime without incurring the cost of a network request.
- **High Resolution**: Allow targeting of any audience using a mixture of strategies, including individual users, %s of populations, groups, non-user entities, and more.
- **Developer-Friendly**: Exposes intuitive functions to developers that abstract away the unnecessary complexity of feature gating logic.

This library is a standalone solution for feature flagging, but also powers [Airship](https://www.airshiphq.com), a networked version of Flagger with a UI for managing flags and additional features for teams.

### Content

- [01 Installation](#01-installation)
- [02 Key Concepts](#02-key-concepts)
- [03 Configuring Flags](#03-configuring-flags)
- [04 Usage](#04-usage)
- [05 Compatibility](#05-compatibility)
- [06 Additional Resources](#06-additional-resources)

## 01 Installation

Flagger is available on public package repositories.

| Source     | Install                                                                      |
| ---------- | ---------------------------------------------------------------------------- |
| npm        | `npm install --save flagger`                                                 |
| yarn       | `yarn add flagger`                                                           |
| bower      | `bower install --save flagger`                                               |
| in browser | `<script src="https://d2or86eailfls8.cloudfront.net/2/flagger.js"></script>` |

#### Importing Flagger

```javascript
// In CommonJS
var Flagger = require('flagger')

// In ES2015 modules
import Flagger from 'flagger'
```

## 02 Key Concepts

In Flagger, feature [**flags**](docs/concepts.md#flags) control traffic to generic objects (called [**entities**](docs/concepts.md#entities)). The most common type for entities is `User`, but they can also be other things (i.e. `Page`, `Group`, `Team`, `App`, etc.). By default, all entities have the type `User`.

Learn about other concepts [here](docs/concepts.md).

## 03 Configuring Flags

Feature flags are initialized by called [`Flagger.configure(options)`](docs/api-reference.md#airshipconfigureoptions). All flags are declared with a set of rules in a standard format that define how users / entities are targeted. These flagging rules can be defined in 2 ways:

- [**Configuring Flagger (free)**](docs/configuring-core.md): Define rules in a standard JSON format passed directly to the `configure` function.
- [**Configuring Airship (paid)**](docs/configuring-cloud.md): Flag configurations are created and hosted on [**AirshipHQ**](https://www.airshiphq.com) through a UI console that also adds additional features including: multivariate flags, groups, real-time updates, A/B testing, multiple populations, dynamic payloads, history tracking, and more.

## 04 Usage

Once flags are configured, a few simple functions resolve whether a user has access to a feature. A flag has several "gating" functions that can be used to resolve feature access permissions. The most commonly used one is `flag.isEnabled()`.

```javascript
var user = {id: 1} // the simplest acceptable user only consists of a unique ID

var flag = Flagger.flag('bitcoin-pay')
console.log(
  'Bitcoin payments are',
  flag.isEnabled(user) ? 'enabled' : 'disabled'
)
// => Bitcoin payments are enabled

if (flag.isEnabled(user)) {
  // show Bitcoin payment button
}
```

To see the rest of the Flagger API, check out the full [**API Reference**](docs/api-reference.md).

### Flagger for React

Flagger also includes a toolkit of React components to make feature flagging in React applications easy.

**Simple Example**

```jsx
<Flag flag="bitcoin-pay" case="on" entity={user}>
  <BitcoinPaymentButton />
</Flag>
```

**Another Example**

```jsx
<FlagProvider flagConfig={flagConfig} entity={user}>
  <FlagSwitch flag="bitcoin-pay">
    <Flag case="on">
      <BitcoinPaymentButton />
    </Flag>
    <Flag case="off">
      <PaypalPaymentButton />
    </Flag>
  </FlagSwitch>
</FlagProvider>
```

See [**Flagger for React**](docs/react.md) for full documentation.

## 05 Compatibility

Flagger supports a wide range of JavaScript platforms, including NodeJS, browsers, and React apps.

| Platform | Supported Versions                                 |
| -------- | -------------------------------------------------- |
| Node.js  | Node 8+                                            |
| Browsers | Chrome 23+, Firefox 21+, Safari 6+, IE9+, Edge 12+ |
| React    | v15.0.0+                                           |

## 06 Additional Resources

- [Concepts](docs/concepts.md)
- [API Reference](docs/api-reference.md)

## Migrating from v1?

Formerly, the repository was called `airship-js` for the JS version and `airship-nodejs` for the Node.js version, and they were separate. If you were using `airship-js` or `airship-nodejs`, note that they have been merged into this package. This package is backward compatible. Once you install `flagger`, all you need to change is to import `Airship` from `flagger/compat`.

```js
import Airship from 'flagger/compat'
```

## License

Release under the [MIT License](LICENSE.md)
