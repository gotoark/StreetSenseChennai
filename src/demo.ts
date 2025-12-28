#!/usr/bin/env node

/**
 * Demo script to test the integrated Chennai Street Food Assistant
 * This demonstrates the complete workflow from input to formatted recommendations
 */

import { ChennaiStreetFoodAssistant } from './ChennaiStreetFoodAssistant';

async function runDemo() {
  console.log('🍛 Chennai Street Food Assistant Demo\n');
  
  const assistant = new ChennaiStreetFoodAssistant();

  // Test scenarios from demo-inputs.md
  const testScenarios = [
    {
      name: 'Rainy Evening in T Nagar',
      mood: 'rainy_evening',
      area: 't_nagar',
      time: '18:30'
    },
    {
      name: 'Midnight Hunger in Velachery',
      mood: 'midnight_hunger',
      area: 'velachery',
      time: '23:45'
    },
    {
      name: 'Light Snack in Mylapore',
      mood: 'light_snack',
      area: 'mylapore',
      time: '17:30'
    }
  ];

  // Health check first
  console.log('🔍 Running health check...');
  const healthStatus = await assistant.healthCheck();
  console.log(`Status: ${healthStatus.status}`);
  console.log('Components:', healthStatus.components);
  console.log('');

  // Run test scenarios
  for (const scenario of testScenarios) {
    console.log(`📍 ${scenario.name}`);
    console.log(`Input: ${scenario.mood}, ${scenario.area}, ${scenario.time}`);
    console.log('');

    try {
      const response = await assistant.generateRecommendation(
        scenario.mood,
        scenario.area,
        scenario.time
      );

      console.log('🍽️  Recommendations:');
      response.recommendations.forEach((rec, index) => {
        console.log(`${index + 1}. ${rec.foodItem}`);
        console.log(`   ${rec.explanation}`);
        if (rec.orderingTips && rec.orderingTips.length > 0) {
          console.log(`   💡 Tip: ${rec.orderingTips[0]}`);
        }
        console.log('');
      });

      if (response.generalNotes.length > 0) {
        console.log('📝 General Notes:');
        response.generalNotes.forEach(note => console.log(`   • ${note}`));
        console.log('');
      }

    } catch (error: any) {
      console.error('❌ Error:', error.message);
      if (error.details) {
        console.error('Details:', error.details);
      }
    }

    console.log('─'.repeat(60));
    console.log('');
  }

  // Test input validation
  console.log('🧪 Testing input validation...');
  const invalidInput = assistant.validateInput('invalid_mood', 'invalid_area', 'invalid_time');
  console.log('Invalid input result:', {
    isValid: invalidInput.isValid,
    errors: invalidInput.errors
  });
  console.log('');

  console.log('✅ Demo completed!');
}

// Run the demo
if (require.main === module) {
  runDemo().catch(console.error);
}

export { runDemo };