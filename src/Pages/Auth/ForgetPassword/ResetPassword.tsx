import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from 'Components/Button';
import FormErrorMessage from 'Components/FormErrorMessage';
import TextInputField from 'Components/TextInputField';
import { ResetPassword } from 'Interface/resetPassword.interface';
import AuthHeader from 'Components/AuthHeader';

export default function PasswordReset() {
  const resetPasswordSchema = yup.object().shape({
    password: yup.string().trim().required('Password is required.').min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup
      .string()
      .required('Confirm Password is required.')
      .trim()
      .oneOf([yup.ref('password')], 'Passwords must match'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPassword>({
    resolver: yupResolver(resetPasswordSchema),
  });
  const onSubmit = () => {
    alert('Password is successfully reset');
  };
  return (
    <>
      <div>
        <AuthHeader />
      </div>
      <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <div>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Reset Password</h2>
          </div>
          <form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
            <div className='rounded-md -space-y-px'>
              <div className='pb-2'>
                <TextInputField type='password' placeholder='Password' register={register('password')} />
              </div>
              <div>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </div>
              <div>
                <TextInputField type='password' placeholder='Confirm Password' register={register('confirmPassword')} />
              </div>
              <div className='pt-2'>
                  <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
              </div>
            </div>

            <div>
              <Button>Reset</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
