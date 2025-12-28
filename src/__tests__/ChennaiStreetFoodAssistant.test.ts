import { ChennaiStreetFoodAssistant } from '../ChennaiStreetFoodAssistant';
import { MoodType, ChennaiArea } from '../types';

describe('ChennaiStreetFoodAssistant Integration', () => {
  let assistant: ChennaiStreetFoodAssistant;

  beforeEach(() => {
    assistant = new ChennaiStreetFoodAssistant();
  });

  describe('generateRecommendation', () => {
    it('should generate recommendations for valid input', async () => {
      const response = await assistant.generateRecommendation(
        'rainy_evening',
        't_nagar',
        '18:30'
      );

      expect(response).toBeDefined();
      expect(response.recommendations).toBeDefined();
      expect(response.recommendations.length).toBeGreaterThan(0);
      expect(response.generalNotes).toBeDefined();
      expect(response.timestamp).toBeDefined();

      // Check first recommendation structure
      const firstRec = response.recommendations[0];
      expect(firstRec.foodItem).toBeDefined();
      expect(firstRec.explanation).toBeDefined();
      expect(firstRec.localContext).toBeDefined();
      expect(firstRec.confidence).toBeGreaterThan(0);
    });

    it('should handle midnight hunger scenario', async () => {
      const response = await assistant.generateRecommendation(
        'midnight_hunger',
        'velachery',
        '23:45'
      );

      expect(response.recommendations.length).toBeGreaterThan(0);
      expect(response.generalNotes.some(note => 
        note.includes('Limited options after 10 PM')
      )).toBe(true);
    });

    it('should handle light snack scenario', async () => {
      const response = await assistant.generateRecommendation(
        'light_snack',
        'mylapore',
        '17:30'
      );

      expect(response.recommendations.length).toBeGreaterThan(0);
      const foodItems = response.recommendations.map(r => r.foodItem);
      expect(foodItems).toContain('Sundal');
    });

    it('should throw error for invalid input', async () => {
      await expect(
        assistant.generateRecommendation('invalid_mood', 'invalid_area', '25:00')
      ).rejects.toThrow();
    });
  });

  describe('generateRecommendationFromInput', () => {
    it('should work with structured input', async () => {
      const response = await assistant.generateRecommendationFromInput({
        mood: MoodType.STRESS_RELIEF,
        area: ChennaiArea.MYLAPORE,
        time: '18:00'
      });

      expect(response.recommendations.length).toBeGreaterThan(0);
    });
  });

  describe('validateInput', () => {
    it('should validate correct input', () => {
      const result = assistant.validateInput('light_snack', 't_nagar', '18:00');
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.mood).toBe(MoodType.LIGHT_SNACK);
      expect(result.area).toBe(ChennaiArea.T_NAGAR);
    });

    it('should reject invalid input', () => {
      const result = assistant.validateInput('invalid_mood', 'invalid_area');
      
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('getAvailableMoods', () => {
    it('should return all available moods', () => {
      const moods = assistant.getAvailableMoods();
      
      expect(moods).toHaveLength(5);
      expect(moods[0]).toHaveProperty('value');
      expect(moods[0]).toHaveProperty('label');
      expect(moods[0]).toHaveProperty('description');
    });
  });

  describe('getAvailableAreas', () => {
    it('should return all available areas', () => {
      const areas = assistant.getAvailableAreas();
      
      expect(areas).toHaveLength(8);
      expect(areas[0]).toHaveProperty('value');
      expect(areas[0]).toHaveProperty('label');
      expect(areas[0]).toHaveProperty('description');
    });
  });

  describe('healthCheck', () => {
    it('should return healthy status', async () => {
      const health = await assistant.healthCheck();
      
      expect(health.status).toBe('healthy');
      expect(health.components.inputHandler).toBe(true);
      expect(health.components.recommendationEngine).toBe(true);
      expect(health.components.responseFormatter).toBe(true);
    });
  });
});