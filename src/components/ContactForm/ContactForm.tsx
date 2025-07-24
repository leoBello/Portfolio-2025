import { useForm } from 'react-hook-form';
import './ContactForm.scss';
import GenericButton from '../GenericButton/GenericButton';

interface ContactFormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ContactFormInputs>();

  const onSubmit = (data: ContactFormInputs) => {
    console.log('Formulaire soumis :', data);
    // Ici tu peux intégrer l'envoi vers un backend ou email
    reset();
  };

  return (
    <div className='contact-form-container '>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            className='form-input'
            {...register('name', { required: 'Nom obligatoire' })}
            placeholder='Name'
          />
          {errors.name && (
            <span className='error'>{`errors?.nom?.message`}</span>
          )}
        </div>
        <div className='form-group'>
          <label htmlFor='mail'>Email</label>
          <input
            type='email'
            {...register('email', { required: 'email obligatoire' })}
            placeholder='Email'
          />
          {errors.email && (
            <span className='error'>{`errors.prenom.message`}</span>
          )}
        </div>
        <div className='form-group'>
          <label>Message</label>
          <textarea
            className='text-area'
            {...register('message', { required: 'Message obligatoire' })}
            placeholder='Votre message'
            rows={5}
          />
          {errors.message && (
            <span className='error'>{`errors.message.message`}</span>
          )}
        </div>
        <GenericButton
          handleClick={() => console.log()}
          className='submit-button'
          type='submit'
          label='Send'
        />
        {isSubmitSuccessful && <div className='success'>Message envoyé !</div>}
      </form>
    </div>
  );
};

export default ContactForm;
