import { RecommendationEngine } from '../recommendation/RecommendationEngine';
import { ValidatedInput, MoodType, ChennaiArea } from '../types';

describe('RecommendationEngine', () => {
  let engine: RecommendationEngine;

  beforeEach(() => {
    engine = new RecommendationEngine();
  });

  describe('applyMoodFiltering', () => {
    it('should return foods matching rainy evening mood', () => {
      const input: ValidatedInput = {
        mood: MoodType.RAINY_EVENING,
        area: ChennaiArea.T_NAGAR,
        time: '18:00',
        isValid: true,
        errors: []
      };

      const result = engine.applyMoodFiltering(input);
      
      expect(result).toContain('Bajji');
      expect(result).toContain('Hot tea');
      expect(result).toContain('Vadai');
    });

    it('should return foods matching hungry heavy mood', () => {
      const input: ValidatedInput = {
        mood: MoodType.HUNGRY_HEAVY,
        area: ChennaiArea.TRIPLICANE,
        time: '20:00',
        isValid: true,
        errors: []
      };

      const result = engine.applyMoodFiltering(input);
      
      expect(result).toContain('Parotta with salna');
      expect(result).toContain('Kothu parotta');
      expect(result).toContain('Egg dosa');
    });

    it('should return foods matching light snack mood', () => {
      const input: ValidatedInput = {
        mood: MoodType.LIGHT_SNACK,
        area: ChennaiArea.T_NAGAR,
        time: '17:30',
        isValid: true,
        errors: []
      };

      const result = engine.applyMoodFiltering(input);
      
      expect(result).toContain('Sundal');
      expect(result).toContain('Corn on the cob');
      expect(result).toContain('Fruit chaat');
    });
  });

  describe('applyAreaFiltering', () => {
    it('should prioritize T Nagar specialties for evening time', () => {
      const input: ValidatedInput = {
        mood: MoodType.LIGHT_SNACK,
        area: ChennaiArea.T_NAGAR,
        time: '18:00',
        isValid: true,
        errors: []
      };

      const moodFoods = ['Sundal', 'Corn on the cob', 'Fruit chaat', 'Chaat'];
      const result = engine.applyAreaFiltering(input, moodFoods);
      
      // T Nagar evening specialties should be prioritized
      expect(result).toContain('Sundal');
      expect(result).toContain('Chaat');
    });

    it('should filter foods available in Mylapore', () => {
      const input: ValidatedInput = {
        mood: MoodType.RAINY_EVENING,
        area: ChennaiArea.MYLAPORE,
        time: '18:00',
        isValid: true,
        errors: []
      };

      const moodFoods = ['Bajji', 'Vadai', 'Hot tea'];
      const result = engine.applyAreaFiltering(input, moodFoods);
      
      // All these foods should be available in Mylapore
      expect(result.length).toBeGreaterThan(0);
      expect(result).toContain('Vadai'); // Mylapore specialty
    });
  });

  describe('applyTimeFiltering', () => {
    it('should filter foods available during evening time', () => {
      const input: ValidatedInput = {
        mood: MoodType.RAINY_EVENING,
        area: ChennaiArea.T_NAGAR,
        time: '18:00',
        isValid: true,
        errors: []
      };

      const areaFoods = ['Bajji', 'Hot tea', 'Idli']; // Idli is breakfast only
      const result = engine.applyTimeFiltering(input, areaFoods);
      
      expect(result).toContain('Bajji'); // Available in evening
      expect(result).toContain('Hot tea'); // Available all day
      expect(result).not.toContain('Idli'); // Breakfast only
    });

    it('should filter foods available during late night', () => {
      const input: ValidatedInput = {
        mood: MoodType.MIDNIGHT_HUNGER,
        area: ChennaiArea.VELACHERY,
        time: '23:30',
        isValid: true,
        errors: []
      };

      const areaFoods = ['Dosa', 'Kothu parotta', 'Bajji'];
      const result = engine.applyTimeFiltering(input, areaFoods);
      
      expect(result).toContain('Dosa'); // Available late night
      expect(result).toContain('Kothu parotta'); // Available late night
      expect(result).not.toContain('Bajji'); // Not available late night
    });
  });

  describe('generateRecommendations', () => {
    it('should generate complete recommendations for rainy evening in T Nagar', async () => {
      const input: ValidatedInput = {
        mood: MoodType.RAINY_EVENING,
        area: ChennaiArea.T_NAGAR,
        time: '18:00',
        isValid: true,
        errors: []
      };

      const result = await engine.generateRecommendations(input);
      
      expect(result.recommendations).toBeDefined();
      expect(result.recommendations.length).toBeGreaterThan(0);
      expect(result.generalNotes).toBeDefined();
      expect(result.timestamp).toBeDefined();
      
      // Check first recommendation structure
      const firstRec = result.recommendations[0];
      expect(firstRec.foodItem).toBeDefined();
      expect(firstRec.explanation).toBeDefined();
      expect(firstRec.localContext).toBeDefined();
      expect(firstRec.confidence).toBeGreaterThan(0);
    });

    it('should generate recommendations for midnight hunger', async () => {
      const input: ValidatedInput = {
        mood: MoodType.MIDNIGHT_HUNGER,
        area: ChennaiArea.VELACHERY,
        time: '23:30',
        isValid: true,
        errors: []
      };

      const result = await engine.generateRecommendations(input);
      
      expect(result.recommendations.length).toBeGreaterThan(0);
      
      // Should contain midnight-appropriate foods
      const foodNames = result.recommendations.map(r => r.foodItem);
      expect(foodNames.some(name => ['Dosa', 'Kothu parotta', 'Egg rice'].includes(name))).toBe(true);
    });
  });
});