import { 
  FoodItem, 
  AreaSpecialty, 
  MoodType, 
  ChennaiArea, 
  TimeSlot 
} from '../types';

/**
 * Structured food data converted from product.md
 * This file contains all the Chennai street food knowledge base
 */

// Mood to food mappings from product.md
export const moodFoodMappings: Record<MoodType, string[]> = {
  [MoodType.RAINY_EVENING]: [
    'Bajji',
    'Bonda', 
    'Milagai bajji',
    'Vadai',
    'Hot tea',
    'Ginger tea'
  ],
  [MoodType.HUNGRY_HEAVY]: [
    'Parotta with salna',
    'Kothu parotta',
    'Egg dosa',
    'Kal dosa'
  ],
  [MoodType.LIGHT_SNACK]: [
    'Sundal',
    'Corn on the cob',
    'Fruit chaat'
  ],
  [MoodType.STRESS_RELIEF]: [
    'Spicy sundal',
    'Gobi 65',
    'Masala vadai',
    'Filter coffee'
  ],
  [MoodType.MIDNIGHT_HUNGER]: [
    'Dosa',
    'Egg rice',
    'Kothu parotta',
    'Bread omelette'
  ]
};

// Time slots for different food categories
export const timeSlots = {
  breakfast: { start: '06:00', end: '09:00' },
  morning: { start: '09:00', end: '12:00' },
  afternoon: { start: '12:00', end: '17:00' },
  evening: { start: '17:00', end: '19:00' },
  night: { start: '19:00', end: '22:00' },
  lateNight: { start: '22:00', end: '02:00' },
  allDay: { start: '06:00', end: '23:59' }
};

// All food items with their properties
export const foodItems: FoodItem[] = [
  // Rainy evening foods
  {
    name: 'Bajji',
    category: 'fried_snack',
    moods: [MoodType.RAINY_EVENING],
    areas: [ChennaiArea.T_NAGAR, ChennaiArea.VELACHERY, ChennaiArea.ANNA_NAGAR, ChennaiArea.MYLAPORE, ChennaiArea.TRIPLICANE, ChennaiArea.TAMBARAM, ChennaiArea.OMR, ChennaiArea.PARRYS_CORNER],
    timeSlots: [timeSlots.evening, timeSlots.night],
    safetyNotes: ['Preferred during rain', 'Fried snacks sell fastest during rain']
  },
  {
    name: 'Bonda',
    category: 'fried_snack',
    moods: [MoodType.RAINY_EVENING],
    areas: [ChennaiArea.VELACHERY, ChennaiArea.ANNA_NAGAR, ChennaiArea.MYLAPORE, ChennaiArea.T_NAGAR, ChennaiArea.TRIPLICANE, ChennaiArea.TAMBARAM, ChennaiArea.OMR, ChennaiArea.PARRYS_CORNER],
    timeSlots: [timeSlots.evening, timeSlots.night]
  },
  {
    name: 'Milagai bajji',
    category: 'fried_snack',
    moods: [MoodType.RAINY_EVENING],
    areas: [ChennaiArea.T_NAGAR, ChennaiArea.VELACHERY, ChennaiArea.ANNA_NAGAR, ChennaiArea.MYLAPORE, ChennaiArea.TRIPLICANE, ChennaiArea.TAMBARAM, ChennaiArea.OMR, ChennaiArea.PARRYS_CORNER],
    timeSlots: [timeSlots.evening, timeSlots.night]
  },
  {
    name: 'Vadai',
    category: 'fried_snack',
    moods: [MoodType.RAINY_EVENING, MoodType.STRESS_RELIEF],
    areas: [ChennaiArea.MYLAPORE, ChennaiArea.T_NAGAR, ChennaiArea.ANNA_NAGAR, ChennaiArea.TRIPLICANE, ChennaiArea.VELACHERY, ChennaiArea.TAMBARAM, ChennaiArea.OMR, ChennaiArea.PARRYS_CORNER],
    timeSlots: [timeSlots.breakfast, timeSlots.evening, timeSlots.night]
  },
  {
    name: 'Hot tea',
    category: 'beverage',
    moods: [MoodType.RAINY_EVENING],
    areas: [ChennaiArea.T_NAGAR, ChennaiArea.ANNA_NAGAR, ChennaiArea.MYLAPORE, ChennaiArea.TRIPLICANE, ChennaiArea.VELACHERY, ChennaiArea.TAMBARAM, ChennaiArea.OMR, ChennaiArea.PARRYS_CORNER],
    timeSlots: [timeSlots.allDay],
    safetyNotes: ['Preferred during rain']
  },
  {
    name: 'Ginger tea',
    category: 'beverage',
    moods: [MoodType.RAINY_EVENING],
    areas: [ChennaiArea.T_NAGAR, ChennaiArea.ANNA_NAGAR, ChennaiArea.MYLAPORE, ChennaiArea.TRIPLICANE, ChennaiArea.VELACHERY, ChennaiArea.TAMBARAM, ChennaiArea.OMR, ChennaiArea.PARRYS_CORNER],
    timeSlots: [timeSlots.allDay]
  },

  // Heavy/hungry foods
  {
    name: 'Parotta with salna',
    category: 'main_dish',
    moods: [MoodType.HUNGRY_HEAVY],
    areas: [ChennaiArea.TRIPLICANE, ChennaiArea.VELACHERY, ChennaiArea.ANNA_NAGAR, ChennaiArea.T_NAGAR, ChennaiArea.TAMBARAM, ChennaiArea.OMR, ChennaiArea.PARRYS_CORNER],
    timeSlots: [timeSlots.night, timeSlots.lateNight]
  },
  {
    name: 'Kothu parotta',
    category: 'main_dish',
    moods: [MoodType.HUNGRY_HEAVY, MoodType.MIDNIGHT_HUNGER],
    areas: [ChennaiArea.TRIPLICANE, ChennaiArea.VELACHERY, ChennaiArea.ANNA_NAGAR, ChennaiArea.T_NAGAR, ChennaiArea.TAMBARAM, ChennaiArea.OMR, ChennaiArea.PARRYS_CORNER],
    timeSlots: [timeSlots.night, timeSlots.lateNight],
    safetyNotes: ['More filling after midnight']
  },
  {
    name: 'Egg dosa',
    category: 'main_dish',
    moods: [MoodType.HUNGRY_HEAVY],
    areas: [ChennaiArea.T_NAGAR, ChennaiArea.ANNA_NAGAR, ChennaiArea.VELACHERY, ChennaiArea.TRIPLICANE, ChennaiArea.TAMBARAM, ChennaiArea.OMR, ChennaiArea.PARRYS_CORNER],
    timeSlots: [timeSlots.evening, timeSlots.night, timeSlots.lateNight]
  },
  {
    name: 'Kal dosa',
    category: 'main_dish',
    moods: [MoodType.HUNGRY_HEAVY],
    areas: [ChennaiArea.T_NAGAR, ChennaiArea.ANNA_NAGAR, ChennaiArea.VELACHERY, ChennaiArea.TRIPLICANE, ChennaiArea.TAMBARAM, ChennaiArea.OMR, ChennaiArea.PARRYS_CORNER],
    timeSlots: [timeSlots.evening, timeSlots.night]
  },

  // Light snacks
  {
    name: 'Sundal',
    category: 'light_snack',
    moods: [MoodType.LIGHT_SNACK, MoodType.STRESS_RELIEF],
    areas: [ChennaiArea.T_NAGAR, ChennaiArea.MYLAPORE, ChennaiArea.ANNA_NAGAR, ChennaiArea.TRIPLICANE, ChennaiArea.VELACHERY, ChennaiArea.TAMBARAM, ChennaiArea.OMR, ChennaiArea.PARRYS_CORNER],
    timeSlots: [timeSlots.evening, timeSlots.night]
  },
  {
    name: 'Spicy sundal',
    category: 'light_snack',
    moods: [MoodType.STRESS_RELIEF],
    areas: [ChennaiArea.T_NAGAR, ChennaiArea.MYLAPORE, ChennaiArea.ANNA_NAGAR, ChennaiArea.TRIPLICANE, ChennaiArea.VELACHERY, ChennaiArea.TAMBARAM, ChennaiArea.OMR, ChennaiArea.PARRYS_CORNER],
    timeSlots: [timeSlots.evening, timeSlots.night]
  },
  {
    name: 'Corn on the cob',
    category: 'light_snack',
    moods: [MoodType.LIGHT_SNACK],
    areas: [ChennaiArea.T_NAGAR, ChennaiArea.ANNA_NAGAR, ChennaiArea.VELACHERY, ChennaiArea.TRIPLICANE, ChennaiArea.TAMBARAM, ChennaiArea.OMR, ChennaiArea.PARRYS_CORNER],
    timeSlots: [timeSlots.evening, timeSlots.night],
    safetyNotes: ['Avoid during heavy rain']
  },
  {
    name: 'Fruit chaat',
    category: 'light_snack',
    moods: [MoodType.LIGHT_SNACK],
    areas: [ChennaiArea.T_NAGAR, ChennaiArea.ANNA_NAGAR, ChennaiArea.TRIPLICANE, ChennaiArea.VELACHERY, ChennaiArea.TAMBARAM, ChennaiArea.OMR, ChennaiArea.PARRYS_CORNER],
    timeSlots: [timeSlots.evening, timeSlots.night]
  },

  // Stress relief foods
  {
    name: 'Gobi 65',
    category: 'fried_snack',
    moods: [MoodType.STRESS_RELIEF],
    areas: [ChennaiArea.ANNA_NAGAR, ChennaiArea.T_NAGAR, ChennaiArea.VELACHERY, ChennaiArea.TRIPLICANE, ChennaiArea.TAMBARAM, ChennaiArea.OMR, ChennaiArea.PARRYS_CORNER],
    timeSlots: [timeSlots.evening, timeSlots.night]
  },
  {
    name: 'Masala vadai',
    category: 'fried_snack',
    moods: [MoodType.STRESS_RELIEF],
    areas: [ChennaiArea.MYLAPORE, ChennaiArea.T_NAGAR, ChennaiArea.ANNA_NAGAR, ChennaiArea.TRIPLICANE, ChennaiArea.VELACHERY, ChennaiArea.TAMBARAM, ChennaiArea.OMR, ChennaiArea.PARRYS_CORNER],
    timeSlots: [timeSlots.evening, timeSlots.night]
  },
  {
    name: 'Filter coffee',
    category: 'beverage',
    moods: [MoodType.STRESS_RELIEF],
    areas: [ChennaiArea.MYLAPORE, ChennaiArea.T_NAGAR, ChennaiArea.ANNA_NAGAR, ChennaiArea.TRIPLICANE, ChennaiArea.VELACHERY, ChennaiArea.TAMBARAM, ChennaiArea.OMR, ChennaiArea.PARRYS_CORNER],
    timeSlots: [timeSlots.allDay]
  },

  // Midnight hunger foods
  {
    name: 'Dosa',
    category: 'main_dish',
    moods: [MoodType.MIDNIGHT_HUNGER],
    areas: [ChennaiArea.T_NAGAR, ChennaiArea.ANNA_NAGAR, ChennaiArea.VELACHERY, ChennaiArea.TRIPLICANE, ChennaiArea.TAMBARAM, ChennaiArea.OMR, ChennaiArea.PARRYS_CORNER],
    timeSlots: [timeSlots.lateNight],
    safetyNotes: ['Options reduce after midnight but food is more filling']
  },
  {
    name: 'Egg rice',
    category: 'main_dish',
    moods: [MoodType.MIDNIGHT_HUNGER],
    areas: [ChennaiArea.VELACHERY, ChennaiArea.OMR, ChennaiArea.ANNA_NAGAR, ChennaiArea.T_NAGAR, ChennaiArea.TRIPLICANE, ChennaiArea.TAMBARAM, ChennaiArea.PARRYS_CORNER],
    timeSlots: [timeSlots.lateNight]
  },
  {
    name: 'Bread omelette',
    category: 'main_dish',
    moods: [MoodType.MIDNIGHT_HUNGER],
    areas: [ChennaiArea.T_NAGAR, ChennaiArea.ANNA_NAGAR, ChennaiArea.VELACHERY, ChennaiArea.TRIPLICANE, ChennaiArea.TAMBARAM, ChennaiArea.OMR, ChennaiArea.PARRYS_CORNER],
    timeSlots: [timeSlots.lateNight]
  },

  // Additional area-specific items
  {
    name: 'Idli',
    category: 'breakfast',
    moods: [],
    areas: [ChennaiArea.MYLAPORE, ChennaiArea.T_NAGAR, ChennaiArea.ANNA_NAGAR, ChennaiArea.TRIPLICANE, ChennaiArea.VELACHERY, ChennaiArea.TAMBARAM, ChennaiArea.OMR, ChennaiArea.PARRYS_CORNER],
    timeSlots: [timeSlots.breakfast, timeSlots.morning]
  },
  {
    name: 'Pongal',
    category: 'breakfast',
    moods: [],
    areas: [ChennaiArea.MYLAPORE, ChennaiArea.T_NAGAR, ChennaiArea.ANNA_NAGAR, ChennaiArea.TRIPLICANE, ChennaiArea.VELACHERY, ChennaiArea.TAMBARAM, ChennaiArea.OMR, ChennaiArea.PARRYS_CORNER],
    timeSlots: [timeSlots.breakfast, timeSlots.morning]
  },
  {
    name: 'Chaat',
    category: 'light_snack',
    moods: [MoodType.LIGHT_SNACK],
    areas: [ChennaiArea.T_NAGAR, ChennaiArea.TRIPLICANE, ChennaiArea.ANNA_NAGAR, ChennaiArea.VELACHERY, ChennaiArea.TAMBARAM, ChennaiArea.OMR, ChennaiArea.PARRYS_CORNER],
    timeSlots: [timeSlots.evening, timeSlots.night]
  },
  {
    name: 'Samosas',
    category: 'fried_snack',
    moods: [],
    areas: [ChennaiArea.TRIPLICANE, ChennaiArea.T_NAGAR, ChennaiArea.ANNA_NAGAR, ChennaiArea.VELACHERY, ChennaiArea.TAMBARAM, ChennaiArea.OMR, ChennaiArea.PARRYS_CORNER],
    timeSlots: [timeSlots.evening, timeSlots.night]
  },
  {
    name: 'Gobi manchurian',
    category: 'chinese',
    moods: [],
    areas: [ChennaiArea.ANNA_NAGAR, ChennaiArea.T_NAGAR, ChennaiArea.VELACHERY, ChennaiArea.TRIPLICANE, ChennaiArea.TAMBARAM, ChennaiArea.OMR, ChennaiArea.PARRYS_CORNER],
    timeSlots: [timeSlots.evening, timeSlots.night]
  },
  {
    name: 'Momos',
    category: 'chinese',
    moods: [],
    areas: [ChennaiArea.ANNA_NAGAR, ChennaiArea.T_NAGAR, ChennaiArea.VELACHERY, ChennaiArea.TRIPLICANE, ChennaiArea.TAMBARAM, ChennaiArea.OMR, ChennaiArea.PARRYS_CORNER],
    timeSlots: [timeSlots.evening, timeSlots.night]
  },
  {
    name: 'Fried rice',
    category: 'main_dish',
    moods: [],
    areas: [ChennaiArea.VELACHERY, ChennaiArea.OMR, ChennaiArea.ANNA_NAGAR, ChennaiArea.T_NAGAR, ChennaiArea.TRIPLICANE, ChennaiArea.TAMBARAM, ChennaiArea.PARRYS_CORNER],
    timeSlots: [timeSlots.night, timeSlots.lateNight]
  },
  {
    name: 'Puffs',
    category: 'light_snack',
    moods: [],
    areas: [ChennaiArea.OMR, ChennaiArea.T_NAGAR, ChennaiArea.ANNA_NAGAR, ChennaiArea.VELACHERY, ChennaiArea.TRIPLICANE, ChennaiArea.TAMBARAM, ChennaiArea.PARRYS_CORNER],
    timeSlots: [timeSlots.evening, timeSlots.night]
  }
];

// Area-wise specialties from product.md
export const areaSpecialties: AreaSpecialty[] = [
  // T Nagar
  {
    area: ChennaiArea.T_NAGAR,
    timeSlot: 'evening',
    foods: ['Sundal', 'Bajji', 'Chaat'],
    notes: 'Avoid overcrowded pani puri stalls'
  },
  {
    area: ChennaiArea.T_NAGAR,
    timeSlot: 'night',
    foods: ['Dosa'],
    notes: 'Dosa carts near main roads'
  },

  // Mylapore
  {
    area: ChennaiArea.MYLAPORE,
    timeSlot: 'morning',
    foods: ['Idli', 'Vadai', 'Pongal'],
    notes: 'Traditional snacks near temples'
  },
  {
    area: ChennaiArea.MYLAPORE,
    timeSlot: 'evening',
    foods: ['Vadai', 'Sundal'],
    notes: 'Mostly vegetarian options'
  },

  // Triplicane
  {
    area: ChennaiArea.TRIPLICANE,
    timeSlot: 'evening',
    foods: ['Chaat', 'Samosas'],
    notes: 'Spicy food common'
  },
  {
    area: ChennaiArea.TRIPLICANE,
    timeSlot: 'night',
    foods: ['Parotta with salna', 'Kothu parotta'],
    notes: 'Spicy food common'
  },

  // Anna Nagar
  {
    area: ChennaiArea.ANNA_NAGAR,
    timeSlot: 'evening',
    foods: ['Gobi manchurian', 'Momos'],
    notes: 'Cleaner carts compared to older areas'
  },
  {
    area: ChennaiArea.ANNA_NAGAR,
    timeSlot: 'night',
    foods: ['Dosa'],
    notes: 'Chinese stalls available'
  },

  // Velachery
  {
    area: ChennaiArea.VELACHERY,
    timeSlot: 'evening',
    foods: ['Bajji', 'Bonda'],
    notes: 'Rain increases food demand'
  },
  {
    area: ChennaiArea.VELACHERY,
    timeSlot: 'night',
    foods: ['Kothu parotta', 'Fried rice'],
    notes: 'Good egg-based dishes'
  },

  // OMR
  {
    area: ChennaiArea.OMR,
    timeSlot: 'evening',
    foods: ['Hot tea', 'Puffs'],
    notes: 'Quick snacks near tech parks'
  },
  {
    area: ChennaiArea.OMR,
    timeSlot: 'night',
    foods: ['Egg rice', 'Fried rice'],
    notes: 'Late-night stalls near tech parks'
  },

  // Parrys Corner
  {
    area: ChennaiArea.PARRYS_CORNER,
    timeSlot: 'morning',
    foods: ['Idli', 'Vadai', 'Pongal'],
    notes: 'Street breakfasts available'
  },
  {
    area: ChennaiArea.PARRYS_CORNER,
    timeSlot: 'afternoon',
    foods: ['Chaat', 'Samosas'],
    notes: 'Avoid late night unless familiar'
  },

  // Tambaram
  {
    area: ChennaiArea.TAMBARAM,
    timeSlot: 'evening',
    foods: ['Bajji', 'Vadai', 'Sundal'],
    notes: 'Good variety of traditional snacks'
  },
  {
    area: ChennaiArea.TAMBARAM,
    timeSlot: 'night',
    foods: ['Kothu parotta', 'Dosa'],
    notes: 'Popular dinner options'
  }
];

// Cultural and safety guidelines
export const culturalGuidelines = {
  general: [
    'Cash preferred at most carts',
    'Ask for medium spicy if unsure'
  ],
  monsoon: [
    'Avoid raw items during monsoon',
    'Fried snacks sell fastest during rain'
  ],
  timeBasedRules: [
    'Before 9 AM: Breakfast items only',
    '5–7 PM: Tea + snacks peak',
    'After 10 PM: Limited stalls, heavier food',
    'Sunday mornings: Best for traditional snacks'
  ]
};

// Ordering phrases in local language
export const orderingTips = [
  'Anna, medium spicy pothum',
  'Konjam kammi kaaram',
  'Parcel kudunga',
  'Extra salna venum'
];

// Items to avoid under certain conditions
export const doNotRecommend = [
  {
    item: 'Pani puri',
    condition: 'heavy rain',
    reason: 'Water-based snack unsafe during heavy rain'
  },
  {
    item: 'Raw vegetables',
    condition: 'late at night',
    reason: 'Freshness concerns after midnight'
  },
  {
    item: 'Unknown carts',
    condition: 'after midnight',
    reason: 'Safety and hygiene concerns'
  },
  {
    item: 'Corn on the cob',
    condition: 'heavy rain',
    reason: 'Avoid during heavy rain as mentioned in product.md'
  }
];

// Safety notes by condition
export const safetyNotesByCondition: Record<string, string[]> = {
  'monsoon': [
    'Avoid raw items during monsoon',
    'Fried snacks are safer during rain'
  ],
  'late_night': [
    'Options reduce after midnight but food is more filling',
    'Avoid unknown carts after midnight'
  ],
  'heavy_rain': [
    'Avoid pani puri during heavy rain',
    'Avoid corn on the cob during heavy rain',
    'Fried snacks + tea are preferred during rain'
  ]
};