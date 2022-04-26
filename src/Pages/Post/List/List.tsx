import React from 'react';
import faker from '@faker-js/faker';

import ListHeader from 'Components/ListHeader';


export default function PostList() {

  const products = [...Array(12)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.animals(),
    description: faker.lorem.words(8),
    ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  }));

  return (
    <>
      <ListHeader />
      <div className='container'>
        <div className='font-bold text-4xl mt-10 mb-10 flex justify-center'>Products</div>
        <div className='mt-10 grid grid-cols-4 gap-6 justify-items-center'>
        {products.map((el) => {
          return (
            <div className='max-w-sm rounded-2xl overflow-hidden shadow-lg place-content-center'>
              <img className='w-full' src={el.image} alt='image' />
              <div className='px-6 py-4'>
                <div className='font-bold text-xl mb-2'>{el.name}</div>
                <p className='text-gray-700 text-base'>{el.description}</p>
              </div>
              <div className='px-6 pt-4 pb-2'>
                <span
                  className='inline-block px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                 Price : {el.price}
                </span>
                <span
                  className='inline-block px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                  Ratings: {el.ratings}
                </span>
              </div>
              <div className='font-bold pb-6 flex align-center justify-center'>
                <button className='font-bold pb-4 text-xl sm:text-md'>Add To Cart</button>
              </div>
            </div>
         
        );
        })}
         </div>
         <div className='mt-10 mb-10 text-center'>Pagination</div>
      </div>
    </>
  );
}
