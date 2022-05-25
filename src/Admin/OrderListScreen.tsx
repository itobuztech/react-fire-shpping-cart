import React, { useEffect, useState } from 'react';
import { BiRupee } from 'react-icons/bi';

import Pagination from 'Components/Pagination';
import ShoppingCartHeader from 'Components/ShoppingCartHeader';
import { MdPreview } from 'react-icons/md';
import { routes } from 'routes';
import { Link } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { db } from 'lib/firebase';
import { UserDetails } from 'Interface/user-details.interface';

export default function OrderListScreen() {
  const [checkoutItems, setCheckoutItems] = useState<UserDetails[]>([]);
  // get cart items
  const fetchCheckout = async () => {
    const getData = await getDocs(collection(db, 'checkout'));
    const data = getData.docs.map((items) => items.data() as UserDetails);
    setCheckoutItems(data);
  };
  useEffect(() => {
    fetchCheckout();
  }, []);

  return (
    <>
      <ShoppingCartHeader />
      <div>
        <div className='container mx-auto mt-10'>
          <div className='flex shadow-md my-10'>
            <div className='w-full bg-gray-50 px-10 py-10'>
              <div>
                {/* Cart header */}
                <div className='flex justify-between border-b pb-8'>
                  <h1 className='font-semibold text-2xl'>Order List</h1>
                  <h2 className='font-semibold text-2xl'></h2>
                </div>
                {/* Cart header end */}

                {/* cart list header */}
                <div className='flex mt-10 mb-5'>
                  <h3 className='font-semibold text-gray-600 text-xs uppercase w-1/4'>Customer Name</h3>
                  <h3 className='font-semibold text-gray-600 text-xs uppercase w-1/4'>Customer Address</h3>
                  <h3 className='font-semibold text-gray-600 text-xs uppercase w-1/4'>Product Name</h3>
                  <h3 className='font-semibold text-center text-gray-600 text-xs uppercase w-1/4 pr-10'>
                    Purchase Date
                  </h3>
                  <h3 className='font-semibold text-center text-gray-600 text-xs uppercase w-1/4'>Quantity</h3>
                  <h3 className='font-semibold text-center text-gray-600 text-xs uppercase w-1/4'>Total</h3>
                  <h3 className='w-1/5'></h3>
                </div>
              </div>
              {/* cart list header end */}

              {/* cart list item */}
              {checkoutItems.map((el) => {
                return (
                  <div key={el.order_id}>
                    <div className='flex items-center hover:bg-gray-100 -mx-8 px-6 py-5'>
                      <div className='flex w-1/4'>
                        <div className='flex flex-col justify-between ml-4 flex-grow'>
                          <span className='font-bold text-sm'>{el.name}</span>
                        </div>
                      </div>
                      <div className='flex w-1/4'>
                        <div className='flex flex-col justify-between ml-4 flex-grow'>
                          <span className='font-bold text-sm'>{el.address}</span>
                        </div>
                      </div>
                      <div className='flex w-1/4'>
                        <div className='flex flex-col justify-between ml-4 flex-grow'>
                          <span className='font-bold text-sm'>Hp Laptop</span>
                        </div>
                      </div>
                      <div className='flex w-1/4 pl-6'>
                        <div className='flex flex-col justify-between ml-4 flex-grow'>
                          <span className='font-bold text-sm'>{el.order_date}</span>
                        </div>
                      </div>

                      {/* Quantity section */}
                      <div className='flex justify-center w-1/4'>1</div>
                      {/* Quantity section end */}

                      {/* Price section */}
                      <span className='text-center w-1/4 font-semibold text-sm'>
                        <BiRupee className='absolute ml-10 mt-1' />
                        {el.grand_total}
                      </span>
                      {/* Price section end */}

                      <div className='flex justify-center w-1/5'>
                        <Link to={routes.orderDetails}>
                          <MdPreview className='text-2xl text-green-600' />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Pagination />
      </div>
    </>
  );
}
