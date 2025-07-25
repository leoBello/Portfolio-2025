import './Footer.scss';

import githubIcon from '../../assets/github.png';
import maltIcon from '../../assets/malt.png';
import linkedIcon from '../../assets/linkedin.png';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobile } from 'react-device-detect';

gsap.registerPlugin(ScrollTrigger);

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
  const footer = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!endRef.current || !footer.current || isMobile) return;
    gsap.fromTo(
      footer.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: endRef.current,
          start: 'top bottom', // quand le bas du contenu principal touche le bas du viewport
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);
  return (
    <>
      <div ref={endRef} />
      <div ref={footer} className='footer-container'>
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
    </>
  );
};

export default Footer;
