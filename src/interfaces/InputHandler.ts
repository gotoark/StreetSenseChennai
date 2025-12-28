import { UserInput, ValidatedInput, ValidationError } from '../types';

/**
 * Interface for handling and validating user inputs
 */
export interface IInputHandler {
  /**
   * Process and validate user input
   * @param mood - User's current mood
   * @param area - Chennai area
   * @param time - Time in HH:MM format or auto-detect
   * @returns Validated input with error information
   */
  processUserInput(mood: string, area: string, time?: string): ValidatedInput;

  /**
   * Validate individual input fields
   * @param input - Raw user input
   * @returns Array of validation errors
   */
  validateInput(input: Partial<UserInput>): ValidationError[];

  /**
   * Normalize time input to standard format
   * @param timeInput - Raw time input (various formats)
   * @returns Normalized HH:MM format or current time
   */
  normalizeTime(timeInput?: string): string;
}