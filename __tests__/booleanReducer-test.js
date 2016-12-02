import _sample from 'lodash.sample';
import { booleanReducer } from '../src';

const trueActions = ['TRUE_ACTION1', 'TRUE_ACTION2', 'TRUE_ACTION3'];
const falseActions = ['FALSE_ACTION1', 'FALSE_ACTION2'];
const unknownAction = 'UNKNOWN_ACTION';

describe('booleanReducer', () => {
  describe('should return the initial state', () => {
    it('initial state default (false)', () => {
      const reducer = booleanReducer(trueActions, falseActions);
      expect(reducer(undefined, {})).toBe(false);
    });
    it('initial state set to true', () => {
      const reducer = booleanReducer(trueActions, falseActions, true);
      expect(reducer(undefined, {})).toBe(true);
    });
  });

  describe('should return initial state on unknown action', () => {
    it('initial state default (false)', () => {
      const reducer = booleanReducer(trueActions, falseActions);
      expect(reducer(false, { type: unknownAction })).toBe(false);
    });
    it('initial state set to true', () => {
      const reducer = booleanReducer(trueActions, falseActions, true);
      expect(reducer(false, { type: unknownAction })).toBe(false);
    });
  });

  describe('should return false on false action', () => {
    it('current state set to false', () => {
      const reducer = booleanReducer(trueActions, falseActions);
      expect(reducer(false, { type: _sample(falseActions) })).toBe(false);
    });
    it('current state set to true', () => {
      const reducer = booleanReducer(trueActions, falseActions);
      expect(reducer(true, { type: _sample(falseActions) })).toBe(false);
    });
  });

  describe('should return true on true action', () => {
    it('current state set to false', () => {
      const reducer = booleanReducer(trueActions, falseActions);
      expect(reducer(false, { type: _sample(trueActions) })).toBe(true);
    });
    it('current state set to true', () => {
      const reducer = booleanReducer(trueActions, falseActions);
      expect(reducer(true, { type: _sample(trueActions) })).toBe(true);
    });
  });

  describe('should throw on incorrect type of initial state', () => {
    it('initial state set to Number', () => {
      try {
        const reducer = booleanReducer(trueActions, falseActions, 42);
        expect(reducer(undefined, {})).toBe(false);
      }
      catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    });
    it('initial state set to String', () => {
      try {
        const reducer = booleanReducer(trueActions, falseActions, '42');
        expect(reducer(undefined, {})).toBe(false);
      }
      catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    });
  });
});
