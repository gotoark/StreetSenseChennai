import { IRulesEngine } from '../interfaces/RulesEngine';
import { ValidatedInput, FoodItem, WeatherCondition, ChennaiArea } from '../types';

/**
 * Implementation of business rules and safety checks for Chennai street food
 */
export class RulesEngine implements IRulesEngine {
  
  // Do Not Recommend list based on conditions
  private readonly doNotRecommendRules = [
    {
      condition: (input: ValidatedInput) => input.weather === WeatherCondition.MONSOON || input.weather === WeatherCondition.RAINY,
      excludedItems: ['pani puri', 'raw vegetables', 'corn on the cob'],
      reason: 'Avoid raw items during monsoon/rain'
    },
    {
      condition: (input: ValidatedInput) => this.isLateNight(input.time),
      excludedItems: ['raw vegetables', 'pani puri'],
      reason: 'Raw vegetables not safe late at night'
    },
    {
      condition: (input: ValidatedInput) => this.isAfterMidnight(input.time),
      excludedItems: ['unknown carts'],
      reason: 'Unknown carts after midnight not recommended'
    }
  ];

  // Cultural guidelines based on area and time
  private readonly culturalGuidelines = [
    {
      area: ChennaiArea.MYLAPORE,
      guideline: 'Mostly vegetarian options near temples',
      preferVegetarian: true,
      morningSpecialty: ['idli', 'vadai', 'pongal'],
      eveningSpecialty: ['traditional snacks near temples']
    },
    {
      area: ChennaiArea.T_NAGAR,
      guideline: 'Avoid overcrowded pani puri stalls',
      avoidItems: ['pani puri'],
      eveningSpecialty: ['sundal', 'bajji', 'chaat'],
      nightSpecialty: ['dosa carts near main roads']
    },
    {
      area: ChennaiArea.PARRYS_CORNER,
      guideline: 'Avoid late night unless familiar',
      timeRestriction: '22:00',
      morningSpecialty: ['street breakfasts'],
      afternoonSpecialty: ['meals', 'snacks']
    },
    {
      area: ChennaiArea.TRIPLICANE,
      guideline: 'Spicy food common',
      eveningSpecialty: ['chaat', 'samosas'],
      nightSpecialty: ['parotta', 'kebabs', 'kothu parotta'],
      spicyPreference: true
    },
    {
      area: ChennaiArea.ANNA_NAGAR,
      guideline: 'Cleaner carts compared to older areas',
      eveningSpecialty: ['gobi manchurian', 'momos'],
      nightSpecialty: ['dosa', 'chinese stalls']
    },
    {
      area: ChennaiArea.VELACHERY,
      guideline: 'Rain increases food demand',
      eveningSpecialty: ['bajji', 'bonda', 'egg snacks'],
      nightSpecialty: ['kothu parotta', 'fried rice'],
      rainyBonus: true
    },
    {
      area: ChennaiArea.OMR,
      guideline: 'Late-night stalls near tech parks',
      eveningSpecialty: ['tea', 'puffs', 'quick snacks'],
      nightSpecialty: ['egg-based dishes', 'fried rice'],
      techParkArea: true
    }
  ];

  // General cultural habits and local rules
  private readonly generalCulturalRules = [
    'Cash preferred at most carts',
    'Ask for medium spicy if unsure',
    'Fried snacks sell fastest during rain',
    'Sunday mornings best for traditional snacks'
  ];

  // Ordering phrases and local expressions
  private readonly orderingTips = [
    'Anna, medium spicy pothum',
    'Konjam kammi kaaram',
    'Parcel kudunga',
    'Extra salna venum'
  ];

  /**
   * Apply safety rules and generate warnings
   */
  applySafetyRules(input: ValidatedInput, foods: FoodItem[]): {
    safeFoods: FoodItem[];
    warnings: string[];
  } {
    const warnings: string[] = [];
    let safeFoods = [...foods];

    // Apply monsoon safety checks
    const monsoonWarnings = this.checkMonsoonSafety(input);
    warnings.push(...monsoonWarnings);

    // Apply late night safety checks
    const lateNightWarnings = this.checkLateNightSafety(input);
    warnings.push(...lateNightWarnings);

    // Apply "Do Not Recommend" list filtering
    safeFoods = this.applyRestrictions(input, safeFoods);

    return { safeFoods, warnings };
  }

  /**
   * Check for cultural guideline compliance
   */
  applyCulturalGuidelines(input: ValidatedInput, foods: FoodItem[]): FoodItem[] {
    const areaGuideline = this.culturalGuidelines.find(g => g.area === input.area);
    
    if (!areaGuideline) {
      return foods;
    }

    let filteredFoods = [...foods];

    // Apply vegetarian preference for Mylapore
    if (areaGuideline.preferVegetarian) {
      // Filter out non-vegetarian items (items with egg, meat, etc.)
      filteredFoods = filteredFoods.filter(food => 
        !this.isNonVegetarian(food.name)
      );
    }

    // Apply area-specific item restrictions
    if (areaGuideline.avoidItems) {
      filteredFoods = filteredFoods.filter(food => 
        !areaGuideline.avoidItems!.some(avoidItem => 
          food.name.toLowerCase().includes(avoidItem.toLowerCase())
        )
      );
    }

    // Apply time restrictions for specific areas
    if (areaGuideline.timeRestriction && this.isAfterTime(input.time, areaGuideline.timeRestriction)) {
      // Add safety note but don't filter completely
      filteredFoods.forEach(food => {
        if (!food.safetyNotes) food.safetyNotes = [];
        food.safetyNotes.push(`Late night in ${input.area} - be cautious with unfamiliar places`);
      });
    }

    // Add cultural context notes to foods
    filteredFoods.forEach(food => {
      if (!food.safetyNotes) food.safetyNotes = [];
      
      // Add area-specific cultural notes
      if (areaGuideline.spicyPreference) {
        food.safetyNotes.push('Triplicane area - expect spicy food');
      }
      
      if (areaGuideline.techParkArea && this.isLateNight(input.time)) {
        food.safetyNotes.push('OMR tech park area - good late night options');
      }
      
      if (areaGuideline.rainyBonus && (input.weather === WeatherCondition.RAINY || input.weather === WeatherCondition.MONSOON)) {
        food.safetyNotes.push('Velachery - high demand during rain, expect crowds');
      }
    });

    return filteredFoods;
  }

  /**
   * Get cultural ordering tips for the area
   */
  getCulturalOrderingTips(area: ChennaiArea): string[] {
    const tips = [...this.orderingTips];
    
    // Add area-specific tips
    const areaGuideline = this.culturalGuidelines.find(g => g.area === area);
    if (areaGuideline?.spicyPreference) {
      tips.push('Ask "Konjam kammi kaaram" for less spicy');
    }
    
    return tips;
  }

  /**
   * Get general cultural rules and habits
   */
  getGeneralCulturalRules(): string[] {
    return [...this.generalCulturalRules];
  }

  /**
   * Apply "Do Not Recommend" list filtering
   */
  applyRestrictions(input: ValidatedInput, foods: FoodItem[]): FoodItem[] {
    let filteredFoods = [...foods];

    for (const rule of this.doNotRecommendRules) {
      if (rule.condition(input)) {
        filteredFoods = filteredFoods.filter(food => 
          !rule.excludedItems.some(excludedItem => 
            food.name.toLowerCase().includes(excludedItem.toLowerCase())
          )
        );
      }
    }

    return filteredFoods;
  }

  /**
   * Check monsoon safety conditions
   */
  checkMonsoonSafety(input: ValidatedInput): string[] {
    const warnings: string[] = [];

    if (input.weather === WeatherCondition.MONSOON || input.weather === WeatherCondition.RAINY) {
      warnings.push('Anna, avoid raw items during rain - stick to fried snacks!');
      warnings.push('Fried snacks + tea are perfect for rainy weather');
      
      // Special warning for corn during rain
      warnings.push('Skip corn on the cob during heavy rain');
    }

    return warnings;
  }

  /**
   * Check late night safety conditions
   */
  checkLateNightSafety(input: ValidatedInput): string[] {
    const warnings: string[] = [];

    if (this.isLateNight(input.time)) {
      warnings.push('Late night options are limited but more filling');
      
      if (input.area === ChennaiArea.PARRYS_CORNER) {
        warnings.push('Parrys Corner late night - stick to familiar places only');
      }
    }

    if (this.isAfterMidnight(input.time)) {
      warnings.push('After midnight - avoid unknown carts, stick to trusted spots');
      warnings.push('Cash preferred at late night stalls');
    }

    return warnings;
  }

  // Helper methods

  private isLateNight(time: string): boolean {
    const hour = parseInt(time.split(':')[0]);
    return hour >= 22 || hour < 6; // 10 PM to 6 AM
  }

  private isAfterMidnight(time: string): boolean {
    const hour = parseInt(time.split(':')[0]);
    return hour >= 0 && hour < 6; // Midnight to 6 AM
  }

  private isAfterTime(currentTime: string, restrictionTime: string): boolean {
    const [currentHour, currentMin] = currentTime.split(':').map(Number);
    const [restrictHour, restrictMin] = restrictionTime.split(':').map(Number);
    
    const currentMinutes = currentHour * 60 + currentMin;
    const restrictMinutes = restrictHour * 60 + restrictMin;
    
    return currentMinutes >= restrictMinutes;
  }

  private isNonVegetarian(foodName: string): boolean {
    const nonVegKeywords = ['egg', 'chicken', 'mutton', 'fish', 'meat', 'kebab'];
    return nonVegKeywords.some(keyword => 
      foodName.toLowerCase().includes(keyword)
    );
  }
}