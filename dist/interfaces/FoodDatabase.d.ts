import { FoodItem, AreaSpecialty, MoodType, ChennaiArea } from '../types';
/**
 * Interface for food data management
 */
export interface IFoodDatabase {
    /**
     * Get all food items from the database
     * @returns Array of all food items
     */
    getAllFoodItems(): FoodItem[];
    /**
     * Get food items by mood
     * @param mood - User's mood type
     * @returns Food items matching the mood
     */
    getFoodsByMood(mood: MoodType): FoodItem[];
    /**
     * Get area specialties
     * @param area - Chennai area
     * @returns Area-specific food specialties
     */
    getAreaSpecialties(area: ChennaiArea): AreaSpecialty[];
    /**
     * Get food items available at specific time
     * @param time - Time in HH:MM format
     * @returns Food items available at that time
     */
    getFoodsByTime(time: string): FoodItem[];
    /**
     * Load food data from product.md content
     * @param productData - Structured data from product.md
     */
    loadFoodData(productData: any): void;
    /**
     * Get safety notes for specific conditions
     * @param conditions - Weather, time, or other conditions
     * @returns Relevant safety notes
     */
    getSafetyNotes(conditions: string[]): string[];
}
//# sourceMappingURL=FoodDatabase.d.ts.map