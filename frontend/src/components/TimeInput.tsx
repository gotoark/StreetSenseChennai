import React from 'react';

interface TimeInputProps {
  time: string;
  onTimeChange: (time: string) => void;
}

export const TimeInput: React.FC<TimeInputProps> = ({
  time,
  onTimeChange
}) => {
  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onTimeChange(event.target.value);
  };

  const setCurrentTime = () => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);
    onTimeChange(currentTime);
  };

  const setPresetTime = (presetTime: string) => {
    onTimeChange(presetTime);
  };

  return (
    <div>
      <div style={{ marginBottom: 'var(--spacing-md)' }}>
        <input
          type="time"
          value={time}
          onChange={handleTimeChange}
          className="input"
          style={{ marginBottom: 'var(--spacing-sm)' }}
        />
      </div>
      
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={setCurrentTime}
        >
          Now
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setPresetTime('08:00')}
        >
          Morning
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setPresetTime('13:00')}
        >
          Afternoon
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setPresetTime('18:00')}
        >
          Evening
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setPresetTime('22:00')}
        >
          Night
        </button>
      </div>
    </div>
  );
};