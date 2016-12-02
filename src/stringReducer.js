import _get from 'lodash.get';
import _has from 'lodash.has';

export default function stringReducer(changeActions, resetActions, path, initialValue = '') {
  if (typeof(initialValue) !== 'string') {
    throw new TypeError('Initial state needs to be string');
  }

  return (state = initialValue, action) => {
    if (~changeActions.indexOf(action.type)) {
      if (!_has(action, path)) {
        throw new Error(`Path "${path.join('.')}" not found in action!`);
      }

      return _get(action, path);
    }

    if (~resetActions.indexOf(action.type)) {
      return '';
    }

    return state;
  };
}
