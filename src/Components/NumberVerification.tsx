import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

import { NumberVerificationLink } from 'Interface/numberVerification.interface';
import AuthHeader from './AuthHeader';
import TextInputField from './TextInputField';
import Button from './Button';

export default function NumberVerification() {
  const [final, setfinal] = useState('');
  const numberVerificationSchema = yup.object().shape({
    phoneNumber: yup
      .string()
      .trim()
      .required('Phone number is required.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NumberVerificationLink>({
    resolver: yupResolver(numberVerificationSchema),
  });
  const auth = getAuth();
 
  const onSubmit = async (value: NumberVerificationLink) => {
    try {
       const verify = new RecaptchaVerifier('captcha-container', {}, auth);
      signInWithPhoneNumber(auth, value.phoneNumber, verify);
    } catch (error: any) {
      alert(error);
      window.location.reload();
      console.log(error.message);
    }
  };

  return (
    <>
      <div>
        <AuthHeader />
      </div>
      <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <div className='text-center'>
            <h2 className='text-3xl font-extrabold text-gray-900'>Verify Your Number</h2>
            <p className='mt-2'>Please enter your phone number</p>
          </div>
          <form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
            <div className='rounded-md -space-y-px'>
              <div className='pb-2'>
                <TextInputField type='number' placeholder='Phone number' register={register('phoneNumber')} />
              </div>
              <div id='captcha-container'></div>
            </div>

            <div>
              <Button>Send</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
