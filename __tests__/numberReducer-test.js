import _sample from 'lodash.sample';
import { numberReducer } from '../src';

const changeActions = ['CHANGE_ACTION1', 'CHANGE_ACTION2', 'CHANGE_ACTION3'];
const unknownAction = 'UNKNOWN_ACTION';

describe('numberReducer', () => {
  describe('should return the initial value', () => {
    it('initial value default (0)', () => {
      const reducer = numberReducer(changeActions);
      expect(reducer(undefined, {})).toBe(0);
    });
    it('initial value set to 42', () => {
      const reducer = numberReducer(changeActions, [], 42);
      expect(reducer(undefined, {})).toBe(42);
    });
  });

  describe('should return initial state on unknown action', () => {
    it('initial state default (0)', () => {
      const reducer = numberReducer(changeActions);
      expect(reducer(0, { type: unknownAction })).toBe(0);
    });
    it('initial state set to 42"', () => {
      const reducer = numberReducer(changeActions);
      expect(reducer(42, { type: unknownAction })).toBe(42);
    });
  });

  describe('should change state on handled action', () => {
    it('change state with change action, path to value as array', () => {
      const reducer = numberReducer(changeActions, ['payload', 'value']);
      expect(reducer(41, { type: _sample(changeActions), payload: { value: 42 } })).toBe(42);
    });
    it('change state with change action, path to value as string', () => {
      const reducer = numberReducer(changeActions, 'payload.value');
      expect(reducer(41, { type: _sample(changeActions), payload: { value : 42 } })).toBe(42);
    });
    it('throw error on change action if path is incorrect', () => {
      try {
        const reducer = numberReducer(changeActions, ['incorrect', 'path']);
        expect(reducer(41, { type: _sample(changeActions), payload: 42 })).toBe(42);
      }
      catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('should throw on incorrect type of initial value', () => {
    it('initial value set to String', () => {
      try {
        const reducer = numberReducer(changeActions, ['path'], '42');
        expect(reducer(undefined, {})).toBe(0);
      }
      catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    });
    it('initial value set to Boolean', () => {
      try {
        const reducer = numberReducer(changeActions, ['path'], true);
        expect(reducer(undefined, {})).toBe(0);
      }
      catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    });
  });
});
