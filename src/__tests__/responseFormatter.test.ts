import { ResponseFormatter } from '../response/ResponseFormatter';
import { MoodType, ChennaiArea, ValidatedInput, Recommendation } from '../types';

describe('ResponseFormatter', () => {
  let formatter: ResponseFormatter;

  beforeEach(() => {
    formatter = new ResponseFormatter();
  });

  describe('formatResponse', () => {
    it('should format recommendations with local context', () => {
      const input: ValidatedInput = {
        mood: MoodType.RAINY_EVENING,
        area: ChennaiArea.T_NAGAR,
        time: '18:00',
        isValid: true,
        errors: []
      };

      const recommendations: Recommendation[] = [
        {
          foodItem: 'Bajji',
          explanation: 'Perfect for rainy weather',
          localContext: [],
          confidence: 0.9
        }
      ];

      const result = formatter.formatResponse(recommendations, input);

      expect(result.recommendations).toHaveLength(1);
      expect(result.recommendations[0].explanation).toContain('Bajji');
      expect(result.recommendations[0].orderingTips).toBeDefined();
      expect(result.recommendations[0].localContext).toBeDefined();
      expect(result.generalNotes).toBeDefined();
      expect(result.timestamp).toBeDefined();
    });
  });

  describe('generateOrderingTips', () => {
    it('should provide appropriate ordering tips for parotta', () => {
      const tips = formatter.generateOrderingTips('Kothu Parotta', ChennaiArea.TRIPLICANE);
      
      expect(tips).toContain('Extra salna venum');
      expect(tips).toContain('Anna, medium spicy pothum');
    });

    it('should include area-specific context', () => {
      const tips = formatter.generateOrderingTips('Bajji', ChennaiArea.MYLAPORE);
      
      expect(tips).toContain('Temple area - mostly veg options');
    });
  });

  describe('generateExplanation', () => {
    it('should create mood-based explanations', () => {
      const input: ValidatedInput = {
        mood: MoodType.STRESS_RELIEF,
        area: ChennaiArea.ANNA_NAGAR,
        time: '19:00',
        isValid: true,
        errors: []
      };

      const explanation = formatter.generateExplanation('Masala Vadai', input);

      expect(explanation).toContain('stress relief');
      expect(explanation).toContain('Masala Vadai');
      expect(explanation).toContain('Comfort food');
    });
  });

  describe('addLocalExpressions', () => {
    it('should add Chennai expressions to text', () => {
      const text = 'This is perfect for you';
      const result = formatter.addLocalExpressions(text);

      expect(result).not.toBe(text);
      expect(result.length).toBeGreaterThan(text.length);
    });
  });
});