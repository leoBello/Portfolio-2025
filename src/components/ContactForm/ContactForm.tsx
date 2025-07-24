import React, { useRef } from 'react';
import { useForm, type FieldErrors } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import './ContactForm.scss';
import GenericButton from '../GenericButton/GenericButton';

interface ContactFormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMAIL_PATTERN = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;

const ContactForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<ContactFormInputs>();

  const formRef = useRef<HTMLDivElement>(null);

  const onSubmit = (data: ContactFormInputs) => {
    console.log('Formulaire soumis :', data);
    toast.success('Message envoyé !');
    reset();
  };

  // Affiche les erreurs du formulaire dans un toast à la soumission
  const onError = (formErrors: FieldErrors<ContactFormInputs>) => {
    Object.values(formErrors).forEach((err) => {
      // err: FieldError | undefined
      if (err?.message) toast.error(err.message);
    });
  };

  return (
    <div ref={formRef} className='contact-form-container'>
      <form className='form' onSubmit={handleSubmit(onSubmit, onError)}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <div className='input-gradient-border'>
            <input
              id='name'
              type='text'
              className='form-input'
              {...register('name', { required: 'Nom obligatoire' })}
              placeholder='Name'
            />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <div className='input-gradient-border'>
            <input
              id='email'
              type='email'
              className='form-input'
              {...register('email', {
                required: 'Email obligatoire',
                pattern: {
                  value: EMAIL_PATTERN,
                  message: "Format de l'email incorrect",
                },
              })}
              placeholder='Email'
            />
          </div>
        </div>

        <div className='form-group'>
          <label>Message</label>
          <div className='input-gradient-border'>
            <textarea
              className='text-area'
              {...register('message', { required: 'Message obligatoire' })}
              placeholder='Your request here'
              rows={5}
            />
          </div>
        </div>
        <GenericButton
          handleClick={() => {}}
          className='submit-button'
          type='submit'
          label='Send'
        />
      </form>
    </div>
  );
};

export default ContactForm;
