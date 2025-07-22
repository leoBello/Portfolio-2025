import './HomePage.scss';
import AnimatedLetters from '../AnimatedLetters/AnimatedLetters';

const HomePage = () => {
  return (
    <div className='home-page-container'>
      <AnimatedLetters className='hero-title' text='WHO I AM ?' />
    </div>
  );
};

export default HomePage;
