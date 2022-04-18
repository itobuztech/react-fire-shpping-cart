import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../Components/Header';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registration } from '../../../Interface/Types';

export default function Register() {

  const registerSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(4),
    confirmPassword: yup.string().required().oneOf([yup.ref('password')], 'Passwords must match'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registration>({
    resolver: yupResolver(registerSchema) as unknown as any,
  });
  const onSubmit = (data: registration) => {
    console.log(data);
    alert('Thank you for registration');
  };
  return (
    <>
      <div>
        <Header />
      </div>
      <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <div>
            <h2 className='text-center text-3xl font-extrabold text-gray-900'>Create an Account</h2>
          </div>
          <form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
            <input type='hidden' name='remember' defaultValue='true' />
            <div className='rounded-md -space-y-px'>
              <div className='pb-3'>
                <input
                  type='text'
                  {...register('name')}
                  className='appearance-none rounded-none relative block w-full px-3 py-2
                   border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md
                    focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Name'
                />
              </div>
              <div className='text-red-600 pb-2'>
              {errors.name?.type === 'required' && (
              <div>Name is required.</div>
            )}
            </div>
              <div className='pb-3'>
                <input
                  type='email'
                  {...register('email')}
                  className='appearance-none rounded-none relative block w-full px-3 py-2
                   border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md
                    focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Email address'
                />
              </div>
              <div className='text-red-600 pb-2'>
              {errors.email?.type === 'required' && (
              <div>Email address is required.</div>
            )}
               {errors.email?.type === 'email' && (
              <div>Enter valid email address</div>
            )}
            </div>
              <div className='pb-3'>
                <input
                  type='password'
                  {...register('password')}
                  className='appearance-none rounded-none relative block w-full px-3 py-2
                   border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md
                    focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Password'
                />
              </div>
              <div className='text-red-600 pb-2'>
                 {errors.password?.type === 'required' && (
                <div>Password is required.</div>
              )}
               {errors.password?.type === 'min' && (
                <div>Password must be at least 4 characters</div>
              )}
              </div>
              <div>
                <input
                  type='password'
                  {...register('confirmPassword')}
                  className='appearance-none rounded-none relative block w-full px-3 py-2
                   border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md 
                   focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Confirm Password'
                />
              </div>
              <div className='text-red-600 pb-2 pt-2'>
              {errors.confirmPassword?.type === 'required' && (
                <div>Confirm Password is required.</div>
              )}
               {errors.confirmPassword?.type === 'oneOf' && (
                <div>{errors.confirmPassword?.message}</div>
              )}
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='group relative w-full flex justify-center py-2 px-4 border 
                border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 
                hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                Register
              </button>
            </div>
          </form>
          <div className='text-center'>
            Already have an account?{' '}
            <Link to='/' className='text-blue-600 hover:text-blue-800'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
