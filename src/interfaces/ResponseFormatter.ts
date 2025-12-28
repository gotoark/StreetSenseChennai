import { Recommendation, RecommendationResponse, ValidatedInput } from '../types';

/**
 * Interface for formatting responses with local Chennai context
 */
export interface IResponseFormatter {
  /**
   * Format recommendations with local Chennai style
   * @param recommendations - Raw recommendations
   * @param input - User input for context
   * @returns Formatted response with local flavor
   */
  formatResponse(recommendations: Recommendation[], input: ValidatedInput): RecommendationResponse;

  /**
   * Add local context and cultural notes
   * @param recommendation - Single recommendation
   * @param input - User input for context
   * @returns Recommendation with local context
   */
  addLocalContext(recommendation: Recommendation, input: ValidatedInput): Recommendation;

  /**
   * Generate ordering tips and local phrases
   * @param foodItem - Food item name
   * @param area - Chennai area
   * @returns Ordering tips in local style
   */
  generateOrderingTips(foodItem: string, area: string): string[];

  /**
   * Create explanation for why food fits user's mood
   * @param foodItem - Recommended food
   * @param input - User input with mood
   * @returns Explanation in friendly Chennai style
   */
  generateExplanation(foodItem: string, input: ValidatedInput): string;

  /**
   * Add Chennai expressions and local flavor
   * @param text - Base text to enhance
   * @returns Text with local Chennai expressions
   */
  addLocalExpressions(text: string): string;
}