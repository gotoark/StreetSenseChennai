import React from 'react';
import { MoodType, MOOD_LABELS } from '../types';

interface MoodSelectorProps {
  selectedMood?: MoodType;
  onMoodChange: (mood: MoodType) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({
  selectedMood,
  onMoodChange
}) => {
  const moods = Object.values(MoodType);

  return (
    <div className="btn-group">
      {moods.map((mood) => (
        <button
          key={mood}
          type="button"
          className={`btn btn-secondary ${selectedMood === mood ? 'active' : ''}`}
          onClick={() => onMoodChange(mood)}
        >
          {MOOD_LABELS[mood]}
        </button>
      ))}
    </div>
  );
};