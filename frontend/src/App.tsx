import React, { useState } from 'react';
import { MoodSelector } from './components/MoodSelector';
import { AreaSelector } from './components/AreaSelector';
import { TimeInput } from './components/TimeInput';
import { RecommendationDisplay } from './components/RecommendationDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { ApiService } from './services/api';
import { UserInput, RecommendationResponse, LoadingState, MoodType, ChennaiArea } from './types';
import './styles/index.css';

function App() {
  const [userInput, setUserInput] = useState<Partial<UserInput>>({
    time: new Date().toTimeString().slice(0, 5) // Default to current time
  });
  const [recommendations, setRecommendations] = useState<RecommendationResponse | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    error: null
  });

  const handleInputChange = (field: keyof UserInput, value: any) => {
    setUserInput(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGetRecommendations = async () => {
    if (!userInput.mood || !userInput.area || !userInput.time) {
      setLoadingState({
        isLoading: false,
        error: 'Please select mood, area, and time before getting recommendations'
      });
      return;
    }

    setLoadingState({ isLoading: true, error: null });
    setRecommendations(null);

    try {
      const response = await ApiService.getRecommendations(userInput as UserInput);
      setRecommendations(response);
      setLoadingState({ isLoading: false, error: null });
    } catch (error) {
      setLoadingState({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Something went wrong'
      });
    }
  };

  const isFormValid = userInput.mood && userInput.area && userInput.time;

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1>Chennai Street Food Assistant</h1>
          <p>Find the perfect street food for your mood and location</p>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <div className="input-form">
            <div className="form-group">
              <label className="form-label">What's your mood?</label>
              <MoodSelector
                selectedMood={userInput.mood}
                onMoodChange={(mood) => handleInputChange('mood', mood)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Which area are you in?</label>
              <AreaSelector
                selectedArea={userInput.area}
                onAreaChange={(area) => handleInputChange('area', area)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">What time is it?</label>
              <TimeInput
                time={userInput.time || ''}
                onTimeChange={(time) => handleInputChange('time', time)}
              />
            </div>

            <button
              className="btn btn-primary btn-large"
              onClick={handleGetRecommendations}
              disabled={!isFormValid || loadingState.isLoading}
              style={{ width: '100%' }}
            >
              {loadingState.isLoading ? 'Getting Recommendations...' : 'Get Food Recommendations'}
            </button>
          </div>

          {loadingState.error && <ErrorMessage message={loadingState.error} />}
          
          {loadingState.isLoading && <LoadingSpinner />}
          
          {recommendations && !loadingState.isLoading && (
            <RecommendationDisplay recommendations={recommendations} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;