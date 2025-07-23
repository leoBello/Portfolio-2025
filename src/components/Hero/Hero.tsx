import './Hero.scss';
import AnimatedLetters from '../AnimatedLetters/AnimatedLetters';

const Hero = () => {
  return (
    <div className='hero-container'>
      <AnimatedLetters
        className='hero-title title-pt-1 no-break-words'
        text={`Hi, I'm Léo`}
      />
      <AnimatedLetters
        className='hero-title title-pt-2 no-break-words'
        text='Full-Stack Developer'
      />
    </div>
  );
};

export default Hero;
