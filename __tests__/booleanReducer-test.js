import _sample from 'lodash/sample';
import { booleanReducer } from '../src';

const trueActions = ['TRUE_ACTION1', 'TRUE_ACTION2', 'TRUE_ACTION3'];
const falseActions = ['FALSE_ACTION1', 'FALSE_ACTION2'];
const unknownAction = 'UNKNOWN_ACTION';
const currentState = false;

describe("booleanReducer", () => {
  describe("reducer init", () => {
    it("returns default value on init", () => {
      const reducer = booleanReducer(trueActions, falseActions);
      const action = { type: "@@INIT" };
      expect(reducer(undefined, action)).toBe(false);
    });

    it("returns default value on init, initial set to true", () => {
      const reducer = booleanReducer(trueActions, falseActions, true);
      const action = { type: "@@INIT" };
      expect(reducer(undefined, action)).toBe(true);
    });
  });

  describe("no initial state, unknown action", () => {
    it("returns current state if initial not set", () => {
      const reducer = booleanReducer(trueActions, falseActions);
      const action = { type: unknownAction };
      expect(reducer(currentState, action)).toBe(currentState);
    });
  });

  describe("initial state set, unknown action", () => {
    it("returns 'true' if set to 'true'", () => {
      const reducer = booleanReducer(trueActions, falseActions, true);
      const action = { type: unknownAction };
      expect(reducer(currentState, action)).toBe(true);
    });
    it("returns 'false' if set to 'false'", () => {
      const reducer = booleanReducer(trueActions, falseActions, false);
      const action = { type: unknownAction };
      expect(reducer(currentState, action)).toBe(false);
    });
  });

  describe("'false' actions", () => {
    it("returns 'false' for 'false' action; initialState set to 'false'", () => {
      const reducer = booleanReducer(trueActions, falseActions, false);
      const action = { type: _sample(falseActions) };
      expect(reducer(currentState, action)).toBe(false);
    });
    it("returns 'false' for 'false' action; initialState set to 'true'", () => {
      const reducer = booleanReducer(trueActions, falseActions, true);
      const action = { type: _sample(falseActions) };
      expect(reducer(currentState, action)).toBe(false);
    });
  });

  describe("'true' actions", () => {
    it("returns 'true' for 'true' action; initialState set to 'false'", () => {
      const reducer = booleanReducer(trueActions, falseActions, false);
      const action = { type: _sample(trueActions) };
      expect(reducer(currentState, action)).toBe(true);
    });
    it("returns 'true' for 'true' action; initialState set to 'true'", () => {
      const reducer = booleanReducer(trueActions, falseActions, true);
      const action = { type: _sample(trueActions) };
      expect(reducer(currentState, action)).toBe(true);
    });
  });

  describe("'false' => 'true' => 'false'", () => {
    const reducer = booleanReducer(trueActions, falseActions, false);
    it("return 'true' for current reducer state", () => {
      const action = { type: _sample(trueActions) };
      expect(reducer(currentState, action)).toBe(true);
    });
    it("return 'false' for current reducer state", () => {
      const action = { type: _sample(falseActions) };
      expect(reducer(currentState, action)).toBe(false);
    });
  });
});
