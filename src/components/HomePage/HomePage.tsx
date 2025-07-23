import { useState } from 'react';
import './HomePage.scss';
import Hero from '../Hero/Hero';
import Skills from '../Skills/Skills';
import WaveGrid from '../WaveGrid/WaveGrid';
import Slider from '../Silder/Slider';
import { isDesktop } from 'react-device-detect';

const HomePage = () => {
  const [gravity, setGravity] = useState(-25);
  return (
    <div className='home-page-container'>
      <WaveGrid gravity={gravity} />
      {isDesktop && (
        <Slider
          value={gravity}
          min={-50}
          max={50}
          onChange={(value) => setGravity(value)}
          label='Gravity'
          className='gravity-slider'
          withBackground
        />
      )}
      <Hero />
      <Skills />
    </div>
  );
};

export default HomePage;
