import React from 'react';
import { ChennaiArea, AREA_LABELS } from '../types';

interface AreaSelectorProps {
  selectedArea?: ChennaiArea;
  onAreaChange: (area: ChennaiArea) => void;
}

export const AreaSelector: React.FC<AreaSelectorProps> = ({
  selectedArea,
  onAreaChange
}) => {
  const areas = Object.values(ChennaiArea);

  return (
    <div className="btn-group">
      {areas.map((area) => (
        <button
          key={area}
          type="button"
          className={`btn btn-secondary ${selectedArea === area ? 'active' : ''}`}
          onClick={() => onAreaChange(area)}
        >
          {AREA_LABELS[area]}
        </button>
      ))}
    </div>
  );
};