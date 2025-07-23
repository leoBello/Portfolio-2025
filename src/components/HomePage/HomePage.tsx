import { useState } from 'react';
import './HomePage.scss';
import AnimatedLetters from '../AnimatedLetters/AnimatedLetters';
import WaveGrid from '../WaveGrid/WaveGrid';
import Slider from '../Silder/Slider';
import { isDesktop } from 'react-device-detect';

const HomePage = () => {
  const [gravity, setGravity] = useState(-25);
  return (
    <div className='home-page-container'>
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
        className='hero-title no-break-words'
        text='This website is coming soon'
      />
      <WaveGrid gravity={gravity} />
    </div>
  );
};

export default HomePage;
