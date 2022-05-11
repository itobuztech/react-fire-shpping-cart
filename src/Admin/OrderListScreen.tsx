import React from 'react';
import { BiRupee } from 'react-icons/bi';

import Pagination from 'Components/Pagination';
import ShoppingCartHeader from 'Components/ShoppingCartHeader';
import { MdPreview } from 'react-icons/md';
import { routes } from 'routes';
import { Link } from 'react-router-dom';

export default function OrderListScreen() {
  return (
    <>
      <ShoppingCartHeader />
      <body className=''>
        <div className='container mx-auto mt-10'>
          <div className='flex shadow-md my-10'>
            <div className='w-full bg-gray-50 px-10 py-10'>
              {/* Cart header */}
              <div className='flex justify-between border-b pb-8'>
                <h1 className='font-semibold text-2xl'>Order List</h1>
                <h2 className='font-semibold text-2xl'>1 Items</h2>
              </div>
              {/* Cart header end */}

              {/* cart list header */}
              <div className='flex mt-10 mb-5'>
                <h3 className='font-semibold text-gray-600 text-xs uppercase w-1/4'>Customer Name</h3>
                <h3 className='font-semibold text-gray-600 text-xs uppercase w-1/4'>Customer Address</h3>
                <h3 className='font-semibold text-gray-600 text-xs uppercase w-1/4'>Product Name</h3>
                <h3 className='font-semibold text-center text-gray-600 text-xs uppercase w-1/4 pr-10'>Purchase Date</h3>
                <h3 className='font-semibold text-center text-gray-600 text-xs uppercase w-1/4'>Quantity</h3>
                <h3 className='font-semibold text-center text-gray-600 text-xs uppercase w-1/4'>Total</h3>
                <h3 className='w-1/5'></h3>
              </div>
              {/* cart list header end */}

              {/* cart list item */}
              <div className='flex items-center hover:bg-gray-100 -mx-8 px-6 py-5'>
                <div className='flex w-1/4'>
                  <div className='flex flex-col justify-between ml-4 flex-grow'>
                    <span className='font-bold text-sm'>Rimpa Das</span>
                  </div>
                </div>
                <div className='flex w-1/4'>
                  <div className='flex flex-col justify-between ml-4 flex-grow'>
                    <span className='font-bold text-sm'>Shibpur, Howrah</span>
                  </div>
                </div>
                <div className='flex w-1/4'>
                  <div className='flex flex-col justify-between ml-4 flex-grow'>
                    <span className='font-bold text-sm'>Hp Laptop</span>
                  </div>
                </div>
                <div className='flex w-1/4 pl-6'>
                  <div className='flex flex-col justify-between ml-4 flex-grow'>
                    <span className='font-bold text-sm'>06/05/2022</span>
                  </div>
                </div>

                {/* Quantity section */}
                <div className='flex justify-center w-1/4'>1</div>
                {/* Quantity section end */}

                {/* Price section */}
                <span className='text-center w-1/4 font-semibold text-sm'>
                  <BiRupee className='absolute ml-10 mt-1' />
                  4000.00
                </span>
                {/* Price section end */}

                <div className='flex justify-center w-1/5'>
                  <Link to={routes.orderDetails}>
                    <MdPreview className='text-2xl text-green-600' />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Pagination />
      </body>
    </>
  );
}
