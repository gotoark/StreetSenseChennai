import express from 'express';
import cors from 'cors';
import { ChennaiStreetFoodAssistant } from './ChennaiStreetFoodAssistant';
import { UserInput, RecommendationResponse } from './types';

/**
 * Express.js server for Chennai Street Food Assistant API
 * Provides REST endpoints for food recommendations
 * Requirements: 2.1
 */

const app = express();
const port = process.env.PORT || 3000;

// Initialize the main assistant
const assistant = new ChennaiStreetFoodAssistant();

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Health check endpoint
// Requirements: 2.1
app.get('/health', async (req, res) => {
  try {
    const healthStatus = await assistant.healthCheck();
    
    res.status(healthStatus.status === 'healthy' ? 200 : 503).json({
      status: healthStatus.status,
      timestamp: new Date().toISOString(),
      service: 'Chennai Street Food Assistant',
      version: '1.0.0',
      components: healthStatus.components
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      service: 'Chennai Street Food Assistant',
      version: '1.0.0',
      error: 'Health check failed'
    });
  }
});

// Basic info endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'Chennai Street Food Assistant API',
    version: '1.0.0',
    description: 'Get personalized Chennai street food recommendations based on mood, area, and time',
    endpoints: {
      health: 'GET /health - Service health check',
      recommend: 'POST /api/recommend - Get food recommendations',
      moods: 'GET /api/moods - Get available mood options',
      areas: 'GET /api/areas - Get available Chennai areas'
    }
  });
});

// Get available mood options
app.get('/api/moods', (req, res) => {
  try {
    const moods = assistant.getAvailableMoods();
    res.json({
      success: true,
      data: moods
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve mood options'
    });
  }
});

// Get available Chennai areas
app.get('/api/areas', (req, res) => {
  try {
    const areas = assistant.getAvailableAreas();
    res.json({
      success: true,
      data: areas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve area options'
    });
  }
});

// POST /api/recommend - Main recommendation endpoint
// Requirements: 2.1, 1.4
app.post('/api/recommend', async (req, res) => {
  try {
    // Extract and validate request body
    const { mood, area, time } = req.body;

    // Basic request validation
    if (!mood || typeof mood !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        message: 'Mood is required and must be a string',
        details: {
          field: 'mood',
          received: mood,
          expected: 'string (e.g., "rainy_evening", "hungry_heavy")'
        }
      });
    }

    if (!area || typeof area !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        message: 'Area is required and must be a string',
        details: {
          field: 'area',
          received: area,
          expected: 'string (e.g., "t_nagar", "anna_nagar")'
        }
      });
    }

    // Time is optional, but if provided should be a string
    if (time !== undefined && typeof time !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        message: 'Time must be a string in HH:MM format',
        details: {
          field: 'time',
          received: time,
          expected: 'string in HH:MM format (e.g., "18:30") or undefined'
        }
      });
    }

    // Generate recommendations using the assistant
    const recommendations = await assistant.generateRecommendation(mood, area, time);

    // Return successful response
    res.json({
      success: true,
      data: recommendations,
      requestInfo: {
        mood,
        area,
        time: time || 'auto-detected',
        processedAt: new Date().toISOString()
      }
    });

  } catch (error: any) {
    // Handle different types of errors
    if (error.name === 'SystemError') {
      // Handle validation and system errors from the assistant
      const statusCode = error.type === 'validation' ? 400 : 500;
      
      res.status(statusCode).json({
        success: false,
        error: error.type === 'validation' ? 'Validation error' : 'Processing error',
        message: error.message,
        details: error.details
      });
    } else {
      // Handle unexpected errors
      console.error('Unexpected error in /api/recommend:', error);
      
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: 'An unexpected error occurred while processing your request',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    message: `${req.method} ${req.originalUrl} is not a valid endpoint`
  });
});

// Start server function
export function startServer(): Promise<void> {
  return new Promise((resolve) => {
    app.listen(port, () => {
      console.log(`Chennai Street Food Assistant API running on port ${port}`);
      console.log(`Health check: http://localhost:${port}/health`);
      console.log(`API docs: http://localhost:${port}/`);
      resolve();
    });
  });
}

// Export app for testing
export { app };

// Start server if this file is run directly
if (require.main === module) {
  startServer().catch(console.error);
}