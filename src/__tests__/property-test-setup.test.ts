// Property-based test setup using fast-check

import * as fc from 'fast-check';
import { MoodType, ChennaiArea, UserInput } from '../types';

describe('Property Test Setup', () => {
  // Generators for property-based testing
  const moodGenerator = fc.constantFrom(...Object.values(MoodType));
  const areaGenerator = fc.constantFrom(...Object.values(ChennaiArea));
  const timeGenerator = fc.tuple(
    fc.integer({ min: 0, max: 23 }),
    fc.integer({ min: 0, max: 59 })
  ).map(([hour, minute]) => 
    `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  );

  test('should generate valid mood types', () => {
    fc.assert(fc.property(moodGenerator, (mood) => {
      expect(Object.values(MoodType)).toContain(mood);
    }));
  });

  test('should generate valid Chennai areas', () => {
    fc.assert(fc.property(areaGenerator, (area) => {
      expect(Object.values(ChennaiArea)).toContain(area);
    }));
  });

  test('should generate valid time formats', () => {
    fc.assert(fc.property(timeGenerator, (time) => {
      expect(time).toMatch(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/);
    }));
  });

  test('should generate valid user input combinations', () => {
    const userInputGenerator = fc.record({
      mood: moodGenerator,
      area: areaGenerator,
      time: timeGenerator
    });

    fc.assert(fc.property(userInputGenerator, (input) => {
      expect(Object.values(MoodType)).toContain(input.mood);
      expect(Object.values(ChennaiArea)).toContain(input.area);
      expect(input.time).toMatch(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/);
    }));
  });
});