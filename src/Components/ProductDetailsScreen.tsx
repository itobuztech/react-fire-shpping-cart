import React from 'react';
import { BiRupee } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { routes } from 'routes';
import CartButton from './CartButton';
import ListHeader from './ListHeader';

export default function ProductDetailsScreen() {
  return (
    <>
    <ListHeader/>
      <div className='container mx-auto'>
        <div className='font-bold md:text-4xl sm:text-xl mt-10 mb-10 text-center'>Products Details</div>
        <div className='mt-10 grid grid-cols-4 gap-6'>
              <div className='max-w-sm rounded-2xl overflow-hidden shadow hover:shadow-lg'>
                  <img className='w-full' alt='image' />
                  <div className='px-6 py-2'>
                    <div className='font-bold text-xl mb-2'>product Name</div>
                    <p className='text-gray-700 text-base'>Description....</p>
                  </div>

                <div className='px-6 pt-4 pb-2 flex text-sm font-semibold text-gray-700'>
                  <span className='px-3 py-1 mr-2 mb-2 flex'>
                    Price : <BiRupee className='mt-1' /> 200
                  </span>
                  <span className='px-3 py-1 mr-2 mb-2'>Ratings: 5</span>
                </div>
                <div className='pb-10 flex justify-around'>
                  <CartButton>
                    <Link to={routes.productCart}>ADD TO CART</Link>
                  </CartButton>
                  <CartButton>Buy Now</CartButton>
                </div>
              </div>
        </div>
      </div>
      </>
  );
}
