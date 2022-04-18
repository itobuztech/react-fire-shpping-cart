/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../Components/Header';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { login } from '../../../Interface/Types';

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
  } = useForm<login>({
    resolver: yupResolver(loginSchema) as unknown as any,
  });
  watch('email');
  const onSubmit = (data: login) => {
    console.log(data);
    alert('Sucessfully Login ');
  };
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">

        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md -space-y-px">
              <div className='pb-2'>
                <input
                  type="email"
                  autoFocus={true}
                  {...register('email')}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 
                  border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md 
                  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
            />
              </div>
              <div className='text-red-600 pb-2'>
              {errors.email?.type === 'required' && (
              <div>Email address is required.</div>
            )}
               {errors.email?.type === 'email' && (
              <div>Please enter your email address</div>
            )}
            </div>
              <div>
                <input
                  type="password"
                  {...register('password')}
                  className="appearance-none rounded-none relative block w-full 
                  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 
                  rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
                  focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              {errors.password && (
                <div className='errorMessage text-red-600 pb-2 pt-2'>Password is required.</div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgetpassword" className="font-medium text-indigo-600 hover:text-indigo-800">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 
                border border-transparent text-sm font-medium rounded-md text-white
                 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                 focus:ring-indigo-500"
              >
                Login
              </button>
            </div>
          </form>
          <div className="text-center">Do not have an account? <Link to="/register" className="text-blue-600 hover:text-blue-800">Register</Link></div>
        </div>
      </div>
    </>
  );
}
