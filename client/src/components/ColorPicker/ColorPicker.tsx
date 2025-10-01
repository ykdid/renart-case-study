import React from 'react';
import type { GoldType } from '../../types';

interface ColorPickerProps {
  selectedColor: GoldType;
  onColorChange: (color: GoldType) => void;
  className?: string;
}

const colorOptions: Array<{ type: GoldType; label: string; bgColor: string; ringColor: string }> = [
  {
    type: 'yellow',
    label: 'Yellow Gold',
    bgColor: 'bg-gradient-to-r from-yellow-200 to-yellow-400',
    ringColor: 'ring-yellow-400'
  },
  {
    type: 'rose',
    label: 'Rose Gold',
    bgColor: 'bg-gradient-to-r from-rose-200 to-rose-400',
    ringColor: 'ring-rose-400'
  },
  {
    type: 'white',
    label: 'White Gold',
    bgColor: 'bg-gradient-to-r from-gray-100 to-gray-300',
    ringColor: 'ring-gray-400'
  }
];

export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onColorChange,
  className = ''
}) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      {colorOptions.map((option) => (
        <button
          key={option.type}
          onClick={() => onColorChange(option.type)}
          className={`
            w-8 h-8 rounded-full border-2 border-white shadow-sm
            ${option.bgColor}
            transition-all duration-200 ease-in-out
            hover:scale-110 hover:shadow-md
            focus:outline-none focus:ring-2 focus:ring-offset-2
            ${selectedColor === option.type 
              ? `ring-2 ring-offset-2 ${option.ringColor} scale-110` 
              : 'hover:ring-1 hover:ring-gray-300'
            }
          `}
          aria-label={`Select ${option.label}`}
          title={option.label}
        />
      ))}
    </div>
  );
};

export default ColorPicker;