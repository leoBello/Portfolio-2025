import ContactForm from '../ContactForm/ContactForm';
import Footer from '../Footer/Footer';
import './ContactContainer.scss';

const ContactContainer = () => {
  return (
    <div className='contact-container'>
      <ContactForm />
      <Footer />
    </div>
  );
};

export default ContactContainer;
