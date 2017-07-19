import _get from 'lodash/get';
import _has from 'lodash/has';

export default function numberReducer(changeActions, path, initialValue = 0) {
  if (typeof(initialValue) !== 'number') {
    throw new TypeError('Initial state needs to be number');
  }

  return (state = initialValue, action) => {
    if (~changeActions.indexOf(action.type)) {
      if (!_has(action, path)) {
        throw new Error(`Path "${path.join('.')}" not found in action!`);
      }
      
      return _get(action, path);
    }

    return state;
  };
}
