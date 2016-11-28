import _sample from 'lodash/sample';
import { booleanReducer } from '../src';

const trueActions = ['TRUE_ACTION1', 'TRUE_ACTION2', 'TRUE_ACTION3'];
const falseActions = ['FALSE_ACTION1', 'FALSE_ACTION2'];
const unknownAction = 'UNKNOWN_ACTION';
const initialState = false;

describe("booleanReducer", () => {
  describe("initialState, unknown action", () => {
    it("returns false if not set", () => {
      const reducer = booleanReducer(trueActions, falseActions);
      const action = { type: unknownAction };
      expect(reducer(initialState, action)).toBe(false);
    });
    it("returns 'true' if set to 'true'", () => {
      const reducer = booleanReducer(trueActions, falseActions, true);
      const action = { type: unknownAction };
      expect(reducer(initialState, action)).toBe(true);
    });
    it("returns 'false' if set to 'false'", () => {
      const reducer = booleanReducer(trueActions, falseActions, false);
      const action = { type: unknownAction };
      expect(reducer(initialState, action)).toBe(false);
    });
  });

  describe("'false' actions", () => {
    it("returns 'false' for 'false' action; initialState set to 'false'", () => {
      const reducer = booleanReducer(trueActions, falseActions, false);
      const action = { type: _sample(falseActions) };
      expect(reducer(initialState, action)).toBe(false);
    });
    it("returns 'false' for 'false' action; initialState set to 'true'", () => {
      const reducer = booleanReducer(trueActions, falseActions, true);
      const action = { type: _sample(falseActions) };
      expect(reducer(initialState, action)).toBe(false);
    });
  });

  describe("'true' actions", () => {
    it("returns 'true' for 'true' action; initialState set to 'false'", () => {
      const reducer = booleanReducer(trueActions, falseActions, false);
      const action = { type: _sample(trueActions) };
      expect(reducer(initialState, action)).toBe(true);
    });
    it("returns 'true' for 'true' action; initialState set to 'true'", () => {
      const reducer = booleanReducer(trueActions, falseActions, true);
      const action = { type: _sample(trueActions) };
      expect(reducer(initialState, action)).toBe(true);
    });
  });

  describe("'false' => 'true' => 'false'", () => {
    const reducer = booleanReducer(trueActions, falseActions, false);
    it("return 'true' for current reducer state", () => {
      const action = { type: _sample(trueActions) };
      expect(reducer(initialState, action)).toBe(true);
    });
    it("return 'false' for current reducer state", () => {
      const action = { type: _sample(falseActions) };
      expect(reducer(initialState, action)).toBe(false);
    });
  });
});
