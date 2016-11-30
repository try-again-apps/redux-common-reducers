import _get from 'lodash/get';

export default function stringReducer(changeActions, resetActions, path, initialState) {
  return (state, action) => {
    if (initialState !== undefined) {
      state = initialState;
    }

    if (~changeActions.indexOf(action.type)) {
      return _get(action.payload, path);
    }

    if (~resetActions.indexOf(action.type)) {
      return '';
    }

    return state;
  };
}
