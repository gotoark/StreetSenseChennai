import { InputHandler } from '../input/InputHandler';
import { MoodType, ChennaiArea } from '../types';

describe('InputHandler', () => {
  let inputHandler: InputHandler;

  beforeEach(() => {
    inputHandler = new InputHandler();
  });

  describe('processUserInput', () => {
    it('should validate correct mood and area inputs', () => {
      const result = inputHandler.processUserInput('rainy_evening', 't_nagar', '18:30');
      
      expect(result.isValid).toBe(true);
      expect(result.mood).toBe(MoodType.RAINY_EVENING);
      expect(result.area).toBe(ChennaiArea.T_NAGAR);
      expect(result.time).toBe('18:30');
      expect(result.errors).toHaveLength(0);
    });

    it('should return Chennai-style error for invalid mood', () => {
      const result = inputHandler.processUserInput('invalid_mood', 't_nagar');
      
      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toContain('Anna');
      expect(result.errors[0]).toContain('invalid_mood');
    });

    it('should return Chennai-style error for invalid area', () => {
      const result = inputHandler.processUserInput('rainy_evening', 'mumbai');
      
      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toContain('Anna');
      expect(result.errors[0]).toContain('mumbai');
    });

    it('should handle empty inputs with Chennai-style messages', () => {
      const result = inputHandler.processUserInput('', '');
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(2);
      expect(result.errors[0]).toContain('mood sollunga');
      expect(result.errors[1]).toContain('Area sollunga');
    });
  });

  describe('normalizeTime', () => {
    it('should handle Chennai time expressions', () => {
      expect(inputHandler.normalizeTime('morning')).toBe('09:00');
      expect(inputHandler.normalizeTime('kalai')).toBe('09:00');
      expect(inputHandler.normalizeTime('evening')).toBe('18:00');
      expect(inputHandler.normalizeTime('saayangalam')).toBe('18:00');
      expect(inputHandler.normalizeTime('night')).toBe('21:00');
      expect(inputHandler.normalizeTime('midnight')).toBe('00:00');
    });

    it('should handle HH:MM format', () => {
      expect(inputHandler.normalizeTime('14:30')).toBe('14:30');
      expect(inputHandler.normalizeTime('09:15')).toBe('09:15');
      expect(inputHandler.normalizeTime('23:59')).toBe('23:59');
    });

    it('should handle single hour format', () => {
      expect(inputHandler.normalizeTime('9')).toBe('09:00');
      expect(inputHandler.normalizeTime('14')).toBe('14:00');
      expect(inputHandler.normalizeTime('0')).toBe('00:00');
    });

    it('should return current time for undefined input', () => {
      const result = inputHandler.normalizeTime();
      expect(result).toMatch(/^\d{2}:\d{2}$/);
    });

    it('should fallback to current time for invalid format', () => {
      const result = inputHandler.normalizeTime('invalid_time');
      expect(result).toMatch(/^\d{2}:\d{2}$/);
    });
  });

  describe('validateInput', () => {
    it('should return validation errors for invalid inputs', () => {
      const errors = inputHandler.validateInput({
        mood: 'invalid_mood' as any,
        area: 'invalid_area' as any,
        time: '25:70' // Invalid time
      });

      expect(errors).toHaveLength(3);
      expect(errors[0].field).toBe('mood');
      expect(errors[0].code).toBe('INVALID_MOOD');
      expect(errors[1].field).toBe('area');
      expect(errors[1].code).toBe('INVALID_AREA');
      expect(errors[2].field).toBe('time');
      expect(errors[2].code).toBe('INVALID_TIME');
    });

    it('should return no errors for valid inputs', () => {
      const errors = inputHandler.validateInput({
        mood: MoodType.RAINY_EVENING,
        area: ChennaiArea.T_NAGAR,
        time: '18:30'
      });

      expect(errors).toHaveLength(0);
    });
  });
});