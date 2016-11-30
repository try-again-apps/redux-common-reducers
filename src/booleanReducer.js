export default function booleanReducer(trueActions, falseActions, initialState) {
  return function(state, action) {
    if (initialState !== undefined) {
      state = initialState;
    }

    if (~trueActions.indexOf(action.type)) {
      return true;
    }

    if (~falseActions.indexOf(action.type)) {
      return false;
    }

    return state;
  };
}
