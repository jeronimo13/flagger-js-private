# Flagger for React

## Introduction

Flagger is an open-source library for feature flagging. Feature flagging allows teams to deliver features quickly and safely by giving them fine-grained control over when and which users are able to access new features.

## Concepts

Before using this library, it will help to understand some of the [concepts documented](concepts.md).

## Installation

In a browser:

```html
<script src="https://d2or86eailfls8.cloudfront.net/2/flagger-react.js"></script>
```

Using npm:

```javascript
npm install --save flagger
```

In Node.js:

```javascript
const {FlagProvider, FlagSwitch, Flag, withFlag} = require('flagger/react')
```

In ES2015 modules:

```javascript
import {FlagProvider, FlagSwitch, Flag, withFlag} from 'flagger/react'
```

## API

### `<FlagProvider>`

Configures the rules used for feature flagging.

```jsx
<FlagProvider
  envKey={optionalString}
  flagConfig={optionalObject}
  entity={optionalObject}
  loadingView={optionalNode}
  subscribeToUpdates={optionalBoolean}>
  <App />
</FlagProvider>
```

**This should be top-level singleton in your application. Do not create more than one FlagProvider.**

**envKey: string**

The environment key used to connect to Airship (paid)

**flagConfig: object**

The locally provided flag rules to use with Flagger (free). Structure of the object documented [here](flagconfig.md).

**entity: object**

The default entity to check the flag treatment for.

**loadingView: node**

What to show while fetching flag rules from Airship.

**subscribeToUpdates: bool**

Whether to subscribe to updates to flag rules from Airship and automatically re-render when the flag rules change. Defaults to `false`.

### `<FlagSwitch>`

Fills in missing `flag` and optionally `entity` properties for `<Flag>` elements, **which must be direct children**.

```jsx
<FlagSwitch flag={requiredString} entity={optionalEntity}>
  <Flag ... />
</FlagSwitch>
```

**flag: string**

The name of the flag.

**entity: object**

The entity to check the flag treatment for.

### `<Flag>`

Renders children based on whether the `case` prop matches the flag treatment for the `entity`.

```jsx
<Flag flag={optionalString} case={requiredString} entity={optionalObject}>
  Content to render when case matches flag treatment
</Flag>
```

- **`flag` prop is only optional when `<Flag>` is a direct child of a `<FlagSwitch>` element**.
- **`entity` is not optional if it is not inherited from `<FlagProvider>` or `<FlagSwitch>`**.
- `<Flag>` does not have to be a child of `<FlagSwitch>` and can be used standalone.

**flag: string**

The name of the flag.

**case: string**

The name of the flag treatment.

**entity: object**

The entity to check the flag treatment for.

### Examples

```jsx
<FlagProvider envKey="onz2150xjon6pkjr">
  <FlagSwitch flag="bitcoin-pay">
    <Flag entity={{id: 1}} case="on">
      <BitcoinPaymentButton />
    </Flag>
  </FlagSwitch>
</FlagProvider>
```

```jsx
<FlagProvider envKey="onz2150xjon6pkjr">
  <FlagSwitch flag="color-theme" entity={{id: 1}}>
    <Flag case="blue">
      <Background color="blue" />
    </Flag>
    <Flag case="lavender">
      <Background color="lavender" />
    </Flag>
    <Flag case="off">
      <Background color="default" />
    </Flag>
  </FlagSwitch>
</FlagProvider>
```

## Server side rendering

Since `FlagProvider` is an asynchronous component that requires time to configure. You may notice that it always renders the `loadingView` on server side rendering. To get around this you can configure Flagger ahead of time, so that `FlagProvider` becomes a synchronous component.

To do so, import Flagger from Flagger React and call configure on it:

```js
import {Flagger} from 'flagger/react'

await Flagger.configure({ ... })
```

You can read more documentation about `Flagger.configure` [here](api-reference.md#flaggerconfigureoptions).

You will need to configure ahead of time both on the server side and client side, so that the first initial render on the client side does not show `loadingView`.

On the server, we recommend passing in the option `{ subscribeToUpdates: true }`, while on the client side we recommend not doing so, so that the client side does not automatically re-render on hosted rule changes, which may be a jarring user experience.
