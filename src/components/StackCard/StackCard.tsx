import React, { type ReactNode } from 'react';
import './StackCard.scss';

interface StackCardProps {
  icon: string;
  title: ReactNode | string;
  description?: ReactNode | string;
  listItems: ListItem[];
  className?: string;
}

interface ListItem {
  title: string;
  description?: string;
}

const StackCard: React.FC<StackCardProps> = ({
  icon,
  title,
  description,
  listItems,
  className = '',
}) => (
  <div className={`stack-card ${className}`}>
    <img className='stack-card-icon' src={icon} />
    <div className='stack-card-content'>
      <h3 className='stack-card-title'>{title}</h3>
      {description && <p className='stack-card-desc'>{description}</p>}
      <ul className='stack-card-list'>
        {listItems.map((item, idx) => (
          <li key={idx} className='stack-card-list-item'>
            <span className='list-title'>{item.title}</span>
            {item.description && (
              <span className='list-desc'>{item.description}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default StackCard;
