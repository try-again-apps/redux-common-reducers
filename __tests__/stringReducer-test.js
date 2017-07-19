import _sample from 'lodash.sample';
import { stringReducer } from '../src';

const changeActions = ['CHANGE_ACTION1', 'CHANGE_ACTION2', 'CHANGE_ACTION3'];
const resetActions = ['RESET_ACTION1', 'RESET_ACTION2'];
const unknownAction = 'UNKNOWN_ACTION';

describe('stringReducer', () => {
  describe('should return the initial value', () => {
    it('initial value default (empty string)', () => {
      const reducer = stringReducer(changeActions, resetActions);
      expect(reducer(undefined, {})).toBe('');
    });
    it('initial value set to "reduce me!"', () => {
      const reducer = stringReducer(changeActions, resetActions, [], 'reduce me!');
      expect(reducer(undefined, {})).toBe('reduce me!');
    });
  });

  describe('should return initial state on unknown action', () => {
    it('initial state default (empty string)', () => {
      const reducer = stringReducer(changeActions, resetActions);
      expect(reducer('', { type: unknownAction })).toBe('');
    });
    it('initial state set to "reduce me!"', () => {
      const reducer = stringReducer(changeActions, resetActions);
      expect(reducer('reduce me!', { type: unknownAction })).toBe('reduce me!');
    });
  });

  describe('should change state on handled action', () => {
    it('change state with change action, path to value as array', () => {
      const reducer = stringReducer(changeActions, resetActions, ['payload', 'value']);
      expect(reducer('reduce me!', { type: _sample(changeActions), payload: { value: 'new value' } })).toBe('new value');
    });
    it('change state with change action, path to value as string', () => {
      const reducer = stringReducer(changeActions, resetActions, 'payload.value');
      expect(reducer('reduce me!', { type: _sample(changeActions), payload: { value : 'new value' } })).toBe('new value');
    });
    it('throw error on change action if path is incorrect', () => {
      try {
        const reducer = stringReducer(changeActions, resetActions, ['incorrect', 'path']);
        expect(reducer('reduce me!', { type: _sample(changeActions), payload: 'new value' })).toBe('reduce me!');
      }
      catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
    it('reset state with reset action', () => {
      const reducer = stringReducer(changeActions, resetActions);
      expect(reducer('reduce me!', { type: _sample(resetActions) })).toBe('');
    });
    it('reset state with reset action - initial value is returned', () => {
      const reducer = stringReducer(changeActions, resetActions, 'payload.value', 'initial value');
      expect(reducer('reduce me!', { type: _sample(resetActions) })).toBe('initial value');
    });
  });

  describe('should throw on incorrect type of initial value', () => {
    it('initial value set to Number', () => {
      try {
        const reducer = stringReducer(changeActions, resetActions, ['path'], 42);
        expect(reducer(undefined, {})).toBe('');
      }
      catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    });
    it('initial value set to Boolean', () => {
      try {
        const reducer = stringReducer(changeActions, resetActions, ['path'], true);
        expect(reducer(undefined, {})).toBe('');
      }
      catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    });
  });
});
