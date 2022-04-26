import React from 'react';
import { BsCart3 } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { routes } from 'routes';
import { SearchField } from './SearchField';

export default function ListHeader() {
  return (
    <>
      <div className='bg-indigo-400'>
        <div className='pt-5 pb-5 text-white justify-between justify-around flex'>
          <div className='md:text-2xl sm:text-xl font-bold'>React Fire Cms</div>
          <div className='flex justify-between'>
            <div className='text-black pr-6'>
              <SearchField label={'search here...'} />
            </div>
            <div className='md:text-xl sm:text-xl font-medium pr-4'>Categories</div>
            <div className='md:text-3xl sm:text-xl text-white flex'>
              <BsCart3 />
            </div>
          </div>
          <div className='md:text-xl sm:text-xl'>
            <Link to={routes.logOut}>Logout</Link>
          </div>
        </div>
      </div>
    </>
  );
}
