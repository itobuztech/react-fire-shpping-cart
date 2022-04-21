/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignIn } from '../../../Interface/login.interface';
import AuthHeader from '../../../Components/AuthHeader';
import Button from '../../../Components/Button';
import TextInputField from '../../../Components/TextInputField';
import { routes } from '../../../routes';
import FormErrorMessage from '../../../Components/FormErrorMessage';

export default function Login() {
  const loginSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignIn>({
    resolver: yupResolver(loginSchema) as unknown as any,
  });
  watch('email');

  const onSubmit = (data: SignIn) => {
    console.log(data);
    alert('Sucessfully Login ');
  };
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
              <div className='pb-2'>
          <TextInputField
          type='email'
          placeholder='Email'
          register={register('email')}
           />
              </div>
              <div>
                {errors.email?.type === 'required' && <FormErrorMessage>Email address is required.</FormErrorMessage>}
                {errors.email?.type === 'email' && <FormErrorMessage>Please enter your email address</FormErrorMessage>}
              </div>
              <div className='pb-2'>
                <TextInputField 
                type='password'
                placeholder='Password' 
                register={register('password')} />
              </div>
              {errors.password && <FormErrorMessage>Password is required.</FormErrorMessage>}
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
                <Link to={routes.forgetpassword} className='font-medium text-indigo-600 hover:text-indigo-800'>
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
             <Button>Login</Button>
            </div>
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
