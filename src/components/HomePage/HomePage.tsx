import './HomePage.scss';
import AnimatedLetters from '../AnimatedLetters/AnimatedLetters';
import WaveGridDemo from '../WaveGrid/WaveGrid';

const HomePage = () => {
  return (
    <div className='home-page-container'>
      <AnimatedLetters
        className='hero-title no-break-words'
        text='This website is coming soon'
      />
      <WaveGridDemo />
    </div>
  );
};

export default HomePage;
