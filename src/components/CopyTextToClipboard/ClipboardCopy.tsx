import React, { useState, useEffect } from 'react';
import './CopyTextToClipboard.scss';
import { copyTextToClipboard } from './copyTextToClipboard';
import toast from 'react-hot-toast';
import copyIcon from '../../assets/copy.png';

// Définition des props du composant
interface ClipboardCopyProps {
  copyText: string;
}

// Composant typé
const ClipboardCopy: React.FC<ClipboardCopyProps> = ({ copyText }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => {
    if (isClicked) {
      const timer = setTimeout(() => {
        setIsClicked(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isClicked]);

  const handleCopyClick = () => {
    copyTextToClipboard(copyText)
      .then(() => {
        setIsClicked(true);
      })
      .catch((err) => {
        toast.error(`${err}`);
      });
  };

  return (
    <div>
      <div className='mail' onClick={handleCopyClick}>
        <p>{!isClicked ? copyText : 'Mail copié !'}</p>
        {!isClicked && (
          <img className='copy-icon' src={copyIcon} alt='Copy icon' />
        )}
      </div>
    </div>
  );
};

export default ClipboardCopy;
