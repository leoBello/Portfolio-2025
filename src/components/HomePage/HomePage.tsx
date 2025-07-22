import './HomePage.scss';
import AnimatedLetters from '../AnimatedLetters/AnimatedLetters';
import WaveGridDemo from '../WaveGrid/WaveGrid';

const HomePage = () => {
  return (
    <div className='home-page-container'>
      <AnimatedLetters className='hero-title' text='WHO I AM ?' />
      <WaveGridDemo />
    </div>
  );
};

export default HomePage;
