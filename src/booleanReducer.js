export default function booleanReducer(trueActions, falseActions, initialValue = false) {
  if (typeof(initialValue) !== 'boolean') {
    throw new TypeError('Initial state needs to be boolean');
  }

  return (state = initialValue, action) => {
    if (~trueActions.indexOf(action.type)) {
      return true;
    }

    if (~falseActions.indexOf(action.type)) {
      return false;
    }

    return state;
  };
}
