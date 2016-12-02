export default function booleanReducer(trueActions, falseActions, initialState = false) {
  if (typeof(initialState) !== 'boolean') {
    throw new TypeError('Initial state needs to be boolean');
  }

  return (state = initialState, action) => {
    if (~trueActions.indexOf(action.type)) {
      return true;
    }

    if (~falseActions.indexOf(action.type)) {
      return false;
    }

    return state;
  };
}
