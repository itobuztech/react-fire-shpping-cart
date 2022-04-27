import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Registration } from 'Interface/register.interface';
import TextInputField from 'Components/TextInputField';
import Button from 'Components/Button';
import { routes } from 'routes';
import FormErrorMessage from 'Components/FormErrorMessage';
import { fireAuth } from 'lib/firebase';
import Header from 'Components/AuthHeader';

export default function Register() {
  const navigate = useNavigate();
  const registerSchema = yup.object().shape({
    name: yup.string().trim().required('Name is required.'),
    email: yup.string().trim().required('Email address is required').email('Enter valid email address'),
    password: yup.string().trim().required('Password is required.').min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup
      .string()
      .required('Confirm Password is required')
      .trim()
      .oneOf([yup.ref('password')], 'Passwords must match'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Registration>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (value: Registration) => {
    try {
      await createUserWithEmailAndPassword(fireAuth, value.email, value.password);
      navigate(routes.login);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Email Address Already Used');
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <ToastContainer />
      <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <div>
            <h2 className='text-center text-3xl font-extrabold text-gray-900'>Create an Account</h2>
          </div>
          <form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
            <input type='hidden' name='remember' defaultValue='true' />
            <div className='rounded-md -space-y-px'>
              {/* Name  */}
              <div className='pb-3'>
                <TextInputField type='text' placeholder='Name' register={register('name')} />
              </div>
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              {/* Name End  */}

              {/* Email  */}
              <div className='pb-3'>
                <TextInputField type='email' placeholder='Email address' register={register('email')} />
              </div>
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              {/* Email End */}

              {/* Password  */}
              <div className='pb-3'>
                <TextInputField type='password' placeholder='Password' register={register('password')} />
              </div>
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              {/* Password End  */}

              {/* Confirm Password  */}
              <div>
                <TextInputField type='password' placeholder='Confirm Password' register={register('confirmPassword')} />
              </div>
              <div className='pt-2'>
                <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
              </div>
              {/* Confirm Password End  */}
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
