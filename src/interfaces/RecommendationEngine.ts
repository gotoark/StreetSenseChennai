import { ValidatedInput, Recommendation, RecommendationResponse } from '../types';

/**
 * Interface for the core recommendation engine
 */
export interface IRecommendationEngine {
  /**
   * Generate food recommendations based on validated user input
   * @param input - Validated user input
   * @returns List of recommendations with context
   */
  generateRecommendations(input: ValidatedInput): Promise<RecommendationResponse>;

  /**
   * Apply mood-based filtering to food items
   * @param input - User input with mood
   * @returns Filtered food items matching mood
   */
  applyMoodFiltering(input: ValidatedInput): string[];

  /**
   * Apply area-based filtering for specialties
   * @param input - User input with area
   * @param foods - List of food items to filter
   * @returns Area-appropriate food items
   */
  applyAreaFiltering(input: ValidatedInput, foods: string[]): string[];

  /**
   * Apply time-based availability filtering
   * @param input - User input with time
   * @param foods - List of food items to filter
   * @returns Time-appropriate food items
   */
  applyTimeFiltering(input: ValidatedInput, foods: string[]): string[];
}