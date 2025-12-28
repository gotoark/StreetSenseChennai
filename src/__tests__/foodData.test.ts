import { FoodDatabase } from '../data/FoodDatabase';
import { MoodType, ChennaiArea } from '../types';

describe('Food Database Implementation', () => {
  let foodDb: FoodDatabase;

  beforeEach(() => {
    foodDb = new FoodDatabase();
  });

  test('should return all food items', () => {
    const allFoods = foodDb.getAllFoodItems();
    expect(allFoods.length).toBeGreaterThan(0);
    expect(allFoods[0]).toHaveProperty('name');
    expect(allFoods[0]).toHaveProperty('category');
    expect(allFoods[0]).toHaveProperty('moods');
    expect(allFoods[0]).toHaveProperty('areas');
    expect(allFoods[0]).toHaveProperty('timeSlots');
  });

  test('should return foods by mood - rainy evening', () => {
    const rainyFoods = foodDb.getFoodsByMood(MoodType.RAINY_EVENING);
    expect(rainyFoods.length).toBeGreaterThan(0);
    
    const foodNames = rainyFoods.map(f => f.name);
    expect(foodNames).toContain('Bajji');
    expect(foodNames).toContain('Hot tea');
    expect(foodNames).toContain('Vadai');
  });

  test('should return foods by mood - midnight hunger', () => {
    const midnightFoods = foodDb.getFoodsByMood(MoodType.MIDNIGHT_HUNGER);
    expect(midnightFoods.length).toBeGreaterThan(0);
    
    const foodNames = midnightFoods.map(f => f.name);
    expect(foodNames).toContain('Dosa');
    expect(foodNames).toContain('Kothu parotta');
    expect(foodNames).toContain('Egg rice');
  });

  test('should return area specialties', () => {
    const tNagarSpecialties = foodDb.getAreaSpecialties(ChennaiArea.T_NAGAR);
    expect(tNagarSpecialties.length).toBeGreaterThan(0);
    
    const eveningSpecialty = tNagarSpecialties.find(s => s.timeSlot === 'evening');
    expect(eveningSpecialty).toBeDefined();
    expect(eveningSpecialty?.foods).toContain('Sundal');
  });

  test('should return foods by time - evening', () => {
    const eveningFoods = foodDb.getFoodsByTime('18:00');
    expect(eveningFoods.length).toBeGreaterThan(0);
    
    const foodNames = eveningFoods.map(f => f.name);
    expect(foodNames).toContain('Bajji');
    expect(foodNames).toContain('Sundal');
  });

  test('should return foods by time - late night', () => {
    const lateNightFoods = foodDb.getFoodsByTime('23:00');
    expect(lateNightFoods.length).toBeGreaterThan(0);
    
    const foodNames = lateNightFoods.map(f => f.name);
    expect(foodNames).toContain('Dosa');
    expect(foodNames).toContain('Kothu parotta');
  });

  test('should handle overnight time slots correctly', () => {
    const earlyMorningFoods = foodDb.getFoodsByTime('01:00');
    expect(earlyMorningFoods.length).toBeGreaterThan(0);
    
    // Should include late night foods that are available until 02:00
    const foodNames = earlyMorningFoods.map(f => f.name);
    expect(foodNames).toContain('Dosa');
  });

  test('should return safety notes for conditions', () => {
    const monsoonNotes = foodDb.getSafetyNotes(['monsoon']);
    expect(monsoonNotes.length).toBeGreaterThan(0);
    expect(monsoonNotes).toContain('Avoid raw items during monsoon');
  });

  test('should check if food should be avoided', () => {
    const paniPuriCheck = foodDb.shouldAvoidFood('Pani puri', ['heavy rain']);
    expect(paniPuriCheck.avoid).toBe(true);
    expect(paniPuriCheck.reason).toContain('Water-based snack unsafe');
    
    const bajjiCheck = foodDb.shouldAvoidFood('Bajji', ['heavy rain']);
    expect(bajjiCheck.avoid).toBe(false);
  });

  test('should return mood-food mappings', () => {
    const mappings = foodDb.getMoodFoodMappings();
    expect(mappings[MoodType.RAINY_EVENING]).toContain('Bajji');
    expect(mappings[MoodType.STRESS_RELIEF]).toContain('Filter coffee');
  });

  test('should return ordering tips', () => {
    const tips = foodDb.getOrderingTips();
    expect(tips.length).toBeGreaterThan(0);
    expect(tips).toContain('Anna, medium spicy pothum');
  });
});