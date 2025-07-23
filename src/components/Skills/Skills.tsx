import StackCard from '../StackCard/StackCard';
import computer from '../../assets/computer.png';
import stack from '../../assets/stack.png';
import paint from '../../assets/paint.png';
import './Skills.scss';

const Skills = () => {
  return (
    <div className='skils-container'>
      <StackCard
        icon={computer}
        title='What I can do'
        description='I can help develop solutions that will help you grow your business :'
        listItems={[
          { title: 'UI/UX Design' },
          { title: 'Fullstack Web Development' },
          { title: 'Database Design' },
          { title: 'API Integration' },
        ]}
      />
      <StackCard
        icon={stack}
        title='Tools I use'
        description='I use the latest tools a nd technologies to build functional and scalable products :'
        listItems={[
          {
            title: 'Frontend',
            description: 'React, Typescript, Javascript, Sass, Three.js',
          },
          { title: 'Backend', description: 'Node.js, MongoDB, PostgreSQL' },
          { title: 'CMS', description: 'Wordpress' },
        ]}
      />
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
  );
};

export default Skills;
