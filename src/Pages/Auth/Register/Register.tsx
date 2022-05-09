<<<<<<< HEAD
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from 'Components/AuthHeader';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
=======
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
} from 'firebase/auth';
import { FcGoogle, FcPhoneAndroid } from 'react-icons/fc';
>>>>>>> b90f53174b0f2dccc9729fddeb43c19bbc5ba365

import { Registration } from 'Interface/register.interface';
import TextInputField from 'Components/TextInputField';
import Button from 'Components/Button';
import { routes } from 'routes';
import FormErrorMessage from 'Components/FormErrorMessage';
import { fireAuth } from 'lib/firebase';
<<<<<<< HEAD

export default function Register() {
  const navigate = useNavigate();
  const registerSchema = yup.object().shape({
    name: yup.string().required('Name is required.'),
    email: yup.string().required('Email address is required').email('Enter valid email address'),
    password: yup.string().required('Password is required.').min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup
      .string()
      .required('Confirm Password is required')
=======
import FormHeader from 'Components/FormHeader';
import SignInLinkButton from 'Components/SigninLinkButton';

export default function Register() {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const registerSchema = yup.object().shape({
    name: yup.string().trim().required('Name is required.'),
    email: yup.string().trim().required('Email address is required').email('Enter valid email address'),
    password: yup.string().trim().required('Password is required.').min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup
      .string()
      .required('Confirm Password is required')
      .trim()
>>>>>>> b90f53174b0f2dccc9729fddeb43c19bbc5ba365
      .oneOf([yup.ref('password')], 'Passwords must match'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Registration>({
<<<<<<< HEAD
    resolver: yupResolver(registerSchema) as unknown as any,
=======
    resolver: yupResolver(registerSchema),
>>>>>>> b90f53174b0f2dccc9729fddeb43c19bbc5ba365
  });

  const onSubmit = async (value: Registration) => {
    try {
<<<<<<< HEAD
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
    
=======
      const userCredential = await createUserWithEmailAndPassword(fireAuth, value.email, value.password);
      await sendEmailVerification(userCredential.user);
      navigate(routes.emailVerification);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('Email exits');
      } else {
        setErrorMessage(error.message);
      }
    }
  };
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const googleLogin = async () => {
    try {
      const results = signInWithPopup(auth, provider);
      console.log(results);
      navigate(routes.listScreen);
    } catch (error: any) {
      console.log(error.message);
    }
  };
>>>>>>> b90f53174b0f2dccc9729fddeb43c19bbc5ba365

  return (
    <>
      <div>
<<<<<<< HEAD
        <Header />
      </div>
      <ToastContainer />
      <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
=======
        <FormHeader />
      </div>
      <div className='min-h-full flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-2'>
>>>>>>> b90f53174b0f2dccc9729fddeb43c19bbc5ba365
          <div>
            <h2 className='text-center text-3xl font-extrabold text-gray-900'>Create an Account</h2>
          </div>
          <form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
            <input type='hidden' name='remember' defaultValue='true' />
            <div className='rounded-md -space-y-px'>
<<<<<<< HEAD
              <div className='pb-3'>
                <TextInputField type='text' placeholder='Name' register={register('name')} />
              </div>
              <div>{errors.name?.type === 'required' && 
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>}</div>
              <div className='pb-3'>
                <TextInputField type='email' placeholder='Email address' register={register('email')} />
              </div>
              <div>
                {errors.email?.type === 'required' && 
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>}
                {errors.email?.type === 'email' && <FormErrorMessage>{errors.email?.message}</FormErrorMessage>}
              </div>
              <div className='pb-3'>
                <TextInputField type='password' placeholder='Password' register={register('password')} />
              </div>
              <div>
                {errors.password?.type === 'required' && 
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>}
                {errors.password?.type === 'min' && (
                  <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                )}
              </div>
              <div>
                <TextInputField type='password' placeholder='Confirm Password' register={register('confirmPassword')} />
              </div>
              <div className='pt-3'>
                {errors.confirmPassword?.type === 'required' && (
                  <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
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
=======
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

            <div className='flex justify-center pb-2'>
              <Button>Register</Button>
            </div>

            <FormErrorMessage>{errorMessage}</FormErrorMessage>
          </form>

          {/* Sign in button */}
          <SignInLinkButton onClick={googleLogin}>
            {' '}
            <div className='text-2xl mr-2'>
              <FcGoogle />
            </div>
            Sign in with Google
          </SignInLinkButton>
          <div>
            <Link to={routes.numberVerification}>
              <SignInLinkButton>
                <div className='text-2xl mr-2'>
                  <FcPhoneAndroid />
                </div>
                Sign in with mobile number
              </SignInLinkButton>
            </Link>
          </div>
          {/* Sign in button end */}

>>>>>>> b90f53174b0f2dccc9729fddeb43c19bbc5ba365
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
