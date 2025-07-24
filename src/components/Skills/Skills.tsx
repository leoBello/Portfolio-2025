import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StackCard from '../StackCard/StackCard';
import computer from '../../assets/computer.png';
import stack from '../../assets/stack.png';
import paint from '../../assets/paint.png';
import './Skills.scss';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const card1 = useRef<HTMLDivElement | null>(null);
  const card2 = useRef<HTMLDivElement | null>(null);
  const card3 = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Animation carte 1 : Arrive du haut gauche avec rotation

    gsap.fromTo(
      card1.current,
      {
        x: -100,
        y: -100,
        rotateX: 45,
        rotateY: -20,
        rotateZ: 20,
        opacity: 0,
      },
      {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card1.current,
          start: 'top 80%',
          end: 'top 50%', // Ajuste le end pour gérer la "durée" du scroll d'animation
          scrub: true, // <-- clé ici !
        },
      }
    );
    // const fromY = card2.current
    //   ? -window.innerHeight + card2.current.getBoundingClientRect().height / 2
    //   : -440;

    // console.log('fromY: ' + fromY);

    // Animation carte 2
    gsap.fromTo(
      card2.current,
      {
        x: 100,
        y: -350,
        rotateX: 360,
        rotateY: 360,
        rotateZ: 360,
        opacity: 0,
      },
      {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card2.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: true,
        },
      }
    );

    // Animation carte 3
    gsap.fromTo(
      card3.current,
      {
        x: 80,
        y: -130,
        rotateX: -25,
        rotateY: 45,
        rotateZ: 40,
        opacity: 0,
      },
      {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card3.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div className='skils-container'>
      <div ref={card1}>
        <StackCard
          icon={computer}
          title='What I can do'
          description='I can help develop solutions that will help you grow your business :'
          listItems={[
            { title: 'Fullstack Web Development' },
            { title: 'UI/UX Design' },
            { title: 'Database Design' },
            { title: 'API Integration' },
          ]}
        />
      </div>
      <div ref={card2}>
        <StackCard
          icon={stack}
          title='Tools I use'
          description='I use the latest tools and technologies to build functional and scalable products :'
          listItems={[
            {
              title: 'Frontend',
              description: 'React, Typescript, Javascript, Gsap, Three.js',
            },
            { title: 'Backend', description: 'Node.js, MongoDB, PostgreSQL' },
            { title: 'CMS', description: 'Wordpress' },
          ]}
        />
      </div>
      <div ref={card3}>
        <StackCard
          icon={paint}
          title='UI/UX Design '
          description={`I create modern, responsive and efficient interfaces that address your needs and your users' requirements`}
          listItems={[
            { title: 'User-Centered Design' },
            { title: 'Modern & Clean UI' },
            { title: 'Responsive Layouts' },
          ]}
        />
      </div>
    </div>
  );
};

export default Skills;
