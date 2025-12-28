import React from 'react';
import { RecommendationResponse } from '../types';
import { RecommendationCard } from './RecommendationCard';

interface RecommendationDisplayProps {
  recommendations: RecommendationResponse | null;
}

export const RecommendationDisplay: React.FC<RecommendationDisplayProps> = ({
  recommendations
}) => {
  // Handle case where recommendations is null or undefined
  if (!recommendations || !recommendations.recommendations) {
    return null;
  }

  return (
    <div className="recommendations">
      {recommendations.recommendations.map((recommendation, index) => (
        <RecommendationCard
          key={index}
          recommendation={recommendation}
        />
      ))}
      
      {recommendations.generalNotes && recommendations.generalNotes.length > 0 && (
        <div className="general-notes">
          <h3>Additional Notes</h3>
          <ul>
            {recommendations.generalNotes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};