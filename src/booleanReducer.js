export default function booleanReducer(
  { trueActions = [], falseActions = [], toggleActions = [] },
  initialValue = false
) {
  if (typeof initialValue !== "boolean") {
    throw new TypeError("Initial state needs to be boolean");
  }

  return (state = initialValue, action) => {
    if (~trueActions.indexOf(action.type)) {
      return true;
    } else if (~falseActions.indexOf(action.type)) {
      return false;
    } else if (~toggleActions.indexOf(action.type)) {
      return !state;
    }

    return state;
  };
}
