import request from 'supertest';
import { app } from '../server';

// Custom matcher for multiple possible values
expect.extend({
  toBeOneOf(received: any, expected: any[]) {
    const pass = expected.includes(received);
    if (pass) {
      return {
        message: () => `expected ${received} not to be one of ${expected.join(', ')}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be one of ${expected.join(', ')}`,
        pass: false,
      };
    }
  },
});

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeOneOf(expected: any[]): R;
    }
  }
}

describe('Chennai Street Food Assistant API Server', () => {
  describe('GET /', () => {
    it('should return API information', async () => {
      const response = await request(app).get('/');
      
      expect(response.status).toBe(200);
      expect(response.body.service).toBe('Chennai Street Food Assistant API');
      expect(response.body.version).toBe('1.0.0');
      expect(response.body.endpoints).toBeDefined();
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');
      
      expect(response.status).toBeOneOf([200, 503]);
      expect(response.body.status).toBeOneOf(['healthy', 'unhealthy']);
      expect(response.body.service).toBe('Chennai Street Food Assistant');
      expect(response.body.components).toBeDefined();
    });
  });

  describe('GET /api/moods', () => {
    it('should return available mood options', async () => {
      const response = await request(app).get('/api/moods');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBeGreaterThan(0);
      
      // Check structure of mood options
      const firstMood = response.body.data[0];
      expect(firstMood).toHaveProperty('value');
      expect(firstMood).toHaveProperty('label');
      expect(firstMood).toHaveProperty('description');
    });
  });

  describe('GET /api/areas', () => {
    it('should return available Chennai areas', async () => {
      const response = await request(app).get('/api/areas');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBeGreaterThan(0);
      
      // Check structure of area options
      const firstArea = response.body.data[0];
      expect(firstArea).toHaveProperty('value');
      expect(firstArea).toHaveProperty('label');
      expect(firstArea).toHaveProperty('description');
    });
  });

  describe('POST /api/recommend', () => {
    it('should return recommendations for valid input', async () => {
      const validInput = {
        mood: 'rainy_evening',
        area: 't_nagar',
        time: '18:00'
      };

      const response = await request(app)
        .post('/api/recommend')
        .send(validInput);
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(response.body.requestInfo).toBeDefined();
      expect(response.body.requestInfo.mood).toBe(validInput.mood);
      expect(response.body.requestInfo.area).toBe(validInput.area);
    });

    it('should handle missing mood with validation error', async () => {
      const invalidInput = {
        area: 't_nagar',
        time: '18:00'
      };

      const response = await request(app)
        .post('/api/recommend')
        .send(invalidInput);
      
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Validation error');
      expect(response.body.message).toContain('Mood is required');
    });

    it('should handle missing area with validation error', async () => {
      const invalidInput = {
        mood: 'rainy_evening',
        time: '18:00'
      };

      const response = await request(app)
        .post('/api/recommend')
        .send(invalidInput);
      
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Validation error');
      expect(response.body.message).toContain('Area is required');
    });

    it('should handle invalid mood type with validation error', async () => {
      const invalidInput = {
        mood: 123, // Should be string
        area: 't_nagar',
        time: '18:00'
      };

      const response = await request(app)
        .post('/api/recommend')
        .send(invalidInput);
      
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Validation error');
      expect(response.body.message).toContain('Mood is required and must be a string');
    });

    it('should handle invalid time type with validation error', async () => {
      const invalidInput = {
        mood: 'rainy_evening',
        area: 't_nagar',
        time: 1800 // Should be string
      };

      const response = await request(app)
        .post('/api/recommend')
        .send(invalidInput);
      
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Validation error');
      expect(response.body.message).toContain('Time must be a string');
    });

    it('should work without time parameter', async () => {
      const validInput = {
        mood: 'light_snack',
        area: 'anna_nagar'
      };

      const response = await request(app)
        .post('/api/recommend')
        .send(validInput);
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.requestInfo.time).toBe('auto-detected');
    });
  });

  describe('404 handler', () => {
    it('should return 404 for unknown endpoints', async () => {
      const response = await request(app).get('/unknown-endpoint');
      
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Endpoint not found');
    });
  });
});