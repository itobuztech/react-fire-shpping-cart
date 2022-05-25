import React from 'react';
import { BiRupee } from 'react-icons/bi';
import faker from '@faker-js/faker';

import ShoppingCartHeader from 'Components/ShoppingCartHeader';
import StarRating from 'Components/StarRating';

export default function OrderListDetails() {
  const orders = [...Array(1)].map(() => ({
    productName: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.business(),
  }));
  return (
    <>
      <ShoppingCartHeader />
      <div>
        <div className='container mx-auto mt-10'>
          {/* order details */}
          <div className='w-full bg-gray-50 px-8 py-8 mb-4'>
            <div className='border-b pb-2'>
              <h1 className='font-semibold text-2xl'>Order Details</h1>
            </div>

            {orders.map((el) => {
              return (
                <div className='flex items-center py-5'>
                  <div className='flex w-2/6'>
                    <div className='ml-4 flex-grow'>
                      <img src={el.image} className='w-24 h-24' />
                    </div>
                  </div>

                  <div className='flex w-2/6'>
                    <div>
                      <span className='font-medium text-md'>{el.productName}</span>
                    </div>
                  </div>

                  <div className='flex w-2/6'>
                    <div className='lg:w-5 mt-1'>
                      <BiRupee />
                    </div>
                    <span className='font-medium text-md '>{el.price}</span>
                  </div>

                  <div className='flex w-2/6'>
                    <div>
                      <span className='font-medium text-md text-green-500'>Delivered</span>
                    </div>
                  </div>

                  <div className='flex w-2/6'>
                    <div>
                      <span className='font-bold text-md'>
                        <StarRating />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* order details end */}

          {/* shipping address and price details */}
          <div className='flex'>
            <div className='w-3/4 bg-gray-50 px-8 py-8'>
              <div className='border-b pb-2'>
                <h1 className='font-semibold text-2xl'>Shipping address</h1>
              </div>

              <div className='mt-2'>
                <span className='font-medium text-base'>Rimpa Das</span>
              </div>

              <div className='mt-2'>
                <span className='font-normal text-base'>
                  Webel STP II Building, 53, DN Block, Sector V, Bidhannagar, Kolkata
                </span>
              </div>

              <div>
                <span className='font-normal text-base'>West Bengal 700091</span>
              </div>

              <div className='mt-2'>
                <span className='font-normal text-base'>
                  <label className='font-semibold mr-2'>Phone number:</label>
                  5432543234
                </span>
              </div>

              <div className='mt-2'>
                <span className='font-normal text-base'>
                  <label className='font-semibold mr-2'>Payment method:</label>
                  Net Banking
                </span>
              </div>
            </div>

            {/*Order summary section */}
            <div className='w-1/4 px-8 py-8 bg-gray-100'>
              <h1 className='font-semibold text-2xl border-b pb-2'>Price Details</h1>
              <div className='flex justify-between mt-6 mb-5'>
                <span className='font-semibold text-sm'>Selling Price</span>
                <div className='flex'>
                  <span className='text-sm mr-4'>
                    <BiRupee className='absolute mt-1' />
                  </span>
                  <span className='font-semibold text-sm'>440</span>
                </div>
              </div>
              <div>
                <div className='flex justify-between mt-10 mb-5'>
                  <span className='font-semibold text-sm'>Delivery Charges</span>
                  <div className='flex'>
                    <span className='text-sm mr-4'>
                      <BiRupee className='absolute mt-1' />
                    </span>
                    <span className='font-semibold text-sm'>40</span>
                  </div>
                </div>
              </div>
              <div className='border-t mt-8'>
                <div className='flex font-semibold justify-between py-6 text-'>
                  <span>Total Amount</span>
                  <div className='flex'>
                    <span className='text-sm mr-4'>
                      <BiRupee className='absolute mt-1' />
                    </span>
                    <span className='font-semibold text-sm'>480</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
