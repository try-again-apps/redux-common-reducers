export default function booleanReducer(trueActions, falseActions, initialState) {
  return (state, action) => {
    if (initialState !== undefined) {
      state = initialState;
    }

    if (state === undefined) {
      state = false;
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
