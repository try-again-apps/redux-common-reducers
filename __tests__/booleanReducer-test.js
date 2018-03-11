import _sample from 'lodash.sample';
import { booleanReducer } from '../src';

const trueActions = ['TRUE_ACTION1', 'TRUE_ACTION2', 'TRUE_ACTION3'];
const falseActions = ['FALSE_ACTION1', 'FALSE_ACTION2'];
const toggleActions = ['TOGGLE_ACTION1'];
const unknownAction = 'UNKNOWN_ACTION';

describe('booleanReducer', () => {
  describe('should return the initial state', () => {
    it('initial value default (false)', () => {
      const reducer = booleanReducer({ trueActions, falseActions });
      expect(reducer(undefined, {})).toBe(false);
    });
    it('initial value set to true', () => {
      const reducer = booleanReducer({ trueActions, falseActions }, true);
      expect(reducer(undefined, {})).toBe(true);
    });
  });

  describe('should return initial state on unknown action', () => {
    it('initial value default (false)', () => {
      const reducer = booleanReducer({ trueActions, falseActions });
      expect(reducer(false, { type: unknownAction })).toBe(false);
    });
    it('initial value set to true', () => {
      const reducer = booleanReducer({ trueActions, falseActions }, true);
      expect(reducer(false, { type: unknownAction })).toBe(false);
    });
  });

  describe('should return false on false action', () => {
    it('initial state set to false', () => {
      const reducer = booleanReducer({ trueActions, falseActions });
      expect(reducer(false, { type: _sample(falseActions) })).toBe(false);
    });
    it('initial state set to true', () => {
      const reducer = booleanReducer({ trueActions, falseActions });
      expect(reducer(true, { type: _sample(falseActions) })).toBe(false);
    });
  });

  describe('should return true on true action', () => {
    it('initial state set to false', () => {
      const reducer = booleanReducer({ trueActions, falseActions });
      expect(reducer(false, { type: _sample(trueActions) })).toBe(true);
    });
    it('initial state set to true', () => {
      const reducer = booleanReducer({ trueActions, falseActions });
      expect(reducer(true, { type: _sample(trueActions) })).toBe(true);
    });
  });

  describe('should toggle a false state to true on a toggle action', () => {
    it('initial state set to false', () => {
      const reducer = booleanReducer({
        trueActions,
        falseActions,
        toggleActions
      });
      expect(reducer(false, { type: _sample(toggleActions) })).toBe(true);
    });
  });

  describe('should toggle a true state to false on a toggle action', () => {
    it('initial state set to false', () => {
      const reducer = booleanReducer({
        trueActions,
        falseActions,
        toggleActions
      });
      expect(reducer(true, { type: _sample(toggleActions) })).toBe(false);
    });
  });

  describe('should throw on incorrect type of initial value', () => {
    it('initial value set to Number', () => {
      try {
        const reducer = booleanReducer({ trueActions, falseActions }, 42);
        expect(reducer(undefined, {})).toBe(false);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    });
    it('initial value set to String', () => {
      try {
        const reducer = booleanReducer({ trueActions, falseActions }, '42');
        expect(reducer(undefined, {})).toBe(false);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    });
  });
});
