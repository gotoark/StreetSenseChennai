import { 
  UserInput, 
  ValidatedInput, 
  ValidationError, 
  MoodType, 
  ChennaiArea 
} from '../types';
import { IInputHandler } from '../interfaces';

/**
 * Implementation of input validation for Chennai Street Food Assistant
 * Provides Chennai-style friendly error messages
 */
export class InputHandler implements IInputHandler {
  
  /**
   * Process and validate user input with Chennai-style error handling
   */
  processUserInput(mood: string, area: string, time?: string): ValidatedInput {
    const errors: string[] = [];
    
    // Validate mood
    const validatedMood = this.validateMood(mood);
    if (!validatedMood.isValid) {
      errors.push(validatedMood.error!);
    }
    
    // Validate area
    const validatedArea = this.validateArea(area);
    if (!validatedArea.isValid) {
      errors.push(validatedArea.error!);
    }
    
    // Normalize and validate time
    const normalizedTime = this.normalizeTime(time);
    
    return {
      mood: validatedMood.value || MoodType.LIGHT_SNACK, // Default fallback
      area: validatedArea.value || ChennaiArea.T_NAGAR, // Default fallback
      time: normalizedTime,
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate individual input fields
   */
  validateInput(input: Partial<UserInput>): ValidationError[] {
    const errors: ValidationError[] = [];
    
    if (input.mood !== undefined) {
      const moodValidation = this.validateMood(input.mood as string);
      if (!moodValidation.isValid) {
        errors.push({
          field: 'mood',
          message: moodValidation.error!,
          code: 'INVALID_MOOD'
        });
      }
    }
    
    if (input.area !== undefined) {
      const areaValidation = this.validateArea(input.area as string);
      if (!areaValidation.isValid) {
        errors.push({
          field: 'area',
          message: areaValidation.error!,
          code: 'INVALID_AREA'
        });
      }
    }
    
    if (input.time !== undefined) {
      const timeValidation = this.validateTime(input.time);
      if (!timeValidation.isValid) {
        errors.push({
          field: 'time',
          message: timeValidation.error!,
          code: 'INVALID_TIME'
        });
      }
    }
    
    return errors;
  }

  /**
   * Normalize time input to standard HH:MM format
   */
  normalizeTime(timeInput?: string): string {
    if (!timeInput) {
      // Return current time
      const now = new Date();
      return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    }
    
    // Handle various time formats
    const timeStr = timeInput.toLowerCase().trim();
    
    // Handle common Chennai time expressions
    if (timeStr.includes('midnight') || timeStr.includes('madhya raathri')) {
      return '00:00';
    }
    if (timeStr.includes('morning') || timeStr.includes('kalai')) {
      return '09:00';
    }
    if (timeStr.includes('afternoon') || timeStr.includes('madhyanam')) {
      return '14:00';
    }
    if (timeStr.includes('evening') || timeStr.includes('saayangalam')) {
      return '18:00';
    }
    if (timeStr.includes('night') || timeStr.includes('raathri')) {
      return '21:00';
    }
    
    // Try to parse HH:MM format
    const timeRegex = /^(\d{1,2}):(\d{2})$/;
    const match = timeStr.match(timeRegex);
    if (match) {
      const hours = parseInt(match[1]);
      const minutes = parseInt(match[2]);
      
      if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      }
    }
    
    // Try to parse H:MM format
    const shortTimeRegex = /^(\d{1,2})$/;
    const hourMatch = timeStr.match(shortTimeRegex);
    if (hourMatch) {
      const hours = parseInt(hourMatch[1]);
      if (hours >= 0 && hours <= 23) {
        return `${hours.toString().padStart(2, '0')}:00`;
      }
    }
    
    // Default to current time if parsing fails
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  }

  /**
   * Validate mood input with Chennai-style messages
   */
  private validateMood(mood: string): { isValid: boolean; value?: MoodType; error?: string } {
    if (!mood || mood.trim() === '') {
      return {
        isValid: false,
        error: "Anna, mood sollunga! Rainy evening-ah? Hungry-ah? Light snack venuma?"
      };
    }
    
    const normalizedMood = mood.toLowerCase().trim().replace(/[_\s-]/g, '_');
    
    // Check if it's a valid mood type
    const moodValues = Object.values(MoodType);
    const matchingMood = moodValues.find(m => m === normalizedMood);
    
    if (matchingMood) {
      return {
        isValid: true,
        value: matchingMood
      };
    }
    
    // Provide Chennai-style suggestions
    const moodSuggestions = [
      'rainy_evening (mazhai time-ku)',
      'hungry_heavy (romba pasikuthu)',
      'light_snack (konjam thinai)',
      'stress_relief (tension relief-ku)',
      'midnight_hunger (night pasikuthu)'
    ];
    
    return {
      isValid: false,
      error: `Anna, "${mood}" mood theriyala. Try pannunga: ${moodSuggestions.join(', ')}`
    };
  }

  /**
   * Validate area input with Chennai-style messages
   */
  private validateArea(area: string): { isValid: boolean; value?: ChennaiArea; error?: string } {
    if (!area || area.trim() === '') {
      return {
        isValid: false,
        error: "Area sollunga anna! T Nagar-ah? Anna Nagar-ah? Enga irukeenga?"
      };
    }
    
    const normalizedArea = area.toLowerCase().trim().replace(/[_\s-]/g, '_');
    
    // Check if it's a valid Chennai area
    const areaValues = Object.values(ChennaiArea);
    const matchingArea = areaValues.find(a => a === normalizedArea);
    
    if (matchingArea) {
      return {
        isValid: true,
        value: matchingArea
      };
    }
    
    // Provide Chennai-style area suggestions
    const areaSuggestions = [
      't_nagar (T Nagar)',
      'anna_nagar (Anna Nagar)', 
      'mylapore (Mylapore)',
      'triplicane (Triplicane)',
      'velachery (Velachery)',
      'tambaram (Tambaram)',
      'omr (OMR side)',
      'parrys_corner (Parrys Corner)'
    ];
    
    return {
      isValid: false,
      error: `Anna, "${area}" area namma list-la illa. Try pannunga: ${areaSuggestions.join(', ')}`
    };
  }

  /**
   * Validate time format
   */
  private validateTime(time: string): { isValid: boolean; error?: string } {
    if (!time || time.trim() === '') {
      return { isValid: true }; // Time is optional, will use current time
    }
    
    const timeStr = time.toLowerCase().trim();
    
    // Accept common time expressions
    const timeExpressions = [
      'morning', 'kalai', 'afternoon', 'madhyanam', 
      'evening', 'saayangalam', 'night', 'raathri', 
      'midnight', 'madhya raathri'
    ];
    
    if (timeExpressions.some(expr => timeStr.includes(expr))) {
      return { isValid: true };
    }
    
    // Validate HH:MM format
    const timeRegex = /^(\d{1,2}):(\d{2})$/;
    const match = timeStr.match(timeRegex);
    if (match) {
      const hours = parseInt(match[1]);
      const minutes = parseInt(match[2]);
      
      if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
        return { isValid: true };
      }
    }
    
    // Validate single hour format
    const hourRegex = /^(\d{1,2})$/;
    const hourMatch = timeStr.match(hourRegex);
    if (hourMatch) {
      const hours = parseInt(hourMatch[1]);
      if (hours >= 0 && hours <= 23) {
        return { isValid: true };
      }
    }
    
    return {
      isValid: false,
      error: "Time format theriyadhu anna. Try 'morning', 'evening', '14:30', or '9' (for 9 AM)"
    };
  }
}