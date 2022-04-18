import React from 'react';
import Header from '../../../Components/Header';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetPassword } from '../../../Interface/Types';

export default function ForgetPassword() {

  const resetPasswordSchema = yup.object().shape({
    password: yup.string().required().min(4),
    confirmPassword: yup.string().required().oneOf([yup.ref('password')], 'Passwords must match'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resetPassword>({
    resolver: yupResolver(resetPasswordSchema) as unknown as any,
  });
  const onSubmit = (data: resetPassword) => {
    console.log(data);
    alert('Password is successfully reset');
  };
  return (
  <>
   <div>
    <Header/>
    </div>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">

        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset Password</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-md -space-y-px">
              <div className='pb-3'>
                <input
                  type="password"
                  {...register('password')}
                  className="appearance-none rounded-none relative block w-full px-3 py-2
                   border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md 
                   focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 
                   sm:text-sm"
                  placeholder="Password"
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
                  type="password"
                  {...register('confirmPassword')}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 
                  border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md 
                  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
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
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border
                 border-transparent text-sm font-medium rounded-md text-white bg-indigo-600
                  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                  focus:ring-indigo-500"
              >
                Reset
              </button>
            </div>
          </form>
      </div>
      </div>
      </>
  );
}
