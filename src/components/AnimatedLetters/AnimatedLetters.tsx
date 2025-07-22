import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './AnimatedLetters.scss';

interface AnimatedLettersProps {
  text: string;
  className?: string;
}

const AnimatedLetters: React.FC<AnimatedLettersProps> = ({
  text,
  className = '',
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const letters = containerRef.current?.querySelectorAll('span.letter');
    if (!letters) return;

    gsap.fromTo(
      letters,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power3.out',
        // immediateRender: false,
      }
    );
  }, [text]);

  return (
    <h1 ref={containerRef} className={className}>
      {text.split('').map((char, i) => (
        <span
          className='letter'
          key={i}
          style={{
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
        >
          {char}
        </span>
      ))}
    </h1>
  );
};

export default AnimatedLetters;
