import React from 'react';
import './GenericButton.scss';

interface GenericButtonProps {
  handleClick: () => void;
  label: string;
  className?: string;
  type?: 'submit' | 'reset' | 'button';
}

const GenericButton: React.FC<GenericButtonProps> = ({
  handleClick,
  label,
  type,
  className = '',
}) => {
  return (
    <button
      onClick={() => handleClick}
      className={`custom-button ${className}`}
      type={type}
    >{`${label}`}</button>
  );
};

export default GenericButton;
