import _sample from 'lodash.sample';
import { stringReducer } from '../src';

const changeActions = ['CHANGE_ACTION1', 'CHANGE_ACTION2', 'CHANGE_ACTION3'];
const resetActions = ['RESET_ACTION1', 'RESET_ACTION2'];
const unknownAction = 'UNKNOWN_ACTION';
const currentState = 'reduce me!';

describe("stringReducer", () => {
  describe("reducer init", () => {
    it("returns default value on init", () => {
      const reducer = stringReducer(changeActions, resetActions, ['path']);
      const action = { type: "@@INIT" };
      expect(reducer(undefined, action)).toBe('');
    });
  });

  describe("no initial state, unknown action", () => {
    it("returns current state if initial not set", () => {
      const reducer = stringReducer(changeActions, resetActions, ['path']);
      const action = { type: unknownAction, payload: { path: 'reduced by me!' } };
      expect(reducer(currentState, action)).toBe(currentState);
    });
  });

  describe("initial state set, unknown action", () => {
    it("returns initial state when set", () => {
      const reducer = stringReducer(changeActions, resetActions, ['path'], 'initialize me!');
      const action = { type: unknownAction, payload: { path: 'reduced by me!' } };
      expect(reducer(currentState, action)).toBe('initialize me!');
    });
  });

  describe("change actions", () => {
    it("returns value from action, initial state not set", () => {
      const reducer = stringReducer(changeActions, resetActions, ['path']);
      const action = { type: _sample(changeActions), payload: { path: 'reduced by me!' } };
      expect(reducer(currentState, action)).toBe('reduced by me!');
    });
    it("returns value from action, initial state set", () => {
      const reducer = stringReducer(changeActions, resetActions, ['path'], 'initialize me!');
      const action = { type: _sample(changeActions), payload: { path: 'reduced by me!' } };
      expect(reducer(currentState, action)).toBe('reduced by me!');
    });
  });

  describe("reset actions", () => {
    it("returns '' value, initial state not set, payload ignored", () => {
      const reducer = stringReducer(changeActions, resetActions, ['path']);
      const action = { type: _sample(resetActions), payload: { path: 'reduced by me!' } };
      expect(reducer(currentState, action)).toBe('');
    });
    it("returns value from action, initial state set, payload ignored", () => {
      const reducer = stringReducer(changeActions, resetActions, ['path'], 'initialize me!');
      const action = { type: _sample(resetActions), payload: { path: 'reduced by me!' } };
      expect(reducer(currentState, action)).toBe('');
    });
  });
});
