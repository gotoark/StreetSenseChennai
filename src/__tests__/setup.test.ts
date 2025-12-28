// Basic setup test to verify project structure and imports

import { MoodType, ChennaiArea, WeatherCondition } from '../types';
import { IInputHandler, IRecommendationEngine, IFoodDatabase } from '../interfaces';

describe('Project Setup', () => {
  test('should import core enums correctly', () => {
    expect(MoodType.RAINY_EVENING).toBe('rainy_evening');
    expect(ChennaiArea.T_NAGAR).toBe('t_nagar');
    expect(WeatherCondition.SUNNY).toBe('sunny');
  });

  test('should have all required mood types', () => {
    const expectedMoods = [
      'rainy_evening',
      'hungry_heavy',
      'light_snack', 
      'stress_relief',
      'midnight_hunger'
    ];
    
    const actualMoods = Object.values(MoodType);
    expect(actualMoods).toEqual(expect.arrayContaining(expectedMoods));
    expect(actualMoods.length).toBe(expectedMoods.length);
  });

  test('should have all required Chennai areas', () => {
    const expectedAreas = [
      't_nagar',
      'anna_nagar',
      'mylapore',
      'triplicane',
      'velachery',
      'tambaram',
      'omr',
      'parrys_corner'
    ];
    
    const actualAreas = Object.values(ChennaiArea);
    expect(actualAreas).toEqual(expect.arrayContaining(expectedAreas));
    expect(actualAreas.length).toBe(expectedAreas.length);
  });

  test('should import interfaces without errors', () => {
    // This test verifies that interfaces are properly defined and importable
    // Interfaces don't exist at runtime, but importing them should not cause errors
    expect(true).toBe(true); // If we reach this point, imports worked
  });
});