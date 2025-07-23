import { useState } from 'react';
import './Hero.scss';
import AnimatedLetters from '../AnimatedLetters/AnimatedLetters';
import WaveGrid from '../WaveGrid/WaveGrid';
import Slider from '../Silder/Slider';
import { isDesktop } from 'react-device-detect';

const Hero = () => {
  const [gravity, setGravity] = useState(-25);
  return (
    <div className='hero-container'>
      {isDesktop && (
        <Slider
          value={gravity}
          min={-50}
          max={50}
          onChange={(value) => setGravity(value)}
          label='Gravité'
          className='gravity-slider'
          withBackground
        />
      )}
      <AnimatedLetters
        className='hero-title title-pt-1 no-break-words'
        text={`Hi, I'm Léo`}
      />
      <AnimatedLetters
        className='hero-title title-pt-2 no-break-words'
        text='Full-Stack Developer'
      />
      <WaveGrid gravity={gravity} />
    </div>
  );
};

export default Hero;
