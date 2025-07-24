import ContactForm from '../ContactForm/ContactForm';
import Footer from '../Footer/Footer';
import phoneIcon from '../../assets/phone.png';
import emailIcon from '../../assets/email.png';
import locationIcon from '../../assets/location_om1.png';
import './ContactContainer.scss';
import ClipboardCopy from '../CopyTextToClipboard/CopyTextToClipboard';

const ContactContainer = () => {
  return (
    <div className='contact-container'>
      <div className='form-text-container'>
        <h2>{`Let's make your projects a reality`}</h2>
        <p>{`Ready to bring your project to life with expert hands and a good dose of creativity? `}</p>
        <p>{`I’ll handle the hard work—you just take the credit! Let’s make your project shine (and don’t worry, developer jokes are included for free)`}</p>
        <div className='icon-label'>
          <img className='icon-label-icon' src={phoneIcon} alt='Phone icon' />
          <p>{`+33 6 59 08 61 83`}</p>
        </div>
        <div className='icon-label'>
          <img className='icon-label-icon' src={emailIcon} alt='Email Icon' />
          <ClipboardCopy copyText='leobello.wd@gmail.com' />
        </div>
        <div className='icon-label'>
          <img
            className='icon-label-icon'
            src={locationIcon}
            alt='Location icon'
          />
          <p>{`Marseille, France`}</p>
        </div>
      </div>

      <ContactForm />
      <Footer />
    </div>
  );
};

export default ContactContainer;
