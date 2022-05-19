import React, { useEffect, useState } from 'react';
import { BsBoxArrowRight, BsCart3 } from 'react-icons/bs';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { MdOutlineCategory, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { RiProductHuntLine } from 'react-icons/ri';

import { routes } from 'routes';
import { SearchField } from './SearchField';
import '../Styles/product-list-header.css';
import { BiLogOutCircle } from 'react-icons/bi';
import { collection, getDocs } from 'firebase/firestore';
import { db } from 'lib/firebase';

export default function ShoppingCartHeader() {
  const productCart = '/product-cart';
  const [cartHide] = useState(useLocation().pathname === productCart ? true : false);
  const [count, setCount] = useState<any>();
  useEffect(() => {
    const getCartItem = collection(db, 'cartItem');
    getDocs(getCartItem).then((item) => {
      const cartCount = item.size;
      setCount(cartCount);
    });
  }, []);
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
                    <div
                      className='rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 
                    block whitespace-no-wrap'>
                      <div className='flex'>
                        <div className='mt-1 text-blue-600 mr-2 text-xl'>
                          <CgProfile />
                        </div>
                        <div> Profile</div>
                      </div>
                    </div>
                  </li>
                </NavLink>

                <NavLink
                  to={routes.listScreen}
                  style={({ isActive }) => ({
                    fontWeight: isActive ? 'bold' : 'semi-bold',
                  })}>
                  <li>
                    <div
                      className='bg-gray-200 hover:bg-gray-400 py-2 px-4 
                    block whitespace-no-wrap'>
                      <div className='flex'>
                        <div className='mt-1 text-blue-600 mr-2 text-xl'>
                          <RiProductHuntLine />
                        </div>
                        <div> Products</div>
                      </div>
                    </div>
                  </li>
                </NavLink>

                <NavLink
                  to={routes.orderList}
                  style={({ isActive }) => ({
                    fontWeight: isActive ? 'bold' : 'semi-bold',
                  })}>
                  <li>
                    <div
                      className='bg-gray-200 hover:bg-gray-400 py-2 px-4 
                    block whitespace-no-wrap'>
                      <div className='flex'>
                        <div className='mt-1 text-blue-600 mr-2 text-xl'>
                          <BsBoxArrowRight />
                        </div>
                        <div> Orders</div>
                      </div>
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
                    <div
                      className='bg-gray-200 hover:bg-gray-400 py-2 px-4 
                    block whitespace-no-wrap'>
                      <div className='flex'>
                        <div className='mt-1 text-blue-600 mr-2 text-xl'>
                          <BsBoxArrowRight />
                        </div>
                        <div> Orders List(admin)</div>
                      </div>
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
                    <div
                      className='bg-gray-200 hover:bg-gray-400 py-2 px-4 
                    block whitespace-no-wrap'>
                      <div className='flex'>
                        <div className='mt-1 text-blue-600 mr-2 text-xl'>
                          <BsBoxArrowRight />
                        </div>
                        <div> Product List(admin)</div>
                      </div>
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
                    <div
                      className='bg-gray-200 hover:bg-gray-400 py-2 px-4 
                    block whitespace-no-wrap'>
                      <div className='flex'>
                        <div className='mt-1 text-blue-600 mr-2 text-xl'>
                          <BsBoxArrowRight />
                        </div>
                        <div> Category List(admin)</div>
                      </div>
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
                    <div
                      className='bg-gray-200 hover:bg-gray-400 py-2 px-4 
                    block whitespace-no-wrap'>
                      <div className='flex'>
                        <div className='mt-1 text-blue-600 mr-2 text-xl'>
                          <MdOutlineCategory />
                        </div>
                        <div> Category</div>
                      </div>
                    </div>
                  </li>
                </NavLink>
                {/* only visible for admin end*/}
                <NavLink to={routes.logOut}>
                  <li>
                    <div
                      className='bg-gray-200 hover:bg-gray-400 py-2 px-4 
                    block whitespace-no-wrap'>
                      <div className='flex'>
                        <div className='mt-1 text-blue-600 mr-2 rotate-90 text-xl'>
                          <BiLogOutCircle />
                        </div>
                        <div> Logout</div>
                      </div>
                    </div>
                  </li>
                </NavLink>
              </ul>
            </div>
            {!cartHide ? (
              <div className='flex'>
                <div className='md:text-3xl sm:text-2xl text-white'>
                  <Link to={routes.productCart}>
                    {' '}
                    <BsCart3 />
                  </Link>
                </div>
                (<div className='text-red-600'>{count}</div>)
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
