import { UserInput, RecommendationResponse, ApiError } from '../types';

const API_BASE_URL = '/api';

export class ApiService {
  static async getRecommendations(input: UserInput): Promise<RecommendationResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/recommend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      // Check if response is ok
      if (!response.ok) {
        // Try to parse error response, but handle empty responses
        let errorMessage = 'Failed to get recommendations';
        try {
          const errorData: ApiError = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (parseError) {
          // If we can't parse the error response, use status text
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      // Check if response has content
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response');
      }

      // Try to parse the response
      const text = await response.text();
      if (!text.trim()) {
        throw new Error('Server returned empty response');
      }

      const apiResponse = JSON.parse(text);
      
      // Extract the data field from the API response
      if (apiResponse.success && apiResponse.data) {
        return apiResponse.data;
      } else if (apiResponse.recommendations) {
        // Fallback: if response already has recommendations directly
        return apiResponse;
      } else {
        throw new Error(apiResponse.error || 'Invalid response format');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error occurred');
    }
  }

  static async healthCheck(): Promise<{ status: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      
      if (!response.ok) {
        throw new Error(`Health check failed: ${response.status} ${response.statusText}`);
      }

      const text = await response.text();
      if (!text.trim()) {
        throw new Error('Health check returned empty response');
      }

      return JSON.parse(text);
    } catch (error) {
      throw new Error('Health check failed');
    }
  }
}