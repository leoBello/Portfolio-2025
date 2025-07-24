import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import gsap from 'gsap';
import { toast } from 'react-hot-toast'; // <-- Import toast
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ContactFormInputs>();

  const formRef = useRef<HTMLDivElement>(null);

  const triggerGlitch = () => {
    if (!formRef.current) return;

    const tl = gsap.timeline();
    tl.to(formRef.current, { x: 10, duration: 0.05 })
      .to(formRef.current, { x: -10, duration: 0.05 })
      .to(formRef.current, { x: 0, duration: 0.04 })
      .to(
        formRef.current,
        {
          filter: 'hue-rotate(80deg) brightness(2) contrast(2)',
          duration: 0.06,
        },
        '-=0.03'
      )
      .to(formRef.current, { filter: 'none', duration: 0.06 });
  };

  const onSubmit = (data: ContactFormInputs) => {
    triggerGlitch();
    console.log('Formulaire soumis :', data);
    toast.success('Message envoyé !');
    reset();
  };

  // Affiche les erreurs du formulaire dans un toast à la soumission
  const onError = (formErrors: typeof errors) => {
    Object.values(formErrors).forEach((err: any) => {
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
        {/* <div className='form-group'>
          <label htmlFor='subject'>Subject</label>
          <input
            id='subject'
            type='text'
            className='form-input'
            {...register('subject', { required: 'Sujet obligatoire' })}
            placeholder='Subject'
          />
        </div> */}
        <div className='form-group'>
          <label>Message</label>
          <div className='input-gradient-border'>
            <textarea
              className='text-area'
              {...register('message', { required: 'Message obligatoire' })}
              placeholder='Votre message'
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
        {/* Plus besoin d'afficher les .error sous les inputs car c'est géré par toast */}
        {isSubmitSuccessful && (
          <div className='success'>Message envoyé&nbsp;!</div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
