import { useState } from 'react';
import './HomePage.scss';
import Hero from '../Hero/Hero';
import Skills from '../Skills/Skills';
import WaveGrid from '../WaveGrid/WaveGrid';
import Slider from '../Silder/Slider';
import { isDesktop } from 'react-device-detect';
import ContactContainer from '../ContactContainer/ContactContainer';

const HomePage = () => {
  const [gravity, setGravity] = useState(-30);
  return (
    <div className='home-page-container'>
      <WaveGrid gravity={gravity} />
      {isDesktop && (
        <Slider
          value={gravity}
          min={-75}
          max={75}
          onChange={(value) => setGravity(value)}
          label='Gravity'
          className='gravity-slider'
          withBackground
        />
      )}
      <Hero />
      <Skills />
      <ContactContainer />
    </div>
  );
};

export default HomePage;
