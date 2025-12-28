import { 
  ValidatedInput, 
  Recommendation, 
  RecommendationResponse, 
  MoodType,
  ChennaiArea,
  TimeSlot 
} from '../types';
import { IRecommendationEngine } from '../interfaces/RecommendationEngine';
import { 
  moodFoodMappings, 
  foodItems, 
  areaSpecialties, 
  timeSlots,
  culturalGuidelines,
  orderingTips,
  doNotRecommend,
  safetyNotesByCondition
} from '../data/foodData';

/**
 * Core recommendation engine implementation
 * Applies mood, area, and time-based filtering to generate food recommendations
 */
export class RecommendationEngine implements IRecommendationEngine {

  /**
   * Generate food recommendations based on validated user input
   */
  async generateRecommendations(input: ValidatedInput): Promise<RecommendationResponse> {
    // Apply filtering in sequence: mood -> area -> time
    const moodFilteredFoods = this.applyMoodFiltering(input);
    const areaFilteredFoods = this.applyAreaFiltering(input, moodFilteredFoods);
    const timeFilteredFoods = this.applyTimeFiltering(input, areaFilteredFoods);

    // Generate recommendations from filtered foods
    const recommendations = this.generateRecommendationsFromFoods(timeFilteredFoods, input);

    return {
      recommendations,
      generalNotes: this.getGeneralNotes(input),
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Apply mood-based filtering to food items
   * Returns foods that match the user's mood from the mood-food mapping
   */
  applyMoodFiltering(input: ValidatedInput): string[] {
    // Get foods directly from mood mapping
    const moodFoods = moodFoodMappings[input.mood] || [];
    
    // Also check food items that have this mood in their moods array
    const additionalFoods = foodItems
      .filter(item => item.moods.includes(input.mood))
      .map(item => item.name);

    // Combine and deduplicate
    const allMoodFoods = [...new Set([...moodFoods, ...additionalFoods])];
    
    return allMoodFoods;
  }

  /**
   * Apply area-based filtering for specialties
   * Prioritizes area specialties while keeping other available foods
   */
  applyAreaFiltering(input: ValidatedInput, foods: string[]): string[] {
    // Get area specialties for current time period
    const currentTimeSlot = this.getCurrentTimeSlot(input.time);
    const areaSpecialtyFoods = areaSpecialties
      .filter(specialty => 
        specialty.area === input.area && 
        (specialty.timeSlot === currentTimeSlot || specialty.timeSlot === 'allDay')
      )
      .flatMap(specialty => specialty.foods);

    // Filter foods to only include those available in this area
    const areaAvailableFoods = foods.filter(food => {
      const foodItem = foodItems.find(item => item.name === food);
      return foodItem && foodItem.areas.includes(input.area);
    });

    // Prioritize area specialties, then other available foods
    const prioritizedFoods = [
      ...areaSpecialtyFoods.filter(food => areaAvailableFoods.includes(food)),
      ...areaAvailableFoods.filter(food => !areaSpecialtyFoods.includes(food))
    ];

    return [...new Set(prioritizedFoods)];
  }

  /**
   * Apply time-based availability filtering
   * Only returns foods available during the specified time
   */
  applyTimeFiltering(input: ValidatedInput, foods: string[]): string[] {
    const inputTime = input.time;
    
    return foods.filter(food => {
      const foodItem = foodItems.find(item => item.name === food);
      if (!foodItem) return false;

      // Check if food is available during the input time
      return foodItem.timeSlots.some(slot => 
        this.isTimeInSlot(inputTime, slot)
      );
    });
  }

  /**
   * Generate recommendation objects from filtered food names
   */
  private generateRecommendationsFromFoods(foods: string[], input: ValidatedInput): Recommendation[] {
    return foods.slice(0, 5).map((food, index) => {
      const foodItem = foodItems.find(item => item.name === food);
      
      return {
        foodItem: food,
        explanation: this.generateExplanation(food, input),
        localContext: this.getLocalContext(food, input),
        orderingTips: this.getOrderingTips(food),
        safetyNotes: this.getSafetyNotes(food, input),
        confidence: this.calculateConfidence(food, input, index)
      };
    });
  }

  /**
   * Generate explanation for why this food matches the user's mood and situation
   */
  private generateExplanation(food: string, input: ValidatedInput): string {
    const moodExplanations: Record<MoodType, string> = {
      [MoodType.RAINY_EVENING]: `Perfect for rainy weather - ${food} pairs well with the cozy evening mood`,
      [MoodType.HUNGRY_HEAVY]: `${food} will satisfy your heavy hunger with its filling nature`,
      [MoodType.LIGHT_SNACK]: `${food} is ideal for a light snack without being too heavy`,
      [MoodType.STRESS_RELIEF]: `${food} provides the comfort and spice you need for stress relief`,
      [MoodType.MIDNIGHT_HUNGER]: `${food} is available late night and perfect for midnight cravings`
    };

    return moodExplanations[input.mood] || `${food} matches your current mood and timing`;
  }

  /**
   * Get local context and cultural notes for the food and area
   */
  private getLocalContext(food: string, input: ValidatedInput): string[] {
    const context: string[] = [];
    
    // Add area-specific notes
    const areaSpecialty = areaSpecialties.find(specialty => 
      specialty.area === input.area && specialty.foods.includes(food)
    );
    if (areaSpecialty?.notes) {
      context.push(areaSpecialty.notes);
    }

    // Add general cultural guidelines
    context.push(...culturalGuidelines.general);

    return context;
  }

  /**
   * Get ordering tips for the food
   */
  private getOrderingTips(food: string): string[] {
    // Return general ordering tips - could be enhanced to be food-specific
    return orderingTips.slice(0, 2);
  }

  /**
   * Get safety notes based on food, weather, and time
   */
  private getSafetyNotes(food: string, input: ValidatedInput): string[] {
    const notes: string[] = [];
    
    // Check food-specific safety notes
    const foodItem = foodItems.find(item => item.name === food);
    if (foodItem?.safetyNotes) {
      notes.push(...foodItem.safetyNotes);
    }

    // Check condition-based safety notes
    const currentTimeSlot = this.getCurrentTimeSlot(input.time);
    if (currentTimeSlot === 'lateNight') {
      notes.push(...(safetyNotesByCondition.late_night || []));
    }

    // Check weather-based safety notes
    if (input.weather === 'rainy' || input.weather === 'monsoon') {
      notes.push(...(safetyNotesByCondition.monsoon || []));
      notes.push(...(safetyNotesByCondition.heavy_rain || []));
    }

    return [...new Set(notes)];
  }

  /**
   * Calculate confidence score for recommendation
   */
  private calculateConfidence(food: string, input: ValidatedInput, index: number): number {
    let confidence = 1.0;
    
    // Reduce confidence based on position (first recommendations are more confident)
    confidence -= index * 0.1;
    
    // Increase confidence if it's an area specialty
    const isAreaSpecialty = areaSpecialties.some(specialty => 
      specialty.area === input.area && specialty.foods.includes(food)
    );
    if (isAreaSpecialty) {
      confidence += 0.2;
    }

    // Increase confidence if directly in mood mapping
    const isDirectMoodMatch = moodFoodMappings[input.mood]?.includes(food);
    if (isDirectMoodMatch) {
      confidence += 0.1;
    }

    return Math.min(1.0, Math.max(0.1, confidence));
  }

  /**
   * Get general notes for the response
   */
  private getGeneralNotes(input: ValidatedInput): string[] {
    const notes: string[] = [];
    
    // Add time-based rules
    const timeRule = culturalGuidelines.timeBasedRules.find(rule => {
      const currentTimeSlot = this.getCurrentTimeSlot(input.time);
      return rule.toLowerCase().includes(currentTimeSlot);
    });
    if (timeRule) {
      notes.push(timeRule);
    }

    // Add weather-specific notes
    if (input.weather === 'rainy' || input.weather === 'monsoon') {
      notes.push(...culturalGuidelines.monsoon);
    }

    return notes;
  }

  /**
   * Determine current time slot based on input time
   */
  private getCurrentTimeSlot(time: string): string {
    const timeSlotEntries = Object.entries(timeSlots);
    
    for (const [slotName, slot] of timeSlotEntries) {
      if (this.isTimeInSlot(time, slot)) {
        return slotName;
      }
    }
    
    return 'allDay';
  }

  /**
   * Check if a time falls within a time slot
   */
  private isTimeInSlot(time: string, slot: TimeSlot): boolean {
    const timeMinutes = this.timeToMinutes(time);
    const startMinutes = this.timeToMinutes(slot.start);
    const endMinutes = this.timeToMinutes(slot.end);

    // Handle overnight slots (e.g., 22:00 to 02:00)
    if (startMinutes > endMinutes) {
      return timeMinutes >= startMinutes || timeMinutes <= endMinutes;
    }
    
    return timeMinutes >= startMinutes && timeMinutes <= endMinutes;
  }

  /**
   * Convert HH:MM time to minutes since midnight
   */
  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
}