import React from 'react';
import './Slider.scss';

type SliderProps = {
  min: number;
  max: number;
  value: number;
  label: string;
  onChange: (value: number) => void;
  className?: string;
};

const Slider: React.FC<SliderProps> = ({
  min,
  max,
  value,
  label,
  onChange,
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.round(Number(e.target.value));
    onChange(newValue);
  };

  return (
    <div className={`slider-container ${className}`}>
      <label className='slider-label'>
        {label} : <span className='slider-value'>{value}</span>
      </label>
      <input
        type='range'
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={handleChange}
        className='slider-input'
      />
    </div>
  );
};

export default Slider;
