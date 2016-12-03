# redux-common-reducers :hatching_chick:

[![npm package](https://img.shields.io/npm/v/redux-common-reducers.svg)](https://www.npmjs.com/package/redux-common-reducers)
[![Build Status](https://travis-ci.org/try-again-apps/redux-common-reducers.svg?branch=master)](https://travis-ci.org/try-again-apps/redux-common-reducers)
[![Coverage Status](https://coveralls.io/repos/github/try-again-apps/redux-common-reducers/badge.svg?branch=master)](https://coveralls.io/github/try-again-apps/redux-common-reducers?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/try-again-apps/redux-common-reducers/ec3bcec2480c321eb508263b7ee48adacb5e17fb/badge.svg)](https://snyk.io/test/github/try-again-apps/redux-common-reducers/ec3bcec2480c321eb508263b7ee48adacb5e17fb)

[![dependencies Status](https://david-dm.org/try-again-apps/redux-common-reducers/status.svg)](https://david-dm.org/try-again-apps/redux-common-reducers)
[![devDependencies Status](https://david-dm.org/try-again-apps/redux-common-reducers/dev-status.svg)](https://david-dm.org/try-again-apps/redux-common-reducers?type=dev)

## Installation
```js
npm install -S redux-common-reducers
```
or
```js
yarn add redux-common-reducers
```
## Usage

### `booleanReducer(trueActions, falseActions, [initialValue = false])`
**Arguments**
* `trueActions (Array)` - The actions' names which sets value to `true`.
* `falseActions (Array)` - The actions' names which sets value to `false`.
* `[initialValue=false] (boolean)` - The initial value of state.

**Example**
```js
import { booleanReducer } from 'redux-common-reducers';

const myView = combineReducers({
  isDoingSth: booleanReducer(
    ['TRUE_ACTION1', 'TRUE_ACTION2'],
    ['FALSE_ACTION1', 'FALSE_ACTION2'],
    true)
})
```

is same as:

```js
const isDoingSth = (state = true, action) => {
  switch (action.type) {
    case 'TRUE_ACTION1':
    case 'TRUE_ACTION2':
      return true;
    case 'FALSE_ACTION1':
    case 'FALSE_ACTION2':
      return false;
    default:
      return state;
  }
}

const myView = combineReducers({
  isDoingSth
})
```

### `stringReducer(changeActions, resetActions, pathToValue, initialValue = '')`
**Arguments**
* `changeActions (Array)` - The actions' names which changes value of state.
* `resetActions (Array)` - The actions' names which resets value to default value (empty string).
* `pathToValue (Array|string)` - The path of the property to get. Lodash `get` is used under the hood so same rules apply as there. Check [`lodash.get`](https://lodash.com/docs/4.17.2#get) docs. :eyes:
* `[initialValue=''] (string)` - The initial value of state.

**Example**
```js
import { stringReducer } from 'redux-common-reducers';

const myView = combineReducers({
  name: stringReducer(
    ['CHANGE_ACTION1', 'CHANGE_ACTION2'],
    ['RESET_ACTION1'],
    'path.to.somewhere')
})
```
The `stringReducer` will look for value in `action.path.to.somewhere`.
This is action that will trigger change of `name` to `new value`:
```js
{ type: 'CAHNGE_ACTION1', path: { to: { somewhere: 'new value' } } }
```
