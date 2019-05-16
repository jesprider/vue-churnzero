# vue-churnzero

ChurnZero plugin for Vue

This plugin allows easily to bring ChurnZero script to your Vue application as well as it provides convenient methods to trigger events.

Main features:
* Asynchronous script loading
* Allows loading `appKey`, `accountId` and `contactId` asynchronously
* Automatic router tracking
* Vue directive for events
* No dependencies


## Requirements

Vue ^2.0.0


## Install

```bash
npm install vue-churnzero
```

or

```bash
yarn add vue-churnzero
```


## Getting started

After installing the package you can start using the plugin in your Vue application:

```js
import Vue from 'vue'
import VueChurnZero from 'vue-churnzero';

Vue.use(VueChurnZero, {
    appKey: YOUR_APP_KEY,
    accountId: USER_ACCOUNT_ID,
    contactId: USER_CONTACT_ID,
});
```

_Note:_ `appKey`, `accountId` and `contactId` can be promises. In this case, the plugin will start right after all the promises will be resolved.
In order not to lose users' events in the meantime, the plugin collects users' event to storage and fires them later.

Once you registered the plugin, you can start tracking the events. There are multiple ways how you can do it.


### Using instance method

In the component, you can access `trackEvent` method:

```js
export default {
    name: 'my-component',

    methods: {
        track() {
            this.$cz.trackEvent('event name');
        }
    }
}
```
Please refer to the [official ChurnZero documentation](https://support.churnzero.net/hc/en-us/articles/360004683552-Integrate-ChurnZero-using-Javascript
) on `trackEvent` arguments.
_Note:_ you shouldn't send trackEvent as the first argument. The plugin does it for you. You just need to specify one required field `eventName`.
`description`, `quantity` and `customFields` are all optional.


### Using directive

Alternatively, you can use vue directive to achieve the same effect.

```html
<template>
    <button v-cz="$cz.t(this, 'event name')">
        Click me
    </button>
</template>
```

`t` is a shorthand version of `trackEvent`. It binds trackEvent for you and allows you to save bytes in your components.
Nevertheless, you still can use the full method if you'd like to:

```html
<template>
    <button v-cz="$cz.trackEvent.bind(this, 'event name')">
        Click me
    </button>
</template>
```


### Using commands

If you want to keep all of you tracking methods separately in one place, you can specify commands object while initializing the plugin.

```js
import Vue from 'vue'
import VueChurnZero from 'vue-churnzero';

Vue.use(VueChurnZero, {
    appKey: YOUR_APP_KEY,
    accountId: USER_ACCOUNT_ID,
    contactId: USER_CONTACT_ID,
    commands: {
        trackButtonClick() {
            this.$cz.trackEvent('event name');
        }
    }
});
```

In this case, all you need is to specify the method name when using the directive:

```html
<template>
    <button v-cz="'trackButtonClick'">
        Click me
    </button>
</template>
```


## API

Coming soon
