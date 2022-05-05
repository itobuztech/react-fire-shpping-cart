import React from 'react';
import { BsCart3 } from 'react-icons/bs';
import { BiLogOutCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import { routes } from 'routes';
import { SearchField } from './SearchField';

export default function ListHeader() {
  return (
    <>
      <div className='bg-indigo-400'>
        <div className='pt-5 pb-5 text-white md:justify-around flex'>
          <div className='md:text-2xl sm:text-md break-words font-bold sm:pl-2 pr-2 pl-2'>React Fire Shopping Cart</div>
          <div className='text-black lg:pr-6 md:pr-6 sm:pl-2 search'>
            <SearchField label={'search here...'} />
          </div>
          <div className='flex justify-between'>
            <div className='md:text-xl sm:text-md font-medium md:pr-4 lg:pr-6 sm:pr-2'></div>
            <div className='md:text-xl sm:text-md font-medium md:pr-4 lg:pr-6 sm:pr-2'>Categories</div>
            <div className='md:text-xl sm:text-md font-medium md:pr-4 lg:pr-6 sm:pr-2'>
              <Link to={routes.userProfile}>My Account</Link>
            </div>
            <div className='md:text-3xl sm:text-xl text-white lg:pr-6 md:pr-2'>
              <Link to={routes.productCart}>
                {' '}
                <BsCart3 />
              </Link>
            </div>
            <div className='md:text-3xl sm:text-xl text-white rotate-90'>
              <Link to={routes.logOut}>
                <BiLogOutCircle />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
