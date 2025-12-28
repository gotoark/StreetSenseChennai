import { IResponseFormatter } from '../interfaces/ResponseFormatter';
import { Recommendation, RecommendationResponse, ValidatedInput, MoodType, ChennaiArea } from '../types';

/**
 * Response formatter that provides local Chennai tone and context
 */
export class ResponseFormatter implements IResponseFormatter {
  
  // Mood-based explanations in local Chennai style
  private readonly moodExplanations = {
    [MoodType.RAINY_EVENING]: "Perfect for this weather! Hot and crispy will keep you warm.",
    [MoodType.HUNGRY_HEAVY]: "This will fill you up properly. No half-measures here!",
    [MoodType.LIGHT_SNACK]: "Light but tasty - just what you need right now.",
    [MoodType.STRESS_RELIEF]: "Comfort food at its best. This will make you feel better.",
    [MoodType.MIDNIGHT_HUNGER]: "Late night hunger sorted! This hits the spot."
  };

  // Local Chennai expressions to add flavor
  private readonly localExpressions = [
    "Anna",
    "Super ah irukum",
    "Try pannunga",
    "Nalla irukum",
    "Perfect timing",
    "Semma taste",
    "Must try"
  ];

  // Comprehensive ordering phrases from product.md
  private readonly orderingPhrases = {
    general: [
      "Anna, medium spicy pothum",
      "Konjam kammi kaaram",
      "Parcel kudunga"
    ],
    parotta: [
      "Extra salna venum",
      "Kothu parotta spicy ah venum"
    ],
    tea: [
      "Ginger tea kudunga",
      "Strong ah pottu kudunga"
    ],
    fried: [
      "Fresh ah iruka?",
      "Hot ah kudunga"
    ]
  };

  // Cultural and safety guidelines from product.md
  private readonly culturalNotes = {
    monsoon: [
      "Avoid raw items during monsoon",
      "Fried snacks sell fastest during rain"
    ],
    general: [
      "Cash preferred at most carts",
      "Ask for medium spicy if unsure"
    ],
    lateNight: [
      "Options reduce after midnight but food is more filling",
      "Avoid unknown carts after midnight"
    ]
  };

  // Area-specific cultural insights
  private readonly areaCulturalNotes = {
    [ChennaiArea.T_NAGAR]: [
      "Avoid overcrowded pani puri stalls",
      "Sundal and bajji are evening favorites",
      "Dosa carts near main roads at night"
    ],
    [ChennaiArea.MYLAPORE]: [
      "Traditional snacks near temples",
      "Mostly vegetarian options",
      "Best for morning idli and vadai"
    ],
    [ChennaiArea.TRIPLICANE]: [
      "Spicy food common",
      "Great for chaat and samosas in evening",
      "Parotta and kebabs at night"
    ],
    [ChennaiArea.ANNA_NAGAR]: [
      "Cleaner carts compared to older areas",
      "Good for Gobi manchurian and momos",
      "Chinese stalls available at night"
    ],
    [ChennaiArea.VELACHERY]: [
      "Rain increases food demand",
      "Good for bajji and bonda in evening",
      "Kothu parotta popular at night"
    ],
    [ChennaiArea.OMR]: [
      "Late-night stalls near tech parks",
      "Quick snacks and tea in evening",
      "Egg-based dishes popular"
    ],
    [ChennaiArea.PARRYS_CORNER]: [
      "Great for street breakfasts in morning",
      "Avoid late night unless familiar",
      "Traditional meal options in afternoon"
    ],
    [ChennaiArea.TAMBARAM]: [
      "Local favorite spot",
      "Good variety of street food",
      "Family-friendly options available"
    ]
  };

  formatResponse(recommendations: Recommendation[], input: ValidatedInput): RecommendationResponse {
    const formattedRecommendations = recommendations.map(rec => 
      this.addLocalContext(rec, input)
    );

    const generalNotes = this.generateGeneralNotes(input);

    return {
      recommendations: formattedRecommendations,
      generalNotes,
      timestamp: new Date().toISOString()
    };
  }

  addLocalContext(recommendation: Recommendation, input: ValidatedInput): Recommendation {
    const enhancedExplanation = this.generateExplanation(recommendation.foodItem, input);
    const orderingTips = this.generateOrderingTips(recommendation.foodItem, input.area);
    const localContext = this.generateLocalContextNotes(recommendation.foodItem, input);

    return {
      ...recommendation,
      explanation: enhancedExplanation,
      orderingTips,
      localContext
    };
  }

  generateOrderingTips(foodItem: string, area: ChennaiArea): string[] {
    const tips: string[] = [];
    const foodLower = foodItem.toLowerCase();
    
    // Always include general ordering phrase
    tips.push(...this.orderingPhrases.general);
    
    // Food-specific ordering tips
    if (foodLower.includes('parotta') || foodLower.includes('kothu')) {
      tips.push(...this.orderingPhrases.parotta);
    }
    
    if (foodLower.includes('tea') || foodLower.includes('chai')) {
      tips.push(...this.orderingPhrases.tea);
    }
    
    if (foodLower.includes('bajji') || foodLower.includes('bonda') || 
        foodLower.includes('vadai') || foodLower.includes('fried')) {
      tips.push(...this.orderingPhrases.fried);
    }

    // Area-specific ordering context
    switch (area) {
      case ChennaiArea.T_NAGAR:
        tips.push("Cash ready vechu konga - crowded area");
        break;
      case ChennaiArea.MYLAPORE:
        tips.push("Temple area - mostly veg options");
        break;
      case ChennaiArea.TRIPLICANE:
        tips.push("Spice level high here - mention if you want less");
        break;
      case ChennaiArea.ANNA_NAGAR:
        tips.push("Clean stalls - good quality assured");
        break;
      case ChennaiArea.OMR:
        tips.push("Tech park area - English also works");
        break;
    }

    // Remove duplicates and return unique tips
    return [...new Set(tips)];
  }

  generateExplanation(foodItem: string, input: ValidatedInput): string {
    const baseMoodExplanation = this.moodExplanations[input.mood];
    const timeContext = this.getTimeContext(input.time);
    const areaContext = this.getAreaContext(input.area);
    
    // Create mood-specific explanation with local flavor
    let explanation = `${foodItem} is perfect for your ${input.mood.replace('_', ' ')} mood. ${baseMoodExplanation}`;
    
    // Add time context if relevant
    if (timeContext) {
      explanation += ` ${timeContext}`;
    }
    
    // Add area context if relevant
    if (areaContext) {
      explanation += ` ${areaContext}`;
    }

    // Add food-specific reasoning
    const foodSpecificReason = this.getFoodSpecificReason(foodItem, input);
    if (foodSpecificReason) {
      explanation += ` ${foodSpecificReason}`;
    }

    return this.addLocalExpressions(explanation);
  }

  private getFoodSpecificReason(foodItem: string, input: ValidatedInput): string {
    const foodLower = foodItem.toLowerCase();
    
    if (foodLower.includes('bajji') || foodLower.includes('bonda')) {
      return "Hot, crispy, and satisfying - exactly what Chennai evenings are about.";
    } else if (foodLower.includes('parotta')) {
      return "Flaky, buttery goodness that never disappoints.";
    } else if (foodLower.includes('dosa')) {
      return "Crispy perfection with that authentic South Indian taste.";
    } else if (foodLower.includes('sundal')) {
      return "Light, healthy, and full of Chennai beach vibes.";
    } else if (foodLower.includes('tea') || foodLower.includes('chai')) {
      return "Strong, aromatic, and the perfect companion to any snack.";
    } else if (foodLower.includes('kothu')) {
      return "Street food theater at its best - made fresh right in front of you.";
    }
    
    return "";
  }

  addLocalExpressions(text: string): string {
    // Add authentic Chennai expressions based on context
    const expressions = {
      positive: ["Super ah irukum", "Semma taste", "Must try", "Nalla irukum"],
      encouraging: ["Try pannunga", "Perfect timing", "Anna, this is the one"],
      emphasis: ["Definitely", "For sure", "Trust me on this"]
    };
    
    // Choose expression based on text content
    let selectedExpression;
    if (text.includes('perfect') || text.includes('Perfect')) {
      selectedExpression = expressions.encouraging[Math.floor(Math.random() * expressions.encouraging.length)];
      return text.replace(/perfect/gi, `perfect - ${selectedExpression}`);
    } else if (text.includes('best') || text.includes('great')) {
      selectedExpression = expressions.positive[Math.floor(Math.random() * expressions.positive.length)];
      return `${text} ${selectedExpression}!`;
    } else {
      selectedExpression = expressions.emphasis[Math.floor(Math.random() * expressions.emphasis.length)];
      return `Anna, ${text.toLowerCase()} ${selectedExpression}!`;
    }
  }

  private generateLocalContextNotes(foodItem: string, input: ValidatedInput): string[] {
    const notes: string[] = [];
    const foodLower = foodItem.toLowerCase();
    
    // Weather and seasonal context
    if (input.weather === 'rainy' || input.mood === MoodType.RAINY_EVENING) {
      notes.push(...this.culturalNotes.monsoon);
      if (foodLower.includes('bajji') || foodLower.includes('bonda') || foodLower.includes('vadai')) {
        notes.push("Perfect choice for rainy weather - hot and crispy!");
      }
    }

    // Time-based cultural context
    const hour = parseInt(input.time.split(':')[0]);
    if (hour >= 22) {
      notes.push(...this.culturalNotes.lateNight);
    } else if (hour >= 17 && hour <= 19) {
      notes.push("Tea + snacks peak time - perfect timing!");
    } else if (hour < 9) {
      notes.push("Morning time - freshest preparations available");
    }

    // Area-specific cultural insights
    const areaNotes = this.areaCulturalNotes[input.area];
    if (areaNotes) {
      // Add 1-2 most relevant area notes
      notes.push(areaNotes[0]);
      if (areaNotes.length > 1) {
        notes.push(areaNotes[1]);
      }
    }

    // Food-specific cultural context
    if (foodLower.includes('sundal')) {
      notes.push("Beach-style preparation - authentic Chennai taste");
    } else if (foodLower.includes('filter coffee')) {
      notes.push("Traditional South Indian filter coffee - the real deal");
    } else if (foodLower.includes('kothu parotta')) {
      notes.push("Street food favorite - best when made fresh");
    }

    // General cultural notes
    notes.push(...this.culturalNotes.general);

    // Remove duplicates and return unique notes
    return [...new Set(notes)];
  }

  private generateGeneralNotes(input: ValidatedInput): string[] {
    const notes: string[] = [];
    
    // Safety and cultural notes based on conditions
    if (input.weather === 'rainy') {
      notes.push("Avoid pani puri during heavy rain");
      notes.push("Fried snacks are your best bet in this weather");
    }
    
    const hour = parseInt(input.time.split(':')[0]);
    if (hour >= 22) {
      notes.push("Limited options after 10 PM, but food is more filling");
      notes.push("Stick to familiar stalls for safety");
    }

    // Sunday morning special note
    const currentDay = new Date().getDay();
    if (currentDay === 0 && hour < 12) { // Sunday morning
      notes.push("Sunday mornings are best for traditional snacks");
    }

    // Peak time notes
    if (hour >= 17 && hour <= 19) {
      notes.push("Peak evening time - expect crowds but best variety");
    }

    // General cultural wisdom
    notes.push("Cash is king at street food stalls");
    notes.push("Don't hesitate to ask for 'medium spicy' if unsure");
    notes.push("Fresh preparation is always worth the wait");

    return notes;
  }

  private getTimeContext(time: string): string {
    const hour = parseInt(time.split(':')[0]);
    
    if (hour < 9) {
      return "Morning time - fresh preparation guaranteed.";
    } else if (hour >= 17 && hour <= 19) {
      return "Peak evening time - best variety available.";
    } else if (hour >= 22) {
      return "Late night option - filling and satisfying.";
    }
    
    return "";
  }

  private getAreaContext(area: ChennaiArea): string {
    switch (area) {
      case ChennaiArea.MYLAPORE:
        return "Mylapore has the most authentic traditional taste.";
      case ChennaiArea.T_NAGAR:
        return "T Nagar offers great variety despite the crowds.";
      case ChennaiArea.TRIPLICANE:
        return "Triplicane is known for its spicy preparations.";
      case ChennaiArea.ANNA_NAGAR:
        return "Anna Nagar has cleaner, well-maintained stalls.";
      case ChennaiArea.VELACHERY:
        return "Velachery has good options, especially during rain.";
      case ChennaiArea.OMR:
        return "OMR caters well to late-night tech crowd.";
      default:
        return "";
    }
  }
}