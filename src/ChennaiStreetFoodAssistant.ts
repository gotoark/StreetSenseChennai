import { 
  UserInput, 
  ValidatedInput, 
  RecommendationResponse,
  MoodType,
  ChennaiArea 
} from './types';
import { InputHandler } from './input/InputHandler';
import { RecommendationEngine } from './recommendation/RecommendationEngine';
import { ResponseFormatter } from './response/ResponseFormatter';

/**
 * Main Chennai Street Food Assistant class
 * Orchestrates the entire recommendation process by wiring together
 * input validation, recommendation engine, and response formatting
 */
export class ChennaiStreetFoodAssistant {
  private inputHandler: InputHandler;
  private recommendationEngine: RecommendationEngine;
  private responseFormatter: ResponseFormatter;

  constructor() {
    this.inputHandler = new InputHandler();
    this.recommendationEngine = new RecommendationEngine();
    this.responseFormatter = new ResponseFormatter();
  }

  /**
   * Main recommendation generation function
   * Processes user input through the complete pipeline:
   * 1. Input validation and normalization
   * 2. Recommendation generation based on mood, area, and time
   * 3. Response formatting with local Chennai context
   * 
   * Requirements: 2.1, 2.5
   */
  async generateRecommendation(
    mood: string, 
    area: string, 
    time?: string
  ): Promise<RecommendationResponse> {
    try {
      // Step 1: Validate and normalize user input
      const validatedInput = this.inputHandler.processUserInput(mood, area, time);
      
      if (!validatedInput.isValid) {
        throw new SystemError({
          type: 'validation',
          message: 'Invalid input provided',
          details: validatedInput.errors
        });
      }

      // Step 2: Generate recommendations using the recommendation engine
      const recommendationResponse = await this.recommendationEngine.generateRecommendations(validatedInput);

      // Step 3: Format response with local Chennai context and tone
      const formattedResponse = this.responseFormatter.formatResponse(
        recommendationResponse.recommendations, 
        validatedInput
      );

      return formattedResponse;

    } catch (error) {
      // Handle system errors gracefully
      if (error instanceof SystemError) {
        throw error;
      }
      
      // Wrap unexpected errors
      throw new SystemError({
        type: 'system',
        message: 'An unexpected error occurred while generating recommendations',
        details: error
      });
    }
  }

  /**
   * Alternative method for structured input
   * Accepts a UserInput object instead of individual parameters
   */
  async generateRecommendationFromInput(input: Partial<UserInput>): Promise<RecommendationResponse> {
    const mood = input.mood || '';
    const area = input.area || '';
    const time = input.time;

    return this.generateRecommendation(mood, area, time);
  }

  /**
   * Validate input without generating recommendations
   * Useful for form validation in UI
   */
  validateInput(mood: string, area: string, time?: string): ValidatedInput {
    return this.inputHandler.processUserInput(mood, area, time);
  }

  /**
   * Get available mood options for UI
   */
  getAvailableMoods(): { value: MoodType; label: string; description: string }[] {
    return [
      {
        value: MoodType.RAINY_EVENING,
        label: 'Rainy Evening',
        description: 'Perfect for cozy weather with hot snacks'
      },
      {
        value: MoodType.HUNGRY_HEAVY,
        label: 'Very Hungry',
        description: 'Need something filling and substantial'
      },
      {
        value: MoodType.LIGHT_SNACK,
        label: 'Light Snack',
        description: 'Just want something light to munch'
      },
      {
        value: MoodType.STRESS_RELIEF,
        label: 'Stress Relief',
        description: 'Comfort food to feel better'
      },
      {
        value: MoodType.MIDNIGHT_HUNGER,
        label: 'Midnight Hunger',
        description: 'Late night cravings need satisfaction'
      }
    ];
  }

  /**
   * Get available Chennai areas for UI
   */
  getAvailableAreas(): { value: ChennaiArea; label: string; description: string }[] {
    return [
      {
        value: ChennaiArea.T_NAGAR,
        label: 'T Nagar',
        description: 'Shopping hub with diverse street food'
      },
      {
        value: ChennaiArea.ANNA_NAGAR,
        label: 'Anna Nagar',
        description: 'Clean stalls with good variety'
      },
      {
        value: ChennaiArea.MYLAPORE,
        label: 'Mylapore',
        description: 'Traditional temple area with authentic snacks'
      },
      {
        value: ChennaiArea.TRIPLICANE,
        label: 'Triplicane',
        description: 'Known for spicy street food'
      },
      {
        value: ChennaiArea.VELACHERY,
        label: 'Velachery',
        description: 'Good options, especially during rain'
      },
      {
        value: ChennaiArea.TAMBARAM,
        label: 'Tambaram',
        description: 'Local favorite with family-friendly options'
      },
      {
        value: ChennaiArea.OMR,
        label: 'OMR',
        description: 'Tech park area with late-night options'
      },
      {
        value: ChennaiArea.PARRYS_CORNER,
        label: 'Parrys Corner',
        description: 'Traditional area with breakfast specialties'
      }
    ];
  }

  /**
   * Health check method to verify all components are working
   */
  async healthCheck(): Promise<{ status: 'healthy' | 'unhealthy'; components: Record<string, boolean> }> {
    const components = {
      inputHandler: false,
      recommendationEngine: false,
      responseFormatter: false
    };

    try {
      // Test input handler
      const testInput = this.inputHandler.processUserInput('light_snack', 't_nagar', '18:00');
      components.inputHandler = testInput.isValid;

      // Test recommendation engine
      if (components.inputHandler) {
        const testRecommendations = await this.recommendationEngine.generateRecommendations(testInput);
        components.recommendationEngine = testRecommendations.recommendations.length > 0;
      }

      // Test response formatter
      if (components.recommendationEngine) {
        const testResponse = this.responseFormatter.formatResponse([], testInput);
        components.responseFormatter = testResponse.timestamp !== undefined;
      }

      const allHealthy = Object.values(components).every(status => status);
      
      return {
        status: allHealthy ? 'healthy' : 'unhealthy',
        components
      };

    } catch (error) {
      return {
        status: 'unhealthy',
        components
      };
    }
  }
}

/**
 * SystemError class for handling application errors
 */
class SystemError extends Error {
  public type: 'validation' | 'processing' | 'data' | 'system';
  public details?: any;

  constructor(error: { type: 'validation' | 'processing' | 'data' | 'system'; message: string; details?: any }) {
    super(error.message);
    this.name = 'SystemError';
    this.type = error.type;
    this.details = error.details;
  }
}

// Export the main class and create a default instance for convenience
export default ChennaiStreetFoodAssistant;

// Create and export a default instance for simple usage
export const streetFoodAssistant = new ChennaiStreetFoodAssistant();