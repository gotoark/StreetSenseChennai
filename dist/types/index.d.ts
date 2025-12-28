export declare enum MoodType {
    RAINY_EVENING = "rainy_evening",
    HUNGRY_HEAVY = "hungry_heavy",
    LIGHT_SNACK = "light_snack",
    STRESS_RELIEF = "stress_relief",
    MIDNIGHT_HUNGER = "midnight_hunger"
}
export declare enum ChennaiArea {
    T_NAGAR = "t_nagar",
    ANNA_NAGAR = "anna_nagar",
    MYLAPORE = "mylapore",
    TRIPLICANE = "triplicane",
    VELACHERY = "velachery",
    TAMBARAM = "tambaram",
    OMR = "omr",
    PARRYS_CORNER = "parrys_corner"
}
export declare enum WeatherCondition {
    SUNNY = "sunny",
    RAINY = "rainy",
    CLOUDY = "cloudy",
    MONSOON = "monsoon"
}
export interface TimeSlot {
    start: string;
    end: string;
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
export interface UserInput {
    mood: MoodType;
    area: ChennaiArea;
    time: string;
    weather?: WeatherCondition;
}
export interface ValidatedInput extends UserInput {
    isValid: boolean;
    errors: string[];
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
//# sourceMappingURL=index.d.ts.map