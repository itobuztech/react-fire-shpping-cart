import React from 'react';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { Link } from 'react-router-dom';

import { routes } from 'routes';

export default function EmailVerification() {
  return (
    <div className='md:mt-40 sm:mt-20 text-center'>
      <div className='text-6xl text-indigo-600 flex justify-center'>
        <HiOutlineMailOpen />
      </div>
      <div className='text-3xl mt-2 font-semibold'>Verify your email address</div>
      <div className='text-xl mt-2'>
        To confirm your email address, please click on the link in the email we sent you.
      </div>
      <button className='mt-4 text-blue-500'>Resend Email</button>
      <div className='text-xl mt-4 font-semibold'>
        <Link to={routes.logOut}>Logout</Link>
      </div>
    </div>
  );
}
