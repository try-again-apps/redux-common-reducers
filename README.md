# redux-common-reducers

[![Build Status](https://travis-ci.org/try-again-apps/redux-common-reducers.svg?branch=master)](https://travis-ci.org/try-again-apps/redux-common-reducers)
[![Coverage Status](https://coveralls.io/repos/github/try-again-apps/redux-common-reducers/badge.svg?branch=master)](https://coveralls.io/github/try-again-apps/redux-common-reducers?branch=master)

[![dependencies Status](https://david-dm.org/try-again-apps/redux-common-reducers/status.svg)](https://david-dm.org/try-again-apps/redux-common-reducers)
[![devDependencies Status](https://david-dm.org/try-again-apps/redux-common-reducers/dev-status.svg)](https://david-dm.org/try-again-apps/redux-common-reducers?type=dev)

## Installation

## Usage

<!-- ### `booleanReducer(type, payloadCreator = Identity, ?metaCreator)` -->

<!-- Got tired of writing same 'small' reducers for simple types?-->

### booleanReducer([], [], initialState = false)

```js
const isSending = (state = false, action) => {
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

const isDoingSth = (state = true, action) => {
  switch (action.type) {
    case 'TRUE_ACTION3':
    case 'TRUE_ACTION4':
      return true;
    case 'FALSE_ACTION3':
    case 'FALSE_ACTION4':
      return false;
    default:
      return state;
  }
}

const myView = combineReducers({
  isFetching,
  isSending
})
```

Replace whole that code with this:

```js
import { booleanReducer } from 'redux-common-reducers';

const myView = combineReducers({
  isDoingSth: booleanReducer(
    ['TRUE_ACTION3', 'TRUE_ACTION4'],
    ['FALSE_ACTION3', 'FALSE_ACTION4']),
  isSending: booleanReducer(
    ['TRUE_ACTION1', 'TRUE_ACTION2'],
    ['FALSE_ACTION1', 'FALSE_ACTION2'],
    true)
})
```

### stringReducer([], [], path, initialState = '')

```js
const action = {
  type: 'CHANGE_ACTION1',
  payload: {
    name: 'Starlord',
    surname: 'Who knows?'
  }
};
```

```js
import { stringReducer } from 'redux-common-reducers';

const myView = combineReducers({
  name: stringReducer(
    ['CHANGE_ACTION1'],
    ['RESET_ACTION1'],
    ['name']),
  surname: stringReducer(
    ['CHANGE_ACTION1'],
    [], // no action for RESET - we just don't want to clear it
    ['surname'],
    'Smith')
})
```


```js
import { stringReducer } from 'redux-common-reducers';

const myView = combineReducers({
  name: stringReducer(
    ['CHANGE_ACTION1', 'CHANGE_ACTION2'],
    ['RESET_ACTION1'],
    ['path', 'to', 'name', 'value']),
  surname: stringReducer(
    ['CHANGE_ACTION2'],
    ['RESET_ACTION1', 'RESET_ACTION2'],
    ['path', 'to', 'surname', 'value'],
    'Smith')
})
```
