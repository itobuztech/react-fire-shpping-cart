import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../Components/AuthHeader';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Registration } from '../../../Interface/register.interface';
import TextInputField from '../../../Components/TextInputField';
import Button from '../../../Components/Button';
import { routes } from '../../../routes';
import FormErrorMessage from '../../../Components/FormErrorMessage';

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
  } = useForm<Registration>({
    resolver: yupResolver(registerSchema) as unknown as any,
  });
  const onSubmit = (data: Registration) => {
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
                <TextInputField
                  type='text'
                  placeholder='Name'
                  register={register('name')} 
                />
              </div>
              <div>
              {errors.name?.type === 'required' && (
              <FormErrorMessage>Name is required.</FormErrorMessage>
            )}
            </div>
              <div className='pb-3'>
                <TextInputField
                  type='email'
                  placeholder='Email address'
                  register={register('email')} 
                />
              </div>
              <div>
              {errors.email?.type === 'required' && (
              <FormErrorMessage>Email address is required.</FormErrorMessage>
            )}
               {errors.email?.type === 'email' && (
              <FormErrorMessage>Enter valid email address</FormErrorMessage>
            )}
            </div>
              <div className='pb-3'>
                <TextInputField
                  type='password'
                  placeholder='Password'
                  register={register('password')} 
                />
              </div>
              <div>
                 {errors.password?.type === 'required' && (
                <FormErrorMessage>Password is required.</FormErrorMessage>
              )}
               {errors.password?.type === 'min' && (
                <FormErrorMessage>Password must be at least 4 characters</FormErrorMessage>
              )}
              </div>
              <div>
                <TextInputField
                  type='password'
                  placeholder='Confirm Password'
                  register={register('confirmPassword')} 
                />
              </div>
              <div className='pt-3'>
              {errors.confirmPassword?.type === 'required' && (
                <FormErrorMessage>Confirm Password is required.</FormErrorMessage>
              )}
               {errors.confirmPassword?.type === 'oneOf' && (
                <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
              )}
              </div>
            </div>

            <div>
            <Button>Register</Button>
            </div>
          </form>
          <div className='text-center'>
            Already have an account?{' '}
            <Link to={routes.login} className='text-blue-600 hover:text-blue-800'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
