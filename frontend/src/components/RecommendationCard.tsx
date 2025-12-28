import React from 'react';
import { Recommendation } from '../types';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation
}) => {
  return (
    <div className="recommendation-card">
      <h2 className="recommendation-title">{recommendation.foodItem}</h2>
      
      <p className="recommendation-explanation">{recommendation.explanation}</p>
      
      {recommendation.localContext.length > 0 && (
        <div className="recommendation-section">
          <h4 className="section-title">Local Context</h4>
          <div className="section-content">
            <ul>
              {recommendation.localContext.map((context, index) => (
                <li key={index}>{context}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {recommendation.orderingTips && recommendation.orderingTips.length > 0 && (
        <div className="recommendation-section">
          <h4 className="section-title">Ordering Tips</h4>
          <div className="section-content">
            <ul>
              {recommendation.orderingTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {recommendation.safetyNotes && recommendation.safetyNotes.length > 0 && (
        <div className="recommendation-section">
          <h4 className="section-title">Safety Notes</h4>
          <div className="section-content">
            <ul>
              {recommendation.safetyNotes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      <div className="recommendation-section">
        <h4 className="section-title">Confidence</h4>
        <div className="section-content">
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'var(--spacing-sm)' 
          }}>
            <div style={{
              width: '100px',
              height: '8px',
              backgroundColor: 'var(--border-light)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${recommendation.confidence * 100}%`,
                height: '100%',
                backgroundColor: recommendation.confidence > 0.7 ? 'var(--deep-green)' : 
                                recommendation.confidence > 0.4 ? 'var(--warm-yellow)' : 
                                'var(--primary-orange)',
                transition: 'width 0.3s ease'
              }} />
            </div>
            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-medium)' }}>
              {Math.round(recommendation.confidence * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};