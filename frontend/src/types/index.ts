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

export interface UserInput {
  mood: MoodType;
  area: ChennaiArea;
  time: string;
  weather?: string;
}

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

export interface ApiError {
  error: string;
  details?: string;
}

// UI-specific types
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export const MOOD_LABELS: Record<MoodType, string> = {
  [MoodType.RAINY_EVENING]: "Rainy Evening Vibes",
  [MoodType.HUNGRY_HEAVY]: "Really Hungry",
  [MoodType.LIGHT_SNACK]: "Light Snack",
  [MoodType.STRESS_RELIEF]: "Need Comfort Food",
  [MoodType.MIDNIGHT_HUNGER]: "Midnight Cravings"
};

export const AREA_LABELS: Record<ChennaiArea, string> = {
  [ChennaiArea.T_NAGAR]: "T Nagar",
  [ChennaiArea.ANNA_NAGAR]: "Anna Nagar",
  [ChennaiArea.MYLAPORE]: "Mylapore",
  [ChennaiArea.TRIPLICANE]: "Triplicane",
  [ChennaiArea.VELACHERY]: "Velachery",
  [ChennaiArea.TAMBARAM]: "Tambaram",
  [ChennaiArea.OMR]: "OMR",
  [ChennaiArea.PARRYS_CORNER]: "Parrys Corner"
};