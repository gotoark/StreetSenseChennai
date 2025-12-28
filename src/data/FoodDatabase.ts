import { IFoodDatabase } from '../interfaces/FoodDatabase';
import { 
  FoodItem, 
  AreaSpecialty, 
  MoodType, 
  ChennaiArea 
} from '../types';
import { 
  foodItems, 
  areaSpecialties, 
  moodFoodMappings,
  culturalGuidelines,
  orderingTips,
  doNotRecommend,
  safetyNotesByCondition
} from './foodData';

/**
 * Concrete implementation of the food database
 * Contains all Chennai street food data from product.md
 */
export class FoodDatabase implements IFoodDatabase {
  private foodItems: FoodItem[];
  private areaSpecialties: AreaSpecialty[];

  constructor() {
    this.foodItems = [...foodItems];
    this.areaSpecialties = [...areaSpecialties];
  }

  /**
   * Get all food items from the database
   */
  getAllFoodItems(): FoodItem[] {
    return [...this.foodItems];
  }

  /**
   * Get food items by mood
   */
  getFoodsByMood(mood: MoodType): FoodItem[] {
    return this.foodItems.filter(item => 
      item.moods.includes(mood)
    );
  }

  /**
   * Get area specialties
   */
  getAreaSpecialties(area: ChennaiArea): AreaSpecialty[] {
    return this.areaSpecialties.filter(specialty => 
      specialty.area === area
    );
  }

  /**
   * Get food items available at specific time
   */
  getFoodsByTime(time: string): FoodItem[] {
    const [hours, minutes] = time.split(':').map(Number);
    const timeInMinutes = hours * 60 + minutes;

    return this.foodItems.filter(item => {
      return item.timeSlots.some(slot => {
        const [startHours, startMinutes] = slot.start.split(':').map(Number);
        const [endHours, endMinutes] = slot.end.split(':').map(Number);
        
        const startTime = startHours * 60 + startMinutes;
        let endTime = endHours * 60 + endMinutes;
        
        // Handle overnight time slots (e.g., 22:00 to 02:00)
        if (endTime < startTime) {
          endTime += 24 * 60; // Add 24 hours
          // Check if current time is in the late night portion
          if (timeInMinutes < 12 * 60) { // Before noon, add 24 hours to current time
            return timeInMinutes + 24 * 60 >= startTime && timeInMinutes + 24 * 60 <= endTime;
          }
        }
        
        return timeInMinutes >= startTime && timeInMinutes <= endTime;
      });
    });
  }

  /**
   * Load food data from product.md content
   * This implementation uses pre-structured data
   */
  loadFoodData(productData: any): void {
    // Data is already loaded from foodData.ts
    // This method could be used to reload or update data if needed
    console.log('Food data already loaded from structured data');
  }

  /**
   * Get safety notes for specific conditions
   */
  getSafetyNotes(conditions: string[]): string[] {
    const notes: string[] = [];
    
    conditions.forEach(condition => {
      if (safetyNotesByCondition[condition]) {
        notes.push(...safetyNotesByCondition[condition]);
      }
    });

    return [...new Set(notes)]; // Remove duplicates
  }

  /**
   * Get mood-food mappings
   */
  getMoodFoodMappings(): Record<MoodType, string[]> {
    return { ...moodFoodMappings };
  }

  /**
   * Get cultural guidelines
   */
  getCulturalGuidelines(): typeof culturalGuidelines {
    return { ...culturalGuidelines };
  }

  /**
   * Get ordering tips in local language
   */
  getOrderingTips(): string[] {
    return [...orderingTips];
  }

  /**
   * Get items that should not be recommended under certain conditions
   */
  getDoNotRecommendList(): typeof doNotRecommend {
    return [...doNotRecommend];
  }

  /**
   * Check if a food item should be avoided under current conditions
   */
  shouldAvoidFood(foodName: string, conditions: string[]): { avoid: boolean; reason?: string } {
    for (const restriction of doNotRecommend) {
      if (restriction.item.toLowerCase() === foodName.toLowerCase()) {
        for (const condition of conditions) {
          if (restriction.condition === condition) {
            return { avoid: true, reason: restriction.reason };
          }
        }
      }
    }
    return { avoid: false };
  }

  /**
   * Get foods by area and time slot
   */
  getFoodsByAreaAndTime(area: ChennaiArea, timeSlot: string): string[] {
    const specialties = this.getAreaSpecialties(area);
    const relevantSpecialty = specialties.find(s => s.timeSlot === timeSlot);
    return relevantSpecialty ? relevantSpecialty.foods : [];
  }
}