import React from 'react';
import faker from '@faker-js/faker';

import Pagination from 'Components/Pagination';
import ShoppingCartHeader from 'Components/ShoppingCartHeader';
import StarRating from 'Components/StarRating';
import { routes } from 'routes';
import { Link } from 'react-router-dom';

export default function OrderList() {
  const orders = [...Array(5)].map(() => ({
    productName: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.business(),
  }));

  return (
    <>
      <ShoppingCartHeader />
      <body>
        <div className='container mx-auto mt-10'>
          <div className='flex shadow-md'>
            {/* filter */}
            <div className='w-1/4 px-8 py-10'>
              <h1 className='font-semibold text-2xl border-b pb-2'>Filter</h1>

              <div className='flex mt-4 mb-5'>
                <div className='checkbox-cell lg:w-5'>
                  <input type='checkbox' />
                </div>
                <span className='font-medium text-sm'>On the way</span>
              </div>

              <div className='flex'>
                <div className='checkbox-cell lg:w-5'>
                  <input type='checkbox' />
                </div>
                <span className='font-medium text-sm'>Delivered</span>
              </div>

              <div>
                <div className='flex mt-4 mb-5'>
                  <div className='checkbox-cell lg:w-5'>
                    <input type='checkbox' />
                  </div>
                  <span className='font-medium text-sm'>Cancelled</span>
                </div>

                <div className='flex'>
                  <div className='checkbox-cell lg:w-5'>
                    <input type='checkbox' />
                  </div>
                  <span className='font-medium text-sm'>Returned</span>
                </div>
              </div>
            </div>
            {/* filter end */}

            {/* order list */}
            <div className='w-3/4 bg-gray-50 px-10 py-6'>
              <div className='flex justify-between border-b pb-2'>
                <h1 className='font-semibold text-2xl'>Orders</h1>
              </div>

              {orders.map((el) => {
                return (
                  <div className='flex items-center border-b hover:bg-gray-100 px-6 py-5'>
                    <div className='flex w-2/6'>
                      <div className='flex flex-col justify-between  ml-4 flex-grow'>
                        <Link to={routes.orderDetails}>
                          <img src={el.image} className='w-24 h-24' />
                        </Link>
                      </div>
                    </div>

                    <div className='flex w-2/6'>
                      <div className='flex flex-col justify-between flex-grow'>
                        <Link to={routes.orderDetails}>
                          <span className='font-medium text-md'>{el.productName}</span>
                        </Link>
                      </div>
                    </div>

                    <div className='flex w-2/6'>
                      <div>
                        <span className='font-medium text-md text-green-500'>Delivered</span>
                      </div>
                    </div>

                    <div className='flex w-2/6'>
                      <div className='flex flex-col justify-between flex-grow'>
                        <span className='font-bold text-md'>
                          <StarRating />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Pagination />
      </body>
    </>
  );
}
