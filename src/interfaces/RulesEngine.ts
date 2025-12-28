import { ValidatedInput, FoodItem } from '../types';

/**
 * Interface for business rules and safety checks
 */
export interface IRulesEngine {
  /**
   * Apply safety rules and generate warnings
   * @param input - User input with context
   * @param foods - Candidate food items
   * @returns Filtered foods with safety notes
   */
  applySafetyRules(input: ValidatedInput, foods: FoodItem[]): {
    safeFoods: FoodItem[];
    warnings: string[];
  };

  /**
   * Check for cultural guideline compliance
   * @param input - User input
   * @param foods - Food items to check
   * @returns Culturally appropriate foods
   */
  applyCulturalGuidelines(input: ValidatedInput, foods: FoodItem[]): FoodItem[];

  /**
   * Apply "Do Not Recommend" list filtering
   * @param input - User input with conditions
   * @param foods - Food items to filter
   * @returns Filtered foods excluding restricted items
   */
  applyRestrictions(input: ValidatedInput, foods: FoodItem[]): FoodItem[];

  /**
   * Check monsoon safety conditions
   * @param input - User input
   * @returns Safety warnings for monsoon conditions
   */
  checkMonsoonSafety(input: ValidatedInput): string[];

  /**
   * Check late night safety conditions
   * @param input - User input
   * @returns Safety warnings for late night conditions
   */
  checkLateNightSafety(input: ValidatedInput): string[];
}