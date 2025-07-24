import './Footer.scss';

import githubIcon from '../../assets/github.png';
import maltIcon from '../../assets/malt.png';
import linkedIcon from '../../assets/linkedin.png';

interface IconButtonProps {
  src: string;
  targetLink: string;
  alt: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  src,
  targetLink,
  alt,
}) => {
  return (
    <div className='button-container'>
      <button
        className='icon-button'
        onClick={() => window.open(targetLink, '_blank')}
      >
        <img className='btn-icon' src={src} alt={alt} />
      </button>
    </div>
  );
};

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>{`2025 - Léo Bello, All rights reserved`}</p>
      <div className='button-container'>
        <IconButton
          src={githubIcon}
          alt='Github icon'
          targetLink='https://github.com/leoBello'
        />
        <IconButton
          src={maltIcon}
          alt='Malt icon'
          targetLink='https://www.malt.fr/profile/leobello'
        />
        <IconButton
          src={linkedIcon}
          alt='LinkedIn icon'
          targetLink='https://www.linkedin.com/in/leobellolinkedurl/'
        />
      </div>
    </div>
  );
};

export default Footer;
