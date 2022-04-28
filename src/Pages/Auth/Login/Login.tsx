/* eslint-disable max-len */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { SignIn } from 'Interface/login.interface';
import AuthHeader from 'Components/AuthHeader';
import Button from 'Components/Button';
import TextInputField from 'Components/TextInputField';
import { routes } from 'routes';
import FormErrorMessage from 'Components/FormErrorMessage';
import { fireAuth } from 'lib/firebase';

export default function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const loginSchema = yup.object().shape({
    email: yup.string().trim().required('Email address is required.').email('Please enter your email address.'),
    password: yup.string().trim().required('Password is required.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignIn>({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = async (value: SignIn) => {
    try {
      const authUser = await signInWithEmailAndPassword(fireAuth, value.email, value.password);
      if (authUser.user.emailVerified) {
        navigate(routes.listScreen);
      } else {
        navigate(routes.emailVerification);
      }
    } catch (error: any) {
      if (error.code === 'auth/wrong-password') {
        setErrorMessage('Invalid password');
      } else if (error.code === 'auth/user-not-found') {
        setErrorMessage('Email not found');
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  // const onSubmit = (value : SignIn) => {
  //   signInWithEmailAndPassword(fireAuth, value.email, value.password ).then(authUser => {

  //     if (authUser.user.emailVerified) {
  //      alert('email is verified');
  //      navigate(routes.listScreen);
  //     } else {
  //       console.log('email not verified');
  //       navigate(routes.emailVerification);
  //     }
  //     }).catch(function (error) {
  //       console.log(error);

  //   });

  // };

  return (
    <>
      <div>
        <AuthHeader />
      </div>
      <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <div>
            <h2 className='text-center text-3xl font-extrabold text-gray-900'>Sign in to your account</h2>
          </div>
          <form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
            <div className='rounded-md -space-y-px'>
              {/* Email  */}
              <div className='mb-2'>
                <TextInputField type='email' placeholder='Email' register={register('email')} />
              </div>
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              {/* Email End  */}

              {/* Password  */}
              <div>
                <TextInputField type='password' placeholder='Password' register={register('password')} />
              </div>
              <div className='pt-2'>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </div>
              {/* Password End  */}
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                />
                <label className='ml-2 block text-sm text-gray-900'>Remember me</label>
              </div>

              <div className='text-sm'>
                <Link to={routes.forgetPassword} className='font-medium text-indigo-600 hover:text-indigo-800'>
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <Button>Login</Button>
            </div>
            {errorMessage && (
              <div className='bg-yellow-300 p-1'>
                <div className='pl-2'>{errorMessage}</div>
              </div>
            )}
          </form>

          <div className='text-center'>
            Do not have an account?{' '}
            <Link to={routes.registration} className='text-blue-600 hover:text-blue-800'>
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
