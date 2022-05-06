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
        <div className='pt-5 pb-5 text-white justify-around flex'>
          <div className='md:text-2xl sm:text-md font-bold'>React Fire Shopping Cart</div>
          <div className='text-black pr-6'>
            <SearchField label={'search here...'} />
          </div>
          <div className='flex justify-between'>
            <div className='md:text-xl sm:text-md font-medium md:pr-6 sm:pr-4'>
              <Link to={routes.productCategoryList}>Categories</Link></div>
            <div className='md:text-3xl sm:text-xl text-white md:pr-6 sm:pr-4'>
              <Link to={routes.cartItem}>
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
