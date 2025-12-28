import { RulesEngine } from '../rules/RulesEngine';
import { ValidatedInput, FoodItem, MoodType, ChennaiArea, WeatherCondition } from '../types';

describe('RulesEngine', () => {
  let rulesEngine: RulesEngine;
  let mockFoods: FoodItem[];

  beforeEach(() => {
    rulesEngine = new RulesEngine();
    mockFoods = [
      {
        name: 'bajji',
        category: 'fried_snacks',
        moods: [MoodType.RAINY_EVENING],
        areas: [ChennaiArea.T_NAGAR],
        timeSlots: [{ start: '17:00', end: '21:00' }]
      },
      {
        name: 'pani puri',
        category: 'chaat',
        moods: [MoodType.LIGHT_SNACK],
        areas: [ChennaiArea.T_NAGAR],
        timeSlots: [{ start: '17:00', end: '21:00' }]
      },
      {
        name: 'egg dosa',
        category: 'main',
        moods: [MoodType.HUNGRY_HEAVY],
        areas: [ChennaiArea.MYLAPORE],
        timeSlots: [{ start: '18:00', end: '23:00' }]
      },
      {
        name: 'idli',
        category: 'breakfast',
        moods: [MoodType.LIGHT_SNACK],
        areas: [ChennaiArea.MYLAPORE],
        timeSlots: [{ start: '06:00', end: '10:00' }]
      }
    ];
  });

  describe('applySafetyRules', () => {
    it('should filter out pani puri during rainy weather', () => {
      const input: ValidatedInput = {
        mood: MoodType.RAINY_EVENING,
        area: ChennaiArea.T_NAGAR,
        time: '18:00',
        weather: WeatherCondition.RAINY,
        isValid: true,
        errors: []
      };

      const result = rulesEngine.applySafetyRules(input, mockFoods);
      
      expect(result.safeFoods).not.toContainEqual(
        expect.objectContaining({ name: 'pani puri' })
      );
      expect(result.warnings).toContain('Anna, avoid raw items during rain - stick to fried snacks!');
    });

    it('should provide late night warnings', () => {
      const input: ValidatedInput = {
        mood: MoodType.MIDNIGHT_HUNGER,
        area: ChennaiArea.PARRYS_CORNER,
        time: '23:00',
        isValid: true,
        errors: []
      };

      const result = rulesEngine.applySafetyRules(input, mockFoods);
      
      expect(result.warnings).toContain('Late night options are limited but more filling');
      expect(result.warnings).toContain('Parrys Corner late night - stick to familiar places only');
    });
  });

  describe('applyCulturalGuidelines', () => {
    it('should filter non-vegetarian items in Mylapore', () => {
      const input: ValidatedInput = {
        mood: MoodType.LIGHT_SNACK,
        area: ChennaiArea.MYLAPORE,
        time: '18:00',
        isValid: true,
        errors: []
      };

      const result = rulesEngine.applyCulturalGuidelines(input, mockFoods);
      
      expect(result).not.toContainEqual(
        expect.objectContaining({ name: 'egg dosa' })
      );
      expect(result).toContainEqual(
        expect.objectContaining({ name: 'idli' })
      );
    });

    it('should avoid pani puri in T Nagar', () => {
      const input: ValidatedInput = {
        mood: MoodType.LIGHT_SNACK,
        area: ChennaiArea.T_NAGAR,
        time: '18:00',
        isValid: true,
        errors: []
      };

      const result = rulesEngine.applyCulturalGuidelines(input, mockFoods);
      
      expect(result).not.toContainEqual(
        expect.objectContaining({ name: 'pani puri' })
      );
    });
  });

  describe('checkMonsoonSafety', () => {
    it('should return monsoon warnings', () => {
      const input: ValidatedInput = {
        mood: MoodType.RAINY_EVENING,
        area: ChennaiArea.T_NAGAR,
        time: '18:00',
        weather: WeatherCondition.MONSOON,
        isValid: true,
        errors: []
      };

      const warnings = rulesEngine.checkMonsoonSafety(input);
      
      expect(warnings).toContain('Anna, avoid raw items during rain - stick to fried snacks!');
      expect(warnings).toContain('Skip corn on the cob during heavy rain');
    });
  });

  describe('getCulturalOrderingTips', () => {
    it('should return ordering tips for any area', () => {
      const tips = rulesEngine.getCulturalOrderingTips(ChennaiArea.T_NAGAR);
      
      expect(tips).toContain('Anna, medium spicy pothum');
      expect(tips).toContain('Konjam kammi kaaram');
    });

    it('should include spicy area specific tips for Triplicane', () => {
      const tips = rulesEngine.getCulturalOrderingTips(ChennaiArea.TRIPLICANE);
      
      expect(tips).toContain('Ask "Konjam kammi kaaram" for less spicy');
    });
  });

  describe('getGeneralCulturalRules', () => {
    it('should return general cultural rules', () => {
      const rules = rulesEngine.getGeneralCulturalRules();
      
      expect(rules).toContain('Cash preferred at most carts');
      expect(rules).toContain('Ask for medium spicy if unsure');
    });
  });
});