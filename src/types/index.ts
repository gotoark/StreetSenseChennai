// Core enums for the Chennai Street Food Assistant

export enum MoodType {
  RAINY_EVENING = "rainy_evening",
  HUNGRY_HEAVY = "hungry_heavy", 
  LIGHT_SNACK = "light_snack",
  STRESS_RELIEF = "stress_relief",
  MIDNIGHT_HUNGER = "midnight_hunger"
}

export enum ChennaiArea {
  T_NAGAR = "t_nagar",
  ANNA_NAGAR = "anna_nagar",
  MYLAPORE = "mylapore",
  TRIPLICANE = "triplicane",
  VELACHERY = "velachery",
  TAMBARAM = "tambaram",
  OMR = "omr",
  PARRYS_CORNER = "parrys_corner"
}

export enum WeatherCondition {
  SUNNY = "sunny",
  RAINY = "rainy",
  CLOUDY = "cloudy",
  MONSOON = "monsoon"
}

// Core interfaces for data structures

export interface TimeSlot {
  start: string; // HH:MM format
  end: string;   // HH:MM format
}

export interface FoodItem {
  name: string;
  category: string;
  moods: MoodType[];
  areas: ChennaiArea[];
  timeSlots: TimeSlot[];
  safetyNotes?: string[];
}

export interface AreaSpecialty {
  area: ChennaiArea;
  timeSlot: string;
  foods: string[];
  notes?: string;
}

// User input and validation interfaces

export interface UserInput {
  mood: MoodType;
  area: ChennaiArea;
  time: string; // HH:MM format
  weather?: WeatherCondition;
}

export interface ValidatedInput extends UserInput {
  isValid: boolean;
  errors: string[];
}

// Recommendation interfaces

export interface Recommendation {
  foodItem: string;
  explanation: string;
  localContext: string[];
  orderingTips?: string[];
  safetyNotes?: string[];
  confidence: number;
}

export interface RecommendationResponse {
  recommendations: Recommendation[];
  generalNotes: string[];
  timestamp: string;
}

// Error handling interfaces

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface SystemError {
  type: 'validation' | 'processing' | 'data' | 'system';
  message: string;
  details?: any;
}