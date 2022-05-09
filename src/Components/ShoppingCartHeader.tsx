import React, { useState } from 'react';
import { BsCart3 } from 'react-icons/bs';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

import { routes } from 'routes';
import { SearchField } from './SearchField';
import '../Styles/product-list-header.css';

export default function ShoppingCartHeader() {
  const productCart = '/product-cart';
  const [cartHide] = useState(useLocation().pathname === productCart ? true : false);
  return (
    <>
      <div className='bg-indigo-400'>
        <div className='p-8 text-white md:justify-around flex navbar'>
          <div className='md:text-2xl sm:text-xl break-words font-bold sm:pl-2 pr-2 pl-2 title'>
            React Fire Shopping Cart
          </div>
          {!cartHide ? (
          <div className='text-black lg:pr-6 md:pr-6 sm:mr-4 sm:pl-2 search'>
            <SearchField label={'search here...'} />
          </div>
          ) : null}
          <div className='flex justify-between nav-items'>
            {/*dropdown */}
            <div className='dropdown inline-block relative '>
              <button
                className='md:text-xl sm:text-xl font-medium md:pr-4 lg:pr-6 sm:pr-2 
              pr-2 inline-flex items-center'>
                <span>My Account</span>
                <MdOutlineKeyboardArrowDown />
              </button>
              <ul className='dropdown-menu absolute hidden text-gray-700 z-10 w-40 lg:w-52 '>
                <NavLink
                  to={routes.userProfile}
                  style={({ isActive }) => ({
                    fontWeight: isActive ? 'bold' : 'semi-bold',
                    background: isActive ? '#7600dc' : '#f0f0f0',
                  })}>
                  <li>
                    <div className='rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'>
                      Profile
                    </div>
                  </li>
                </NavLink>

                <NavLink
                  to={routes.listScreen}
                  style={({ isActive }) => ({
                    fontWeight: isActive ? 'bold' : 'semi-bold',
                  })}>
                  <li>
                    <div className='rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'>
                      Products
                    </div>
                  </li>
                </NavLink>

                {/* only visible for admin*/}
                <NavLink
                  to={routes.oderListScreen}
                  style={({ isActive }) => ({
                    fontWeight: isActive ? 'bold' : 'semi-bold',
                  })}>
                  <li>
                    <div className='bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'>
                      Order List(admin)
                    </div>
                  </li>
                </NavLink>
                {/* only visible for admin end*/}

                {/* only visible for admin*/}
                <NavLink
                  to={routes.productListScreen}
                  style={({ isActive }) => ({
                    fontWeight: isActive ? 'bold' : 'semi-bold',
                  })}>
                  <li>
                    <div className='bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'>
                      Product List(admin)
                    </div>
                  </li>
                </NavLink>
                {/* only visible for admin end*/}

                {/* only visible for admin*/}
                <NavLink
                  to={routes.categoryListScreen}
                  style={({ isActive }) => ({
                    fontWeight: isActive ? 'bold' : 'semi-bold',
                  })}>
                  <li>
                    <div className='bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'>
                      Category List(admin)
                    </div>
                  </li>
                </NavLink>
                {/* only visible for admin end*/}

                {/* only visible for admin*/}
                <NavLink
                  to={routes.productCategoryList}
                  style={({ isActive }) => ({
                    fontWeight: isActive ? 'bold' : 'semi-bold',
                  })}>
                  <li>
                    <div className='bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'>Categories</div>
                  </li>
                </NavLink>
                {/* only visible for admin end*/}
                <NavLink to={routes.logOut}>
                  <li>
                    <div className='rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'>
                      Logout
                    </div>
                  </li>
                </NavLink>
              </ul>
            </div>
            {!cartHide ? (
              <div className='md:text-3xl sm:text-2xl text-white lg:pr-6 md:pr-2'>
                <Link to={routes.productCart}>
                  {' '}
                  <BsCart3 />
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
