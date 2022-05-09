import React from 'react';
import Header from '../../../Components/AuthHeader';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInputField from '../../../Components/TextInputField';
import Button from '../../../Components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../../../routes';
import { PasswordReset } from '../../../Interface/forgetpassword.interface';
import FormErrorMessage from '../../../Components/FormErrorMessage';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ForgetPassword() {
const navigate = useNavigate();
  const resetPasswordSchema = yup.object().shape({
    email: yup.string().required().email(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordReset>({
    resolver: yupResolver(resetPasswordSchema) as unknown as any,
  });
  const onSubmit = (data: PasswordReset) => {
    console.log(data);
    navigate(routes.resetPassword);
  };
  return (
  <>
   <div>
    <Header/>
    </div>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">

        <div className="max-w-md w-full space-y-8">
          <div className='text-center'>
            <h2 className="text-3xl font-extrabold text-gray-900">Forget Password ????</h2>
            <p className='mt-2'>Enter your registered email address</p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-md -space-y-px">
              <div className='pb-3'>
                <TextInputField
                  type="email"
                  placeholder="Email address"
                  register={register('email')}
                />
              </div>
              <div>
                 {errors.email?.type === 'required' && (
                <FormErrorMessage>Email Address is required.</FormErrorMessage>
              )}
              </div>
              <div className='flex items-center'>
            <div className='text-sm'>Remember Password?</div>{' '}
            <Link to={routes.login} className='text-blue-600 hover:text-blue-800 ml-2 block text-sm text-gray-900'>
              Login
            </Link>
          </div>
            </div>

            <div>
             <Button>Reset Password</Button>
            </div>
          </form>
      </div>
      </div>
      </>
    resolver: yupResolver(resetPasswordSchema),
  });

  const forgotPassword = async (value: PasswordReset) => {
    try {
      await sendPasswordResetEmail(fireAuth, value.email);
      toast.success('reset email sent to ' + value.email);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div>
        <FormHeader />
        <ToastContainer />
      </div>
      <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <div className='text-center'>
            <h2 className='text-3xl font-extrabold text-gray-900'>Forget Password ????</h2>
            <p className='mt-2'>Enter your registered email address</p>
          </div>
          <form className='mt-8 space-y-6' onSubmit={handleSubmit(forgotPassword)}>
            <div className='rounded-md -space-y-px'>
              <div className='pb-2'>
                <TextInputField type='email' placeholder='Email address' register={register('email')} />
              </div>
              <div>
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </div>
              <div className='flex items-center pt-3'>
                <div className='text-sm'>Remember Password?</div>{' '}
                <Link to={routes.login} className='text-blue-600 hover:text-blue-800 ml-2 block text-sm'>
                  Login
                </Link>
              </div>
            </div>

            <div>
              <Button>Reset Password</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
